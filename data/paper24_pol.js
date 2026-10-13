/* 自动生成：_gen_paper24.py —— 历年真题秒刷（多卷 + 秒题口诀）
 * 结构：window.PAPER24 = { years:[..], papers:{year:{meta,paper,answers}},
 *                          gang[7组], kou{编号->口诀}, traps, cheat }
 * 逻辑段在 _paper24_logic.js（已内联，自包含）。离线可用。
 * 计分各卷不同：2025/2024 = 7/7/15；2023 = 4/4/(8~10)。
 * 加新年份只需在 _papers_bank.py 增一套数据并登记到这里，App 无需改接线。
 * ====================================================================== */
window.PAPER24 = {"years": ["2025", "2024", "2023"], "papers": {"2025": {"meta": {"year": "2025", "title": "2025 年成考专升本《高等数学(二)》真题", "sub": "17 题 · 143 分（选择 11×7 + 填空 3×7 + 解答 3×15）", "total": 17, "full": 143, "time": 150, "mate": "luo", "note": "第 8 题原件公式丢失，本卷收 17 题（143 分）；拿到清晰原件后可补齐"}, "paper": [{"no": 1, "type": "choice", "name": "等价无穷小", "ref": "一-1", "stem": "当 x → 0 时，3 − 3cos x 与 x<sup>a</sup> 为同阶无穷小量，则 a = （ ）", "opts": ["1", "2", "3", "4"], "ans": 1, "ansText": "B", "score": 7, "detail": "1 − cos x ~ x²/2，故 3 − 3cos x ~ (3/2)x²，与 x² 同阶 ⇒ a = 2"}, {"no": 2, "type": "choice", "name": "等价无穷小", "ref": "一-1", "stem": "lim<sub>x→0</sub> sin 2x/(x + 1) = （ ）", "opts": ["2", "1", "0", "-1"], "ans": 2, "ansText": "C", "score": 7, "detail": "x → 0 时 sin 2x → 0，分母 → 1，直接代入得 0/1 = 0"}, {"no": 3, "type": "choice", "name": "基础求导", "ref": "二-1", "stem": "设函数 f(x) = ln(x + √(x²+5))，则 f′(0) = （ ）", "opts": ["0", "√5/5", "√5", "5"], "ans": 1, "ansText": "B", "score": 7, "detail": "f′(x) = (1 + x/√(x²+5))/(x + √(x²+5))，代入 x=0 得 1/√5 = √5/5"}, {"no": 4, "type": "choice", "name": "分段函数连续", "ref": "一-3", "stem": "设 f(x) = { (√(7x+4) − 2)/x, x ≠ 0; k, x = 0 } 在 x = 0 处连续，则 k = （ ）", "opts": ["0", "1/2", "1", "7/4"], "ans": 3, "ansText": "D", "score": 7, "detail": "有理化：(7x+4−4)/(x(√(7x+4)+2)) = 7/(√(7x+4)+2) → 7/4，故 k = 7/4"}, {"no": 5, "type": "choice", "name": "乘积求导", "ref": "二-2", "stem": "设 f(x) = x/√(1+x²)，则 f″(0) = （ ）　<span style='color:#b3261e'>⚠ 题面待校对</span>", "opts": ["-1", "0", "1/2", "1"], "ans": 1, "ansText": "B", "score": 7, "detail": "f′(x) = (1+x²)<sup>−3/2</sup>，f″(x) = −3x(1+x²)<sup>−5/2</sup>，代入 x=0 得 0，选 B", "doubt": true}, {"no": 6, "type": "choice", "name": "凑微分", "ref": "三-7", "stem": "∫ sin(x + 1) dx = （ ）", "opts": ["−cos(x+1) + C", "cos(x+1) + C", "−sin(x+1) + C", "sin(x+1) + C"], "ans": 0, "ansText": "A", "score": 7, "detail": "(cos(x+1))′ = −sin(x+1)，故 ∫sin(x+1)dx = −cos(x+1) + C"}, {"no": 7, "type": "choice", "name": "分式多项式积分", "ref": "三-3", "stem": "∫<sub>1</sub><sup>2</sup> (1/x) dx = （ ）", "opts": ["0", "ln 2", "1", "ln 3"], "ans": 1, "ansText": "B", "score": 7, "detail": "= ln|x| |<sub>1</sub><sup>2</sup> = ln 2 − ln 1 = ln 2"}, {"no": 9, "type": "choice", "name": "变上限积分求导", "ref": "三-5", "stem": "lim<sub>x→0</sub> (∫<sub>0</sub><sup>x</sup> cos t² dt)/x = （ ）", "opts": ["-2", "0", "1", "2"], "ans": 2, "ansText": "C", "score": 7, "detail": "0/0 型，洛必达：分子导数 cos x²，分母导数 1，代入 x=0 得 1"}, {"no": 10, "type": "choice", "name": "离散分布", "ref": "六-1", "stem": "设随机变量 X 的概率分布为 X: −1, 0, 1；P: a, 3a, a，则 a = （ ）", "opts": ["0.2", "0.3", "0.4", "0.5"], "ans": 0, "ansText": "A", "score": 7, "detail": "全部概率加一起等于 1：a + 3a + a = 5a = 1 ⇒ a = 0.2"}, {"no": 11, "type": "choice", "name": "渐近线", "ref": "二-8", "stem": "曲线 y = 3arctan x 的渐近线方程为（ ）", "opts": ["y = ±3", "y = 0", "y = ±3π/2", "y = ±3π"], "ans": 2, "ansText": "C", "score": 7, "detail": "x → ±∞ 时 arctan x → ±π/2，故 y → ±3π/2"}, {"no": 12, "type": "choice", "name": "排列：不相邻", "ref": "六-5", "stem": "甲、乙、丙、丁 4 名同学排成一列，且甲、乙不相邻，则不同的排法共有（ ）", "opts": ["24 种", "16 种", "12 种", "8 种"], "ans": 2, "ansText": "C", "score": 7, "detail": "总数 4! = 24，甲乙相邻（捆绑）有 3!×2 = 12，不相邻 = 24 − 12 = 12"}, {"no": 13, "type": "fill", "name": "切线 &amp; 法线", "ref": "二-5", "stem": "曲线 y = −2e<sup>x</sup> + 1 在点 (0, −1) 处法线的方程为 ____", "ansText": "y = (1/2)x − 1", "score": 7, "detail": "y′ = −2e<sup>x</sup>，在 x=0 处 k<sub>切</sub> = −2，k<sub>法</sub> = 1/2，点斜式 y + 1 = (1/2)(x − 0)"}, {"no": 14, "type": "fill", "name": "单调区间", "ref": "二-6", "stem": "函数 f(x) = x² − ln√x 的单调递减区间是 ____", "ansText": "(0, 1/2)", "score": 7, "detail": "f(x) = x² − (1/2)ln x，f′(x) = 2x − 1/(2x) &lt; 0 ⇒ 4x² &lt; 1 ⇒ 0 &lt; x &lt; 1/2"}, {"no": 15, "type": "fill", "name": "全微分", "ref": "五-2", "stem": "设 z = 15 + x²y + cos y，则 dz = ____", "ansText": "2xy dx + (x² − sin y)dy", "score": 7, "detail": "z<sub>x</sub> = 2xy，z<sub>y</sub> = x² − sin y，dz = z<sub>x</sub>dx + z<sub>y</sub>dy"}, {"no": 16, "type": "solve", "name": "偏导 / 混合偏导", "ref": "五-1", "stem": "已知函数 z = x<sup>y</sup> (x &gt; 0)，求 ∂z/∂x、∂z/∂y", "steps": ["对 x 求导：把 y 当常数，用幂函数公式", "∂z/∂x = y·x<sup>y−1</sup>", "对 y 求导：把 x 当常数，用指数函数公式", "∂z/∂y = x<sup>y</sup>·ln x"], "score": 15, "detail": "<b>∂z/∂x = y x<sup>y−1</sup>，∂z/∂y = x<sup>y</sup> ln x</b>"}, {"no": 17, "type": "solve", "name": "旋转体体积", "ref": "四-2", "stem": "计算曲线 y = 4 sin x (0 ≤ x ≤ π) 与 x 轴所围成的图形绕 x 轴旋转一周所得旋转体的体积", "steps": ["绕 x 轴：V = π∫<sub>0</sub><sup>π</sup> y² dx", "代入 y = 4 sin x：V = 16π∫<sub>0</sub><sup>π</sup> sin²x dx", "降幂：sin²x = (1 − cos 2x)/2", "积分得 16π·(π/2) = 8π²"], "score": 15, "detail": "<b>V = 8π²</b>"}, {"no": 18, "type": "solve", "name": "证明不等式", "ref": "七-21", "stem": "设 0 &lt; a ≤ e，证明：a ln x ≤ x²/2", "steps": ["移项造函数：f(x) = x²/2 − a ln x (x &gt; 0)", "求导 f′(x) = x − a/x，令其为零得 x = √a", "0 &lt; x &lt; √a 时 f′ &lt; 0，x &gt; √a 时 f′ &gt; 0，故 x = √a 处取最小值", "f(√a) = a/2 − (a/2)ln a = (a/2)(1 − ln a) ≥ 0（因 a ≤ e）"], "score": 15, "detail": "<b>证毕</b>　（最小值 (a/2)(1 − ln a) ≥ 0）"}], "answers": [{"no": 1, "ans": "B"}, {"no": 2, "ans": "C"}, {"no": 3, "ans": "B"}, {"no": 4, "ans": "D"}, {"no": 5, "ans": "B"}, {"no": 6, "ans": "A"}, {"no": 7, "ans": "B"}, {"no": 9, "ans": "C"}, {"no": 10, "ans": "A"}, {"no": 11, "ans": "C"}, {"no": 12, "ans": "C"}, {"no": 13, "ans": "y = (1/2)x − 1"}, {"no": 14, "ans": "(0, 1/2)"}, {"no": 15, "ans": "2xy dx + (x² − sin y)dy"}]}, "2024": {"meta": {"year": "2024", "title": "2024 年成考专升本《高等数学(二)》真题", "sub": "18 题 · 满分 150（选择 12×7 + 填空 3×7 + 解答 3×15）", "total": 18, "full": 150, "time": 150, "mate": "luo"}, "paper": [{"no": 1, "type": "choice", "name": "等价无穷小", "ref": "一-1", "stem": "设 lim<sub>x→0</sub> sin(mx)/x = 2，则 m =", "opts": ["0", "1/2", "1", "2"], "ans": 3, "ansText": "D", "score": 7, "detail": "sin□/□ 型 → 答案就是□里的系数；=2 ⇒ m=2"}, {"no": 2, "type": "choice", "name": "基本求导", "ref": "二-1", "stem": "设 y = ln x + x²，则 y′ =", "opts": ["1/x + 2x", "1/x − 2x", "ln x + 2x", "ln x − 2x"], "ans": 0, "ansText": "A", "score": 7, "detail": "(ln x)′=1/x，(x²)′=2x ⇒ 1/x + 2x"}, {"no": 3, "type": "choice", "name": "乘积求导（x·e）", "ref": "二-2", "stem": "设 y = x·e<sup>2x</sup>，则 y′ =", "opts": ["(1+x)e^(2x)", "(1+2x)e^(2x)", "2x e^(2x)", "(1−2x)e^(2x)"], "ans": 1, "ansText": "B", "score": 7, "detail": "k=2 直接套 → (1+2x)e<sup>2x</sup>"}, {"no": 4, "type": "choice", "name": "概率分布性质", "ref": "六-1", "stem": "随机变量 X 的分布：X=3,4,5；P=0.1, a, 0.6，则 a =", "opts": ["0.1", "0.2", "0.3", "0.4"], "ans": 2, "ansText": "C", "score": 7, "detail": "0.1 + a + 0.6 = 1 ⇒ a = 0.3"}, {"no": 5, "type": "choice", "name": "拐点（二阶导=0）", "ref": "二-4", "stem": "曲线 y = x·e<sup>−x</sup> 的拐点坐标是", "opts": ["(0,0)", "(2,2e^(−2))", "(−1,−e)", "(1,e^(−1))"], "ans": 1, "ansText": "B", "score": 7, "detail": "y′=(1−x)e<sup>−x</sup>，y″=(x−2)e<sup>−x</sup>；y″=0 ⇒ x=2 ⇒ (2, 2e<sup>−2</sup>)"}, {"no": 6, "type": "choice", "name": "原函数（反向求导）", "ref": "二-3", "stem": "设 f(x) 的一个原函数为 e<sup>x²</sup>，则 f(x) =", "opts": ["e^(x²)", "2x e^(x²)", "x e^(x²)", "2 e^(x²)"], "ans": 1, "ansText": "B", "score": 7, "detail": "f(x) = (e<sup>x²</sup>)′ = 2x e<sup>x²</sup>"}, {"no": 7, "type": "choice", "name": "对称区间定积分", "ref": "三-1", "stem": "∫<sub>−1</sub><sup>1</sup> (arctan x + x²) dx =", "opts": ["π/2 + 2/3", "π/2", "2/3", "0"], "ans": 2, "ansText": "C", "score": 7, "detail": "arctan x 奇函数→0；2∫<sub>0</sub><sup>1</sup>x²dx = 2/3"}, {"no": 8, "type": "choice", "name": "根号换元", "ref": "三-2", "stem": "∫<sub>0</sub><sup>π²</sup> cos√x dx =", "opts": ["−4", "−2", "0", "2"], "ans": 0, "ansText": "A", "score": 7, "detail": "= 2∫<sub>0</sub><sup>π</sup> t cos t dt（分部）= [2t sin t + 2cos t]<sub>0</sub><sup>π</sup> = −4"}, {"no": 9, "type": "choice", "name": "分式拆项", "ref": "三-3", "stem": "∫ (x+1)²/x dx =", "opts": ["x²+x+ln|x|+C", "x²+2x+ln|x|+C", "x²/2+x+ln|x|+C", "x²/2+2x+ln|x|+C"], "ans": 3, "ansText": "D", "score": 7, "detail": "(x+1)²/x = x + 2 + 1/x ⇒ x²/2 + 2x + ln|x| + C（没 +C 的选项先排除）"}, {"no": 10, "type": "choice", "name": "偏导数", "ref": "五-1", "stem": "设 z = 2xy + x/y，则 ∂z/∂y =", "opts": ["2x + 1/y", "2y + 1/y", "2x + x/y²", "2x − x/y²"], "ans": 3, "ansText": "D", "score": 7, "detail": "(2xy)<sub>y</sub> = 2x；(x/y)<sub>y</sub> = −x/y² ⇒ 2x − x/y²"}, {"no": 11, "type": "choice", "name": "混合偏导", "ref": "五-1", "stem": "设 z = xf(y)（f 可导），则 ∂²z/∂x∂y =", "opts": ["f′(y)", "x", "f(y)", "x f(y)"], "ans": 0, "ansText": "A", "score": 7, "detail": "∂z/∂x = f(y)，再对 y 求导 ⇒ f′(y)"}, {"no": 12, "type": "choice", "name": "概率减法公式", "ref": "六-2", "stem": "设 A,B 为随机事件，则 P(A−B)=P(A)−P(B) 的充要条件是", "opts": ["A ⊂ B", "P(B−A)=0", "A = B", "P(A−B)=0"], "ans": 1, "ansText": "B", "score": 7, "detail": "P(A−B)=P(A)−P(AB)，要等于 P(A)−P(B) ⇔ P(AB)=P(B) ⇔ B⊆A ⇔ P(B−A)=0"}, {"no": 13, "type": "fill", "name": "分段函数连续", "ref": "一-3", "stem": "已知 f(x) = { 2/x , x ≥ 1 ； a cos πx , x < 1 } 在 x = 1 处连续，则 a =", "ansText": "−2", "score": 7, "detail": "右极限 lim(x→1⁺) 2/x = 2；左极限 lim(x→1⁻) a cos πx = −a；−a = 2 ⇒ a = −2"}, {"no": 14, "type": "fill", "name": "1<sup>∞</sup> 型极限", "ref": "一-2", "stem": "若 lim<sub>x→∞</sub> ((x+2a)/(x−a))<sup>x</sup> = e<sup>6</sup>，则 a =", "ansText": "2", "score": 7, "detail": "A=2a, B=−a ⇒ e<sup>2a−(−a)</sup> = e<sup>3a</sup> = e<sup>6</sup> ⇒ a = 2"}, {"no": 15, "type": "fill", "name": "法线方程", "ref": "二-5", "stem": "曲线 y = x³ 在点 (1,1) 处的法线方程为", "ansText": "x+3y−4=0", "score": 7, "detail": "y′=3x² ⇒ k<sub>切</sub>=3 ⇒ k<sub>法</sub>=−1/3；y−1 = −(1/3)(x−1) ⇒ x + 3y − 4 = 0"}, {"no": 16, "type": "solve", "name": "单调区间 + 极值", "ref": "七-16", "stem": "求函数 f(x) = x²(x − 1)² 的单调区间和极值。", "steps": ["一求导：f(x)=x⁴−2x³+x² ⇒ f′(x)=2x(x−1)(2x−1)", "二找驻点：x = 0, ½, 1", "三列表判正负（看 f′ 符号）", "四写区间写极值"], "score": 15, "detail": "递增 (0, ½)、(1, +∞)；递减 (−∞, 0)、(½, 1)；极大值 f(½) = 1/16，极小值 f(0) = f(1) = 0"}, {"no": 17, "type": "solve", "name": "降幂积分", "ref": "七-17", "stem": "计算 ∫ sin²x dx.", "steps": ["先降幂：sin²x = (1 − cos 2x)/2", "再拆开，逐项积", "末尾 + C 不能弃"], "score": 15, "detail": "∫(1−cos2x)/2 dx = x/2 − (sin 2x)/4 + C"}, {"no": 18, "type": "solve", "name": "两曲线围成面积", "ref": "七-18", "stem": "求由抛物线 y² = 2x 和直线 x + y − 4 = 0 所围成图形的面积。", "steps": ["一联立求交点，交点就是上下限", "二选积分变量（带 y² 优先对 y 积分）", "三右减左，代入上下限相减"], "score": 15, "detail": "交点 (2,2) 与 (8,−4)；S = ∫<sub>−4</sub><sup>2</sup>(4 − y − y²/2) dy = 18"}], "answers": [{"no": 1, "ans": "D"}, {"no": 2, "ans": "A"}, {"no": 3, "ans": "B"}, {"no": 4, "ans": "C"}, {"no": 5, "ans": "B"}, {"no": 6, "ans": "B"}, {"no": 7, "ans": "C"}, {"no": 8, "ans": "A"}, {"no": 9, "ans": "D"}, {"no": 10, "ans": "D"}, {"no": 11, "ans": "A"}, {"no": 12, "ans": "B"}, {"no": 13, "ans": "−2"}, {"no": 14, "ans": "2"}, {"no": 15, "ans": "x+3y−4=0"}]}, "2023": {"meta": {"year": "2023", "title": "2023 年成考专升本《高等数学(二)》真题", "sub": "28 题 · 满分 150（选择 10×4 + 填空 10×4 + 解答 8 题共 70 分）", "total": 28, "full": 150, "time": 150, "mate": "luo"}, "paper": [{"no": 1, "type": "choice", "name": "∞/∞ 抓最高次", "ref": "一-4", "stem": "lim<sub>x→∞</sub> (x²+1)/(x²+x) = （ ）", "opts": ["-1", "0", "1/2", "1"], "ans": 3, "ansText": "D", "score": 4, "detail": "分子分母同除以 x²：(1+1/x²)/(1+1/x) → 1，选 D"}, {"no": 2, "type": "choice", "name": "基础求导", "ref": "二-1", "stem": "设函数 f(x) = x³ + 5sin x，则 f′(0) = （ ）", "opts": ["5", "3", "1", "0"], "ans": 0, "ansText": "A", "score": 4, "detail": "f′(x) = 3x² + 5cos x，f′(0) = 0 + 5 = 5，选 A"}, {"no": 3, "type": "choice", "name": "基础求导", "ref": "二-1", "stem": "设函数 f(x) = ln x − x，则 f′(x) = （ ）", "opts": ["x", "x − 1", "1/x", "1/x − 1"], "ans": 3, "ansText": "D", "score": 4, "detail": "f′(x) = (ln x − x)′ = 1/x − 1，选 D"}, {"no": 4, "type": "choice", "name": "单调区间", "ref": "二-6", "stem": "函数 f(x) = 2x³ − 9x² + 3 的单调递减区间是（ ）", "opts": ["(3, +∞)", "(−∞, +∞)", "(−∞, 0)", "(0, 3)"], "ans": 3, "ansText": "D", "score": 4, "detail": "f′(x) = 6x² − 18x = 6x(x − 3)，令 f′(x) &lt; 0 得 0 &lt; x &lt; 3，选 D"}, {"no": 5, "type": "choice", "name": "幂函数积分", "ref": "三-9", "stem": "∫ x<sup>2/3</sup> dx = （ ）", "opts": ["(2/5)x<sup>5/3</sup> + C", "(3/5)x<sup>5/3</sup> + C", "x<sup>5/3</sup> + C", "(1/5)x<sup>5/3</sup> + C"], "ans": 1, "ansText": "B", "score": 4, "detail": "指数加一：2/3 + 1 = 5/3，再除以 5/3 即乘 3/5，选 B"}, {"no": 6, "type": "choice", "name": "对称区间", "ref": "三-1", "stem": "设函数 f(x) = |x|，则 ∫<sub>−1</sub><sup>1</sup> f(x)dx = （ ）", "opts": ["-2", "0", "1", "2"], "ans": 2, "ansText": "C", "score": 4, "detail": "|x| 是偶函数，奇零偶两倍：2∫<sub>0</sub><sup>1</sup> x dx = 2·(1/2) = 1，选 C"}, {"no": 7, "type": "choice", "name": "变上限积分求导", "ref": "三-5", "stem": "设 f(x) 为连续函数，且满足 ∫<sub>0</sub><sup>x</sup> f(t)dt = e<sup>x</sup> − 1，则 f(x) = （ ）", "opts": ["e<sup>x</sup>", "e<sup>x</sup> − 1", "e<sup>x</sup> + 1", "x + 1"], "ans": 0, "ansText": "A", "score": 4, "detail": "两边同时对 x 求导：f(x) = (e<sup>x</sup> − 1)′ = e<sup>x</sup>，选 A"}, {"no": 8, "type": "choice", "name": "全微分", "ref": "五-2", "stem": "设 z = e<sup>xy</sup>，则 dz = （ ）", "opts": ["e<sup>xy</sup>dx + e<sup>xy</sup>dy", "e<sup>x</sup>dx + e<sup>y</sup>dy", "y e<sup>xy</sup>dx + x e<sup>xy</sup>dy", "e<sup>y</sup>dx + e<sup>x</sup>dy"], "ans": 2, "ansText": "C", "score": 4, "detail": "dz = d(e<sup>xy</sup>) = e<sup>xy</sup>·d(xy) = e<sup>xy</sup>(y dx + x dy)，选 C"}, {"no": 9, "type": "choice", "name": "偏导 / 混合偏导", "ref": "五-1", "stem": "设 z = (1/4)(x² + y²)，则 ∂²z/∂x∂y = （ ）", "opts": ["x/2", "0", "y/2", "(x + y)/2"], "ans": 1, "ansText": "B", "score": 4, "detail": "∂z/∂x = x/2，再对 y 求偏导得 0，选 B"}, {"no": 10, "type": "choice", "name": "独立重复试验", "ref": "六-3", "stem": "投掷一枚均匀硬币 5 次，其中恰有 3 次正面朝上的概率是（ ）", "opts": ["11/16", "3/5", "1/2", "5/16"], "ans": 3, "ansText": "D", "score": 4, "detail": "C<sub>5</sub><sup>3</sup>(1/2)³(1/2)² = 10/32 = 5/16，选 D"}, {"no": 11, "type": "fill", "name": "根式有理化", "ref": "一-5", "stem": "lim<sub>x→3</sub> (√(1+x) − 2)/(x − 3) = ____", "ansText": "1/4", "score": 4, "detail": "分子分母同乘 (√(1+x)+2)，约去 (x−3)，得 1/(√(1+x)+2) → 1/4"}, {"no": 12, "type": "fill", "name": "1<sup>∞</sup> 型极限", "ref": "一-2", "stem": "lim<sub>x→∞</sub> ((x+1)/(x−1))<sup>x</sup> = ____", "ansText": "e²", "score": 4, "detail": "(1 + 2/(x−1))<sup>x</sup>，小量 2/(x−1) × 大量 x → 2，得 e²"}, {"no": 13, "type": "fill", "name": "高阶导数", "ref": "二-7", "stem": "设函数 f(x) = e<sup>2x</sup>，则 f<sup>(n)</sup>(0) = ____", "ansText": "2<sup>n</sup>", "score": 4, "detail": "f<sup>(n)</sup>(x) = 2<sup>n</sup>e<sup>2x</sup>，代入 x=0 得 2<sup>n</sup>"}, {"no": 14, "type": "fill", "name": "切线 &amp; 法线", "ref": "二-5", "stem": "设 f(x) = x² − 2x + 4，曲线 y = f(x) 在 (x₀, f(x₀)) 处的切线与直线 y = x − 1 平行，则 x₀ = ____", "ansText": "3/2", "score": 4, "detail": "f′(x) = 2x − 2，切线与 y = x − 1 平行 ⇒ f′(x₀) = 1 ⇒ 2x₀ − 2 = 1 ⇒ x₀ = 3/2"}, {"no": 15, "type": "fill", "name": "拐点", "ref": "二-4", "stem": "曲线 y = x e<sup>x</sup> 的拐点坐标为 ____", "ansText": "(−2, −2e<sup>−2</sup>)", "score": 4, "detail": "y″ = (2 + x)e<sup>x</sup>，令 y″ = 0 得 x = −2，代回得 y = −2e<sup>−2</sup>，拐点是点(x, y)"}, {"no": 16, "type": "fill", "name": "渐近线", "ref": "二-8", "stem": "曲线 y = 2x/(1 + x²) 的渐近线方程为 ____", "ansText": "y = 0", "score": 4, "detail": "x → ∞ 时 2x/(1+x²) → 0，故有水平渐近线 y = 0"}, {"no": 17, "type": "fill", "name": "凑微分", "ref": "三-7", "stem": "∫ x/(x² + 4) dx = ____", "ansText": "(1/2)ln(x² + 4) + C", "score": 4, "detail": "= (1/2)∫ d(x²+4)/(x²+4) = (1/2)ln(x²+4) + C，不定积分别忘 +C"}, {"no": 18, "type": "fill", "name": "两曲线围成面积", "ref": "四-1", "stem": "由曲线 y = x² 与 x = y² 所围成的平面图形的面积为 ____", "ansText": "1/3", "score": 4, "detail": "交点 (0,0)、(1,1)，S = ∫<sub>0</sub><sup>1</sup>(√x − x²)dx = 2/3 − 1/3 = 1/3"}, {"no": 19, "type": "fill", "name": "反常积分", "ref": "三-6", "stem": "∫<sub>0</sub><sup>+∞</sup> x e<sup>−x²</sup> dx = ____", "ansText": "1/2", "score": 4, "detail": "= −(1/2)∫<sub>0</sub><sup>+∞</sup> e<sup>−x²</sup>d(−x²) = −(1/2)(0 − 1) = 1/2"}, {"no": 20, "type": "fill", "name": "驻点", "ref": "五-3", "stem": "函数 z = x² + y² − x − y − xy 的驻点坐标为 ____", "ansText": "(1, 1)", "score": 4, "detail": "令 z<sub>x</sub> = 2x − 1 − y = 0，z<sub>y</sub> = 2y − 1 − x = 0，解得 x = y = 1"}, {"no": 21, "type": "solve", "name": "等价无穷小", "ref": "一-1", "stem": "计算 lim<sub>x→0</sub> (1 − cos x)/x²", "steps": ["认型：0/0 型，1 − cos x 是标准等价无穷小", "替换：1 − cos x ~ x²/2", "代入：(x²/2)/x² = 1/2", "写结论：原式 = 1/2"], "score": 8, "detail": "<b>1/2</b>　（1 − cos x ~ x²/2，直接约掉 x²）"}, {"no": 22, "type": "solve", "name": "复合求导求 dy", "ref": "七-22", "stem": "设 y = ln(x + √(x²+1))，求 dy", "steps": ["外层是 ln，先按链式法则求导", "y′ = (1 + x/√(x²+1)) / (x + √(x²+1))", "通分化简：分子分母同乘 √(x²+1)", "得 y′ = 1/√(x²+1)，末尾乘 dx"], "score": 8, "detail": "<b>dy = dx/√(x²+1)</b>"}, {"no": 23, "type": "solve", "name": "分部积分", "ref": "三-8", "stem": "计算 ∫ x² cos x dx", "steps": ["把 cos x 收进 d：∫x² d(sin x)", "分部一次：x² sin x − ∫2x sin x dx", "再分部一次：∫x sin x dx = −x cos x + sin x", "合并并加上常数 C"], "score": 8, "detail": "<b>x² sin x + 2x cos x − 2 sin x + C</b>"}, {"no": 24, "type": "solve", "name": "凑微分", "ref": "三-7", "stem": "计算 ∫<sub>0</sub><sup>1</sup> x√(1 − x²) dx", "steps": ["把 x dx 凑成 d(1−x²)：x dx = −(1/2)d(1−x²)", "原式 = −(1/2)∫<sub>0</sub><sup>1</sup>(1−x²)<sup>1/2</sup> d(1−x²)", "积出 −(1/3)(1−x²)<sup>3/2</sup>", "代上下限 0 到 1"], "score": 8, "detail": "<b>1/3</b>"}, {"no": 25, "type": "solve", "name": "抽球分布与期望", "ref": "六-4", "stem": "盒中有 5 个球，其中 3 个白球、2 个黑球，从中随机一次抽取 3 个球，用 X 表示抽到的白球数。(1) 求 X 的概率分布；(2) 求 E(X)", "steps": ["X 的可能取值：1, 2, 3（黑球只有 2 个）", "P(X=1) = C₃¹C₂²/C₅³ = 3/10", "P(X=2) = C₃²C₂¹/C₅³ = 3/5；P(X=3) = C₃³/C₅³ = 1/10", "E(X) = 1×0.3 + 2×0.6 + 3×0.1 = 1.8"], "score": 8, "detail": "<b>分布：P(X=1)=3/10，P(X=2)=3/5，P(X=3)=1/10；E(X) = 1.8</b>"}, {"no": 26, "type": "solve", "name": "最值应用题", "ref": "七-24", "stem": "要做一个容积 V 立方米的密闭圆柱形容器，两底面材料价格为每平方米 a 元，侧面材料价格为每平方米 b 元，问底面半径与高的比等于多少时造价最低？", "steps": ["设底面半径 r、高 h，造价 L = 2aπr² + 2bπrh，且 πr²h = V", "由约束解出 h = V/(πr²)，代入 L", "求导 L′ = 4aπr − 2bV/r²，令其为零", "得 2aπr³ = bV，结合 πr²h = V 推出 2ar = bh"], "score": 10, "detail": "<b>r/h = b/(2a)</b>"}, {"no": 27, "type": "solve", "name": "证明不等式", "ref": "七-21", "stem": "证明：当 x ≥ 0 时，ln(1 + x) ≥ x − x²/2", "steps": ["移项造函数：f(x) = ln(1+x) − x + x²/2", "求导：f′(x) = 1/(1+x) − 1 + x = x²/(1+x)", "当 x ≥ 0 时 f′(x) ≥ 0，故 f 单调递增", "f(x) ≥ f(0) = 0，不等式成立"], "score": 10, "detail": "<b>证毕</b>　（关键：f′(x) = x²/(1+x) ≥ 0）"}, {"no": 28, "type": "solve", "name": "条件极值（拉格朗日）", "ref": "五-4", "stem": "设 f(x, y) = (1/2)(x<sup>n</sup> + y<sup>n</sup>)，n 为大于 1 的整数，求在条件 x + y = c 下 f(x, y) 的最小值（x &gt; 0, y &gt; 0, c 为正常数）", "steps": ["构造 L = (1/2)(x<sup>n</sup> + y<sup>n</sup>) + λ(x + y − c)", "令 L<sub>x</sub> = (n/2)x<sup>n−1</sup> + λ = 0，L<sub>y</sub> = (n/2)y<sup>n−1</sup> + λ = 0", "两式相减得 x = y，结合 x + y = c 得 x = y = c/2", "代回 f 得最小值"], "score": 10, "detail": "<b>最小值为 (c/2)<sup>n</sup></b>"}], "answers": [{"no": 1, "ans": "D"}, {"no": 2, "ans": "A"}, {"no": 3, "ans": "D"}, {"no": 4, "ans": "D"}, {"no": 5, "ans": "B"}, {"no": 6, "ans": "C"}, {"no": 7, "ans": "A"}, {"no": 8, "ans": "C"}, {"no": 9, "ans": "B"}, {"no": 10, "ans": "D"}, {"no": 11, "ans": "1/4"}, {"no": 12, "ans": "e²"}, {"no": 13, "ans": "2<sup>n</sup>"}, {"no": 14, "ans": "3/2"}, {"no": 15, "ans": "(−2, −2e<sup>−2</sup>)"}, {"no": 16, "ans": "y = 0"}, {"no": 17, "ans": "(1/2)ln(x² + 4) + C"}, {"no": 18, "ans": "1/3"}, {"no": 19, "ans": "1/2"}, {"no": 20, "ans": "(1, 1)"}]}}, "gang": [{"code": "一", "title": "极限部分", "scope": "极限", "items": [{"code": "一", "num": "1", "name": "等价无穷小 sin□/□", "formula": "<span class=\"f\">lim<sub>x→0</sub> <sup>sin □</sup>⁄<sub>□</sub> = 1</span>　例：lim<sub>x→0</sub> sin(mx)/x = m", "koujue": "<b>sin 比方框，方框趋于 0，结果取系数</b>"}, {"code": "一", "num": "2", "name": "1<sup>∞</sup> 型极限", "formula": "<span class=\"f\">lim (1 + 小量)<sup>大量</sup> = e<sup>小量 × 大量</sup></span><br>分式专用速记：<span class=\"f hl\">lim<sub>x→∞</sub> ( (x+A)/(x+B) )<sup>x</sup> = e<sup>A−B</sup></span>", "koujue": "<b>1 加小量，大次方，e 的（小量×大量）次方上</b>"}, {"code": "一", "num": "3", "name": "分段函数连续", "formula": "<span class=\"f\">左极限 = 右极限 = 该点函数值</span>", "koujue": "<b>分段点求连续，左极右极要相等</b>；x 从左边来用下式，右边来用上式，等式解方程求参数"}, {"code": "一", "num": "4", "name": "∞/∞ 抓最高次", "formula": "lim<sub>x→∞</sub> (x²+1)/(x²+x) = 1", "koujue": "∞比∞别慌张，最高次系数比一比，低次全部当空气"}, {"code": "一", "num": "5", "name": "根式有理化", "formula": "(√(1+x)−2)/(x−3) · (√(1+x)+2)/(√(1+x)+2)", "koujue": "根式减根式，分子分母同乘共轭，约掉零因子再代入"}]}, {"code": "二", "title": "求导部分", "scope": "求导", "items": [{"code": "二", "num": "1", "name": "基础求导", "formula": "<span class=\"f\">(ln x)′ = 1/x　　(x<sup>n</sup>)′ = n·x<sup>n−1</sup></span>", "koujue": "<b>lnx 求导倒 x；幂次求导，幂次往前跑，幂次减一少</b>"}, {"code": "二", "num": "2", "name": "乘积求导", "formula": "<span class=\"f\">y = u·v ⇒ y′ = u′v + u v′</span><br>特殊模板（直接背）：<span class=\"f hl\">( x·e<sup>kx</sup> )′ = (1 + kx)·e<sup>kx</sup></span>", "koujue": "<b>前导后不导，前不导后导</b>；x·e<sup>kx</sup> 不现场算，直接套"}, {"code": "二", "num": "3", "name": "原函数概念", "formula": "<span class=\"f\">F(x) 是 f(x) 的一个原函数 ⇒ f(x) = F′(x)</span>", "koujue": "<b>原函数求导得 f(x)，f(x) 积分得原函数</b>"}, {"code": "二", "num": "4", "name": "拐点", "formula": "<span class=\"f\">令 y″ = 0 解出 x，再代回原式求 y</span>", "koujue": "<b>一阶导找极值，二阶导找拐点；二阶等于 0，再代回求 y</b><br><span class=\"warn\">⚠ 拐点是点 (x, y)，不要只写 x</span>"}, {"code": "二", "num": "5", "name": "切线 & 法线（高频坑）", "formula": "<span class=\"f\">k<sub>切</sub> = f′(x<sub>0</sub>)　　k<sub>法</sub> = − 1 / k<sub>切</sub>　　y − y<sub>0</sub> = k (x − x<sub>0</sub>)</span>", "koujue": "<b>导数是切线斜率；法线斜率负倒数</b>；再用点斜式<br><span class=\"warn\">⚠ 两斜率相乘一定 = −1（可反向验算）</span>"}, {"code": "二", "num": "6", "name": "单调区间", "formula": "f′(x)&lt;0 → 递减区间；f′(x)&gt;0 → 递增区间", "koujue": "一阶导判增减：小于零在减，大于零在增，等于零是驻点"}, {"code": "二", "num": "7", "name": "高阶导数", "formula": "f(x)=e<sup>2x</sup> → f<sup>(n)</sup>(x)=2<sup>n</sup>e<sup>2x</sup>", "koujue": "e的kx求n阶导，前面k的n次方直接提"}, {"code": "二", "num": "8", "name": "渐近线", "formula": "x→∞ 时 y→c ⇒ 水平渐近线 y=c", "koujue": "x趋无穷看y值，y定住就是水平线；y跑无穷看x，x定住是竖直线"}]}, {"code": "三", "title": "一元积分", "scope": "积分", "items": [{"code": "三", "num": "1", "name": "对称区间 ∫<sub>−a</sub><sup>a</sup>", "formula": "<span class=\"f\">奇函数：∫<sub>−a</sub><sup>a</sup> f = 0　　偶函数：∫<sub>−a</sub><sup>a</sup> f = 2∫<sub>0</sub><sup>a</sup> f</span>", "koujue": "<b>奇零，偶两倍</b>　前提：上下限必须是 −a → a"}, {"code": "三", "num": "2", "name": "根号换元 ∫ f(√x) dx", "formula": "<span class=\"f\">t = √x　⇒　x = t²　⇒　<span class=\"hl\">dx = 2t dt</span></span>", "koujue": "<b>见到根号 t 换元，x 等于 t 平方，dx 别忘 2t</b><br>定积分换元必换限；遇到 t·cos t、t·sin t 必须分部积分"}, {"code": "三", "num": "3", "name": "分式多项式积分", "formula": "<span class=\"f\">(x+1)² / x = x + 2 + 1/x　　∫ 1/x dx = ln|x| + C</span>", "koujue": "<b>分子高于分母，先拆开，再积分</b><br><span class=\"warn\">⚠ 不定积分勿忘 + C，漏写扣分</span>"}, {"code": "三", "num": "4", "name": "三角平方积分", "formula": "<span class=\"f\">sin²x = (1 − cos2x)/2　　cos²x = (1 + cos2x)/2</span>", "koujue": "<b>遇平方，就降幂</b>"}, {"code": "三", "num": "5", "name": "变上限积分求导", "formula": "∫<sub>0</sub><sup>x</sup> f(t)dt = F(x) ⇒ f(x) = F′(x)", "koujue": "上限是x直接求导，积分号一秒变原函数；上限不是x还要乘上限的导"}, {"code": "三", "num": "6", "name": "反常积分", "formula": "∫<sub>0</sub><sup>+∞</sup> x e<sup>−x²</sup>dx = 1/2", "koujue": "积分上限是无穷，先当常数b算到底，再让b趋无穷取极限"}, {"code": "三", "num": "7", "name": "凑微分", "formula": "∫ x/(x²+4) dx = (1/2)ln(x²+4) + C", "koujue": "分子刚好是分母的导，直接凑进d里，系数配平别漏除"}, {"code": "三", "num": "8", "name": "分部积分", "formula": "∫u dv = uv − ∫v du", "koujue": "多项式乘三角/指数，就把多项式往d后面推，推到没了就结束"}, {"code": "三", "num": "9", "name": "幂函数积分", "formula": "∫x<sup>n</sup>dx = x<sup>n+1</sup>/(n+1) + C", "koujue": "指数先加一，再除新指数，末尾别忘 +C"}]}, {"code": "四", "title": "定积分求面积", "scope": "面积/体积", "items": [{"code": "四", "num": "1", "name": "两曲线围成面积", "formula": "<span class=\"f\">S = ∫ (右曲线 − 左曲线) dy　或　∫ (上 − 下) dx</span>", "koujue": "<b>抛物线带 y²，优先对 y 积分；右减左，上减下，面积结果必为正</b><br><span class=\"warn\">⚠ 不要强行对 x 积分，容易拆两段算错</span>"}, {"code": "四", "num": "2", "name": "旋转体体积", "formula": "V = π∫<sub>a</sub><sup>b</sup> y²dx（绕 x 轴）", "koujue": "绕x轴转一圈，π乘y的平方再积分；绕y轴就把x平方对y积"}]}, {"code": "五", "title": "偏导数", "scope": "偏导/极值", "items": [{"code": "五", "num": "1", "name": "偏导 / 混合偏导", "formula": "<span class=\"f\">∂z/∂y：把 x 看作常数，只对 y 求导</span>", "koujue": "<b>对谁求导谁变动，其余字母当常数</b>；混合偏导一步一步算"}, {"code": "五", "num": "2", "name": "全微分", "formula": "dz = (∂z/∂x)dx + (∂z/∂y)dy", "koujue": "全微分两片拼：对x的偏导乘dx，加上对y的偏导乘dy"}, {"code": "五", "num": "3", "name": "驻点", "formula": "令 ∂z/∂x = 0，∂z/∂y = 0，解方程组", "koujue": "偏导各自等于零，联立方程组解出的点就是驻点"}, {"code": "五", "num": "4", "name": "条件极值（拉格朗日）", "formula": "L = f + λ·(约束)", "koujue": "加λ乘约束，三个偏导都为零，联立解出x和y再代回"}]}, {"code": "六", "title": "概率", "scope": "概率/排列", "items": [{"code": "六", "num": "1", "name": "离散分布", "formula": "<span class=\"f\">p<sub>1</sub> + p<sub>2</sub> + … = 1</span>", "koujue": "<b>全部概率加一起，总和一定等于 1，缺谁求谁</b>"}, {"code": "六", "num": "2", "name": "事件减法公式", "formula": "<span class=\"f\">P(A − B) = P(A) − P(AB)</span><br>只有 <span class=\"f\">B ⊆ A</span> 时才有 P(A−B) = P(A) − P(B)，等价 <span class=\"f\">P(B−A) = 0</span>", "koujue": "<b>P(A−B) = P(A) − P(AB)</b>；题里给了 P(A)−P(B) ⇔ 说明 B⊆A"}, {"code": "六", "num": "3", "name": "独立重复试验", "formula": "P = C<sub>n</sub><sup>k</sup> p<sup>k</sup>(1−p)<sup>n−k</sup>", "koujue": "n次独立重复，恰有k次：组合数乘p的k次乘(1−p)的剩余次"}, {"code": "六", "num": "4", "name": "抽球分布与期望", "formula": "P(X=k)=C<sub>M</sub><sup>k</sup>C<sub>N−M</sub><sup>n−k</sup>/C<sub>N</sub><sup>n</sup>", "koujue": "抽球不放回用组合，分子分类相乘、分母总数取n；期望就是取值乘概率全加起"}, {"code": "六", "num": "5", "name": "排列：不相邻", "formula": "不相邻 = 总数 − 相邻（或先排其余再插空）", "koujue": "要谁不相邻，先排其他人再插空；或直接总数减掉捆绑后的相邻数"}]}, {"code": "七", "title": "大题拿步骤分", "scope": "大题", "items": [{"code": "七", "num": "16", "name": "单调区间 + 极值", "formula": "<span class=\"f\">一求导，二找驻点，三列表判正负，四写区间写极值</span>", "koujue": "<span class=\"warn\">⚠ 区间用逗号隔开，不要用 ∪；极值写 y 值，不是 x</span>"}, {"code": "七", "num": "17", "name": "三角积分", "formula": "<span class=\"f\">先降幂，再拆开，逐项积，末尾 + C 不能弃</span>", "koujue": ""}, {"code": "七", "num": "18", "name": "求图形面积", "formula": "<span class=\"f\">一联立交点，二选积分变量，三右减左，代入上下限相减</span>", "koujue": ""}, {"code": "七", "num": "21", "name": "证明不等式（构造函数）", "formula": "要证 A≥B，令 f = A−B，证 f 的最小值 ≥0", "koujue": "移项造函数，求导找最小，最小值不小于零，不等式就成立"}, {"code": "七", "num": "22", "name": "复合求导求 dy", "formula": "y′ 算出来，dy = y′·dx", "koujue": "先按链式法则求y′，末尾乘个dx就是dy"}, {"code": "七", "num": "24", "name": "最值应用题", "formula": "造价/面积函数 → 求导 = 0 → 解得取极值的量", "koujue": "一设变量二列函数，三求导令零四解出，实际问题唯一驻点就是最值"}]}], "kou": {"一-1": {"code": "一", "name": "等价无穷小 sin□/□", "formula": "<span class=\"f\">lim<sub>x→0</sub> <sup>sin □</sup>⁄<sub>□</sub> = 1</span>　例：lim<sub>x→0</sub> sin(mx)/x = m", "koujue": "<b>sin 比方框，方框趋于 0，结果取系数</b>"}, "一-2": {"code": "一", "name": "1<sup>∞</sup> 型极限", "formula": "<span class=\"f\">lim (1 + 小量)<sup>大量</sup> = e<sup>小量 × 大量</sup></span><br>分式专用速记：<span class=\"f hl\">lim<sub>x→∞</sub> ( (x+A)/(x+B) )<sup>x</sup> = e<sup>A−B</sup></span>", "koujue": "<b>1 加小量，大次方，e 的（小量×大量）次方上</b>"}, "一-3": {"code": "一", "name": "分段函数连续", "formula": "<span class=\"f\">左极限 = 右极限 = 该点函数值</span>", "koujue": "<b>分段点求连续，左极右极要相等</b>；x 从左边来用下式，右边来用上式，等式解方程求参数"}, "一-4": {"code": "一", "name": "∞/∞ 抓最高次", "formula": "lim<sub>x→∞</sub> (x²+1)/(x²+x) = 1", "koujue": "∞比∞别慌张，最高次系数比一比，低次全部当空气"}, "一-5": {"code": "一", "name": "根式有理化", "formula": "(√(1+x)−2)/(x−3) · (√(1+x)+2)/(√(1+x)+2)", "koujue": "根式减根式，分子分母同乘共轭，约掉零因子再代入"}, "二-1": {"code": "二", "name": "基础求导", "formula": "<span class=\"f\">(ln x)′ = 1/x　　(x<sup>n</sup>)′ = n·x<sup>n−1</sup></span>", "koujue": "<b>lnx 求导倒 x；幂次求导，幂次往前跑，幂次减一少</b>"}, "二-2": {"code": "二", "name": "乘积求导", "formula": "<span class=\"f\">y = u·v ⇒ y′ = u′v + u v′</span><br>特殊模板（直接背）：<span class=\"f hl\">( x·e<sup>kx</sup> )′ = (1 + kx)·e<sup>kx</sup></span>", "koujue": "<b>前导后不导，前不导后导</b>；x·e<sup>kx</sup> 不现场算，直接套"}, "二-3": {"code": "二", "name": "原函数概念", "formula": "<span class=\"f\">F(x) 是 f(x) 的一个原函数 ⇒ f(x) = F′(x)</span>", "koujue": "<b>原函数求导得 f(x)，f(x) 积分得原函数</b>"}, "二-4": {"code": "二", "name": "拐点", "formula": "<span class=\"f\">令 y″ = 0 解出 x，再代回原式求 y</span>", "koujue": "<b>一阶导找极值，二阶导找拐点；二阶等于 0，再代回求 y</b><br><span class=\"warn\">⚠ 拐点是点 (x, y)，不要只写 x</span>"}, "二-5": {"code": "二", "name": "切线 & 法线（高频坑）", "formula": "<span class=\"f\">k<sub>切</sub> = f′(x<sub>0</sub>)　　k<sub>法</sub> = − 1 / k<sub>切</sub>　　y − y<sub>0</sub> = k (x − x<sub>0</sub>)</span>", "koujue": "<b>导数是切线斜率；法线斜率负倒数</b>；再用点斜式<br><span class=\"warn\">⚠ 两斜率相乘一定 = −1（可反向验算）</span>"}, "二-6": {"code": "二", "name": "单调区间", "formula": "f′(x)&lt;0 → 递减区间；f′(x)&gt;0 → 递增区间", "koujue": "一阶导判增减：小于零在减，大于零在增，等于零是驻点"}, "二-7": {"code": "二", "name": "高阶导数", "formula": "f(x)=e<sup>2x</sup> → f<sup>(n)</sup>(x)=2<sup>n</sup>e<sup>2x</sup>", "koujue": "e的kx求n阶导，前面k的n次方直接提"}, "二-8": {"code": "二", "name": "渐近线", "formula": "x→∞ 时 y→c ⇒ 水平渐近线 y=c", "koujue": "x趋无穷看y值，y定住就是水平线；y跑无穷看x，x定住是竖直线"}, "三-1": {"code": "三", "name": "对称区间 ∫<sub>−a</sub><sup>a</sup>", "formula": "<span class=\"f\">奇函数：∫<sub>−a</sub><sup>a</sup> f = 0　　偶函数：∫<sub>−a</sub><sup>a</sup> f = 2∫<sub>0</sub><sup>a</sup> f</span>", "koujue": "<b>奇零，偶两倍</b>　前提：上下限必须是 −a → a"}, "三-2": {"code": "三", "name": "根号换元 ∫ f(√x) dx", "formula": "<span class=\"f\">t = √x　⇒　x = t²　⇒　<span class=\"hl\">dx = 2t dt</span></span>", "koujue": "<b>见到根号 t 换元，x 等于 t 平方，dx 别忘 2t</b><br>定积分换元必换限；遇到 t·cos t、t·sin t 必须分部积分"}, "三-3": {"code": "三", "name": "分式多项式积分", "formula": "<span class=\"f\">(x+1)² / x = x + 2 + 1/x　　∫ 1/x dx = ln|x| + C</span>", "koujue": "<b>分子高于分母，先拆开，再积分</b><br><span class=\"warn\">⚠ 不定积分勿忘 + C，漏写扣分</span>"}, "三-4": {"code": "三", "name": "三角平方积分", "formula": "<span class=\"f\">sin²x = (1 − cos2x)/2　　cos²x = (1 + cos2x)/2</span>", "koujue": "<b>遇平方，就降幂</b>"}, "三-5": {"code": "三", "name": "变上限积分求导", "formula": "∫<sub>0</sub><sup>x</sup> f(t)dt = F(x) ⇒ f(x) = F′(x)", "koujue": "上限是x直接求导，积分号一秒变原函数；上限不是x还要乘上限的导"}, "三-6": {"code": "三", "name": "反常积分", "formula": "∫<sub>0</sub><sup>+∞</sup> x e<sup>−x²</sup>dx = 1/2", "koujue": "积分上限是无穷，先当常数b算到底，再让b趋无穷取极限"}, "三-7": {"code": "三", "name": "凑微分", "formula": "∫ x/(x²+4) dx = (1/2)ln(x²+4) + C", "koujue": "分子刚好是分母的导，直接凑进d里，系数配平别漏除"}, "三-8": {"code": "三", "name": "分部积分", "formula": "∫u dv = uv − ∫v du", "koujue": "多项式乘三角/指数，就把多项式往d后面推，推到没了就结束"}, "三-9": {"code": "三", "name": "幂函数积分", "formula": "∫x<sup>n</sup>dx = x<sup>n+1</sup>/(n+1) + C", "koujue": "指数先加一，再除新指数，末尾别忘 +C"}, "四-1": {"code": "四", "name": "两曲线围成面积", "formula": "<span class=\"f\">S = ∫ (右曲线 − 左曲线) dy　或　∫ (上 − 下) dx</span>", "koujue": "<b>抛物线带 y²，优先对 y 积分；右减左，上减下，面积结果必为正</b><br><span class=\"warn\">⚠ 不要强行对 x 积分，容易拆两段算错</span>"}, "四-2": {"code": "四", "name": "旋转体体积", "formula": "V = π∫<sub>a</sub><sup>b</sup> y²dx（绕 x 轴）", "koujue": "绕x轴转一圈，π乘y的平方再积分；绕y轴就把x平方对y积"}, "五-1": {"code": "五", "name": "偏导 / 混合偏导", "formula": "<span class=\"f\">∂z/∂y：把 x 看作常数，只对 y 求导</span>", "koujue": "<b>对谁求导谁变动，其余字母当常数</b>；混合偏导一步一步算"}, "五-2": {"code": "五", "name": "全微分", "formula": "dz = (∂z/∂x)dx + (∂z/∂y)dy", "koujue": "全微分两片拼：对x的偏导乘dx，加上对y的偏导乘dy"}, "五-3": {"code": "五", "name": "驻点", "formula": "令 ∂z/∂x = 0，∂z/∂y = 0，解方程组", "koujue": "偏导各自等于零，联立方程组解出的点就是驻点"}, "五-4": {"code": "五", "name": "条件极值（拉格朗日）", "formula": "L = f + λ·(约束)", "koujue": "加λ乘约束，三个偏导都为零，联立解出x和y再代回"}, "六-1": {"code": "六", "name": "离散分布", "formula": "<span class=\"f\">p<sub>1</sub> + p<sub>2</sub> + … = 1</span>", "koujue": "<b>全部概率加一起，总和一定等于 1，缺谁求谁</b>"}, "六-2": {"code": "六", "name": "事件减法公式", "formula": "<span class=\"f\">P(A − B) = P(A) − P(AB)</span><br>只有 <span class=\"f\">B ⊆ A</span> 时才有 P(A−B) = P(A) − P(B)，等价 <span class=\"f\">P(B−A) = 0</span>", "koujue": "<b>P(A−B) = P(A) − P(AB)</b>；题里给了 P(A)−P(B) ⇔ 说明 B⊆A"}, "六-3": {"code": "六", "name": "独立重复试验", "formula": "P = C<sub>n</sub><sup>k</sup> p<sup>k</sup>(1−p)<sup>n−k</sup>", "koujue": "n次独立重复，恰有k次：组合数乘p的k次乘(1−p)的剩余次"}, "六-4": {"code": "六", "name": "抽球分布与期望", "formula": "P(X=k)=C<sub>M</sub><sup>k</sup>C<sub>N−M</sub><sup>n−k</sup>/C<sub>N</sub><sup>n</sup>", "koujue": "抽球不放回用组合，分子分类相乘、分母总数取n；期望就是取值乘概率全加起"}, "六-5": {"code": "六", "name": "排列：不相邻", "formula": "不相邻 = 总数 − 相邻（或先排其余再插空）", "koujue": "要谁不相邻，先排其他人再插空；或直接总数减掉捆绑后的相邻数"}, "七-16": {"code": "七", "name": "单调区间 + 极值", "formula": "<span class=\"f\">一求导，二找驻点，三列表判正负，四写区间写极值</span>", "koujue": "<span class=\"warn\">⚠ 区间用逗号隔开，不要用 ∪；极值写 y 值，不是 x</span>"}, "七-17": {"code": "七", "name": "三角积分", "formula": "<span class=\"f\">先降幂，再拆开，逐项积，末尾 + C 不能弃</span>", "koujue": ""}, "七-18": {"code": "七", "name": "求图形面积", "formula": "<span class=\"f\">一联立交点，二选积分变量，三右减左，代入上下限相减</span>", "koujue": ""}, "七-21": {"code": "七", "name": "证明不等式（构造函数）", "formula": "要证 A≥B，令 f = A−B，证 f 的最小值 ≥0", "koujue": "移项造函数，求导找最小，最小值不小于零，不等式就成立"}, "七-22": {"code": "七", "name": "复合求导求 dy", "formula": "y′ 算出来，dy = y′·dx", "koujue": "先按链式法则求y′，末尾乘个dx就是dy"}, "七-24": {"code": "七", "name": "最值应用题", "formula": "造价/面积函数 → 求导 = 0 → 解得取极值的量", "koujue": "一设变量二列函数，三求导令零四解出，实际问题唯一驻点就是最值"}}, "traps": ["不定积分选项<b>没有 +C</b> → 直接排除", "拐点是<b>坐标 (x, y)</b>，只给 x 的 → 直接错", "法线斜率 × 切线斜率<b>一定 = −1</b>，不满足的排掉", "<b>面积、概率一定 ≥ 0</b>，负数选项直接排除"], "cheat": [["极限", "sin 方框比方框，系数直接上；1 加小量大次方，e 上小乘大"], ["求导", "原函数求导得 f，拐点二阶等于 0；切线是导数，法线负倒数"], ["积分", "奇零偶两倍，根号换元 dx 带 2t；遇平方就降幂，分式先拆项"], ["其它", "偏导：对谁求导谁变动；概率总和等于 1；不定积分带 +C"]]};
/* 历年真题秒刷 · 逻辑层（数据在 window.PAPER24，由 _gen_paper24.py 生成）
 * 依赖全局：st / save / go / toast / escapeHtml / getMate / addXp
 * 屏幕：#s-paper24 + #paper24Body
 * 多卷：window.PAPER24 = {years, papers:{year:{meta,paper,answers}}, gang, kou, traps, cheat}
 *   p24D() 会把「当前年份卷 + 公共口诀库」合并成一个 d 返回，下游代码无需感知多卷。
 *   切年份用 paper24SetYear(y)：旧卷进度存 st.paper24.saves[y]，新卷自动载入/新建。
 * 玩法：选择/填空点答案即时判分 → 答错/卡住点「🎵看口诀」弹本题对应口诀（记录查阅次数）
 *   → 解答题勾选骨架步骤自评 → 交卷出「得分 + 口诀薄弱锚定卡（降序）+ 做题方式收获卡」
 *   → 错题一键复练；口诀可「✅我记住了」固化进记忆本。
 * 计分各卷不同：2025/2024 = 7/7/15；2023 = 4/4/(8~10)，满分段 d.meta.full 动态取。
 * ========================================================================== */
