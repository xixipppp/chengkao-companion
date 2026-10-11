/* 自动生成：_gen_stepscore.py —— 大题步骤分 · 专项突破
 * 数据源：《题库总库.json》高数解答题（切分为步骤卡）
 * 结构：window.STEPSCORE = {meta,frame,templates,myth,discipline,stages,Q}
 * 练习形态：步骤排序题（把打乱的作答步骤排回正确顺序）。
 * 勿手改数据段；逻辑段在 _stepscore_logic.js。
 * ====================================================================== */
window.STEPSCORE = {"meta":{"title":"大题步骤分 · 专项突破","tip":"解答题（大题）按\"踩点/按步给分\"。本模块用 80 道真题的解答步骤做\"排序训练\"，把\"先写什么、再写什么\"练成肌肉记忆——这才是大题抢分的核心技能。","mate":"luo","target":"75%","total_q":80,"src":"高数解答题 · 真题2014—2025 + 2026模拟（共 80 道，含 8/10/15 分大题）"},"frame":[{"n":1,"t":"写「解：」","v":"约 5%","d":"独立成行、写在最左。阅卷按点找，格式对了先有印象分。"},{"n":2,"t":"抄写已知条件","v":"并入第 1 步","d":"「由题意可知，……」把题给条件复述一遍，既是踩点也是给自己理思路。"},{"n":3,"t":"写出核心公式 / 定理","v":"≈ 30%","d":"★最值钱、也最容易被忽略★ 写出该题型要用的公式或定理名称（如\"由洛必达法则得\"）。这一步比\"抄题\"值 6 倍。"},{"n":4,"t":"代入并变形","v":"≈ 30%","d":"把条件代进公式，一步步往下推。哪怕中途卡住，写出来的变形都算数。"},{"n":5,"t":"写结论","v":"≈ 35%","d":"「故……」「答：……」给出结果。答错也保留结论分；实在算不出就写最可能的值。"}],"templates":[{"mod":"极限","id":"g2","name":"求极限大题","steps":["解：","由题意可知，所求极限为题设式（抄写条件并判断型态是否为 0/0 或 ∞/∞）","由等价无穷小替换 / 洛必达法则得（写出所用公式或定理名称）","对分子分母分别求导（或替换）后化简","代入求得极限值为…，故所求极限为…"],"key":"先写\"由洛必达法则得\"或\"由等价无穷小 …～… 得\"，再动笔算。"},{"mod":"导数","id":"g3","name":"导数应用题（单调/极值/凹凸）","steps":["解：","由题意可知，函数为 y = …，定义域为 …","求一阶导数 y′ = …（写出求导公式），令 y′ = 0 解得驻点 x = …","列表判断 y′ 在各区间的符号，得单调区间与极值","再求二阶导数 y″ = …，由 y″ 符号得凹凸区间与拐点，故结论为…"],"key":"导数应用题分两大块（一阶管单调极值、二阶管凹凸拐点），各写各的公式，分开踩点。"},{"mod":"积分","id":"g4","name":"积分计算大题","steps":["解：","由题意可知，所求积分式为 …","令 u = …（换元法）或设 u = …、dv = …（分部积分法），写出所用的积分公式","代入得 ∫ … = …，逐项积分并化简","故原式 = … + C（不定积分务必加常数 C）"],"key":"不定积分最后必须写 +C；换元后上下限要跟着换（定积分）。"},{"mod":"多元函数","id":"g5","name":"多元函数大题","steps":["解：","由题意可知，函数为 z = …","对 x 求偏导时把 y 当常数，得 ∂z/∂x = …；同法得 ∂z/∂y = …（写出全微分 / 偏导公式）","令各偏导为 0 求驻点，代入判别式判断极值（或代入全微分公式）","故所求偏导 / 极值 / 全微分为…"],"key":"口诀\"对谁求导，另一个当常数\"；全微分公式 dz = (∂z/∂x)dx + (∂z/∂y)dy 先写出。"},{"mod":"概率","id":"g5b","name":"概率大题","steps":["解：","由题意可知，设事件 / 随机变量 X 为 …","由古典概型 P = 有利结果数 / 总结果数，或写出分布列 / 期望公式","逐项计算各概率值并列表（或代入期望公式 E(X) = Σ xᵢpᵢ）","故 P(A) = … / E(X) = …"],"key":"概率题\"列式\"比\"算数\"值钱：先把 P = 有利/总数的式子摆出来再算。"}],"myth":[{"t":"「写个解、抄遍题、随便凑个数」能拿几分？","d":"按官方踩点规则：写\"解：\"≈5%、抄题并入第 1 步、结论≈35% 但要\"结果正确\"才算——随便凑的数基本不给分。所以土办法实际只能捡到 **5%~15%**，大题 15 分就拿到 1~2 分。"},{"t":"真正的大头在哪？","d":"**写出核心公式 ≈30%** + **代入变形 ≈30%**，这两块占 60%。而它们恰恰是\"土办法\"完全跳过的。一句话：多写一句\"由 … 公式得\"，比多抄一遍题干值 6 倍。"},{"t":"升级版\"最省力踩点法\"","d":"解：→ 抄一句条件 → **写该题型要用的公式/定理名称** → 能推几步推几步 → 结论写最可能的值。不用全对，把 5 步的\"格子\"填满，大题就能拿到 60%~80% 的步骤分。"},{"t":"底线：绝不空卷","d":"空白 = 0 分；写了\"解：\"和公式就有分。宁愿写错也不留白。"}],"discipline":["大题按\"踩点\"给分，不是按\"对错\"给分——过程写出来才有效。","每题必写\"解：\"并抄一遍已知条件，这是 0 成本的第一步。","★先写公式再算数★：公式分占 30%，是\"土办法\"漏掉的最大一块。","算到卡住就停手，把能写的变形写完，结论写最可能的值。","不定积分记得 +C；换元后定积分上下限要跟着换。"],"stages":[{"id":"g0","icon":"🩺","name":"0 抢分诊断","desc":"6 题 · 看清你会不会\"写过程\"","tip":"大题不是会不会算，而是会不会\"按步写\"。先热身两道，看清自己的作答结构感。","pool":[17,18,19,20,24,25],"pool_n":6},{"id":"g1","icon":"🧱","name":"1 五步骨架","desc":"8 题 · 先立结构再谈计算","tip":"解 → 抄题 → 写公式 → 变形 → 结论。把真实解答的步骤排回正确顺序。","pool":[26,27,32,33,34,35,36,37],"pool_n":8},{"id":"g2","icon":"🎯","name":"2 极限大题","desc":"8 题 · 洛必达 / 等价无穷小","tip":"第一句先写\"由洛必达法则得\"或\"由等价无穷小得\"，公式分先到手再算。","pool":[75,16,21,48,49,60],"pool_n":6},{"id":"g3","icon":"📐","name":"3 导数大题","desc":"10 题 · 单调 / 极值 / 凹凸","tip":"一阶导数管单调与极值、二阶导数管凹凸与拐点，各写各自的公式，分开踩点。","pool":[76,1,4,8,11,12,22,31,39,42],"pool_n":10},{"id":"g4","icon":"∫","name":"4 积分大题","desc":"10 题 · 换元 / 分部 / 定积分","tip":"先写方法（换元令 u=… / 分部设 u、dv），不定积分末尾必带 +C。","pool":[77,0,2,5,9,15,30,40,45,54],"pool_n":10},{"id":"g5","icon":"🧭","name":"5 多元 + 概率","desc":"10 题 · 偏导全微分 / 分布列","tip":"多元\"对谁求导另一个当常数\"；概率先把\"P = 有利/总数\"的式子摆出来。","pool":[78,6,7,13,29,38,41,47,52,59],"pool_n":10},{"id":"g6","icon":"🏆","name":"6 真题实战","desc":"10 题 · 真题大题排序","tip":"全部真题，含 8/10/15 分大题。按考场节拍连排，练出作答肌肉记忆。","pool":[43,46,50,51,57,58,63,64,65,67],"pool_n":10}],"Q":[{"id":"mat26qz1_e16","mod":"积分","q":"求 ∫ 1/(cos²x·√(2+3tanx)) dx","score":15,"paper":"高数2026全真模拟（一）","real":0,"steps":["令 u=2+3tanx","则 du=3sec²x dx=3dx/cos²x","原式=(1/3)∫u^(−1/2)du=(2/3)√u+C=(2/3)√(2+3tanx)+C"],"sol":"令 u=2+3tanx，则 du=3sec²x dx=3dx/cos²x。原式=(1/3)∫u^(−1/2)du=(2/3)√u+C=(2/3)√(2+3tanx)+C。"},{"id":"mat26qz1_e17","mod":"导数","q":"确定函数 y=2x⁴ − 12x² 的单调区间、极值及函数曲线的凹凸性区间和拐点","score":15,"paper":"高数2026全真模拟（一）","real":0,"steps":["y'=8x³−24x=8x(x²−3)","令 y'=0 得 x=0, ±√3","x<−√3 时 y'<0 减","−√3<x<0 时 y'>0 增（x=0 取极大值 0）","0<x<√3 减","x>√3 增（x=±√3 取极小值 2·9−12·3=−18）","y''=24x²−24=24(x²−1)，|x|>1 时 y''>0 凹，|x|<1 时 y''<0 凸，拐点 (±1,−10)"],"sol":"y'=8x³−24x=8x(x²−3)，令 y'=0 得 x=0, ±√3。x<−√3 时 y'<0 减；−√3<x<0 时 y'>0 增（x=0 取极大值 0）；0<x<√3 减；x>√3 增（x=±√3 取极小值 2·9−12·3=−18）。y''=24x²−24=24(x²−1)，|x|>1 时 y''>0 凹，|x|<1 时 y''<0 凸，拐点 (±1,−10)。"},{"id":"mat26qz2_e16","mod":"积分","q":"计算 ∫ 1/√(1−x²)³ dx","score":15,"paper":"高数2026全真模拟（二）","real":0,"steps":["令 x=sint（−π/2<t<π/2），dx=cost dt，√(1−x²)³=cos³t","原式=∫(cost/cos³t)dt=∫sec²t dt=tan t+C=sinx/cosx+C=x/√(1−x²)+C"],"sol":"令 x=sint（−π/2<t<π/2），dx=cost dt，√(1−x²)³=cos³t。原式=∫(cost/cos³t)dt=∫sec²t dt=tan t+C=sinx/cosx+C=x/√(1−x²)+C。"},{"id":"mat26qz5_e16","mod":"概率","q":"某运动员投篮命中率为 0.3，求一次投篮时投中次数的概率分布及分布函数","score":15,"paper":"高数2026全真模拟（五）","real":0,"steps":["设投中次数为 X，X 取值 0、1，服从两点分布：P(X=1)=0.3，P(X=0)=0.7","分布函数 F(x)=P(X≤x)：当 x<0 时 F(x)=0","当 0≤x<1 时 F(x)=P(X=0)=0.7","当 x≥1 时 F(x)=1"],"sol":"设投中次数为 X，X 取值 0、1，服从两点分布：P(X=1)=0.3，P(X=0)=0.7。分布函数 F(x)=P(X≤x)：当 x<0 时 F(x)=0；当 0≤x<1 时 F(x)=P(X=0)=0.7；当 x≥1 时 F(x)=1。"},{"id":"mat26qz5_e17","mod":"导数","q":"求 y=f(x)=2x³−3x²−12x+14 的极值点和极值，以及函数曲线的凹凸区间和拐点","score":15,"paper":"高数2026全真模拟（五）","real":0,"steps":["f'(x)=6x²−6x−12=6(x−2)(x+1)","令 f'=0 得 x=−1、2","f''(x)=12x−6：f''(−1)=−18<0 → x=−1 极大，f(−1)=2(−1)−3(1)−12(−1)+14=21","f''(2)=18>0 → x=2 极小，f(2)=16−12−24+14=−6","f''(x)=12x−6<0 → x<1/2 凸",">0 → x>1/2 凹","拐点 x=1/2，y=2(1/8)−3(1/4)−6+14=17/2"],"sol":"f'(x)=6x²−6x−12=6(x−2)(x+1)，令 f'=0 得 x=−1、2。f''(x)=12x−6：f''(−1)=−18<0 → x=−1 极大，f(−1)=2(−1)−3(1)−12(−1)+14=21；f''(2)=18>0 → x=2 极小，f(2)=16−12−24+14=−6。f''(x)=12x−6<0 → x<1/2 凸；>0 → x>1/2 凹；拐点 x=1/2，y=2(1/8)−3(1/4)−6+14=17/2。"},{"id":"mat26qz5_e18","mod":"积分","q":"求曲线 y = x² 与该曲线在 x = a (a>0) 处的切线与 x 轴所围的平面图形的面积.","score":15,"paper":"高数2026全真模拟（五）","real":0,"steps":["y' = 2x，切线斜率 2a，切点 (a, a²)，切线 y = 2ax − a²，与 x 轴交于 x = a/2","面积 = ∫₀^(a/2) x²dx + ∫_(a/2)^a [x² − (2ax−a²)]dx = a³/24 + a³/24 = a³/12"],"sol":"y' = 2x，切线斜率 2a，切点 (a, a²)，切线 y = 2ax − a²，与 x 轴交于 x = a/2。面积 = ∫₀^(a/2) x²dx + ∫_(a/2)^a [x² − (2ax−a²)]dx = a³/24 + a³/24 = a³/12。"},{"id":"mat26qz6_e17","mod":"多元函数","q":"设 f″ 存在，z = (1/x)f(xy) + yf(x+y)，求 ∂²z/∂x∂y","score":15,"paper":"高数2026全真模拟（六）","real":0,"steps":["记 u=xy、v=x+y","z = (1/x)f(u) + y f(v)","∂z/∂x = −(1/x²)f(u) + (1/x)·y·f′(u) + y·f′(v) = −f(u)/x² + (y/x)f′(u) + yf′(v)","再对 y 求导：∂²z/∂x∂y = −(1/x²)·x·f′(u) + [ (1/x)f′(u) + (y/x)·x·f″(u) ] + [ f′(v) + y·f″(v)·1 ] = −(1/x)f′(u) + (1…"],"sol":"记 u=xy、v=x+y。z = (1/x)f(u) + y f(v)。∂z/∂x = −(1/x²)f(u) + (1/x)·y·f′(u) + y·f′(v) = −f(u)/x² + (y/x)f′(u) + yf′(v)。再对 y 求导：∂²z/∂x∂y = −(1/x²)·x·f′(u) + [ (1/x)f′(u) + (y/x)·x·f″(u) ] + [ f′(v) + y·f″(v)·1 ] = −(1/x)f′(u) + (1/x)f′(u) + y f″(u) + f′(v) + y f″(v) = y f″(xy) + f′(x+y) + y f″(x+y)。"},{"id":"mat26qz6_e18","mod":"多元函数","q":"求由方程 2x²+y²+z²+2xy−2x−2y−4z+4=0 确定的隐函数的全微分","score":15,"paper":"高数2026全真模拟（六）","real":0,"steps":["设 F=2x²+y²+z²+2xy−2x−2y−4z+4","Fₓ=4x+2y−2，F_y=2y+2x−2，F_z=2z−4","∂z/∂x = −Fₓ/F_z = −(4x+2y−2)/(2z−4)，∂z/∂y = −F_y/F_z = −(2x+2y−2)/(2z−4)","故 dz = ∂z/∂x dx + ∂z/∂y dy"],"sol":"设 F=2x²+y²+z²+2xy−2x−2y−4z+4。Fₓ=4x+2y−2，F_y=2y+2x−2，F_z=2z−4。∂z/∂x = −Fₓ/F_z = −(4x+2y−2)/(2z−4)，∂z/∂y = −F_y/F_z = −(2x+2y−2)/(2z−4)。故 dz = ∂z/∂x dx + ∂z/∂y dy。"},{"id":"mat26qz4_e16","mod":"导数","q":"求函数 f(x) = (1/3)x³ − (1/2)x² + 5 的极值","score":15,"paper":"高数2026全真模拟（四）","real":0,"steps":["f'(x)=x²−x=x(x−1)","令 f'=0 得 x=0、1","f''(x)=2x−1：f''(0)=−1<0，x=0 为极大值点，f(0)=5","f''(1)=1>0，x=1 为极小值点，f(1)=1/3−1/2+5=29/6"],"sol":"f'(x)=x²−x=x(x−1)，令 f'=0 得 x=0、1。f''(x)=2x−1：f''(0)=−1<0，x=0 为极大值点，f(0)=5；f''(1)=1>0，x=1 为极小值点，f(1)=1/3−1/2+5=29/6。"},{"id":"mat26qz4_e17","mod":"积分","q":"求曲线 y=√x、直线 x=1 和 x 轴所围成的有界平面图形的面积 S，及该平面图形绕 x 轴旋转一周所得旋转体的体积 V","score":15,"paper":"高数2026全真模拟（四）","real":0,"steps":["S = ∫₀¹√x dx = (2/3)x^(3/2)|₀¹ = 2/3","V = π∫₀¹(√x)²dx = π∫₀¹x dx = π·(1/2) = π/2"],"sol":"S = ∫₀¹√x dx = (2/3)x^(3/2)|₀¹ = 2/3。V = π∫₀¹(√x)²dx = π∫₀¹x dx = π·(1/2) = π/2。"},{"id":"mat26qz4_e18","mod":"概率","q":"从一批有 10 件正品及 2 件次品的产品中，不放回地一件一件地抽取产品。设每个产品被抽到的可能性相同，求直到取出正品为止所需抽取的次数 X 的概率分布。","score":15,"paper":"高数2026全真模拟（四）","real":0,"steps":["X 为首次取到正品时的抽取次数","取值 1,2,3（共 2 件次品","故最多抽 3 次）","P(X=1)=10/12=5/6","P(X=2)=(2/12)(10/11)=5/33","P(X=3)=(2/12)(1/11)(10/10)=1/66","校验 5/6+5/33+1/66=55/66+10/66+1/66=1，成立"],"sol":"X 为首次取到正品时的抽取次数，取值 1,2,3（共 2 件次品，故最多抽 3 次）。P(X=1)=10/12=5/6；P(X=2)=(2/12)(10/11)=5/33；P(X=3)=(2/12)(1/11)(10/10)=1/66。校验 5/6+5/33+1/66=55/66+10/66+1/66=1，成立。"},{"id":"mat26mn_e21","mod":"导数","q":"设 y = (tanx)^(1/x)，求 dy。","score":8,"paper":"高数2026考前模拟","real":0,"steps":["取对数：lny = (1/x)ln(tanx)，两边求导 y′/y = −(1/x²)ln(tanx) + (1/x)·sec²x/tanx","故 dy 如上"],"sol":"取对数：lny = (1/x)ln(tanx)，两边求导 y′/y = −(1/x²)ln(tanx) + (1/x)·sec²x/tanx，故 dy 如上。"},{"id":"mat26mn_e22","mod":"导数","q":"设 x₁ = 1，x₂ = 2 均为 y = alnx + bx² + 3x 的极值点，求 a、b。","score":8,"paper":"高数2026考前模拟","real":0,"steps":["y′ = a/x + 2bx + 3","由 y′(1)=0 得 a+2b+3=0","由 y′(2)=0 得 a/2+4b+3=0","联立解得 a = −2，b = −1/2"],"sol":"y′ = a/x + 2bx + 3。由 y′(1)=0 得 a+2b+3=0；由 y′(2)=0 得 a/2+4b+3=0。联立解得 a = −2，b = −1/2。"},{"id":"mat26mn_e24","mod":"多元函数","q":"设 z = ln(x² − y²)，其中 y = eˣ，求 dz/dx。","score":8,"paper":"高数2026考前模拟","real":0,"steps":["dz/dx = z_x + z_y·y′ = 2x/(x²−y²) + (−2y/(x²−y²))·eˣ","代入 y = eˣ 得 (2x − 2e^(2x))/(x² − e^(2x))"],"sol":"dz/dx = z_x + z_y·y′ = 2x/(x²−y²) + (−2y/(x²−y²))·eˣ。代入 y = eˣ 得 (2x − 2e^(2x))/(x² − e^(2x))。"},{"id":"mat26mn_e25","mod":"概率","q":"某运动员投篮命中率为 0.3，求一次投篮时投中次数的概率分布及分布函数。","score":8,"paper":"高数2026考前模拟","real":0,"steps":["设投中次数为 X，X 取值 0、1","P(X=0) = 1 − 0.3 = 0.7，P(X=1) = 0.3","分布函数如答案"],"sol":"设投中次数为 X，X 取值 0、1。P(X=0) = 1 − 0.3 = 0.7，P(X=1) = 0.3。分布函数如答案。"},{"id":"mat26mn_e26","mod":"积分","q":"设 f(x) 是连续函数，且 f(x) = x + 2∫₀¹ f(t)dt，求 f(x)。","score":10,"paper":"高数2026考前模拟","real":0,"steps":["设 c = ∫₀¹f(t)dt（常数）","则 f(x) = x + 2c","于是 c = ∫₀¹(x+2c)dx = 1/2 + 2c","得 c = −1/2","故 f(x) = x − 1"],"sol":"设 c = ∫₀¹f(t)dt（常数），则 f(x) = x + 2c，于是 c = ∫₀¹(x+2c)dx = 1/2 + 2c，得 c = −1/2，故 f(x) = x − 1。"},{"id":"mat26mn_e28","mod":"极限","q":"试用夹逼定理证明：lim(n→∞) ∫₀¹ xⁿ√(3+x) dx = 0。","score":10,"paper":"高数2026考前模拟","real":0,"steps":["x∈[0,1] 时 √3 ≤ √(3+x) ≤ 2","故 √3·xⁿ ≤ xⁿ√(3+x) ≤ 2xⁿ","积分得 √3/(n+1) ≤ ∫₀¹ xⁿ√(3+x)dx ≤ 2/(n+1)","两端极限均为 0，由夹逼定理得原式 = 0"],"sol":"x∈[0,1] 时 √3 ≤ √(3+x) ≤ 2，故 √3·xⁿ ≤ xⁿ√(3+x) ≤ 2xⁿ。积分得 √3/(n+1) ≤ ∫₀¹ xⁿ√(3+x)dx ≤ 2/(n+1)。两端极限均为 0，由夹逼定理得原式 = 0。"},{"id":"mat25_e16","mod":"多元函数","q":"已知函数 z = x^y（x>0），求 ∂z/∂x、∂z/∂y。","score":15,"paper":"高数2025","real":1,"steps":["对 x 求偏导（y 为常数）：∂z/∂x = y·x^(y−1)","对 y 求偏导（x 为常数）：∂z/∂y = x^y·lnx"],"sol":"对 x 求偏导（y 为常数）：∂z/∂x = y·x^(y−1)；对 y 求偏导（x 为常数）：∂z/∂y = x^y·lnx。"},{"id":"mat24_e16","mod":"导数","q":"求函数 f(x) = x²(x−1)² 的单调区间和极值。","score":15,"paper":"高数2024","real":1,"steps":["f(x) = x⁴ − 2x³ + x²，f′(x) = 4x³ − 6x² + 2x = 2x(2x−1)(x−1)","令 f′(x)=0 得驻点 x=0、1/2、1","列表分析符号：递增区间 (0,1/2)、(1,+∞)，递减区间 (−∞,0)、(1/2,1)","极大值 f(1/2)=1/16，极小值 f(0)=f(1)=0"],"sol":"f(x) = x⁴ − 2x³ + x²，f′(x) = 4x³ − 6x² + 2x = 2x(2x−1)(x−1)。令 f′(x)=0 得驻点 x=0、1/2、1。列表分析符号：递增区间 (0,1/2)、(1,+∞)，递减区间 (−∞,0)、(1/2,1)；极大值 f(1/2)=1/16，极小值 f(0)=f(1)=0。"},{"id":"mat24_e17","mod":"积分","q":"计算 ∫ sin²x dx。","score":15,"paper":"高数2024","real":1,"steps":["sin²x = (1−cos2x)/2","故 ∫sin²x dx = (1/2)∫dx − (1/2)∫cos2x dx = (1/2)x − (1/4)sin2x + C"],"sol":"sin²x = (1−cos2x)/2，故 ∫sin²x dx = (1/2)∫dx − (1/2)∫cos2x dx = (1/2)x − (1/4)sin2x + C。"},{"id":"mat24_e18","mod":"积分","q":"求由抛物线 y² = 2x 和直线 x + y − 4 = 0 所围成的图形的面积。","score":15,"paper":"高数2024","real":1,"steps":["联立 y²=2x 与 x+y−4=0（x=4−y）得 y²=8−2y","即 y²+2y−8=0，交点 (2,2)、(8,−4)","取 y 为积分变量：S = ∫₋₄²(4 − y − y²/2)dy = (4y − y²/2 − y³/6)|₋₄² = 18"],"sol":"联立 y²=2x 与 x+y−4=0（x=4−y）得 y²=8−2y，即 y²+2y−8=0，交点 (2,2)、(8,−4)。取 y 为积分变量：S = ∫₋₄²(4 − y − y²/2)dy = (4y − y²/2 − y³/6)|₋₄² = 18。"},{"id":"mat23_e21","mod":"极限","q":"计算 lim(x→0)(1 − cosx)/x²。","score":8,"paper":"高数2023","real":1,"steps":["1 − cosx ~ x²/2","故原式 = lim(x²/2)/x² = 1/2"],"sol":"1 − cosx ~ x²/2，故原式 = lim(x²/2)/x² = 1/2。"},{"id":"mat23_e22","mod":"导数","q":"设 y = ln(x + √(x²+1))，求 dy。","score":8,"paper":"高数2023","real":1,"steps":["y′ = [1 + x/√(x²+1)]/(x+√(x²+1)) = 1/√(x²+1)","故 dy = dx/√(x²+1)"],"sol":"y′ = [1 + x/√(x²+1)]/(x+√(x²+1)) = 1/√(x²+1)，故 dy = dx/√(x²+1)。"},{"id":"mat23_e25","mod":"概率","q":"盒中有 5 个球，其中 3 个白球、2 个黑球，从中随机一次抽取 3 个球，用 X 表示抽取到的白球的个数。(1) 求随机变量 X 的概率分布；(2) 求 X 的数学期望 E(X)。","score":8,"paper":"高数2023","real":1,"steps":["(1) P(X=1)=C(3,1)C(2,2)/C(5,3)=3/10，P(X=2)=C(3,2)C(2,1)/10=3/5，P(X=3)=C(3,3)/10=1/10","(2) E(X)=1×0.3+2×0.6+3×0.1=1.8"],"sol":"(1) P(X=1)=C(3,1)C(2,2)/C(5,3)=3/10，P(X=2)=C(3,2)C(2,1)/10=3/5，P(X=3)=C(3,3)/10=1/10。(2) E(X)=1×0.3+2×0.6+3×0.1=1.8。"},{"id":"mat23_e26","mod":"导数","q":"要做一个容积为 V 立方米的密闭圆柱形容器，两底面材料的价格为每平方米 a 元，侧面材料的价格为每平方米 b 元，问圆柱形容器的底面半径与高的比等于多少时，造价最低？","score":10,"paper":"高数2023","real":1,"steps":["设底面半径 r、高 h，πr²h = V","造价 L = 2πar² + 2πbrh = 2πar² + 2bV/r","令 L′ = 4πar − 2bV/r² = 0 得 2πar³ = bV","又 2πar³ = br²h","得 r/h = b/(2a)","即 r : h = b : 2a"],"sol":"设底面半径 r、高 h，πr²h = V。造价 L = 2πar² + 2πbrh = 2πar² + 2bV/r。令 L′ = 4πar − 2bV/r² = 0 得 2πar³ = bV；又 2πar³ = br²h，得 r/h = b/(2a)，即 r : h = b : 2a。"},{"id":"mat23_e27","mod":"导数","q":"证明：当 x ≥ 0 时，ln(1+x) ≥ x − x²/2。","score":10,"paper":"高数2023","real":1,"steps":["设 f(x) = ln(1+x) − x + x²/2","则 f′(x) = 1/(1+x) − 1 + x = x²/(1+x) ≥ 0（x≥0）","故 f 在 [0,+∞) 单调递增","又 f(0)=0","所以 x≥0 时 f(x)≥0","即 ln(1+x) ≥ x − x²/2"],"sol":"设 f(x) = ln(1+x) − x + x²/2，则 f′(x) = 1/(1+x) − 1 + x = x²/(1+x) ≥ 0（x≥0）。故 f 在 [0,+∞) 单调递增，又 f(0)=0，所以 x≥0 时 f(x)≥0，即 ln(1+x) ≥ x − x²/2。"},{"id":"mat23_e28","mod":"多元函数","q":"设函数 f(x,y) = (1/2)(xⁿ + yⁿ)，n 为大于 1 的整数。求在条件 x + y = c 下 f(x,y) 的最小值，其中 x>0，y>0，c 为正常数。","score":10,"paper":"高数2023","real":1,"steps":["构造 L(x,y,λ) = (1/2)(xⁿ+yⁿ) + λ(x+y−c)","由 L_x = (n/2)x^(n−1) + λ = 0、L_y = (n/2)y^(n−1) + λ = 0 得 x = y = c/2","代入得最小值 = (1/2)[(c/2)ⁿ + (c/2)ⁿ] = (c/2)ⁿ"],"sol":"构造 L(x,y,λ) = (1/2)(xⁿ+yⁿ) + λ(x+y−c)。由 L_x = (n/2)x^(n−1) + λ = 0、L_y = (n/2)y^(n−1) + λ = 0 得 x = y = c/2。代入得最小值 = (1/2)[(c/2)ⁿ + (c/2)ⁿ] = (c/2)ⁿ。"},{"id":"mat22_e21","mod":"极限","q":"设函数 f(x) = { sinax/x, x<0 ; x+2, x≥0 } 在 x=0 处连续，求 a。","score":8,"paper":"高数2022","real":1,"steps":["f(0) = 2","lim(x→0⁻) sinax/x = a","连续要求 a = 2"],"sol":"f(0) = 2；lim(x→0⁻) sinax/x = a。连续要求 a = 2。"},{"id":"mat22_e25","mod":"概率","q":"设离散型随机变量 X 的概率分布为 X:0,1,2 / P:0.3,0.5,0.2。(1) 求 X 的分布函数 F(x)；(2) 求 E(X)。","score":8,"paper":"高数2022","real":1,"steps":["(1) 由分布函数定义累加得 F(x) 如上","(2) E(X) = 0×0.3 + 1×0.5 + 2×0.2 = 0.9"],"sol":"(1) 由分布函数定义累加得 F(x) 如上。(2) E(X) = 0×0.3 + 1×0.5 + 2×0.2 = 0.9。"},{"id":"mat22_e26","mod":"多元函数","q":"设 z = z(x,y) 是由方程 2y² + 2xz + z² = 1 所确定的隐函数，求 ∂z/∂x、∂z/∂y。","score":10,"paper":"高数2022","real":1,"steps":["两边对 x 求偏导：2z + 2x·z_x + 2z·z_x = 0 → z_x = −z/(x+z)","对 y 求偏导：4y + 2x·z_y + 2z·z_y = 0 → z_y = −2y/(x+z)"],"sol":"两边对 x 求偏导：2z + 2x·z_x + 2z·z_x = 0 → z_x = −z/(x+z)；对 y 求偏导：4y + 2x·z_y + 2z·z_y = 0 → z_y = −2y/(x+z)。"},{"id":"mat22_e27","mod":"积分","q":"设 D 为由曲线 y = x²、y = 0、x = 2 所围成的图形。(1) 求 D 的面积；(2) 求 D 绕 x 轴旋转一周所得旋转体的体积。","score":10,"paper":"高数2022","real":1,"steps":["(1) S = ∫₀²x²dx = x³/3|₀² = 8/3","(2) V = π∫₀²(x²)²dx = π·x⁵/5|₀² = 32π/5"],"sol":"(1) S = ∫₀²x²dx = x³/3|₀² = 8/3。(2) V = π∫₀²(x²)²dx = π·x⁵/5|₀² = 32π/5。"},{"id":"mat22_e28","mod":"导数","q":"证明：当 x > 1 时，lnx < x − 1。","score":10,"paper":"高数2022","real":1,"steps":["设 f(x) = x − 1 − lnx","则 f′(x) = 1 − 1/x","当 x>1 时 f′(x)>0，f 在 (1,+∞) 单调递增","又 f(1)=0","故 x>1 时 f(x)>0","即 x−1−lnx>0，lnx < x−1"],"sol":"设 f(x) = x − 1 − lnx，则 f′(x) = 1 − 1/x。当 x>1 时 f′(x)>0，f 在 (1,+∞) 单调递增；又 f(1)=0，故 x>1 时 f(x)>0，即 x−1−lnx>0，lnx < x−1。"},{"id":"mat21_e22","mod":"导数","q":"求函数 f(x) = e^(−x²) 的单调区间和极值。","score":8,"paper":"高数2021","real":1,"steps":["定义域 (−∞,+∞)，f′(x) = −2xe^(−x²)","令 f′(x)=0 得 x=0","x<0 时 f′>0 递增，x>0 时 f′<0 递减","故极大值 f(0) = 1"],"sol":"定义域 (−∞,+∞)，f′(x) = −2xe^(−x²)。令 f′(x)=0 得 x=0。x<0 时 f′>0 递增，x>0 时 f′<0 递减，故极大值 f(0) = 1。"},{"id":"mat21_e23","mod":"积分","q":"求 ∫(2arcsinx + 1)dx。","score":8,"paper":"高数2021","real":1,"steps":["∫2arcsinx dx = 2xarcsinx − 2∫x/√(1−x²)dx = 2xarcsinx + 2√(1−x²)","再加 ∫1dx = x","得原式 = 2xarcsinx + 2√(1−x²) + x + C"],"sol":"∫2arcsinx dx = 2xarcsinx − 2∫x/√(1−x²)dx = 2xarcsinx + 2√(1−x²)，再加 ∫1dx = x，得原式 = 2xarcsinx + 2√(1−x²) + x + C。"},{"id":"mat21_e24","mod":"积分","q":"计算 ∫₁⁴ dx/(x + √x)。","score":8,"paper":"高数2021","real":1,"steps":["令 t = √x，x = t²，dx = 2t dt","x=1→t=1，x=4→t=2","原式 = ∫₁² 2t/(t²+t)dt = ∫₁² 2/(t+1)dt = 2ln(t+1)|₁² = 2ln(3/2)"],"sol":"令 t = √x，x = t²，dx = 2t dt；x=1→t=1，x=4→t=2。原式 = ∫₁² 2t/(t²+t)dt = ∫₁² 2/(t+1)dt = 2ln(t+1)|₁² = 2ln(3/2)。"},{"id":"mat21_e25","mod":"概率","q":"设离散型随机变量 X 的概率分布为 X:0,1,2,3 / P:a,3a,4a,2a，其中 a 为常数。(1) 求 a；(2) 求 E(X)。","score":8,"paper":"高数2021","real":1,"steps":["(1) a+3a+4a+2a = 10a = 1","故 a = 0.1","(2) E(X) = 0×0.1 + 1×0.3 + 2×0.4 + 3×0.2 = 1.7"],"sol":"(1) a+3a+4a+2a = 10a = 1，故 a = 0.1。(2) E(X) = 0×0.1 + 1×0.3 + 2×0.4 + 3×0.2 = 1.7。"},{"id":"mat21_e26","mod":"导数","q":"设 y = y(x) 是由方程 eʸ = x² + y 所确定的隐函数，求 dy/dx。","score":10,"paper":"高数2021","real":1,"steps":["两边对 x 求导：eʸ·(dy/dx) = 2x + dy/dx","故 (eʸ−1)dy/dx = 2x","即 dy/dx = 2x/(eʸ−1)"],"sol":"两边对 x 求导：eʸ·(dy/dx) = 2x + dy/dx，故 (eʸ−1)dy/dx = 2x，即 dy/dx = 2x/(eʸ−1)。"},{"id":"mat21_e27","mod":"积分","q":"设 D 为由直线 x + y − 4 = 0 与曲线 y = 3/x 所围成的闭区域。(1) 求 D 的面积；(2) 求 D 绕 x 轴旋转一周所得旋转体的体积。","score":10,"paper":"高数2021","real":1,"steps":["由 x+y−4=0 与 y=3/x 解得交点 (1,3)、(3,1)","(1) S = ∫₁³(4 − x − 3/x)dx = (4x − x²/2 − 3lnx)|₁³ = 4 − 3ln3","(2) V = π∫₁³[(4−x)² − (3/x)²]dx = π[−(1/3)(4−x)³ + 9/x]|₁³ = 8π/3"],"sol":"由 x+y−4=0 与 y=3/x 解得交点 (1,3)、(3,1)。(1) S = ∫₁³(4 − x − 3/x)dx = (4x − x²/2 − 3lnx)|₁³ = 4 − 3ln3。(2) V = π∫₁³[(4−x)² − (3/x)²]dx = π[−(1/3)(4−x)³ + 9/x]|₁³ = 8π/3。"},{"id":"mat21_e28","mod":"多元函数","q":"求函数 f(x,y) = x² + y² 在条件 x² + y² − xy − 1 = 0 下的最大值和最小值。","score":10,"paper":"高数2021","real":1,"steps":["构造 F = x²+y²+λ(x²+y²−xy−1)","由 ∂F/∂x = 2x+λ(2x−y)=0、∂F/∂y = 2y+λ(2y−x)=0 得 x=y 或 x=−y","代入约束得可能极值点 (1,1)、(−1,−1)、(√3/3,−√3/3)、(−√3/3,√3/3)","f(1,1)=f(−1,−1)=2，f(√3/3,−√3/3)=f(−√3/3,√3/3)=2/3","故最大值 2，最小值 2/3"],"sol":"构造 F = x²+y²+λ(x²+y²−xy−1)。由 ∂F/∂x = 2x+λ(2x−y)=0、∂F/∂y = 2y+λ(2y−x)=0 得 x=y 或 x=−y；代入约束得可能极值点 (1,1)、(−1,−1)、(√3/3,−√3/3)、(−√3/3,√3/3)。f(1,1)=f(−1,−1)=2，f(√3/3,−√3/3)=f(−√3/3,√3/3)=2/3。故最大值 2，最小值 2/3。"},{"id":"mat20_e23","mod":"导数","q":"已知函数 f(x) = eˣ cosx，求 f″(π/2)。","score":8,"paper":"高数2020","real":1,"steps":["f′(x)=eˣcosx+eˣ(−sinx)=eˣ(cosx−sinx)","f″(x)=eˣ(cosx−sinx)+eˣ(−sinx−cosx)=−2eˣsinx","故 f″(π/2) = −2e^(π/2)"],"sol":"f′(x)=eˣcosx+eˣ(−sinx)=eˣ(cosx−sinx)；f″(x)=eˣ(cosx−sinx)+eˣ(−sinx−cosx)=−2eˣsinx，故 f″(π/2) = −2e^(π/2)。"},{"id":"mat20_e25","mod":"积分","q":"设 D 为由曲线 y = √x、直线 x = 4 及 x 轴围成的有界区域，求 D 绕 y 轴旋转一周所得旋转体的体积。","score":8,"paper":"高数2020","real":1,"steps":["D：0≤y≤2，y²≤x≤4","V = π·4²·2 − π∫₀²x²dy = 32π − π∫₀²y⁴dy = 32π − (π/5)y⁵|₀² = 32π − 32π/5 = 128π/5"],"sol":"D：0≤y≤2，y²≤x≤4。V = π·4²·2 − π∫₀²x²dy = 32π − π∫₀²y⁴dy = 32π − (π/5)y⁵|₀² = 32π − 32π/5 = 128π/5。"},{"id":"mat20_e26","mod":"多元函数","q":"求函数 z = x² + 2y⁴ + 4xy² − 2x 的极值。","score":10,"paper":"高数2020","real":1,"steps":["z_x=2x+4y²−2=0，z_y=8y³+8xy=8y(y²+x)=0","得驻点 (1,0)、(−1,1)、(−1,−1)","A=z_xx=2，B=z_xy=8y，C=z_yy=24y²+8x","在 (1,0)：A=2,B=0,C=8，B²−AC=−16<0 且 A>0","取得极小值 z(1,0)=1−2=−1","另两点 B²−AC=32>0，非极值"],"sol":"z_x=2x+4y²−2=0，z_y=8y³+8xy=8y(y²+x)=0，得驻点 (1,0)、(−1,1)、(−1,−1)。A=z_xx=2，B=z_xy=8y，C=z_yy=24y²+8x。在 (1,0)：A=2,B=0,C=8，B²−AC=−16<0 且 A>0，取得极小值 z(1,0)=1−2=−1；另两点 B²−AC=32>0，非极值。"},{"id":"mat20_e27","mod":"导数","q":"求曲线 y = x³ − 3x² + 2x + 1 的凹凸区间与拐点。","score":10,"paper":"高数2020","real":1,"steps":["y′=3x²−6x+2，y″=6x−6","令 y″=0 得 x=1","x<1 时 y″<0，(−∞,1) 为凸区间","x>1 时 y″>0，(1,+∞) 为凹区间","拐点为 (1,1)"],"sol":"y′=3x²−6x+2，y″=6x−6。令 y″=0 得 x=1。x<1 时 y″<0，(−∞,1) 为凸区间；x>1 时 y″>0，(1,+∞) 为凹区间；拐点为 (1,1)。"},{"id":"mat20_e28","mod":"概率","q":"已知离散型随机变量 X 的概率分布为 X:−1,0,2 / P:a,0.5,b，且 E(X) = 0。(1) 求 a,b；(2) 求 E[X(X+1)]。","score":10,"paper":"高数2020","real":1,"steps":["(1) 由概率性质 a+0.5+b=1","又 E(X)=−1·a+0·0.5+2·b=0，联立得 a=1/3，b=1/6","(2) E[X(X+1)]=E(X²)+E(X)=E(X²)=1·(1/3)+0+4·(1/6)=1/3+2/3=1"],"sol":"(1) 由概率性质 a+0.5+b=1，又 E(X)=−1·a+0·0.5+2·b=0，联立得 a=1/3，b=1/6。(2) E[X(X+1)]=E(X²)+E(X)=E(X²)=1·(1/3)+0+4·(1/6)=1/3+2/3=1。"},{"id":"mat19_e22","mod":"导数","q":"设函数 f(x) = x/(1+x²)，求 f″(x)。","score":8,"paper":"高数2019","real":1,"steps":["f′(x)=(1−x²)/(1+x²)²","再求导得 f″(x)=2x(x²−3)/(1+x²)³"],"sol":"f′(x)=(1−x²)/(1+x²)²，再求导得 f″(x)=2x(x²−3)/(1+x²)³。"},{"id":"mat19_e24","mod":"积分","q":"计算 ∫_e^(+∞) 1/(x·ln³x)dx","score":8,"paper":"高数2019","real":1,"steps":["令 u=lnx，∫u^(−3)du = −1/(2u²)","原式 = [−1/(2ln²x)]_e^(+∞) = 0 − (−1/2) = 1/2"],"sol":"令 u=lnx，∫u^(−3)du = −1/(2u²)。原式 = [−1/(2ln²x)]_e^(+∞) = 0 − (−1/2) = 1/2。"},{"id":"mat19_e26","mod":"导数","q":"设函数 f(x)=ax³+bx²+cx 在 x=2 处取得极值，点 (1,−1) 为曲线 y=f(x) 的拐点，求 a、b、c。","score":10,"paper":"高数2019","real":1,"steps":["f′(x)=3ax²+2bx+c，f″(x)=6ax+2b","由 f′(2)=0 得 12a+4b+c=0","由拐点得 f″(1)=0 即 6a+2b=0","由 f(1)=−1 得 a+b+c=−1","解得 a=1/2, b=−3/2, c=0"],"sol":"f′(x)=3ax²+2bx+c，f″(x)=6ax+2b。由 f′(2)=0 得 12a+4b+c=0；由拐点得 f″(1)=0 即 6a+2b=0；由 f(1)=−1 得 a+b+c=−1。解得 a=1/2, b=−3/2, c=0。"},{"id":"mat19_e28","mod":"多元函数","q":"设函数 z = 1/x − 1/y，证明：x²·∂z/∂x + y²·∂z/∂y = 0。","score":10,"paper":"高数2019","real":1,"steps":["∂z/∂x=−1/x²，∂z/∂y=1/y²","故 x²·(−1/x²)+y²·(1/y²)=−1+1=0，证毕"],"sol":"∂z/∂x=−1/x²，∂z/∂y=1/y²，故 x²·(−1/x²)+y²·(1/y²)=−1+1=0，证毕。"},{"id":"mat18_e21","mod":"极限","q":"设函数 f(x) = { 3sin x / x, x<0 ; 3x+a, x≥0 } 在 x=0 处连续，求 a。","score":8,"paper":"高数2018","real":1,"steps":["lim(x→0⁻)3sinx/x = 3","lim(x→0⁺)(3x+a) = a","f(0)=a","连续要求 a=3"],"sol":"lim(x→0⁻)3sinx/x = 3；lim(x→0⁺)(3x+a) = a；f(0)=a。连续要求 a=3。"},{"id":"mat18_e22","mod":"极限","q":"求 lim(x→1) (3x³−2x²−1)/sin(x²−1)","score":8,"paper":"高数2018","real":1,"steps":["0/0 型，等价无穷小 sin(x²−1) ~ x²−1","原式 = lim(3x³−2x²−1)/(x²−1) = lim(3x²+x+1)/(x+1) = 5/2"],"sol":"0/0 型，等价无穷小 sin(x²−1) ~ x²−1。原式 = lim(3x³−2x²−1)/(x²−1) = lim(3x²+x+1)/(x+1) = 5/2。"},{"id":"mat18_e26","mod":"导数","q":"求函数 f(x) = (1/3)x³ − (1/2)x² + 5 的极值。","score":10,"paper":"高数2018","real":1,"steps":["f′(x)=x²−x=x(x−1)，零点 x=0,1","f″=2x−1：f″(0)=−1<0 取极大值 f(0)=5","f″(1)=1>0 取极小值 f(1)=1/3−1/2+5=29/6"],"sol":"f′(x)=x²−x=x(x−1)，零点 x=0,1。f″=2x−1：f″(0)=−1<0 取极大值 f(0)=5；f″(1)=1>0 取极小值 f(1)=1/3−1/2+5=29/6。"},{"id":"mat18_e27","mod":"概率","q":"盒中有 5 个产品，其中恰有 3 个合格品，从盒子中任取 2 个，记 X 为取出的合格品个数。求 (1) X 的概率分布；(2) EX。","score":10,"paper":"高数2018","real":1,"steps":["P(X=0)=C(2,2)/C(5,2)=1/10","P(X=1)=C(3,1)C(2,1)/C(5,2)=3/5","P(X=2)=C(3,2)/C(5,2)=3/10","EX=0×1/10+1×3/5+2×3/10=6/5"],"sol":"P(X=0)=C(2,2)/C(5,2)=1/10；P(X=1)=C(3,1)C(2,1)/C(5,2)=3/5；P(X=2)=C(3,2)/C(5,2)=3/10。EX=0×1/10+1×3/5+2×3/10=6/5。"},{"id":"mat18_e28","mod":"多元函数","q":"求函数 f(x,y)=x³+y³ 在条件 x²+2y²=1 下的最值。","score":10,"paper":"高数2018","real":1,"steps":["拉格朗日函数 L=x³+y³+λ(x²+2y²−1)","Lₓ=3x²+2λx=0, L_y=3y²+4λy=0, L_λ=x²+2y²−1=0，解得驻点 (−1/3,−2/3) 与 (1/3,2/3)，f 分别取 −1/3 与 1/3"],"sol":"拉格朗日函数 L=x³+y³+λ(x²+2y²−1)。Lₓ=3x²+2λx=0, L_y=3y²+4λy=0, L_λ=x²+2y²−1=0，解得驻点 (−1/3,−2/3) 与 (1/3,2/3)，f 分别取 −1/3 与 1/3。"},{"id":"mat17_e22","mod":"导数","q":"已知函数 f(x) = cos(2x+1)，求 f‴(0)。","score":8,"paper":"高数2017","real":1,"steps":["f′=−2sin(2x+1)，f″=−4cos(2x+1)，f‴=8sin(2x+1)","故 f‴(0)=8sin1"],"sol":"f′=−2sin(2x+1)，f″=−4cos(2x+1)，f‴=8sin(2x+1)，故 f‴(0)=8sin1。"},{"id":"mat17_e23","mod":"积分","q":"计算 ∫ dx/(3(1+∛x))","score":8,"paper":"高数2017","real":1,"steps":["令 ∛x=t，x=t³，dx=3t²dt","原式 = ∫t²/(1+t)dt = ∫(t−1)dt+∫dt/(1+t) = t²/2 − t + ln(1+t)，回代 t=∛x"],"sol":"令 ∛x=t，x=t³，dx=3t²dt。原式 = ∫t²/(1+t)dt = ∫(t−1)dt+∫dt/(1+t) = t²/2 − t + ln(1+t)，回代 t=∛x。"},{"id":"mat17_e24","mod":"积分","q":"计算 ∫₀¹ x·arctan x dx","score":8,"paper":"高数2017","real":1,"steps":["分部积分：∫x arctanx dx = (x²/2)arctanx − (1/2)∫x²/(1+x²)dx = (x²/2)arctanx − (1/2)(x − arctanx)","代入 0→1 得 (1/2)(π/4)−(1/2)(1−π/4) = π/4 − 1/2"],"sol":"分部积分：∫x arctanx dx = (x²/2)arctanx − (1/2)∫x²/(1+x²)dx = (x²/2)arctanx − (1/2)(x − arctanx)。代入 0→1 得 (1/2)(π/4)−(1/2)(1−π/4) = π/4 − 1/2。"},{"id":"mat17_e25","mod":"概率","q":"设离散型随机变量 X 的概率分布为 X:0,1,2 / P:0.3,0.4,0.3。求 X 的数学期望 EX 及方差 DX。","score":8,"paper":"高数2017","real":1,"steps":["EX=0×0.3+1×0.4+2×0.3=1","E(X²)=0+0.4+4×0.3=1.6，DX=E(X²)−(EX)²=1.6−1=0.6"],"sol":"EX=0×0.3+1×0.4+2×0.3=1。E(X²)=0+0.4+4×0.3=1.6，DX=E(X²)−(EX)²=1.6−1=0.6。"},{"id":"mat17_e26","mod":"导数","q":"已知函数 f(x) = x⁴ − 4x + 1。(1) 求 f(x) 的单调区间和极值；(2) 求曲线 y=f(x) 的凹凸区间。","score":10,"paper":"高数2017","real":1,"steps":["f′(x)=4x³−4=4(x³−1)，x<1 时 f′<0 减，x>1 时 f′>0 增，x=1 取极小值 f(1)=−2","f″(x)=12x²≥0，故曲线在整个定义域上凹"],"sol":"f′(x)=4x³−4=4(x³−1)，x<1 时 f′<0 减，x>1 时 f′>0 增，x=1 取极小值 f(1)=−2。f″(x)=12x²≥0，故曲线在整个定义域上凹。"},{"id":"mat17_e27","mod":"积分","q":"记曲线 y=x²/2+1/2 与直线 y=2 所围成的平面图形为 D。(1) 求 D 的面积 S；(2) 求 D 绕 y 轴旋转一周所得旋转体的体积 V。","score":10,"paper":"高数2017","real":1,"steps":["交点 x=±√3","(1) S=2∫₀^(√3)[2−(x²/2+1/2)]dx=2∫₀^(√3)(3/2−x²/2)dx=2√3","(2) 绕 y 轴：x²=2y−1，V=π∫_(1/2)²(2y−1)dy=9π/4"],"sol":"交点 x=±√3。(1) S=2∫₀^(√3)[2−(x²/2+1/2)]dx=2∫₀^(√3)(3/2−x²/2)dx=2√3。(2) 绕 y 轴：x²=2y−1，V=π∫_(1/2)²(2y−1)dy=9π/4。"},{"id":"mat17_e28","mod":"多元函数","q":"设 z=u/v，其中 u=xʸ，v=x+y，求 ∂z/∂x、∂z/∂y。","score":10,"paper":"高数2017","real":1,"steps":["∂z/∂x=(∂z/∂u)(∂u/∂x)+(∂z/∂v)(∂v/∂x)=(1/v)·y·x^(y−1)+(−u/v²)·1，通分得 [y x^(y−1)(x+y)−xʸ]/(x+y)²","同理 ∂z/∂y=[xʸ lnx (x+y)−xʸ]/(x+y)²"],"sol":"∂z/∂x=(∂z/∂u)(∂u/∂x)+(∂z/∂v)(∂v/∂x)=(1/v)·y·x^(y−1)+(−u/v²)·1，通分得 [y x^(y−1)(x+y)−xʸ]/(x+y)²；同理 ∂z/∂y=[xʸ lnx (x+y)−xʸ]/(x+y)²。"},{"id":"mat16_e21","mod":"极限","q":"计算 lim(x→1) (x²+x−2)/(x−1)","score":8,"paper":"高数2016","real":1,"steps":["0/0 型，洛必达：lim(2x+1)/1 = 3","或分解因式 (x+2)(x−1)/(x−1) = x+2 → 3"],"sol":"0/0 型，洛必达：lim(2x+1)/1 = 3；或分解因式 (x+2)(x−1)/(x−1) = x+2 → 3。"},{"id":"mat16_e23","mod":"多元函数","q":"设函数 z = x³y + xy³，求 ∂²z/∂x²、∂²z/∂x∂y。","score":8,"paper":"高数2016","real":1,"steps":["∂z/∂x = 3x²y + y³","故 ∂²z/∂x² = 6xy，∂²z/∂x∂y = 3x² + 3y²"],"sol":"∂z/∂x = 3x²y + y³，故 ∂²z/∂x² = 6xy，∂²z/∂x∂y = 3x² + 3y²。"},{"id":"mat16_e25","mod":"积分","q":"计算 ∫₁^(√e) 2x·ln x dx","score":8,"paper":"高数2016","real":1,"steps":["分部积分：∫2xlnx dx = x²lnx − x²/2","代入上下限：(e·(1/2) − e/2) − (0 − 1/2) = 1/2"],"sol":"分部积分：∫2xlnx dx = x²lnx − x²/2。代入上下限：(e·(1/2) − e/2) − (0 − 1/2) = 1/2。"},{"id":"mat16_e26","mod":"积分","q":"求曲线 y=√x、直线 x=1 和 x 轴所围成的有界平面图形的面积 S，及该平面图形绕 x 轴旋转一周所得旋转体的体积 V。","score":10,"paper":"高数2016","real":1,"steps":["S=∫₀¹√x dx = (2/3)x^(3/2)|₀¹ = 2/3","V=π∫₀¹(√x)²dx = π∫₀¹x dx = (π/2)x²|₀¹ = π/2"],"sol":"S=∫₀¹√x dx = (2/3)x^(3/2)|₀¹ = 2/3。V=π∫₀¹(√x)²dx = π∫₀¹x dx = (π/2)x²|₀¹ = π/2。"},{"id":"mat16_e27","mod":"多元函数","q":"设函数 f(x,y) = x² + y² + xy + 3，求 f(x,y) 的极值点与极值。","score":10,"paper":"高数2016","real":1,"steps":["fₓ=2x+y=0，f_y=2y+x=0，解得 (0,0)","A=2, B=1, C=2，B²−AC=−3<0 且 A>0，为极小值，f(0,0)=3"],"sol":"fₓ=2x+y=0，f_y=2y+x=0，解得 (0,0)。A=2, B=1, C=2，B²−AC=−3<0 且 A>0，为极小值，f(0,0)=3。"},{"id":"mat16_e28","mod":"概率","q":"已知离散型随机变量 X 的概率分布为 X:0,10,20,30 / P:0.2,a,0.2,0.3。(1) 求常数 a；(2) 求 X 的数学期望 EX 及方差 DX。","score":10,"paper":"高数2016","real":1,"steps":["由 Σp=1 得 a=0.3","EX=0×0.2+10×0.3+20×0.2+30×0.3=16","DX=(0−16)²×0.2+(10−16)²×0.3+(20−16)²×0.2+(30−16)²×0.3=124"],"sol":"由 Σp=1 得 a=0.3。EX=0×0.2+10×0.3+20×0.2+30×0.3=16。DX=(0−16)²×0.2+(10−16)²×0.3+(20−16)²×0.2+(30−16)²×0.3=124。"},{"id":"mat15_e25","mod":"积分","q":"已知 f(x) 是连续函数，且 ∫₀ˣ f(t)e^(−t)dt = x，求 ∫₀¹ f(x)dx。","score":8,"paper":"高数2015","real":1,"steps":["两边对 x 求导：f(x)e^(−x) = 1","得 f(x) = eˣ","故 ∫₀¹f(x)dx = ∫₀¹eˣdx = e − 1"],"sol":"两边对 x 求导：f(x)e^(−x) = 1，得 f(x) = eˣ。故 ∫₀¹f(x)dx = ∫₀¹eˣdx = e − 1。"},{"id":"mat15_e26","mod":"导数","q":"已知函数 f(x) = ln x − x。(1) 求 f(x) 的单调区间和极值；(2) 判断曲线 y=f(x) 的凹凸性。","score":10,"paper":"高数2015","real":1,"steps":["f′(x)=1/x−1=(1−x)/x","0<x<1 时 f′>0 增，x>1 时 f′<0 减","故 x=1 取极大值 f(1)=−1","f″(x)=−1/x²<0，故曲线在 (0,+∞) 上凸"],"sol":"f′(x)=1/x−1=(1−x)/x。0<x<1 时 f′>0 增，x>1 时 f′<0 减，故 x=1 取极大值 f(1)=−1。f″(x)=−1/x²<0，故曲线在 (0,+∞) 上凸。"},{"id":"mat15_e27","mod":"多元函数","q":"求二元函数 f(x,y) = x²/2 − xy + y² + 3x 的极值。","score":10,"paper":"高数2015","real":1,"steps":["fₓ=x−y+3=0, f_y=−x+2y=0，解得 x=−6, y=−3","A=fₓₓ=1, B=fₓy=−1, C=f_yy=2，B²−AC=−1<0 且 A>0，为极小值，f(−6,−3)=−9"],"sol":"fₓ=x−y+3=0, f_y=−x+2y=0，解得 x=−6, y=−3。A=fₓₓ=1, B=fₓy=−1, C=f_yy=2，B²−AC=−1<0 且 A>0，为极小值，f(−6,−3)=−9。"},{"id":"mat15_e28","mod":"概率","q":"从装有 2 个白球、3 个黑球的袋中任取 3 个球，记取出白球的个数为 X。(1) 求 X 的概率分布；(2) 求 X 的数学期望 E(X)。","score":10,"paper":"高数2015","real":1,"steps":["P(X=0)=C(3,3)/C(5,3)=1/10","P(X=1)=C(2,1)C(3,2)/C(5,3)=6/10","P(X=2)=C(2,2)C(3,1)/C(5,3)=3/10","E(X)=0×0.1+1×0.6+2×0.3=1.2"],"sol":"P(X=0)=C(3,3)/C(5,3)=1/10；P(X=1)=C(2,1)C(3,2)/C(5,3)=6/10；P(X=2)=C(2,2)C(3,1)/C(5,3)=3/10。E(X)=0×0.1+1×0.6+2×0.3=1.2。"},{"id":"mat14_e22","mod":"导数","q":"已知 x=−1 是函数 f(x) = ax³ + bx² 的驻点，且曲线 y=f(x) 过点 (1,5)，求 a、b 的值。","score":8,"paper":"高数2014","real":1,"steps":["f′(x)=3ax²+2bx","由 f′(−1)=0 得 3a−2b=0 ①","过点 (1,5) 得 a+b=5 ②","联立解得 a=2，b=3"],"sol":"f′(x)=3ax²+2bx，由 f′(−1)=0 得 3a−2b=0 ①；过点 (1,5) 得 a+b=5 ②。联立解得 a=2，b=3。"},{"id":"mat14_e24","mod":"积分","q":"计算 ∫₁ᵉ ln x dx","score":8,"paper":"高数2014","real":1,"steps":["∫lnx dx = xlnx − x","代入上下限：(e·1−e)−(0−1)=1"],"sol":"∫lnx dx = xlnx − x，代入上下限：(e·1−e)−(0−1)=1。"},{"id":"mat14_e26","mod":"积分","q":"设曲线 y=sin x (0≤x≤π/2)、x 轴及直线 x=π/2 所围成的平面图形为 D。在区间 (0,π/2) 内求一点 x₀，使直线 x=x₀ 将 D 分成面积相等的两部分。","score":10,"paper":"高数2014","real":1,"steps":["由题意 ∫₀^{x₀} sinx dx = ∫_{x₀}^{π/2} sinx dx","即 −cosx|₀^{x₀} = −cosx|_{x₀}^{π/2}","得 1−cos x₀ = cos x₀，cos x₀ = 1/2","故 x₀ = π/3"],"sol":"由题意 ∫₀^{x₀} sinx dx = ∫_{x₀}^{π/2} sinx dx，即 −cosx|₀^{x₀} = −cosx|_{x₀}^{π/2}，得 1−cos x₀ = cos x₀，cos x₀ = 1/2，故 x₀ = π/3。"},{"id":"mat14_e27","mod":"概率","q":"设 50 件产品中，45 件是正品，5 件是次品。从中任取 3 件，求其中至少有 1 件是次品的概率（精确到 0.01）。","score":10,"paper":"高数2014","real":1,"steps":["设 A={3 件中至少有 1 件次品}","则 Ā={3 件全是正品}","P(A)=1−C(45,3)/C(50,3)≈1−0.724=0.28"],"sol":"设 A={3 件中至少有 1 件次品}，则 Ā={3 件全是正品}。P(A)=1−C(45,3)/C(50,3)≈1−0.724=0.28。"},{"id":"mat14_e28","mod":"积分","q":"设曲线 y=4−x² (x≥0) 与 x 轴、y 轴及直线 x=4 所围成的平面图形为 D。(1) 求 D 的面积 S；(2) 求图中 x 轴上方的阴影部分绕 y 轴旋转一周所得旋转体的体积 V。","score":10,"paper":"高数2014","real":1,"steps":["(1) S=∫₀²(4−x²)dx − ∫₂⁴(4−x²)dx = 16","(2) 上方阴影 0≤y≤4 绕 y 轴旋转，V=π∫₀⁴x²dy=π∫₀⁴(4−y)dy=8π"],"sol":"(1) S=∫₀²(4−x²)dx − ∫₂⁴(4−x²)dx = 16。(2) 上方阴影 0≤y≤4 绕 y 轴旋转，V=π∫₀⁴x²dy=π∫₀⁴(4−y)dy=8π。"},{"id":"tpl_g2","mod":"极限","q":"【模板演练】求极限大题 —— 把标准作答的 5 步排回正确顺序","score":0,"paper":"作答模板","real":0,"steps":["解：","由题意可知，所求极限为题设式（抄写条件并判断型态是否为 0/0 或 ∞/∞）","由等价无穷小替换 / 洛必达法则得（写出所用公式或定理名称）","对分子分母分别求导（或替换）后化简","代入求得极限值为…，故所求极限为…"],"sol":"先写\"由洛必达法则得\"或\"由等价无穷小 …～… 得\"，再动笔算。","tpl":1},{"id":"tpl_g3","mod":"导数","q":"【模板演练】导数应用题（单调/极值/凹凸） —— 把标准作答的 5 步排回正确顺序","score":0,"paper":"作答模板","real":0,"steps":["解：","由题意可知，函数为 y = …，定义域为 …","求一阶导数 y′ = …（写出求导公式），令 y′ = 0 解得驻点 x = …","列表判断 y′ 在各区间的符号，得单调区间与极值","再求二阶导数 y″ = …，由 y″ 符号得凹凸区间与拐点，故结论为…"],"sol":"导数应用题分两大块（一阶管单调极值、二阶管凹凸拐点），各写各的公式，分开踩点。","tpl":1},{"id":"tpl_g4","mod":"积分","q":"【模板演练】积分计算大题 —— 把标准作答的 5 步排回正确顺序","score":0,"paper":"作答模板","real":0,"steps":["解：","由题意可知，所求积分式为 …","令 u = …（换元法）或设 u = …、dv = …（分部积分法），写出所用的积分公式","代入得 ∫ … = …，逐项积分并化简","故原式 = … + C（不定积分务必加常数 C）"],"sol":"不定积分最后必须写 +C；换元后上下限要跟着换（定积分）。","tpl":1},{"id":"tpl_g5","mod":"多元函数","q":"【模板演练】多元函数大题 —— 把标准作答的 5 步排回正确顺序","score":0,"paper":"作答模板","real":0,"steps":["解：","由题意可知，函数为 z = …","对 x 求偏导时把 y 当常数，得 ∂z/∂x = …；同法得 ∂z/∂y = …（写出全微分 / 偏导公式）","令各偏导为 0 求驻点，代入判别式判断极值（或代入全微分公式）","故所求偏导 / 极值 / 全微分为…"],"sol":"口诀\"对谁求导，另一个当常数\"；全微分公式 dz = (∂z/∂x)dx + (∂z/∂y)dy 先写出。","tpl":1},{"id":"tpl_g5b","mod":"概率","q":"【模板演练】概率大题 —— 把标准作答的 5 步排回正确顺序","score":0,"paper":"作答模板","real":0,"steps":["解：","由题意可知，设事件 / 随机变量 X 为 …","由古典概型 P = 有利结果数 / 总结果数，或写出分布列 / 期望公式","逐项计算各概率值并列表（或代入期望公式 E(X) = Σ xᵢpᵢ）","故 P(A) = … / E(X) = …"],"sol":"概率题\"列式\"比\"算数\"值钱：先把 P = 有利/总数的式子摆出来再算。","tpl":1}]};

