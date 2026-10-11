/* 自动生成：_gen_kaoshi.py —— 成考专升本高数(二)模拟卷 + 按方法精练模块
 * 结构：window.KAOSHI = {meta,expert,paper[28题]}
 * 逻辑段在 _kaoshi_logic.js（已内联，自包含）。离线可用。
 * 答案均人工核算；每题绑定秒题刀法/步骤模板，考后诊断映射 mathsec/stepscore。
 * ====================================================================== */
window.KAOSHI = {"meta": {"title": "高数(二)模拟卷 · 按方法精练(一)", "tip": "一套贴合你题库实测分布的专升本高数(二)诊断卷。每题绑定一种秒题刀法或步骤模板，练完自动诊断薄弱点并跳去专练。", "mate": "luo", "total": 28, "time": "90分钟", "ver": "2026-10-12"}, "formulas": {"极限": ["【等价无穷小】✅ x→0：sinx~x、tanx~x、1−cosx~x²/2、ln(1+x)~x、eˣ−1~x ❗只在乘除里替换，加减里替换必错", "【两个重要极限】✅ lim(sinx/x)=1；lim(1+1/x)ˣ=e ❗先凑成标准形式再代公式", "【未定型顺序】✅先直接代、再约分/有理化、再等价、最后洛必达 ❗一上来就洛必达越算越复杂"], "导数": ["【求导公式】✅ (xⁿ)′=nxⁿ⁻¹、(eˣ)′=eˣ、(lnx)′=1/x ❗复合求导别漏内层导数（链式法则）", "【切线方程】✅ k=f′(x₀)，点斜式 y−y₀=k(x−x₀) ❗『在点』直接代，『过某点』先设切点", "【极值判定】✅ f′=0 得驻点，两侧符号定极值；f″>0极小 f″<0极大 ❗极值≠最值"], "积分": ["【不定积分】✅ ∫xⁿdx=xⁿ⁺¹/(n+1)+C ❗必加 +C，漏 C 扣 2 分", "【凑微分】✅ 把被积式凑成∫f(u)du，换元必换 dx ❗漏系数是最常见错", "【对称区间】✅ 奇函数积分=0、偶函数=2∫₀ᵃ（一击必杀）❗先判奇偶且区间对称"], "多元函数": ["【偏导数】✅ 对谁求导就把其余变量当常数 ❗常数求导得 0，别当未知量继续求", "【全微分】✅ dz=(∂z/∂x)dx+(∂z/∂y)dy，两个偏导都算完再相加 ❗偏导存在⇏可微"], "概率": ["【古典概型】✅ P=有利/总数 ❗放回与不放回样本空间不同；『至少』用对立 1−P(全不)", "【二项分布】✅ E(X)=np，P(X=k)=C(n,k)pᵏ(1−p)ⁿ⁻ᵏ ❗『恰好 k 次』用二项，『首次成功』用几何", "【期望方差】✅ E(aX+b)=aE(X)+b；D(X)=E(X²)−[E(X)]² ❗方差是『平方的期望减期望的平方』"]}, "expert": "【专家研讨纪要 · 2026-10-12】\n召集三位专家就「如何基于已总结的应试技巧设计一套诊断性模拟卷」研讨，结论如下：\n\n① 命题诊断专家（成考高数·命题）\n- 结构：选择 10×4=40、填空 10×4=40、解答 8 题=70，共 150 分，贴合真题。\n- 分布贴合你 478 题实测：极限17%·导数29%·积分27%·多元10%·概率8%；每题强制绑定一种「刀法」或「步骤模板」。\n- 设计理由：选择/填空全可走「四把刀」专测秒题；解答按模块频次 1:2:3:1:1 配置，强制走五步骨架+专属模板，既考步骤分又暴露「会算不会写」。\n\n② 解题教学专家（高数·解题）\n- 选择题给出可折叠「秒题思路」：极限→等价无穷小/洛必达；含参→特殊值；奇偶/对称→排除；方程→代回验证；无头绪→蒙(极限0/1/2、概率排>1)。\n- 解答题把五步骨架拆成可勾选步骤并配评分细则，例：极限大题「解」1分/判0/0型1分/写「由洛必达得」3分/求导化简3分/结论2分；公式分占30%是最大漏点。\n\n③ 学习科学专家（测评·学习设计）\n- 练习闭环：盲做(限时) → 按需揭示方法提示 → 考后诊断映射回 mathsec/stepscore 去专练。\n- 掌握度阈值：正确率≥85% 且 大题步骤完整度≥80% 算过关。\n- 与纸质卷衔接：纸卷限时刷只记√×，App模块按方法精练+诊断，形成「纸卷刷→App精练→回纸卷验证」闭环。", "paper": [{"id": "c1", "type": "choice", "score": 4, "mod": "极限", "method": "直接计算·等价无穷小替换", "stem": "求 lim<sub>x→0</sub> (sin 2x)/x 的值。", "opts": ["A) 0", "B) 1", "C) 2", "D) ∞"], "ans": 2, "explain": "x→0 时 sin2x~2x，故原式 = 2x/x = 2。", "hint": "直接算刀：x→0 且 0/0 型，先用等价无穷小 sin u~u 替换分子再约掉 x。"}, {"id": "c2", "type": "choice", "score": 4, "mod": "极限", "method": "重要极限(代入验证)", "stem": "求 lim<sub>x→0</sub> (1+3x)<sup>1/x</sup> 的值。", "opts": ["A) e", "B) e³", "C) 3", "D) 1"], "ans": 1, "explain": "原式 = [(1+3x)<sup>1/(3x)</sup>]<sup>3</sup> → e³（第二重要极限）。", "hint": "重要极限：lim(1+u)^(1/u)=e。把指数凑成 1/(3x) 再整体取 3 次方。"}, {"id": "c3", "type": "choice", "score": 4, "mod": "导数", "method": "直接计算·复合函数求导", "stem": "设 f(x)=e<sup>2x</sup>，则 f′(0)= 。", "opts": ["A) 0", "B) 1", "C) 2", "D) e²"], "ans": 2, "explain": "f′(x)=2e<sup>2x</sup>，故 f′(0)=2。", "hint": "复合求导：外层 e^u 导数 e^u，乘内层 u=2x 的导数 2。"}, {"id": "c4", "type": "choice", "score": 4, "mod": "导数", "method": "直接计算·隐函数求导", "stem": "由 x²+xy+y²=3 确定 y=y(x)，则 y′(1,1)= 。", "opts": ["A) −1", "B) −2", "C) 0", "D) 1"], "ans": 0, "explain": "两边对 x 求导：2x+y+xy′+2yy′=0，代入(1,1)得 3+3y′=0 → y′=−1。", "hint": "隐函数求导：y 视为 x 的函数，y² 导成 2y·y′，再代入点解 y′。"}, {"id": "c5", "type": "choice", "score": 4, "mod": "导数", "method": "性质排除·单调性", "stem": "函数 f(x)=x²−2x 的单调递减区间是 。", "opts": ["A) (−∞,1)", "B) (1,∞)", "C) (0,∞)", "D) (−∞,0)"], "ans": 0, "explain": "f′(x)=2x−2，f′(x)<0 当且仅当 x<1，故减区间为 (−∞,1)。", "hint": "单调性看 f′ 符号：令 f′<0 解不等式即可，或代入区间端点判断。"}, {"id": "c6", "type": "choice", "score": 4, "mod": "积分", "method": "性质排除·奇函数", "stem": "∫<sub>−1</sub><sup>1</sup> x³/(1+x²) dx = 。", "opts": ["A) 0", "B) 1", "C) 2", "D) 1/2"], "ans": 0, "explain": "被积函数 x³/(1+x²) 为奇函数，对称区间积分为 0（一击必杀）。", "hint": "奇偶对称：被积函数是奇函数且区间对称 → 直接得 0，不用算。"}, {"id": "c7", "type": "choice", "score": 4, "mod": "积分", "method": "直接计算·原函数", "stem": "下列函数中，是 2x 的原函数的是 。", "opts": ["A) x²", "B) x²+C", "C) 2x²", "D) x²/2"], "ans": 1, "explain": "不定积分原函数必含任意常数 C，故 2x 的原函数为 x²+C（陷阱：漏 +C 直接划掉）。", "hint": "原函数/不定积分必带 +C；选项没有 C 一律排除。"}, {"id": "c8", "type": "choice", "score": 4, "mod": "积分", "method": "代入验证·换元积分", "stem": "∫<sub>0</sub><sup>1</sup> 2x e<sup>x²</sup> dx = 。", "opts": ["A) e−1", "B) e", "C) 1", "D) e²−1"], "ans": 0, "explain": "令 u=x²，du=2xdx，原式 = ∫<sub>0</sub><sup>1</sup> e<sup>u</sup> du = e−1。", "hint": "凑微分：2x dx 正好是 x² 的微分，换元后上下限 0→0、1→1。"}, {"id": "c9", "type": "choice", "score": 4, "mod": "多元函数", "method": "直接计算·偏导(y当常数)", "stem": "设 z=x²y+3xy²，则 ∂z/∂x 在点(1,2)处的值为 。", "opts": ["A) 4", "B) 12", "C) 16", "D) 20"], "ans": 2, "explain": "∂z/∂x=2xy+3y²，代(1,2)得 4+12=16。", "hint": "偏导口诀：对 x 求导时把 y 当常数，y² 当成数字。"}, {"id": "c10", "type": "choice", "score": 4, "mod": "概率", "method": "直接计算·古典概型", "stem": "袋中有3红2白球，任取2球恰有1红1白的概率为 。", "opts": ["A) 1/5", "B) 2/5", "C) 3/5", "D) 4/5"], "ans": 2, "explain": "C(3,1)C(2,1)/C(5,2)=6/10=3/5。", "hint": "古典概型 P=有利/总数：有利=选1红1白，总数=从5选2。"}, {"id": "f1", "type": "fill", "score": 4, "mod": "极限", "method": "等价无穷小", "stem": "lim<sub>x→0</sub> sin(3x)/x = ______。", "ans": "3", "explain": "sin3x~3x → 3x/x=3。", "hint": "等价无穷小 sin u~u，把 3x 整体代入。"}, {"id": "f2", "type": "fill", "score": 4, "mod": "导数", "method": "连续性求参", "stem": "若 f(x)= { x², x≤1; ax−1, x>1 } 在 x=1 连续，则 a=______。", "ans": "2", "explain": "连续要求左极限=右极限：1 = a−1 → a=2。", "hint": "分段连续：左右极限相等，代入 x=1 列方程。"}, {"id": "f3", "type": "fill", "score": 4, "mod": "导数", "method": "切线斜率", "stem": "曲线 y=x² 在点(1,1)处的切线斜率为______。", "ans": "2", "explain": "y′=2x，x=1 时 k=2。", "hint": "切线斜率=导数在该点的值 k=f′(x₀)。"}, {"id": "f4", "type": "fill", "score": 4, "mod": "导数", "method": "高阶导数", "stem": "设 f(x)=2x⁴，则 f″(1)=______。", "ans": "24", "explain": "f′=8x³，f″=24x²，f″(1)=24。", "hint": "逐次求导：先一阶再二阶，最后代值。"}, {"id": "f5", "type": "fill", "score": 4, "mod": "导数", "method": "驻点", "stem": "函数 f(x)=x²−4x+3 的驻点为 x=______。", "ans": "2", "explain": "f′=2x−4=0 → x=2。", "hint": "驻点即 f′(x)=0 的点。"}, {"id": "f6", "type": "fill", "score": 4, "mod": "积分", "method": "定积分计算", "stem": "∫<sub>0</sub><sup>1</sup> x dx = ______。", "ans": "1/2", "explain": "[x²/2]<sub>0</sub><sup>1</sup> = 1/2。", "hint": "牛顿-莱布尼茨：原函数 x²/2，代上下限相减。"}, {"id": "f7", "type": "fill", "score": 4, "mod": "积分", "method": "广义积分(性质排除)", "stem": "∫<sub>1</sub><sup>∞</sup> (1/x²) dx = ______（发散填 ∞）。", "ans": "1", "explain": "[−1/x]<sub>1</sub><sup>∞</sup> = 0−(−1)=1，收敛于 1。", "hint": "幂函数在 [1,∞) 上 p=2>1 收敛，原函数为 −1/x。"}, {"id": "f8", "type": "fill", "score": 4, "mod": "多元函数", "method": "全微分公式", "stem": "设 z=xy，则全微分 dz = ______（用 dx,dy 表示）。", "ans": "2dx+dy", "explain": "∂z/∂x=y=2，∂z/∂y=x=1 → dz=2dx+dy。", "hint": "先写全微分公式 dz=(∂z/∂x)dx+(∂z/∂y)dy，再分别求偏导代点。"}, {"id": "f9", "type": "fill", "score": 4, "mod": "多元函数", "method": "二阶混合偏导", "stem": "设 z=x²y，则 ∂²z/∂x∂y 在(1,1)处=______。", "ans": "2", "explain": "∂z/∂x=2xy，再对 y 求 ∂²z/∂x∂y=2x，代(1,1)=2。", "hint": "混合偏导：先对 x 求偏导，结果再对 y 求偏导。"}, {"id": "f10", "type": "fill", "score": 4, "mod": "概率", "method": "二项分布期望", "stem": "设 X~B(10,0.3)，则 E(X)=______。", "ans": "3", "explain": "二项分布期望 E(X)=np=10×0.3=3。", "hint": "二项分布 B(n,p) 期望=np，直接乘。"}, {"id": "s1", "type": "subj", "score": 8, "mod": "极限", "method": "洛必达法则", "stem": "求 lim<sub>x→0</sub> (e<sup>x</sup>−1−x)/x<sup>2</sup>。", "template": ["解：", "判断为 0/0 型", "写「由洛必达法则得」", "两次求导并化简", "写出极限值结论"], "rubric": [1, 1, 3, 3, 2], "ans": "1/2", "explain": "0/0 型，连续用洛必达：→(e^x−1)/(2x) → e^x/2 → 1/2。", "hint": "直接算刀·洛必达：先判 0/0，再动笔；两次洛必达即可。"}, {"id": "s2", "type": "subj", "score": 8, "mod": "导数", "method": "一阶管单调极值", "stem": "求函数 f(x)=x³−3x 的单调区间与极值。", "template": ["解：", "抄 f(x) 与定义域", "求 f′(x) 并令为0得驻点", "列表判 f′ 符号得单调区间", "由 f″ 或符号定极值"], "rubric": [1, 1, 3, 3, 2], "ans": "增区间(−∞,−1),(1,∞)；减区间(−1,1)；极大值2，极小值−2", "explain": "f′=3x²−3=3(x−1)(x+1)，驻点±1；f″=6x：f″(−1)<0 极大 f(−1)=2，f″(1)>0 极小 f(1)=−2。", "hint": "导数应用分两块：一阶 f′ 管单调区间与极值，二阶 f″ 判极大极小。"}, {"id": "s3", "type": "subj", "score": 8, "mod": "导数", "method": "切线套模板", "stem": "求曲线 y=x² 在点(1,1)处的切线方程。", "template": ["解：", "抄曲线与点", "求 y′ 并代 x₀ 得斜率 k", "套点斜式 y−y₀=k(x−x₀)", "化简得方程"], "rubric": [1, 1, 3, 3, 2], "ans": "y=2x−1", "explain": "y′=2x，k=2；点斜式 y−1=2(x−1) → y=2x−1。", "hint": "切线模板：k=f′(x₀)，方程 y−f(x₀)=k(x−x₀)。"}, {"id": "s4", "type": "subj", "score": 8, "mod": "积分", "method": "基本积分公式", "stem": "求 ∫(2x+1)dx。", "template": ["解：", "抄被积式", "写积分公式", "逐项积分", "加常数 C（必带！）"], "rubric": [1, 1, 3, 3, 2], "ans": "x²+x+C", "explain": "∫2xdx=x²，∫1dx=x，不定积分必带 C → x²+x+C。", "hint": "不定积分最后必须写 +C；漏 C 扣 2 分。"}, {"id": "s5", "type": "subj", "score": 10, "mod": "积分", "method": "换元积分", "stem": "求 ∫<sub>0</sub><sup>1</sup> x e<sup>x²</sup> dx。", "template": ["解：", "抄积分式与上下限", "写换元 u=x²（du=2xdx）", "换元后上下限跟着换并积分", "算出数值"], "rubric": [1, 1, 3, 3, 2], "ans": "(e−1)/2", "explain": "原式=1/2·∫<sub>0</sub><sup>1</sup> e<sup>u</sup> du = (e−1)/2。", "hint": "换元后定积分上下限要跟着换（本题 0→0、1→1）。"}, {"id": "s6", "type": "subj", "score": 10, "mod": "积分", "method": "定积分求面积", "stem": "求曲线 y=x 与 y=x² 所围图形的面积。", "template": ["解：", "求两曲线交点定区间", "写面积公式 ∫(上−下)dx", "代入并计算", "写出面积值"], "rubric": [1, 1, 3, 3, 2], "ans": "1/6", "explain": "交点 (0,0),(1,1)；面积=∫<sub>0</sub><sup>1</sup>(x−x²)dx = 1/2−1/3 = 1/6。", "hint": "面积=∫(上方曲线−下方曲线)dx，先求交点定积分区间。"}, {"id": "s7", "type": "subj", "score": 8, "mod": "多元函数", "method": "全微分公式", "stem": "设 z=x²y³，求 ∂z/∂x、∂z/∂y 及全微分 dz（在点(1,1)）。", "template": ["解：", "抄 z 与定点", "先写全微分公式 dz=∂z/∂x dx+∂z/∂y dy", "对x求偏导(y当常数)、对y求偏导(x当常数)", "代点得结果"], "rubric": [1, 1, 3, 3, 2], "ans": "∂z/∂x=2, ∂z/∂y=3, dz=2dx+3dy", "explain": "∂z/∂x=2xy³=2，∂z/∂y=3x²y²=3 → dz=2dx+3dy。", "hint": "先写全微分公式再求偏导；对谁求导另一个当常数。"}, {"id": "s8", "type": "subj", "score": 10, "mod": "概率", "method": "古典概型·对立事件", "stem": "袋中有3红2白球，任取2球，求至少取到1个红球的概率。", "template": ["解：", "抄样本空间与事件", "先列对立事件（全白）P(Ā)", "用 P(A)=1−P(Ā)", "算出并写结论"], "rubric": [1, 1, 3, 3, 2], "ans": "9/10", "explain": "P(全白)=C(2,2)/C(5,2)=1/10，至少1红=1−1/10=9/10。", "hint": "「至少」类首选对立事件：P(A)=1−P(Ā)，列式比算数值钱。"}]};
/* 数学模拟考卷 · 练习模块（逻辑层 · 宝宝式带练 + 记忆锚定版）
 * 数据在 window.KAOSHI（_gen_kaoshi.py 生成），本段为 UI 逻辑。
 * 依赖全局：st / go / toast / escapeHtml / getMate / save / addXp
 * 屏幕：#s-kaoshi + #kaoshiBody
 * 设计：盲做 → 看板娘陪伴(对夸/错不打击) → 记不住就📖查公式(零负罪感,记录查阅) → 大题"帮我写公式步"占位保分
 *       → 交卷后双指标诊断 + 🔥连击 + 🔁错题复练 + 📿记忆锚定卡(做完沉淀公式) + 🎓做题方式收获卡
 *       → 基础弱可"轻量起步"只做选择填空；查过的公式可"我记住了"固化进记忆本。
 * ========================================================================== */
