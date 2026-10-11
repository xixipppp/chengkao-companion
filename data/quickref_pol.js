/* 自动生成：_gen_quickref.py —— 成考专升本刷卷作战总册·随身速查模块
 * 结构：window.QUICKREF = {meta,overview,subjects,locator,myths,discipline}
 * 逻辑段在 _quickref_logic.js（已内联，自包含）。离线可用。
 * ====================================================================== */
window.QUICKREF = {"meta": {"title": "成考专升本 · 刷卷作战总册", "ver": "2026-10-10", "sub": "高数 + 英语 + 政治 · 三科合并版"}, "overview": {"flow": ["限时15-18分做一整套", "会做直接算", "不会翻本手册秒题卡", "最后空白才蒙", "5分对答案", "红笔圈错+卡壳", "按模块填薄弱点表", "去App专练"], "budget": [["动作", "单套耗时", "×6套", "说明"], ["做题(限时)", "15-18分", "≈100分", "卡住就跳，保节奏"], ["对答案+标错", "4-5分", "≈30分", "只标错和蒙对不懂，不纠结"], ["归类薄弱点", "1分", "≈6分", "填第五章表格，一句话归类"], ["去App专练", "—", "当天/当晚", "只练今天标出的1-2个弱项"], ["合计", "≈20分", "≈136分", "控2小时内，留机动"]], "kit": ["本手册（打印最佳，可摊桌面边做边翻；手机开App速查也行）", "红笔+黑笔：黑笔做题，红笔只圈「错/卡壳/蒙对但不懂」", "答案册：每套对完立刻收走，不回看，保持刷题节奏", "App已装好：确认「数学秒题」「大题步骤分」「作文」「完形」能打开"], "mindset": "刷题≠刷遍每题。本手册帮你把「会做的秒杀、不会的套技巧、空白的才蒙」分开处理；刷完6套你手里就有一张个人薄弱点地图——这才是去App练的方向盘。"}, "subjects": [{"key": "math", "name": "高数", "ico": "📐", "color": "#e4572e", "parts": [{"type": "table", "title": "通用四把刀（任何选择题先试，合计覆盖45%）", "tag": "高数第一战场", "cols": ["顺序", "刀法", "触发条件", "动作", "覆盖"], "rows": [["1", "直接计算", "会算", "老实算，大题必须写过程", "—"], ["2", "代入验证法", "选项为具体值/表达式且题带等式或条件", "把选项逐个代回原条件，谁满足选谁", "45%"], ["3", "特殊值法", "选项含变量，或问恒成立/一定", "令x=0/1/-1或取边界，一次排2-3个", "45%"], ["4", "性质排除法", "函数/图形题", "奇偶性/单调性/定义域/正负号/量级", "—"]]}, {"type": "olist", "title": "拿到一道选择题先做哪一步？（决策树）", "items": ["能直接算→就算——大题与计算题第一优先，解答题必须写过程拿步骤分，别用技巧偷懒。", "选项能代回验证→代入验证法：把A/B/C/D逐个代回原条件（方程/连续性/切线），谁满足选谁，覆盖约45%。", "有特殊值可试→特殊值法：令x=0/1/−1或取边界，一次排掉2~3个选项，覆盖约45%。", "能用性质排除→排除法：奇偶性、单调性、定义域、正负号、量级——不定积分没+C直接划掉。", "以上都不行→才轮到蒙：仅最后1分钟、完全空白的题——极限蒙0/1/2、概率排>1，其余别猜位置。"]}, {"type": "cards", "title": "五大模块秒题卡（按题面关键词翻）", "tag": "选择216题", "cards": [{"t": "极限", "cov": "覆盖17% · 选择34/解答46", "kw": "lim / 无穷小 / 洛必达 / x→0 / x→∞", "tips": ["x→0且0/0→等价无穷小替换", "0/0或∞/∞→洛必达或最高次幂系数比", "两个重要极限：sinx/x→1，(1+1/x)^x→e", "分段连续性：左极限=右极限=函数值"], "formula": "sinx~x · tanx~x · arcsinx~x · arctanx~x · ln(1+x)~x · e^x-1~x · 1-cosx~x²/2 · (1+x)^a-1~ax · a^x-1~x·lna", "guess": "不会就选 0 / 1 / 2（命中59%）"}, {"t": "导数", "cov": "覆盖29% · 选择67/解答72", "kw": "f′ / 切线 / 单调 / 极值 / 求导", "tips": ["基本求导公式表直套(最高频)", "复合函数→链式法则", "切线方程套模板：y0=f(x0)→k=f′(x0)→y-y0=k(x-x0)", "单调极值：f′=0求驻点→判符号→定极值"], "guess": "无通用蒙法，直接算或代入验证"}, {"t": "积分", "cov": "覆盖27% · 选择62/解答91", "kw": "∫ / 原函数 / 面积 / 不定积分 / 定积分", "tips": ["基本积分公式表直套", "第一类换元(凑微分)：∫f(g)g′dx=∫f(u)du", "分部积分：∫u dv=uv-∫v du，u顺序 反·对·幂·指·三", "定积分：牛顿-莱布尼茨 F(b)-F(a)", "对称区间：∫[-a,a]奇函数=0、偶函数=2∫[0,a](一击必杀)", "陷阱：不定积分答案必带+C"], "guess": "不定积分无+C直接排除；奇偶对称题秒0"}, {"t": "多元函数", "cov": "覆盖10% · 选择28/解答36", "kw": "∂ / z= / 全微分 / 偏导", "tips": ["偏导数：对x求导时把y当常数", "全微分：dz=(∂z/∂x)dx+(∂z/∂y)dy", "二阶偏导/隐函数同理"], "guess": "无通用蒙法，套偏导/全微分公式"}, {"t": "概率", "cov": "覆盖8% · 选择20/解答17", "kw": "概率 / 取到 / 至少 / 古典概型", "tips": ["古典概型：P=有利数/总数", "对立事件：P(A)=1-P(Ā)(至少类首选)", "互斥相加/独立相乘", "值域排除：概率必在[0,1]，>1直接划掉"], "guess": "答案必在[0,1]，>1的划掉"}]}, {"type": "table", "title": "解答题五步抢分骨架（按分值排）", "tag": "大题262道=55%", "cols": ["步", "动作", "分值", "要点"], "rows": [["1", "写「解：」", "约5%", "独立成行、写在最左。阅卷按点找，格式对了先有印象分。"], ["2", "抄写已知条件", "并入第1步", "「由题意可知……」把题给条件复述一遍，既是踩点也理思路。"], ["3", "写出核心公式/定理", "≈30%", "★最值钱也最易忽略★写出该题型要用的公式或定理名称（如「由洛必达法则得」）。比抄题值6倍。"], ["4", "代入并变形", "≈30%", "把条件代进公式一步步推，中途卡住写出的变形都算数。"], ["5", "写结论", "≈35%", "「故……」「答：……」给结果。答错也保留结论分；算不出写最可能的值。"]]}, {"type": "cards", "title": "各模块步骤模板（照着填空）", "tag": "大题步骤分", "cards": [{"t": "极限 · 求极限大题", "steps": ["解：", "由题意可知，所求极限为题设式（抄条件并判断型态是否为0/0或∞/∞）", "由等价无穷小替换/洛必达法则得（写出所用公式或定理名称）", "对分子分母分别求导（或替换）后化简", "代入求得极限值，故所求极限为…"], "key": "先写「由洛必达法则得」或「由等价无穷小…～…得」，再动笔算。"}, {"t": "导数 · 导数应用题", "steps": ["解：", "由题意可知，函数为y=…，定义域为…", "求一阶导数y′=…（写出求导公式），令y′=0解得驻点x=…", "列表判y′在各区间符号，得单调区间与极值", "再求二阶导数y″=…，由y″符号得凹凸区间与拐点，故结论为…"], "key": "导数应用分两块（一阶管单调极值、二阶管凹凸拐点），各写各的公式，分开踩点。"}, {"t": "积分 · 积分计算大题", "steps": ["解：", "由题意可知，所求积分式为…", "令u=…（换元）或设u=…、dv=…（分部），写出所用积分公式", "代入得∫…=…，逐项积分并化简", "故原式=…+C（不定积分务必加常数C）"], "key": "不定积分最后必须写+C；换元后上下限要跟着换（定积分）。"}, {"t": "多元函数 · 多元大题", "steps": ["解：", "由题意可知，函数为z=…", "对x求偏导时把y当常数，得∂z/∂x=…；同法得∂z/∂y=…（写出全微分/偏导公式）", "令各偏导为0求驻点，代入判别式判断极值", "故所求偏导/极值/全微分为…"], "key": "口诀「对谁求导，另一个当常数」；全微分公式dz=(∂z/∂x)dx+(∂z/∂y)dy先写出。"}, {"t": "概率 · 概率大题", "steps": ["解：", "由题意可知，设事件/随机变量X为…", "由古典概型P=有利/总数，或写出分布列/期望公式", "逐项计算各概率值并列表（或代入E(X)=Σxᵢpᵢ）", "故P(A)=…/E(X)=…"], "key": "概率题「列式」比「算数」值钱：先把P=有利/总数的式子摆出来再算。"}]}, {"type": "warn", "title": "大题纪律（别踩坑）", "items": ["大题按「踩点」给分，不是按「对错」给分——过程写出来才有效。", "每题必写「解：」并抄一遍已知条件，这是0成本第一步。", "★先写公式再算数★：公式分占30%，是「土办法」漏掉的最大一块。", "算到卡住就停手，把能写的变形写完，结论写最可能的值。", "不定积分记得+C；换元后定积分上下限要跟着换。"]}, {"type": "cards", "title": "核心公式表（背公式靶心）", "tag": "速查", "cards": [{"t": "等价无穷小（x→0，极限题必背）", "formula": "sinx~x · tanx~x · arcsinx~x · arctanx~x · ln(1+x)~x · e^x-1~x · 1-cosx~x²/2 · (1+x)^a-1~ax · a^x-1~x·lna"}, {"t": "导数表 / 积分表（高频命中）", "formula": "导数：(xⁿ)′=nxⁿ⁻¹ (sinx)′=cosx (cosx)′=−sinx (tanx)′=1/cos²x (lnx)′=1/x (eˣ)′=eˣ (aˣ)′=aˣlna<br>积分：∫xⁿdx=xⁿ⁺¹/(n+1)+C ∫(1/x)dx=ln|x|+C ∫cosx dx=sinx+C ∫sinx dx=−cosx+C ∫eˣdx=eˣ+C ∫aˣdx=aˣ/lna+C<br>切线：k=f′(x₀)，方程 y−f(x₀)=k(x−x₀) ｜ 定积分：∫ₐᵇf=F(b)−F(a)；对称区间∫₋ₐᵃ奇函数=0、偶函数=2∫₀ᵃ<br>全微分：dz=(∂z/∂x)dx+(∂z/∂y)dy ｜ 古典概型：P=有利/总数；对立事件P(A)=1−P(Ā)"}, {"t": "题干高频符号（背公式的靶心）", "formula": "x²出现182次 ｜ ∫出现135次 ｜ sin出现91次 ｜ cos出现75次 ｜ ln出现70次 ｜ lim出现64次"}]}]}, {"key": "eng", "name": "英语", "ico": "A", "color": "#ff8ad1", "parts": [{"type": "cards", "title": "作文万能模板（25分大题，必拿）", "tag": "英语头号大头", "cards": [{"t": "三段式骨架", "tips": ["开头段(2-3句)：亮出观点/现象，如 As far as I am concerned,… / With the development of society,…", "主体段(4-6句)：2-3个理由，用 Firstly… Secondly… What's more… / On one hand… On the other hand…", "结尾段(2-3句)：总结+升华，如 In conclusion,… / Only by… can we…"], "key": "卷面干净、三段清晰、字数够，比华丽句式更值钱；不会写就套骨架往里填。"}, {"t": "10个必背句型", "tips": ["It is + adj. + (for sb.) to do sth.", "There is no doubt that…", "The reason why… is that…", "Not only… but also…", "It is high time that… (+过去时)", "Only by… can we… (倒装)", "It is universally acknowledged that…", "I am firmly convinced that…", "With the rapid development of…", "Every coin has two sides."], "key": "背熟5-6个，作文直接套，结构分稳拿。"}, {"t": "10条万能谚语", "tips": ["Practice makes perfect.", "Where there is a will, there is a way.", "Actions speak louder than words.", "Knowledge is power.", "Time is money.", "A friend in need is a friend indeed.", "Failure is the mother of success.", "Rome was not built in a day.", "Honesty is the best policy.", "Health is better than wealth."]}, {"t": "万能理由词", "tips": ["convenience 便利 ｜ efficiency 效率 ｜ communication 沟通 ｜ health 健康 ｜ environment 环境", "happiness 幸福 ｜ progress 进步 ｜ responsibility 责任 ｜ development 发展"]}]}, {"type": "cards", "title": "选择题 · 零基础急救（蒙题+套路）", "tag": "选择110分", "cards": [{"t": "完形填空", "tips": ["上下文复现：答案常是前文出现过的词或同义表达", "固定搭配：动词+介词、形容词+介词优先选熟搭配", "逻辑连词：and/but/so/while/however 看前后逻辑", "感情色彩：褒贬与题干一致"], "guess": "陌生题选最常见词；实在不会看「上下文复现」"}, {"t": "阅读理解", "tips": ["找题干关键词回原文定位（顺序出题）", "正确选项多为原文同义替换，少是照抄", "绝对化词 always/never/must 慎选", "主旨题看首尾段与各段首句"], "guess": "不会的选「含原文词/最长项」；三长一短选短(弱)"}, {"t": "语法/词汇", "tips": ["看前后词性定填什么", "时态前后一致", "非谓语：主动doing、目的to do、被动/完成done", "冠词a/an/the、介词固定搭配"], "guess": "语法填空不会就填最常见形式（如名词单→复、动词→ing）"}, {"t": "交际用语", "tips": ["礼貌原则：Thank you / You're welcome / I'd love to / With pleasure", "不直拒：用 I'm afraid… / Maybe later", "答谢答邀用模板句"], "guess": "选「最客气、最不冒犯」的那项"}, {"t": "蒙题兜底（最后1分钟）", "tips": ["完形：陌生词选常见词，逻辑连词看前后", "阅读：选含原文关键词或最长的", "词汇：选最眼熟的常见词"], "key": "英语蒙题可靠性高于数学，但优先动笔；蒙只垫底。"}]}, {"type": "cards", "title": "高频语法速记（公式100精简）", "tag": "语法填空", "cards": [{"t": "时态核心", "tips": ["一般现在/过去/将来：do/did/will do", "现在完成：have/has done（影响至今）", "过去完成：had done（过去的过去）", "进行：be+doing ｜ 被动：be+done"]}, {"t": "非谓语动词", "tips": ["作主语/宾语用 doing", "表目的用 to do", "表被动或已完成用 done", "介词后必用 doing"]}, {"t": "三大从句", "tips": ["定语：who/whom/which/that/whose/where/when/why", "名词性：that/what/whether/if", "状语：when/while/if/unless/though"]}, {"t": "虚拟语气", "tips": ["if+过去时→would do（与现在相反）", "if+had done→would have done（与过去相反）", "建议/要求/命令词(insist/demand/suggest/order)后 (should)+do"]}, {"t": "倒装", "tips": ["Only+状语置首→部分倒装", "否定词(Never/Little/Hardly/Not only)置首→倒装"]}]}, {"type": "cards", "title": "交际用语七场景（必背）", "tag": "选择常客", "cards": [{"t": "高频模板句", "tips": ["问候/介绍：Nice to meet you. / Let me introduce…", "感谢：Thank you (so much). / Thanks a lot.", "回应感谢：You're welcome. / My pleasure.", "道歉：I'm sorry. / Excuse me. ｜ 回应：Never mind. / It doesn't matter.", "请求许可：Can/May I…? ／ 同意：Sure. / Of course.", "建议：Why not…? / How about…? / Shall we…?", "邀请：Would you like to…? ｜ 祝愿：Good luck! / Best wishes! ｜ 道别：See you. / Take care."]}]}, {"type": "cards", "title": "必背核心词（作文/阅读高频）", "tag": "词汇", "cards": [{"t": "作文高频名词/动词/连接词", "tips": ["名词：society, development, technology, environment, health, education, success, problem, solution, future", "动词：improve, develop, solve, achieve, protect, influence, support, require", "连接：however, therefore, besides, meanwhile, in addition, as a result"]}]}]}, {"key": "pol", "name": "政治", "ico": "★", "color": "#ffd166", "parts": [{"type": "cards", "title": "大题答题模板（踩点拿分）", "tag": "大题70分", "cards": [{"t": "万能框架（论述/材料题）", "tips": ["原理：先写对应原理/概念（一句话）", "方法论：该原理要求怎么做", "结合材料：引用材料关键词分析", "每点=「原理一句话+展开一句」，宁多勿少"], "key": "政治大题按点给分，分点列条、关键词前置最稳。"}, {"t": "辨析题", "tips": ["第一步：判断正误（正确/片面/错误）", "第二步：阐明理由（对在哪、错在哪、为什么片面）", "第三步：小结+正确表述"]}, {"t": "简答题", "tips": ["分点列条 ① ② ③，每点「关键词+一句解释」", "概念题先给定义再展开", "重要会议/理论按时间或逻辑排"]}, {"t": "踩点铁律", "tips": ["每点先写原理/结论句，阅卷老师扫一眼就给分", "字数宁多勿少，但别跑题", "材料题必须把材料关键词写进答案"]}]}, {"type": "cards", "title": "选择题蒙题规律（政治选择）", "tag": "选择80分", "cards": [{"t": "排除法", "tips": ["含「完全/彻底/唯一/绝对」等绝对化词的多半错", "两个选项互斥，答案常在其中", "与题干无关的直接划掉"], "guess": "政治选择排除法最稳，先排再猜"}, {"t": "相向法", "tips": ["选项两两意思相反，答案多在相反项之中", "选「最符合题意」而非「最正确」"]}, {"t": "陌生概念", "tips": ["命题人常把正确新表述放成陌生选项，别因为不熟就划掉", "反向：明显违背常识/政策的直接排除"]}, {"t": "时事题", "tips": ["选「积极/发展/人民/社会/高质量」取向的", "涉及国家主权、统一的表述必选正确"]}, {"t": "蒙题兜底", "tips": ["单选不会：在中间两项二选一（弱）", "多选不会：保守选2-3项，别全选", "优先选含「建设/发展/人民」的"]}]}, {"type": "cards", "title": "必背核心（四条线）", "tag": "速记", "cards": [{"t": "马原", "tips": ["物质决定意识，意识对物质有反作用", "对立统一规律是唯物辩证法实质与核心", "实践-认识：实践是检验真理的唯一标准", "社会基本矛盾：生产力与生产关系、经济基础上层建筑"]}, {"t": "毛中特/新时代", "tips": ["主要矛盾：美好生活需要 vs 不平衡不充分发展", "五位一体：经济/政治/文化/社会/生态", "四个全面：小康(已收官)/改革/法治/治党", "新发展理念：创新协调绿色开放共享", "中国梦：国家富强、民族振兴、人民幸福"]}, {"t": "近现代史", "tips": ["三大历史任务：现代化、祖国统一、世界和平", "党史关键：一大(1921)/遵义会议/十一届三中全会", "三步走：站起来→富起来→强起来"]}, {"t": "思修", "tips": ["理想信念是精神之钙", "社会主义核心价值观：富强民主文明和谐(国家)/自由平等公正法治(社会)/爱国敬业诚信友善(个人)", "道德与法律相辅相成"]}]}, {"type": "cards", "title": "时政押题（2025-2026）", "tag": "时政", "cards": [{"t": "重大时政关键词", "tips": ["二十大精神、二十届三中(全面深化改革)", "十四五规划收官、高质量发展", "科技创新(人工智能/新质生产力)", "乡村振兴、共同富裕", "人类命运共同体、中国式现代化", "生态文明建设、双碳目标"]}]}]}], "locator": [{"sym": "极限选择题老错 / 看到 lim 就懵", "mod": "数学秒题", "where": "极限关(g2)·34题", "do": "等价无穷小+洛必达，不会蒙0/1/2", "goto": {"screen": "s-mathsec"}}, {"sym": "导数/切线/极值题丢分", "mod": "数学秒题", "where": "导数关(g3)·67题", "do": "背熟求导公式，切线套模板", "goto": {"screen": "s-mathsec"}}, {"sym": "积分/原函数/面积题不会", "mod": "数学秒题", "where": "积分关(g4)·62题", "do": "换元+分部+奇偶对称", "goto": {"screen": "s-mathsec"}}, {"sym": "偏导/全微分看不懂", "mod": "数学秒题", "where": "多元+概率关(g5)", "do": "把y当常数求偏导", "goto": {"screen": "s-mathsec"}}, {"sym": "概率题总错", "mod": "数学秒题", "where": "多元+概率关(g5)", "do": "古典概型+排除>1", "goto": {"screen": "s-mathsec"}}, {"sym": "选择题整体慢/没章法", "mod": "数学秒题", "where": "通用四把刀(g1)", "do": "代入验证+特殊值", "goto": {"screen": "s-mathsec"}}, {"sym": "大题不会写过程/步骤乱", "mod": "大题步骤分", "where": "五步骨架(g1)", "do": "把步骤排回正确顺序", "goto": {"screen": "s-stepscore"}}, {"sym": "极限/导数/积分大题没思路", "mod": "大题步骤分", "where": "极限/导数/积分模板(g2-g4)", "do": "先写「由…公式得」", "goto": {"screen": "s-stepscore"}}, {"sym": "英语作文写不出/凑不够", "mod": "作文", "where": "作文25分模块", "do": "三段式骨架+必背句型/谚语", "goto": {"screen": "s-essay"}}, {"sym": "完形填空错得多", "mod": "完形80%", "where": "完形专项(g1-g6)", "do": "三色词表+决策树+组合规则", "goto": {"screen": "s-cloze"}}, {"sym": "词组/词汇记不住", "mod": "词组速记", "where": "词组257条", "do": "10大类+配对小游戏", "goto": {"screen": "s-phrase"}}, {"sym": "政治大题不会答/踩不到点", "mod": "主观题抢分", "where": "万能模板+关键词踩点", "do": "原理+材料+分点列条", "goto": {"screen": "s-cards", "subj": "pol"}}, {"sym": "政治选择错得多", "mod": "政治考点", "where": "三色考点20条/模拟卷", "do": "考点速记+混合刷题", "goto": {"screen": "s-cards", "subj": "pol"}}, {"sym": "政治时政不会", "mod": "时政题库", "where": "2025-2026时政", "do": "96选择+56口诀卡", "goto": {"screen": "s-cards", "subj": "pol"}}, {"sym": "想模拟整卷节奏", "mod": "混合刷题", "where": "全部模块", "do": "跨知识点摸底自测", "goto": {"screen": "s-study"}}], "myths": [{"t": "特殊常数 0/1 是红花", "body": "实测0命中23%、1命中27%≈随机25%；e出现5次全错、π2次全错——更像干扰项。", "v": "证伪"}, {"t": "选项重复元素优先选", "body": "答案与随机基线都≈65%，提升仅0.2点；换成严格口径+3.8点不显著。", "v": "证伪"}, {"t": "排除最大最小中间二选一", "body": "答案落极值占48%≈随机50%；真题偏极值56% vs 模拟偏中间62%，方向相反。", "v": "证伪"}, {"t": "答案位置有偏置(A/B/C/D挑多)", "body": "真题A31/B31/C32/D30，chi²=0.06完全均匀；模拟偏B只是出题者习惯。", "v": "证伪"}, {"t": "弱信号：1/2与−1倾向干扰项", "body": "1/2对1/14、−1对2/14；题干全是正数时答案几乎不为负。p未达显著，只能降权。", "v": "弱成立"}, {"t": "✅ 极限题蒙 0/1/2（唯一硬规律）", "body": "极限选择34题中20题答案为0/1/2，命中59%（p=2.9e-5显著）。仅限极限题、仅最后1分钟完全空白时用。", "v": "硬规律"}], "discipline": ["秒题只对选择题有效；解答题262道(55%)必须写过程拿步骤分。", "公式表 > 任何技巧；先写公式再算数，公式分占30%是最大漏点。", "蒙题垫底：极限蒙0/1/2、概率排除>1、其余不猜位置；英语蒙题可靠性高于数学。", "政治大题分点列条、关键词前置；选择题用排除法+相向法最稳。", "英语作文三段式+字数够，比华丽句式更值钱；交际用语选最客气项。"]};
/* 速查模块渲染逻辑（与 quickref_pol.js 内的 window.QUICKREF 一起由 index.html 加载）
 * 约定：index.html 的 <section id="s-quickref"> 内只需 <div id="quickrefBody"></div>。
 * 本文件只依赖全局 go() / FILTER / toast() / localStorage，均为 App 既有环境。 */