/* ============================================================================
 * 大题步骤分 · 专项突破（模块逻辑层）
 * 数据在文件头部 window.STEPSCORE（由 _gen_stepscore.py 生成），本段为 UI 逻辑。
 * 依赖主程序全局：st/save/addXp/go/toast/shuffle/escapeHtml/getMate/pick/speak/stopSpeak
 * 屏幕：#s-stepscore（section） + #stepscoreBody（容器）
 * 练习形态：**步骤排序题** —— 把打乱的作答步骤卡按正确顺序点选排列，训练"作答结构感"。
 * ========================================================================== */

function stepscoreD(){ return window.STEPSCORE || null; }
function stepscoreFresh(){
  return { mode:'home', stage:null, stageList:false,
    queue:[], idx:0, q:null, avail:[], placed:[], done:false,
    score:0, combo:0, t0:0, right:0 };
}
function stepscoreST(){
  if(!st.stepscore) st.stepscore = {};
  st.stepscore.pass = st.stepscore.pass || {};   // {stageId: 最佳正确率}
  st.stepscore.wrong = st.stepscore.wrong || {}; // {qid:1}
  return st.stepscore;
}
function startStepScore(){
  const d = stepscoreD(); if(!d){ toast('步骤分数据未加载'); return; }
  stepscoreST();
  S.stepscore = stepscoreFresh();
  go('s-stepscore'); renderStepScore();
}
function stepscoreBack(){
  const p = S.stepscore; if(!p){ go('s-study'); return; }
  if(p.mode !== 'home'){ p.mode = 'home'; p.queue = []; p.q = null; p.avail = []; p.placed = []; p.done = false; p.stage = null; renderStepScore(); }
  else go('s-study');
}
function renderStepScore(){
  const body = document.getElementById('stepscoreBody'); if(!body) return;
  const d = stepscoreD(); if(!d){ body.innerHTML = '<div class="card">数据加载中…</div>'; return; }
  const p = S.stepscore || (S.stepscore = stepscoreFresh());
  if(p.mode === 'quiz') return stepscoreQuiz(body, d, p);
  if(p.mode === 'done') return stepscoreDone(body, d, p);
  if(p.mode === 'dash') return stepscoreDash(body, d, p);
  if(p.mode === 'wrong') return stepscoreWrongView(body, d, p);
  if(p.mode === 'teach') return stepscoreTeachView(body, d, p);
  return stepscoreHome(body, d, p);
}
function stepscoreMate(d){ return getMate((d.meta && d.meta.mate) || 'luo'); }
function stepscoreStageById(d, id){ for(let i=0;i<d.stages.length;i++){ if(d.stages[i].id === id) return d.stages[i]; } return null; }
function stepscoreQs(d, id){ const s = stepscoreStageById(d, id); return s ? s.pool.map(function(n){ return d.Q[n]; }) : []; }
function stepscoreStars(rate){ return rate >= 90 ? 3 : rate >= 70 ? 2 : rate >= 50 ? 1 : 0; }
function stepscoreStarStr(n){ return '★★★'.slice(0, n) + '☆☆☆'.slice(0, 3 - n); }

