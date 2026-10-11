/* 作文 25 分 · 模板速成模块（window.ESSAY80）
 * 数据源：《英语写作范文及模板》35页OCR（10模板+100万能句型+5类主题词汇+100谚语）
 *        + 本科英语作文2026.pdf 万能模板 + 2019-2025 成考专升本英语真题作文（含官方五档评分标准）
 * 结构：meta / copy3 / bands / templates / sentences / themes / proverbs / slots / real / stages / Q
 * 说明：真题要点与评分标准为官方口径；范文为按模板写的参考范文（2025年通知为真题网传范文）。
 * ========================================================================== */
window.ESSAY80 = {
meta:{
  title:'作文 25 分 · 模板速成',
  tip:'死骨架 + 活槽位：背一副骨架，练"抄题三步法"，活动/时间/地点全部抄题填空，7 年真题对照范文库。全卷性价比最高的 25 分。',
  mate:'xue',
  coverage:'17+',
  total_q:133,
  real_n:7,
  src:'写作模板35页OCR + 2019-2025真题 + 官方评分标准'
},

/* 抄题三步法 —— 解决「活动/日期不会写」的核心方法 */
copy3:[
  {t:'① 圈：圈要点',d:'圈出题目里的人名、活动、时间、地点——这四个就是评分的"内容要点"（约10分），漏一个扣一档。7 年真题每一年都有这四样。'},
  {t:'② 抄：原词抄进槽位',d:'人名照抄（Prof. Smith / Tim / John）；时间套 on+某天、at+时刻、from A to B；地点套 in/at+地方。抄的词零语法风险，比现场造句稳十倍。'},
  {t:'③ 兜：没给的就去词库拿',d:'题目没写时间地点？去槽位词库拿万能货：活动=an English speech contest，时间=this Friday evening，理由=broaden our horizons。写不出长句就写短句，宁简勿错。'}
],
copyWarn:'⚠️ 抄题≠抄阅读理解：写作题干里的要点词可以化用，但绝不能整句抄阅读理解的原文（直接判 0 分）。',

/* 官方评分五档（满分25，100-120词，不足80词扣2-5分，书写差降一档） */
bands:[
  {r:'21-25',t:'第五档',d:'主题突出；内容充实、层次分明；行文流畅；语法结构与词汇丰富；基本无语言错误。'},
  {r:'16-20',t:'第四档',d:'主题明确；内容完整、层次清楚；文字连贯；语法结构有变化，词汇较丰富；少量错误。'},
  {r:'11-15',t:'第三档',d:'基本完成任务；内容尚完整、有层次；语句较通顺；有错误但不影响表达。'},
  {r:'6-10',t:'第二档',d:'未按要求完成任务；内容不完整、层次不清；错误较多，影响表达。'},
  {r:'1-5',t:'第一档',d:'明显跑题；内容贫乏、结构混乱；语句不通顺、严重错误。'},
  {r:'0',t:'零分',d:'所写内容与试题要求毫不相关，或整段抄阅读理解原文。'}
],

/* 十大模板（素材1，保留原挖空，______ 为填槽位） */
templates:[
 {id:'t1',name:'① 图画型作文',icon:'🖼️',paras:[
   'As can be seen from the picture, ______. This picture depicts something that ______.',
   'Of course, ______. But I think we\'d better ______ as ______ is demonstrated in each and every aspect of work and life. To begin with, ______. Secondly, ______.',
   'For my part, ______. And since ______, we should make every effort to ______.'],
  notes:'① 简述图画内容，引出现象 ② 两方面展开分析（To begin with / Secondly）③ 亮明观点收尾'},
 {id:'t2',name:'② 名言谚语型作文',icon:'💬',paras:[
   '______, as the saying goes. It highlights ______. A typical case in point is ______.',
   '______ is ______ in many aspects. To begin with, ______. In addition, ______. Finally, ______.',
   'The ______ goes far beyond what\'s mentioned above. Chances are that ______. Therefore, ______.'],
  notes:'① 开门见山引名言并评论 ② 具体分析三点 ③ 重申话题'},
 {id:'t3',name:'③ 原因分析型作文',icon:'🔍',paras:[
   'In recent years, it has become a widespread problem that ______.',
   'The major reasons for ______ can be listed as follows. Firstly, ______. Secondly, ______.',
   'Considering the seriousness of this problem, effective efforts should be made. Most importantly, people should ______. Furthermore, it is necessary that ______.'],
  notes:'① 提出现象 ② 两方面分析原因（Firstly/Secondly）③ 提出解决办法'},
 {id:'t4',name:'④ 观点对照型作文',icon:'⚔️',paras:[
   'Nowadays it is common to see ______. Toward this phenomenon, people hold different opinions.',
   'Some people believe that ______. Therefore, it is advisable that ______. Other people insist that ______ should not ______ and instead they should ______.',
   'As a university student, I think both ______ and ______ are ______. What we should bear in mind is that ______.'],
  notes:'① 概述现象引出话题 ② 两派观点（Some... Other...）③ 以大学生身份亮出自己看法'},
 {id:'t5',name:'⑤ 分析利弊型作文',icon:'⚖️',paras:[
   'Nowadays ______ have become very popular and it is not uncommon to ______.',
   '______, as is the case with many issues, have both merits and demerits. On the one hand, ______ can provide excellent opportunities for ______ to ______. On the other hand, they may mislead ______ and make them believe that ______, ignoring the fact of ______.',
   'As far as I am concerned, ______ is like a double-edged sword, which can do both good and harm. It is extremely important for us to face it properly.'],
  notes:'① 交代现状 ② On the one hand 利 / On the other hand 弊 ③ 双刃剑结论（万能收尾句）'},
 {id:'t6',name:'⑥ 观点阐述型作文',icon:'🧭',paras:[
   'Some people regard ______ as ______, others ______. For me, a good balance between ______ and ______ means ______.',
   'Firstly, ______ are of equal importance in our lives. It becomes meaningless when we ______ but are not able to ______. Secondly, ______. If we ______, we might find that ______. While if we concentrated only on ______, we might end up accomplishing nothing.',
   'To sum up, ______ in my eyes means ______.'],
  notes:'① 引出话题并亮观点 ② 两角度论证 ③ 总结重申'},
 {id:'t7',name:'⑦ 图表型作文',icon:'📊',paras:[
   'The graph demonstrates that the number of ______ is ______ rapidly in ______.',
   'This phenomenon arouses a deep concern about ______. In fact, it is reported that ______.',
   'To ______, it is suggestive that ______. Besides, ______ should ______. With these joint efforts, it is hopeful that ______.'],
  notes:'① 描述图表数据 ② 结合数据做分析 ③ 提出建议'},
 {id:'t8',name:'⑧ 建议信',icon:'💌',paras:[
   'Dear ______, As a ______, I feel that it is my obligation to make suggestions concerning the ______.',
   'In the first place, I would like to take this opportunity to express my gratitude for ______. However, ______. It would be much better if ______.',
   'I would be more than happy if my suggestion could be considered and positive changes take place in this regard. Yours sincerely, Li Yuan'],
  notes:'① 自我介绍+写信原因 ② 先肯定后指问题、礼貌提建议 ③ 期望+感谢'},
 {id:'t9',name:'⑨ 投诉信',icon:'📮',paras:[
   'Dear ______, I am writing to lodge the complaint about ______.',
   'On ______, I ______. But later when I ______, I found that ______.',
   'Here I request ______. I would appreciate your assistance and inspection into this matter. I am looking forward to your early reply. Yours sincerely, Li Yuan'],
  notes:'① 提出投诉内容 ② 描述事情经过（时间+经过+发现问题）③ 提出处理要求'},
 {id:'t10',name:'⑩ 谢绝职位信',icon:'🙏',paras:[
   'Dear ______, Thank you very much for offering me the position of ______. I am really grateful that you think I\'m equal to this job. However, I am so sorry to say that I have to decline this job.',
   'It\'s not because ______. In fact, ______. It\'s a difficult decision to make, but I ______.',
   'I am really sorry if I cause you any inconvenience. But I resolutely believe that you can find a more suitable person for this position. Respectfully yours, Li Yuan'],
  notes:'① 感谢+说明不能接受 ② 说明原因 ③ 歉意+祝福'}
],

/* 100 条万能句型（素材2，11 类） */
sentCats:['描述图画','名言谚语','提出现象','不同观点','分析原因','优缺点影响','提建议办法','个人观点','图表趋势','写信目的','书信期望'],
sentences:[
 {c:0,en:'As is shown in the picture, ...',zh:'如图所示，……'},
 {c:0,en:'As is depicted in the picture, ...',zh:'如图所示，……'},
 {c:0,en:'As we can see from the picture, ...',zh:'通过图画我们可以看到……'},
 {c:0,en:'As can be seen from the picture, ...',zh:'通过图画我们可以看到……'},
 {c:0,en:'The picture depicts that...',zh:'图中描绘了这样一个场景……'},
 {c:0,en:'The picture shows that...',zh:'图画显示……'},
 {c:0,en:'The picture vividly portrays...',zh:'图画生动地描绘了……'},
 {c:0,en:'The picture depicts a phenomenon that exists widely among...',zh:'这幅图描绘了一种广泛存在于……的现象'},
 {c:0,en:'This picture reveals something true of...',zh:'这幅图揭示了有关……的一些真相'},
 {c:0,en:'This picture depicts something that...',zh:'这幅图描述了……'},
 {c:1,en:'"...": This is not a saying about... but one about...',zh:'这一谚语并不关乎……，而是关乎……'},
 {c:1,en:'The saying that "..." best illustrates...',zh:'引言"……"很好地阐述了……'},
 {c:1,en:'There goes a saying that "...". This saying tells us that...',zh:'有一句话这样说……。这句话告诉我们……'},
 {c:1,en:'"...". The proverb tells us that...',zh:'这句谚语告诉人们……'},
 {c:1,en:'..., as the saying goes. It highlights...',zh:'俗话说得好……。这句话强调了……'},
 {c:2,en:'In recent years, increasingly more people have turned to...',zh:'近年来，转向……的人呈上升趋势'},
 {c:2,en:'The boom of... is attracting much attention in recent years.',zh:'……的热潮近年来吸引了很多注意力'},
 {c:2,en:'Nowadays we are exposed to...',zh:'如今我们经常接触……'},
 {c:2,en:'Nowadays, it is no surprise to find out that...',zh:'如今，发现……已不足为奇'},
 {c:2,en:'..., for its obvious value in the modern world, has become the first choice.',zh:'……由于其在现代世界中的明显价值，已成为第一选择'},
 {c:2,en:'There have been reports that...',zh:'有许多报道称……'},
 {c:2,en:'Surveys reveal that...',zh:'调查显示……'},
 {c:2,en:'In recent years, newspaper headlines have seen many...',zh:'近年来，……经常出现在新闻头条里'},
 {c:2,en:'Nowadays, ... has been a high frequency phrase in media reports.',zh:'如今，……成了媒体报道中的高频词'},
 {c:2,en:'... has grown to be more and more popular in recent years.',zh:'近年来，……变得越来越热门'},
 {c:2,en:'... has turned... into a heated issue.',zh:'……使……成为了一个热门话题'},
 {c:2,en:'Due to..., there has been an increase in... in recent years.',zh:'由于……，近年来……不断增多'},
 {c:2,en:'These days... has received much popularity among young people.',zh:'如今，……在年轻人中十分流行'},
 {c:2,en:'... has been constantly heating up all over the world.',zh:'……在全世界持续升温'},
 {c:2,en:'As a popular form of leisure and entertainment, ... is what many people look forward to.',zh:'作为流行的休闲娱乐方式，……是很多人所期待的'},
 {c:2,en:'In recent years, it has become a widespread problem that...',zh:'近年来有一个普遍的问题，就是……'},
 {c:2,en:'Nowadays, ... has become a serious problem in...',zh:'如今，……在……已经成为一个严重的问题'},
 {c:3,en:'People hold different opinions towards this phenomenon. Some people think... On the contrary, others believe...',zh:'人们对此现象看法不一。有些人认为……相反，另一些人认为……'},
 {c:3,en:'People\'s view differs toward this phenomenon. Some of them are afraid that... Whereas, some others hold that...',zh:'对此现象人们的看法不一。一些人担心……然而另一些人却认为……'},
 {c:3,en:'Is it necessary to...? It is a controversial question. ... is in favor of... However, there are still quite a few people who...',zh:'有必要……吗？这是一个有争议的问题。……赞成……然而仍有不少人……'},
 {c:3,en:'People\'s view on... differs greatly. Some people think... In contrast, others argue that...',zh:'人们对于……的看法大不相同。一些人认为……相反，另一些人争辩说……'},
 {c:3,en:'Heated discussion has been generated by this phenomenon. It is held by some people that... However, others disagree with the view mentioned above.',zh:'这一现象引发了热烈讨论。有些人认为……然而其他人不赞同上述观点'},
 {c:3,en:'Regarding..., people\'s opinions vary from person to person. Some people think that... Nevertheless, other people claim that...',zh:'关于……人们的看法因人而异。有些人认为……然而另外一些人称……'},
 {c:3,en:'People\'s opinions are divided on this issue. Some people hold that... In contrast, others think that...',zh:'大家对此的看法各异。一些人认为……但是其他一部分人认为……'},
 {c:3,en:'Different opinions can be perceived with regard to this phenomenon. One voice is that... In contrast, other people argue that...',zh:'对于此现象，我们可以发现不同的观点。一种观点认为……相反，另一种观点则认为……'},
 {c:3,en:'This phenomenon arouses much controversy. Some think that... But other people look at this with...',zh:'这种现象引起了很多争议。一些人认为……但另一些人则对此……'},
 {c:3,en:'People\'s view differs with regard to... Some claim that... In contrast, other people believe that...',zh:'关于……人们的看法各异。有人声称……相反，另一些人认为……'},
 {c:4,en:'One may ask, why...? For one thing, ... For another, ...',zh:'有人可能会问，为什么……？首先……其次……'},
 {c:4,en:'Among the reasons that lead to..., ... comes first. The second reason is... Besides, ...',zh:'导致……的原因中，……当属第一。第二个原因是……此外……'},
 {c:4,en:'There are mainly two reasons for this ... phenomenon. First, ... Second, ...',zh:'造成这种……现象的原因主要有两个。首先……其次……'},
 {c:4,en:'The reasons for... can be concluded as follows. Firstly, ... Secondly, ...',zh:'造成……的原因可以总结如下。首先……其次……'},
 {c:4,en:'The reasons behind can be listed as below. Firstly, ... Secondly, ...',zh:'背后的原因可以罗列如下：第一……第二……'},
 {c:4,en:'... is no doubt to blame. But... also should hold responsible for...',zh:'……无疑是一个原因。但……也要为……负责任'},
 {c:4,en:'... is the most important reason for... Another reason is that...',zh:'……是导致……最重要的原因。另一个原因是……'},
 {c:4,en:'The reasons are as follows. Firstly, ... Secondly, ...',zh:'理由如下：首先……其次……'},
 {c:4,en:'Why does... become a usual phenomenon in this field? First and foremost, ... Second, ... Third, ...',zh:'为什么……成了这个领域的常见现象呢？首先……其次……再次……'},
 {c:4,en:'The huge success of... should be attributed to... rather than...',zh:'……的成功应该归功于……而非……'},
 {c:5,en:'Evidence mounts that... does make people\'s life better. However, ... has brought about problems as well.',zh:'越来越多的证据表明……的确能让生活变得更美好。然而……也带来了一些问题'},
 {c:5,en:'..., as is the case with many issues, have both merits and demerits.',zh:'正如许多事物一样，……也是既有优点也有不足的'},
 {c:5,en:'As far as I am concerned, ... is like a double-edged sword, which can do both good and harm.',zh:'在我看来，……是一把双刃剑，既有利又有弊'},
 {c:5,en:'This may bring... with many disadvantages. The first disadvantage may be...',zh:'这可能会给……带来许多劣势。第一个劣势可能是……'},
 {c:5,en:'Indeed, ... has its advantages. Firstly, ... Secondly, ... But... also has so many challenges to meet.',zh:'的确，……有它的优势。首先……其次……但……也要面对许多挑战'},
 {c:5,en:'The first problem is... The second problem is... There exist other problems, too, such as...',zh:'第一个问题是……第二个问题是……还存在其他问题，如……'},
 {c:5,en:'However, sometimes problems arise. First, ... In addition, ...',zh:'然而有时候问题也会发生。首先……此外……'},
 {c:5,en:'As I see it, there are both benefits and drawbacks for... On the one hand, ... On the other hand, ...',zh:'在我看来，……有利也有弊。一方面……另一方面……'},
 {c:5,en:'... will pose health risks to both... and...',zh:'……可能增加……和……的健康风险'},
 {c:6,en:'In order to... in a proper way, it is suggestive that...',zh:'为了妥善……，建议……'},
 {c:6,en:'In view of the seriousness of this problem, it is urgent to...',zh:'鉴于问题的严重性，……是很紧迫的'},
 {c:6,en:'Facing these problems, some advice may be helpful. Most crucially, ... Furthermore, ...',zh:'面对这些问题，一些建议或许有帮助。最重要的是……此外……'},
 {c:6,en:'It will be very beneficial to..., so...',zh:'……将是十分有益的，所以……'},
 {c:6,en:'My advice is that...',zh:'我的建议是……'},
 {c:6,en:'To solve this problem, it is suggestive that... Moreover, ...',zh:'为解决这一问题，建议……。再者……'},
 {c:6,en:'As I see it, ... is closely related to..., so it is of great significance that...',zh:'在我看来，……与……息息相关。因此……很重要'},
 {c:6,en:'In order to..., effective measures should be taken immediately. Most urgently, ... Besides, ...',zh:'为了……，我们应该立即采取有效措施。最要紧的是……除此之外……'},
 {c:6,en:'In order to get rid of..., it is of great importance that... Additionally, ...',zh:'为了摆脱……，……非常重要。除此之外……'},
 {c:6,en:'... requires efforts from three aspects. Firstly, ... Secondly,... Thirdly, ...',zh:'……需要三方面的努力。首先……其次……最后……'},
 {c:6,en:'To change this situation, strong measures should be taken. Firstly, ... Secondly, ... Last but not least...',zh:'为了改善这种情况，应当采取强有力的措施。首先……其次……最后……'},
 {c:6,en:'In light of..., effective measures should be taken immediately. First of all, it is crucial that...',zh:'鉴于……，我们应立即采取有效措施。首先……是至关重要的'},
 {c:7,en:'For my part, ...',zh:'在我看来，……'},
 {c:7,en:'As I see it, ...',zh:'在我看来，……'},
 {c:7,en:'As for me, ...',zh:'对我而言，……'},
 {c:7,en:'Personally, I think...',zh:'我个人认为……'},
 {c:7,en:'From my mind\'s view, ...',zh:'在我看来，……'},
 {c:7,en:'From my standpoint, we should...',zh:'在我看来，我们应该……'},
 {c:7,en:'In my view, we should not...',zh:'在我看来，我们不应该……'},
 {c:7,en:'From my perspective, ... will not be replaced in the short term.',zh:'就我而言，……不可能在短期内被取代'},
 {c:7,en:'Taking the different opinions into account, I believe...',zh:'综合考虑不同观点，我认为……'},
 {c:7,en:'From my viewpoint, ... should be encouraged for they can...',zh:'在我看来，我们应当鼓励……，因为它们可以……'},
 {c:7,en:'As far as I am concerned, since..., they should...',zh:'我认为，既然……，他们应该……'},
 {c:8,en:'The graph demonstrates that the number of... is growing/declining rapidly in...',zh:'该图表显示，……期间……的数量快速增长/下降'},
 {c:8,en:'As is shown in the graph, the number of... increases/declines rapidly year by year.',zh:'正如图表所示，……人数每年在快速递增/递减'},
 {c:8,en:'The period... to... saw... increase/decrease in the number of...',zh:'……至……期间，……的数量出现了……的增长/减少'},
 {c:8,en:'It can be seen from the chart that... dropped/declined/fell/reduced to...',zh:'依图可见，……下降到了……'},
 {c:8,en:'It can be concluded from the chart that the number of... fluctuates between... and...',zh:'依图判断，……至……期间，……的数量出现了波动'},
 {c:9,en:'I am writing to apply for...',zh:'我此番来信希望申请……'},
 {c:9,en:'I am writing to invite you to...',zh:'我此番来信是邀请您……'},
 {c:9,en:'I am writing to lodge the complaint about...',zh:'我此番来信旨在投诉……'},
 {c:9,en:'I am writing to apologize for the fact...',zh:'我此番写信是为……向您道歉'},
 {c:9,en:'I feel that it is my obligation to make suggestions concerning the use of...',zh:'我认为我有责任就……的使用情况提一些建议'},
 {c:10,en:'It is our sincere hope that...',zh:'我们诚挚地希望……'},
 {c:10,en:'I indeed wish that...',zh:'我真诚地希望……'},
 {c:10,en:'I would appreciate your assistance and inspection into this matter.',zh:'若您能协助并调查此事，我将十分感谢'},
 {c:10,en:'I would really appreciate it if my suggestion could be considered.',zh:'如果您能够考虑我的这个建议，我将感激不尽'},
 {c:10,en:'I do appreciate your help and look forward to your early reply.',zh:'真心感谢您的帮助，并期望尽快得到您的答复'},
 {c:10,en:'It would be much appreciated if you could...',zh:'如果您能……，我将非常感谢'}
],

/* 5 类主题词汇（素材3，精选短语与高频词） */
themeCats:['校园生活','社会热点','道德价值','求职就业','日常应用文'],
themes:[
 {c:0,en:'campus',zh:'校园'},{c:0,en:'dormitory',zh:'宿舍'},{c:0,en:'roommate',zh:'室友'},
 {c:0,en:'spare time',zh:'业余时间'},{c:0,en:'part-time job',zh:'兼职工作'},
 {c:0,en:'after-school activities',zh:'课外活动'},{c:0,en:'the Student Union',zh:'学生会'},
 {c:0,en:'reading room',zh:'阅览室'},{c:0,en:'go over',zh:'温习'},{c:0,en:'hand in',zh:'上交'},
 {c:0,en:'miss a class',zh:'缺课'},{c:0,en:'sign up for a course',zh:'选课'},
 {c:0,en:'required course',zh:'必修课'},{c:0,en:'elective course',zh:'选修课'},
 {c:0,en:'major',zh:'主修科目'},{c:0,en:'final exam',zh:'期末考试'},
 {c:0,en:'broaden one\'s horizons',zh:'开阔眼界'},{c:0,en:'cultivate a sense of responsibility',zh:'培养责任感'},
 {c:0,en:'make contribution to society',zh:'对社会做贡献'},{c:0,en:'tap one\'s potential',zh:'挖掘潜能'},
 {c:0,en:'stimulate one\'s interest',zh:'激发兴趣'},{c:0,en:'quality education',zh:'素质教育'},
 {c:0,en:'distance education',zh:'远程教育'},{c:0,en:'develop creative mind',zh:'培养创造性思维'},
 {c:1,en:'surf on the Internet',zh:'网上冲浪'},{c:1,en:'online shopping',zh:'网上购物'},
 {c:1,en:'physical exercise',zh:'锻炼身体'},{c:1,en:'relieve the pressure of...',zh:'缓解……的压力'},
 {c:1,en:'arouse people\'s awareness',zh:'唤醒人们意识'},{c:1,en:'take preventive measures',zh:'采取预防措施'},
 {c:1,en:'greenhouse effect',zh:'温室效应'},{c:1,en:'energy crisis',zh:'能源危机'},
 {c:1,en:'sustainable development',zh:'可持续发展'},{c:1,en:'recycle',zh:'回收利用'},
 {c:1,en:'keep ecological balance',zh:'维护生态平衡'},{c:1,en:'garbage classification',zh:'垃圾分类'},
 {c:1,en:'endangered animals',zh:'濒危动物'},{c:1,en:'mass media',zh:'大众媒体'},
 {c:1,en:'artificial intelligence',zh:'人工智能'},{c:1,en:'make progress',zh:'取得进步'},
 {c:1,en:'increase efficiency',zh:'提高效率'},{c:1,en:'double-edged sword',zh:'双刃剑'},
 {c:1,en:'balanced diet',zh:'均衡饮食'},{c:1,en:'be harmful to one\'s health',zh:'对健康有害'},
 {c:1,en:'historic spots',zh:'历史名胜'},{c:1,en:'sightseeing',zh:'观光游览'},
 {c:1,en:'rush hour',zh:'上下班高峰'},{c:1,en:'traffic jam',zh:'交通拥堵'},
 {c:1,en:'break the traffic rule',zh:'违反交通规则'},{c:1,en:'speed limits',zh:'限速'},
 {c:2,en:'virtue',zh:'美德'},{c:2,en:'moral value',zh:'道德价值'},
 {c:2,en:'improve public morals',zh:'改进社会风气'},{c:2,en:'obey the law',zh:'守法'},
 {c:2,en:'be public-spirited',zh:'有公德心'},{c:2,en:'be punctual',zh:'守时'},
 {c:2,en:'comply with the law',zh:'遵守法纪'},{c:2,en:'attach more importance to...',zh:'更重视……'},
 {c:2,en:'carry forward...',zh:'弘扬……'},{c:2,en:'national pride',zh:'民族自豪'},
 {c:3,en:'job-hunting',zh:'找工作'},{c:3,en:'application letter',zh:'求职信'},
 {c:3,en:'job interview',zh:'工作面试'},{c:3,en:'working experience',zh:'工作经历'},
 {c:3,en:'education background',zh:'学历'},{c:3,en:'team-work spirit',zh:'团队合作精神'},
 {c:3,en:'a sense of responsibility',zh:'责任感'},{c:3,en:'a well-paid job',zh:'高收入工作'},
 {c:3,en:'chance of promotion',zh:'升迁机会'},{c:3,en:'balance work and life',zh:'平衡工作和生活'},
 {c:3,en:'accumulate experience',zh:'积累经验'},{c:3,en:'working environment',zh:'工作环境'},
 {c:3,en:'interpersonal skills',zh:'人际交往技能'},{c:3,en:'seize opportunities',zh:'抓住机遇'},
 {c:3,en:'promising future',zh:'光明的前途'},{c:3,en:'first impression',zh:'第一印象'},
 {c:4,en:'complaint',zh:'投诉'},{c:4,en:'lodge the complaint',zh:'投诉'},
 {c:4,en:'apply for',zh:'申请'},{c:4,en:'apologize for...',zh:'为……道歉'},
 {c:4,en:'heartfelt welcome',zh:'由衷的欢迎'},{c:4,en:'letter of recommendation',zh:'推荐信'},
 {c:4,en:'decline a job offer',zh:'婉拒工作机会'},{c:4,en:'make suggestions',zh:'提意见'},
 {c:4,en:'in the first place',zh:'首先'},{c:4,en:'honored guest',zh:'嘉宾'},
 {c:4,en:'opening address',zh:'开幕词'},{c:4,en:'on behalf of...',zh:'代表……'},
 {c:4,en:'look forward to',zh:'期待'},{c:4,en:'express one\'s gratitude',zh:'表达谢意'},
 {c:4,en:'sincere wishes',zh:'真诚的祝福'},{c:4,en:'heartiest congratulation',zh:'最衷心的祝贺'},
 {c:4,en:'farewell letter',zh:'告别信'},{c:4,en:'in this regard',zh:'在这一点上'},
 {c:4,en:'highly recommended',zh:'强烈建议'},{c:4,en:'deep gratitude',zh:'深深的谢意'}
],

/* 100 条常用写作谚语（素材4，8 类） */
provCats:['勤奋成功','学习方法','健康心态','品行操守','金钱财富','珍惜时光','择友友谊','常理法则'],
proverbs:[
 {c:0,en:'Where there is a will, there is a way.',zh:'有志者事竟成。'},
 {c:0,en:'No pains, no gains.',zh:'没有付出就没有收获。'},
 {c:0,en:'Constant dripping wears away a stone.',zh:'水滴石穿，绳锯木断。'},
 {c:0,en:'Genius is nothing but labor and diligence.',zh:'天才不过是勤奋而已。'},
 {c:0,en:'Great hopes make great man.',zh:'伟大的抱负造就伟大的人物。'},
 {c:0,en:'Industry is the parent of success.',zh:'勤奋是成功之母。'},
 {c:0,en:'There is no rose without a thorn.',zh:'没有不带刺的玫瑰。'},
 {c:0,en:'There is no royal road to learning.',zh:'书山有路勤为径，学海无涯苦作舟。'},
 {c:0,en:'No way is impossible to courage.',zh:'勇者无惧。'},
 {c:0,en:'Success belongs to the persevering.',zh:'坚持就是胜利。'},
 {c:0,en:'The finest diamond must be cut.',zh:'玉不琢，不成器。'},
 {c:0,en:'Care and diligence bring luck.',zh:'谨慎和勤奋才能抓住机遇。'},
 {c:0,en:'Adversity makes a man wise, not rich.',zh:'逆境出人才。'},
 {c:1,en:'Practice makes perfect.',zh:'熟能生巧。'},
 {c:1,en:'It is never too old to learn.',zh:'活到老，学到老。'},
 {c:1,en:'A man becomes learned by asking questions.',zh:'不耻下问才能有学问。'},
 {c:1,en:'Knowledge starts with practice.',zh:'实践出真知。'},
 {c:1,en:'Complacency is the enemy of study.',zh:'学习的敌人是自己的满足。'},
 {c:1,en:'Knowledge makes humble; ignorance makes proud.',zh:'知识使人谦虚，无知使人傲慢。'},
 {c:1,en:'Knowledge advances by steps and not by leaps.',zh:'知识只能循序渐进，不能跃进。'},
 {c:1,en:'A man can do no more than he can.',zh:'凡事都应量力而行。'},
 {c:1,en:'Reading is to the mind while exercise to the body.',zh:'读书健脑，运动强身。'},
 {c:1,en:'Learn and live.',zh:'活着，为了学习。'},
 {c:1,en:'Books and friends should be few but good.',zh:'读书如交友，应求少而精。'},
 {c:1,en:'A man cannot spin and reel at the same time.',zh:'一心不能二用。'},
 {c:2,en:'An apple a day keeps the doctor away.',zh:'一天一苹果，不用请医生。'},
 {c:2,en:'Prevention is better than cure.',zh:'预防胜于治疗。'},
 {c:2,en:'All work and no play makes Jack a dull boy.',zh:'只工作不玩耍，聪明小伙也变傻。'},
 {c:2,en:'Health is not valued till sickness comes.',zh:'病时方知健康可贵。'},
 {c:2,en:'A close mouth catches no flies.',zh:'病从口入。'},
 {c:2,en:'A good medicine tastes bitter.',zh:'良药苦口。'},
 {c:2,en:'Cheerfulness is health; its opposite, melancholy, is disease.',zh:'欢乐就是健康，忧郁就是病痛。'},
 {c:2,en:'He is happy that thinks himself so.',zh:'自乐者常乐。'},
 {c:2,en:'Good health is over wealth.',zh:'健康是最大的财富。'},
 {c:2,en:'Happiness lies first of all in health.',zh:'幸福首先在于健康。'},
 {c:2,en:'Content is better than riches.',zh:'知足者常乐。'},
 {c:3,en:'Honesty is the best policy.',zh:'诚实不欺为上策。'},
 {c:3,en:'Respect yourself, or no one else will respect you.',zh:'要人尊敬，必须自重。'},
 {c:3,en:'Patience is the best remedy.',zh:'忍耐是良药。'},
 {c:3,en:'One good turn deserves another.',zh:'行善积德。'},
 {c:3,en:'He knows most who speaks least.',zh:'大智若愚。'},
 {c:3,en:'A candle lights others and consumes itself.',zh:'蜡烛照亮别人，却毁灭了自己。'},
 {c:3,en:'He is not fit to command others that cannot command himself.',zh:'正人须先正己。'},
 {c:3,en:'Pride goes before, and shame comes after.',zh:'骄傲使人落后。'},
 {c:3,en:'Penny wise, pound foolish.',zh:'贪小便宜吃大亏。'},
 {c:3,en:'A still tongue makes a wise head.',zh:'寡言者智。'},
 {c:3,en:'Please the eye and plague the heart.',zh:'贪图一时快活，必然留下隐祸。'},
 {c:3,en:'He who makes constant complaint gets little compassion.',zh:'经常诉苦，没人同情。'},
 {c:3,en:'Do as you would be done by.',zh:'己所不欲，勿施于人。'},
 {c:4,en:'Gold will not buy anything.',zh:'黄金不能买尽一切。'},
 {c:4,en:'The chief aim of man is not to get money.',zh:'人的主要目的并不是赚钱。'},
 {c:4,en:'The money the miser hoards will do him no good.',zh:'守财奴积财，对自己毫无好处。'},
 {c:4,en:'What is wealth good for, if it brings melancholy?',zh:'财富如带忧郁来，有了财富有何用？'},
 {c:4,en:'That man is the richest whose pleasures are the cheapest.',zh:'能处处寻求快乐的人才是最富有的人。'},
 {c:5,en:'Time flies.',zh:'光阴似箭。'},
 {c:5,en:'Time and tide wait for no man.',zh:'时不我待。'},
 {c:5,en:'To save time is to lengthen life.',zh:'节约时间就是延长生命。'},
 {c:5,en:'Lost years are worse than lost dollars.',zh:'失去时光金不换。'},
 {c:5,en:'Time is money.',zh:'时间就是金钱。'},
 {c:5,en:'Time stays not the fool\'s leisure.',zh:'时间不等闲逛的傻瓜。'},
 {c:5,en:'Time has wings.',zh:'光阴去如飞。'},
 {c:5,en:'Time lost cannot be won again.',zh:'时光一去不复返。'},
 {c:6,en:'Birds of a feather flock together.',zh:'物以类聚，人以群分。'},
 {c:6,en:'A man is known by his friends.',zh:'什么人交什么朋友。'},
 {c:6,en:'A friend in need is a friend indeed.',zh:'患难见真情。'},
 {c:6,en:'A friend is easier lost than found.',zh:'得朋友难，失朋友易。'},
 {c:6,en:'A faithful friend is hard to find.',zh:'知音难觅。'},
 {c:6,en:'Keep good men company and you shall be of the number.',zh:'近朱者赤，近墨者黑。'},
 {c:6,en:'A friend is never known till a man has need.',zh:'需要之时方知友。'},
 {c:6,en:'Misfortune tests the sincerity of friends.',zh:'患难见真情。'},
 {c:7,en:'A good beginning is half done.',zh:'良好的开端是成功的一半。'},
 {c:7,en:'Don\'t put off till tomorrow what should be done today.',zh:'今日事，今日毕。'},
 {c:7,en:'Facts speak louder than words.',zh:'事实胜于雄辩。'},
 {c:7,en:'Failure is the mother of success.',zh:'失败是成功之母。'},
 {c:7,en:'A bird in the hand is worth than two in the bush.',zh:'一鸟在手胜过双鸟在林。'},
 {c:7,en:'Seeing is believing.',zh:'眼见为实。'},
 {c:7,en:'Still water runs deep.',zh:'静水流深。'},
 {c:7,en:'Strike the iron while it is hot.',zh:'趁热打铁。'},
 {c:7,en:'When in Rome, do as the Romans do.',zh:'入乡随俗。'},
 {c:7,en:'Man proposes; God disposes.',zh:'谋事在人，成事在天。'},
 {c:7,en:'Look before you leap.',zh:'三思而行。'},
 {c:7,en:'Experience must be bought.',zh:'吃一堑，长一智。'},
 {c:7,en:'Make hay while the sun shines.',zh:'良机勿失。'},
 {c:7,en:'He who does not advance loses ground.',zh:'逆水行舟，不进则退。'},
 {c:7,en:'Easier said than done.',zh:'说得容易，做得难。'},
 {c:7,en:'Every day is not Sunday.',zh:'好景不常在。'},
 {c:7,en:'All that glitters is not gold.',zh:'闪光的不一定都是金子。'},
 {c:7,en:'All things are difficult before they are easy.',zh:'凡事总是由难而易。'},
 {c:7,en:'Every advantage has its disadvantage.',zh:'有利必有弊。'},
 {c:7,en:'Every man has his faults.',zh:'金无足赤，人无完人。'},
 {c:7,en:'Four eyes see more than two.',zh:'集思广益。'},
 {c:7,en:'He laughs best who laughs last.',zh:'谁笑到最后，谁笑得最好。'},
 {c:7,en:'It is the first step that costs troublesome.',zh:'万事开头难。'},
 {c:7,en:'The farthest way about is the nearest way home.',zh:'抄近路反而绕远路。'},
 {c:7,en:'Take things as they come.',zh:'既来之，则安之。'},
 {c:7,en:'Every man is the architect of his own fortune.',zh:'自己的命运自己掌握。'},
 {c:7,en:'The early bird catches the worm.',zh:'早起的鸟儿有虫吃。'},
 {c:7,en:'It is no use crying over spilt milk.',zh:'覆水难收。'},
 {c:7,en:'Don\'t trouble trouble until trouble troubles you.',zh:'不要自找麻烦。'},
 {c:7,en:'Don\'t try to teach your grandmother to suck eggs.',zh:'不要班门弄斧。'}
],

/* 万能槽位词库 —— 「活动/时间/地点/理由不会写」就到这里拿 */
slotCats:['活动','时间日期','地点','理由收获','称呼落款'],
slots:[
 {c:0,en:'a birthday party',zh:'生日派对'},
 {c:0,en:'a welcome party',zh:'迎新晚会'},
 {c:0,en:'a farewell party',zh:'欢送会'},
 {c:0,en:'an English corner',zh:'英语角'},
 {c:0,en:'an English speech contest',zh:'英语演讲比赛'},
 {c:0,en:'a sports meeting',zh:'运动会'},
 {c:0,en:'a volunteer activity',zh:'志愿者活动'},
 {c:0,en:'a graduation ceremony',zh:'毕业典礼'},
 {c:0,en:'a lecture on English study',zh:'英语学习讲座'},
 {c:0,en:'a class picnic',zh:'班级郊游'},
 {c:0,en:'a book exchange activity',zh:'旧书交换活动'},
 {c:0,en:'an English evening',zh:'英语晚会'},
 {c:1,en:'this Friday evening',zh:'这周五晚上'},
 {c:1,en:'next Saturday afternoon',zh:'下周六下午'},
 {c:1,en:'at 7:00 p.m.',zh:'晚上7点'},
 {c:1,en:'from 7:00 to 9:00 p.m.',zh:'晚上7点到9点'},
 {c:1,en:'on May 1st',zh:'5月1日'},
 {c:1,en:'on the morning of June 1st',zh:'6月1日上午'},
 {c:1,en:'this weekend',zh:'这周末'},
 {c:1,en:'on my birthday',zh:'在我生日那天'},
 {c:1,en:'during the winter vacation',zh:'寒假期间'},
 {c:1,en:'on Saturday morning',zh:'周六上午'},
 {c:2,en:'in the school hall',zh:'在学校礼堂'},
 {c:2,en:'on the playground',zh:'在操场'},
 {c:2,en:'in the school library',zh:'在学校图书馆'},
 {c:2,en:'at the school gate',zh:'在校门口'},
 {c:2,en:'in the lecture hall',zh:'在报告厅'},
 {c:2,en:'at my home',zh:'在我家'},
 {c:2,en:'in the gym',zh:'在体育馆'},
 {c:2,en:'in our classroom (Classroom 302)',zh:'在我们教室（302）'},
 {c:3,en:'broaden our horizons',zh:'开阔眼界'},
 {c:3,en:'make new friends',zh:'交新朋友'},
 {c:3,en:'enrich our knowledge',zh:'丰富知识'},
 {c:3,en:'relax ourselves',zh:'放松自己'},
 {c:3,en:'improve my English',zh:'提高我的英语'},
 {c:3,en:'develop the habit of saving',zh:'养成节约的习惯'},
 {c:3,en:'raise environmental awareness',zh:'提高环保意识'},
 {c:3,en:'keep healthy',zh:'保持健康'},
 {c:3,en:'learn about Chinese culture',zh:'了解中国文化'},
 {c:3,en:'gain practical experience',zh:'积累实践经验'},
 {c:3,en:'cultivate a sense of responsibility',zh:'培养责任感'},
 {c:3,en:'make friends who share the same interest',zh:'结识志同道合的朋友'},
 {c:4,en:'Dear Tom / Dear Prof. Smith / Dear Mr. Wang',zh:'称呼：朋友用名、老师用 Prof./Mr. + 姓'},
 {c:4,en:'Yours sincerely,',zh:'落款（正式信件）'},
 {c:4,en:'Best regards,',zh:'落款（半正式/邮件）'},
 {c:4,en:'Li Yuan',zh:'真题署名（2019-2024 都是它）'}
],

/* 2019-2025 七年真题 + 参考范文（槽位用「」标出） */
real:[
 {y:2025,type:'通知 Notice',
  prompt:'学校学生会准备举办"交换旧书活动"，全校学生可参加。要点：①活动时间、地点自拟 ②活动好处（培养节约习惯、提高环保意识等）③可交换旧书种类（课本、小说等）④号召同学们积极参加。',
  essay:'Notice\n\nAttention, please! Our school is going to hold a book exchange activity in the school library at 9:00 a.m. this Saturday. All the students can take part in it.\n\nAs we all know, reading books is good for both our lives and study. By exchanging our old books, we can develop the good habit of saving, raise the awareness of protecting the environment, and even make new friends who are fond of reading.\n\nWe can exchange textbooks, storybooks and art books. What a meaningful activity! Come and join us!\n\nThe Students\' Union',
  slots:'地点 in the school library / 时间 at 9:00 a.m. this Saturday / 活动 a book exchange activity / 理由 develop the habit of saving · raise the awareness / 号召 Come and join us!',
  note:'2025 真题网传参考范文。通知不用 Dear，落款写 The Students\' Union。'},
 {y:2024,type:'申请信',
  prompt:'新学期伊始，你（Li Yuan）有意加入学校环保社团（Environmental Club）。请给该社团写一封申请信：①个人情况介绍 ②申请加入的原因 ③你期望在社团中承担的工作 ④你对社团发展的建议。',
  essay:'Dear members of the Environmental Club,\n\nI am Li Yuan, a freshman of our school. I am writing to apply to join the Environmental Club.\n\nFirstly, I have always been interested in environmental protection, and I often take part in volunteer activities. Secondly, I would like to be responsible for making posters and organizing activities, because I am good at drawing and communicating. Finally, I suggest that the club hold a "No Plastic Day" every month to raise students\' awareness of environmental protection.\n\nI would appreciate it if you could give me a chance. Looking forward to your reply.\n\nYours sincerely,\nLi Yuan',
  slots:'称呼 Dear members of... / 活动 the Environmental Club / 工作 be responsible for making posters / 理由 be interested in environmental protection / 建议 hold a "No Plastic Day"',
  note:'四个要点按顺序各写一句，一段一个要点，阅卷老师好找分。'},
 {y:2023,type:'叙事征文',
  prompt:'你（Li Yuan）要参加一次英语征文比赛，题目为 My Favorite Photo。请写一篇短文参赛：①拍照时间和地点 ②照片中的人物或景物 ③喜欢这张照片的原因。',
  essay:'My Favorite Photo\n\nAmong all my photos, I like this one best. It was taken in the West Lake last summer vacation, when my family traveled to Hangzhou.\n\nIn the photo, my parents and I are standing by the lake, smiling happily. Behind us, the water shines in the sun and the willows move in the wind.\n\nI like it best because it reminds me of the wonderful time with my family. Every time I see it, I feel warm and relaxed. It teaches me to love life and the people around me.',
  slots:'时间 last summer vacation / 地点 in the West Lake / 人物 my parents and I / 理由 it reminds me of the wonderful time',
  note:'叙事题也有"时间地点"槽位——开头第一句就全交代，后面写人、写景、写原因。'},
 {y:2022,type:'请假/道歉邮件',
  prompt:'你（Li Yuan）下周一因为要去参加演讲比赛，不能上外教（Prof. Smith）的写作课。请给他写一封 e-mail：①请假并表示歉意 ②解释不能上课的原因 ③承诺会自学所缺内容并按时交作业 ④祝他愉快。',
  essay:'Dear Prof. Smith,\n\nI am sorry to tell you that I cannot attend your writing class next Monday, because I will take part in an important English speech contest.\n\nThe contest is of great importance to me, and I have prepared for it for a long time. I promise that I will learn the missed lesson by myself and hand in my homework on time.\n\nI hope you can understand and wish you a nice week. Thank you!\n\nYours sincerely,\nLi Yuan',
  slots:'称呼 Dear Prof. Smith / 时间 next Monday / 活动 an English speech contest / 承诺 learn... by myself · hand in... on time',
  note:'道歉信三件套：I am sorry to tell you that... + because... + I promise that...'},
 {y:2021,type:'邀请信',
  prompt:'学校将组织一次英语演讲比赛，打算邀请外教（John）来做评委。请你（Li Yuan）给他写一封 e-mail：①邀请他担任评委（judge）②告知比赛安排（时间、地点等）③希望他赛后进行点评 ④期待他能接受邀请。',
  essay:'Dear John,\n\nHow is everything going? Our school will hold an English speech contest and I am writing to invite you to be a judge.\n\nThe contest will be held in the school hall from 2:00 to 5:00 p.m. this Friday. Ten students will give speeches on the topic of My Dream. We would appreciate it if you could give some comments on our performances after the contest, which will be of great help to us.\n\nI would be very happy if you could accept our invitation. Looking forward to your reply.\n\nYours sincerely,\nLi Yuan',
  slots:'称呼 Dear John / 活动 an English speech contest / 时间 from 2:00 to 5:00 p.m. this Friday / 地点 in the school hall / 点评 give some comments',
  note:'邀请信骨架：邀请 → 时间地点安排 → 附加请求 → 期待回复。'},
 {y:2020,type:'回信（欢迎+推荐）',
  prompt:'你（Li Yuan）收到美国朋友 Thomas 的 e-mail，他提及要来中国留学的想法。请给他回一封 e-mail：①欢迎他来中国留学 ②推荐一所学校 ③介绍该学校所在的城市 ④表达为他提供帮助的意愿。',
  essay:'Dear Thomas,\n\nI am very glad to hear that you are planning to study in China. Welcome!\n\nFirstly, I would like to recommend my university to you. It has a beautiful campus and excellent teachers. Secondly, the city where it lies has a long history and the people here are very friendly. You can visit museums and taste delicious local food in your spare time. Finally, if you come, I will be happy to show you around and offer any help you need.\n\nI am looking forward to seeing you soon.\n\nYours sincerely,\nLi Yuan',
  slots:'称呼 Dear Thomas / 活动 study in China / 推荐 recommend my university / 城市 the city where it lies / 帮助 offer any help you need',
  note:'回信第一句必须回应对方的来信内容（glad to hear that...）。'},
 {y:2019,type:'邀请信',
  prompt:'新学期伊始，你们班准备组织一场迎新晚会。你（Li Yuan）打算邀请外教（Tim）来参加迎新晚会：①邀请他参加 ②介绍活动安排 ③希望他做个简短发言 ④期待他的到来。',
  essay:'Dear Tim,\n\nHow is everything going? I am writing to invite you to our Freshman Welcome Party, which will be held in our classroom this Friday evening, from 7:00 to 9:00 p.m.\n\nFirstly, the party is a good chance for classmates to know each other. Secondly, we have prepared many interesting activities, such as English songs and short plays. Finally, we would feel honored if you could give a short speech at the beginning.\n\nI would appreciate it if you could come. I am looking forward to your reply.\n\nYours sincerely,\nLi Yuan',
  slots:'称呼 Dear Tim / 活动 Freshman Welcome Party / 地点 in our classroom / 时间 this Friday evening, from 7:00 to 9:00 p.m. / 发言 give a short speech',
  note:'成考邀请信的开山模板题——后面几年的邀请信全是它的变体。'}
],

/* 七关（6 个 quiz 关 + 真题库按钮入口） */
stages:[
 {id:'s0',icon:'🦴',name:'第0关 · 万能骨架速记',desc:'一副骨架打天下：寒暄→来意→Firstly/Secondly/Finally→期待回复',cat:'骨架'},
 {id:'s1',icon:'📋',name:'第1关 · 抄题三步法',desc:'真题要点 → 圈出时间/地点/活动 → 选对的英文块（零造句）',cat:'抄题'},
 {id:'s2',icon:'🗂️',name:'第2关 · 槽位词库闪记',desc:'活动/时间/地点/理由四大槽位，中文→英文直接配对',cat:'槽位'},
 {id:'s3',icon:'🧩',name:'第3关 · 万能句型填空',desc:'100 句型里的高频款：开头/观点/原因/建议/书信',cat:'句型'},
 {id:'s4',icon:'💎',name:'第4关 · 谚语点睛',desc:'开头结尾放一句谚语，档次立涨——中→英配对',cat:'谚语'},
 {id:'s5',icon:'🎭',name:'第5关 · 模板对号',desc:'给情境选文体：申请信？邀请信？通知？选错文体最亏',cat:'文体'}
],
realStage:{id:'r7',icon:'📚',name:'真题范文库 · 2019-2025',desc:'七年真题全收录：题目 → 参考范文 → 槽位标注 → 当年得分点'},

Q:[
/* ---------- S0 万能骨架 ---------- */
{id:'e00',cat:'骨架',q:'Dear Tom, How is everything going with you? I am writing to ______ you about something and hope we can accomplish it together.',o:['tell','telling','says','told'],a:0,sol:'I am writing to tell you about... 万能来意句：I am writing to + 动词原形。',hint:'「告诉」的动词原形'},
{id:'e01',cat:'骨架',q:'I would be very happy if you could ______ (来).',o:['come','came','coming','comes'],a:0,sol:'if you could + 动词原形。could 后面永远跟原形。',hint:'could 后接动词原形'},
{id:'e02',cat:'骨架',q:'Firstly, this activity will be very ______ (有趣的), not only will it be of great help to you.',o:['interesting','interested','interest','boring'],a:0,sol:'物作主语用 -ing 形容词：The activity is interesting. 人作主语才用 interested。',hint:'主语是 activity（物）'},
{id:'e03',cat:'骨架',q:'not only will it be of great ______ to you, but you will also have a great time playing.',o:['help','helpful','helps','helping'],a:0,sol:'be of great help = 名词化高级表达（= very helpful），比 very helpful 高一档。',hint:'be of great + 名词'},
{id:'e04',cat:'骨架',q:'Secondly, you can make many ______, increase your knowledge, and it is very helpful for your development.',o:['friends','friend','friendly','friendship'],a:0,sol:'many + 复数：make (many) friends 交朋友。',hint:'many 后面用复数'},
{id:'e05',cat:'骨架',q:'Finally, I\'m sure you will ______ a lot and have a great time here.',o:['gain','gained','gaining','gains'],a:0,sol:'will + 动词原形：gain a lot 收获很多。',hint:'will 后接原形'},
{id:'e06',cat:'骨架',q:'Wish you a good time and look ______ to your reply!',o:['forward','forwards','up','out'],a:0,sol:'look forward to your reply 期待回复——书信万能收尾，固定搭配。',hint:'look ___ to'},
{id:'e07',cat:'骨架',q:'信件落款应写：',o:['Yours sincerely,','Your sincere,','Yours sincere,','Sincerely you,'],a:0,sol:'Yours sincerely, （逗号）+ 换行写名字。格式分白送，别拼错。',hint:'sincerely 用副词'},
{id:'e08',cat:'骨架',q:'称呼一位老师（Smith 教授）应写：',o:['Dear Prof. Smith,','Dear Professor,','Dear Smith teacher,','Dear Teacher Smith,'],a:0,sol:'Dear Prof./Mr./Ms. + 姓。中文的"老师"不能直译成 teacher 做称呼。',hint:'教授 = Prof. + 姓'},
{id:'e09',cat:'骨架',q:'三段式正文的标准连接词组是：',o:['Firstly, ... Secondly, ... Finally, ...','One, ... Two, ... Three, ...','At first, ... At second, ... At last, ...','No.1, ... No.2, ... No.3, ...'],a:0,sol:'Firstly/Secondly/Finally 或 First/Second/Finally。成考评分标准明确说"分点论述、层次分明"加分。',hint:'官方评分点：分点论述'}
,
/* ---------- S1 抄题三步法 ---------- */
{id:'e10',cat:'抄题',q:'真题要点「本周五晚7点到9点」→ The party will be held ______.',o:['from 7:00 to 9:00 p.m. this Friday evening','at 7:00 until 9:00 p.m. this Friday evening','in 7:00-9:00 p.m. this Friday evening','since 7:00 p.m. this Friday evening'],a:0,sol:'时间段 = from A to B。抄题时套公式：from + 时刻 + to + 时刻 + p.m./a.m. + 某天。',hint:'"从…到…"的介词'},
{id:'e11',cat:'抄题',q:'真题要点「我们教室（302教室）」→ The contest will be held ______.',o:['in our classroom (Classroom 302)','at our classroom (302 Classroom)','on our classroom (Classroom 302)','in our classroom (302 Class)'],a:0,sol:'in the classroom 固定；教室编号写法 = Classroom + 数字。地点槽位：in + 室内场所。',hint:'教室里用 in'},
{id:'e12',cat:'抄题',q:'真题要点「学校图书馆，本周六上午9点」→ ...will be held ______.',o:['in the school library at 9:00 a.m. this Saturday','at the school library on 9:00 a.m. this Saturday','in the school library on 9:00 a.m. this Saturday','on the school library at 9:00 a.m. this Saturday'],a:0,sol:'地点 in the library；时刻 at 9:00 a.m.；星期六 morning 用 this Saturday 即可（口语化真题写法）。',hint:'in + 场所，at + 时刻'},
{id:'e13',cat:'抄题',q:'真题要点「邀请你担任评委」→ I am writing to ______.',o:['invite you to be a judge','invite you be a judge','invite you to being a judge','inviting you to be judge'],a:0,sol:'invite sb. to be... 邀请某人担任……。抄题公式：I am writing to invite you to + 动词。',hint:'invite sb. ___ do sth.'},
{id:'e14',cat:'抄题',q:'真题要点「希望你赛后进行点评」→ We would appreciate it if you could ______.',o:['give some comments after the contest','give some comment after contest','make a comment for the contest','speak your comments on contest'],a:0,sol:'give (some) comments on/after... 点评。comments 可数名词用复数。',hint:'"点评" = give comments'},
{id:'e15',cat:'抄题',q:'真题要点「去参加演讲比赛」→ I will ______ next Monday.',o:['take part in an important speech contest','take part an important speech contest','join to an important speech contest','attend to an important speech contest'],a:0,sol:'take part in + 活动 参加。介词 in 不能丢——这是历年最容易抄漏的词。',hint:'参加 = take part ___'},
{id:'e16',cat:'抄题',q:'真题要点「向老师请假」→ I am writing to ______.',o:['ask for leave','ask a leave','ask for a leave','require for leave'],a:0,sol:'ask for leave 请假（leave 此处不可数，不加 a）。',hint:'leave 在这里不可数'},
{id:'e17',cat:'抄题',q:'真题要点「表示歉意地开头」→ 最合适的一句：',o:['I am sorry to tell you that I cannot attend your class.','I have a sorry to tell you that I cannot attend your class.','I am sorry for tell you that I cannot attend your class.','Sorry to say you that I cannot attend your class.'],a:0,sol:'I am sorry to tell you that + 坏消息。道歉信万能开头。',hint:'sorry to ___ that'},
{id:'e18',cat:'抄题',q:'真题要点「自学所缺内容」→ I will learn the missed lesson ______.',o:['by myself','with myself','for myself','on myself'],a:0,sol:'by myself = 独自地、靠自己。自学 = learn... by myself。',hint:'"独自"的介词'},
{id:'e19',cat:'抄题',q:'真题要点「按时交作业」→ I will ______.',o:['hand in my homework on time','hand in my homework in time','hand on my homework on time','give in my homework on time'],a:0,sol:'hand in 上交；on time 按时（in time = 及时，意思不同）。',hint:'上交 + 按时'},
{id:'e20',cat:'抄题',q:'真题要点「加入环保社团」→ I am writing to ______.',o:['apply to join the Environmental Club','apply joining the Environmental Club','apply for join the Environmental Club','apply to joining the Environmental Club'],a:0,sol:'apply to do sth. 申请做某事；apply for + 名词（apply for the membership）。',hint:'apply ___ + 动词原形'},
{id:'e21',cat:'抄题',q:'真题要点「介绍个人情况」→ 开头一句：',o:['Let me introduce myself first.','Let me introduce my self first.','Let me introduce by myself first.','Let me to introduce myself first.'],a:0,sol:'introduce oneself 自我介绍（oneself 写成一个词 myself）。introduce 是动词原形，前面不加 to。',hint:'myself 是一个词'},
{id:'e22',cat:'抄题',q:'真题要点「期望承担的工作」→ I would like to ______ making posters.',o:['be responsible for','be responsible of','be responsible on','be responsible to'],a:0,sol:'be responsible for + 负责的事情。固定介词搭配，抄题时连介词一起背。',hint:'负责 = responsible ___'},
{id:'e23',cat:'抄题',q:'真题要点「对社团发展的建议」→ 最合适的一句：',o:['Here are my suggestions for the club.','Here is my suggestion of the club development for.','Here have my suggestions to the club.','Here it is my suggestion for club.'],a:0,sol:'suggestions for... 对……的建议。Here are + 复数名词 更稳妥。',hint:'suggestion ___ the club'},
{id:'e24',cat:'抄题',q:'真题要点「欢迎他来中国留学」→ 回信第一句：',o:['I am very glad to hear that you are planning to study in China.','I am very glad to hear you will come and study China.','I very glad to hear that you want to study in China.','I am glad hearing that you plan to study to China.'],a:0,sol:'回信第一句公式：I am very glad to hear that + 对方来信的内容。study in China 在中国学习。',hint:'glad to ___ that'},
{id:'e25',cat:'抄题',q:'真题要点「推荐一所学校」→ 最合适的一句：',o:['I would like to recommend my university to you.','I would like to recommend to you my university for you.','I would like to introduce you to recommend a school.','I recommend that you to go to my university.'],a:0,sol:'recommend A to B 把 A 推荐给 B。',hint:'recommend A ___ B'},
{id:'e26',cat:'抄题',q:'真题要点「学校所在的城市」→ The school ______ a beautiful city.',o:['lies in','lies on','lies at','lays in'],a:0,sol:'lie in 位于（某地）；lay 是"放置/下蛋"，别混。',hint:'"位于"用 lie ___'},
{id:'e27',cat:'抄题',q:'真题要点「表达提供帮助的意愿」→ 结尾一句：',o:['If you need any help, please let me know.','If you will need any help, please let me know.','If you need some helps, please let know me.','If you need any help, please tell to me.'],a:0,sol:'if 从句用一般现在时表将来（不写 will）。let me know 固定。',hint:'if 从句里能用 will 吗？'},
{id:'e28',cat:'抄题',q:'真题要点「交换旧书活动」→ Our school is going to hold ______.',o:['a book exchange activity','a books exchange activity','an activity of exchange book','a book exchanging of activity'],a:0,sol:'名词作定语用单数：book exchange。活动 = an activity on/of exchanging old books 也对。',hint:'名词修饰名词用单数'},
{id:'e29',cat:'抄题',q:'真题要点「培养节约习惯、提高环保意识」→ 最合适的一句：',o:['develop the habit of saving and raise the awareness of environmental protection','develop the habit of saving and rise the awareness of environmental protection','make the habit of saving and raise the awareness of environmental protection','develop the habit of saving and raise the awareness of environment protect'],a:0,sol:'develop the habit of 养成……习惯；raise the awareness of 提高……意识。rise 是"上升"，及物动词用 raise。',hint:'"提高意识"用 raise 还是 rise？'},
{id:'e30',cat:'抄题',q:'真题要点「号召同学们积极参加」→ 通知结尾：',o:['Come and join us!','Come and join with us!','Come to join us actively!','Welcome you to join us!'],a:0,sol:'Come and join us! 标准号召句。join 是及物动词，直接加 us。',hint:'join 后面要加 with 吗？'},
{id:'e31',cat:'抄题',q:'通知（Notice）的正确格式是：',o:['标题 Notice，落款 The Students\' Union，不写 Dear','开头 Dear students, 落款 Li Yuan','标题 Notice，落款 Yours sincerely','不用标题，直接写正文，落款 Tom'],a:0,sol:'通知三件套：Notice 标题 + 正文（说清时间地点活动）+ 落款写组织名（The Students\' Union）。',hint:'通知的落款是谁？'}
,
/* ---------- S2 槽位词库 ---------- */
{id:'e40',cat:'槽位·活动',q:'「生日派对」的英文是：',o:['a birthday party','a birthday meeting','a birth day party','a party of birthday'],a:0,sol:'a birthday party。名词修饰名词用单数：birthday party。',hint:'名词修饰名词'},
{id:'e41',cat:'槽位·活动',q:'「迎新晚会」的英文是：',o:['a welcome party','a welcoming party for new','a party of welcome','a new student party welcome'],a:0,sol:'a welcome party（2019 真题：Freshman Welcome Party）。',hint:'welcome 做定语'},
{id:'e42',cat:'槽位·活动',q:'「欢送会」的英文是：',o:['a farewell party','a goodbye meeting','a farewell meeting party','a party of farewell'],a:0,sol:'a farewell party。',hint:'farewell = 告别'},
{id:'e43',cat:'槽位·活动',q:'「英语角」的英文是：',o:['the English corner','the English angle','the corner of English study','English square'],a:0,sol:'the English corner。angle 是"角度"，别混。',hint:'角 = corner'},
{id:'e44',cat:'槽位·活动',q:'「英语演讲比赛」的英文是：',o:['an English speech contest','an English speech match','an English speaking contest game','a contest of English talk'],a:0,sol:'an English speech contest（2021 真题原文用语）。',hint:'演讲 = speech'},
{id:'e45',cat:'槽位·活动',q:'「运动会」的英文是：',o:['a sports meeting','a sport meeting','a sports party','a games of sport'],a:0,sol:'a sports meeting。sports 作定语必须带 s。',hint:'sports 带 s'},
{id:'e46',cat:'槽位·活动',q:'「志愿者活动」的英文是：',o:['a volunteer activity','a voluntary activity of volunteer','an activity of volunteers\' do','a volunteer action party'],a:0,sol:'a volunteer activity（volunteer 也可做定语）。',hint:'volunteer 做定语'},
{id:'e47',cat:'槽位·活动',q:'「毕业典礼」的英文是：',o:['a graduation ceremony','a graduate ceremony','a graduation party','a ceremony of graduate'],a:0,sol:'a graduation ceremony。',hint:'毕业 = graduation'},
{id:'e48',cat:'槽位·活动',q:'「英语学习讲座」的英文是：',o:['a lecture on English study','a lecture of English study','a lecture about study English','an English study lesson of lecture'],a:0,sol:'a lecture on... 关于……的讲座，介词用 on。',hint:'lecture ___ + 主题'},
{id:'e49',cat:'槽位·活动',q:'「班级郊游」的英文是：',o:['a class picnic','a class picnic trip of class','a picnic of the class trip','a class travel'],a:0,sol:'a class picnic / a class trip。',hint:'picnic = 郊游'},
{id:'e50',cat:'槽位·时间',q:'「这周五晚上」的英文是：',o:['this Friday evening','this Friday night of evening','in this Friday evening','at this Friday evening'],a:0,sol:'this Friday evening（前面不加介词！this/next/last + 时间 直接用）。',hint:'this 前面要加介词吗？'},
{id:'e51',cat:'槽位·时间',q:'「下周六下午」的英文是：',o:['next Saturday afternoon','next Saturday\'s afternoon','on next Saturday afternoon','the next afternoon of Saturday'],a:0,sol:'next Saturday afternoon（this/next/last 开头不加介词）。',hint:'next 前面要加介词吗？'},
{id:'e52',cat:'槽位·时间',q:'「晚上7点」的英文是：',o:['at 7:00 p.m.','in 7:00 p.m.','on 7:00 p.m.','at 7:00 p.m. of evening'],a:0,sol:'时刻用 at；p.m. = 下午/晚上。a.m. = 上午。',hint:'时刻介词'},
{id:'e53',cat:'槽位·时间',q:'「晚上7点到9点」的英文是：',o:['from 7:00 to 9:00 p.m.','from 7:00 until to 9:00 p.m.','between 7:00 to 9:00 p.m.','since 7:00 to 9:00 p.m.'],a:0,sol:'from A to B 固定搭配（between 要配 and）。',hint:'from 配 to'},
{id:'e54',cat:'槽位·时间',q:'「5月1日」的英文是：',o:['on May 1st','in May 1st','at May 1st','on 1st May of'],a:0,sol:'具体某一天用 on：on May 1st / on May 1。',hint:'具体某天介词'},
{id:'e55',cat:'槽位·时间',q:'「6月1日上午」的英文是：',o:['on the morning of June 1st','in the morning of June 1st','at the morning of June 1st','on the morning in June 1st'],a:0,sol:'特指某天的上午要用 on the morning of...（普通 in the morning 不加限定词）。',hint:'某天的上午用 on'},
{id:'e56',cat:'槽位·时间',q:'「这周末」的英文是：',o:['this weekend','in this weekend','at this weekend of','on this weekend'],a:0,sol:'this weekend（this 开头不加介词）。',hint:'this 前面要加介词吗？'},
{id:'e57',cat:'槽位·时间',q:'「在我生日那天」的英文是：',o:['on my birthday','in my birthday','at my birthday','my birthday on'],a:0,sol:'具体某天用 on：on my birthday。',hint:'具体某天介词'},
{id:'e58',cat:'槽位·时间',q:'「寒假期间」的英文是：',o:['during the winter vacation','during the winter vacation of time','in during the winter vacation','at the winter vacation'],a:0,sol:'during + 时间段。',hint:'"在……期间"'},
{id:'e59',cat:'槽位·时间',q:'「周六上午」的英文是：',o:['on Saturday morning','in Saturday morning','at Saturday morning','on Saturday of morning'],a:0,sol:'具体某天的上午/下午用 on：on Saturday morning。',hint:'某天的上午用 on'},
{id:'e60',cat:'槽位·地点',q:'「在学校礼堂」的英文是：',o:['in the school hall','on the school hall','at the school hall of','in school hall'],a:0,sol:'in the school hall。大空间室内用 in，the 不能丢。',hint:'礼堂里用 in'},
{id:'e61',cat:'槽位·地点',q:'「在操场」的英文是：',o:['on the playground','in the playground','at the playground of','on playground'],a:0,sol:'on the playground（露天场地上用 on）。',hint:'操场用 on'},
{id:'e62',cat:'槽位·地点',q:'「在学校图书馆」的英文是：',o:['in the school library','at the school library of','on the school library','in school library'],a:0,sol:'in the school library。',hint:'图书馆里用 in'},
{id:'e63',cat:'槽位·地点',q:'「在校门口」的英文是：',o:['at the school gate','in the school gate','on the school gate of','at school gate'],a:0,sol:'at the school gate（门口是"点"，用 at）。',hint:'门口是点'},
{id:'e64',cat:'槽位·地点',q:'「在报告厅」的英文是：',o:['in the lecture hall','on the lecture hall','at the lecture hall of','in lecture hall'],a:0,sol:'in the lecture hall。',hint:'厅里用 in'},
{id:'e65',cat:'槽位·地点',q:'「在我家」的英文是：',o:['at my home','in my home of','on my home','at the my home'],a:0,sol:'at my home / at home。家当"点"用 at。',hint:'家用 at'},
{id:'e66',cat:'槽位·地点',q:'「在体育馆」的英文是：',o:['in the gym','on the gym','at the gym of','in gym'],a:0,sol:'in the gym。',hint:'馆里用 in'},
{id:'e67',cat:'槽位·地点',q:'「在我们教室」的英文是：',o:['in our classroom','on our classroom','at our classroom of','in the our classroom'],a:0,sol:'in our classroom（our 和 the 不能同时用）。',hint:'一个限定词就够'},
{id:'e70',cat:'槽位·理由',q:'「开阔眼界」的英文是：',o:['broaden our horizons','broad our horizon','open our eyes wide','widen the eye sights'],a:0,sol:'broaden one\'s horizons（复数 horizons）。加分短语，比 open our eyes 高档。',hint:'horizons 用复数'},
{id:'e71',cat:'槽位·理由',q:'「交新朋友」的英文是：',o:['make new friends','take new friends','get new friend','have new friendships'],a:0,sol:'make friends 固定搭配。',hint:'交朋友 = make friends'},
{id:'e72',cat:'槽位·理由',q:'「丰富知识」的英文是：',o:['enrich our knowledge','rich our knowledge','make knowledge more','full our knowledge'],a:0,sol:'enrich = 使丰富（en + rich）。',hint:'en + rich'},
{id:'e73',cat:'槽位·理由',q:'「放松自己」的英文是：',o:['relax ourselves','relax by ourselves','relaxing ourselves','relax us happy'],a:0,sol:'relax oneself：主语是 we → ourselves。',hint:'we 的反身代词'},
{id:'e74',cat:'槽位·理由',q:'「提高我的英语」的英文是：',o:['improve my English','raise my English level to high','make my English better to good','increase my English'],a:0,sol:'improve my English 最稳。',hint:'提高 = improve'},
{id:'e75',cat:'槽位·理由',q:'「养成节约的习惯」的英文是：',o:['develop the habit of saving','make the habit of save','get a habit of saving money habit','develop habit of save'],a:0,sol:'develop the habit of + 名词/doing。',hint:'养成 = develop the habit of'},
{id:'e76',cat:'槽位·理由',q:'「提高环保意识」的英文是：',o:['raise environmental awareness','rise environmental awareness','improve the environment conscious','raise the aware of environment'],a:0,sol:'raise the/one\'s awareness of... 及物动词用 raise。',hint:'raise 还是 rise？'},
{id:'e77',cat:'槽位·理由',q:'「保持健康」的英文是：',o:['keep healthy','keep health','stay health of body','make healthy keep'],a:0,sol:'keep + 形容词：keep healthy（health 是名词）。',hint:'keep 后接形容词'},
{id:'e78',cat:'槽位·理由',q:'「了解中国文化」的英文是：',o:['learn about Chinese culture','learn Chinese culture of about','know about the culture of China study','study about China culture'],a:0,sol:'learn about... 了解……。',hint:'learn ___ + 事物'},
{id:'e79',cat:'槽位·理由',q:'「积累实践经验」的英文是：',o:['gain practical experience','get practice experiences of work','win the experience of practice','make practical experiences'],a:0,sol:'gain practical experience（experience 此处不可数）。',hint:'经验不可数'},
{id:'e80',cat:'槽位·理由',q:'「培养责任感」的英文是：',o:['cultivate a sense of responsibility','raise a sense of responsible','make the responsibility feeling','grow the responsible sense'],a:0,sol:'a sense of + 名词：responsibility。',hint:'sense of + 名词'},
{id:'e81',cat:'槽位·理由',q:'「结识志同道合的朋友」的英文是：',o:['make friends who share the same interest','make friends with same interest people','be friends of the same interest of','know the friends sharing same interests'],a:0,sol:'make friends + 定语从句（who share...）。',hint:'用 who 从句'},
{id:'e82',cat:'槽位·称呼',q:'称呼外教 John（关系熟、他先来信约稿），最自然的写法：',o:['Dear John,','Dear Mr. John,','Dear Teacher John,','Dear professor,'],a:0,sol:'外教直呼名（Dear John）。Mr. 后只能加姓不能加名；teacher 不做称呼。',hint:'朋友/外教直呼名'},
{id:'e83',cat:'槽位·称呼',q:'称呼 Smith 教授（写作课老师），最合适的写法：',o:['Dear Prof. Smith,','Dear Professor Smith teacher,','Dear Smith,','Dear teacher,'],a:0,sol:'Prof./Dr./Mr./Ms. + 姓（Smith 是姓）。请假信（2022 真题）就是这么写的。',hint:'头衔 + 姓'}
,
/* ---------- S3 万能句型 ---------- */
{id:'e90',cat:'句型·图画',q:'______ can be seen from the picture, the number of cars is growing rapidly.',o:['As','It','What','That'],a:0,sol:'As can be seen from the picture... as 引导非限制性从句（满分句型）。',hint:'非限制性从句引导词'},
{id:'e91',cat:'句型·图画',q:'The picture ______ a phenomenon that exists widely among young people.',o:['depicts','depicting','depicted to','paints out'],a:0,sol:'depicts 描绘（第三人称单数）。主语 The picture 是单数。',hint:'主语单数 → 动词加 s'},
{id:'e92',cat:'句型·谚语',q:'There ______ a saying that "Practice makes perfect."',o:['goes','go','going','went'],a:0,sol:'There goes a saying that... 有一句谚语这样说（就近主语 a saying 是单数）。',hint:'there be/go 就近原则'},
{id:'e93',cat:'句型·现象',q:'In recent years, ______ more people have turned to online shopping.',o:['increasingly','increase','increased','increasing'],a:0,sol:'increasingly 修饰 more：increasingly more people 越来越多的人。',hint:'修饰 more 用副词'},
{id:'e94',cat:'句型·现象',q:'Surveys ______ that more and more people keep healthy by exercising.',o:['reveal','reveals','revealing','is revealed'],a:0,sol:'Surveys 复数 → reveal 原形。',hint:'主语复数 → 动词原形'},
{id:'e95',cat:'句型·现象',q:'Nowadays, it is no ______ to find out that children spend hours on short videos.',o:['surprise','surprised','surprising','surprises'],a:0,sol:'it is no surprise to do sth. 做某事已不足为奇。',hint:'no + 名词'},
{id:'e96',cat:'句型·观点',q:'People hold different ______ towards this phenomenon.',o:['opinions','opinion','opining','opinionate'],a:0,sol:'different + 复数名词：hold different opinions。',hint:'different 后接复数'},
{id:'e97',cat:'句型·观点',q:'Some people think online learning is convenient. ______ the contrary, others believe it is not.',o:['On','In','At','By'],a:0,sol:'On the contrary 相反（固定短语）。',hint:'固定介词短语'},
{id:'e98',cat:'句型·原因',q:'The ______ for this phenomenon can be concluded as follows.',o:['reasons','reason','reasoning','reasons\''],a:0,sol:'The reasons for... can be concluded as follows. 原因总结万能句。',hint:'后面列举了多条'},
{id:'e99',cat:'句型·原因',q:'Firstly, ... ______, ... (引出第二条原因)',o:['Secondly','Second one','The second of','No. Second'],a:0,sol:'Firstly → Secondly → Finally。',hint:'第二的副词形式'},
{id:'e9a',cat:'句型·利弊',q:'As far as I am concerned, the Internet is like a ______ sword.',o:['double-edged','two-edge','double edge of','twin edged'],a:0,sol:'a double-edged sword 双刃剑——利弊题万能收尾。',hint:'双刃剑'},
{id:'e9b',cat:'句型·利弊',q:'On the one hand, it saves time. On the ______ hand, it makes us lazy.',o:['other','another','others','second'],a:0,sol:'On the one hand... On the other hand... 一方面……另一方面……。',hint:'one ↔ other'},
{id:'e9c',cat:'句型·建议',q:'In order to solve this problem, effective ______ should be taken immediately.',o:['measures','measure','measuring','measurement'],a:0,sol:'take effective measures 采取有效措施（measures 必须复数）。',hint:'措施用复数'},
{id:'e9d',cat:'句型·建议',q:'It will be very ______ to both our study and health, so let\'s start now.',o:['beneficial','benefit','benefited','benefiting'],a:0,sol:'be beneficial to... 对……有益（形容词）。',hint:'be ___ to'},
{id:'e9e',cat:'句型·观点',q:'______ my part, students should spend more time reading.',o:['For','In','On','At'],a:0,sol:'For my part 在我看来。',hint:'固定介词'},
{id:'e9f',cat:'句型·观点',q:'______ far as I am concerned, lifelong learning is a necessity.',o:['As','So','It','What'],a:0,sol:'As far as I am concerned 就我而言——最高频观点句。',hint:'固定搭配'},
{id:'e9g',cat:'句型·观点',q:'______ I see it, there are both benefits and drawbacks.',o:['As','Like','When','While'],a:0,sol:'As I see it 在我看来（as 引导方式状语）。',hint:'固定搭配'},
{id:'e9h',cat:'句型·书信',q:'I am writing to ______ for the position of part-time editor.',o:['apply','apply for it','application','applied'],a:0,sol:'apply for + 名词（申请）；apply to do（申请做）。此处后已有 for，填动词原形 apply。',hint:'后接 for + 名词'},
{id:'e9i',cat:'句型·书信',q:'I am writing to ______ you to our Freshman Welcome Party.',o:['invite','inviting','invitation','invited'],a:0,sol:'I am writing to invite you to... 邀请信第一句公式。',hint:'邀请的动词'},
{id:'e9j',cat:'句型·书信',q:'I am writing to ______ for the fact that I lost the book you lent me.',o:['apologize','apology','apologetic','apologizing'],a:0,sol:'apologize for... 为……道歉（动词）；名词是 apology。',hint:'道歉动词'},
{id:'e9k',cat:'句型·书信',q:'I would ______ it if you could come to my birthday party.',o:['appreciate','appreciation','appreciated it','thank'],a:0,sol:'I would appreciate it if... 若能……将不胜感激（it 不能省）。',hint:'appreciate 后的 it'},
{id:'e9l',cat:'句型·书信',q:'I am looking ______ to your early reply.',o:['forward','forwards','toward','out'],a:0,sol:'look forward to + 名词/doing 期待。',hint:'固定搭配'},
{id:'e9m',cat:'句型·书信',q:'It is our ______ hope that you will accept our invitation.',o:['sincere','sincerely','since','sincerity'],a:0,sol:'sincere hope 诚挚的希望（形容词修饰名词）。',hint:'修饰名词用形容词'}
,
/* ---------- S4 谚语点睛 ---------- */
{id:'ea0',cat:'谚语',q:'「熟能生巧」的英文是：',o:['Practice makes perfect.','Practice is perfect.','Practice to be perfect.','Practicing makes perfect things.'],a:0,sol:'Practice makes perfect. —— 学习话题开头收尾两相宜。',hint:'练习造完美'},
{id:'ea1',cat:'谚语',q:'「活到老，学到老」的英文是：',o:['It is never too old to learn.','Never learn when old.','Learn never too old.','It is too old never to learn.'],a:0,sol:'It is never too old to learn. —— 终身学习话题必备（2024 高频）。',hint:'never too... to...'},
{id:'ea2',cat:'谚语',q:'「有志者事竟成」的英文是：',o:['Where there is a will, there is a way.','Where there is a way, there is a will.','There is a will to have a way.','The will finds the way always.'],a:0,sol:'Where there is a will, there is a way. —— 励志万能款。',hint:'有意志的地方'},
{id:'ea3',cat:'谚语',q:'「不劳无获」的英文是：',o:['No pains, no gains.','No pain, no gain it.','Without pains have gains.','Not pain not gain.'],a:0,sol:'No pains, no gains.（也作 No pain, no gain.）',hint:'pain 复数版最经典'},
{id:'ea4',cat:'谚语',q:'「失败是成功之母」的英文是：',o:['Failure is the mother of success.','Fail is mother of success.','Failure is mother of the success.','Failing makes a success mother.'],a:0,sol:'Failure is the mother of success.',hint:'mother of...'},
{id:'ea5',cat:'谚语',q:'「一天一苹果，医生远离我」的英文是：',o:['An apple a day keeps the doctor away.','A apple a day keeps doctors away.','One apple every day keeps the doctor from away.','Apples a day keep the doctor away always.'],a:0,sol:'An apple a day keeps the doctor away. —— 健康话题必备。',hint:'an apple'},
{id:'ea6',cat:'谚语',q:'「预防胜于治疗」的英文是：',o:['Prevention is better than cure.','Prevent is better than cure.','Prevention better than the cure.','Preventing is good than curing.'],a:0,sol:'Prevention is better than cure. —— 比较级句型。',hint:'A is better than B'},
{id:'ea7',cat:'谚语',q:'「只工作不玩耍，聪明孩子也变傻」的英文是：',o:['All work and no play makes Jack a dull boy.','All work no play make Jack a dull boy.','All work and not play makes Jack dull.','Only work without play, Jack becomes a fool.'],a:0,sol:'All work and no play makes Jack a dull boy. —— 劳逸结合话题。',hint:'makes Jack a dull boy'},
{id:'ea8',cat:'谚语',q:'「健康是最大的财富」的英文是：',o:['Good health is over wealth.','Health is over the wealth good.','Healthy is over wealth.','The health is wealth over.'],a:0,sol:'Good health is over wealth. —— 健康话题收尾。',hint:'health 名词形'},
{id:'ea9',cat:'谚语',q:'「诚实为上策」的英文是：',o:['Honesty is the best policy.','Honest is the best policy.','Honesty is a best policy.','To be honest is best policy.'],a:0,sol:'Honesty is the best policy. —— 品行话题开头。',hint:'honesty 名词形'},
{id:'eb0',cat:'谚语',q:'「时间就是金钱」的英文是：',o:['Time is money.','Time is the money.','Times are money.','Time makes money.'],a:0,sol:'Time is money. —— 珍惜时间话题。',hint:'最短的名言'},
{id:'eb1',cat:'谚语',q:'「时光一去不复返」的英文是：',o:['Time lost cannot be won again.','Lost time can win again.','Time losing cannot win back.','The lost time is won again.'],a:0,sol:'Time lost cannot be won again. —— 珍惜时间话题收尾。',hint:'cannot be won'},
{id:'eb2',cat:'谚语',q:'「患难见真情」的英文是：',o:['A friend in need is a friend indeed.','A friend in need is a friend in deed good.','The friend of need is friend indeed.','Friends in need are indeed friends.'],a:0,sol:'A friend in need is a friend indeed. —— 友谊话题。',hint:'in need ↔ indeed 押韵'},
{id:'eb3',cat:'谚语',q:'「物以类聚，人以群分」的英文是：',o:['Birds of a feather flock together.','Birds of same feather fly together.','The same birds flock each other.','Feather birds go together.'],a:0,sol:'Birds of a feather flock together. —— 交友话题开头。',hint:'同羽毛的鸟'},
{id:'eb4',cat:'谚语',q:'「入乡随俗」的英文是：',o:['When in Rome, do as the Romans do.','When you go Rome, do as Rome do.','In Rome, do like Roman does.','When to Rome, do the Roman things.'],a:0,sol:'When in Rome, do as the Romans do. —— 文化适应话题。',hint:'as + 主谓'},
{id:'eb5',cat:'谚语',q:'「眼见为实」的英文是：',o:['Seeing is believing.','See is believe.','To see is to believe it is.','Seeing is to believe.'],a:0,sol:'Seeing is believing. 动名词对动名词。',hint:'两个 doing'},
{id:'eb6',cat:'谚语',q:'「今日事，今日毕」的英文是：',o:['Don\'t put off till tomorrow what should be done today.','Don\'t put off till tomorrow what should do today.','Not put to tomorrow what should be done today.','Don\'t delay today\'s thing to tomorrow do.'],a:0,sol:'Don\'t put off till tomorrow what should be done today. —— 主语从句后置，高分句。',hint:'put off 推迟'},
{id:'eb7',cat:'谚语',q:'「事实胜于雄辩」的英文是：',o:['Facts speak louder than words.','Fact speaks loud than word.','Facts are louder than speaking.','The fact speaks more than words.'],a:0,sol:'Facts speak louder than words. —— 比较级 + 复数主语。',hint:'speak louder'},
{id:'eb8',cat:'谚语',q:'「三思而后行」的英文是：',o:['Look before you leap.','Look after you leap.','See before you jump it.','Think three times then walk.'],a:0,sol:'Look before you leap. —— 决策/网络话题可用。',hint:'leap = 跳'},
{id:'eb9',cat:'谚语',q:'「良机勿失」的英文是：',o:['Make hay while the sun shines.','Make hay when the sun shines it.','Do hay in the sunshine.','Make the hay as sun shines.'],a:0,sol:'Make hay while the sun shines. —— 机会话题。',hint:'while 引导从句'},
{id:'ec0',cat:'谚语',q:'「金无足赤，人无完人」的英文是：',o:['Every man has his faults.','Every man has no fault.','Each people is perfect man.','All men have not mistakes.'],a:0,sol:'Every man has his faults. —— 包容/成长话题。',hint:'fault = 过错'},
{id:'ec1',cat:'谚语',q:'「万事开头难」的英文是：',o:['It is the first step that costs troublesome.','The first step is trouble some.','First step is the hardest thing of all it.','Beginning everything is difficult very.'],a:0,sol:'It is the first step that costs troublesome. —— 强调句。',hint:'It is...that 强调句'},
{id:'ec2',cat:'谚语',q:'「早起的鸟儿有虫吃」的英文是：',o:['The early bird catches the worm.','Early bird catch the worm.','The early birds catches worms.','An early bird catches worm.'],a:0,sol:'The early bird catches the worm. —— 勤奋话题。',hint:'单数 bird 配 catches'},
{id:'ec3',cat:'谚语',q:'「覆水难收」的英文是：',o:['It is no use crying over spilt milk.','It is no use to cry over spilt milk.','There is no use cry over spilt milk.','It is useless to cry for the milk spilt.'],a:0,sol:'It is no use doing sth. 做某事没用（doing 固定）。',hint:'no use + doing'}
,
/* ---------- S5 模板对号 ---------- */
{id:'eb10',cat:'文体',q:'2024 真题：想加入学校环保社团，写一封信说明个人情况、原因、想承担的工作和建议。这是哪种文体？',o:['申请信','邀请信','投诉信','通知 Notice'],a:0,sol:'向组织申请加入 → 申请信（apply to join）。',hint:'加入组织 = 申请'},
{id:'eb11',cat:'文体',q:'2022 真题：下周一要参加演讲比赛，不能上 Prof. Smith 的课，写信道歉并承诺补上。这是哪种文体？',o:['请假/道歉邮件','申请信','建议信','图表型作文'],a:0,sol:'向老师请假 + 表达歉意 → 请假/道歉邮件。',hint:'关键动作是请假道歉'},
{id:'eb12',cat:'文体',q:'2021 真题：邀请外教 John 担任英语演讲比赛评委，告知安排并请他点评。这是哪种文体？',o:['邀请信','申请信','投诉信','谢绝职位信'],a:0,sol:'invite you to be a judge → 邀请信。',hint:'核心动词是 invite'},
{id:'eb13',cat:'文体',q:'2019 真题：邀请外教 Tim 参加迎新晚会，介绍活动安排，请他发言。这是哪种文体？',o:['邀请信','道歉邮件','叙事征文','通知 Notice'],a:0,sol:'邀请信（和 2021 同款，只换了活动内容）。',hint:'又是 invite'},
{id:'eb14',cat:'文体',q:'2020 真题：朋友 Thomas 想来中国留学，回信欢迎、推荐学校、介绍城市、表达帮忙意愿。这是哪种文体？',o:['回信（欢迎+推荐）','投诉信','图表型作文','谢绝职位信'],a:0,sol:'回信：第一句 glad to hear that... 回应对方来信。',hint:'是在回复来信'},
{id:'eb15',cat:'文体',q:'2025 真题：学生会举办"交换旧书活动"，写一则公告说明时间地点、好处、可换书种，号召参加。这是哪种文体？',o:['通知 Notice','邀请信','申请信','建议信'],a:0,sol:'面向全校的公告 → Notice。落款写组织名，不写 Dear。',hint:'面向全校发公告'},
{id:'eb16',cat:'文体',q:'2023 真题：英语征文比赛，题目 My Favorite Photo，写拍照时间地点、照片内容、喜欢原因。这是哪种文体？',o:['叙事征文','投诉信','图表型作文','谢绝职位信'],a:0,sol:'叙事征文：不是书信，标题写 My Favorite Photo，正文三段（时间地点→内容→原因）。',hint:'不是写信，是写文章'},
{id:'eb17',cat:'文体',q:'题目要求：你在网上买了假货，给平台写信要求处理。用哪个模板？',o:['投诉信','建议信','邀请信','图画型作文'],a:0,sol:'投诉信：I am writing to lodge the complaint about... + 经过 + 处理要求。',hint:'不满 + 要求处理'},
{id:'eb18',cat:'文体',q:'题目给出一张图（如趴在手机上的学生），要求描述并评论。用哪个模板？',o:['图画型作文','图表型作文','名言谚语型','分析利弊型'],a:0,sol:'图画型：As can be seen from the picture... 描述图画 → 分析 → 观点。',hint:'给的是图不是数据'},
{id:'eb19',cat:'文体',q:'题目引用一句谚语（如 Practice makes perfect），要求评论。用哪个模板？',o:['名言谚语型','图画型作文','建议信','投诉信'],a:0,sol:'名言谚语型：... as the saying goes. It highlights... → 分析 → 重申。',hint:'题目给了引言'},
{id:'eb20',cat:'文体',q:'题目要求讨论"网络教学的利与弊"。用哪个模板？',o:['分析利弊型','图画型作文','邀请信','叙事征文'],a:0,sol:'分析利弊型：On the one hand... On the other hand... → double-edged sword 收尾。',hint:'关键词"利与弊"'},
{id:'eb21',cat:'文体',q:'题目给出一张数据图（如大学生月消费变化），要求描述并评论。用哪个模板？',o:['图表型作文','图画型作文','名言谚语型','观点对照型'],a:0,sol:'图表型：The graph demonstrates that the number of... is growing rapidly... 数据用图表型，画用图画型。',hint:'给的是数据图'}
]
};
/* ============================================================================
 * 作文 25 分 · 模板速成（模块逻辑层）
 * 数据在文件头部 window.ESSAY80，本段为 UI 逻辑（仿 cloze80 模块）。
 * 依赖主程序全局：S/st/save/addXp/go/toast/shuffle/escapeHtml/getMate/pick/speak/stopSpeak
 * 屏幕：#s-essay + #essayBody；两级返回：子视图 → 模块主页 → 自习室(s-study)
 * ========================================================================== */
