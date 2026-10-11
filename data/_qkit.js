/* ============================================================================
   v3.10.x · 通用「答后增强面板」工具包（4 个新专项模块共用）
   ----------------------------------------------------------------------------
   问题：cloze80 / mathsec / essay / stepscore 自己写的答后渲染只内联了 q.sol /
   q.hint，缺「角色关键词提示 · AI讲师 · 收藏 · 笔记 · 诊断错因 · 变式题 · 2D动画」。
   本文件把 index.html 已有的全局能力（getMate / mateLine / qNoteBar / aiTutor /
   diagnoseErr / genVariantFlow / anim2dBtn）组装成一个标准面板，每个模块答完调
   qkitMount(anchor, q, ok, modId, opts) 即插在「下一题」之前。

   关键技巧：MOD2MATE 是 const 对象但属性可改，本文件在加载时直接把 4 个新模块
   注册进全局 MOD2MATE，使依赖 q.m 的全局函数（aiTutor / diagnoseErr / 变式 / 动画）
   能解析到正确角色 —— 全程不碰 index.html，规避并发会话改写冲突。

   角色归属（按科目，与 MATE_FOCUS 一致）：英语 → ziyuan，数学 → luo。
   ========================================================================== */
(function () {
  'use strict';

  /* 新模块 → 角色（与 MATE_FOCUS：ziyuan=英语、luo=数学 对齐） */
  var MK = { cloze80: 'ziyuan', mathsec: 'luo', essay: 'ziyuan', stepscore: 'luo' };
  window.QKIT_MATE = MK;
  /* 延迟注册：index.html 主脚本里的 MOD2MATE 定义晚于本文件加载，故不在加载时注册，
     而是在 qkitMount 首次调用（用户进入答题，那时 MOD2MATE 必然已存在）时再补登记，
     使依赖 q.m 的全局函数（aiTutor / diagnoseErr / 变式 / 动画）能解析到正确角色。 */
  function ensureMates(){
    if (typeof MOD2MATE !== 'undefined' && MOD2MATE) {
      for (var k in MK) { if (!MOD2MATE[k]) MOD2MATE[k] = MK[k]; }
    }
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  /* 角色关键词提示气泡：答后由对应角色把本题「关键词 / 秒题点」用气泡吐出来 */
  function coachBubble(modId, q, ok) {
    var mate = getMate((MOD2MATE && MOD2MATE[modId]) || 'xue');
    var who = escapeHtml(mate.name || '') + ' · 关键词提示';
    var body;
    if (q.hint) {
      body = '<span class="tip"><b>💡 ' + escapeHtml(q.hint) + '</b></span>';
    } else {
      body = escapeHtml(mateLine((MOD2MATE && MOD2MATE[modId]) || 'xue', ok, ok ? '' : 'wrongFirst'));
    }
    var c = el('div', 'coachline');
    c.innerHTML = '<img class="chat-av" src="' + (mate.img || '') + '" alt="' + escapeHtml(mate.name || '') + '" onerror="this.style.display=\'none\'">'
      + '<div class="bubble"><div class="who">' + who + '</div>' + body + '</div>';
    return c;
  }

  /* 标准答后面板
     anchor : 一个占位 div（位于「下一题」之前），面板插在它前面
     q      : 本题对象（需有 q.id / q.q / q.o / q.a / q.sol / q.hint）
     ok     : 是否答对
     modId  : 模块 id（cloze80 / mathsec / essay / stepscore）
     opts.noActions : true 时跳过 AI讲师/诊断/变式/动画（用于非选择题的 stepscore）
     opts.noChoiceTag : true 时不强制 q.t='choice' */
  window.qkitMount = function (anchor, q, ok, modId, opts) {
    opts = opts || {};
    if (!anchor || !q) return;
    var host = anchor.parentNode;
    if (!host) return;
    ensureMates();   /* 首次调用时把 4 个新模块补登记进全局 MOD2MATE */

    /* 让依赖 q.m / q.t 的全局函数（aiTutor / diagnoseErr / ansText）能正确解析 */
    q.m = modId;
    if (!opts.noChoiceTag) q.t = q.t || 'choice';

    var nodes = [];

    /* ① 角色关键词提示气泡 */
    nodes.push(coachBubble(modId, q, ok));

    /* ② 收藏 + 记笔记（全局 qNoteBar 返回 DOM，复用「我的 · 收藏夹 / 我的笔记」） */
    try { var nb = qNoteBar(q); if (nb) nodes.push(nb); } catch (e) {}

    /* ③ 操作行：AI讲师 / 诊断错因 / 变式题 / 2D动画 */
    if (!opts.noActions) {
      var row = el('div', 'btns mt10');
      var ask = el('button', 'btn ghost sm', '💬 让 TA 讲讲');
      ask.onclick = function () { try { aiTutor(q); } catch (e) { toast('AI讲师暂时不可用'); } };
      row.appendChild(ask);
      if (!ok) {
        var dg = el('button', 'btn ghost sm', '🩺 诊断错因');
        dg.onclick = function () { try { diagnoseErr(q); } catch (e) { toast('诊断暂时不可用'); } };
        row.appendChild(dg);
      }
      var vb = el('button', 'btn ghost sm', '🎲 变式题');
      vb.onclick = function () { try { genVariantFlow(q, host, vb); } catch (e) { toast('变式题暂时不可用'); } };
      row.appendChild(vb);
      row.appendChild(anim2dBtn(q));
      nodes.push(row);
    }

    nodes.forEach(function (n) { host.insertBefore(n, anchor); });
  };
})();