/* ---------------------------- 主页 ---------------------------- */
function stepscoreHome(body, d, p){
  const s = stepscoreST();
  const done = d.stages.filter(function(x){ return s.pass[x.id] !== undefined; }).length;
  const wrongN = Object.keys(s.wrong).length;
  const total = d.stages.length;
  let h = '';
  h += '<div style="padding:14px 16px 6px">'
     + '<div style="font-size:19px;font-weight:800">🧮 ' + escapeHtml(d.meta.title) + '</div>'
     + '<div style="font-size:12.5px;color:var(--sub);line-height:1.6;margin-top:4px">' + escapeHtml(d.meta.tip) + '</div></div>';
  h += '<div class="grid4" style="padding:0 16px">'
     + '<div class="stat"><b>' + done + '/' + total + '</b><span>已通关卡</span></div>'
     + '<div class="stat"><b>' + (d.meta.total_q || 0) + '</b><span>专训题量</span></div>'
     + '<div class="stat"><b>' + wrongN + '</b><span>错题待清</span></div>'
     + '<div class="stat"><b>' + escapeHtml(d.meta.target || '75%') + '</b><span>目标正确率</span></div></div>';

  /* 分值分布速览卡 */
  h += '<div class="card mt10" style="margin:0 16px;border-color:rgba(255,138,209,.35)">'
     + '<div style="font-weight:800;margin-bottom:6px">💰 大题的分数是怎么给的（官方踩点规则）</div>'
     + '<div style="font-size:12.5px;line-height:1.9;color:var(--sub)">'
     + '写「解：」并抄题　→　<b style="color:var(--sub)">约 5%</b><br>'
     + '★ 写出核心公式 / 定理　→　<b style="color:var(--magenta)">约 30%</b>（土办法漏掉的大头）<br>'
     + '代入变形　　　　→　<b style="color:var(--gold)">约 30%</b><br>'
     + '得出最终结果　　　→　<b style="color:var(--teal)">约 35%</b></div></div>';

  h += '<div class="sec-title" style="margin:14px 16px 0"><span class="bar"></span>一天闯关<small>由易到难</small></div>';
  h += '<div class="c20-grid" style="padding:0 16px">';
  d.stages.forEach(function(g){
    const r = s.pass[g.id];
    const badge = (r === undefined) ? '' : ' · ' + stepscoreStarStr(stepscoreStars(r));
    h += '<div class="c20-mode" onclick="stepscoreStart(\'' + g.id + '\')"><div class="mi">' + g.icon + '</div>'
       + '<div class="mn">' + escapeHtml(g.name) + '</div>'
       + '<div class="md">' + escapeHtml(g.desc) + escapeHtml(badge) + '</div></div>';
  });
  h += '</div>';

  h += '<div class="row2 mt10" style="padding:0 16px">'
     + '<button class="btn ghost" onclick="stepscoreGoDash()">📊 掌握度仪表盘</button>'
     + '<button class="btn ghost" onclick="stepscoreGoWrong()">🔁 错题本 ' + (wrongN || '') + '</button></div>';
  h += '<button class="btn teal mt10" style="width:calc(100% - 32px);margin:10px 16px 0" onclick="stepscoreToggleTeach()">'
     + (p.stageList ? '▾ 收起作答模板' : '▸ 展开作答模板（五步骨架 / 各题型 / 土办法对比）') + '</button>';
  if(p.stageList) h += stepscoreTeachCards(d);
  h += '<button class="btn ghost mt10" style="width:calc(100% - 32px);margin:10px 16px 0" onclick="stepscoreBack()">← 返回自习室</button>';
  body.innerHTML = h;
}
function stepscoreToggleTeach(){ const p = S.stepscore; p.stageList = !p.stageList; renderStepScore(); }
function stepscoreTeachView(body, d, p){
  let h = '<div style="padding:14px 16px 6px"><div style="font-size:18px;font-weight:800">📖 大题作答模板</div></div>';
  h += stepscoreTeachCards(d);
  h += '<button class="btn ghost mt10" style="width:calc(100% - 32px);margin:10px 16px 0" onclick="stepscoreBack()">← 返回模块主页</button>';
  body.innerHTML = h;
}
function stepscoreTeachCards(d){
  let h = '';
  /* 五步骨架 */
  h += '<div class="card mt10" style="margin:0 16px"><div style="font-weight:800;margin-bottom:7px">🧱 五步作答骨架 · 大题万能结构</div>'
     + '<div style="font-size:12.5px;line-height:1.75;color:var(--sub)">';
  d.frame.forEach(function(f){
    h += '<div style="margin-bottom:8px"><b style="color:var(--gold)">' + f.n + '. ' + escapeHtml(f.t) + '</b>'
       + ' <span style="color:var(--magenta);font-weight:700">' + escapeHtml(f.v) + '</span><br>' + escapeHtml(f.d) + '</div>';
  });
  h += '</div></div>';
  /* 各题型模板 */
  h += '<div class="card mt10" style="margin:0 16px"><div style="font-weight:800;margin-bottom:7px">📚 分题型作答模板 · 照着填</div>';
  d.templates.forEach(function(t){
    h += '<div style="margin-bottom:10px;font-size:12.5px;line-height:1.7;color:var(--sub)">'
       + '<b style="color:var(--teal)">' + escapeHtml(t.name) + '</b><br>'
       + t.steps.map(function(s, i){ return '<span style="opacity:.9">' + (i+1) + '. ' + escapeHtml(s) + '</span>'; }).join('<br>')
       + '<br><span style="color:var(--gold)">💡 ' + escapeHtml(t.key) + '</span></div>';
  });
  h += '</div>';
  /* 土办法对比 */
  h += '<div class="card mt10" style="margin:0 16px"><div style="font-weight:800;margin-bottom:7px">⚖️ 土办法 vs 升级版</div>'
     + '<div style="font-size:12.5px;line-height:1.75;color:var(--sub)">';
  d.myth.forEach(function(r){ h += '<div style="margin-bottom:8px"><b>' + escapeHtml(r.t) + '</b><br>' + mdInline(r.d) + '</div>'; });
  h += '</div></div>';
  /* 纪律 */
  h += '<div class="card mt10" style="margin:0 16px"><div style="font-weight:800;margin-bottom:7px">⚠️ 五条纪律</div>'
     + '<div style="font-size:12.5px;line-height:1.75;color:var(--sub)">';
  (d.discipline || []).forEach(function(t){ h += '<div style="margin-bottom:6px">· ' + escapeHtml(t) + '</div>'; });
  h += '</div></div>';
  return h;
}
/* 把 **加粗** 转成 <b>，其余转义 */
function mdInline(t){
  return escapeHtml(String(t)).replace(/\*\*([^*]+)\*\*/g, '<b style="color:var(--gold)">$1</b>');
}

