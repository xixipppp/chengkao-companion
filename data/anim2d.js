/* =================== v3.5.0 · 2D 动画题目讲解引擎（Anim2D） ===================
   为题库里的任意一道题，程序化生成一段 30~60 秒的「2D 动画讲解视频」：
     片头题卡 → 题干浮现 → 选项飞入 → 排除法打叉 → 答案揭晓 → 解析分步推演 → 结尾记忆点
   全部由 canvas 2D 代码绘制，零预存素材，因此能覆盖全库 2265 题（政治/英语/高数二）。

   设计要点：
     1) 纯函数时序：build(q) 只产出「场景 + 字幕 + 时长」描述，不碰 DOM，可在 node 里单测
     2) 可 seek：所有动效都是 progress(0..1) 的纯函数，拖进度条任意跳转都不会错乱
     3) 确定性随机：粒子用 mulberry32 种子随机，保证同一帧任何时候渲染都一致
     4) 不编造：动画里出现的每个字都必须来自题面/选项/解析/提示字段（prov 字段留痕可校验）
     5) 三科差异化舞台：政治=概念关系图，英语=词句聚光扫描，高数=坐标系曲线/切线/面积动画

   用法：
     Anim2D.build(q)            → 讲解 spec（纯数据 + draw 函数）
     Anim2D.open(q)             → 打开全屏播放器（需 DOM）
     Anim2D.exportVideo(spec)   → MediaRecorder 录制成 webm 下载
   =========================================================================== */