function p24W(){ return window.PAPER24 || null; }
/* 当前年份（默认最新一卷） */
function p24Year(){
  var W=p24W(); if(!W) return null;
  var p=S.paper24;
  if(p && p.year && W.papers && W.papers[p.year]) return p.year;
  return (W.years && W.years[0]) || null;
}
/* 当前卷数据（把公共的 gang/kou/traps/cheat 与当年卷合并，下游代码无需感知多卷） */
function p24D(){
  var W=p24W(); if(!W) return null;
  var y=p24Year();
  var pk=(W.papers && W.papers[y]) || (W.papers && W.papers[W.years[0]]);
  if(!pk) return null;
  return { year:y, meta:pk.meta, paper:pk.paper, answers:pk.answers,
           gang:W.gang, kou:W.kou, traps:W.traps, cheat:W.cheat,
           years:W.years };
}
function p24Fresh(year){
  return { year:year||p24Year(), mode:'home', idx:0, t0:0, lite:false,
    pick:{}, input:{}, reveal:{}, selfOK:{}, steps:{},
    done:false, combo:0, bubble:null, seen:{}, wrong:[], review:null, reviewPos:0,
    score:0, objRate:0, stepRate:0, pass:false };
}
function p24ST(){
  if(!st.paper24) st.paper24 = {};
  st.paper24.known = st.paper24.known || {};
  st.paper24.saves = st.paper24.saves || {};   // 每卷独立的答题进度
  return st.paper24;
}
function p24Best(){                            // 每卷独立的最佳成绩
  var s=p24ST(); s.best=s.best||{};
  var y=p24Year();
  return (y && s.best[y]) || null;
}
/* 切年份：先存旧卷进度，再载入/新建新卷进度 */
function paper24SetYear(y){
  var W=p24W(); if(!W || !W.papers[y]) return;
  var s=p24ST();
  if(S.paper24 && S.paper24.year && S.paper24.year!==y){
    s.saves[S.paper24.year]=S.paper24;
    if(typeof save==='function') save();
  }
  S.paper24 = s.saves[y] || p24Fresh(y);
  S.paper24.year = y;
  if(!S.paper24.t0) S.paper24.t0 = Date.now();
  if(typeof save==='function') save();
  renderPaper24();
  if(typeof toast==='function') toast('已切到 '+y+' 年真题');
}
function p24Mate(d){
  if(typeof getMate==='function') return getMate((d.meta && d.meta.mate) || 'luo');
  return null;
}
function p24InjectStyle(){
  if(document.getElementById('p24Style')) return;
  var s=document.createElement('style'); s.id='p24Style';
  s.textContent=
   '.p24-opt{padding:10px 12px;border:1px solid rgba(128,128,128,.3);border-radius:8px;cursor:pointer;font-size:13.5px;line-height:1.5;transition:border-color .15s}'
  +'.p24-opt.p24-sel{border-color:var(--magenta);background:rgba(255,138,209,.1)}'
  +'.p24-opt.p24-right{border-color:#1e8a4c;background:rgba(30,138,76,.12)}'
  +'.p24-opt.p24-wrong{border-color:#e4572e;background:rgba(228,87,46,.1)}'
  +'.p24-input{width:100%;padding:10px 12px;border:1px solid rgba(128,128,128,.35);border-radius:8px;font-size:14px;box-sizing:border-box}'
  +'.p24-step{display:block;padding:7px 10px;border:1px solid rgba(128,128,128,.2);border-radius:8px;margin-top:6px;font-size:13px;cursor:pointer}'
  +'.p24-step.p24-on{border-color:#1e8a4c;background:rgba(30,138,76,.1)}'
  +'.p24-ex{margin-top:10px;padding:9px 12px;border-radius:8px;font-size:13px;line-height:1.65}'
  +'.p24-ex.ok{background:rgba(30,138,76,.1);border:1px solid rgba(30,138,76,.3)}'
  +'.p24-ex.bad{background:rgba(228,87,46,.1);border:1px solid rgba(228,87,46,.3)}'
  +'.p24-bub{display:flex;gap:8px;align-items:flex-start;background:rgba(255,138,209,.08);border:1px solid rgba(255,138,209,.3);border-radius:12px;padding:9px 12px;margin:8px 0;font-size:13px;line-height:1.55}'
  +'.p24-bub.ok{background:rgba(30,138,76,.1);border-color:rgba(30,138,76,.35)}'
  +'.p24-bub.bad{background:rgba(228,87,46,.08);border-color:rgba(228,87,46,.3)}'
  +'.p24-av{width:30px;height:30px;border-radius:50%;flex:0 0 auto;object-fit:cover}'
  +'.p24-combo{display:inline-block;font-size:12px;font-weight:700;color:#e4572e;background:rgba(228,87,46,.12);padding:2px 9px;border-radius:999px}'
  +'.p24-kjbtn{display:inline-block;font-size:12.5px;color:#17a398;cursor:pointer;background:rgba(23,163,152,.1);border:1px solid rgba(23,163,152,.4);border-radius:999px;padding:4px 11px;margin-top:6px}'
  +'.p24-kj{margin-top:8px;border:1px solid rgba(23,163,152,.35);background:rgba(23,163,152,.06);border-radius:10px;padding:9px 12px;font-size:13px;line-height:1.7}'
  +'.p24-f{display:inline-block;background:rgba(128,128,128,.08);border-radius:5px;padding:2px 7px;font-family:Cambria,serif}'
  +'.p24-tab{display:flex;gap:8px;margin:10px 0 2px}'
  +'.p24-tab button{flex:1;padding:8px 6px;border-radius:9px;border:1px solid rgba(128,128,128,.3);background:transparent;color:inherit;font-size:12.5px;cursor:pointer}'
  +'.p24-tab button.on{background:var(--magenta);border-color:var(--magenta);color:#fff;font-weight:700}'
  +'.p24-gcard{border:1px solid rgba(128,128,128,.22);border-left:4px solid #2c7a5b;border-radius:8px;padding:8px 11px;margin:7px 0;font-size:13px;line-height:1.7}'
  +'.p24-gcard h4{font-size:13px;margin:0 0 3px}'
  +'.p24-gcard .bd{display:inline-block;background:#0f3d2e;color:#fff;border-radius:5px;padding:0 6px;margin-right:6px;font-size:11px}'
  +'.p24-trap{border:1px solid rgba(228,87,46,.35);background:rgba(228,87,46,.07);border-radius:8px;padding:8px 11px;font-size:12.5px;line-height:1.8}'
  +'.p24-cheat{border:2px double #2c7a5b;border-radius:10px;padding:9px 12px;font-size:13px;line-height:1.85}'
  +'.p24-bar{height:6px;background:rgba(128,128,128,.18);border-radius:4px;overflow:hidden;margin-top:6px}'
  +'.p24-bar > i{display:block;height:100%;background:var(--magenta)}';
  document.head.appendChild(s);
}
/* ============================ 入口 ============================ */
function startPaper24(){
  var d=p24D(); if(!d){ if(typeof toast==='function') toast('题库未加载'); return; }
  var s=p24ST();
  S.paper24 = s.saves[d.year] || p24Fresh(d.year);   // 沿用该卷上次进度
  S.paper24.year = d.year;
  if(!S.paper24.t0) S.paper24.t0 = Date.now();
  go('s-paper24'); renderPaper24();
}
function paper24Back(){
  var p=S.paper24; if(!p){ go('s-study'); return; }
  if(p.mode!=='home'){ p.mode='home'; renderPaper24(); }
  else go('s-study');
}
function renderPaper24(){
  p24InjectStyle();
  var body=document.getElementById('paper24Body'); if(!body) return;
  var d=p24D(); if(!d){ body.innerHTML='<div class="card">题库加载中…</div>'; return; }
  var p=S.paper24 || (S.paper24=p24Fresh());
  if(!p.year) p.year = d.year;
  if(p.mode==='gang')   return paper24GangScreen(body,d,p);
  if(p.mode==='cheat')  return paper24CheatScreen(body,d,p);
  if(p.mode==='exam')   return paper24Exam(body,d,p);
  if(p.mode==='report') return paper24Report(body,d,p);
  return paper24Home(body,d,p);
}
function p24Tabs(p,cur){
  return '<div class="p24-tab">'
    +'<button class="'+(cur==='home'?'on':'')+'" onclick="p24Go(\'home\')">🔥 真题秒刷</button>'
    +'<button class="'+(cur==='gang'?'on':'')+'" onclick="p24Go(\'gang\')">📖 秒题口诀</button>'
    +'<button class="'+(cur==='cheat'?'on':'')+'" onclick="p24Go(\'cheat\')">⚡ 一页背诵</button>'
    +'</div>';
}
function p24Go(mode){
  var p=S.paper24||(S.paper24=p24Fresh());
  p.mode=mode; renderPaper24();
  var b=document.getElementById('paper24Body'); if(b&&b.scrollIntoView) b.scrollIntoView({block:'start'});
}
/* ============================ 主页 ============================ */
function paper24Home(body,d,p){
  var s=p24ST(), best=p24Best();
  var objN=0, objS=0, solN=0;
  d.paper.forEach(function(q){
    if(q.type==='solve') solN++; else { objN++; objS+=q.score; }
  });
  /* 年份切换 */
  var h='<div style="padding:12px 16px 0"><div class="p24-tab">';
  (d.years||[]).forEach(function(y){
    var on = (y===d.year);
    h+='<button class="'+(on?'on':'')+'" onclick="paper24SetYear(\''+y+'\')">'+y+' 年</button>';
  });
  h+='</div>'
    +'<div style="font-size:19px;font-weight:800;margin-top:8px">📄 '+escapeHtml(d.meta.title)+'</div>'
    +'<div style="font-size:12.5px;color:var(--sub);line-height:1.6;margin-top:4px">'+escapeHtml(d.meta.sub)+'</div>'
    +p24Tabs(p,'home')
    +'</div>';
  if(d.meta.note)
    h+='<div style="padding:8px 16px 0"><div style="font-size:12px;line-height:1.6;border:1px solid rgba(228,87,46,.4);background:rgba(228,87,46,.08);border-radius:9px;padding:7px 11px;color:#8a3418">⚠️ '+escapeHtml(d.meta.note)+'</div></div>';
  h+='<div class="grid4" style="padding:0 16px">'
    +'<div class="stat"><b>'+d.meta.total+'</b><span>真题</span></div>'
    +'<div class="stat"><b>'+d.meta.full+'</b><span>满分</span></div>'
    +'<div class="stat"><b>'+d.meta.time+'</b><span>限时(分)</span></div>'
    +'<div class="stat"><b>'+(best?Math.round(best.score):'—')+'</b><span>本卷最佳</span></div></div>';
  h+='<div style="padding:0 16px;margin-top:8px"><div style="font-size:12.5px;line-height:1.7;background:rgba(23,163,152,.08);border:1px solid rgba(23,163,152,.3);border-radius:10px;padding:9px 12px">'
    +'<b>🎯 这套怎么刷（看到什么 → 套口诀 → 出答案）：</b><br>'
    +'① 选择/填空<b>点一下即时判</b>，做对攒 🔥连击；<br>'
    +'② 卡住就点 <b>🎵看口诀</b>——直接弹<b>这题对应的那条口诀</b>，不用翻资料（查过几次会记在报告里，查得最多的就是最该背的）；<br>'
    +'③ 大题<b>勾选骨架步骤</b>自评，能写几步写几步，公式分（占 30%）先拿到手；<br>'
    +'④ 交卷看<b>口诀薄弱锚定卡</b>，一键「只刷错题」。</div></div>';
  h+='<div style="padding:12px 16px">'
    +'<button class="btn gold" onclick="paper24Begin()">▶ 开始刷这套真题（'+d.meta.total+' 题 · '+d.meta.full+' 分）</button>'
    +'<button class="btn teal mt10" onclick="paper24Begin(\'lite\')">🍼 轻量起步：只做选择+填空（'+objN+' 题 · '+objS+' 分）</button>';
  if(p.wrong && p.wrong.length)
    h+='<button class="btn mt10" onclick="paper24Begin(\'review\')">🔁 只刷错题（'+p.wrong.length+' 题）</button>';
  h+='<div style="font-size:11.5px;color:var(--sub);margin-top:8px">配套：'
    +'<span class="p24-kjbtn" onclick="p24Go(\'gang\')">📖 先过一遍口诀总纲</span> '
    +'<span class="p24-kjbtn" onclick="p24Go(\'cheat\')">⚡ 一页背诵版</span></div></div>';
  body.innerHTML=h;
}
/* ============================ 口诀总纲 ============================ */
function paper24GangScreen(body,d,p){
  var h='<div style="padding:12px 16px 0">'+p24Tabs(p,'gang')
    +'<div style="font-size:12.5px;color:var(--sub);line-height:1.6;margin-top:6px">'
    +'<b>看到什么 → 套什么。</b>做题时点 🎵 会自动弹出对应条目，这里是全量速查。</div></div>';
  h+='<div style="padding:6px 16px 12px">';
  d.gang.forEach(function(g){
    h+='<div style="margin-top:10px"><div style="font-size:13.5px;font-weight:800;color:#0f3d2e;border-left:4px solid #2c7a5b;padding-left:8px">'
      +escapeHtml(g.title)+'<span style="float:right;font-weight:400;font-size:11px;color:var(--sub)">覆盖 '+escapeHtml(g.scope)+'</span></div>';
    g.items.forEach(function(it){
      h+='<div class="p24-gcard"><h4><span class="bd">'+escapeHtml(it.code+'-'+it.num)+'</span>'+it.name+'</h4>'
        +'<div><span class="p24-f">'+it.formula+'</span></div>'
        +(it.koujue?'<div style="margin-top:4px">🎵 <b style="color:#b3261e">口诀</b>：'+it.koujue+'</div>':'')
        +'</div>';
    });
    h+='</div>';
  });
  h+='<div style="margin-top:12px" class="p24-trap"><b>✂ 选择题快速排错小套路</b><br>'
    +d.traps.map(function(t,i){return (i+1)+'. '+t;}).join('<br>')+'</div>';
  h+='</div>';
  body.innerHTML=h;
}
/* ============================ 一页背诵 ============================ */
function paper24CheatScreen(body,d,p){
  var h='<div style="padding:12px 16px 0">'+p24Tabs(p,'cheat')
    +'<div style="font-size:12.5px;color:var(--sub);margin-top:6px">考前 60 秒过一遍，进考场前最后一眼。</div></div>';
  h+='<div style="padding:10px 16px 12px"><div class="p24-cheat">'
    +'<div style="text-align:center;font-weight:800;color:#0f3d2e;margin-bottom:6px">📝 极简一页背诵版</div>';
  d.cheat.forEach(function(r){
    h+='<div style="padding:3px 0;border-bottom:1px dotted rgba(128,128,128,.3)"><b style="color:#0f3d2e">'+escapeHtml(r[0])+'</b>　'+escapeHtml(r[1])+'</div>';
  });
  h+='</div>';
  h+='<div class="p24-trap" style="margin-top:10px"><b>📌 答案速查</b><br>'
    +d.answers.map(function(a){return a.no+'.'+escapeHtml(a.ans);}).join('　')+'</div>';
  h+='<div style="font-size:12.5px;line-height:1.8;margin-top:10px"><b style="color:#0f3d2e">🎵 大题三步骨架</b><br>'
    +'<b>16</b> 一求导，二找驻点，三列表判正负，四写区间写极值（⚠区间用逗号，别用 ∪；极值写 y 值）<br>'
    +'<b>17</b> 先降幂，再拆开，逐项积，末尾 +C 不能弃<br>'
    +'<b>18</b> 一联立交点，二选积分变量，三右减左，代入上下限相减</div>';
  h+='<div style="padding:12px 0"><button class="btn gold" onclick="paper24Begin()">▶ 看完就练（18 题）</button></div>';
  h+='</div>';
  body.innerHTML=h;
}
/* ============================ 开始考试 ============================ */
function paper24Begin(mode){
  var p=S.paper24||(S.paper24=p24Fresh());
  p.mode='exam'; p.idx=0; p.t0=Date.now(); p.combo=0; p.bubble=null;
  p.lite=(mode==='lite'); p.review = (mode==='review' && p.wrong && p.wrong.length) ? p.wrong.slice() : null;
  p.reviewPos=0;
  renderPaper24();
}
function p24List(d,p){
  if(p.review) return p.review;
  var all=d.paper.map(function(_,i){return i;});
  if(p.lite) return all.filter(function(i){ return d.paper[i].type!=='solve'; });
  return all;
}
/* ============================ 考试页 ============================ */
function paper24Exam(body,d,p){
  var list=p24List(d,p);
  var realIdx = p.review ? list[p.reviewPos] : p.idx;
  var q = d.paper[realIdx];
  var pos = p.review ? (p.reviewPos+1) : (p.idx+1);
  var typeName = q.type==='choice'?'选择题':(q.type==='fill'?'填空题':'解答题');
  var headTag = p.review?' · 只刷错题':(p.lite?' · 轻量起步':'');
  var mate=p24Mate(d);
  var bub = p.bubble ? p.bubble.text : '宝宝来啦～这题我们一起做，卡住就点 🎵 看口诀！';
  var bubCls = p.bubble ? (p.bubble.kind==='ok'?'p24-bub ok':'p24-bub bad') : 'p24-bub';
  var h='';
  h+='<div style="padding:10px 16px 0">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--sub)">'
    +'<span>第 '+pos+' / '+list.length+' 题'+headTag+' · '+typeName+' · '+q.score+'分 · 口诀 '+escapeHtml(q.ref)+'</span>'
    +(p.combo>=2?'<span class="p24-combo">🔥 连击 x'+p.combo+'</span>':'')+'</div>'
    +'<div class="p24-bar"><i style="width:'+Math.round(pos/list.length*100)+'%"></i></div></div>';
  h+='<div style="padding:0 16px"><div class="'+bubCls+'"><img class="p24-av" src="'+(mate?mate.img:'')+'" alt="" onerror="this.style.display=\'none\'">'
    +'<div><b>'+(mate?escapeHtml(mate.name):'老师')+'：</b>'+escapeHtml(bub)+'</div></div></div>';
  h+='<div style="padding:8px 16px 0">'
    +'<div style="font-size:15px;font-weight:700;line-height:1.6">'+q.stem+'</div>'
    +'<div style="margin:8px 0 2px"><span style="display:inline-block;background:rgba(228,87,46,.12);color:#e4572e;font-size:11.5px;padding:3px 9px;border-radius:999px">'
    +escapeHtml(q.name)+'</span></div>';

  if(q.type==='choice'){
    var picked=p.pick[realIdx], rev=p.reveal[realIdx];
    h+='<div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">';
    q.opts.forEach(function(o,i){
      var cls='p24-opt', mark='';
      if(rev){ if(i===q.ans) cls+=' p24-right'; else if(i===picked) cls+=' p24-wrong'; }
      else if(picked===i) cls+=' p24-sel';
      h+='<div class="'+cls+'" onclick="paper24Pick('+realIdx+','+i+')"><b>'+'ABCD'[i]+'.</b> '+escapeHtml(o)+mark+'</div>';
    });
    h+='</div>';
    if(rev) h+='<div class="p24-ex '+(picked===q.ans?'ok':'bad')+'"><b>'+(picked===q.ans?'✅ 对了！':'❌ 再看看')+'</b> 正确答案 <b>'+'ABCD'[q.ans]+'</b>　'
      +'<span style="color:var(--sub)">'+q.detail+'</span></div>';
    if(picked!==undefined && !rev) h+='<div style="margin-top:8px"><button class="btn gold" onclick="paper24Reveal('+realIdx+')">确认作答</button></div>';
  }
  else if(q.type==='fill'){
    var inp=p.input[realIdx]||'', rev2=p.reveal[realIdx];
    h+='<div style="margin-top:8px"><input class="p24-input" id="p24In" value="'+escapeHtml(inp).replace(/"/g,'&quot;')+'" '
      +'placeholder="输入答案（分数可用 1/2，也可写 0.5）" onkeydown="if(event.key===\'Enter\')paper24CheckFill('+realIdx+')" '+(rev2?'disabled':'')+'></div>';
    if(!rev2) h+='<div style="margin-top:8px"><button class="btn gold" onclick="paper24CheckFill('+realIdx+')">确认作答</button></div>';
    else h+='<div class="p24-ex '+(p.selfOK[realIdx]?'ok':'bad')+'"><b>'+(p.selfOK[realIdx]?'✅ 判对了！':'❌ 对一下答案')+'</b> 正确答案 <b>'+escapeHtml(q.ansText)+'</b>　'
      +'<span style="color:var(--sub)">'+q.detail+'</span>'
      +(p.selfOK[realIdx]?'':'<br><span class="p24-kjbtn" onclick="paper24SelfOK('+realIdx+')">其实我写对了，按对算 ✓</span>')+'</div>';
  }
  else {
    var stp=p.steps[realIdx]||{}, rev3=p.reveal[realIdx];
    h+='<div style="margin-top:8px;font-size:12.5px;color:var(--sub)">照骨架写，能写几步点几步（公式分占 30%，别空着）</div>';
    q.steps.forEach(function(s,i){
      var on = stp[i];
      h+='<div class="p24-step'+(on?' p24-on':'')+'" onclick="paper24Step('+realIdx+','+i+')">'+(on?'☑':'☐')+' '+escapeHtml(s)+'</div>';
    });
    if(rev3){
      var sd=Math.round(q.score*((p24StepN(p,realIdx))/q.steps.length));
      h+='<div class="p24-ex '+(sd>=q.score*0.8?'ok':'bad')+'"><b>本节自评 '+sd+'/'+q.score+' 分</b>'
        +'<br><b>参考答案</b>：'+q.detail+'</div>';
    } else {
      h+='<div style="margin-top:8px"><button class="btn gold" onclick="paper24Reveal('+realIdx+')">对照参考答案</button></div>';
    }
  }

  /* 🎵 口诀按钮 —— 这是提速核心 */
  h+='<div style="margin-top:10px"><span class="p24-kjbtn" onclick="paper24Kou('+realIdx+')">🎵 看这题的口诀'+(p.seen[q.ref]?'（已查 '+p.seen[q.ref]+' 次）':'')+'</span>'
    +'<span class="p24-kjbtn" style="margin-left:6px" onclick="p24Go(\'gang\')">📖 全部口诀</span></div>';
  if(p.kouOpen===realIdx){
    h+='<div class="p24-kj">'+p24KouHtml(d,q,true)+'</div>';
  }
  /* 导航 */
  h+='<div style="display:flex;gap:8px;margin:14px 0 4px">'
    +'<button class="btn" style="flex:0 0 auto;width:auto;white-space:nowrap" onclick="paper24Prev()">← 上一题</button>'
    +'<button class="btn gold" style="flex:1" onclick="paper24Next()">'+(pos>=list.length?'交卷看报告 →':'下一题 →')+'</button></div>';
  h+='<div style="font-size:11.5px;color:var(--sub);text-align:center;padding-bottom:14px">'
    +'<span class="p24-kjbtn" onclick="paper24JumpOut()">提前交卷</span></div>';
  h+='</div>';
  body.innerHTML=h;
}
function p24KouHtml(d,q,full){
  var k=(d.kou&&d.kou[q.ref])||null;
  if(!k) return '<div>暂无口诀</div>';
  var known=(p24ST().known||{})[q.ref];
  return '<div style="font-size:13px"><span class="bd" style="display:inline-block;background:#0f3d2e;color:#fff;border-radius:5px;padding:0 6px;margin-right:6px;font-size:11px">'
    +escapeHtml(q.ref)+'</span><b>'+k.name+'</b>'
    +'<div style="margin-top:4px"><span class="p24-f">'+k.formula+'</span></div>'
    +(k.koujue?'<div style="margin-top:4px">🎵 <b style="color:#b3261e">口诀：</b>'+k.koujue+'</div>':'')
    +'<div style="margin-top:6px"><span class="p24-kjbtn" onclick="paper24MarkKnown(\''+q.ref+'\')">'
    +(known?'✅ 已固化进记忆本':'✅ 我记住了')+'</span></div></div>';
}
function paper24Kou(idx){
  var d=p24D(), p=S.paper24; if(!d||!p) return;
  var q=d.paper[idx];
  if(p.kouOpen===idx){ p.kouOpen=null; }
  else { p.kouOpen=idx; p.seen[q.ref]=(p.seen[q.ref]||0)+1; }
  renderPaper24();
}
function paper24MarkKnown(ref){
  var s=p24ST(); s.known[ref]=1;
  if(typeof save==='function') save();
  if(typeof toast==='function') toast('已固化进记忆本 ✅ 以后报告里会显示「已记住」');
  if(typeof addXp==='function') addXp(1);
  renderPaper24();
}
function p24StepN(p,idx){ var o=p.steps[idx]||{}, n=0; for(var k in o){ if(o[k]) n++; } return n; }
function paper24Step(idx,i){
  var p=S.paper24; var o=p.steps[idx]||(p.steps[idx]={});
  o[i]=!o[i]; renderPaper24();
}
function paper24Reveal(idx){
  var p=S.paper24; if(!p) return;
  p.reveal[idx]=true; renderPaper24();
}
function paper24SelfOK(idx){
  var p=S.paper24; if(!p) return;
  p.selfOK[idx]=true; renderPaper24();
}
/* -- 判分（选择即时判 / 填空表达式兼容） -- */
function p24Norm(s){ return String(s==null?'':s).replace(/\s+/g,'')
  .replace(/[＋]/g,'+').replace(/[−–—－]/g,'-').replace(/[（]/g,'(').replace(/[）]/g,')')
  .replace(/[×]/g,'*').replace(/[÷]/g,'/').replace(/[。]/g,'.').toUpperCase(); }
function p24Eval(s){
  try{
    if(typeof s!=='string' || !/^[0-9+\-*/.()]+$/.test(s)) return NaN;
    var r=Function('"use strict";return ('+s+')')();
    return (typeof r==='number' && isFinite(r)) ? r : NaN;
  }catch(e){ return NaN; }
}
function p24FillOK(input,ansText){
  var a=p24Norm(input), b=p24Norm(ansText);
  if(!a) return false;
  if(a===b) return true;
  var ea=p24Eval(a), eb=p24Eval(b);
  if(!isNaN(ea) && !isNaN(eb)) return Math.abs(ea-eb)<0.01;
  return false;
}
function paper24Pick(idx,i){
  var d=p24D(), p=S.paper24; if(!d||!p) return;
  if(p.reveal[idx]) return;
  p.pick[idx]=i; renderPaper24();
}
function paper24CheckFill(idx){
  var d=p24D(), p=S.paper24; if(!d||!p) return;
  var el=document.getElementById('p24In');
  var val=el?el.value:(p.input[idx]||'');
  p.input[idx]=val;
  var q=d.paper[idx];
  var ok=p24FillOK(val,q.ansText);
  p.reveal[idx]=true;
  if(ok) p.selfOK[idx]=true;
  p24Award(p,ok);
  renderPaper24();
}
/* 反馈：连击 + 看板娘气泡（对夸 / 错不打击） */
function p24Award(p,ok){
  if(ok){
    p.combo=(p.combo||0)+1;
    var praise=['太稳了，这题口诀你吃透了！','👍 秒了！就是这么快。','这题你没错，继续保持🔥','漂亮，公式记住了吧～','Bingo！照这个节奏走。'];
    p.bubble={kind:'ok',text:praise[(p.combo-1)%praise.length]+(p.combo>=3?'　🔥 连击 x'+p.combo:'')};
  } else {
    p.combo=0;
    p.bubble={kind:'bad',text:'没关系，这步记不住很正常～点 🎵 看口诀，回头再来一次就记住了。'};
  }
}
function paper24Next(){
  var d=p24D(), p=S.paper24; if(!d||!p) return;
  p.kouOpen=null;
  var list=p24List(d,p);
  if(p.review){
    if(paper24JudgeCur()===false) return;
    if(p.reviewPos>=list.length-1) return paper24Finish();
    p.reviewPos++; p.bubble=null; renderPaper24(); return;
  }
  if(paper24JudgeCur()===false) return;
  if(p.idx>=list.length-1) return paper24Finish();
  p.idx++; p.bubble=null; renderPaper24();
}
/* 未作答就点下一题 → 拦一下（温和提醒，不强制） */
function paper24JudgeCur(){
  var d=p24D(), p=S.paper24; if(!d||!p) return true;
  var list=p24List(d,p);
  var idx = p.review ? list[p.reviewPos] : p.idx;
  var q=d.paper[idx];
  if(q.type==='choice' && p.pick[idx]===undefined){
    p.bubble={kind:'bad',text:'先选一个嘛～不会就凭感觉猜，猜完再点 🎵 看口诀。'}; renderPaper24(); return false;
  }
  if(q.type==='fill' && !p.reveal[idx]){
    var el=document.getElementById('p24In');
    if(el) p.input[idx]=el.value;
    p.bubble={kind:'bad',text:'先把答案填进去再走～对了错了都算练过。'}; renderPaper24(); return false;
  }
  return true;
}
function paper24Prev(){
  var d=p24D(), p=S.paper24; if(!d||!p) return;
  p.kouOpen=null;
  if(p.review){
    if(p.reviewPos>0){ p.reviewPos--; p.bubble=null; renderPaper24(); }
    return;
  }
  if(p.idx>0){ p.idx--; p.bubble=null; renderPaper24(); }
}
function paper24JumpOut(){ var p=S.paper24; if(p) paper24Finish(); }
/* ============================ 报告 ============================ */
function paper24Finish(){
  var d=p24D(), p=S.paper24; if(!d||!p) return;
  var fullScore=true;
  var objGot=0, objFull=0, objRight=0, objN=0;
  var solveGot=0, solveFull=0, solveRight=0, solveN=0;
  var wrong=[];
  d.paper.forEach(function(q,i){
    if(q.type==='choice'){
      objFull+=q.score; objN++;
      var ok=(p.pick[i]!==undefined && p.pick[i]===q.ans);
      if(ok){ objGot+=q.score; objRight++; } else if(p.pick[i]!==undefined) wrong.push(i);
    } else if(q.type==='fill'){
      objFull+=q.score; objN++;
      if(p.selfOK[i]){ objGot+=q.score; objRight++; } else if(p.reveal[i]) wrong.push(i);
    } else {
      solveFull+=q.score; solveN++;
      var sd=Math.min(q.score, Math.round(q.score*(p24StepN(p,i)/q.steps.length)));
      solveGot+=sd;
      if(sd>=q.score*0.8){ solveRight++; } else wrong.push(i);
    }
  });
  p.score=objGot+solveGot;
  p.objRate= objFull? Math.round(objGot/objFull*100):0;
  p.stepRate= solveFull? Math.round(solveGot/solveFull*100):0;
  p.pass = (p.objRate>=85 && p.stepRate>=80);
  p.wrong=wrong.slice();
  p.done=true; p.mode='report';
  var s=p24ST(); s.best=s.best||{};
  var y=p24Year()||'2024';
  if(!s.best[y] || p.score>s.best[y].score) s.best[y]={score:p.score, at:Date.now()};
  s.saves[y]=p;                                  // 该卷进度落盘
  if(typeof save==='function') save();
  if(typeof addXp==='function') addXp(3);
  renderPaper24();
}
function paper24Report(body,d,p){
  var best=p24Best(), s=p24ST();
  /* 口诀薄弱：按查阅次数降序（查得最多 = 最该背） */
  var seen=[];
  for(var k in p.seen){ if(p.seen[k]>0) seen.push([k,p.seen[k]]); }
  seen.sort(function(a,b){ return b[1]-a[1]; });
  var h='<div style="padding:12px 16px 0">'
    +'<div style="font-size:19px;font-weight:800">📊 '+escapeHtml(d.year)+' 年卷报告</div>'
    +'<div style="font-size:12.5px;color:var(--sub);margin-top:4px">满分 '+d.meta.full+' · 得分 <b style="color:#b3261e;font-size:16px">'+p.score+'</b>'
    +'　·　本卷最佳 '+(best?Math.round(best.score):0)+'</div></div>';
  h+='<div class="card" style="margin:10px 16px">'
    +'<div style="font-size:12.5px;line-height:1.9">'
    +'客观题（选择+填空）正确率 <b>'+p.objRate+'%</b>（'+(p24CountObjRight(p,d))+'/'+p24CountObj(p,d)+' 题）'
    +'<div class="p24-bar"><i style="width:'+p.objRate+'%;background:'+(p.objRate>=85?'#1e8a4c':'#e4572e')+'"></i></div>'
    +'大题骨架完整度 <b>'+p.stepRate+'%</b>'
    +'<div class="p24-bar"><i style="width:'+p.stepRate+'%;background:'+(p.stepRate>=80?'#1e8a4c':'#e4572e')+'"></i></div>'
    +'<div style="margin-top:6px">'+(p.pass?'🎉 <b style="color:#1e8a4c">过关！</b>你这套拿下。':'💪 <b>还差一点</b>：客观题≥85% 且 大题≥80% 就算过关，现在差的就是下面这几条口诀。')+'</div>'
    +'</div></div>';
  /* 📿 口诀薄弱锚定卡 */
  h+='<div class="card" style="margin:10px 16px"><div style="font-weight:800">📿 本卷口诀薄弱锚定卡<span style="font-weight:400;font-size:11.5px;color:var(--sub)"> 查得最多 = 最该背</span></div>';
  if(!seen.length){
    h+='<div style="font-size:12.5px;color:var(--sub);margin-top:6px;line-height:1.7">这套卷你一次口诀都没查——说明公式都在脑子里，很强。保持这个状态就好。</div>';
  } else {
    seen.forEach(function(pr){
      var k=(d.kou&&d.kou[pr[0]])||null; if(!k) return;
      var kn=(s.known||{})[pr[0]];
      h+='<div class="p24-gcard"><h4><span class="bd">'+escapeHtml(pr[0])+'</span>'+k.name
        +'<span style="float:right;font-size:11.5px;color:#b3261e">查 '+pr[1]+' 次</span></h4>'
        +'<div><span class="p24-f">'+k.formula+'</span></div>'
        +(k.koujue?'<div style="margin-top:3px">🎵 '+k.koujue+'</div>':'')
        +'<div style="margin-top:4px;font-size:11.5px;color:var(--sub)">'+(kn?'✅ 已标记「我记住了」':'⚠ 还没固化——点下面按钮进记忆本')+'</div></div>';
    });
  }
  h+='</div>';
  /* 🎓 做题方式收获卡 */
  h+='<div class="card" style="margin:10px 16px"><div style="font-weight:800">🎓 本卷做题方式收获卡</div>'
    +'<div style="font-size:12.5px;line-height:1.8;margin-top:6px">'
    +'① <b>选择填空靠口诀</b>：sin□/□取系数、1^∞ 分式 e^(A−B)、原函数求导得 f、拐点二阶=0、奇零偶两倍、k法=−1/k切——这些直接套，别现场推。<br>'
    +'② <b>大题靠骨架</b>：16 四步（导→驻点→列表→结论）、17 降幂→拆→积→+C、18 联立→选变量→右减左。<b>公式分占 30%</b>，写不出结果也要把公式写上。<br>'
    +'③ <b>排错四招</b>：没 +C 排除、拐点只给 x 排除、两斜率乘积必 −1、面积概率 <0 排除。</div></div>';
  /* 错题复练 */
  h+='<div style="padding:0 16px 16px">';
  if(p.wrong.length){
    h+='<button class="btn gold" onclick="paper24Begin(\'review\')">🔁 只刷错题（'+p.wrong.length+' 题）</button>';
  } else {
    h+='<div style="font-size:12.5px;color:#1e8a4c;line-height:1.7">🎉 没有错题，这套你已经拿下！可以点「⚡ 一页背诵」再巩固一遍口诀。</div>';
  }
  h+='<button class="btn mt10" onclick="paper24Begin()">↻ 重刷整套</button>'
    +'<div style="margin-top:8px;font-size:11.5px;color:var(--sub);text-align:center">'
    +'<span class="p24-kjbtn" onclick="p24Go(\'gang\')">📖 回口诀总纲</span></div></div>';
  body.innerHTML=h;
}
function p24CountObj(p,d){ var n=0; d.paper.forEach(function(q){ if(q.type!=='solve') n++; }); return n; }
function p24CountObjRight(p,d){
  var n=0; d.paper.forEach(function(q,i){ if(q.type==='choice'&&p.pick[i]===q.ans) n++; if(q.type==='fill'&&p.selfOK[i]) n++; }); return n;
}