/* ---------------------------- 出题 ---------------------------- */
function stepscoreStart(stageId){
  const d = stepscoreD(); const p = S.stepscore;
  const g = stepscoreStageById(d, stageId);
  if(!g){ toast('关卡不存在'); return; }
  let pool = stepscoreQs(d, stageId).slice();
  const need = g.pool_n || pool.length;
  if(pool.length > need) pool = shuffle(pool).slice(0, need);
  p.mode = 'quiz'; p.stage = stageId; p.queue = pool;
  p.idx = 0; p.q = null; p.done = false; p.score = 0; p.combo = 0; p.right = 0;
  p.t0 = Date.now();
  renderStepScore();
}
function stepscoreStartWrong(){
  const d = stepscoreD(); const p = S.stepscore; const s = stepscoreST();
  const ks = Object.keys(s.wrong);
  if(!ks.length){ toast('错题本是空的，先去做几关吧'); return; }
  const map = {}; d.Q.forEach(function(q){ map[q.id] = q; });
  const pool = ks.map(function(k){ return map[k]; }).filter(Boolean);
  if(!pool.length){ toast('错题本已清空'); s.wrong = {}; save(); renderStepScore(); return; }
  p.mode = 'quiz'; p.stage = '_wrong'; p.queue = pool;
  p.idx = 0; p.q = null; p.done = false; p.score = 0; p.combo = 0; p.right = 0; p.t0 = Date.now();
  renderStepScore();
}

