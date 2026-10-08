/* v3.10.12 · 英语语音辨析（Phonetics）· 纯静态数据源 window.PHON
   成考英语第一大题「语音知识」：每题给 4 个单词（画线部分），选出读音不同的一项。
   四件套之一：data/phon_pol.js + s-phon 屏 + 自习室入口 + 模块JS，离线可用。
   题库基于成考历年真题的题型与高频陷阱规律整理（代表性练习库，非逐题原题）；
   每题含 answer（不同项下标）与 rule（对应发音规律提示），答错即弹出规律。 */
window.PHON = {
  meta: {
    subject: '成考英语',
    title: '语音辨析 · 选读音不同的一项',
    src: '基于成考英语历年真题题型与高频异读规律整理（代表性题库，非逐题原题）',
    tip: '第1大题语音知识共 5 分。考点几乎全在元音与特殊组合（th/oo/ea/ed/s/ch/c/g/gh/wh/ng/ou/ow/ai/ear/our 等），背熟规律比硬记单词更划算。'
  },

  /* 高频异读组合速查（主页展示，半小时背熟可认出大部分题） */
  cheat: [
    ['a / e / i / o / u', '开音节(…e 或 元+辅+不发音e)读字母名音 /eɪ/ /iː/ /aɪ/ /əʊ/ /juː/；闭音节（辅音结尾无 e）读短音 /æ/ /e/ /ɪ/ /ɒ/ /ʌ/', 'cake/map · these/set · bike/sit · note/dog · use/cut'],
    ['th', '在 this/that/with 等代词、介词中读浊音 /ð/；其余多读清音 /θ/', 'this/with → /ð/；think/three → /θ/'],
    ['oo', '多数读 /ʊ/；少数读 /uː/', 'book/look/good → /ʊ/；moon/food/room → /uː/'],
    ['ea', '常读 /iː/；在 head/bread/dead 中读 /e/', 'tea/read/meat → /iː/；head/bread → /e/'],
    ['-ed (过去式)', '清辅音后 /t/；浊辅音或元音后 /d/；t/d 后 /ɪd/', 'washed/looked → /t/；played/called → /d/；wanted/needed → /ɪd/'],
    ['-s (复数/三单)', '清后 /s/；浊或元音后 /z/；s/ʃ/tʃ/z 后 /ɪz/', 'maps/cats → /s/；dogs/boys → /z/；boxes/watches → /ɪz/'],
    ['ch', '一般 /tʃ/；在 machine/Chicago 等中 /ʃ/', 'chair/teacher/child → /tʃ/；machine → /ʃ/'],
    ['c', '在 e/i/y 前读 /s/；其余 /k/', 'city/cycle/face → /s/；cat/cold → /k/'],
    ['g', '在 e/i/y 前读 /dʒ/；其余 /g/', 'page/large/gym → /dʒ/；go/get → /g/'],
    ['gh', '多数不发音；在 cough/rough/enough/laugh 中读 /f/', 'high/light/right 不发音；cough/rough → /f/'],
    ['wh', '一般 /w/；在 who/whom/whose 中 /h/', 'what/where/white → /w/；who → /h/'],
    ['ng', '词尾或 n+k 前读 /ŋ/；在 ngle 中读 /ŋg/', 'sing/long/thing → /ŋ/；angle → /ŋg/'],
    ['ou', '常 /aʊ/；在 young/country/cousin 中 /ʌ/', 'house/count/mouth → /aʊ/；young → /ʌ/'],
    ['ow', '词尾常 /aʊ/；在 low/know/show 中 /əʊ/', 'how/now/down → /aʊ/；low/know → /əʊ/'],
    ['ai / ay', '常 /eɪ/；said 中 /e/', 'rain/wait/day → /eɪ/；said → /e/'],
    ['ear', '在 bear/wear 中 /eə/；其余多 /ɪə/', 'bear/wear → /eə/；ear/hear/near → /ɪə/'],
    ['our', '在 hour/our/flower 中 /aʊə/；在 four/your 中 /ɔː/', 'hour/our/flower → /aʊə/；four/your → /ɔː/']
  ],

  /* 练习题库：items 为 4 个单词，u 为画线部分；answer 为读音不同的项下标；rule 为规律提示 */
  questions: [
    { id:'ph1', items:[{w:'cake',u:'a'},{w:'face',u:'a'},{w:'map',u:'a'},{w:'late',u:'a'}], answer:2,
      rule:'开音节中 a 读字母名音 /eɪ/（cake/face/late）；闭音节（辅音结尾无 e）中 a 读短音 /æ/（map）。' },
    { id:'ph2', items:[{w:'these',u:'e'},{w:'theme',u:'e'},{w:'set',u:'e'},{w:'me',u:'e'}], answer:2,
      rule:'e 开音节读 /iː/（these/theme/me）；闭音节读短音 /e/（set）。' },
    { id:'ph3', items:[{w:'bike',u:'i'},{w:'fine',u:'i'},{w:'sit',u:'i'},{w:'time',u:'i'}], answer:2,
      rule:'i 开音节读 /aɪ/（bike/fine/time）；闭音节读短音 /ɪ/（sit）。' },
    { id:'ph4', items:[{w:'note',u:'o'},{w:'home',u:'o'},{w:'dog',u:'o'},{w:'rope',u:'o'}], answer:2,
      rule:'o 开音节读 /əʊ/（note/home/rope）；闭音节读短音 /ɒ/（dog）。' },
    { id:'ph5', items:[{w:'use',u:'u'},{w:'student',u:'u'},{w:'cut',u:'u'},{w:'June',u:'u'}], answer:2,
      rule:'u 开音节常读 /juː/（use/student/June）；闭音节读短音 /ʌ/（cut）。' },
    { id:'ph6', items:[{w:'think',u:'th'},{w:'three',u:'th'},{w:'this',u:'th'},{w:'thick',u:'th'}], answer:2,
      rule:'th 在 this/that/with 等代词、介词中读浊音 /ð/；其余多读清音 /θ/（think/three/thick）。' },
    { id:'ph7', items:[{w:'book',u:'oo'},{w:'look',u:'oo'},{w:'good',u:'oo'},{w:'moon',u:'oo'}], answer:3,
      rule:'oo 多数读 /ʊ/（book/look/good）；少数读长音 /uː/（moon/food/room）。' },
    { id:'ph8', items:[{w:'tea',u:'ea'},{w:'read',u:'ea'},{w:'head',u:'ea'},{w:'meat',u:'ea'}], answer:2,
      rule:'ea 常读 /iː/（tea/read/meat）；在 head/bread/dead 中读 /e/。' },
    { id:'ph9', items:[{w:'called',u:'ed'},{w:'played',u:'ed'},{w:'lived',u:'ed'},{w:'wanted',u:'ed'}], answer:3,
      rule:'动词过去式 -ed：清后 /t/、浊/元音后 /d/、t/d 后 /ɪd/。wanted/needed 读 /ɪd/，called/played/lived 读 /d/。' },
    { id:'ph10', items:[{w:'maps',u:'s'},{w:'cats',u:'s'},{w:'books',u:'s'},{w:'dogs',u:'s'}], answer:3,
      rule:'名词复数/三单 -s：清后 /s/（maps/cats/books），浊或元音后 /z/（dogs/boys）。' },
    { id:'ph11', items:[{w:'chair',u:'ch'},{w:'teacher',u:'ch'},{w:'child',u:'ch'},{w:'machine',u:'ch'}], answer:3,
      rule:'ch 一般读 /tʃ/（chair/teacher/child）；在 machine/Chicago 等中读 /ʃ/。' },
    { id:'ph12', items:[{w:'city',u:'c'},{w:'cycle',u:'c'},{w:'face',u:'c'},{w:'cat',u:'c'}], answer:3,
      rule:'c 在 e/i/y 前读 /s/（city/cycle/face）；其余读 /k/（cat/cold）。' },
    { id:'ph13', items:[{w:'page',u:'g'},{w:'large',u:'g'},{w:'gym',u:'g'},{w:'go',u:'g'}], answer:3,
      rule:'g 在 e/i/y 前读 /dʒ/（page/large/gym）；其余读 /g/（go/get）。' },
    { id:'ph14', items:[{w:'high',u:'gh'},{w:'light',u:'gh'},{w:'right',u:'gh'},{w:'cough',u:'gh'}], answer:3,
      rule:'gh 多数不发音（high/light/right）；在 cough/rough/enough/laugh 中读 /f/。' },
    { id:'ph15', items:[{w:'what',u:'wh'},{w:'where',u:'wh'},{w:'white',u:'wh'},{w:'who',u:'wh'}], answer:3,
      rule:'wh 一般读 /w/（what/where/white）；在 who/whom/whose 中读 /h/。' },
    { id:'ph16', items:[{w:'sing',u:'ng'},{w:'long',u:'ng'},{w:'thing',u:'ng'},{w:'angle',u:'ng'}], answer:3,
      rule:'ng 词尾或 n+k 前读 /ŋ/（sing/long/thing）；在 ngle 中读 /ŋg/（angle）。' },
    { id:'ph17', items:[{w:'house',u:'ou'},{w:'count',u:'ou'},{w:'mouth',u:'ou'},{w:'young',u:'ou'}], answer:3,
      rule:'ou 常读 /aʊ/（house/count/mouth）；在 young/country/cousin 中读 /ʌ/。' },
    { id:'ph18', items:[{w:'how',u:'ow'},{w:'now',u:'ow'},{w:'down',u:'ow'},{w:'low',u:'ow'}], answer:3,
      rule:'ow 词尾常读 /aʊ/（how/now/down）；在 low/know/show 中读 /əʊ/。' },
    { id:'ph19', items:[{w:'rain',u:'ai'},{w:'wait',u:'ai'},{w:'day',u:'ay'},{w:'said',u:'ai'}], answer:3,
      rule:'ai/ay 常读 /eɪ/（rain/wait/day）；said 中读 /e/。' },
    { id:'ph20', items:[{w:'ear',u:'ear'},{w:'hear',u:'ear'},{w:'bear',u:'ear'},{w:'near',u:'ear'}], answer:2,
      rule:'ear 在 bear/wear 中读 /eə/；其余多读 /ɪə/（ear/hear/near）。' },
    { id:'ph21', items:[{w:'hour',u:'our'},{w:'our',u:'our'},{w:'flour',u:'our'},{w:'four',u:'our'}], answer:3,
      rule:'our 在 hour/our/flower 中读 /aʊə/；在 four/your 中读 /ɔː/。' },
    { id:'ph22', items:[{w:'my',u:'y'},{w:'try',u:'y'},{w:'by',u:'y'},{w:'gym',u:'y'}], answer:3,
      rule:'词尾 y 在开音节读 /aɪ/（my/try/by）；在 gym 等闭音节读 /ɪ/。' },
    { id:'ph23', items:[{w:'piece',u:'ie'},{w:'field',u:'ie'},{w:'believe',u:'ie'},{w:'die',u:'ie'}], answer:3,
      rule:'ie 常读 /iː/（piece/field/believe）；在 die/lie/tie 中读 /aɪ/。' }
  ]
};