function essayD(){ return window.ESSAY80 || null; }
function essayFresh(){
  return { mode:'home', stage:null, queue:[], idx:0, q:null, picked:null, done:false,
    score:0, combo:0, t0:0, hintOn:false, refIdx:0, listOpen:false };
}
function essayST(){
  if(!st.essay) st.essay = {};
  st.essay.pass = st.essay.pass || {};   // {stageId: 最佳正确率}
  st.essay.wrong = st.essay.wrong || {}; // {qid:1}
  return st.essay;
}
function startEssay(){
  const d = essayD(); if(!d){ toast('作文专项数据未加载'); return; }
  essayST();
  S.essay = essayFresh();
  go('s-essay'); renderEssay();
}
function essayBack(){
  const p = S.essay; if(!p){ go('s-study'); return; }
  if(p.mode !== 'home'){ p.mode = 'home'; p.queue = []; p.q = null; p.picked = null; p.done = false; p.stage = null; renderEssay(); }
  else go('s-study');
}
function renderEssay(){
  const body = document.getElementById('essayBody'); if(!body) return;
  const d = essayD(); if(!d){ body.innerHTML = '<div class="card">数据加载中…</div>'; return; }
  const p = S.essay || (S.essay = essayFresh());
  if(p.mode === 'quiz') return essayQuiz(body, d, p);
  if(p.mode === 'done') return essayDone(body, d, p);
  if(p.mode === 'wrong') return essayWrongView(body, d, p);
  if(p.mode === 'word') return essayWordView(body, d, p);
  if(p.mode === 'ref') return essayRefView(body, d, p);
  return essayHome(body, d, p);
}
function essayMate(d){ return getMate((d.meta && d.meta.mate) || 'xue'); }
function essayStageById(d, id){ for(let i=0;i<d.stages.length;i++){ if(d.stages[i].id === id) return d.stages[i]; } return null; }
function essayStars(rate){ return rate >= 90 ? 3 : rate >= 75 ? 2 : rate >= 60 ? 1 : 0; }
function essayStarStr(n){ return '★★★'.slice(0, n) + '☆☆☆'.slice(0, 3 - n); }
function essayHl(t){
  return escapeHtml(String(t)).replace(/_{2,}/g, '<b style="color:var(--magenta)">______</b>')
    .replace(/\n/g, '<br>');
}
/* ---------------------------- 主页 ---------------------------- */
function essayHome(body, d, p){
  const s = essayST();
  const mate = essayMate(d);
  const done = d.stages.filter(function(x){ return s.pass[x.id] !== undefined; }).length;
  const wrongN = Object.keys(s.wrong).length;
  let h = '';
  h += '<div style="padding:14px 16px 6px">'
     + '<div style="font-size:19px;font-weight:800">✍️ ' + escapeHtml(d.meta.title) + '</div>'
     + '<div style="font-size:12.5px;color:var(--sub);line-height:1.6;margin-top:4px">' + escapeHtml(d.meta.tip) + '</div></div>';
  h += '<div class="grid4" style="padding:0 16px">'
     + '<div class="stat"><b>' + done + '/' + d.stages.length + '</b><span>已通关卡</span></div>'
     + '<div class="stat"><b>' + (d.meta.total_q || 0) + '</b><span>专训题量</span></div>'
     + '<div class="stat"><b>' + wrongN + '</b><span>错题待清</span></div>'
     + '<div class="stat"><b>' + (d.meta.coverage || '17+') + '</b><span>目标分</span></div></div>';
  /* 抄题三步法卡（永远置顶展示——本模块的灵魂） */
  h += '<div class="card mt10" style="margin:0 16px"><div style="font-weight:800;margin-bottom:6px">📋 抄题三步法 · 活动/日期不会写？抄！</div>'
     + '<div style="font-size:12.5px;line-height:1.75;color:var(--sub)">';
  d.copy3.forEach(function(c){ h += '<div style="margin-bottom:6px"><b style="color:var(--gold)">' + escapeHtml(c.t) + '</b> —— ' + escapeHtml(c.d) + '</div>'; });
  h += '</div><div style="font-size:12px;color:#ff6b8a;margin-top:4px">' + escapeHtml(d.copyWarn) + '</div></div>';
  /* 六关 */
  h += '<div class="sec-title" style="margin:14px 16px 0"><span class="bar"></span>一天闯关<small>按顺序打，别跳</small></div>';
  h += '<div class="c20-grid" style="padding:0 16px">';
  d.stages.forEach(function(g){
    const r = s.pass[g.id];
    const badge = (r === undefined) ? '' : ' · ' + essayStarStr(essayStars(r));
    h += '<div class="c20-mode" onclick="essayStart(\'' + g.id + '\')"><div class="mi">' + g.icon + '</div>'
       + '<div class="mn">' + escapeHtml(g.name) + '</div>'
       + '<div class="md">' + escapeHtml(g.desc) + escapeHtml(badge) + '</div></div>';
  });
  h += '</div>';
  /* 工具 */
  h += '<div class="row2 mt10" style="padding:0 16px">'
     + '<button class="btn keep" onclick="essayGoRef()">📚 真题范文库 2019-2025</button>'
     + '<button class="btn ghost" onclick="essayGoWord()">🗂 速查：槽位/句型/谚语/评分</button></div>';
  h += '<div class="row2 mt10" style="padding:0 16px">'
     + '<button class="btn ghost" onclick="essayGoWrong()">🔁 错题本 ' + (wrongN || '') + '</button>'
     + '<button class="btn ghost" onclick="essayBack()">← 返回自习室</button></div>';
  body.innerHTML = h;
}
/* ---------------------------- 出题 ---------------------------- */
function essayStart(stageId){
  const d = essayD(); const p = S.essay;
  const g = essayStageById(d, stageId);
  if(!g){ toast('关卡不存在'); return; }
  /* 关卡-题目按 cat 前缀匹配：s0 骨架 / s1 抄题 / s2 槽位 / s3 句型 / s4 谚语 / s5 文体 */
  const prefix = {s0:'骨架',s1:'抄题',s2:'槽位',s3:'句型',s4:'谚语',s5:'文体'}[stageId];
  let pool = d.Q.filter(function(q){ return q.cat === prefix || q.cat.indexOf(prefix + '·') === 0; });
  if(!pool.length){ toast('该关卡题目为空'); return; }
  const need = 12;
  if(pool.length > need) pool = shuffle(pool).slice(0, need);
  p.mode = 'quiz'; p.stage = stageId; p.queue = pool;
  p.idx = 0; p.q = null; p.picked = null; p.done = false; p.score = 0; p.combo = 0; p.hintOn = false;
  p.t0 = Date.now();
  renderEssay();
}
function essayStartWrong(){
  const d = essayD(); const p = S.essay; const s = essayST();
  const ks = Object.keys(s.wrong);
  if(!ks.length){ toast('错题本是空的，先去做几关吧'); return; }
  const map = {}; d.Q.forEach(function(q){ map[q.id] = q; });
  const pool = ks.map(function(k){ return map[k]; }).filter(Boolean);
  if(!pool.length){ toast('错题已清空'); s.wrong = {}; save(); renderEssay(); return; }
  p.mode = 'quiz'; p.stage = '_wrong'; p.queue = pool;
  p.idx = 0; p.q = null; p.picked = null; p.done = false; p.score = 0; p.combo = 0;
  p.t0 = Date.now();
  renderEssay();
}
/* ---------------------------- 答题页 ---------------------------- */
function essayQuiz(body, d, p){
  if(p.q === null || p.q === undefined){
    if(p.idx >= p.queue.length){ p.mode = 'done'; return renderEssay(); }
    p.q = p.queue[p.idx]; p.picked = null; p.done = false; p.hintOn = false;
  }
  const q = p.q, total = p.queue.length;
  const mate = essayMate(d);
  const combo = p.combo || 0;
  const isLast = (p.idx >= total - 1);
  const pct = Math.round((p.idx + (p.done ? 1 : 0)) / total * 100);
  const g = p.stage === '_wrong' ? { name:'错题本', icon:'🔁' } : essayStageById(d, p.stage);
  let h = '';
  h += '<div style="padding:14px 16px 8px">'
     + '<div class="qbar" style="margin-bottom:5px"><span>' + escapeHtml((g && g.icon ? g.icon + ' ' : '') + (g ? g.name : '')) + '</span>'
     + '<div class="prog"><i style="width:' + pct + '%"></i></div>'
     + '<span>' + (p.idx + 1) + '/' + total + '</span></div></div>';
  h += '<div class="chat" style="padding:0 16px">';
  if(combo >= 3) h += '<div><span class="combobadge">' + (combo >= 8 ? '🔥🔥 火力全开 x' : '🔥 连击 x') + combo + '</span></div>';
  h += '<div class="chat-q mem-coach"><img class="chat-av" src="' + mate.img + '" alt="' + escapeHtml(mate.name) + '" onerror="this.style.display=\'none\'">'
     + '<div class="bubble qbubble"><div class="who">' + escapeHtml(mate.name) + '</div>'
     + (p.done ? pick(p.picked === q.a ? mate.lines.correct : mate.lines.wrong)
               : '不会写的词不要硬造——抄题、翻槽位词库，或点下面的提示。') + '</div></div>';
  h += '<div class="chat-q"><img class="chat-av" src="' + mate.img + '" alt="' + escapeHtml(mate.name) + '" onerror="this.style.display=\'none\'">'
     + '<div class="bubble qbubble"><div class="qtext" style="font-size:14px;line-height:1.8">' + essayHl(q.q) + '</div></div></div>';
  h += '<div class="chat-replies">';
  q.o.forEach(function(txt, i){
    let cls = 'opt chat-opt';
    if(p.done){ cls += ' dis'; if(i === q.a) cls += ' ok'; else if(i === p.picked) cls += ' no'; }
    h += '<div class="' + cls + '" ' + (p.done ? '' : 'onclick="essayPick(' + i + ')"') + '><div class="k">' + 'ABCD'[i] + '</div><div>' + escapeHtml(txt) + '</div></div>';
  });
  h += '</div></div>';
  /* 提示卡（答前可看，答后并入解析） */
  if(!p.done && p.hintOn && q.hint){
    h += '<div style="padding:8px 16px 0"><div class="sol show" style="border-color:rgba(255,201,87,.4)"><div style="font-size:13px;color:var(--gold)">💡 ' + escapeHtml(q.hint) + '</div></div></div>';
  }
  h += '<div style="padding:0 16px">';
  if(p.done){
    const ok = (p.picked === q.a);
    h += '<div class="sol show ' + (ok ? 'good' : 'bad') + '"><div class="h">'
       + (ok ? '✅ 答对了' : '❌ 正确答案：' + 'ABCD'[q.a] + '. ' + escapeHtml(q.o[q.a]))
       + '</div><div style="font-size:13px;line-height:1.7">' + escapeHtml(q.sol || '') + '</div>'
       + (q.hint ? '<div style="margin-top:6px;color:var(--gold);font-size:12.5px">💡 ' + escapeHtml(q.hint) + '</div>' : '')
       + '<div style="margin-top:6px;font-size:12px;color:var(--sub)">考点：' + escapeHtml(q.cat) + '</div>'
       + '</div>';
  }
  h += '<div class="btns mt10">'
     + (!p.done ? '<button class="btn sm ghost" onclick="essayHint()">💡 提示</button>' : '')
     + '<button class="btn sm ghost" onclick="essayMark()">🔖 标记入错题本</button>'
     + '<button class="btn sm ghost" onclick="essayBack()">← 返回主页</button></div>';
  if(p.done) h += '<button class="btn keep mt10" style="width:100%" onclick="essayNext()">' + (isLast ? '查看本关结果 ▶' : '下一题 ▶') + '</button>';
  h += '</div>';
  body.innerHTML = h;
}
function essayHint(){ const p = S.essay; if(!p || p.done) return; p.hintOn = !p.hintOn; renderEssay(); }
function essayPick(i){
  const p = S.essay; if(!p || p.done) return;
  const q = p.q;
  p.picked = i; p.done = true;
  const s = essayST();
  if(i === q.a){
    p.score++; p.combo = (p.combo || 0) + 1;
    delete s.wrong[q.id];
    try{ addXp(2); }catch(e){}
  } else {
    p.combo = 0; s.wrong[q.id] = 1;
  }
  save();
  renderEssay();
}
function essayMark(){
  const p = S.essay; if(!p || !p.q) return;
  const s = essayST();
  if(s.wrong[p.q.id]){ delete s.wrong[p.q.id]; toast('已移出错题本'); }
  else { s.wrong[p.q.id] = 1; toast('已加入错题本'); }
  save(); renderEssay();
}
function essayNext(){
  const p = S.essay; if(!p) return;
  p.idx++;
  if(p.idx >= p.queue.length){ p.mode = 'done'; renderEssay(); return; }
  p.q = null; p.picked = null; p.done = false; p.hintOn = false;
  renderEssay();
}
/* ---------------------------- 结算 ---------------------------- */
function essayDone(body, d, p){
  const total = p.queue.length, score = p.score;
  const rate = total ? Math.round(score / total * 100) : 0;
  const s = essayST();
  const g = p.stage === '_wrong' ? { name:'错题本', icon:'🔁' } : essayStageById(d, p.stage);
  let isNew = false;
  if(p.stage !== '_wrong' && p.stage){
    if(s.pass[p.stage] === undefined || rate > s.pass[p.stage]){ s.pass[p.stage] = rate; isNew = true; }
  }
  const secs = p.t0 ? Math.round((Date.now() - p.t0) / 1000) : 0;
  save();
  const stars = essayStars(rate);
  let h = '';
  h += '<div style="padding:16px">';
  h += '<div class="card" style="text-align:center;padding:20px 14px">'
     + '<div style="font-size:34px">' + (rate >= 90 ? '🏆' : rate >= 75 ? '🎉' : rate >= 60 ? '💪' : '📖') + '</div>'
     + '<div style="font-size:20px;font-weight:800;margin-top:6px">' + score + ' / ' + total + '</div>'
     + '<div style="font-size:14px;color:var(--gold);font-weight:800;letter-spacing:3px;margin-top:4px">' + essayStarStr(stars) + '</div>'
     + '<div style="font-size:13px;color:var(--sub);margin-top:6px">正确率 <b>' + rate + '%</b> · 用时 ' + secs + 's'
     + (isNew && p.stage !== '_wrong' ? ' · <b style="color:var(--teal)">新纪录</b>' : '') + '</div>'
     + '<div style="font-size:12.5px;color:var(--sub);margin-top:8px">' + escapeHtml(g ? g.name : '') + ' 已' + (rate >= 75 ? '达标 ✅' : '完成 · 建议刷到 75% 以上') + '</div>'
     + '</div>';
  if(rate < 75){
    const s2 = essayST();
    const w = p.queue.filter(function(q){ return s2.wrong[q.id]; });
    h += '<div class="card mt10"><div style="font-weight:800;margin-bottom:6px">🔁 本关错题（自动进错题本）</div>'
       + '<div style="font-size:12.5px;color:var(--sub);line-height:1.7">'
       + (w.length ? w.map(function(q){ return '<div style="margin-bottom:5px">· ' + escapeHtml(String(q.q).slice(0, 42)) + '… → <b>' + 'ABCD'[q.a] + '. ' + escapeHtml(q.o[q.a]) + '</b></div>'; }).join('') : '本关没有留下错题，漂亮。')
       + '</div></div>';
  }
  h += '<div class="row2 mt10"><button class="btn keep" onclick="essayStart(\'' + p.stage + '\')">↻ 再刷一遍</button>'
     + '<button class="btn ghost" onclick="essayGoWrong()">🔁 只刷错题</button></div>';
  h += '<button class="btn ghost mt10" style="width:100%" onclick="essayBack()">← 返回模块主页</button>';
  h += '</div>';
  body.innerHTML = h;
}
/* ---------------------------- 错题本 ---------------------------- */
function essayGoWrong(){ const p = S.essay; if(!p) return; p.mode = 'wrong'; renderEssay(); }
function essayWrongView(body, d, p){
  const s = essayST();
  const map = {}; d.Q.forEach(function(q){ map[q.id] = q; });
  const ks = Object.keys(s.wrong).filter(function(k){ return map[k]; });
  let h = '';
  h += '<div style="padding:14px 16px 6px"><div style="font-size:18px;font-weight:800">🔁 错题本</div>'
     + '<div style="font-size:12.5px;color:var(--sub);margin-top:4px">共 ' + ks.length + ' 题 · 答对即移出</div></div>';
  if(!ks.length){
    h += '<div class="card" style="margin:0 16px">暂无错题。去「一天闯关」打几关吧～</div>';
  } else {
    h += '<div style="padding:0 16px">';
    ks.forEach(function(k){
      const q = map[k];
      h += '<div class="card mt10" style="margin:0"><div style="font-size:13px;line-height:1.7">' + escapeHtml(String(q.q).slice(0, 70)) + '…</div>'
         + '<div style="font-size:12.5px;color:var(--teal);font-weight:700;margin-top:6px">' + 'ABCD'[q.a] + '. ' + escapeHtml(q.o[q.a]) + '</div>'
         + '<div style="font-size:12px;color:var(--sub);margin-top:4px;line-height:1.6">' + escapeHtml(String(q.sol || '').slice(0, 90)) + '</div></div>';
    });
    h += '</div>';
    h += '<div style="padding:0 16px"><button class="btn keep mt10" style="width:100%" onclick="essayStartWrong()">开始重做错题 ▶</button></div>';
  }
  h += '<div style="padding:0 16px"><button class="btn ghost mt10" style="width:100%" onclick="essayBack()">← 返回模块主页</button></div>';
  body.innerHTML = h;
}
/* ---------------------------- 速查：槽位/句型/谚语/评分 ---------------------------- */
function essayGoWord(){ const p = S.essay; if(!p) return; p.mode = 'word'; renderEssay(); }
function essayTagRow(items){
  return items.map(function(it){ return '<span class="ph-tag">' + escapeHtml(it.en) + ' <i style="font-style:normal;opacity:.6">' + escapeHtml(it.zh) + '</i></span>'; }).join('');
}
function essayWordView(body, d, p){
  let h = '<div style="padding:14px 16px 6px"><div style="font-size:18px;font-weight:800">🗂 速查手册</div>'
     + '<div style="font-size:12.5px;color:var(--sub);margin-top:4px">槽位词库（抄题兜底用）· 万能句型 100 · 谚语 100 · 官方评分五档</div></div>';
  /* 槽位词库 */
  h += '<div class="card mt10" style="margin:0 16px"><div style="font-weight:800;margin-bottom:7px">🗂 万能槽位词库 <small style="font-weight:600;color:var(--sub)">活动/日期不会写？来这里拿</small></div>';
  d.slotCats.forEach(function(cn, ci){
    const items = d.slots.filter(function(x){ return x.c === ci; });
    if(!items.length) return;
    h += '<div style="font-size:12.5px;color:var(--gold);font-weight:800;margin:8px 0 5px">' + (ci + 1) + '. ' + escapeHtml(cn) + '</div><div>' + essayTagRow(items) + '</div>';
  });
  h += '</div>';
  /* 十大模板 */
  h += '<div class="card mt10" style="margin:10px 16px 0"><div style="font-weight:800;margin-bottom:7px">📐 十大作文模板（背骨架）</div>';
  d.templates.forEach(function(t){
    h += '<div style="font-size:12.5px;font-weight:800;color:var(--teal);margin:8px 0 3px">' + escapeHtml(t.icon + ' ' + t.name) + '</div>'
       + '<div style="font-size:12px;color:var(--sub);line-height:1.6">' + t.paras.map(function(pp){ return essayHl(pp); }).join('<br>') + '</div>'
       + '<div style="font-size:11.5px;color:var(--sub);margin-top:3px;opacity:.85">' + escapeHtml(t.notes) + '</div>';
  });
  h += '</div>';
  /* 100 句型 */
  h += '<div class="card mt10" style="margin:10px 16px 0"><div style="font-weight:800;margin-bottom:7px">🧩 万能句型 × ' + d.sentences.length + '</div>';
  d.sentCats.forEach(function(cn, ci){
    const items = d.sentences.filter(function(x){ return x.c === ci; });
    if(!items.length) return;
    h += '<div style="font-size:12.5px;color:var(--gold);font-weight:800;margin:8px 0 5px">' + (ci + 1) + '. ' + escapeHtml(cn) + '（' + items.length + '）</div>';
    items.forEach(function(it){
      h += '<div style="font-size:12.5px;line-height:1.7;margin-bottom:4px"><b>' + escapeHtml(it.en) + '</b> <span style="color:var(--sub)">' + escapeHtml(it.zh) + '</span></div>';
    });
  });
  h += '</div>';
  /* 100 谚语 */
  h += '<div class="card mt10" style="margin:10px 16px 0"><div style="font-weight:800;margin-bottom:7px">💎 写作谚语 × ' + d.proverbs.length + '</div>';
  d.provCats.forEach(function(cn, ci){
    const items = d.proverbs.filter(function(x){ return x.c === ci; });
    if(!items.length) return;
    h += '<div style="font-size:12.5px;color:var(--gold);font-weight:800;margin:8px 0 5px">' + (ci + 1) + '. ' + escapeHtml(cn) + '</div>';
    items.forEach(function(it){
      h += '<div style="font-size:12.5px;line-height:1.7;margin-bottom:4px"><b>' + escapeHtml(it.en) + '</b> <span style="color:var(--sub)">' + escapeHtml(it.zh) + '</span></div>';
    });
  });
  h += '</div>';
  /* 评分五档 */
  h += '<div class="card mt10" style="margin:10px 16px 0"><div style="font-weight:800;margin-bottom:7px">📏 官方评分五档（满分 25 · 100-120 词）</div><div style="font-size:12.5px;line-height:1.8;color:var(--sub)">';
  d.bands.forEach(function(b){ h += '<div style="margin-bottom:5px"><b style="color:var(--teal)">' + escapeHtml(b.r) + ' 分 · ' + escapeHtml(b.t) + '</b> —— ' + escapeHtml(b.d) + '</div>'; });
  h += '<div style="margin-top:6px">⚠️ 字数不足 100 扣 1-2 分（不足 80 扣 2-5 分）；书写潦草降一档；<b style="color:#ff6b8a">整段抄阅读理解判 0 分</b>。</div></div></div>';
  h += '<button class="btn ghost mt10" style="width:calc(100% - 32px);margin:10px 16px 16px" onclick="essayBack()">← 返回模块主页</button>';
  body.innerHTML = h;
}
/* ---------------------------- 真题范文库 ---------------------------- */
function essayGoRef(){ const p = S.essay; if(!p) return; p.mode = 'ref'; p.refIdx = 0; renderEssay(); }
function essayRefView(body, d, p){
  const r = d.real[p.refIdx] || d.real[0];
  let h = '<div style="padding:14px 16px 6px"><div style="font-size:18px;font-weight:800">📚 真题范文库 · 2019-2025</div>'
     + '<div style="font-size:12.5px;color:var(--sub);margin-top:4px">七年全收录 · ' + escapeHtml(d.realStage.desc) + '</div></div>';
  h += '<div style="display:flex;gap:8px;padding:0 16px;flex-wrap:wrap">';
  d.real.forEach(function(x, i){
    h += '<button class="btn sm ' + (i === p.refIdx ? 'keep' : 'ghost') + '" onclick="essayRefTo(' + i + ')">' + x.y + '</button>';
  });
  h += '</div>';
  h += '<div class="card mt10" style="margin:0 16px">'
     + '<div style="font-weight:800;font-size:15px">' + r.y + ' · ' + escapeHtml(r.type) + '</div>'
     + '<div style="font-size:12.5px;color:var(--gold);font-weight:700;margin-top:6px">题目要点</div>'
     + '<div style="font-size:12.5px;color:var(--sub);line-height:1.7">' + escapeHtml(r.prompt) + '</div>'
     + '<div style="font-size:12.5px;color:var(--teal);font-weight:700;margin-top:10px">参考范文（' + String(r.essay).split(/\s+/).length + ' 词左右）</div>'
     + '<div style="font-size:13px;line-height:1.8;white-space:pre-wrap;background:rgba(0,0,0,.04);border-radius:10px;padding:10px;margin-top:5px">' + escapeHtml(r.essay) + '</div>'
     + '<div style="font-size:12.5px;color:var(--magenta);font-weight:700;margin-top:10px">用到的槽位</div>'
     + '<div style="font-size:12.5px;color:var(--sub);line-height:1.7">' + escapeHtml(r.slots) + '</div>'
     + '<div style="font-size:12px;color:var(--sub);margin-top:8px;opacity:.9">💡 ' + escapeHtml(r.note) + '</div>'
     + '</div>';
  h += '<div style="padding:0 16px"><button class="btn ghost mt10" style="width:100%" onclick="essayBack()">← 返回模块主页</button></div>';
  body.innerHTML = h;
}
function essayRefTo(i){ const p = S.essay; if(!p) return; p.refIdx = i; renderEssay(); }