/* ---------------------------- 答题页（排序） ---------------------------- */
function stepscoreQuiz(body, d, p){
  if(p.q === null || p.q === undefined){
    if(p.idx >= p.queue.length){ p.mode = 'done'; return renderStepScore(); }
    p.q = p.queue[p.idx];
    p.done = false;
    /* 打乱可用卡片的显示顺序 */
    p.avail = shuffle(p.q.steps.map(function(_, i){ return i; }));
    p.placed = [];
  }
  const q = p.q, total = p.queue.length;
  const mate = stepscoreMate(d);
  const combo = p.combo || 0;
  const isLast = (p.idx >= total - 1);
  const pct = Math.round((p.idx + (p.done ? 1 : 0)) / total * 100);
  const g = p.stage === '_wrong' ? { name:'错题本', icon:'🔁', tip:'' } : stepscoreStageById(d, p.stage);
  const nStep = q.steps.length;
  const allPlaced = (p.placed.length >= nStep);

  let h = '';
  h += '<div style="padding:14px 16px 8px">'
     + '<div class="qbar" style="margin-bottom:5px"><span>' + escapeHtml((g && g.icon ? g.icon + ' ' : '') + (g ? g.name : '')) + '</span>'
     + '<div class="prog"><i style="width:' + pct + '%"></i></div>'
     + '<span>' + (p.idx + 1) + '/' + total + '</span></div>'
     + '<div style="font-size:12.5px;color:var(--sub);font-weight:600">把打乱的作答步骤，按正确的先后顺序点选排列</div></div>';
  h += '<div class="chat" style="padding:0 16px">';
  if(combo >= 3) h += '<div><span class="combobadge">' + (combo >= 8 ? '🔥🔥 火力全开 x' : '🔥 连击 x') + combo + '</span></div>';
  /* 角色气泡 */
  h += '<div class="chat-q mem-coach"><img class="chat-av" src="' + mate.img + '" alt="' + escapeHtml(mate.name) + '" onerror="this.style.display=\'none\'">'
     + '<div class="bubble qbubble"><div class="who">' + escapeHtml(mate.name) + '</div>'
     + (p.done ? pick(p.right ? mate.lines.correct : mate.lines.wrong)
               : escapeHtml((g && g.tip) || '先看这题属于哪个题型，再想标准作答第一步写什么。'))
     + '</div></div>';
  /* 题干 */
  h += '<div class="chat-q"><img class="chat-av" src="' + mate.img + '" alt="' + escapeHtml(mate.name) + '" onerror="this.style.display=\'none\'">'
     + '<div class="bubble qbubble"><div class="qtext" style="font-size:14px;line-height:1.8">' + escapeHtml(q.q) + '</div>'
     + '<div style="margin-top:6px;font-size:11.5px;color:var(--sub)">'
     + (q.score ? '本题分值 ' + q.score + ' 分 · ' : '') + escapeHtml(q.mod) + ' · ' + escapeHtml(q.paper)
     + (q.real ? ' · <b style="color:var(--magenta)">真题</b>' : '') + '</div>'
     + '<div class="ttsbar"><button class="ttsbtn" onclick="stepscoreSpeak()"><span>🔊</span>朗读</button>'
     + '<button class="ttsbtn" onclick="stepscoreSpeakStop()"><span>⏹</span>停止</button></div>'
     + '</div></div>';
  h += '</div>';

  /* 作答区（已选顺序） */
  h += '<div style="padding:0 16px;margin-top:4px">';
  h += '<div style="font-size:12.5px;font-weight:800;margin-bottom:6px;color:var(--sub)">✍️ 你的作答顺序（' + p.placed.length + '/' + nStep + '）</div>';
  for(let k = 0; k < nStep; k++){
    if(k < p.placed.length){
      const si = p.placed[k];
      let cls = 'ok';
      if(p.done){ cls = (si === k) ? 'ok' : 'no'; }
      h += '<div class="opt ' + cls + '" style="margin-bottom:6px;' + (p.done ? '' : 'cursor:pointer') + '" '
         + (p.done ? '' : 'onclick="stepscoreUnplace(' + k + ')"') + '>'
         + '<div class="k">' + (k + 1) + '</div><div>' + escapeHtml(q.steps[si])
         + (p.done ? '' : '<span style="opacity:.5;font-size:11px">  (点此撤销)</span>') + '</div></div>';
    } else {
      h += '<div class="opt" style="margin-bottom:6px;opacity:.45;border-style:dashed"><div class="k">' + (k + 1) + '</div><div>…待选…</div></div>';
    }
  }
  h += '</div>';

  /* 待选卡池 */
  if(!p.done){
    h += '<div style="padding:0 16px;margin-top:8px">';
    h += '<div style="font-size:12.5px;font-weight:800;margin-bottom:6px;color:var(--sub)">🗂️ 待选步骤卡（点一下放进作答区）</div>';
    h += '<div style="display:flex;flex-direction:column;gap:6px">';
    p.avail.forEach(function(si){
      if(p.placed.indexOf(si) >= 0) return;
      h += '<div class="opt chat-opt" onclick="stepscorePlace(' + si + ')"><div class="k">＋</div><div>' + escapeHtml(q.steps[si]) + '</div></div>';
    });
    h += '</div></div>';
  }

  /* 结果 / 操作 */
  h += '<div style="padding:0 16px">';
  if(p.done){
    const okAll = p.placed.every(function(si, k){ return si === k; });
    h += '<div class="sol show ' + (okAll ? 'good' : 'bad') + '"><div class="h">'
       + (okAll ? '✅ 顺序完全正确！' + (q.score ? '这道 ' + q.score + ' 分的步骤分你拿满了' : '这道题的作答结构你拿对了') : '❌ 顺序有误 —— 正确顺序如下') + '</div>'
       + '<div style="font-size:13px;line-height:1.75">';
    q.steps.forEach(function(s, i){ h += '<div style="margin-bottom:5px"><b style="color:var(--gold)">' + (i+1) + '.</b> ' + escapeHtml(s) + '</div>'; });
    h += '</div>';
    if(q.sol && !q.tpl) h += '<div style="margin-top:8px;font-size:12.5px;color:var(--sub);line-height:1.7;border-top:1px dashed rgba(255,255,255,.15);padding-top:7px">📝 标准解答：' + escapeHtml(q.sol) + '</div>';
    if(q.sol && q.tpl) h += '<div style="margin-top:8px;color:var(--gold);font-size:12.5px">💡 ' + escapeHtml(q.sol) + '</div>';
    h += '</div>';
  }
  h += '<div class="btns mt10">'
     + (p.done ? '' : '<button class="btn sm ghost" onclick="stepscoreReset()">↺ 重排</button>')
     + '<button class="btn sm ghost" onclick="stepscoreMark()">🔖 ' + (stepscoreST().wrong[q.id] ? '移出错题本' : '标记入错题本') + '</button>'
     + '<button class="btn sm ghost" onclick="stepscoreBack()">← 返回主页</button></div>';
  h += '<div id="qkAnchStep"></div>';
  if(p.done) h += '<button class="btn keep mt10" style="width:100%" onclick="stepscoreNext()">' + (isLast ? '查看本关结果 ▶' : '下一题 ▶') + '</button>';
  else if(allPlaced) h += '<button class="btn keep mt10" style="width:100%" onclick="stepscoreSubmit()">提交作答 ▶</button>';
  h += '</div>';
  body.innerHTML = h;
  if(p.done){ var okAll = p.placed.every(function(si, k){ return si === k; }); qkitMount(document.getElementById('qkAnchStep'), q, okAll, 'stepscore', { noActions:true, noChoiceTag:true }); }
}
function stepscorePlace(si){
  const p = S.stepscore; if(!p || p.done) return;
  if(p.placed.indexOf(si) >= 0) return;
  p.placed.push(si);
  stepscoreST();
  renderStepScore();
}
function stepscoreUnplace(k){
  const p = S.stepscore; if(!p || p.done) return;
  p.placed.splice(k, 1);
  renderStepScore();
}
function stepscoreReset(){
  const p = S.stepscore; if(!p || p.done) return;
  p.placed = [];
  renderStepScore();
}
function stepscoreSubmit(){
  const p = S.stepscore; if(!p || p.done) return;
  const q = p.q;
  const okAll = p.placed.length === q.steps.length && p.placed.every(function(si, k){ return si === k; });
  p.done = true; p.right = okAll ? 1 : 0;
  const s = stepscoreST();
  if(okAll){
    p.score++; p.combo = (p.combo || 0) + 1;
    delete s.wrong[q.id];
    try{ addXp(3); }catch(e){}
  } else {
    p.combo = 0; s.wrong[q.id] = 1;
  }
  save();
  renderStepScore();
}
function stepscoreMark(){
  const p = S.stepscore; if(!p || !p.q) return;
  const s = stepscoreST();
  if(s.wrong[p.q.id]){ delete s.wrong[p.q.id]; toast('已移出错题本'); }
  else { s.wrong[p.q.id] = 1; toast('已加入错题本'); }
  save(); renderStepScore();
}
function stepscoreNext(){
  const p = S.stepscore; if(!p) return;
  p.idx++;
  if(p.idx >= p.queue.length){ p.mode = 'done'; renderStepScore(); return; }
  p.q = null; p.done = false; p.avail = []; p.placed = [];
  renderStepScore();
}
function stepscoreSpeak(){
  const q = S.stepscore && S.stepscore.q; if(!q) return;
  let s = String(q.q);
  if(q.steps && q.steps.length) s += '。作答步骤：' + q.steps.map(function(o, i){ return (i+1) + '，' + o; }).join('。');
  try{ speak(s, { lang:'zh-CN' }); }catch(e){}
}
function stepscoreSpeakStop(){ try{ stopSpeak(); }catch(e){} }