(function(){
  function byId(id){ return document.getElementById(id); }

  // 注入专属样式（自包含，不依赖 index.html 的 CSS 块）
  function injectStyle(){
    if(document.getElementById('qrStyle')) return;
    var css = ''
    + '.qr-tabs{position:sticky;top:0;z-index:5;display:flex;gap:6px;overflow-x:auto;padding:8px 0 6px;'
    +   'background:linear-gradient(180deg,rgba(12,8,20,.98),rgba(12,8,20,.82));backdrop-filter:blur(8px);margin:0 -2px}'
    + '.qr-tab{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:1px;min-width:52px;padding:6px 9px;border-radius:12px;'
    +   'border:1px solid var(--line);background:var(--panel2);color:var(--sub);cursor:pointer;font-size:11px;transition:.15s}'
    + '.qr-tab .qr-tab-i{font-size:15px;line-height:1}'
    + '.qr-tab.on{color:#1a1030;background:var(--c);border-color:var(--c);box-shadow:0 0 14px color-mix(in srgb,var(--c) 50%,transparent)}'
    + '.qr-search{margin:6px 0 8px}'
    + '.qr-search input{width:100%;box-sizing:border-box;padding:9px 12px;border-radius:12px;border:1px solid var(--line);'
    +   'background:var(--panel);color:var(--txt);font-size:13px;outline:none}'
    + '.qr-search input:focus{border-color:var(--cyan)}'
    + '.qr-actions{display:flex;gap:8px;margin:4px 0 10px}'
    + '.qr-actions .btn.sm{padding:7px 11px;font-size:12px}'
    + '.qr-card{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:12px 13px;margin:0 0 11px}'
    + '.qr-sec{font-weight:800;font-size:14px;color:var(--txt);margin-bottom:8px;padding-left:10px;border-left:4px solid var(--purple);line-height:1.3}'
    + '.qr-tag{font-size:10px;color:var(--magenta);background:rgba(255,138,209,.14);padding:1px 7px;border-radius:999px;margin-left:6px;vertical-align:middle}'
    + '.qr-intro{font-size:12px;color:var(--sub);line-height:1.6;margin:-2px 0 8px}'
    + '.qr-tbl{overflow-x:auto}'
    + '.qr-tbl table{width:100%;border-collapse:collapse;font-size:12px}'
    + '.qr-tbl th,.qr-tbl td{border:1px solid var(--line);padding:6px 7px;text-align:left;vertical-align:top;color:var(--txt)}'
    + '.qr-tbl th{background:rgba(255,255,255,.05);color:var(--sub);font-weight:700;white-space:nowrap}'
    + '.qr-tbl tr:nth-child(even) td{background:rgba(255,255,255,.025)}'
    + '.qr-ol,.qr-tips,.qr-steps{margin:4px 0;padding-left:18px;font-size:12.5px;line-height:1.7;color:var(--txt)}'
    + '.qr-tips li,.qr-ol li,.qr-steps li{margin:3px 0}'
    + '.qr-sub{margin:8px 0 0}'
    + '.qr-card-h{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:10px;background:var(--panel2);'
    +   'border:1px solid var(--line);cursor:pointer;font-size:13px;font-weight:700;color:var(--txt);user-select:none}'
    + '.qr-card-h.open{background:color-mix(in srgb,var(--purple) 22%,var(--panel2))}'
    + '.qr-dot{width:10px;height:10px;border-radius:3px;flex:0 0 auto}'
    + '.qr-mini{font-size:10px;color:var(--sub);font-weight:500}'
    + '.qr-arr{margin-left:auto;transition:.18s;color:var(--sub)}'
    + '.qr-card-h.open .qr-arr{transform:rotate(180deg);color:var(--cyan)}'
    + '.qr-card-body{padding:8px 4px 2px}'
    + '.qr-row{display:grid;grid-template-columns:78px 1fr;gap:6px 10px;font-size:12.5px;margin:4px 0}'
    + '.qr-row b{color:var(--sub);font-weight:700}'
    + '.qr-row span{color:var(--txt)}'
    + '.qr-formula{font-family:"Cambria Math","Times New Roman",serif;background:rgba(255,209,102,.10);border:1px solid rgba(255,209,102,.3);'
    +   'border-radius:8px;padding:8px 10px;margin:6px 0;font-size:12.5px;color:#ffe6a8;line-height:1.7}'
    + '.qr-key{font-size:12px;color:var(--cyan);margin:5px 0;line-height:1.6}'
    + '.qr-guess{font-size:12.5px;color:#ffd166;font-weight:700;margin:6px 0 2px;line-height:1.6}'
    + '.qr-warn{border:1px solid rgba(255,122,156,.45);background:rgba(255,122,156,.10);border-radius:14px;padding:12px 13px;margin:0 0 11px}'
    + '.qr-warn-t{font-weight:800;font-size:13.5px;color:var(--red);margin-bottom:6px}'
    + '.qr-ok{border:1px solid rgba(91,227,167,.45);background:rgba(91,227,167,.10);border-radius:14px;padding:11px 13px;'
    +   'font-size:12.5px;color:var(--green);line-height:1.7;margin:0 0 11px}'
    + '.qr-flow{display:flex;flex-wrap:wrap;gap:5px;align-items:center;font-size:12px}'
    + '.qr-step{border:1px solid var(--line);background:var(--panel2);border-radius:8px;padding:4px 8px;color:var(--txt)}'
    + '.qr-arrow{color:var(--dim);font-weight:700}'
    + '.qr-loc{display:flex;flex-direction:column;gap:9px}'
    + '.qr-loc-row{display:flex;align-items:center;gap:10px;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:10px 12px}'
    + '.qr-loc-l{flex:1;min-width:0}'
    + '.qr-loc-sym{font-size:13px;font-weight:800;color:var(--txt);line-height:1.35}'
    + '.qr-loc-to{font-size:11.5px;color:var(--magenta);margin:2px 0}'
    + '.qr-loc-do{font-size:11.5px;color:var(--sub);line-height:1.5}'
    + '.qr-loc-btn{flex:0 0 auto;white-space:nowrap}'
    ;
    var st = document.createElement('style'); st.id = 'qrStyle'; st.textContent = css;
    document.head.appendChild(st);
  }

  // 跳转到对应练习模块（薄弱点定位器用）
  function qrGoto(screen, subj){
    try{
      if(subj && window.FILTER) window.FILTER.subj = subj;
      if(window.go) window.go(screen);
    }catch(e){ if(window.toast) window.toast('跳转失败：'+e.message); }
  }

  function qrTab(k){
    try{ localStorage.setItem('qr_tab', JSON.stringify(k)); }catch(e){}
    renderQuickRef();
  }

  // 即时搜索：按文字命中显隐卡片
  function qrSearch(v){
    var c = byId('qrContent'); if(!c) return;
    v = (v||'').trim();
    c.querySelectorAll('.qr-card').forEach(function(card){
      var body = card.querySelector('.qr-card-body');
      var head = card.querySelector('.qr-card-h');
      var ok = !v || (card.textContent||'').indexOf(v) >= 0;
      card.style.display = ok ? '' : 'none';
    });
  }

  // 单个卡片展开/收起
  function qrToggle(id){
    var body = byId('qrb-'+id), head = byId('qrh-'+id);
    if(!body) return;
    var hidden = body.style.display === 'none';
    body.style.display = hidden ? '' : 'none';
    if(head) head.classList.toggle('open', hidden);
  }

  // 展开/收起全部（只作用于有 body 的卡片；表格/列表卡无 body，须跳过）
  function qrToggleAll(){
    var c = byId('qrContent'); if(!c) return;
    var bodies = c.querySelectorAll('.qr-card-body');
    var anyHidden = false;
    bodies.forEach(function(b){ if(b.style.display === 'none') anyHidden = true; });
    bodies.forEach(function(b){
      b.style.display = anyHidden ? '' : 'none';
      var h = b.parentElement ? b.parentElement.querySelector('.qr-card-h') : null;
      if(h) h.classList.toggle('open', anyHidden);
    });
    var btn = byId('qrAllBtn'); if(btn) btn.textContent = anyHidden ? '⬆ 收起全部' : '⬇ 展开全部';
  }

  // 随机抽一张：挑一个子卡并跳到对应科目
  function qrRandom(){
    var D = window.QUICKREF; if(!D) return;
    var pool = [];
    D.subjects.forEach(function(s){
      s.parts.forEach(function(p){
        if(p.type === 'cards') p.cards.forEach(function(c){ pool.push({key:s.key, name:s.name, t:c.t}); });
      });
    });
    if(!pool.length) return;
    var r = pool[Math.floor(Math.random()*pool.length)];
    if(window.toast) window.toast('🎲 '+r.name+' · '+r.t);
    qrTab(r.key);
  }

  // ---------- 部件渲染 ----------
  function renderTable(part){
    var h = '<div class="qr-card"><div class="qr-sec">'+escT(part.title)+ (part.tag?' <span class="qr-tag">'+escT(part.tag)+'</span>':'') +'</div>';
    h += '<div class="qr-tbl"><table><thead><tr>';
    part.cols.forEach(function(c){ h += '<th>'+escT(c)+'</th>'; });
    h += '</tr></thead><tbody>';
    part.rows.forEach(function(r){
      h += '<tr>'; r.forEach(function(cell){ h += '<td>'+escT(cell)+'</td>'; }); h += '</tr>';
    });
    h += '</tbody></table></div></div>';
    return h;
  }

  function renderOlist(part){
    var h = '<div class="qr-card"><div class="qr-sec">'+escT(part.title)+(part.tag?' <span class="qr-tag">'+escT(part.tag)+'</span>':'')+'</div><ol class="qr-ol">';
    part.items.forEach(function(it){ h += '<li>'+escT(it)+'</li>'; });
    h += '</ol></div>';
    return h;
  }

  function renderCards(part, color){
    var id0 = 'p'+(part.__id||0);
    var h = '<div class="qr-card"><div class="qr-sec">'+escT(part.title)+(part.tag?' <span class="qr-tag">'+escT(part.tag)+'</span>':'')+'</div>';
    if(part.intro) h += '<div class="qr-intro">'+escT(part.intro)+'</div>';
    (part.cards||[]).forEach(function(card, idx){
      var cid = id0+'-'+idx;
      h += '<div class="qr-sub">'
        +  '<div class="qr-card-h" id="qrh-'+cid+'" onclick="qrToggle(\''+cid+'\')"><span class="qr-dot" style="background:'+color+'"></span>'+escT(card.t)
        +    (card.cov?' <span class="qr-mini">'+escT(card.cov)+'</span>':'')
        +    '<span class="qr-arr">▾</span></div>'
        +  '<div class="qr-card-body" id="qrb-'+cid+'" style="display:none">';
      if(card.kw) h += '<div class="qr-row"><b>题面关键词</b><span>'+escT(card.kw)+'</span></div>';
      if(card.tips && card.tips.length){
        h += '<ul class="qr-tips">'; card.tips.forEach(function(t){ h += '<li>'+escT(t)+'</li>'; }); h += '</ul>';
      }
      if(card.steps && card.steps.length){
        h += '<ol class="qr-steps">'; card.steps.forEach(function(s){ h += '<li>'+escT(s)+'</li>'; }); h += '</ol>';
      }
      if(card.formula) h += '<div class="qr-formula">'+escT(card.formula)+'</div>';
      if(card.key) h += '<div class="qr-key">★ '+escT(card.key)+'</div>';
      if(card.guess) h += '<div class="qr-guess">🎯 '+escT(card.guess)+'</div>';
      h += '</div></div>';
    });
    h += '</div>';
    return h;
  }

  function renderWarn(part){
    var h = '<div class="qr-warn"><div class="qr-warn-t">'+escT(part.title)+'</div><ul class="qr-tips">';
    (part.items||[]).forEach(function(it){ h += '<li>'+escT(it)+'</li>'; });
    h += '</ul></div>';
    return h;
  }

  function renderSubject(subj, box){
    var h = '';
    (subj.parts||[]).forEach(function(p, i){
      p.__id = i;
      if(p.type === 'table') h += renderTable(p);
      else if(p.type === 'olist') h += renderOlist(p);
      else if(p.type === 'cards') h += renderCards(p, subj.color);
      else if(p.type === 'warn') h += renderWarn(p);
    });
    box.innerHTML = h;
  }

  function renderOverview(D, box){
    var o = D.overview; var h = '';
    h += '<div class="qr-card"><div class="qr-sec">🧭 标准作战流程（每套≈20分钟）</div><div class="qr-flow">';
    (o.flow||[]).forEach(function(s, i){
      h += '<span class="qr-step">'+escT(s)+'</span>'; if(i < (o.flow.length-1)) h += '<span class="qr-arrow">→</span>';
    });
    h += '</div></div>';
    if(o.budget && o.budget.length){
      h += '<div class="qr-card"><div class="qr-sec">⏱️ 时间预算（6套为例）</div><div class="qr-tbl"><table><thead><tr>';
      o.budget[0].forEach(function(c){ h += '<th>'+escT(c)+'</th>'; });
      h += '</tr></thead><tbody>';
      o.budget.slice(1).forEach(function(r){ h += '<tr>'; r.forEach(function(cell){ h += '<td>'+escT(cell)+'</td>'; }); h += '</tr>'; });
      h += '</tbody></table></div></div>';
    }
    h += '<div class="qr-card"><div class="qr-sec">🎒 随身装备</div><ul class="qr-tips">';
    (o.kit||[]).forEach(function(k){ h += '<li>'+escT(k)+'</li>'; });
    h += '</ul></div>';
    h += '<div class="qr-ok">★ 核心心法：'+escT(o.mindset||'')+'</div>';
    box.innerHTML = h;
  }

  function renderLocator(D, box){
    var h = '<div class="qr-card"><div class="qr-sec">🎯 薄弱点定位器</div><div class="qr-intro">做完卷，按「症状」对号入座，点按钮直接跳去 App 对应模块专练。</div></div>';
    h += '<div class="qr-loc">';
    (D.locator||[]).forEach(function(it){
      var subj = it.subj || '';
      h += '<div class="qr-loc-row">'
        +  '<div class="qr-loc-l"><div class="qr-loc-sym">'+escT(it.sym)+'</div>'
        +    '<div class="qr-loc-to">→ '+escT(it.mod)+' · '+escT(it.where||'')+'</div>'
        +    '<div class="qr-loc-do">'+escT(it.do||'')+'</div></div>'
        +  '<button class="btn gold sm qr-loc-btn" onclick="qrGoto(\''+(it.goto&&it.goto.screen||'s-study')+'\',\''+(it.goto&&it.goto.subj||'')+'\')">去练 →</button>'
        + '</div>';
    });
    h += '</div>';
    box.innerHTML = h;
  }

  function escT(s){ if(s===undefined||s===null) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function renderQuickRef(){
    var D = window.QUICKREF; if(!D) return;
    var root = byId('quickrefBody'); if(!root) return;
    injectStyle();
    var st = null; try{ st = JSON.parse(localStorage.getItem('qr_tab')||'null'); }catch(e){}
    var valid = ['overview'].concat(D.subjects.map(function(s){return s.key;}), ['locator']);
    var active = (st && valid.indexOf(st)>=0) ? st : 'overview';

    var tabs = [{k:'overview',n:'总纲',c:'#5ee0f0',i:'🧭'}];
    D.subjects.forEach(function(s){ tabs.push({k:s.key,n:s.name,c:s.color,i:s.ico}); });
    tabs.push({k:'locator',n:'速定位',c:'#5be3a7',i:'🎯'});

    var h = '<div class="qr-tabs">';
    tabs.forEach(function(t){
      h += '<button class="qr-tab'+(t.k===active?' on':'')+'" data-k="'+t.k+'" onclick="qrTab(\''+t.k+'\')" style="--c:'+t.c+'">'
        +  '<span class="qr-tab-i">'+t.i+'</span><span class="qr-tab-n">'+t.n+'</span></button>';
    });
    h += '</div>';

    if(active !== 'overview' && active !== 'locator'){
      h += '<div class="qr-search"><input id="qrSearchIn" placeholder="🔍 搜关键词 / 公式 / 套路…" oninput="qrSearch(this.value)"></div>';
    }
    h += '<div class="qr-actions"><button class="btn ghost sm" onclick="qrRandom()">🎲 抽一张</button>'
      +  '<button class="btn ghost sm" id="qrAllBtn" onclick="qrToggleAll()">⬇ 展开全部</button></div>';
    h += '<div class="qr-content" id="qrContent"></div>';
    root.innerHTML = h;

    var box = byId('qrContent');
    if(active === 'overview') renderOverview(D, box);
    else if(active === 'locator') renderLocator(D, box);
    else { var s = D.subjects.filter(function(x){return x.key===active;})[0]; if(s) renderSubject(s, box); }

    try{ window.scrollTo(0,0); }catch(e){}
  }

  // ---------- 入口 / 返回 ----------
  function startQuickRef(){ try{ if(window.go) window.go('s-quickref'); }catch(e){} }
  function quickrefBack(){ try{ if(window.go) window.go('s-study'); }catch(e){} }

  window.renderQuickRef = renderQuickRef;
  window.startQuickRef = startQuickRef;
  window.quickrefBack = quickrefBack;
  window.qrTab = qrTab; window.qrSearch = qrSearch; window.qrToggle = qrToggle;
  window.qrToggleAll = qrToggleAll; window.qrRandom = qrRandom; window.qrGoto = qrGoto;
})();