(function(global){
  'use strict';

  /* ---------------- 常量：画布与配色 ---------------- */
  var W = 1080, H = 1920;                    // 9:16 竖屏设计稿
  var FONT = '-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif';
  var PAD = 72;                              // 左右安全边距
  var CAP_TOP = 1450;                        // 字幕区顶部（规范 D 区 1450–1720）
  var CAP_BOX = { x: 56, y: 1478, w: 968, h: 232, r: 28 };
  var STAGE_TOP = 300, STAGE_BOT = 1180;     // 中部舞台区（必须 clip 到 y ≤ 1450）
  /* 字号阶梯（1080 设计稿；字重只用 400/700 —— Windows 微软雅黑仅两档，写 500/600 会回退） */
  var FS = { h0: 96, h1: 72, stem: 56, opt: 48, sol: 44, cap: 64, cap2: 52, num: 120, chip: 32, wm: 26 };

  var BG1 = '#0c0814', BG2 = '#241640', PANEL = '#1c1430', PANEL2 = '#251a3f', LINE = '#3a2a5e';
  var TXT = '#f3ecff', SUB = '#b6a6e0', DIM = '#7c6ca8';
  var GREEN = '#5be3a7', RED = '#ff7a9c', GOLD = '#ffd166', CYAN = '#5ee0f0';

  var SUBJ = {
    pol : { name:'政治',     c:'#ff7a9c', c2:'#ff9ed6', ico:'政' },
    eng : { name:'英语',     c:'#5ee0f0', c2:'#8fe8b8', ico:'英' },
    math: { name:'高数（二）', c:'#b794ff', c2:'#ff8ad1', ico:'数' }
  };
  function subjOf(q){
    var s = (q && q.subj) || 'math';
    return SUBJ[s] ? s : (String(q.m || '').charAt(0) === 'p' ? 'pol' : (String(q.m || '').charAt(0) === 'e' ? 'eng' : 'math'));
  }

  /* ---------------- 数学小工具 ---------------- */
  function clamp(v, a, b){ return v < a ? a : (v > b ? b : v); }
  function lerp(a, b, t){ return a + (b - a) * t; }
  function easeOut(t){ return 1 - Math.pow(1 - t, 3); }
  function easeIn(t){ return t * t * t; }
  function easeInOut(t){ return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function easeOutBack(t){ var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
  function easeOutElastic(t){
    if(t === 0 || t === 1) return t;
    var c4 = (2 * Math.PI) / 3;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - .75) * c4) + 1;
  }
  function mulberry32(a){
    return function(){
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function hash(str){
    var h = 2166136261; str = String(str || '');
    for(var i = 0; i < str.length; i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  /* ---------------- 文本工具 ---------------- */
  function plain(s){ return String(s == null ? '' : s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }
  /* 按句末标点切句（不用正则 lookbehind —— iOS Safari 16.4 以下不支持会直接语法错误） */
  var SENT_END = '。！？；;!?';
  function splitSol(sol){
    var s = plain(sol).replace(/^[》〉>]+/, '');
    if(!s) return [];
    var out = [], cur = '';
    for(var i = 0; i < s.length; i++){
      var ch = s.charAt(i);
      cur += ch;
      if(SENT_END.indexOf(ch) >= 0){ if(cur.trim()) out.push(cur.trim()); cur = ''; }
    }
    if(cur.trim()) out.push(cur.trim());
    /* 单句过长（无句读的长解析）时按逗号再切一刀，保证卡片放得下 */
    if(out.length === 1 && out[0].length > 60){
      var sub = [], c2 = '';
      for(var j = 0; j < out[0].length; j++){
        c2 += out[0].charAt(j);
        if('，,、'.indexOf(out[0].charAt(j)) >= 0 && c2.length > 18){ if(c2.trim()) sub.push(c2.trim()); c2 = ''; }
      }
      if(c2.trim()) sub.push(c2.trim());
      if(sub.length > 1) out = sub;
    }
    return out.slice(0, 6);
  }
  function ansText(q){
    if(!q) return '';
    if(q.t === 'choice') return (q.o && q.o[q.a] != null) ? String(q.o[q.a]) : '';
    return (q.ans || []).join(' / ');
  }
  /* 从题干里抽关键词（政治概念图 / 英语聚光用），只切词不造词 */
  var STOP = '的 了 是 在 和 与 及 或 就 都 也 而 其 之 于 对 把 被 由 为 以 则 等 这 那 有 会 能 要 不 无 非 个 一 二 三 中 上 下 内 外 所 指 指 出 下 列 关 于 说 法 正 确 错 误 选 项 题 是 下 列 各 项 中'.split(' ');
  function keywords(s, max){
    var raw = plain(s).replace(/[（）()【】\[\]，,。．\.、：:；;？?！!""'']/g, ' ').split(/\s+/);
    var seen = {}, out = [];
    for(var i = 0; i < raw.length; i++){
      var w = raw[i];
      if(!w || w.length < 2 || w.length > 8) continue;
      if(STOP.indexOf(w) >= 0) continue;
      if(/^[0-9A-Za-z]+$/.test(w) && w.length < 3) continue;
      if(seen[w]) continue;
      seen[w] = 1; out.push(w);
      if(out.length >= (max || 5)) break;
    }
    return out;
  }

  /* ---------------- canvas 绘制基元 ---------------- */
  function rr(ctx, x, y, w, h, r){
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
  /* 规范：Windows 微软雅黑只有 400/700 两档，500/600 会被回退 —— 统一收口 */
  function wt(w){ return (w === 400 || String(w) === '400') ? 400 : 700; }
  function setFont(ctx, size, weight){ ctx.font = wt(weight) + ' ' + size + 'px ' + FONT; }
  /* 所有文字：strokeText(黑 12.5%) → fillText，绝不只描边不填充 */
  function strokeW(size){ return Math.round(size * 0.125 * 10) / 10; }
  function wrap(ctx, s, maxW, size, weight){
    setFont(ctx, size, weight);
    var lines = [], cur = '', i;
    for(i = 0; i < s.length; i++){
      var ch = s.charAt(i);
      if(ctx.measureText(cur + ch).width > maxW && cur){
        lines.push(cur); cur = ch;
      } else cur += ch;
    }
    if(cur) lines.push(cur);
    return lines;
  }
  /* 文字：默认加大字号 + 黑色描边（团队硬规范） */
  function txt(ctx, s, x, y, o){
    o = o || {};
    var size = o.size || 44, weight = o.weight || 700, align = o.align || 'left';
    ctx.save();
    setFont(ctx, size, weight);
    ctx.textAlign = align;
    ctx.textBaseline = o.baseline || 'alphabetic';
    if(o.stroke !== false){
      ctx.lineJoin = 'round';
      ctx.miterLimit = 2;
      ctx.lineWidth = o.strokeW || strokeW(size);
      ctx.strokeStyle = o.strokeColor || '#000000';
      ctx.strokeText(s, x, y);
    }
    if(o.glow){ ctx.shadowColor = o.glow; ctx.shadowBlur = o.glowSize || size * 0.6; }
    ctx.fillStyle = o.color || TXT;
    ctx.fillText(s, x, y);
    ctx.restore();
  }
  /* 段落：返回行数 */
  function para(ctx, s, x, y, maxW, size, o){
    o = o || {};
    var lines = wrap(ctx, s, maxW, size, o.weight || 700), lh = size * (o.lh || 1.5);
    for(var i = 0; i < lines.length; i++){
      var p = o.progress == null ? 1 : clamp((o.progress - i * (o.stagger || 0)) / (o.each || 1), 0, 1);
      if(p <= 0) continue;
      var dy = (1 - easeOut(p)) * 26;
      ctx.save();
      ctx.globalAlpha = p;
      txt(ctx, lines[i], x, y + i * lh + dy, {
        size: size, weight: o.weight || 700, color: o.color || TXT,
        align: o.align || 'left', stroke: o.stroke !== false, strokeColor: o.strokeColor
      });
      ctx.restore();
    }
    return lines.length;
  }
  function chip(ctx, s, x, y, o){
    o = o || {};
    var size = o.size || 30;
    setFont(ctx, size, 800);
    var w = ctx.measureText(s).width + size * 1.3, h = size * 1.9;
    ctx.save();
    rr(ctx, x, y, w, h, h / 2);
    var g = ctx.createLinearGradient(x, y, x + w, y + h);
    g.addColorStop(0, o.c || SUBJ.math.c); g.addColorStop(1, o.c2 || SUBJ.math.c2);
    ctx.fillStyle = o.ghost ? 'rgba(255,255,255,.07)' : g;
    ctx.fill();
    if(o.ghost){ ctx.strokeStyle = o.c || SUBJ.math.c; ctx.lineWidth = 2; ctx.stroke(); }
    ctx.restore();
    txt(ctx, s, x + w / 2, y + h / 2 + size * .36, { size: size, weight: 800, align: 'center', color: o.fg || '#1a0a1e', stroke: false });
    return w;
  }

  /* ---------------- 背景（全场景通用） ---------------- */
  /* 背景三层（规范 F1）离屏缓存一次，逐帧只 drawImage —— 移动端 60fps 关键 */
  var _bgCache = null;
  function bgLayer(spec){
    if(_bgCache && _bgCache.key === spec.subj + '|' + spec.seed) return _bgCache.cv;
    var cv = (typeof document !== 'undefined') ? document.createElement('canvas') : null;
    if(!cv) return null;
    cv.width = W; cv.height = H;
    var c = cv.getContext('2d');
    // L1 底色纵向渐变
    var g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, BG2); g.addColorStop(.55, BG1); g.addColorStop(1, '#100a1c');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    // L2 双色光斑
    var s = SUBJ[spec.subj], rnd = mulberry32(spec.seed);
    for(var i = 0; i < 3; i++){
      var bx = rnd() * W, by = 200 + rnd() * 1400, br = 260 + rnd() * 320;
      var rg = c.createRadialGradient(bx, by, 0, bx, by, br);
      rg.addColorStop(0, hexA(i % 2 ? s.c2 : s.c, .18));
      rg.addColorStop(1, 'rgba(0,0,0,0)');
      c.fillStyle = rg; c.beginPath(); c.arc(bx, by, br, 0, 6.2832); c.fill();
    }
    // L3 细网格 + 顶部高光
    c.strokeStyle = 'rgba(255,255,255,.035)'; c.lineWidth = 2;
    for(var x = PAD; x < W - PAD; x += 78){ c.beginPath(); c.moveTo(x, 120); c.lineTo(x, H - 120); c.stroke(); }
    var tg = c.createLinearGradient(0, 0, 0, 300);
    tg.addColorStop(0, 'rgba(255,255,255,.06)'); tg.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = tg; c.fillRect(0, 0, W, 300);
    _bgCache = { key: spec.subj + '|' + spec.seed, cv: cv };
    return cv;
  }
  function drawBg(ctx, spec, time){
    var layer = bgLayer(spec);
    if(layer){ ctx.drawImage(layer, 0, 0); }
    else{
      var g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, BG2); g.addColorStop(.55, BG1); g.addColorStop(1, '#100a1c');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }
    /* vignette 一次性建好复用（规范 F2），避免每帧建渐变 */
    if(!drawBg._vg){
      if(typeof document !== 'undefined'){
        var vg = document.createElement('canvas'); vg.width = W; vg.height = H;
        var vc = vg.getContext('2d');
        var rg2 = vc.createRadialGradient(540, 960, 480, 540, 960, 1180);
        rg2.addColorStop(0, 'rgba(0,0,0,0)'); rg2.addColorStop(1, 'rgba(0,0,0,.55)');
        vc.fillStyle = rg2; vc.fillRect(0, 0, W, H);
        drawBg._vg = vg;
      } else drawBg._vg = 0;
    }
    if(drawBg._vg) ctx.drawImage(drawBg._vg, 0, 0);
    else{
      var rg3 = ctx.createRadialGradient(540, 960, 480, 540, 960, 1180);
      rg3.addColorStop(0, 'rgba(0,0,0,0)'); rg3.addColorStop(1, 'rgba(0,0,0,.55)');
      ctx.fillStyle = rg3; ctx.fillRect(0, 0, W, H);
    }
    /* 呼吸感光斑（缓慢移动，赋予「活着」的背景） */
    var s2 = SUBJ[spec.subj];
    ctx.save();
    for(var k = 0; k < 2; k++){
      var ph = time * (0.18 + k * 0.09) + k * 2;
      var cx = 300 + Math.sin(ph) * 120 + k * 460, cy = 700 + Math.cos(ph * .8) * 90;
      var rr2 = 300;
      var rg4 = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr2);
      rg4.addColorStop(0, hexA(k ? s2.c2 : s2.c, .10));
      rg4.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = rg4; ctx.beginPath(); ctx.arc(cx, cy, rr2, 0, 6.2832); ctx.fill();
    }
    ctx.restore();
  }
  function hexA(hex, a){
    var h = hex.replace('#', '');
    if(h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }
  /* 顶部角标：科目 / 试卷 / 题号 */
  function drawTop(ctx, spec){
    var s = SUBJ[spec.subj];
    ctx.save();
    rr(ctx, PAD, 96, 96, 96, 26);
    var g = ctx.createLinearGradient(PAD, 96, PAD + 96, 192);
    g.addColorStop(0, s.c); g.addColorStop(1, s.c2);
    ctx.fillStyle = g; ctx.fill();
    ctx.restore();
    txt(ctx, s.ico, PAD + 48, 168, { size: 52, weight: 700, align: 'center', color: '#1a0a1e', stroke: false });
    txt(ctx, s.name, PAD + 118, 140, { size: FS.chip + 8, weight: 700, color: TXT });
    txt(ctx, spec.paperTail, PAD + 118, 182, { size: FS.wm, weight: 400, color: SUB });
    /* 右上：题号（规范 C 区） */
    if(spec.no){
      txt(ctx, '第' + spec.no + '题', W - PAD, 150, { size: FS.chip + 4, weight: 700, align: 'right', color: SUBJ[spec.subj].c });
    }
  }
  /* 底部字幕条：字号加大一号 + 黑色描边 */
  function drawCaption(ctx, text, alpha){
    if(!text || alpha <= 0.01) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    var size = FS.cap, weight = 700;                       // 规范 H2：64/700 + 8px 纯黑描边
    var maxW = CAP_BOX.w - 96;
    var lines = wrap(ctx, text, maxW, size, weight);
    if(lines.length > 2){                                  // 最多两行，超出改用 52px 再排
      size = FS.cap2; lines = wrap(ctx, text, maxW, size, weight);
    }
    var lh = size * 1.38;
    var h = Math.max(CAP_BOX.h, lines.length * lh + 88);
    var y = CAP_BOX.y, x = CAP_BOX.x, w = CAP_BOX.w;
    rr(ctx, x, y, w, h, CAP_BOX.r);
    ctx.fillStyle = 'rgba(8,4,16,.72)'; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.10)'; ctx.lineWidth = 2; ctx.stroke();
    for(var i = 0; i < lines.length; i++){
      txt(ctx, lines[i], x + w / 2, y + 68 + lh / 2 + i * lh, {
        size: size, weight: weight, align: 'center', color: '#ffffff',
        strokeW: strokeW(size), strokeColor: '#000000'
      });
    }
    ctx.restore();
  }
  /* 底部进度条 + 章节刻度 */
  var _pgGrad = {};
  function progGrad(ctx, spec){
    var k = spec.subj;
    if(!_pgGrad[k]){
      var g = ctx.createLinearGradient(PAD, 0, W - PAD, 0);
      g.addColorStop(0, SUBJ[k].c); g.addColorStop(1, SUBJ[k].c2);
      _pgGrad[k] = g;
    }
    return _pgGrad[k];
  }
  /* 规范 C 区：右侧竖向章节轨 —— 已完成段自下往上填充，章节刻度打点 */
  function drawProgress(ctx, spec, p, time){
    var s = SUBJ[spec.subj];
    ctx.save();
    /* ① 右侧竖轨 rr(1016,460,8,960,4)，自下往上 */
    var rx = 1016, ry = 460, rw = 8, rh = 960;
    rr(ctx, rx, ry, rw, rh, 4); ctx.fillStyle = 'rgba(255,255,255,.16)'; ctx.fill();
    var fh = rh * p;
    rr(ctx, rx, ry + rh - fh, rw, fh, 4);
    ctx.fillStyle = progGrad(ctx, spec); ctx.fill();
    spec.chapters.forEach(function(ch){
      if(ch.t0 <= 0.001) return;
      var cy = ry + rh - rh * (ch.t0 / spec.total);
      ctx.fillStyle = 'rgba(255,255,255,.45)';
      ctx.fillRect(rx - 3, cy - 1, rw + 6, 2);
    });
    /* ② 底部横条 rr(72,1780,936,10,5) + 时间码 */
    var x = PAD, w = W - PAD * 2, y = 1780;
    rr(ctx, x, y, w, 10, 5); ctx.fillStyle = 'rgba(255,255,255,.13)'; ctx.fill();
    rr(ctx, x, y, Math.max(10, w * p), 10, 5); ctx.fillStyle = progGrad(ctx, spec); ctx.fill();
    var mm = Math.floor(time / 60), ss = Math.floor(time % 60);
    var tm = mm + ':' + (ss < 10 ? '0' : '') + ss;
    var tt = spec.total, mt = Math.floor(tt / 60), stt = Math.floor(tt % 60);
    var tot = mt + ':' + (stt < 10 ? '0' : '') + stt;
    txt(ctx, tm, x, 1852, { size: FS.wm, weight: 700, color: SUB });
    txt(ctx, tot, x + w, 1852, { size: FS.wm, weight: 400, align: 'right', color: DIM });
    /* ③ 章节名（1.5w 字）居中于时间码上方 */
    var cur = spec.chapters[0];
    for(var i = 0; i < spec.chapters.length; i++) if(time >= spec.chapters[i].t0) cur = spec.chapters[i];
    txt(ctx, '▶ ' + (cur ? cur.name : ''), x + w / 2, 1852, { size: FS.wm, weight: 700, align: 'center', color: SUB });
    ctx.restore();
    void s;
  }
  function drawWatermark(ctx, spec){
    var ver = (typeof window !== 'undefined' && window.APP_VER) ? window.APP_VER : (API.ver || '');
    /* 右下角第二行（y=1896），与时间码行(1852)错开，不遮挡 */
    txt(ctx, '成考伴侣 ' + ver + ' · anim2d · ' + spec.qid, W - PAD, 1898,
      { size: 24, weight: 400, align: 'right', color: 'rgba(182,166,224,.42)', stroke: false });
  }

  /* ---------------- 三科差异化舞台 ---------------- */
  /* =========================================================================
     v3.9.0 · 真·函数绘图引擎（用户反馈「2D 动画讲了个寂寞」的核心修复）
     -------------------------------------------------------------------------
     旧版高数舞台画的是一条写死的示意曲线（sin/cos 拼的装饰线），无论题目是
     求切线还是求面积，画面都一样 —— 等于没讲题。
     新版：把题干里的表达式**真解析**出来（递归下降 parser，绝不用 eval），
     在坐标系里画出这条真实曲线，并按题意叠加：
         切线 / 法线 / 曲边梯形面积 / 渐近线 / 极限逼近动点
     解析失败（纯文字题、表达式超出支持范围）自动退回旧示意曲线，不崩。
     ========================================================================= */
  var FUN1 = {
    sin:Math.sin, cos:Math.cos, tan:Math.tan, cot:function(x){ return 1 / Math.tan(x); },
    ln:Math.log, lg:function(x){ return Math.log(x) / Math.LN10; }, log:Math.log,
    sqrt:Math.sqrt, abs:Math.abs, exp:Math.exp,
    arcsin:Math.asin, arccos:Math.acos, arctan:Math.atan, arccot:function(x){ return Math.PI / 2 - Math.atan(x); },
    sinh:function(x){ return (Math.exp(x) - Math.exp(-x)) / 2; },
    cosh:function(x){ return (Math.exp(x) + Math.exp(-x)) / 2; }
  };
  var CONST1 = { e:Math.E, pi:Math.PI, 'π':Math.PI };
  function K1(v){ return function(){ return v; }; }
  function ID1(){ return function(x){ return x; }; }
  function ADD1(a,b){ return function(x){ return a(x) + b(x); }; }
  function SUB1(a,b){ return function(x){ return a(x) - b(x); }; }
  function MUL1(a,b){ return function(x){ return a(x) * b(x); }; }
  function DIV1(a,b){ return function(x){ return a(x) / b(x); }; }
  function POW1(a,b){ return function(x){ return Math.pow(a(x), b(x)); }; }
  function NEG1(a){ return function(x){ return -a(x); }; }
  function CALL1(nm,a){ var f = FUN1[nm]; return function(x){ return f(a(x)); }; }
  /* 上下标数字：题库里全是 x²、x³、∫₀¹ 这类排版字符，先归一成 ^n / n */
  var SUP2 = { '\u2070':0, '\u00b9':1, '\u00b2':2, '\u00b3':3, '\u2074':4, '\u2075':5, '\u2076':6, '\u2077':7, '\u2078':8, '\u2079':9 };
  var SUB2 = { '\u2080':0, '\u2081':1, '\u2082':2, '\u2083':3, '\u2084':4, '\u2085':5, '\u2086':6, '\u2087':7, '\u2088':8, '\u2089':9 };
  /* 词法：数字 / 标识符（含 π）/ 运算符；遇到其它字符（中文、= 等）直接放弃 */
  function tokenize1(s){
    var t = [], i = 0;
    s = String(s == null ? '' : s);
    while(i < s.length){
      var c = s.charAt(i);
      if(c === ' ' || c === '\t'){ i++; continue; }
      if(c >= '0' && c <= '9' || c === '.'){
        var j = i;
        while(j < s.length && ((s.charAt(j) >= '0' && s.charAt(j) <= '9') || s.charAt(j) === '.')) j++;
        var num = parseFloat(s.slice(i, j));
        if(isNaN(num)) return null;
        t.push({ k:'num', v:num }); i = j; continue;
      }
      if((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === 'π'){
        var j2 = i;
        while(j2 < s.length && ((s.charAt(j2) >= 'a' && s.charAt(j2) <= 'z') || (s.charAt(j2) >= 'A' && s.charAt(j2) <= 'Z') || s.charAt(j2) === 'π')) j2++;
        t.push({ k:'id', v:s.slice(i, j2).toLowerCase() }); i = j2; continue;
      }
      if(SUP2[c] !== undefined){ t.push({ k:'op', v:'^' }); t.push({ k:'num', v:SUP2[c] }); i++; continue; }
      if(SUB2[c] !== undefined){ t.push({ k:'num', v:SUB2[c] }); i++; continue; }
      if(c === '\u207b' || c === '\u208b' || c === '\u2212'){ t.push({ k:'op', v:'-' }); i++; continue; }
      if('+-*/^()|'.indexOf(c) >= 0){ t.push({ k:'op', v:c }); i++; continue; }
      return null;
    }
    return t;
  }
  /* 语法：expr → term → unary → power → tight(隐式乘法) → atom */
  function parseExpr(src){
    var tk = tokenize1(src);
    if(!tk || !tk.length) return null;
    var i = 0;
    function isOp(v){ return i < tk.length && tk[i].k === 'op' && tk[i].v === v; }
    function atom(){
      if(i >= tk.length) return null;
      var t = tk[i];
      if(t.k === 'num'){ i++; return K1(t.v); }
      if(t.k === 'id'){
        i++;
        var nm = t.v;
        if(nm === 'x' || nm === 't') return ID1();   // t：变上限积分 ∫₀ˣf(t)dt 的自变量，画图时当 x
        if(CONST1[nm] !== undefined) return K1(CONST1[nm]);
        if(FUN1[nm]){
          var arg;
          if(isOp('(')){ i++; arg = expr(); if(!arg || !isOp(')')) return null; i++; }
          else { arg = tight(); if(!arg) return null; }      // cosx / lnx / sin2x 这类无括号写法
          return CALL1(nm, arg);
        }
        /* 无括号函数写法（cosx、lnx、sin2x 的纯字母情形）：词法会把它们连成一个标识符，
           这里按「最长函数名前缀」拆开后重新解析 —— 题库里 sinx/cosx/lnx 出现频率极高 */
        var cut = 0;
        for(var fn2 in FUN1){
          if(nm.length > fn2.length && nm.slice(0, fn2.length) === fn2 && fn2.length > cut) cut = fn2.length;
        }
        if(cut > 0){
          var rt = tokenize1(nm.slice(cut));
          if(rt && rt.length){
            /* 把 cosx 这一块替换成 cos + x 两个 token 后重新解析 */
            tk.splice(i - 1, 1, { k:'id', v:nm.slice(0, cut) });
            for(var z = 0; z < rt.length; z++) tk.splice(i + z, 0, rt[z]);
            i = i - 1;
            return atom();
          }
        }
        return null;                                          // 未知标识符（y、a、k 等）→ 放弃
      }
      if(isOp('(')){ i++; var e = expr(); if(!e || !isOp(')')) return null; i++; return e; }
      if(isOp('|')){ i++; var e2 = expr(); if(!e2 || !isOp('|')) return null; i++; return function(x){ return Math.abs(e2(x)); }; }
      return null;
    }
    function tight(){
      var n = atom(); if(!n) return null;
      while(i < tk.length && (tk[i].k === 'num' || tk[i].k === 'id' || (tk[i].k === 'op' && tk[i].v === '('))){
        var r = atom(); if(!r) return null;
        n = MUL1(n, r);
      }
      return n;
    }
    function power(){
      var b = tight(); if(!b) return null;
      if(isOp('^')){ i++; var e = unary(); if(!e) return null; return POW1(b, e); }
      return b;
    }
    function unary(){
      if(isOp('-')){ i++; var u = unary(); if(!u) return null; return NEG1(u); }
      if(isOp('+')){ i++; return unary(); }
      return power();
    }
    function term(){
      var n = unary(); if(!n) return null;
      while(i < tk.length){
        if(isOp('*')){ i++; var r = unary(); if(!r) return null; n = MUL1(n, r); }
        else if(isOp('/')){ i++; var r2 = unary(); if(!r2) return null; n = DIV1(n, r2); }
        else break;
      }
      return n;
    }
    function expr(){
      var n = term(); if(!n) return null;
      while(i < tk.length){
        if(isOp('+')){ i++; var r = term(); if(!r) return null; n = ADD1(n, r); }
        else if(isOp('-')){ i++; var r2 = term(); if(!r2) return null; n = SUB1(n, r2); }
        else break;
      }
      return n;
    }
    var f = expr();
    if(!f || i < tk.length) return null;      // 有剩余 token = 没解析干净，宁可不画
    return f;
  }
  /* 从一坨候选串里挑「最长的可解析前缀」：题干形如「y=x²+1，则…」也能正确截断 */
  function bestParse(s){
    s = String(s == null ? '' : s).replace(/\s+/g, '');
    if(!s) return null;
    for(var n = s.length; n >= 1; n--){
      var sub = s.slice(0, n);
      if(/[+\-*/^(|]$/.test(sub)) continue;            // 尾巴是运算符，不可能是完整式
      if(/[\u4e00-\u9fa5]/.test(sub)) continue;        // 含中文，跳过（从更短的前缀再试）
      var f = parseExpr(sub);
      if(!f) continue;
      /* 常数函数没有曲线可画（如 y=1），判为无意义 */
      var v0 = NaN, same = true, hits = 0;
      for(var x = -4; x <= 4; x += 0.7){
        var v; try{ v = f(x); }catch(e){ v = NaN; }
        if(!isFinite(v)) continue;
        hits++;
        if(isNaN(v0)) v0 = v; else if(Math.abs(v - v0) > 1e-9) same = false;
      }
      if(hits < 4 || same) continue;
      return { f:f, s:sub };
    }
    return null;
  }
  var SUPMAP = { '⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-' };
  var SUBMAP = { '₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','₋':'-' };
  function supNum(s){
    var out = '';
    s = String(s || '');
    for(var i = 0; i < s.length; i++){
      var c = s.charAt(i);
      if(SUPMAP[c] !== undefined) out += SUPMAP[c];
      else if(SUBMAP[c] !== undefined) out += SUBMAP[c];
      else if(c === '-' || c === '\u2212') out += '-';
      else if(c >= '0' && c <= '9') out += c;
      else break;
    }
    return out === '' || out === '-' ? null : parseFloat(out);
  }
  /* 取这题的「考场默念口诀」（v3.10.0 题级：data/stepmnem.js 的 QSTEP，100% 有输出）
     再补一条考点级口诀（data/mnemonics.js）作为加餐；两个库都缺失时返回空串，场景自动不排 */
  function pickMemo(spec, q){
    try{
      var out = [];
      var g = (typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : {}));
      if(g.QSTEP && g.QSTEP.build){
        var b = g.QSTEP.build(q);
        if(b && b.chant) out.push(b.chant);
      }
      var R = (g.MNEM_DATA && g.MNEM_DATA.rules) || null;
      if(R && R.length){
        var s2 = [spec.stem, (spec.opts || []).join(' '), spec.answer, (spec.steps || []).join(' '), spec.hint, spec.modName]
          .map(function(x){ return String(x == null ? '' : x); }).join(' ').toLowerCase();
        for(var i = 0; i < R.length; i++){
          var ks = R[i].k || [];
          for(var j = 0; j < ks.length; j++){
            if(s2.indexOf(String(ks[j]).toLowerCase()) >= 0){ out.push(R[i].t); break; }
          }
          if(out.length >= 2) break;
        }
      }
      return out.join('\n');
    }catch(e){ return ''; }
  }
  /* 富文本一行：把「算式/数字」染成金色、叙述保持白色，支持自动换行 */
  var MATHCH = /[0-9A-Za-z=+\-*/^()\[\]∫√∞∂πθ≤≥≠|.]/;
  var SUPCH = /[\u2070-\u209f\u00b2\u00b3\u00b9\u207f\u00d7\u00f7]/;
  function tokenRich(s){
    var out = [], cur = '', curM = false;
    s = String(s == null ? '' : s);
    for(var i = 0; i < s.length; i++){
      var c = s.charAt(i);
      var isM = MATHCH.test(c) || SUPCH.test(c);
      if(cur && isM !== curM){ out.push({ t:cur, m:curM }); cur = ''; }
      cur += c; curM = isM;
    }
    if(cur) out.push({ t:cur, m:curM });
    return out.map(function(o){
      return { t:o.t, hl:o.m && /[=^\u222b\u221a\u2202\u221e\u2264\u2265\u2260]|[0-9]/.test(o.t) };
    });
  }
  function richLine(ctx, s, x, y, maxW, size, weight){
    var toks = tokenRich(s), cx = x, cy = y, lh = size * 1.3;
    for(var i = 0; i < toks.length; i++){
      var tk = toks[i];
      setFont(ctx, size, weight);
      var wch = ctx.measureText(tk.t).width;
      if(wch > maxW){                                  // 超长片段按字符硬断，绝不溢出卡片
        for(var c2 = 0; c2 < tk.t.length; c2++){
          var one = tk.t.charAt(c2), w1 = ctx.measureText(one).width;
          if(cx > x && cx + w1 > x + maxW){ cx = x; cy += lh; }
          txt(ctx, one, cx, cy, { size:size, weight:weight, color: tk.hl ? GOLD : '#fff', stroke:false });
          cx += w1;
        }
        continue;
      }
      if(cx > x && cx + wch > x + maxW){ cx = x; cy += lh; }
      txt(ctx, tk.t, cx, cy, { size:size, weight:weight, color: tk.hl ? GOLD : '#fff', stroke:false });
      cx += wch;
    }
    return cy + lh - y;
  }
  /* 从题面里抽：函数表达式 + 关注点 x0 + 积分区间 [a,b] + 该画什么（kind） */
  function buildPlot(q){
    if(subjOf(q) !== 'math') return null;
    var stem = plain(q.q), sol = plain(q.sol), all = stem + ' ' + sol;
    var fn = null, label = '', x0 = null, a = null, b = null, m;
    m = /(?:y|f\s*\(\s*x\s*\)|f)\s*=\s*([^=]+)/.exec(stem);
    if(m){
      var bp = bestParse(m[1]);
      if(bp){ fn = bp.f; label = 'y = ' + bp.s; }
    }
    if(!fn){
      m = /lim\s*[（(]?\s*x\s*(?:→|->|=>)\s*([^)），,。]+)[)）]?\s*(.+)/.exec(stem);
      if(m){
        var bp2 = bestParse(m[2]);
        if(bp2){ fn = bp2.f; label = 'y = ' + bp2.s; x0 = supNum(m[1]); }
      }
    }
    if(!fn){
      /* 定积分题：∫₀¹ (2x+1)³ dx —— 取积分号后括号里的被积式 */
      m = /∫\s*[⁰¹²³⁴⁵⁶⁷⁸⁹⁻₀₁₂₃₄₅₆₇₈₉₋\-\d]*\s*[（(]\s*([^)）]+)/.exec(stem);
      if(m){
        var bp4 = bestParse(m[1]);
        if(bp4){ fn = bp4.f; label = 'y = ' + bp4.s; }
      }
    }
    if(!fn){
      /* 兜底：整条题干里找含 x 的最长可解析片段 */
      var segs = stem.split(/[，,。;；？?（）()]/);
      for(var i = 0; i < segs.length && !fn; i++){
        if(segs[i].indexOf('x') < 0) continue;
        var bp3 = bestParse(segs[i]);
        /* 只认长度 ≥3 的表达式：否则「设区域 D = {(x,y)…」这类抽象题会兜出一条 y=x 装样子 */
        if(bp3 && bp3.s.length >= 3){ fn = bp3.f; label = 'y = ' + bp3.s; }
      }
    }
    if(!fn) return null;
    /* 关注点 x0：x→a / 在点 x=a / 点(a, ...) / 区间 [a,b] */
    if(x0 == null){
      m = /x\s*(?:→|->|=>)\s*(-?[\d]+)/.exec(stem);
      if(m) x0 = parseFloat(m[1]);
    }
    if(x0 == null){
      m = /(?:在|点|处)\s*[（(]?\s*(-?[\d]+)\s*[，,]/.exec(stem);
      if(m) x0 = parseFloat(m[1]);
    }
    if(x0 == null){
      m = /x\s*=\s*(-?[\d]+)/.exec(stem);
      if(m) x0 = parseFloat(m[1]);
    }
    /* 积分区间 ∫ₐᵇ / ∫(a,b) / ∫a^b */
    var im = /∫\s*[₀₁₂₃₄₅₆₇₈₉₋\-\d]{0,4}\s*[⁰¹²³⁴⁵⁶⁷⁸⁹⁻\-\d]{0,4}/.exec(all);
    if(im){
      var seg = im[0].replace('∫', '');
      var lo = supNum(seg.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻\-]/g, ''));
      var hi = supNum(seg.replace(/[₀₁₂₃₄₅₆₇₈₉₋]/g, ''));
      if(lo != null && hi != null && hi > lo){ a = lo; b = hi; }
    }
    if(a == null){
      m = /∫\s*[（(]\s*(-?[\d]+)\s*[，,]\s*(-?[\d]+)\s*[)）]/.exec(all);
      if(m && parseFloat(m[2]) > parseFloat(m[1])){ a = parseFloat(m[1]); b = parseFloat(m[2]); }
    }
    /* 图形类型优先看题干：解析里常出现「切线」字样（法线题的解析也会写「切线斜率的负倒数」） */
    var ksrc = /切线|法线|面积|围成|∫|定积分|渐近线|极限|lim/.test(stem) ? stem : all;
    var kind = 'curve';
    if(/切线/.test(ksrc)) kind = 'tangent';
    else if(/法线/.test(ksrc)) kind = 'normal';
    else if(/面积|围成|∫|定积分/.test(ksrc)) kind = 'area';
    else if(/渐近线/.test(ksrc)) kind = 'asymptote';
    else if(/极限|lim/.test(ksrc)) kind = 'limit';
    if(kind === 'area' && a == null){ a = (x0 == null ? 0 : x0); b = a + 2; }
    var xmin, xmax;
    if(a != null && b != null){ xmin = a - (b - a) * 0.35 - 0.5; xmax = b + (b - a) * 0.35 + 0.5; }
    else if(x0 != null){ xmin = x0 - 5; xmax = x0 + 5; }
    else { xmin = -6; xmax = 6; }
    if(xmin < -40) xmin = -40; if(xmax > 40) xmax = 40;
    return { fn:fn, label:label, kind:kind, x0:x0, a:a, b:b, xmin:xmin, xmax:xmax };
  }
  /* 真实曲线绘制；返回 false 表示画不出来（调用方退回示意曲线） */
  function plotMath(ctx, spec, p, box){
    var pl = spec.plot;
    if(!pl || !pl.fn) return false;
    var fn = pl.fn, N = 240, xs = [], ys = [];
    for(var k = 0; k <= N; k++){
      var x = pl.xmin + (pl.xmax - pl.xmin) * k / N, y;
      try{ y = fn(x); }catch(e){ y = NaN; }
      xs.push(x);
      ys.push((typeof y === 'number' && isFinite(y)) ? y : NaN);
    }
    var good = [];
    for(var g = 0; g < ys.length; g++) if(!isNaN(ys[g])) good.push(ys[g]);
    if(good.length < 8) return false;
    var sorted = good.slice().sort(function(a, b){ return a - b; });
    var lo = sorted[Math.floor(sorted.length * 0.03)], hi = sorted[Math.floor(sorted.length * 0.97)];
    if(hi - lo < 1e-6){ lo = lo - 1; hi = hi + 1; }
    var span = hi - lo;
    lo -= span * 0.14; hi += span * 0.14;
    var cutLo = lo - span * 1.6, cutHi = hi + span * 1.6;
    var px0 = box.x + 6, px1 = box.x + box.w - 6, py0 = box.y + 6, py1 = box.y + box.h - 46;
    function PX(x){ return px0 + (x - pl.xmin) / (pl.xmax - pl.xmin) * (px1 - px0); }
    function PY(y){ return py1 - (y - lo) / (hi - lo) * (py1 - py0); }
    ctx.save();
    /* 网格 + 坐标轴 */
    var step = (pl.xmax - pl.xmin) > 24 ? 4 : ((pl.xmax - pl.xmin) > 12 ? 2 : 1);
    ctx.strokeStyle = 'rgba(183,148,255,.16)'; ctx.lineWidth = 2;
    var gx, gy;
    for(gx = Math.ceil(pl.xmin / step) * step; gx <= pl.xmax; gx += step){
      ctx.beginPath(); ctx.moveTo(PX(gx), py0); ctx.lineTo(PX(gx), py1); ctx.stroke();
    }
    for(gy = Math.ceil(lo / step) * step; gy <= hi; gy += step){
      ctx.beginPath(); ctx.moveTo(px0, PY(gy)); ctx.lineTo(px1, PY(gy)); ctx.stroke();
    }
    var yZero = clamp(PY(0), py0, py1), xZero = clamp(PX(0), px0, px1);
    ctx.strokeStyle = 'rgba(183,148,255,.75)'; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px0, yZero); ctx.lineTo(px1, yZero);
    ctx.moveTo(xZero, py0); ctx.lineTo(xZero, py1);
    ctx.stroke();
    txt(ctx, 'x', px1 - 4, yZero - 14, { size: 28, weight: 800, color: SUBJ.math.c, align: 'right' });
    txt(ctx, 'y', xZero + 12, py0 + 26, { size: 28, weight: 800, color: SUBJ.math.c });
    /* 曲线本体：随进度生长，奇点处断笔（1/x 之类不会连成竖线） */
    var prog = clamp(p * 1.4, 0, 1), upto = Math.floor(N * prog), started = false;
    function strokeCurve(alpha, lw){
      ctx.beginPath(); started = false;
      for(var k2 = 0; k2 <= upto; k2++){
        var yv = ys[k2];
        if(isNaN(yv) || yv < cutLo || yv > cutHi){ started = false; continue; }
        var X2 = PX(xs[k2]), Y2 = PY(yv);
        if(!started){ ctx.moveTo(X2, Y2); started = true; } else ctx.lineTo(X2, Y2);
      }
      ctx.strokeStyle = hexA(SUBJ.math.c, alpha); ctx.lineWidth = lw;
      ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
    }
    strokeCurve(.22, 12);                 // 外发光
    strokeCurve(.98, 5);                  // 主线
    /* 按题意叠加 */
    var cx = pl.x0 == null ? (pl.xmin + pl.xmax) / 2 : pl.x0;
    var cy = NaN; try{ cy = fn(cx); }catch(e){ cy = NaN; }
    var d = NaN;
    if(isFinite(cy)){
      var h = 1e-4, y1 = NaN, y2 = NaN;
      try{ y1 = fn(cx + h); y2 = fn(cx - h); }catch(e){}
      if(isFinite(y1) && isFinite(y2)) d = (y1 - y2) / (2 * h);
    }
    function drawPt(x, y, color){
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(PX(x), PY(y), 13, 0, 6.2832); ctx.fill();
    }
    function drawLine(x, y, slope, color){
      /* 数据斜率 → 画布方向 */
      var dx = (px1 - px0) * 0.42;
      var dy = -slope * (py1 - py0) / (hi - lo) * ((pl.xmax - pl.xmin) / (px1 - px0)) * dx;
      ctx.strokeStyle = color; ctx.lineWidth = 5; ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(PX(x) - dx, PY(y) - dy); ctx.lineTo(PX(x) + dx, PY(y) + dy);
      ctx.stroke();
    }
    if(pl.kind === 'tangent' && isFinite(cy) && isFinite(d)){
      var tp = clamp((p - .35) / .5, 0, 1);
      ctx.save(); ctx.globalAlpha = tp;
      drawLine(cx, cy, d, GOLD);
      drawPt(cx, cy, GOLD);
      txt(ctx, '切线斜率 = f\u2032(x\u2080)', PX(cx), PY(cy) - 40, { size: 30, weight: 800, align: 'center', color: GOLD });
      ctx.restore();
    } else if(pl.kind === 'normal' && isFinite(cy) && isFinite(d) && Math.abs(d) > 1e-6){
      var np = clamp((p - .35) / .5, 0, 1);
      ctx.save(); ctx.globalAlpha = np;
      drawLine(cx, cy, -1 / d, CYAN);
      drawPt(cx, cy, CYAN);
      txt(ctx, '法线斜率 = \u22121 / f\u2032(x\u2080)', PX(cx), PY(cy) - 40, { size: 30, weight: 800, align: 'center', color: CYAN });
      ctx.restore();
    } else if(pl.kind === 'area'){
      var a0 = pl.a, b0 = pl.b;
      var shown = a0 + (b0 - a0) * clamp(p * 1.25, 0, 1);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(PX(a0), PY(0));
      for(var k3 = 0; k3 <= N; k3++){
        var xx = xs[k3];
        if(xx < a0 || xx > shown) continue;
        var yy = ys[k3];
        if(isNaN(yy)) continue;
        ctx.lineTo(PX(xx), PY(clamp(yy, cutLo, cutHi)));
      }
      ctx.lineTo(PX(shown), PY(0)); ctx.closePath();
      ctx.fillStyle = hexA(GOLD, .3); ctx.fill();
      ctx.strokeStyle = hexA(GOLD, .7); ctx.lineWidth = 3; ctx.stroke();
      ctx.restore();
      txt(ctx, 'S = \u222b f(x) dx', (PX(a0) + PX(b0)) / 2, py0 + 40, { size: 36, weight: 900, align: 'center', color: GOLD });
    } else if(pl.kind === 'asymptote'){
      var lv = NaN, rv = NaN;
      try{ lv = fn(pl.xmin - 400); rv = fn(pl.xmax + 400); }catch(e){}
      var ap = clamp((p - .3) / .55, 0, 1);
      ctx.save(); ctx.globalAlpha = ap;
      ctx.setLineDash([14, 10]);
      if(isFinite(lv) && isFinite(rv) && Math.abs(lv - rv) < Math.max(1, Math.abs(lv) * 0.2)){
        ctx.strokeStyle = hexA(GOLD, .85); ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(px0, PY((lv + rv) / 2)); ctx.lineTo(px1, PY((lv + rv) / 2)); ctx.stroke();
        txt(ctx, '水平渐近线', px1 - 10, PY((lv + rv) / 2) - 18, { size: 28, weight: 800, align: 'right', color: GOLD });
      }
      /* 垂直渐近线：找曲线断点（相邻采样值突变） */
      for(var k4 = 1; k4 < N; k4++){
        if(isNaN(ys[k4]) || isNaN(ys[k4 - 1])) continue;
        if(Math.abs(ys[k4] - ys[k4 - 1]) > span * 1.2){
          var vx = (xs[k4] + xs[k4 - 1]) / 2;
          ctx.strokeStyle = hexA(RED, .8); ctx.lineWidth = 4;
          ctx.beginPath(); ctx.moveTo(PX(vx), py0); ctx.lineTo(PX(vx), py1); ctx.stroke();
          txt(ctx, '垂直渐近线 x=' + vx.toFixed(1), PX(vx) + 10, py1 - 14, { size: 26, weight: 800, color: RED });
          break;
        }
      }
      ctx.setLineDash([]);
      ctx.restore();
    } else if(pl.kind === 'limit'){
      var lp = easeInOut(clamp(p * 1.25, 0, 1));
      var ax = cx + (pl.xmax - cx) * 0.85 * (1 - lp);
      var ay = NaN; try{ ay = fn(ax); }catch(e){}
      if(isFinite(ay)){
        ctx.save();
        ctx.setLineDash([8, 8]); ctx.strokeStyle = hexA(GOLD, .6); ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(PX(ax), PY(ay)); ctx.lineTo(PX(ax), PY(0)); ctx.stroke();
        ctx.setLineDash([]);
        drawPt(ax, ay, GOLD);
        txt(ctx, 'x \u2192 x\u2080，f(x) \u2192 ' + ay.toFixed(2), PX(ax), PY(ay) - 38,
          { size: 30, weight: 800, align: 'center', color: GOLD });
        ctx.restore();
      }
    } else {
      var mp = clamp(p * 1.2, 0, 1);
      var mx = pl.xmin + (pl.xmax - pl.xmin) * mp, my = NaN;
      try{ my = fn(mx); }catch(e){}
      if(isFinite(my) && my > cutLo && my < cutHi) drawPt(mx, my, '#ffffff');
    }
    /* 函数标签（直接取自题干，不编造） */
    if(pl.label){
      ctx.save(); ctx.globalAlpha = clamp(p * 2, 0, 1);
      var lb = pl.label.length > 30 ? pl.label.slice(0, 29) + '…' : pl.label;
      setFont(ctx, 30, 700);
      var lw2 = ctx.measureText(lb).width + 30;
      rr(ctx, px0 + 6, py0 + 4, lw2, 52, 14);
      ctx.fillStyle = 'rgba(12,8,20,.72)'; ctx.fill();
      ctx.strokeStyle = hexA(SUBJ.math.c, .6); ctx.lineWidth = 2; ctx.stroke();
      txt(ctx, lb, px0 + 21, py0 + 42, { size: 30, weight: 700, color: '#fff', stroke: false });
      ctx.restore();
    }
    ctx.restore();
    return true;
  }

  /* 高数舞台：真曲线优先，画不出来才退回示意曲线 */
  function stageMath(ctx, spec, p, box){
    if(spec.plot && spec.plot.fn && plotMath(ctx, spec, p, box)) return;
    stageMathLegacy(ctx, spec, p, box);
  }
  /* 兜底：示意曲线（题干没有可解析函数时） */
  function stageMathLegacy(ctx, spec, p, box){
    var mod = String(spec.mod || '');
    var x0 = box.x, y0 = box.y, w = box.w, h = box.h;
    var cx = x0 + w * 0.5, cy = y0 + h * 0.55, sx = w * 0.40, sy = h * 0.30;
    ctx.save();
    // 坐标轴
    ctx.strokeStyle = 'rgba(183,148,255,.55)'; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x0, cy); ctx.lineTo(x0 + w, cy);
    ctx.moveTo(cx, y0 + h * .08); ctx.lineTo(cx, y0 + h);
    ctx.stroke();
    // 箭头
    ctx.beginPath(); ctx.moveTo(x0 + w - 18, cy - 10); ctx.lineTo(x0 + w, cy); ctx.lineTo(x0 + w - 18, cy + 10); ctx.stroke();
    txt(ctx, 'x', x0 + w - 6, cy - 16, { size: 30, weight: 800, color: SUBJ.math.c, align: 'right' });
    txt(ctx, 'y', cx + 14, y0 + h * .08 + 6, { size: 30, weight: 800, color: SUBJ.math.c });

    var f = function(t){ return Math.sin(t * 1.6) * 0.62 + Math.cos(t * 0.7) * 0.22; };  // 示意曲线
    var drawCurve = function(prog, color, lw){
      ctx.beginPath();
      var N = 160;
      for(var i = 0; i <= N * prog; i++){
        var t = -3 + (6 * i / N), px = cx + t * sx / 3, py = cy - f(t) * sy;
        if(i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = color; ctx.lineWidth = lw || 5; ctx.lineJoin = 'round'; ctx.stroke();
    };
    var cp = easeOut(clamp(p * 1.4, 0, 1));

    if(mod === 'm1'){                       // 极限与连续：点沿 x 轴逼近
      drawCurve(cp, hexA(SUBJ.math.c, .9), 4);
      drawCurve(1, 'rgba(183,148,255,.28)', 3);
      var tx = -1.8 + 1.8 * easeInOut(clamp(p * 1.2, 0, 1));
      var px = cx + tx * sx / 3, py = cy - f(tx) * sy;
      ctx.fillStyle = GOLD;
      ctx.beginPath(); ctx.arc(px, py, 14, 0, 6.2832); ctx.fill();
      ctx.strokeStyle = hexA(GOLD, .35); ctx.lineWidth = 3;
      ctx.setLineDash([8, 8]);
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, cy); ctx.stroke();
      ctx.setLineDash([]);
      txt(ctx, 'x → x₀', px, cy + 46, { size: 32, weight: 800, align: 'center', color: GOLD });
    } else if(mod === 'm2'){                // 导数与微分：切线扫过
      drawCurve(1, 'rgba(183,148,255,.35)', 3);
      drawCurve(cp, hexA(SUBJ.math.c, .95), 5);
      var t2 = -2.4 + 4.8 * easeInOut(clamp(p * 1.1, 0, 1));
      var ax = cx + t2 * sx / 3, ay = cy - f(t2) * sy;
      var d = (f(t2 + .01) - f(t2 - .01)) / .02;      // f'(t)
      var m = (-d * sy) / (sx / 3);                   // 换算成画布像素斜率
      ctx.strokeStyle = GOLD; ctx.lineWidth = 5; ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(ax - 220, ay + m * (-220));
      ctx.lineTo(ax + 220, ay + m * (220));
      ctx.stroke();
      ctx.fillStyle = GOLD;
      ctx.beginPath(); ctx.arc(ax, ay, 13, 0, 6.2832); ctx.fill();
      txt(ctx, "切线斜率 = f'(x)", ax, ay - 40, { size: 32, weight: 800, align: 'center', color: GOLD });
    } else if(mod === 'm3'){                // 积分：曲边梯形面积填充
      drawCurve(cp, hexA(SUBJ.math.c, .95), 5);
      var N2 = 22, shown = Math.floor(N2 * clamp(p * 1.3, 0, 1));
      for(var j = 0; j < shown; j++){
        var t3 = -2 + 4 * j / N2, t4 = -2 + 4 * (j + 1) / N2;
        var bx1 = cx + t3 * sx / 3, bx2 = cx + t4 * sx / 3;
        var top = cy - f((t3 + t4) / 2) * sy;
        ctx.fillStyle = hexA(GOLD, .30);
        ctx.fillRect(bx1, Math.min(top, cy), bx2 - bx1, Math.abs(cy - top));
        ctx.strokeStyle = hexA(GOLD, .55); ctx.lineWidth = 2;
        ctx.strokeRect(bx1, Math.min(top, cy), bx2 - bx1, Math.abs(cy - top));
      }
      txt(ctx, 'S = ∫ f(x) dx', cx, y0 + h * .12, { size: 38, weight: 900, align: 'center', color: GOLD });
    } else {                                // 默认：曲线绘制 + 网格点
      drawCurve(cp, hexA(SUBJ.math.c, .95), 5);
      var pa = clamp(p * 1.2, 0, 1);
      var px2 = cx + (-3 + 6 * pa) * sx / 3, py2 = cy - f(-3 + 6 * pa) * sy;
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(px2, py2, 12, 0, 6.2832); ctx.fill();
    }
    ctx.restore();
  }
  /* 政治：概念关系图（中心=正确答案，卫星=题干关键词） */
  function stagePol(ctx, spec, p, box){
    var kws = spec.kw, cx = box.x + box.w / 2, cy = box.y + box.h / 2;
    ctx.save();
    var R = Math.min(box.w, box.h) * 0.30;
    var n = kws.length;
    // 中心节点
    var cp = easeOutBack(clamp(p * 1.6, 0, 1));
    /* v3.9.0：读题阶段不剧透答案 —— 旧版中心节点直接写着正确答案，等于一上来就泄题 */
    var core = (spec._ph === 'reveal' ? (spec.answer || '核心') : (spec.modName || '考点')).slice(0, 10);
    ctx.save();
    ctx.translate(cx, cy); ctx.scale(cp, cp);
    var cg = ctx.createRadialGradient(0, 0, 10, 0, 0, R * .95);
    cg.addColorStop(0, hexA(SUBJ.pol.c, .95)); cg.addColorStop(1, hexA(SUBJ.pol.c2, .55));
    ctx.beginPath(); ctx.arc(0, 0, R * .92, 0, 6.2832); ctx.fillStyle = cg; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.stroke();
    ctx.restore();
    txt(ctx, core, cx, cy + 14, { size: Math.min(46, 700 / Math.max(6, core.length)), weight: 900, align: 'center', color: '#fff' });
    // 卫星节点 + 连线生长
    for(var i = 0; i < n; i++){
      var a = -Math.PI / 2 + (i - (n - 1) / 2) * (Math.PI * 2 / Math.max(3, n + 1));
      var sp = clamp((p - 0.18 - i * 0.09) / 0.5, 0, 1);
      if(sp <= 0) continue;
      var e = easeOut(sp);
      var nx = cx + Math.cos(a) * R * 1.75 * e, ny = cy + Math.sin(a) * R * 1.55 * e;
      ctx.strokeStyle = hexA(SUBJ.pol.c2, .55 * e); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(nx, ny); ctx.stroke();
      var label = kws[i];
      setFont(ctx, 34, 800);
      var lw2 = ctx.measureText(label).width + 40;
      ctx.save(); ctx.globalAlpha = e;
      rr(ctx, nx - lw2 / 2, ny - 32, lw2, 64, 32);
      ctx.fillStyle = 'rgba(28,20,48,.92)'; ctx.fill();
      ctx.strokeStyle = hexA(SUBJ.pol.c, .8); ctx.lineWidth = 3; ctx.stroke();
      ctx.restore();
      txt(ctx, label, nx, ny + 12, { size: 34, weight: 800, align: 'center', color: TXT, stroke: false });
    }
    ctx.restore();
  }
  /* 英语：词条聚光扫描（spotlight）—— 优先把「选项」当词条卡逐个扫过
     （英语题的选项本身就是待辨析的词/短语，语音题/词汇题/语法题都适用）；
     选项过长（阅读题选项是长句）或缺失时，退回题干分词扫描 */
  function stageEng(ctx, spec, p, box){
    var useOpts = spec.isChoice && spec.opts.length > 1 &&
                  spec.opts.every(function(o){ return o.length <= 26; });
    var words = useOpts ? spec.opts.slice(0, 6) : spec.ewords;
    if(!words.length) return;
    var size = 42, gap = 22, ch = 86;
    var x0 = box.x, maxW = box.w;
    setFont(ctx, size, 700);
    var rows = [[]], rw = [0];
    for(var i = 0; i < words.length; i++){
      var label = words[i].length > 20 ? words[i].slice(0, 19) + '…' : words[i];
      var cw2 = ctx.measureText(label).width + (useOpts ? 92 : 52);
      if(rw[rows.length - 1] + cw2 > maxW && rows[rows.length - 1].length){
        if(rows.length >= 4) break;
        rows.push([]); rw.push(0);
      }
      rows[rows.length - 1].push({ t: label, w: cw2, letter: useOpts ? String.fromCharCode(65 + i) : '' });
      rw[rows.length - 1] += cw2 + gap;
    }
    var total = 0; rows.forEach(function(r){ total += r.length; });
    var scan = clamp(p * 1.25, 0, 1) * total;
    var idx = 0, y = box.y + 60;
    ctx.save();
    for(var ri = 0; ri < rows.length; ri++){
      var lx = x0;
      for(var ci = 0; ci < rows[ri].length; ci++){
        var it = rows[ri][ci], on = idx < scan;
        var a = on ? 1 : clamp((scan - idx) / 1.2, 0, 1) * .35 + .12;
        ctx.save(); ctx.globalAlpha = a;
        if(on){
          rr(ctx, lx, y - ch + 18, it.w, ch, 20);
          ctx.fillStyle = hexA(CYAN, .22); ctx.fill();
          ctx.strokeStyle = hexA(CYAN, .8); ctx.lineWidth = 3; ctx.stroke();
        } else {
          rr(ctx, lx, y - ch + 18, it.w, ch, 20);
          ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.fill();
          ctx.strokeStyle = 'rgba(255,255,255,.10)'; ctx.lineWidth = 2; ctx.stroke();
        }
        if(it.letter){
          var bs = 50;
          rr(ctx, lx + 18, y - ch + 18 + (ch - bs) / 2, bs, bs, bs / 2);
          ctx.fillStyle = on ? CYAN : 'rgba(255,255,255,.14)'; ctx.fill();
          txt(ctx, it.letter, lx + 18 + bs / 2, y - ch + 18 + ch / 2 + 17,
            { size: 30, weight: 700, align: 'center', color: '#08222a', stroke: false });
          txt(ctx, it.t, lx + 18 + bs + 18, y - ch + 18 + ch / 2 + 15,
            { size: size, weight: on ? 700 : 400, color: on ? '#ffffff' : SUB, stroke: false });
        } else {
          txt(ctx, it.t, lx + it.w / 2, y - ch + 18 + ch / 2 + 15,
            { size: size, weight: on ? 700 : 400, align: 'center', color: on ? '#ffffff' : SUB, stroke: false });
        }
        ctx.restore();
        lx += it.w + gap; idx++;
      }
      y += ch + 26;
    }
    ctx.restore();
  }
  function stage(ctx, spec, p, alpha){
    if(alpha <= 0.01) return;
    var box = { x: PAD, y: STAGE_TOP, w: W - PAD * 2, h: 470 };
    ctx.save();
    ctx.globalAlpha = alpha;
    if(spec.subj === 'math') stageMath(ctx, spec, p, box);
    else if(spec.subj === 'pol') stagePol(ctx, spec, p, box);
    else stageEng(ctx, spec, p, box);
    ctx.restore();
  }

  /* ---------------- 选项卡 ---------------- */
  function optCard(ctx, spec, i, o){
    o = o || {};
    var n = spec.opts.length;
    var h = Math.min(150, (STAGE_BOT - STAGE_TOP - (n - 1) * 20) / n);
    var y = o.top + i * (h + 20);
    var x = PAD, w = W - PAD * 2;
    var p = o.p == null ? 1 : clamp(o.p, 0, 1);
    var e = easeOut(p);
    ctx.save();
    ctx.globalAlpha = p;
    ctx.translate((1 - e) * 220, 0);
    if(o.wrong){
      var shake = Math.sin(o.shakeP * 34) * 8 * (1 - o.shakeP);
      ctx.translate(shake, 0);
    }
    if(o.right){
      var sc = 1 + 0.045 * Math.sin(o.pulseP * 9) * (1 - o.pulseP * .4) + 0.03 * easeOut(o.pulseP);
      ctx.translate(x + w / 2, y + h / 2); ctx.scale(sc, sc); ctx.translate(-(x + w / 2), -(y + h / 2));
    }
    rr(ctx, x, y, w, h, 26);
    var bg = ctx.createLinearGradient(x, y, x + w, y + h);
    if(o.right){ bg.addColorStop(0, hexA(GREEN, .30)); bg.addColorStop(1, hexA(GREEN, .12)); }
    else if(o.wrong){ bg.addColorStop(0, 'rgba(255,255,255,.05)'); bg.addColorStop(1, 'rgba(255,255,255,.02)'); }
    else { bg.addColorStop(0, PANEL2); bg.addColorStop(1, PANEL); }
    ctx.fillStyle = bg; ctx.fill();
    ctx.lineWidth = o.right ? 6 : 3;
    ctx.strokeStyle = o.right ? GREEN : (o.wrong ? 'rgba(255,255,255,.10)' : LINE);
    ctx.stroke();
    // 字母徽标
    var bs = h * 0.52;
    rr(ctx, x + 26, y + (h - bs) / 2, bs, bs, bs / 2);
    ctx.fillStyle = o.right ? GREEN : (o.wrong ? 'rgba(255,255,255,.10)' : hexA(SUBJ[spec.subj].c, .9));
    ctx.fill();
    txt(ctx, String.fromCharCode(65 + i), x + 26 + bs / 2, y + h / 2 + bs * .18, {
      size: bs * .56, weight: 900, align: 'center', color: o.wrong ? DIM : '#1a0a1e', stroke: false
    });
    var tx = x + 26 + bs + 28, tw = w - (26 + bs + 28) * 2 + 20;
    var lines = wrap(ctx, spec.opts[i], tw, FS.opt, o.right ? 700 : 400);
    var lh = FS.opt * 1.25;
    var startY = y + h / 2 - (Math.min(lines.length, 2) - 1) * lh / 2 + FS.opt * .35;
    for(var k = 0; k < Math.min(lines.length, 2); k++){
      txt(ctx, lines[k], tx, startY + k * lh, {
        size: FS.opt, weight: o.right ? 700 : 400,
        color: o.right ? '#ffffff' : (o.wrong ? DIM : TXT), stroke: false
      });
    }
    // 打叉 / 打勾
    if(o.wrong && o.xP > 0){
      var xp = easeOut(clamp(o.xP, 0, 1));
      var cxx = x + w - 66, cyy = y + h / 2, r2 = 34;
      ctx.strokeStyle = RED; ctx.lineWidth = 10; ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cxx - r2, cyy - r2); ctx.lineTo(cxx - r2 + 2 * r2 * xp, cyy - r2 + 2 * r2 * xp);
      ctx.moveTo(cxx + r2, cyy - r2); ctx.lineTo(cxx + r2 - 2 * r2 * xp, cyy - r2 + 2 * r2 * xp);
      ctx.stroke();
      ctx.globalAlpha *= (1 - o.xP * 0.45);
    }
    if(o.right && o.tickP > 0){
      var tp = easeOut(clamp(o.tickP, 0, 1));
      ctx.strokeStyle = GREEN; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      var gx = x + w - 90, gy = y + h / 2;
      ctx.beginPath();
      ctx.moveTo(gx - 30, gy); ctx.lineTo(gx - 30 + 26 * tp, gy + 26 * tp);
      if(tp > .45){ var t2 = (tp - .45) / .55; ctx.lineTo(gx - 4 + 44 * t2, gy + 26 - 56 * t2); }
      ctx.stroke();
    }
    ctx.restore();
    return { x: x, y: y, w: w, h: h };
  }

  /* ---------------- 粒子撒花 ---------------- */
  function confetti(ctx, spec, p, cy){
    if(p <= 0) return;
    var rnd = mulberry32(spec.seed + 99);
    ctx.save();
    for(var i = 0; i < 44; i++){
      var sp = clamp((p - rnd() * 0.25) / 0.75, 0, 1);
      if(sp <= 0) continue;
      var a = rnd() * Math.PI * 2, d = 120 + rnd() * 420;
      var x = W / 2 + Math.cos(a) * d * sp, y = cy + Math.sin(a) * d * sp + 260 * sp * sp;
      ctx.globalAlpha = 1 - sp;
      ctx.fillStyle = [GOLD, GREEN, SUBJ[spec.subj].c, SUBJ[spec.subj].c2, '#fff'][i % 5];
      ctx.save(); ctx.translate(x, y); ctx.rotate(sp * 8 + i);
      ctx.fillRect(-8, -8, 16, 16); ctx.restore();
    }
    ctx.restore();
  }

  /* =======================================================================
     build(q)：把一道题编译成讲解 spec
     ======================================================================= */
  function build(q, opt){
    opt = opt || {};
    q = q || {};
    var subj = subjOf(q);
    var S = SUBJ[subj];
    var isChoice = (q.t !== 'fill') && Array.isArray(q.o) && q.o.length > 0;
    var opts = isChoice ? q.o.map(function(x){ return plain(x); }) : [];
    var ai = isChoice ? clamp(parseInt(q.a, 10) || 0, 0, opts.length - 1) : -1;
    var answer = isChoice ? opts[ai] : ansText(q);
    var stem = plain(q.q);
    var steps = splitSol(q.sol);
    var hint = plain(q.hint);
    var modNm = plain(q.mod) || '';
    var paper = plain(q.paper);
    var no = q.no == null ? '' : String(q.no);
    var paperTail = [paper, no ? ('第 ' + no + ' 题') : '', modNm].filter(Boolean).join(' · ').slice(0, 46)
                    || (String(q.id || '').slice(0, 40));

    var spec = {
      qid: String(q.id || 'unknown'),
      subj: subj, subjName: S.name,
      mod: String(q.m || ''), modName: modNm,
      paper: paper, no: no, paperTail: paperTail,
      t: isChoice ? 'choice' : 'fill',
      isChoice: isChoice,
      opts: opts, ai: ai, answer: answer,
      stem: stem, steps: steps, hint: hint,
      kw: keywords(stem, 5),
      ewords: plain(q.q).split(/\s+/).filter(Boolean).slice(0, 34),
      seed: hash(q.id || stem) % 100000,
      w: W, h: H,
      scenes: [], caps: [], chapters: [], total: 0,
      /* 溯源留痕：动画里所有「内容型文字」的来源，供单测校验（禁止编造） */
      prov: {
        stem: stem, opts: opts.slice(), answer: answer,
        steps: steps.slice(), hint: hint, modName: modNm, paper: paper,
        hasSol: steps.length > 0, hasOpts: opts.length > 0
      }
    };
    if(!isChoice && !answer) spec.prov.answerMissing = true;
    /* 政治概念图的卫星节点优先取「干扰项」——它们本身就是一组待辨析的概念，
       比从题干里硬切词准确得多（中文无分词器，切词极易切碎/切错） */
    if(isChoice && opts.length > 1){
      var distract = opts.filter(function(o, i){ return i !== ai && o; }).slice(0, 5);
      if(distract.length >= 2) spec.kw = distract;
    }
    if(spec.kw.length < 2) spec.kw = keywords(stem + ' ' + answer, 5);
    if(spec.kw.length < 2) spec.kw = keywords(answer, 3);
    /* v3.9.0：① 真·函数曲线（高数题把题干里的函数真画出来）② 收尾记忆口诀（取内置口诀库） */
    spec.plot = buildPlot(q);
    spec.memo = pickMemo(spec, q);
    spec._ph = 'stem';

    var sc = [];
    var push = function(o){ sc.push(o); };
    var caps = [];
    function addCaps(t0, dur, arr){
      if(!arr || !arr.length) return;
      var each = dur / arr.length;
      arr.forEach(function(t, i){
        if(!t) return;
        caps.push({ t0: t0 + i * each, t1: t0 + (i + 1) * each, text: t });
      });
    }

    /* --- S1 片头题卡（v3.9.0：砍废话，1.8 秒带过，把时间留给真正的推演） --- */
    push({
      id: 'cover', name: '片头', dur: 1.8,
      caps: [spec.subjName + ' · ' + (modNm || '综合'), (paperTail || spec.qid)],
      draw: function(ctx, p){
        var e = easeOutBack(clamp(p * 1.7, 0, 1));
        var r = 190;
        ctx.save();
        ctx.translate(W / 2, 700); ctx.scale(e, e);
        ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.2832);
        var g = ctx.createLinearGradient(-r, -r, r, r);
        g.addColorStop(0, S.c); g.addColorStop(1, S.c2);
        ctx.fillStyle = g; ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 6; ctx.stroke();
        txt(ctx, S.ico, 0, 44, { size: 190, weight: 900, align: 'center', color: '#1a0a1e', stroke: false });
        // 旋转外环
        ctx.save(); ctx.rotate(p * 2.2);
        ctx.strokeStyle = hexA('#ffffff', .35); ctx.lineWidth = 5;
        ctx.setLineDash([34, 26]);
        ctx.beginPath(); ctx.arc(0, 0, r + 34, 0, 6.2832); ctx.stroke();
        ctx.restore();
        ctx.restore();

        var e2 = clamp((p - .25) / .5, 0, 1);
        ctx.save(); ctx.globalAlpha = e2;
        txt(ctx, '2D 动画讲解', W / 2, 1010, { size: 92, weight: 900, align: 'center', color: '#fff', glow: S.c, glowSize: 46 });
        txt(ctx, spec.subjName + (modNm ? ' · ' + modNm : ''), W / 2, 1096, { size: 46, weight: 800, align: 'center', color: S.c });
        ctx.restore();
        var e3 = clamp((p - .5) / .5, 0, 1);
        ctx.save(); ctx.globalAlpha = e3;
        rr(ctx, W / 2 - 300, 1180, 600, 84, 42);
        ctx.fillStyle = 'rgba(255,255,255,.07)'; ctx.fill();
        ctx.strokeStyle = hexA(S.c, .55); ctx.lineWidth = 3; ctx.stroke();
        txt(ctx, paperTail || spec.qid, W / 2, 1234, { size: 32, weight: 700, align: 'center', color: SUB, stroke: false });
        ctx.restore();
      }
    });

    /* --- S2 题干浮现（带三科差异化舞台） --- */
    var stemLines = wrapMeasure(stem, W - PAD * 2, FS.stem, 700);
    push({
      id: 'stem', name: '题干', dur: clamp(1.8 + 0.62 * stemLines, 2.4, 7.2),
      caps: ['先看清题目到底在问什么', stem.slice(0, 60)],
      draw: function(ctx, p){
        stage(ctx, spec, clamp(p * 1.15, 0, 1), clamp(p * 3, 0, 1) * (spec.subj === 'eng' ? 1 : .95));
        var e = clamp(p / .8, 0, 1);
        var y = spec.subj === 'eng' ? 900 : 1000;
        para(ctx, stem, PAD, y, W - PAD * 2, FS.stem, {
          weight: 700, color: '#fff', progress: e, stagger: .12, each: .55
        });
        // 题干高亮底线
        var bp = clamp((p - .35) / .5, 0, 1);
        ctx.save();
        ctx.strokeStyle = hexA(S.c, .8); ctx.lineWidth = 6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(PAD, y + 34); ctx.lineTo(PAD + (W - PAD * 2) * bp, y + 34); ctx.stroke();
        ctx.restore();
        chip(ctx, '题　干', PAD, y - 118, { size: 28, c: S.c, c2: S.c2 });
      }
    });

    /* v3.9.0 的 S2B「破题思路」场景已并入下方教授讲解的「破题思路」段（题库提示作为第一条），
       避免出现两个同名场景、也避免同一件事讲两遍。 */

    /* --- S3 选项飞入 / 填空题求解卡 --- */
    if(isChoice){
      push({
        id: 'options', name: '选项', dur: clamp(1.4 + 0.62 * opts.length, 2.2, 5.0),
        caps: ['四个选项，先别急着选', '把每项都读一遍'],
        draw: function(ctx, p){
          var n = opts.length;
          var h = Math.min(150, (STAGE_BOT - STAGE_TOP - (n - 1) * 20) / n);
          var top = STAGE_TOP + 40;
          chip(ctx, '选　项', PAD, top - 110, { size: 28, c: S.c, c2: S.c2 });
          for(var i = 0; i < n; i++){
            var pp = clamp((p - i * 0.14) / 0.6, 0, 1);
            if(pp <= 0) continue;
            optCard(ctx, spec, i, { p: pp, top: top });
          }
        }
      });
      /* --- S4 排除法（v3.9.0：解析步骤 ≥2 时整段跳过 —— 没理由地逐个打叉，正是「讲了个寂寞」的元凶）
             只有在没有文字解析可讲时，才用「排除 + 直给答案」兜底 --- */
      var wrongIdx = [];
      for(var w0 = 0; w0 < opts.length; w0++) if(w0 !== ai) wrongIdx.push(w0);
      if(steps.length < 2){
        push({
          id: 'eliminate', name: '排除法', dur: clamp(0.7 + 0.72 * wrongIdx.length, 1.4, 4.6),
          caps: wrongIdx.map(function(i){ return '排除 ' + String.fromCharCode(65 + i); }),
          draw: function(ctx, p){
            var n = opts.length;
            var top = STAGE_TOP + 40;
            chip(ctx, '排 除 法', PAD, top - 110, { size: 28, c: RED, c2: '#ff9ed6' });
            for(var i = 0; i < n; i++){
              if(i === ai){ optCard(ctx, spec, i, { p: 1, top: top }); continue; }
              var k = wrongIdx.indexOf(i);
              var st = clamp((p - k * 0.24) / 0.4, 0, 1);
              if(st <= 0){ optCard(ctx, spec, i, { p: 1, top: top }); continue; }
              optCard(ctx, spec, i, {
                p: 1, top: top, wrong: true,
                shakeP: clamp(st / .45, 0, 1),
                xP: clamp((st - .45) / .55, 0, 1)
              });
            }
          }
        });
      }
    } else {
      push({
        id: 'ask', name: '求解目标', dur: 3.0,
        caps: ['填空题：先找已知，再找要你求什么', '答案要写最简形式'],
        draw: function(ctx, p){
          var e = easeOut(clamp(p / .7, 0, 1));
          ctx.save(); ctx.globalAlpha = e;
          var y = STAGE_TOP + 120, w = W - PAD * 2;
          rr(ctx, PAD, y, w, 260, 32);
          ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fill();
          ctx.strokeStyle = hexA(S.c, .6); ctx.lineWidth = 4; ctx.stroke();
          chip(ctx, '已　知', PAD + 34, y + 40, { size: 28, c: S.c, c2: S.c2 });
          para(ctx, stem.slice(0, 70), PAD + 34, y + 150, w - 68, 40, { weight: 700, color: TXT, progress: clamp(p / .6, 0, 1) });
          ctx.restore();
          var e2 = clamp((p - .45) / .55, 0, 1);
          ctx.save(); ctx.globalAlpha = e2;
          var y2 = y + 320;
          rr(ctx, PAD, y2, W - PAD * 2, 200, 32);
          ctx.fillStyle = hexA(GOLD, .12); ctx.fill();
          ctx.setLineDash([16, 12]);
          ctx.strokeStyle = hexA(GOLD, .8); ctx.lineWidth = 5; ctx.stroke();
          ctx.setLineDash([]);
          txt(ctx, '求解目标 = ?', W / 2, y2 + 122, { size: 62, weight: 900, align: 'center', color: GOLD });
          ctx.restore();
        }
      });
    }

    /* --- S5 解析分步推演（v3.9.0：升格为成片主体 —— 逐步推演 + 公式高亮 + 高数真曲线随讲随画；
             答案揭晓已挪到推演之后：先讲清为什么，再告诉你是什么） --- */
    var solSteps = steps.length ? steps : [];
    var solFrom = steps.length ? 'sol' : 'none';
    spec.prov.solFrom = solFrom;
    var hasPlot = !!(spec.plot && spec.plot.fn);

    /* --- S5 教授级六段讲解（v3.10.0）
           考点定位 → 破题思路 → 为什么这么做 → 分步推演 → 易错警示 → 一句带走
           内容来自 data/lecture.js；LECTURE 不可用时自动退回原来的解析推演 --- */
    var lec = null;
    try{
      if(typeof LECTURE !== 'undefined' && LECTURE.build){
        lec = LECTURE.build(q, (typeof QSTEP !== 'undefined' && QSTEP.pick) ? QSTEP.pick(q) : {});
      }
    }catch(e){ lec = null; }
    if(lec && lec.seg && lec.seg.length){
      /* 题库自带的思路提示并进「破题思路」段，作为第一条线索 */
      if(hint){
        for(var li = 0; li < lec.seg.length; li++){
          if(lec.seg[li].id === 'brk'){ lec.seg[li].lines = ['💡 ' + hint].concat(lec.seg[li].lines); break; }
        }
      }
      var SHORT = {
        aim:  [GOLD,  '考 点 定 位'],
        brk:  [S.c,   '破 题 思 路'],
        why:  [S.c2,  '为 什 么 这 么 做'],
        lead: [GREEN, '分 步 推 演'],
        trap: [RED,   '易 错 警 示'],
        close:[GOLD,  '一 句 带 走']
      };
      lec.seg.forEach(function(sg){
        var cfg = SHORT[sg.id] || [S.c, '讲 解'];
        var isLead = (sg.id === 'lead');
        var isClose = (sg.id === 'close');
        var dur = isLead ? clamp(2.4 + 2.7 * sg.lines.length, 4.2, 28)
                         : clamp(1.9 + 0.085 * sg.lines.join('').length, 2.2, 6.4);
        push({
          id: 'lec_' + sg.id, name: sg.name, dur: dur,
          caps: sg.lines.slice(0, 8).map(function(x){ return x.slice(0, 40); }),
          draw: function(ctx, p){
            chip(ctx, cfg[1], PAD, 250, { size: 28, c: cfg[0], c2: sg.id === 'trap' ? '#ff9ed6' : '#fff' });
            /* 高数题：推演段把真曲线一直画在上方，边讲边看图 */
            if(isLead && hasPlot) stage(ctx, spec, clamp(p * 1.2, 0, 1), 1);
            var n = sg.lines.length;
            var top = isClose ? 600 : ((isLead && hasPlot) ? 810 : 370);
            var fs = isClose ? 56 : (isLead ? (hasPlot ? 38 : FS.sol) : FS.sol);
            var each = Math.min(isLead ? (hasPlot ? 132 : 208) : 226, (CAP_TOP - 120 - top) / Math.max(1, n));
            /* v3.10.1 分步推演自适应排版：先量出每步占几行，按内容分配高度；放不下就缩字号，
               保证最后一步不与底部字幕区重叠 */
            var hts = null, y0s = null;
            if(isLead){
              var avail = CAP_TOP - 140 - top;
              var maxW0 = W - PAD * 2 - 136;
              for(;;){
                hts = sg.lines.map(function(ln){
                  var ls = wrap(ctx, String(ln).replace(/<[^>]+>/g, ' '), maxW0, fs, 700);
                  return Math.max(1, ls.length) * fs * 1.34 + 26;
                });
                var tot = 0; for(var ti = 0; ti < hts.length; ti++) tot += hts[ti];
                if(tot <= avail || fs <= 26) break;
                fs -= 2;
              }
              y0s = []; var yy = top;
              for(var yi = 0; yi < hts.length; yi++){ y0s.push(yy); yy += hts[yi]; }
            }
            for(var i = 0; i < n; i++){
              var sp = clamp((p - i * (isLead ? 0.15 : 0.2)) / 0.5, 0, 1);
              if(sp <= 0) continue;
              var e = easeOut(sp);
              var y = isLead ? y0s[i] : top + i * each;
              var hh = isLead ? hts[i] - 14 : each - 20;
              ctx.save();
              ctx.globalAlpha = sp;
              ctx.translate((1 - e) * 70, 0);
              if(isClose){
                var cl = wrap(ctx, sg.lines[i], W - PAD * 2 - 80, fs, 900);
                for(var c2 = 0; c2 < Math.min(cl.length, 3); c2++){
                  txt(ctx, cl[c2], W / 2, y + c2 * (fs * 1.34), { size: fs, weight: 900, align: 'center', color: GOLD, stroke: true });
                }
                ctx.restore(); continue;
              }
              rr(ctx, PAD, y, W - PAD * 2, hh, 22);
              ctx.fillStyle = sg.id === 'trap' ? hexA(RED, .12) : (sg.id === 'aim' ? hexA(GOLD, .10) : 'rgba(255,255,255,.055)');
              ctx.fill();
              ctx.strokeStyle = sg.id === 'trap' ? hexA(RED, .5) : (sg.id === 'aim' ? hexA(GOLD, .45) : 'rgba(255,255,255,.10)');
              ctx.lineWidth = 3; ctx.stroke();
              if(isLead && sp < 1){ ctx.strokeStyle = hexA(GOLD, .8); ctx.lineWidth = 4; ctx.stroke(); }  // 正在讲的步骤：金边聚焦
              var lx = PAD + 40;
              if(isLead){
                var bs = Math.min(52, hh - 8);
                rr(ctx, PAD + 22, y + (hh - bs) / 2, bs, bs, bs / 2);
                ctx.fillStyle = i === n - 1 ? GREEN : hexA(S.c, .85); ctx.fill();
                txt(ctx, String(i + 1), PAD + 22 + bs / 2, y + hh / 2 + bs * .24, { size: Math.min(32, bs * .6), weight: 900, align: 'center', color: '#1a0a1e', stroke: false });
                lx = PAD + 96;
              }
              var maxW = W - PAD * 2 - (lx - PAD) - 40;
              var lh = fs * 1.34;
              richLine(ctx, sg.lines[i], lx, y + hh / 2 - fs * .5, maxW, fs, 700, Math.min(4, Math.floor(hh / lh) + 1) * lh);
              ctx.restore();
            }
          }
        });
      });
    } else {
    push({
      id: 'solution', name: '解析推演', dur: clamp(2.4 + 2.7 * solSteps.length, 4.0, 22),
      caps: solSteps.length ? solSteps.map(function(s, i){ return '第 ' + (i + 1) + ' 步 · ' + s.slice(0, 34); }) : ['这题暂无文字解析，先记住套路'],
      draw: function(ctx, p){
        chip(ctx, solFrom === 'sol' ? '解 析 推 演' : '思 路 提 示', PAD, 250, { size: 28, c: S.c, c2: S.c2 });
        /* 高数题：舞台持续画着这条真曲线，跟着讲解一起演化 —— 边讲边看图 */
        if(hasPlot) stage(ctx, spec, clamp(p * 1.2, 0, 1), 1);
        var n = solSteps.length;
        var y0 = hasPlot ? 800 : 380;
        var each = Math.min(hasPlot ? 128 : 210, (CAP_TOP - 130 - y0) / Math.max(1, n));
        var fs = hasPlot ? 38 : FS.sol;
        for(var i = 0; i < n; i++){
          var sp = clamp((p - i * 0.16) / 0.55, 0, 1);
          if(sp <= 0) continue;
          var e = easeOut(sp);
          var y = y0 + i * each;
          ctx.save();
          ctx.globalAlpha = sp;
          ctx.translate((1 - e) * 90, 0);
          var hh = each - 20;
          rr(ctx, PAD, y, W - PAD * 2, hh, 24);
          ctx.fillStyle = i === n - 1 ? hexA(GREEN, .13) : 'rgba(255,255,255,.055)';
          ctx.fill();
          ctx.strokeStyle = i === n - 1 ? hexA(GREEN, .55) : 'rgba(255,255,255,.10)';
          ctx.lineWidth = 3; ctx.stroke();
          if(sp < 1){ ctx.strokeStyle = hexA(GOLD, .85); ctx.lineWidth = 4; ctx.stroke(); }   // 正在讲的那一步：金边聚焦
          var bs = Math.min(54, hh - 8);
          rr(ctx, PAD + 24, y + (hh - bs) / 2, bs, bs, bs / 2);
          ctx.fillStyle = i === n - 1 ? GREEN : hexA(S.c, .85); ctx.fill();
          txt(ctx, String(i + 1), PAD + 24 + bs / 2, y + hh / 2 + bs * .24, { size: Math.min(34, bs * .62), weight: 900, align: 'center', color: '#1a0a1e', stroke: false });
          /* 公式高亮：算式与数字走金色、叙述走白色 —— 一眼看清算的是哪一步 */
          var maxW = W - PAD * 2 - 150;
          var lines = wrap(ctx, solSteps[i], maxW, fs, 700);
          var lh = fs * 1.3, sy = y + hh / 2 - (Math.min(lines.length, 3) - 1) * lh / 2 + fs * .36;
          richLine(ctx, solSteps[i], PAD + 100, sy, maxW, fs, 700, Math.min(lines.length, 3) * lh);
          ctx.restore();
        }
        if(!n){
          ctx.save(); ctx.globalAlpha = clamp(p / .4, 0, 1);
          txt(ctx, '本题暂无文字解析，先看答案反推每一步', W / 2, 900, { size: 42, weight: 800, align: 'center', color: SUB });
          ctx.restore();
        }
      }
    });
    }   // ← v3.10.0：LECTURE 不可用时的兜底分支结束

    /* --- S6 答案揭晓（v3.9.0：移到解析推演之后 —— 先讲清为什么，再揭晓答案） --- */
    push({
      id: 'reveal', name: '答案揭晓', dur: 2.6,
      caps: [isChoice ? ('正确答案是 ' + String.fromCharCode(65 + ai)) : '答案揭晓',
             isChoice ? (String.fromCharCode(65 + ai) + '. ' + answer) : ('答案：' + answer)].filter(Boolean),
      draw: function(ctx, p){
        if(isChoice){
          var n = opts.length;
          var h = Math.min(150, (STAGE_BOT - STAGE_TOP - (n - 1) * 20) / n);
          var top = STAGE_TOP + 40;
          for(var i = 0; i < n; i++){
            if(i === ai) continue;
            optCard(ctx, spec, i, { p: 1, top: top, wrong: true, shakeP: 1, xP: 1 });
          }
          var rp = clamp(p / .6, 0, 1);
          optCard(ctx, spec, ai, { p: 1, top: top, right: true, pulseP: clamp(p / 1, 0, 1), tickP: clamp((p - .35) / .5, 0, 1) });
          confetti(ctx, spec, clamp((p - .3) / .7, 0, 1), top + h / 2);
        } else {
          var e = easeOutElastic(clamp(p / .8, 0, 1));
          ctx.save();
          ctx.translate(W / 2, 820); ctx.scale(e, e);
          var w2 = 760, h2 = 300;
          rr(ctx, -w2 / 2, -h2 / 2, w2, h2, 40);
          var g = ctx.createLinearGradient(-w2 / 2, -h2 / 2, w2 / 2, h2 / 2);
          g.addColorStop(0, hexA(GREEN, .35)); g.addColorStop(1, hexA(S.c, .22));
          ctx.fillStyle = g; ctx.fill();
          ctx.strokeStyle = GREEN; ctx.lineWidth = 7; ctx.stroke();
          ctx.restore();
          txt(ctx, '答案', W / 2, 760, { size: 40, weight: 800, align: 'center', color: GREEN });
          var lines = wrap(ctx, answer || '（本题暂无标准答案）', w2 - 90, 62, 900);
          for(var k = 0; k < Math.min(lines.length, 3); k++){
            txt(ctx, lines[k], W / 2, 850 + k * 84, { size: 62, weight: 900, align: 'center', color: '#fff' });
          }
          confetti(ctx, spec, clamp((p - .35) / .65, 0, 1), 820);
        }
      }
    });

    /* --- S6B 考场默念口诀（v3.10.0：题级短咒，进考场前脑子里过一遍就能用） --- */
    if(spec.memo){
      push({
        id: 'mnem', name: '考场默念', dur: 4.0,
        caps: ['考场默念：' + String(spec.memo).split('\n')[0].slice(0, 30)],
        draw: function(ctx, p){
          chip(ctx, '考 场 默 念', PAD, 250, { size: 28, c: GOLD, c2: '#f59e0b' });
          var e = easeOut(clamp(p / .7, 0, 1));
          ctx.save(); ctx.globalAlpha = e;
          var y = 380, w = W - PAD * 2;
          rr(ctx, PAD, y, w, 660, 32);
          ctx.fillStyle = hexA(GOLD, .09); ctx.fill();
          ctx.strokeStyle = hexA(GOLD, .6); ctx.lineWidth = 4; ctx.stroke();
          var lines = wrap(ctx, spec.memo, w - 110, 40, 700);
          for(var k2 = 0; k2 < Math.min(lines.length, 8); k2++){
            txt(ctx, lines[k2], PAD + 55, y + 96 + k2 * 62, { size: 40, weight: 700, color: k2 === 0 ? GOLD : '#fff', stroke: false });
          }
          ctx.restore();
        }
      });
    }

    /* --- S7 结尾记忆点 --- */
    var outro = hint ? hint : (steps.length ? steps[steps.length - 1] : '');
    push({
      id: 'outro', name: '记忆点', dur: 3.6,
      caps: [('记住：' + (answer || '')).slice(0, 40) , '再看一遍 ↻'].filter(Boolean),
      draw: function(ctx, p){
        var e = easeOutBack(clamp(p / .6, 0, 1));
        ctx.save();
        ctx.translate(W / 2, 620); ctx.scale(e, e);
        rr(ctx, -420, -110, 840, 220, 44);
        var g = ctx.createLinearGradient(-420, -110, 420, 110);
        g.addColorStop(0, hexA(GREEN, .35)); g.addColorStop(1, hexA(S.c, .28));
        ctx.fillStyle = g; ctx.fill();
        ctx.strokeStyle = hexA('#ffffff', .5); ctx.lineWidth = 4; ctx.stroke();
        txt(ctx, '正确答案', 0, -46, { size: 36, weight: 800, align: 'center', color: GREEN, stroke: false });
        var big = (isChoice ? String.fromCharCode(65 + ai) + '. ' : '') + (answer || '—');
        var lines = wrap(ctx, big, 740, 68, 900);
        for(var k = 0; k < Math.min(lines.length, 2); k++){
          txt(ctx, lines[k], 0, 34 + k * 82, { size: 68, weight: 900, align: 'center', color: '#fff' });
        }
        ctx.restore();
        var e2 = clamp((p - .35) / .5, 0, 1);
        ctx.save(); ctx.globalAlpha = e2;
        chip(ctx, '记 忆 点', PAD, 860, { size: 28, c: GOLD, c2: '#f59e0b' });
        if(outro){
          var ls = wrap(ctx, outro, W - PAD * 2, 40, 700);
          for(var i = 0; i < Math.min(ls.length, 4); i++){
            txt(ctx, ls[i], PAD, 970 + i * 62, { size: 40, weight: 700, color: TXT });
          }
        }
        ctx.restore();
        var e3 = clamp((p - .55) / .45, 0, 1);
        ctx.save(); ctx.globalAlpha = e3 * (0.6 + 0.4 * Math.sin(p * 18));
        txt(ctx, '↻ 再看一遍', W / 2, 1300, { size: 46, weight: 900, align: 'center', color: GOLD });
        ctx.restore();
      }
    });

    /* --- 计算时间轴 --- */
    var t = 0;
    sc.forEach(function(s){
      s.t0 = t; s.t1 = t + s.dur; t += s.dur;
      addCaps(s.t0, s.dur, s.caps);
    });
    var raw = t;
    /* 时长归一到 30~60 秒（团队硬规范） */
    var MIN = opt.minDur || 30, MAX = opt.maxDur || 60;
    var k = 1;
    if(raw < MIN) k = MIN / raw;
    else if(raw > MAX) k = MAX / raw;
    if(Math.abs(k - 1) > 1e-6){
      t = 0;
      sc.forEach(function(s){ s.dur *= k; s.t0 = t; s.t1 = t + s.dur; t += s.dur; });
      caps.length = 0;
      sc.forEach(function(s){ addCaps(s.t0, s.dur, s.caps); });
    }
    /* 浮点累积漂移修正（P0 必修）：被拉伸到下限 / 压缩到上限时，总时间硬对齐
       MIN/MAX。否则 raw<30 的题经 k=MIN/raw 缩放后会出现 29.999999999999996
       这类 <30 秒的越界（全库 406 题）。 */
    if(raw < MIN - 1e-9) t = MIN;
    else if(raw > MAX + 1e-9) t = MAX;
    spec.scenes = sc;
    spec.caps = caps;
    spec.chapters = sc.map(function(s){ return { id: s.id, name: s.name, t0: s.t0 }; });
    spec.total = Math.round(t * 1000) / 1000;
    spec.rawTotal = raw;
    return spec;
  }

  /* node 环境无 canvas 时的行数估算兜底 */
  var _mctx = null;
  function wrapMeasure(s, maxW, size, weight){
    if(typeof document === 'undefined') return Math.max(1, Math.ceil(s.length * size / maxW * 1.05));
    try{
      if(!_mctx) _mctx = document.createElement('canvas').getContext('2d');
      return wrap(_mctx, s, maxW, size, weight).length;
    }catch(e){ return Math.max(1, Math.ceil(s.length * size / maxW * 1.05)); }
  }

  /* ---------------- 逐帧渲染 ---------------- */
  function sceneAt(spec, time){
    for(var i = 0; i < spec.scenes.length; i++){
      var s = spec.scenes[i];
      if(time < s.t1 || i === spec.scenes.length - 1) return s;
    }
    return spec.scenes[spec.scenes.length - 1];
  }
  function capAt(spec, time){
    for(var i = 0; i < spec.caps.length; i++){
      var c = spec.caps[i];
      if(time >= c.t0 && time < c.t1){
        var f = (time - c.t0) / Math.max(.001, c.t1 - c.t0);
        var a = Math.min(clamp(f / .12, 0, 1), clamp((1 - f) / .12, 0, 1));
        return { text: c.text, alpha: a };
      }
    }
    return null;
  }
  function renderFrame(ctx, spec, time){
    if(!spec || !ctx) return;
    time = clamp(time, 0, spec.total);
    var s = sceneAt(spec, time);
    var p = clamp((time - s.t0) / Math.max(.001, s.dur), 0, 1);
    ctx.clearRect(0, 0, W, H);
    drawBg(ctx, spec, time);
    drawTop(ctx, spec);
    /* 舞台内容统一 clip 到 y ≤ 1450，任何溢出都不会压到字幕区（规范 D 区红线） */
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 200, W, CAP_TOP - 200); ctx.clip();
    s.draw(ctx, p, time);
    ctx.restore();
    var c = capAt(spec, time);
    if(c) drawCaption(ctx, c.text, c.alpha);
    drawProgress(ctx, spec, time / spec.total, time);
    drawWatermark(ctx, spec);
  }

  /* =======================================================================
     播放器（浏览器）
     ======================================================================= */
  var player = null;
  function open(q, opt){
    if(typeof document === 'undefined') return null;
    opt = opt || {};
    var spec = build(q, opt);
    close();
    var ov = document.createElement('div');
    ov.id = 'anim2dOverlay';
    ov.style.cssText = 'position:fixed;inset:0;z-index:9998;background:#07040c;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:10px;animation:popIn .28s ease';
    var stage = document.createElement('div');
    stage.style.cssText = 'position:relative;flex:1;display:flex;align-items:center;justify-content:center;width:100%;min-height:0';
    var cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    cv.style.cssText = 'max-height:100%;max-width:100%;aspect-ratio:9/16;border-radius:16px;box-shadow:0 18px 50px rgba(0,0,0,.6);background:#0c0814';
    stage.appendChild(cv);
    ov.appendChild(stage);
    var ctx = cv.getContext('2d');

    var bar = document.createElement('div');
    bar.style.cssText = 'width:100%;max-width:520px;display:flex;align-items:center;gap:8px;color:#f3ecff;font-size:12px';
    var btn = function(t, fn, ghost){
      var b = document.createElement('button');
      b.textContent = t;
      b.style.cssText = 'border:0;border-radius:11px;padding:9px 12px;font-size:13px;font-weight:800;cursor:pointer;' +
        (ghost ? 'background:#251a3f;color:#f3ecff;border:1px solid #3a2a5e' : 'background:linear-gradient(135deg,#ffd166,#f59e0b);color:#231600');
      b.onclick = fn; return b;
    };
    var play = btn('⏸ 暂停', function(){ toggle(); });
    var rng = document.createElement('input');
    rng.type = 'range'; rng.min = 0; rng.max = 1000; rng.value = 0;
    rng.style.cssText = 'flex:1;accent-color:#ffd166';
    var lab = document.createElement('span');
    lab.style.cssText = 'font-variant-numeric:tabular-nums;min-width:74px;text-align:right;color:#b6a6e0';
    var spd = btn('1.0×', function(){ cycleSpeed(); }, true);
    var rep = btn('↻ 重播', function(){ seek(0); playIt(); }, true);
    var exp = btn('⬇ 导出', function(){ exportVideo(); }, true);
    var nrt = btn('🔊 朗读讲解', function(){ if(window.anim2dNarrate) window.anim2dNarrate(spec); }, true);
    var cls = btn('✕', function(){ close(); }, true);
    bar.appendChild(play); bar.appendChild(rng); bar.appendChild(lab);
    /* v3.10.0：分段导航条 —— 讲解分了六段，点哪段直接跳过去，方便回看没听清的那一段 */
    var starts = [], accT = 0;
    spec.scenes.forEach(function(s){ starts.push(accT); accT += s.dur; });
    var bar3 = document.createElement('div');
    bar3.style.cssText = 'width:100%;max-width:520px;display:flex;gap:6px;overflow-x:auto;padding:2px 0;scrollbar-width:none';
    var NAVN = { lec_aim: '①定位', lec_brk: '②破题', lec_why: '③为什么', lec_lead: '④推演', lec_trap: '⑤易错', lec_close: '⑥带走' };
    var navBtns = spec.scenes.map(function(s, i){
      var b = document.createElement('button');
      b.textContent = NAVN[s.id] || s.name || s.id;
      b.style.cssText = 'flex:0 0 auto;border:0;border-radius:9px;padding:6px 10px;font-size:11.5px;font-weight:800;cursor:pointer;white-space:nowrap;background:#251a3f;color:#b6a6e0;border:1px solid #3a2a5e';
      b.onclick = function(){ seek(starts[i] + 0.01); playIt(); };
      bar3.appendChild(b);
      return b;
    });
    var bar2 = document.createElement('div');
    bar2.style.cssText = 'width:100%;max-width:520px;display:flex;align-items:center;gap:8px';
    bar2.appendChild(spd); bar2.appendChild(rep); bar2.appendChild(nrt); bar2.appendChild(exp);
    bar2.appendChild(cls);
    ov.appendChild(bar); ov.appendChild(bar3); ov.appendChild(bar2);
    document.body.appendChild(ov);

    var speeds = [1, 1.5, 2, 0.75], si = 0;
    var playing = true, t = 0, last = 0, raf = 0;
    var stopRec = null;
    function fmt(s){
      s = Math.max(0, s);
      var m = Math.floor(s / 60), r = Math.floor(s % 60);
      return m + ':' + (r < 10 ? '0' : '') + r;
    }
    var curIdx = -1;
    function markNav(){
      var i = 0;
      for(var k = 0; k < starts.length; k++){ if(t >= starts[k]) i = k; }
      if(i === curIdx) return;
      curIdx = i;
      for(var k2 = 0; k2 < navBtns.length; k2++){
        var on = (k2 === i);
        navBtns[k2].style.background = on ? 'linear-gradient(135deg,#ffd166,#f59e0b)' : '#251a3f';
        navBtns[k2].style.color = on ? '#231600' : '#b6a6e0';
        navBtns[k2].style.borderColor = on ? '#ffd166' : '#3a2a5e';
      }
      var el = navBtns[i];
      if(el && bar3.scrollWidth > bar3.clientWidth){
        bar3.scrollLeft = Math.max(0, el.offsetLeft - bar3.clientWidth / 2 + el.offsetWidth / 2);
      }
    }
    function paint(){
      renderFrame(ctx, spec, t);
      rng.value = Math.round(t / spec.total * 1000);
      lab.textContent = fmt(t) + ' / ' + fmt(spec.total);
      markNav();
    }
    function loop(ts){
      if(!last) last = ts;
      var dt = (ts - last) / 1000; last = ts;
      if(playing){
        t += dt * speeds[si];
        if(t >= spec.total){
          t = spec.total;
          playing = false; play.textContent = '▶ 播放';
          if(stopRec){ try{ stopRec(); }catch(e){} stopRec = null; }
        }
      }
      paint();
      raf = requestAnimationFrame(loop);
    }
    function toggle(){
      if(t >= spec.total) t = 0;
      playing = !playing;
      play.textContent = playing ? '⏸ 暂停' : '▶ 播放';
    }
    function playIt(){ playing = true; play.textContent = '⏸ 暂停'; }
    function seek(v){ t = clamp(v, 0, spec.total); paint(); }
    function cycleSpeed(){ si = (si + 1) % speeds.length; spd.textContent = speeds[si].toFixed(2).replace(/0$/, '') + '×'; }
    rng.oninput = function(){ t = spec.total * (rng.value / 1000); paint(); };
    var onKey = function(e){
      if(e.key === 'Escape') close();
      else if(e.key === ' '){ e.preventDefault(); toggle(); }
    };
    document.addEventListener('keydown', onKey);

    player = {
      spec: spec, canvas: cv, el: ov,
      close: function(){ close(); },
      pause: function(){ playing = false; play.textContent = '▶ 播放'; },
      play: function(){ playIt(); },
      seek: seek,
      time: function(){ return t; },
      _rec: function(fn){ stopRec = fn; },
      _restart: function(){ seek(0); playIt(); }
    };
    paint();
    raf = requestAnimationFrame(loop);
    return player;
  }
  function close(){
    if(player && player.el && player.el.parentNode) player.el.parentNode.removeChild(player.el);
    player = null;
  }
  /* 导出为视频文件：MediaRecorder 录制 canvas（支持则 webm，否则提示用屏幕录制） */
  function exportVideo(){
    if(!player) return null;
    if(typeof MediaRecorder === 'undefined') return null;
    try{
      var stream = player.canvas.captureStream(30);
      var mime = 'video/webm';
      try{
        if(MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) mime = 'video/webm;codecs=vp9';
      }catch(e){}
      var mr = new MediaRecorder(stream, { mimeType: mime });
      var chunks = [];
      mr.ondataavailable = function(e){ if(e.data && e.data.size) chunks.push(e.data); };
      mr.onstop = function(){
        try{
          var blob = new Blob(chunks, { type: 'video/webm' });
          var a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'anim2d_' + player.spec.qid + '.webm';
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(function(){ URL.revokeObjectURL(a.href); }, 5000);
        }catch(e){}
      };
      player._restart();
      mr.start();
      player._rec(function(){ if(mr.state !== 'inactive') mr.stop(); });
      return mr;
    }catch(e){ return null; }
  }

  var API = {
    W: W, H: H, SUBJ: SUBJ,
    build: build, renderFrame: renderFrame, open: open, close: close, exportVideo: exportVideo,
    splitSol: splitSol, keywords: keywords, ansText: ansText, subjOf: subjOf,
    _internal: { wrap: wrap, rr: rr, txt: txt }
  };
  if(typeof module !== 'undefined' && module.exports) module.exports = API;
  global.Anim2D = API;
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