/* ---------------------------- 结算 ---------------------------- */
function stepscoreDone(body, d, p){
  const total = p.queue.length, score = p.score;
  const rate = total ? Math.round(score / total * 100) : 0;
  const s = stepscoreST();
  const g = p.stage === '_wrong' ? { name:'错题本', icon:'🔁' } : stepscoreStageById(d, p.stage);
  let isNew = false;
  if(p.stage !== '_wrong' && p.stage){
    if(s.pass[p.stage] === undefined || rate > s.pass[p.stage]){ s.pass[p.stage] = rate; isNew = true; }
  }
  const secs = p.t0 ? Math.round((Date.now() - p.t0) / 1000) : 0;
  save();
  const stars = stepscoreStars(rate);
  let h = '';
  h += '<div style="padding:16px">';
  h += '<div class="card" style="text-align:center;padding:20px 14px">'
     + '<div style="font-size:34px">' + (rate >= 90 ? '🏆' : rate >= 70 ? '🎉' : rate >= 50 ? '💪' : '📖') + '</div>'
     + '<div style="font-size:20px;font-weight:800;margin-top:6px">' + score + ' / ' + total + '</div>'
     + '<div style="font-size:14px;color:var(--gold);font-weight:800;letter-spacing:3px;margin-top:4px">' + stepscoreStarStr(stars) + '</div>'
     + '<div style="font-size:13px;color:var(--sub);margin-top:6px">排序正确率 <b>' + rate + '%</b> · 用时 ' + secs + 's'
     + (isNew && p.stage !== '_wrong' ? ' · <b style="color:var(--teal)">新纪录</b>' : '') + '</div>'
     + '<div style="font-size:12.5px;color:var(--sub);margin-top:8px">' + escapeHtml(g ? g.name : '') + ' 已' + (rate >= 70 ? '达标 ✅' : '完成 · 建议刷到 70% 以上') + '</div>'
     + '</div>';
  if(rate < 70){
    h += '<div class="card mt10"><div style="font-weight:800;margin-bottom:6px">🔁 本关错题（自动进错题本）</div>'
       + '<div style="font-size:12.5px;color:var(--sub);line-height:1.7">' + stepscoreWrongBrief(p.queue) + '</div></div>';
  }
  h += '<div class="row2 mt10"><button class="btn keep" onclick="stepscoreStart(\'' + p.stage + '\')">↻ 再刷一遍</button>'
     + '<button class="btn ghost" onclick="stepscoreGoWrong()">🔁 只刷错题</button></div>';
  h += '<button class="btn ghost mt10" style="width:100%" onclick="stepscoreBack()">← 返回模块主页</button>';
  h += '</div>';
  body.innerHTML = h;
}
function stepscoreWrongBrief(queue){
  const s = stepscoreST();
  const w = queue.filter(function(q){ return s.wrong[q.id]; });
  if(!w.length) return '本关没有留下错题，漂亮。';
  return w.map(function(q){ return '<div style="margin-bottom:5px">· ' + escapeHtml(String(q.q).slice(0, 40)) + '…</div>'; }).join('');
}