function kaoShiD(){ return window.KAOSHI || null; }
function kaoShiFresh(){
  return { mode:'home', idx:0, started:false, t0:0,
    pick:{}, steps:{}, reveal:{}, selfScore:{}, done:false, score:0, rate:0, correctCount:0, wrongByMod:{},
    combo:0, bubble:null, lite:false, review:null, reviewPos:0, formSeen:{} };
}
function kaoShiST(){
  if(!st.kaoshi) st.kaoshi = {};
  st.kaoshi.best = st.kaoshi.best || null;
  st.kaoshi.knownFormulas = st.kaoshi.knownFormulas || {};
  return st.kaoshi;
}
function kaoShiMate(d){ if(typeof getMate==='function'){ return getMate((d.meta&&d.meta.mate)||'luo'); } return null; }
function kaoShiInjectStyle(){
  if(document.getElementById('ksStyle')) return;
  var s=document.createElement('style'); s.id='ksStyle';
  s.textContent='.ks-opt{padding:10px 12px;border:1px solid rgba(128,128,128,.3);border-radius:8px;cursor:pointer;font-size:13.5px;line-height:1.5}'
    +'.ks-opt.ks-sel{border-color:var(--magenta);background:rgba(255,138,209,.1)}'
    +'.ks-opt.ks-right{border-color:#1e8a4c;background:rgba(30,138,76,.12)}'
    +'.ks-opt.ks-wrong{border-color:#e4572e;background:rgba(228,87,46,.1)}'
    +'.ks-input{width:100%;padding:10px 12px;border:1px solid rgba(128,128,128,.35);border-radius:8px;font-size:14px;box-sizing:border-box}'
    +'.ks-step{display:block;padding:7px 10px;border:1px solid rgba(128,128,128,.2);border-radius:8px;margin-top:6px;font-size:13px}'
    +'.ks-explain{margin-top:10px;padding:10px 12px;border-radius:8px;font-size:13px;line-height:1.65}'
    +'.ks-explain.ks-ok{background:rgba(30,138,76,.1);border:1px solid rgba(30,138,76,.3)}'
    +'.ks-explain.ks-bad{background:rgba(228,87,46,.1);border:1px solid rgba(228,87,46,.3)}'
    +'.ks-tipbtn{display:inline-block;font-size:12.5px;color:#b8860b;cursor:pointer;border-bottom:1px dashed #b8860b}'
    +'.ks-bubble{display:flex;gap:8px;align-items:flex-start;background:rgba(255,138,209,.08);border:1px solid rgba(255,138,209,.3);border-radius:12px;padding:9px 12px;margin:8px 0;font-size:13px;line-height:1.55}'
    +'.ks-bubble.ok{background:rgba(30,138,76,.1);border-color:rgba(30,138,76,.35)}'
    +'.ks-bubble.bad{background:rgba(228,87,46,.08);border-color:rgba(228,87,46,.3)}'
    +'.ks-av{width:30px;height:30px;border-radius:50%;flex:0 0 auto;object-fit:cover}'
    +'.ks-combo{display:inline-block;font-size:12px;font-weight:700;color:#e4572e;background:rgba(228,87,46,.12);padding:2px 9px;border-radius:999px}'
    +'.ks-formbtn{display:inline-block;font-size:12.5px;color:#17a398;cursor:pointer;background:rgba(23,163,152,.1);border:1px solid rgba(23,163,152,.4);border-radius:999px;padding:4px 11px;margin-top:6px}';
  document.head.appendChild(s);
}
function startKaoShi(){
  var d=kaoShiD(); if(!d){ if(typeof toast==='function') toast('模拟卷数据未加载'); return; }
  S.kaoshi = kaoShiFresh();
  S.kaoshi.started = true;
  S.kaoshi.t0 = Date.now();
  go('s-kaoshi'); renderKaoShi();
}
function kaoShiBack(){
  var p=S.kaoshi; if(!p){ go('s-study'); return; }
  if(p.mode!=='home'){ p.mode='home'; renderKaoShi(); }
  else go('s-study');
}
function renderKaoShi(){
  kaoShiInjectStyle();
  var body=document.getElementById('kaoshiBody'); if(!body) return;
  var d=kaoShiD(); if(!d){ body.innerHTML='<div class="card">数据加载中…</div>'; return; }
  var p=S.kaoshi||(S.kaoshi=kaoShiFresh());
  if(p.mode==='exam') return kaoShiExam(body,d,p);
  if(p.mode==='report') return kaoShiReport(body,d,p);
  return kaoShiHome(body,d,p);
}
/* ---------------------------- 主页 ---------------------------- */
function kaoShiHome(body,d,p){
  var s=kaoShiST();
  var h='';
  h+='<div style="padding:14px 16px 6px">'
    +'<div style="font-size:19px;font-weight:800">📝 '+escapeHtml(d.meta.title)+'</div>'
    +'<div style="font-size:12.5px;color:var(--sub);line-height:1.6;margin-top:4px">'+escapeHtml(d.meta.tip)+'</div></div>';
  h+='<div class="grid4" style="padding:0 16px">'
    +'<div class="stat"><b>'+d.meta.total+'</b><span>题量</span></div>'
    +'<div class="stat"><b>150</b><span>总分</span></div>'
    +'<div class="stat"><b>'+d.meta.time+'</b><span>建议限时</span></div>'
    +'<div class="stat"><b>'+(s.best?Math.round(s.best.score)+'/150':'—')+'</b><span>历史最佳</span></div></div>';
  h+='<div class="card mt10" style="margin:10px 16px">'
    +'<div style="font-weight:800;margin-bottom:4px">🎯 怎么练（专家研讨结论）</div>'
    +'<div style="font-size:12.5px;line-height:1.7;color:var(--sub)">① 先<b>盲做</b>整套（限时 '+d.meta.time+'，逼出真实水平）；② 卡住时点<b>「提示」</b>按需看刀法/模板；③ 选择/填空交后即判，<b>大题勾选五步骨架</b>再揭示；④ 记不住公式点<b>📖查公式</b>（零负罪感，多查就记住，还能「我记住了」固化）；⑤ 交卷看<b>诊断</b>与<b>记忆锚定</b>，一键跳去专练。</div></div>';
  h+='<div style="padding:0 16px;margin-top:6px"><div style="font-size:12.5px;color:var(--sub);line-height:1.6;background:rgba(255,138,209,.08);border:1px solid rgba(255,138,209,.3);border-radius:10px;padding:9px 12px">🍼 <b>基础弱 / 记不住公式？</b>别慌——点「轻量起步」<b>只做选择填空</b>（见效快、先建信心），解答题当「挑战关」随时加练；看板娘全程陪你，错了不骂，查公式不丢人，做完这套卷公式就锚定住了。</div></div>';
  h+='<div class="card mt10" style="margin:10px 16px"><div onclick="kaoShiToggleMemo()" style="font-weight:800;cursor:pointer">🧑‍🏫 专家研讨纪要（点开看三位专家怎么定的卷） ▾</div>'
    +'<div id="ksMemo" style="display:none;font-size:12.5px;line-height:1.75;color:var(--sub);margin-top:8px;white-space:pre-wrap">'+escapeHtml(d.expert)+'</div></div>';
  h+='<div style="padding:12px 16px"><button class="btn gold" onclick="kaoShiBegin()">▶ 开始按方法练这套卷（全套 28 题）</button>'
    +'<button class="btn teal mt10" onclick="kaoShiBegin(\'lite\')">🍼 轻量起步：只做选择填空（20 题）</button>'
    +'<div style="font-size:11.5px;color:var(--sub);margin-top:8px">本卷考点分布贴合你 478 题实测：极限17%·导数29%·积分27%·多元10%·概率8%，每题绑定一种刀法或步骤模板。</div></div>';
  body.innerHTML=h;
}
function kaoShiToggleMemo(){ var m=document.getElementById('ksMemo'); if(m) m.style.display = m.style.display==='none'?'block':'none'; }
function kaoShiBegin(mode){
  var p=S.kaoshi||(S.kaoshi=kaoShiFresh());
  p.mode='exam'; p.idx=0; p.started=true; p.t0=Date.now();
  p.lite = (mode==='lite'); p.review=null; p.reviewPos=0; p.combo=0; p.bubble=null;
  renderKaoShi();
}
/* ---------------------------- 考试页 ---------------------------- */
function kaoShiProb(d,idx){ return d.paper[idx]; }
function kaoShiExam(body,d,p){
  var n = p.review ? p.review.length : (p.lite ? 20 : d.paper.length);
  var realIdx = p.review ? p.review[p.reviewPos] : p.idx;
  var q = kaoShiProb(d, realIdx);
  var pos = p.review ? (p.reviewPos+1) : (p.idx+1);
  var typeName = q.type==='choice'?'选择题':(q.type==='fill'?'填空题':'解答题');
  var headTag = p.review ? ' · 复练错题' : (p.lite ? ' · 轻量起步' : '');
  var mate = kaoShiMate(d);
  var bub = p.bubble ? p.bubble.text : '宝宝来啦～这题我们一起做，卡住就点 📖 查公式哦！';
  var bubCls = p.bubble ? (p.bubble.kind==='ok'?'ks-bubble ok':'ks-bubble bad') : 'ks-bubble';
  var h='';
  h+='<div style="padding:10px 16px 0">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--sub)"><span>第 '+pos+' / '+n+' 题'+headTag+' · '+typeName+' · '+q.score+'分 · 考点：'+escapeHtml(q.mod)+'</span>'+(p.combo>=2?'<span class="ks-combo">🔥 连击 x'+p.combo+'</span>':'')+'</div>'
    +'<div style="height:6px;background:rgba(128,128,128,.18);border-radius:4px;margin-top:6px;overflow:hidden"><div style="height:100%;width:'+Math.round(pos/n*100)+'%;background:var(--magenta)"></div></div></div>';
  h+='<div class="'+bubCls+'"><img class="ks-av" src="'+(mate?mate.img:'')+'" alt="" onerror="this.style.display=\'none\'"><div><b>'+(mate?escapeHtml(mate.name):'老师')+'：</b>'+escapeHtml(bub)+'</div></div>';
  h+='<div style="padding:12px 16px">';
  h+='<div style="font-size:15px;font-weight:700;line-height:1.6">'+q.stem+'</div>';
  h+='<div style="margin:8px 0"><span style="display:inline-block;background:rgba(228,87,46,.12);color:#e4572e;font-size:11.5px;padding:3px 9px;border-radius:999px">🔪 '+escapeHtml(q.method)+'</span></div>';
  if(q.type==='choice'){
    var picked=p.pick[realIdx], rev=p.reveal[realIdx];
    h+='<div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">';
    q.opts.forEach(function(o,i){
      var cls='ks-opt', mark='';
      if(rev){ if(i===q.ans) cls+=' ks-right'; else if(i===picked) cls+=' ks-wrong'; }
      else if(picked===i){ cls+=' ks-sel'; }
      h+='<div class="'+cls+'" '+(rev?'':'onclick="kaoShiPick('+realIdx+','+i+')"')+'>'+escapeHtml(o)+'</div>';
    });
    h+='</div>';
    if(rev) h+=kaoShiExplain(q, picked===q.ans);
    else h+='<button class="btn gold mt10" onclick="kaoShiSubmitChoice('+realIdx+')">提交本题</button>';
  } else if(q.type==='fill'){
    var rev2=p.reveal[realIdx], val=p.pick[realIdx]||'';
    if(rev2){ h+='<div style="margin-top:6px">你的答案：<b>'+escapeHtml(val||'（空）')+'</b></div>'; h+=kaoShiExplain(q, kaoShiFillOK(q,val)); }
    else { h+='<div style="margin-top:6px"><input id="ksFill'+realIdx+'" class="ks-input" placeholder="输入答案，如 3 / 1/2 / 2dx+dy" value="'+escapeHtml(val)+'"></div>';
      h+='<button class="btn gold mt10" onclick="kaoShiSubmitFill('+realIdx+')">提交本题</button>'; }
    h+=kaoShiFormulaZone(q, realIdx);
  } else {
    var rev3=p.reveal[realIdx], steps=p.steps[realIdx]||{};
    var tpl=q.template||['解：','抄已知条件','写核心公式/定理','代入并变形','写结论'];
    var rub=q.rubric||[];
    h+='<div style="margin-top:6px"><div style="font-size:12.5px;color:var(--sub);margin-bottom:4px">✍️ 按五步抢分骨架，勾选你已完成的步骤（先写公式最值钱）：</div>';
    tpl.forEach(function(t,i){
      var checked = steps[i]?'checked':'';
      var star = (i===2)?' <b style="color:#e4572e">★最值钱</b>':'';
      var help = (i===2)?' <button class="ks-formbtn" onclick="kaoShiWriteFormulaStep('+realIdx+')">✍️ 帮我写这步</button>':'';
      h+='<label class="ks-step"><input type="checkbox" '+(rev3?'disabled ':'')+'onchange="kaoShiStep('+realIdx+','+i+',this.checked)" '+checked+'> <span>'+escapeHtml(t)+'</span>'+(rub[i]?' <i style="color:#e4572e">+'+rub[i]+'分</i>':'')+star+help+'</label>';
    });
    h+='<div style="margin-top:8px;font-size:12.5px;color:var(--sub)">最终答案：</div>';
    h+='<input id="ksSubj'+realIdx+'" class="ks-input" placeholder="写下你算出的结果" value="'+escapeHtml(p.pick[realIdx]||'')+'" '+(rev3?'disabled':'')+'>';
    h+=kaoShiFormulaZone(q, realIdx);
    if(rev3){ h+=kaoShiExplain(q, kaoShiSubjCorrect(q,p.pick[realIdx]));
      var sc=p.selfScore[realIdx]||0; h+='<div style="margin-top:6px;font-weight:700;color:#17a398">本题步骤分：'+sc+' / '+rub.reduce(function(a,b){return a+b;},0)+' 分</div>'; }
    else { h+='<button class="btn gold mt10" onclick="kaoShiRevealSubj('+realIdx+')">我已写完，看解析并计分</button>'; }
  }
  h+='<div style="display:flex;gap:10px;margin-top:14px">';
  if(p.review){
    if(p.reviewPos<n-1) h+='<button class="btn" onclick="kaoShiNav('+(p.reviewPos+1)+')">下一题 →</button>';
    else h+='<button class="btn gold" onclick="kaoShiReviewDone()">🏁 完成复练</button>';
  } else {
    if(p.idx<n-1) h+='<button class="btn" onclick="kaoShiNav('+(p.idx+1)+')">下一题 →</button>';
    else h+='<button class="btn gold" onclick="kaoShiFinish()">🏁 交卷出诊断</button>';
  }
  h+='</div>';
  h+='<div style="margin-top:10px"><span class="ks-tipbtn" onclick="kaoShiToggleHint('+realIdx+')">💡 卡住了？看「'+escapeHtml((q.method||'').split('·')[0])+'」提示</span>'
    +'<div id="ksHint'+realIdx+'" style="display:none;margin-top:6px;font-size:12.5px;line-height:1.7;color:var(--sub);background:rgba(255,216,102,.12);border:1px solid rgba(255,216,102,.4);border-radius:8px;padding:8px 10px">'+escapeHtml(q.hint||'（无）')+'</div></div>';
  h+='</div>';
  body.innerHTML=h;
}
function kaoShiFormulaZone(q, realIdx){
  if(q.type==='choice') return '';
  var h='<div style="margin-top:8px"><span class="ks-formbtn" onclick="kaoShiToggleFormula('+realIdx+')">📖 查公式（记不住就看，不丢人）</span></div>';
  h+=kaoShiFormulaBox(q, realIdx);
  return h;
}
function kaoShiFormulasOf(mod){ var d=kaoShiD(); return (d.formulas&&d.formulas[mod])||[]; }
function renderMnem(t){ return escapeHtml(String(t)).replace(/✅/g,'<b style="color:#1e8a4c">✅</b>').replace(/❗/g,'<b style="color:#e4572e">❗</b>'); }
function kaoShiFormulaBox(q, realIdx){
  var arr=kaoShiFormulasOf(q.mod);
  var h='<div id="ksF'+realIdx+'" style="display:none;margin-top:8px;border:1px solid rgba(23,163,152,.45);background:rgba(23,163,152,.08);border-radius:10px;padding:10px 12px">';
  h+='<div style="font-weight:800;font-size:12.5px;color:#17a398;margin-bottom:6px">📖 本考点公式卡 · '+escapeHtml(q.mod)+'（查了就会，多查几遍就记住啦）</div>';
  if(arr.length){ arr.forEach(function(t){ h+='<div style="font-size:12.5px;line-height:1.75;color:var(--sub);margin-bottom:7px">'+renderMnem(t)+'</div>'; }); }
  else h+='<div style="font-size:12px;color:var(--sub)">（该考点暂无口诀）</div>';
  var known=(kaoShiST().knownFormulas&&kaoShiST().knownFormulas[q.mod])?' <b style="color:#1e8a4c">✓已记住</b>':'';
  h+='<div style="margin-top:8px;font-size:12px;color:var(--sub)">'+known+' <span class="ks-formbtn" onclick="kaoShiMarkKnown(\''+q.mod+'\')">✅ 我记住了（点击固化）</span></div>';
  h+='</div>';
  return h;
}
function kaoShiToggleFormula(realIdx){ var e=document.getElementById('ksF'+realIdx); if(e) e.style.display=e.style.display==='none'?'block':'none'; if(e && e.style.display==='block'){ var p=S.kaoshi; var q=kaoShiProb(kaoShiD(),realIdx); p.formSeen[q.mod]=(p.formSeen[q.mod]||0)+1; } }
function kaoShiMarkKnown(mod){ var s=kaoShiST(); s.knownFormulas=s.knownFormulas||{}; s.knownFormulas[mod]=1; if(typeof save==='function') save(); if(typeof toast==='function') toast('已把「'+mod+'」公式加入记忆本 ✓ 下次不用查也能写'); }
function kaoShiWriteFormulaStep(realIdx){
  var el=document.getElementById('ksSubj'+realIdx); if(!el) return;
  var d=kaoShiD(); var q=kaoShiProb(d,realIdx);
  var place='由'+q.method.split('·')[0]+'得：____（把公式名先写上，这步最值钱）';
  el.value = (el.value? el.value+'\n' : '') + place;
}
function kaoShiPick(idx,i){ var p=S.kaoshi; p.pick[idx]=i; renderKaoShi(); }
function kaoShiSubmitChoice(idx){ var p=S.kaoshi; if(p.pick[idx]===undefined){ if(typeof toast==='function') toast('先选一个选项'); return; } var q=kaoShiProb(kaoShiD(),idx); var ok=(p.pick[idx]===q.ans); kaoShiFeedback(idx,ok); p.reveal[idx]=true; renderKaoShi(); }
function kaoShiSubmitFill(idx){ var p=S.kaoshi; var v=document.getElementById('ksFill'+idx).value; var q=kaoShiProb(kaoShiD(),idx); var ok=kaoShiFillOK(q,v); kaoShiFeedback(idx,ok); p.pick[idx]=v; p.reveal[idx]=true; renderKaoShi(); }
function kaoShiStep(idx,i,on){ var p=S.kaoshi; p.steps[idx]=p.steps[idx]||{}; p.steps[idx][i]=on; }
function kaoShiRevealSubj(idx){ var p=S.kaoshi; var v=document.getElementById('ksSubj'+idx).value; p.pick[idx]=v; p.reveal[idx]=true; var q=kaoShiProb(kaoShiD(),idx); var stp=p.steps[idx]||{}; var sc=0; (q.rubric||[]).forEach(function(r,i){ if(stp[i]) sc+=r; }); p.selfScore[idx]=sc; var full=q.score; var ok = sc >= full*0.8; kaoShiFeedback(idx, ok); renderKaoShi(); }
function kaoShiNav(i){ var p=S.kaoshi; if(p.review){ p.reviewPos=i; renderKaoShi(); return; } p.idx=i; renderKaoShi(); }
function kaoShiToggleHint(idx){ var e=document.getElementById('ksHint'+idx); if(e) e.style.display=e.style.display==='none'?'block':'none'; }
function kaoShiExplain(q, ok){
  var ansText = q.type==='choice' ? q.opts[q.ans] : String(q.ans);
  return '<div class="ks-explain '+(ok?'ks-ok':'ks-bad')+'"><b>'+(ok?'✅ 答对':'❌ 答错')+'</b> 正确答案：<b>'+escapeHtml(ansText)+'</b><br>'+escapeHtml(q.explain)+'</div>';
}
function kaoShiFeedback(idx, ok){
  var p=S.kaoshi;
  if(ok){ p.combo=(p.combo||0)+1;
    var praise=['哇这步写对啦！✨','宝宝好棒，记性不错哦～','对啦对啦，就是这么写！','稳了稳了，这题拿下了💪'];
    p.bubble={kind:'ok', text:praise[Math.floor(Math.random()*praise.length)]};
  } else {
    p.combo=0;
    var enc=['没关系，这步记不住很正常，看口诀～📖','错一次不要紧，宝宝多练几遍就会啦','别急，我们一起看下公式卡','记不住就查，不丢人，查着查着就会了'];
    p.bubble={kind:'bad', text:enc[Math.floor(Math.random()*enc.length)]};
  }
}
function kaoShiNorm(s){ return (s==null?'':s.toString()).replace(/\s+/g,'').replace(/[，。,]/g,''); }
function kaoShiEval(s){ try{ if(typeof s!=='string'||!/^[0-9+\-*/.()\s]+$/.test(s)) return NaN; var r=Function('"use strict";return ('+s+')')(); return (typeof r==='number'&&isFinite(r))?r:NaN; }catch(e){ return NaN; } }
function kaoShiAnsOK(a,b){ a=String(a); b=kaoShiNorm(b); if(kaoShiNorm(a)===b) return true; var ea=kaoShiEval(a), eb=kaoShiEval(b); if(!isNaN(ea)&&!isNaN(eb)) return Math.abs(ea-eb)<0.01; return false; }
function kaoShiFillOK(q,v){ return kaoShiAnsOK(q.ans, v); }
function kaoShiSubjCorrect(q,v){ return kaoShiAnsOK(q.ans, v); }
/* ---------------------------- 交卷 / 报告 ---------------------------- */
function kaoShiFinish(){
  var p=S.kaoshi, d=kaoShiD(); p.mode='report';
  var score=0, correctCount=0, wrongByMod={}, objTotal=0, objRight=0, subjTotal=0, subjScore=0;
  d.paper.forEach(function(q,idx){
    if(q.type==='choice'||q.type==='fill'){
      objTotal++;
      var ok = q.type==='choice' ? (p.pick[idx]===q.ans) : kaoShiFillOK(q,p.pick[idx]);
      if(ok){ score+=q.score; objRight++; correctCount++; }
      else { (wrongByMod[q.mod]=wrongByMod[q.mod]||[]).push(idx); }
    } else {
      var fullScore=q.score;
      var sc=Math.min(p.selfScore[idx]||0, fullScore);
      score+=sc; subjTotal+=fullScore; subjScore+=sc;
      if(sc >= fullScore*0.8){ correctCount++; }
      else { (wrongByMod[q.mod]=wrongByMod[q.mod]||[]).push(idx); }
    }
  });
  p.score=score; p.correctCount=correctCount; p.wrongByMod=wrongByMod;
  p.objRate = objTotal? Math.round(objRight/objTotal*100):0;
  p.stepRate = subjTotal? Math.round(subjScore/subjTotal*100):0;
  p.rate = Math.round(score/150*100);
  p.pass = (p.objRate>=85 && p.stepRate>=80);
  var s=kaoShiST();
  if(!s.best||score>s.best.score){ s.best={score:score,objRate:p.objRate,stepRate:p.stepRate,t:Date.now()}; if(typeof save==='function') save(); }
  renderKaoShi();
}
function kaoShiReviewWrong(){
  var p=S.kaoshi; var idxs=[]; for(var m in p.wrongByMod){ p.wrongByMod[m].forEach(function(i){ idxs.push(i); }); }
  if(!idxs.length){ if(typeof toast==='function') toast('没有错题，全部过关！'); return; }
  idxs.forEach(function(i){ p.pick[i]=undefined; p.steps[i]={}; p.reveal[i]=false; p.selfScore[i]=undefined; });
  p.mode='exam'; p.review=idxs; p.reviewPos=0; p.lite=false; p.combo=0; p.bubble=null;
  renderKaoShi();
}
function kaoShiReviewDone(){ var p=S.kaoshi; p.review=null; p.reviewPos=0; kaoShiFinish(); }
function kaoShiReport(body,d,p){
  var n=d.paper.length, pass=p.pass;
  var h='';
  h+='<div style="padding:14px 16px 6px"><div style="font-size:19px;font-weight:800">📊 模考诊断报告</div></div>';
  h+='<div class="card mt10" style="margin:10px 16px;text-align:center">'
    +'<div style="font-size:34px;font-weight:800;color:'+(pass?'#1e8a4c':'#e4572e')+'">'+p.score+' <span style="font-size:16px;color:var(--sub)">/ 150</span></div>'
    +'<div style="font-size:13px;color:var(--sub);margin-top:4px">答对(含步骤达标) '+p.correctCount+' / '+n+' 题 · 总得分率 '+p.rate+'%</div>'
    +'<div style="margin-top:12px;text-align:left;font-size:12.5px">'
      +'<div style="display:flex;justify-content:space-between"><span>🎯 客观题正确率（≥85%过关）</span><b style="color:'+(p.objRate>=85?'#1e8a4c':'#e4572e')+'">'+p.objRate+'%</b></div>'
      +'<div style="height:7px;background:rgba(128,128,128,.18);border-radius:4px;margin:5px 0 10px;overflow:hidden"><div style="height:100%;width:'+p.objRate+'%;background:'+(p.objRate>=85?'#1e8a4c':'#e4572e')+'"></div></div>'
      +'<div style="display:flex;justify-content:space-between"><span>✍️ 大题步骤完整度（≥80%过关）</span><b style="color:'+(p.stepRate>=80?'#1e8a4c':'#e4572e')+'">'+p.stepRate+'%</b></div>'
      +'<div style="height:7px;background:rgba(128,128,128,.18);border-radius:4px;margin:5px 0 4px;overflow:hidden"><div style="height:100%;width:'+p.stepRate+'%;background:'+(p.stepRate>=80?'#1e8a4c':'#e4572e')+'"></div></div>'
    +'</div>'
    +'<div style="font-size:14px;font-weight:700;margin-top:8px;color:'+(pass?'#1e8a4c':'#e4572e')+'">'+(pass?'🎉 双达标，过关！':'⚠️ 未双达标，继续专练')+'</div></div>';
  var mods=Object.keys(p.wrongByMod||{});
  if(mods.length){
    h+='<div class="card mt10" style="margin:10px 16px"><div style="font-weight:800;margin-bottom:6px">🩺 薄弱点诊断（按考点归类）</div>';
    mods.forEach(function(m){
      var idxs=p.wrongByMod[m]; var isSubj = d.paper[idxs[0]].type==='subj';
      h+='<div style="border:1px solid rgba(228,87,46,.25);border-radius:8px;padding:8px 10px;margin-top:8px">'
        +'<div style="font-weight:700">'+escapeHtml(m)+' <span style="color:var(--sub);font-weight:400">（错 '+idxs.length+' 题）</span></div>'
        +'<div style="font-size:12px;color:var(--sub);margin:4px 0">建议去：'+(isSubj?'<b>大题步骤分</b>（练步骤模板）':'<b>数学秒题</b>（练刀法）')+'</div>'
        +'<button class="btn" style="font-size:12px;padding:5px 10px" onclick="kaoShiGoto('+(isSubj?1:0)+')">去专练 →</button></div>';
    });
    h+='</div>';
  } else {
    h+='<div class="card mt10" style="margin:10px 16px;background:rgba(30,138,76,.1);border:1px solid rgba(30,138,76,.3)">🎉 全对！这套卷的方法你已经吃透了。</div>';
  }
  // 记忆锚定卡（做完沉淀）
  var seen=(p.formSeen||{}); var seenMods=Object.keys(seen); var sk=kaoShiST();
  if(seenMods.length){
    h+='<div class="card mt10" style="margin:10px 16px;border-color:rgba(23,163,152,.45)"><div style="font-weight:800;margin-bottom:6px">📿 本卷记忆锚定（做完沉淀）</div>';
    h+='<div style="font-size:12.5px;line-height:1.7;color:var(--sub)">这套卷你查得最多的公式，就是最该背的。配合口诀多读几遍，下次不用查就能写：</div>';
    seenMods.sort(function(a,b){ return seen[b]-seen[a]; });
    seenMods.forEach(function(m){
      var kn=(sk.knownFormulas&&sk.knownFormulas[m])?' <b style="color:#1e8a4c">✓已记住</b>':' <b style="color:#e4572e">待背</b>';
      var tp=kaoShiFormulasOf(m).slice(0,1);
      h+='<div style="margin-top:7px;font-size:12.5px;line-height:1.6"><b style="color:#17a398">'+escapeHtml(m)+'</b>'+kn+' <span style="color:var(--sub)">（查 '+seen[m]+' 次）</span></div>'
        +(tp.length?'<div style="font-size:12px;color:var(--sub);margin-top:2px">'+renderMnem(tp[0])+'</div>':'');
    });
    h+='</div>';
  }
  // 做题方式收获卡
  h+='<div class="card mt10" style="margin:10px 16px"><div style="font-weight:800;margin-bottom:4px">🎓 本卷做题方式收获</div>'
    +'<div style="font-size:12.5px;line-height:1.7;color:var(--sub)">客观题你练的是<b>四把刀</b>（代入/特殊值/排除/直接算）；大题你练的是<b>五步抢分骨架</b>。'
    +(pass?'这套卷你双达标，说明这两个方法已经初步长在你手里了 💪':'继续用「查公式不丢人 + 错题复练」把薄弱考点磨熟，下套卷会更顺。')
    +'</div></div>';
  h+='<div style="padding:12px 16px;display:flex;gap:10px;flex-wrap:wrap">'
    +'<button class="btn" onclick="kaoShiRedo()">🔄 重做这套卷</button>'
    +'<button class="btn" onclick="kaoShiReviewWrong()">🔁 复练错题</button>'
    +'<button class="btn" onclick="kaoShiBack()">返回自习室</button></div>';
  body.innerHTML=h;
}
function kaoShiGoto(isSubj){ go(isSubj?'s-stepscore':'s-mathsec'); }
function kaoShiRedo(){ S.kaoshi=Object.assign(kaoShiFresh(),{mode:'exam',idx:0,started:true,t0:Date.now()}); renderKaoShi(); }