/* ---------------------------- 错题本 ---------------------------- */
function stepscoreGoWrong(){ const p = S.stepscore; if(!p) return; p.mode = 'wrong'; renderStepScore(); }
function stepscoreWrongView(body, d, p){
  const s = stepscoreST();
  const map = {}; d.Q.forEach(function(q){ map[q.id] = q; });
  const ks = Object.keys(s.wrong).filter(function(k){ return map[k]; });
  let h = '';
  h += '<div style="padding:14px 16px 6px"><div style="font-size:18px;font-weight:800">🔁 错题本</div>'
     + '<div style="font-size:12.5px;color:var(--sub);margin-top:4px">共 ' + ks.length + ' 题 · 排对即移出</div></div>';
  if(!ks.length){
    h += '<div class="card" style="margin:0 16px">暂无错题。去「一天闯关」排几关吧～</div>';
  } else {
    h += '<div style="padding:0 16px">';
    ks.forEach(function(k){
      const q = map[k];
      h += '<div class="card mt10" style="margin:0"><div style="font-size:13px;line-height:1.7">' + escapeHtml(String(q.q).slice(0, 70)) + '…</div>'
         + '<div style="font-size:12px;color:var(--sub);margin-top:4px;line-height:1.6">'
         + q.steps.map(function(x, i){ return (i+1) + '. ' + escapeHtml(x); }).join('　') + '</div></div>';
    });
    h += '</div>';
    h += '<div style="padding:0 16px"><button class="btn keep mt10" style="width:100%" onclick="stepscoreStartWrong()">开始重做错题 ▶</button></div>';
  }
  h += '<div style="padding:0 16px"><button class="btn ghost mt10" style="width:100%" onclick="stepscoreBack()">← 返回模块主页</button></div>';
  body.innerHTML = h;
}

/* ---------------------------- 仪表盘 ---------------------------- */
function stepscoreGoDash(){ const p = S.stepscore; if(!p) return; p.mode = 'dash'; renderStepScore(); }
function stepscoreDash(body, d, p){
  const s = stepscoreST();
  let sum = 0, cnt = 0;
  d.stages.forEach(function(g){ if(s.pass[g.id] !== undefined){ sum += s.pass[g.id]; cnt++; } });
  const avg = cnt ? Math.round(sum / cnt) : 0;
  const need = Math.max(0, 70 - avg);
  let h = '';
  h += '<div style="padding:14px 16px 6px"><div style="font-size:18px;font-weight:800">📊 掌握度仪表盘</div>'
     + '<div style="font-size:12.5px;color:var(--sub);margin-top:4px">目标：大题作答结构正确率 70%</div></div>';
  h += '<div class="card" style="margin:0 16px;text-align:center;padding:16px">'
     + '<div style="font-size:30px;font-weight:800;color:' + (avg >= 70 ? 'var(--teal)' : 'var(--gold)') + '">' + avg + '%</div>'
     + '<div style="font-size:12.5px;color:var(--sub);margin-top:4px">关卡平均正确率'
     + (avg >= 70 ? ' · 已达标 🎉' : ' · 距 70% 还差 <b>' + need + '</b> 个点') + '</div></div>';
  h += '<div style="padding:0 16px">';
  d.stages.forEach(function(g){
    const r = s.pass[g.id];
    const pct = r === undefined ? 0 : r;
    h += '<div class="card mt10" style="margin:0">'
       + '<div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700">'
       + '<span>' + g.icon + ' ' + escapeHtml(g.name) + '</span>'
       + '<span>' + (r === undefined ? '未练' : pct + '%') + '</span></div>'
       + '<div class="prog" style="margin-top:7px"><i style="width:' + pct + '%"></i></div>'
       + '<div style="font-size:11.5px;color:var(--sub);margin-top:5px">' + escapeHtml(g.desc) + '</div></div>';
  });
  h += '</div>';
  h += '<div class="card mt10" style="margin:10px 16px 0"><div style="font-weight:800;margin-bottom:6px">📈 大题的分是怎么拿的</div>'
     + '<div style="font-size:12.5px;line-height:1.8;color:var(--sub)">'
     + '答案是"踩点给分"，不是"对错给分"<br>'
     + '写"解："抄题 → 约 <b>5%</b><br>'
     + '★写核心公式 → 约 <b>30%</b>（土办法漏掉的最大一块）<br>'
     + '代入变形 → 约 <b>30%</b><br>'
     + '写结论 → 约 <b>35%</b><br>'
     + '<span style="opacity:.8">把 5 步的格子填满，即使没算全，也能拿到 60%~80% 的步骤分。</span></div></div>';
  h += '<button class="btn ghost mt10" style="width:calc(100% - 32px);margin:10px 16px 0" onclick="stepscoreBack()">← 返回模块主页</button>';
  body.innerHTML = h;
}
