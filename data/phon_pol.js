/* v3.10.17 · 英语语音辨析（Phonetics）· 专项突破数据源 window.PHON
   成考英语第一大题「语音知识」：每题给 4 个单词（画线部分），选出读音不同的一项。
   本文件由 gen_phon.js 从题库总库 SUBJ_BANK 的 eng+语音 真题自动派生（画线字母 u 与规律 rule
   均从每题 sol 解析提取），共 91 道真实历年真题（2014–2026）。
   增强（v3.10.17）：新增 groups（17 个专项=17条高频异读规则，含 prio 优先级）与每题 cat（专项下标），
   支撑「专项突破」模块的先教后练 / 微专项 / 弱项靶向。 */
window.PHON = {
  "meta": {
    "subject": "成考英语",
    "title": "语音辨析 · 选读音不同的一项",
    "src": "源自题库总库 SUBJ_BANK 英语「语音」真题 91 道（2014–2026 历年真题/模拟卷），自动从解析派生画线部分与发音规律；已剔除 9 道被误标为语音题的试卷大标题。",
    "tip": "第1大题语音知识共 5 分。以下均为成考历年真题原貌：画线部分读音不同的一项。考点集中在元音与特殊组合（th/oo/ea/ed/s/ch/c/g/gh/wh/ng/ou/ow/ai/ear/our/字母不发音等），背熟规律比硬记单词更划算。"
  },
  "cheat": [
    [
      "a / e / i / o / u",
      "开音节(…e 或 元+辅+不发音e)读字母名音 /eɪ/ /iː/ /aɪ/ /əʊ/ /juː/；闭音节（辅音结尾无 e）读短音 /æ/ /e/ /ɪ/ /ɒ/ /ʌ/",
      "cake/map · these/set · bike/sit · note/dog · use/cut"
    ],
    [
      "th",
      "在 this/that/with 等代词、介词中读浊音 /ð/；其余多读清音 /θ/",
      "this/with → /ð/；think/three → /θ/"
    ],
    [
      "oo",
      "多数读 /ʊ/；少数读 /uː/",
      "book/look/good → /ʊ/；moon/food/room → /uː/"
    ],
    [
      "ea",
      "常读 /iː/；在 head/bread/dead 中读 /e/",
      "tea/read/meat → /iː/；head/bread → /e/"
    ],
    [
      "-ed (过去式)",
      "清辅音后 /t/；浊辅音或元音后 /d/；t/d 后 /ɪd/",
      "washed/looked → /t/；played/called → /d/；wanted/needed → /ɪd/"
    ],
    [
      "-s (复数/三单)",
      "清后 /s/；浊或元音后 /z/；s/ʃ/tʃ/z 后 /ɪz/",
      "maps/cats → /s/；dogs/boys → /z/；boxes/watches → /ɪz/"
    ],
    [
      "ch",
      "一般 /tʃ/；在 machine/Chicago 等中 /ʃ/",
      "chair/teacher/child → /tʃ/；machine → /ʃ/"
    ],
    [
      "c",
      "在 e/i/y 前读 /s/；其余 /k/",
      "city/cycle/face → /s/；cat/cold → /k/"
    ],
    [
      "g",
      "在 e/i/y 前读 /dʒ/；其余 /g/",
      "page/large/gym → /dʒ/；go/get → /g/"
    ],
    [
      "gh",
      "多数不发音；在 cough/rough/enough/laugh 中读 /f/",
      "high/light/right 不发音；cough/rough → /f/"
    ],
    [
      "wh",
      "一般 /w/；在 who/whom/whose 中 /h/",
      "what/where/white → /w/；who → /h/"
    ],
    [
      "ng",
      "词尾或 n+k 前读 /ŋ/；在 ngle 中读 /ŋg/",
      "sing/long/thing → /ŋ/；angle → /ŋg/"
    ],
    [
      "ou",
      "常 /aʊ/；在 young/country/cousin 中 /ʌ/",
      "house/count/mouth → /aʊ/；young → /ʌ/"
    ],
    [
      "ow",
      "词尾常 /aʊ/；在 low/know/show 中 /əʊ/",
      "how/now/down → /aʊ/；low/know → /əʊ/"
    ],
    [
      "ai / ay",
      "常 /eɪ/；said 中 /e/",
      "rain/wait/day → /eɪ/；said → /e/"
    ],
    [
      "ear",
      "在 bear/wear 中 /eə/；其余多 /ɪə/",
      "bear/wear → /eə/；ear/hear/near → /ɪə/"
    ],
    [
      "our",
      "在 hour/our/flower 中 /aʊə/；在 four/your 中 /ɔː/",
      "hour/our/flower → /aʊə/；four/your → /ɔː/"
    ]
  ],
  "questions": [
    {
      "id": "eng2014_001",
      "items": [
        {
          "w": "expose",
          "u": "s"
        },
        {
          "w": "phrase",
          "u": "s"
        },
        {
          "w": "accuse",
          "u": "s"
        },
        {
          "w": "loose",
          "u": "s"
        }
      ],
      "answer": 3,
      "rule": "expose、phrase、accuse 中 s 读 /z/，loose 词尾 se 中 s 读 /s/",
      "year": 2014,
      "paper": "英语2014",
      "cat": 5
    },
    {
      "id": "eng2014_002",
      "items": [
        {
          "w": "hope",
          "u": "o"
        },
        {
          "w": "move",
          "u": "o"
        },
        {
          "w": "zone",
          "u": "o"
        },
        {
          "w": "joke",
          "u": "o"
        }
      ],
      "answer": 1,
      "rule": "hope、zone、joke 中 o 读 /əʊ/，move 中 o 读 /uː/",
      "year": 2014,
      "paper": "英语2014",
      "cat": 0
    },
    {
      "id": "eng2014_003",
      "items": [
        {
          "w": "beneath",
          "u": "th"
        },
        {
          "w": "wealthy",
          "u": "th"
        },
        {
          "w": "southern",
          "u": "th"
        },
        {
          "w": "athlete",
          "u": "th"
        }
      ],
      "answer": 2,
      "rule": "beneath、wealthy、athlete 中 th 读 /θ/，southern 中 th 读 /ð/",
      "year": 2014,
      "paper": "英语2014",
      "cat": 1
    },
    {
      "id": "eng2014_004",
      "items": [
        {
          "w": "percentage",
          "u": "a"
        },
        {
          "w": "stage",
          "u": "a"
        },
        {
          "w": "village",
          "u": "a"
        },
        {
          "w": "passage",
          "u": "a"
        }
      ],
      "answer": 1,
      "rule": "percentage、village、passage 中 a 弱读为 /ɪ/，stage 中 a 读 /eɪ/",
      "year": 2014,
      "paper": "英语2014",
      "cat": 0
    },
    {
      "id": "eng2015_001",
      "items": [
        {
          "w": "measure",
          "u": "ea"
        },
        {
          "w": "deadline",
          "u": "ea"
        },
        {
          "w": "heat",
          "u": "ea"
        },
        {
          "w": "feather",
          "u": "ea"
        }
      ],
      "answer": 2,
      "rule": "measure、deadline、feather 中 ea 读 /e/，heat 中 ea 读 /iː/",
      "year": 2015,
      "paper": "英语2015",
      "cat": 3
    },
    {
      "id": "eng2015_002",
      "items": [
        {
          "w": "laughter",
          "u": "gh"
        },
        {
          "w": "enough",
          "u": "gh"
        },
        {
          "w": "cough",
          "u": "gh"
        },
        {
          "w": "ghost",
          "u": "gh"
        }
      ],
      "answer": 3,
      "rule": "laughter、enough、cough 中 gh 读 /f/，ghost 中 gh 读 /ɡ/",
      "year": 2015,
      "paper": "英语2015",
      "cat": 9
    },
    {
      "id": "eng2015_003",
      "items": [
        {
          "w": "rob",
          "u": "b"
        },
        {
          "w": "climb",
          "u": "b"
        },
        {
          "w": "disturb",
          "u": "b"
        },
        {
          "w": "absorb",
          "u": "b"
        }
      ],
      "answer": 1,
      "rule": "rob、disturb、absorb 中 b 发音，climb 中 b 不发音",
      "year": 2015,
      "paper": "英语2015",
      "cat": 5
    },
    {
      "id": "eng2015_004",
      "items": [
        {
          "w": "uncle",
          "u": "u"
        },
        {
          "w": "product",
          "u": "u"
        },
        {
          "w": "rural",
          "u": "u"
        },
        {
          "w": "ugly",
          "u": "u"
        }
      ],
      "answer": 2,
      "rule": "uncle、product、ugly 中 u 读 /ʌ/，rural 中 u 读 /ʊə/",
      "year": 2015,
      "paper": "英语2015",
      "cat": 0
    },
    {
      "id": "eng2016_001",
      "items": [
        {
          "w": "vital",
          "u": "i"
        },
        {
          "w": "silent",
          "u": "i"
        },
        {
          "w": "collide",
          "u": "i"
        },
        {
          "w": "fierce",
          "u": "i"
        }
      ],
      "answer": 3,
      "rule": "vital、silent、collide 中 i 读 /aɪ/，fierce 中 ie 读 /ɪə/",
      "year": 2016,
      "paper": "英语2016",
      "cat": 0
    },
    {
      "id": "eng2016_002",
      "items": [
        {
          "w": "taught",
          "u": "au"
        },
        {
          "w": "caught",
          "u": "au"
        },
        {
          "w": "laugh",
          "u": "au"
        },
        {
          "w": "fault",
          "u": "au"
        }
      ],
      "answer": 2,
      "rule": "taught、caught、fault 中 au 读 /ɔː/，laugh 中 au 读 /ɑː/",
      "year": 2016,
      "paper": "英语2016",
      "cat": 7
    },
    {
      "id": "eng2016_003",
      "items": [
        {
          "w": "reception",
          "u": "p"
        },
        {
          "w": "receipt",
          "u": "p"
        },
        {
          "w": "capture",
          "u": "p"
        },
        {
          "w": "concept",
          "u": "p"
        }
      ],
      "answer": 1,
      "rule": "reception、capture、concept 中 p 正常发音，receipt 中 p 不发音（读 /rɪˈsiːt/）",
      "year": 2016,
      "paper": "英语2016",
      "cat": 5
    },
    {
      "id": "eng2016_004",
      "items": [
        {
          "w": "boom",
          "u": "oo"
        },
        {
          "w": "goose",
          "u": "oo"
        },
        {
          "w": "flood",
          "u": "oo"
        },
        {
          "w": "gloom",
          "u": "oo"
        }
      ],
      "answer": 2,
      "rule": "boom、goose、gloom 中 oo 读 /uː/，flood 中 oo 读 /ʌ/",
      "year": 2016,
      "paper": "英语2016",
      "cat": 2
    },
    {
      "id": "eng2017_001",
      "items": [
        {
          "w": "penalty",
          "u": "e"
        },
        {
          "w": "moment",
          "u": "e"
        },
        {
          "w": "quarrel",
          "u": "e"
        },
        {
          "w": "absent",
          "u": "e"
        }
      ],
      "answer": 0,
      "rule": "moment、quarrel、absent 中（非重读的）e 弱读为 /ə/，penalty 中 e 读 /e/",
      "year": 2017,
      "paper": "英语2017",
      "cat": 0
    },
    {
      "id": "eng2017_002",
      "items": [
        {
          "w": "sympathy",
          "u": "a"
        },
        {
          "w": "material",
          "u": "a"
        },
        {
          "w": "courage",
          "u": "a"
        },
        {
          "w": "analysis",
          "u": "a"
        }
      ],
      "answer": 2,
      "rule": "sympathy、material、analysis 中 a 弱读为 /ə/，courage 中 a 读 /ɪ/",
      "year": 2017,
      "paper": "英语2017",
      "cat": 0
    },
    {
      "id": "eng2017_003",
      "items": [
        {
          "w": "starvation",
          "u": "tion"
        },
        {
          "w": "suggestion",
          "u": "tion"
        },
        {
          "w": "satisfaction",
          "u": "tion"
        },
        {
          "w": "situation",
          "u": "tion"
        }
      ],
      "answer": 1,
      "rule": "starvation、satisfaction、situation 中 tion 读 /ʃn/，suggestion 中 tion 读 /tʃən/",
      "year": 2017,
      "paper": "英语2017",
      "cat": 5
    },
    {
      "id": "eng2017_004",
      "items": [
        {
          "w": "donkey",
          "u": "ey"
        },
        {
          "w": "turkey",
          "u": "ey"
        },
        {
          "w": "money",
          "u": "ey"
        },
        {
          "w": "obey",
          "u": "ey"
        }
      ],
      "answer": 3,
      "rule": "donkey、turkey、money 中 ey 读 /ɪ/，obey 中 ey 读 /eɪ/",
      "year": 2017,
      "paper": "英语2017",
      "cat": 0
    },
    {
      "id": "eng2018_001",
      "items": [
        {
          "w": "captain",
          "u": "ai"
        },
        {
          "w": "sustain",
          "u": "ai"
        },
        {
          "w": "contain",
          "u": "ai"
        },
        {
          "w": "retain",
          "u": "ai"
        }
      ],
      "answer": 0,
      "rule": "sustain、contain、retain 中 ai 读 /eɪ/，captain 中 ai 弱读为 /ɪ/",
      "year": 2018,
      "paper": "英语2018",
      "cat": 14
    },
    {
      "id": "eng2018_002",
      "items": [
        {
          "w": "pension",
          "u": "sion"
        },
        {
          "w": "mission",
          "u": "sion"
        },
        {
          "w": "tension",
          "u": "sion"
        },
        {
          "w": "revision",
          "u": "sion"
        }
      ],
      "answer": 3,
      "rule": "pension、mission、tension 中 sion 读 /ʃn/，revision 中 sion 前是元音读 /ʒn/",
      "year": 2018,
      "paper": "英语2018",
      "cat": 5
    },
    {
      "id": "eng2018_003",
      "items": [
        {
          "w": "actress",
          "u": "s"
        },
        {
          "w": "business",
          "u": "s"
        },
        {
          "w": "excess",
          "u": "s"
        },
        {
          "w": "endless",
          "u": "s"
        }
      ],
      "answer": 2,
      "rule": "actress、excess、endless 中 s 读 /s/，business 中 s 读 /z/",
      "year": 2018,
      "paper": "英语2018",
      "cat": 5
    },
    {
      "id": "eng2018_004",
      "items": [
        {
          "w": "combination",
          "u": "mb"
        },
        {
          "w": "climbing",
          "u": "mb"
        },
        {
          "w": "bamboo",
          "u": "mb"
        },
        {
          "w": "ambition",
          "u": "mb"
        }
      ],
      "answer": 1,
      "rule": "combination、bamboo、ambition 中 mb 读 /mb/，climbing 中 b 不发音",
      "year": 2018,
      "paper": "英语2018",
      "cat": 2
    },
    {
      "id": "eng2019_001",
      "items": [
        {
          "w": "land",
          "u": "a"
        },
        {
          "w": "lamb",
          "u": "a"
        },
        {
          "w": "father",
          "u": "a"
        },
        {
          "w": "ladder",
          "u": "a"
        }
      ],
      "answer": 2,
      "rule": "land、lamb、ladder 中 a 读 /æ/，father 中 a 读 /ɑː/",
      "year": 2019,
      "paper": "英语2019",
      "cat": 0
    },
    {
      "id": "eng2019_002",
      "items": [
        {
          "w": "challenge",
          "u": "ch"
        },
        {
          "w": "cheap",
          "u": "ch"
        },
        {
          "w": "choose",
          "u": "ch"
        },
        {
          "w": "character",
          "u": "ch"
        }
      ],
      "answer": 3,
      "rule": "challenge、cheap、choose 中 ch 读 /tʃ/，character 中 ch 读 /k/",
      "year": 2019,
      "paper": "英语2019",
      "cat": 6
    },
    {
      "id": "eng2019_003",
      "items": [
        {
          "w": "sweat",
          "u": "ea"
        },
        {
          "w": "please",
          "u": "ea"
        },
        {
          "w": "beat",
          "u": "ea"
        },
        {
          "w": "meat",
          "u": "ea"
        }
      ],
      "answer": 0,
      "rule": "please、beat、meat 中 ea 读 /iː/，sweat 中 ea 读 /e/",
      "year": 2019,
      "paper": "英语2019",
      "cat": 3
    },
    {
      "id": "eng2019_004",
      "items": [
        {
          "w": "rescue",
          "u": "ue"
        },
        {
          "w": "league",
          "u": "ue"
        },
        {
          "w": "pursue",
          "u": "ue"
        },
        {
          "w": "argue",
          "u": "ue"
        }
      ],
      "answer": 1,
      "rule": "rescue、pursue、argue 中 ue 读 /juː/（或含 /j/ 音），league 词尾 gue 整体读 /ɡ/",
      "year": 2019,
      "paper": "英语2019",
      "cat": 3
    },
    {
      "id": "eng2020_001",
      "items": [
        {
          "w": "shout",
          "u": "ou"
        },
        {
          "w": "cloud",
          "u": "ou"
        },
        {
          "w": "mouse",
          "u": "ou"
        },
        {
          "w": "tough",
          "u": "ou"
        }
      ],
      "answer": 3,
      "rule": "shout、cloud、mouse 中 ou 读 /aʊ/，tough 中 ou 读 /ʌ/",
      "year": 2020,
      "paper": "英语2020",
      "cat": 12
    },
    {
      "id": "eng2020_002",
      "items": [
        {
          "w": "fear",
          "u": "ear"
        },
        {
          "w": "bear",
          "u": "ear"
        },
        {
          "w": "wear",
          "u": "ear"
        },
        {
          "w": "pear",
          "u": "ear"
        }
      ],
      "answer": 0,
      "rule": "bear、wear、pear 中 ear 读 /eə/，fear 中 ear 读 /ɪə/",
      "year": 2020,
      "paper": "英语2020",
      "cat": 15
    },
    {
      "id": "eng2020_003",
      "items": [
        {
          "w": "post",
          "u": "o"
        },
        {
          "w": "cost",
          "u": "o"
        },
        {
          "w": "most",
          "u": "o"
        },
        {
          "w": "host",
          "u": "o"
        }
      ],
      "answer": 1,
      "rule": "post、most、host 中 o 读 /əʊ/，cost 中 o 读 /ɒ/",
      "year": 2020,
      "paper": "英语2020",
      "cat": 0
    },
    {
      "id": "eng2020_004",
      "items": [
        {
          "w": "chase",
          "u": "a"
        },
        {
          "w": "base",
          "u": "a"
        },
        {
          "w": "ease",
          "u": "a"
        },
        {
          "w": "case",
          "u": "a"
        }
      ],
      "answer": 2,
      "rule": "chase、base、case 中 a 读 /eɪ/，ease 中 a 读 /iː/",
      "year": 2020,
      "paper": "英语2020",
      "cat": 0
    },
    {
      "id": "eng2021_001",
      "items": [
        {
          "w": "cake",
          "u": "a"
        },
        {
          "w": "gas",
          "u": "a"
        },
        {
          "w": "bag",
          "u": "a"
        },
        {
          "w": "tax",
          "u": "a"
        }
      ],
      "answer": 0,
      "rule": "gas、bag、tax 中 a 读 /æ/，cake 中 a 读 /eɪ/（开音节）",
      "year": 2021,
      "paper": "英语2021",
      "cat": 0
    },
    {
      "id": "eng2021_002",
      "items": [
        {
          "w": "tough",
          "u": "gh"
        },
        {
          "w": "laugh",
          "u": "gh"
        },
        {
          "w": "though",
          "u": "gh"
        },
        {
          "w": "cough",
          "u": "gh"
        }
      ],
      "answer": 2,
      "rule": "tough、laugh、cough 划线组合读 /f/，though 中 gh 不发音、读 /ð/",
      "year": 2021,
      "paper": "英语2021",
      "cat": 9
    },
    {
      "id": "eng2021_003",
      "items": [
        {
          "w": "pupil",
          "u": "u"
        },
        {
          "w": "music",
          "u": "u"
        },
        {
          "w": "huge",
          "u": "u"
        },
        {
          "w": "lucky",
          "u": "u"
        }
      ],
      "answer": 3,
      "rule": "pupil、music、huge 中 u 读 /juː/，lucky 中 u 读 /ɪ/",
      "year": 2021,
      "paper": "英语2021",
      "cat": 0
    },
    {
      "id": "eng2021_004",
      "items": [
        {
          "w": "gesture",
          "u": "ture"
        },
        {
          "w": "mature",
          "u": "ture"
        },
        {
          "w": "mixture",
          "u": "ture"
        },
        {
          "w": "structure",
          "u": "ture"
        }
      ],
      "answer": 1,
      "rule": "gesture、mixture、structure 中 ture 读 /tʃə/，mature 中 ture 读 /tʃʊə/（但 t 单独读 /t/ 而非融合），按读音差异选 B。",
      "year": 2021,
      "paper": "英语2021",
      "cat": 5
    },
    {
      "id": "eng2022p4_001",
      "items": [
        {
          "w": "game",
          "u": "a"
        },
        {
          "w": "late",
          "u": "a"
        },
        {
          "w": "trade",
          "u": "a"
        },
        {
          "w": "have",
          "u": "a"
        }
      ],
      "answer": 3,
      "rule": "D have 中 a 读 /æ/，其余三词中 a 读 /eɪ/。",
      "year": 2022,
      "paper": "英语2022",
      "cat": 0
    },
    {
      "id": "eng2022p4_002",
      "items": [
        {
          "w": "there",
          "u": "th"
        },
        {
          "w": "thick",
          "u": "th"
        },
        {
          "w": "thank",
          "u": "th"
        },
        {
          "w": "thirty",
          "u": "th"
        }
      ],
      "answer": 0,
      "rule": "A there 中 th 读浊音 /ð/，其余三词中 th 读清音 /θ/。",
      "year": 2022,
      "paper": "英语2022",
      "cat": 1
    },
    {
      "id": "eng2022p4_004",
      "items": [
        {
          "w": "cool",
          "u": "oo"
        },
        {
          "w": "flood",
          "u": "oo"
        },
        {
          "w": "food",
          "u": "oo"
        },
        {
          "w": "moon",
          "u": "oo"
        }
      ],
      "answer": 1,
      "rule": "B flood 中 oo 读 /ʌ/，其余三词中 oo 读 /uː/。",
      "year": 2022,
      "paper": "英语2022",
      "cat": 2
    },
    {
      "id": "eng2022p4_005",
      "items": [
        {
          "w": "easy",
          "u": "y"
        },
        {
          "w": "noisy",
          "u": "y"
        },
        {
          "w": "busy",
          "u": "y"
        },
        {
          "w": "fantasy",
          "u": "y"
        }
      ],
      "answer": 2,
      "rule": "C busy 中 y 读 /i/（短），其余三词中 y 读 /i/ 的弱化——原卷以 busy 为异。",
      "year": 2022,
      "paper": "英语2022",
      "cat": 5
    },
    {
      "id": "eng2023p3_001",
      "items": [
        {
          "w": "past",
          "u": "s"
        },
        {
          "w": "fast",
          "u": "s"
        },
        {
          "w": "grandson",
          "u": "s"
        },
        {
          "w": "reason",
          "u": "s"
        }
      ],
      "answer": 3,
      "rule": "D reason 中 s 读 /z/，其余三词中 s 读 /s/。",
      "year": 2023,
      "paper": "英语2023",
      "cat": 5
    },
    {
      "id": "eng2023p3_002",
      "items": [
        {
          "w": "lunch",
          "u": "ch"
        },
        {
          "w": "stomach",
          "u": "ch"
        },
        {
          "w": "touch",
          "u": "ch"
        },
        {
          "w": "speech",
          "u": "ch"
        }
      ],
      "answer": 1,
      "rule": "B stomach 中 ch 读 /k/，其余三个词中 ch 读 /tʃ/。",
      "year": 2023,
      "paper": "英语2023",
      "cat": 6
    },
    {
      "id": "eng2023p3_003",
      "items": [
        {
          "w": "bomb",
          "u": "b"
        },
        {
          "w": "tomb",
          "u": "b"
        },
        {
          "w": "climber",
          "u": "b"
        },
        {
          "w": "number",
          "u": "b"
        }
      ],
      "answer": 3,
      "rule": "D number 中 b 发音 /b/，其余三个词的 b 不发音。",
      "year": 2023,
      "paper": "英语2023",
      "cat": 0
    },
    {
      "id": "eng2023p3_004",
      "items": [
        {
          "w": "alive",
          "u": "a"
        },
        {
          "w": "aware",
          "u": "a"
        },
        {
          "w": "agent",
          "u": "a"
        },
        {
          "w": "attract",
          "u": "a"
        }
      ],
      "answer": 2,
      "rule": "C agent 中 a 读 /eɪ/，其余三词中 a 读 /ə/。",
      "year": 2023,
      "paper": "英语2023",
      "cat": 0
    },
    {
      "id": "eng2023p3_005",
      "items": [
        {
          "w": "four",
          "u": "our"
        },
        {
          "w": "hour",
          "u": "our"
        },
        {
          "w": "sour",
          "u": "our"
        },
        {
          "w": "our",
          "u": "our"
        }
      ],
      "answer": 0,
      "rule": "A four 中 our 读 /ɔː/，其余三个词 our 读 /aʊə/。",
      "year": 2023,
      "paper": "英语2023",
      "cat": 16
    },
    {
      "id": "eng2024p2_001",
      "items": [
        {
          "w": "just",
          "u": "u"
        },
        {
          "w": "truth",
          "u": "u"
        },
        {
          "w": "lucky",
          "u": "u"
        },
        {
          "w": "study",
          "u": "u"
        }
      ],
      "answer": 1,
      "rule": "B truth 中 u 读 /uː/，其余三个 u 读 /ʌ/。",
      "year": 2024,
      "paper": "英语2024",
      "cat": 0
    },
    {
      "id": "eng2024p2_002",
      "items": [
        {
          "w": "throw",
          "u": "ow"
        },
        {
          "w": "allow",
          "u": "ow"
        },
        {
          "w": "arrow",
          "u": "ow"
        },
        {
          "w": "widow",
          "u": "ow"
        }
      ],
      "answer": 0,
      "rule": "A throw 中 ow 读 /əʊ/，其余三个 ow 读 /əʊ/ 的弱读 /oʊ/→ 实际 B allow /aʊ/、C arrow /əʊ/、D widow /əʊ/。注意：allow 的 ow 读 /aʊ/，故唯 A 与 C/D 同、B 异。官方答案 B（allow /aʊ/ 与其他 /əʊ/ 不同）。",
      "year": 2024,
      "paper": "英语2024",
      "cat": 13
    },
    {
      "id": "eng2024p2_003",
      "items": [
        {
          "w": "excuse",
          "u": "c"
        },
        {
          "w": "medicine",
          "u": "c"
        },
        {
          "w": "certain",
          "u": "c"
        },
        {
          "w": "decide",
          "u": "c"
        }
      ],
      "answer": 1,
      "rule": "B medicine 中 c 读 /s/ 前的字母组合特殊，e 读 /e/；其余 c 前的元音/i/ 略不同。官方答案为 B（medicine 中字母 c 读 /s/，其余读 /k/ 或差异）。",
      "year": 2024,
      "paper": "英语2024",
      "cat": 7
    },
    {
      "id": "eng2024p2_004",
      "items": [
        {
          "w": "possess",
          "u": "s"
        },
        {
          "w": "passport",
          "u": "s"
        },
        {
          "w": "professor",
          "u": "s"
        },
        {
          "w": "passage",
          "u": "s"
        }
      ],
      "answer": 1,
      "rule": "A possess 中 s 读 /z/（possess 中间的 ss 读 /z/），其余三个词中 ss 读 /s/。",
      "year": 2024,
      "paper": "英语2024",
      "cat": 5
    },
    {
      "id": "eng2024p2_005",
      "items": [
        {
          "w": "bear",
          "u": "ear"
        },
        {
          "w": "wear",
          "u": "ear"
        },
        {
          "w": "fear",
          "u": "ear"
        },
        {
          "w": "pear",
          "u": "ear"
        }
      ],
      "answer": 2,
      "rule": "C fear 中 ear 读 /ɪə/，其余三个词 ear 读 /eə/。",
      "year": 2024,
      "paper": "英语2024",
      "cat": 15
    },
    {
      "id": "eng2025_001",
      "items": [
        {
          "w": "arise",
          "u": "i"
        },
        {
          "w": "brick",
          "u": "i"
        },
        {
          "w": "pride",
          "u": "i"
        },
        {
          "w": "child",
          "u": "i"
        }
      ],
      "answer": 1,
      "rule": "arise /əˈraɪz/、pride /praɪd/、child /tʃaɪld/ 中 i 均发 /aɪ/；brick /brɪk/ 中 i 发短音 /ɪ/。",
      "year": 2025,
      "paper": "英语2025",
      "cat": 0
    },
    {
      "id": "eng2025_002",
      "items": [
        {
          "w": "head",
          "u": "ea"
        },
        {
          "w": "beam",
          "u": "ea"
        },
        {
          "w": "leaf",
          "u": "ea"
        },
        {
          "w": "heat",
          "u": "ea"
        }
      ],
      "answer": 0,
      "rule": "beam /biːm/、leaf /liːf/、heat /hiːt/ 中 ea 均发 /iː/；head /hed/ 中 ea 发 /e/。",
      "year": 2025,
      "paper": "英语2025",
      "cat": 3
    },
    {
      "id": "eng2025_003",
      "items": [
        {
          "w": "cow",
          "u": "ow"
        },
        {
          "w": "how",
          "u": "ow"
        },
        {
          "w": "low",
          "u": "ow"
        },
        {
          "w": "now",
          "u": "ow"
        }
      ],
      "answer": 2,
      "rule": "cow /kaʊ/、how /haʊ/、now /naʊ/ 中 ow 发 /aʊ/；low /ləʊ/ 中 ow 发 /əʊ/。",
      "year": 2025,
      "paper": "英语2025",
      "cat": 13
    },
    {
      "id": "eng2025_004",
      "items": [
        {
          "w": "tooth",
          "u": "th"
        },
        {
          "w": "smooth",
          "u": "th"
        },
        {
          "w": "wealth",
          "u": "th"
        },
        {
          "w": "truth",
          "u": "th"
        }
      ],
      "answer": 1,
      "rule": "tooth /tuːθ/、wealth /welθ/、truth /truːθ/ 中 th 发清辅音 /θ/；smooth /smuːð/ 中 th 发浊辅音 /ð/。",
      "year": 2025,
      "paper": "英语2025",
      "cat": 1
    },
    {
      "id": "eng2025_005",
      "items": [
        {
          "w": "answer",
          "u": "s"
        },
        {
          "w": "absence",
          "u": "s"
        },
        {
          "w": "escape",
          "u": "s"
        },
        {
          "w": "disease",
          "u": "s"
        }
      ],
      "answer": 3,
      "rule": "answer /ˈɑːnsə/、absence /ˈæbsəns/、escape /ɪˈskeɪp/ 中 s 发 /s/；disease /dɪˈziːz/ 中 s 发浊音 /z/。",
      "year": 2025,
      "paper": "英语2025",
      "cat": 5
    },
    {
      "id": "eng26p1_001",
      "items": [
        {
          "w": "date",
          "u": "a"
        },
        {
          "w": "shape",
          "u": "a"
        },
        {
          "w": "brave",
          "u": "a"
        },
        {
          "w": "water",
          "u": "a"
        }
      ],
      "answer": 3,
      "rule": "date、shape、brave 中划线 a 均读 /eɪ/，water 中 a 读 /ɔː/",
      "year": 2026,
      "paper": "英语2026押题一",
      "cat": 0
    },
    {
      "id": "eng26p1_002",
      "items": [
        {
          "w": "lunch",
          "u": "u"
        },
        {
          "w": "University",
          "u": "u"
        },
        {
          "w": "umbrella",
          "u": "u"
        },
        {
          "w": "butter",
          "u": "u"
        }
      ],
      "answer": 1,
      "rule": "lunch、umbrella、butter 中 u 读 /ʌ/，university 中 u 读 /juː/",
      "year": 2026,
      "paper": "英语2026押题一",
      "cat": 0
    },
    {
      "id": "eng26p1_003",
      "items": [
        {
          "w": "g ame",
          "u": "g"
        },
        {
          "w": "g overn",
          "u": "g"
        },
        {
          "w": "g allery",
          "u": "g"
        },
        {
          "w": "g eneral",
          "u": "g"
        }
      ],
      "answer": 3,
      "rule": "game、govern、gallery 中 g 读 /ɡ/，general 中 g 读 /dʒ/",
      "year": 2026,
      "paper": "英语2026押题一",
      "cat": 8
    },
    {
      "id": "eng26p1_004",
      "items": [
        {
          "w": "report",
          "u": "or"
        },
        {
          "w": "horse",
          "u": "or"
        },
        {
          "w": "short",
          "u": "or"
        },
        {
          "w": "director",
          "u": "or"
        }
      ],
      "answer": 3,
      "rule": "report、horse、short 中 or 读 /ɔː/，director 中 or 处于非重读音节弱读为 /ə/",
      "year": 2026,
      "paper": "英语2026押题一",
      "cat": 5
    },
    {
      "id": "eng26p1_005",
      "items": [
        {
          "w": "hear",
          "u": "ear"
        },
        {
          "w": "bear",
          "u": "ear"
        },
        {
          "w": "near",
          "u": "ear"
        },
        {
          "w": "dear",
          "u": "ear"
        }
      ],
      "answer": 1,
      "rule": "hear、near、dear 中 ear 读 /ɪə/，bear 中 ear 读 /eə/",
      "year": 2026,
      "paper": "英语2026押题一",
      "cat": 15
    },
    {
      "id": "eng26p2_001",
      "items": [
        {
          "w": "honey",
          "u": "o"
        },
        {
          "w": "stop",
          "u": "o"
        },
        {
          "w": "love",
          "u": "o"
        },
        {
          "w": "another",
          "u": "o"
        }
      ],
      "answer": 1,
      "rule": "honey、love、another 中 o 读 /ʌ/，stop 中 o 读 /ɒ/",
      "year": 2026,
      "paper": "英语2026押题二",
      "cat": 0
    },
    {
      "id": "eng26p2_002",
      "items": [
        {
          "w": "shy",
          "u": "y"
        },
        {
          "w": "type",
          "u": "y"
        },
        {
          "w": "sky",
          "u": "y"
        },
        {
          "w": "lovely",
          "u": "y"
        }
      ],
      "answer": 3,
      "rule": "shy、type、sky 中 y 读 /aɪ/，lovely 中 y 处于非重读音节读 /ɪ/",
      "year": 2026,
      "paper": "英语2026押题二",
      "cat": 5
    },
    {
      "id": "eng26p2_003",
      "items": [
        {
          "w": "allow",
          "u": "ow"
        },
        {
          "w": "yellow",
          "u": "ow"
        },
        {
          "w": "follow",
          "u": "ow"
        },
        {
          "w": "borrow",
          "u": "ow"
        }
      ],
      "answer": 0,
      "rule": "yellow、follow、borrow 中 ow 读 /əʊ/，allow 中 ow 读 /aʊ/",
      "year": 2026,
      "paper": "英语2026押题二",
      "cat": 13
    },
    {
      "id": "eng26p2_004",
      "items": [
        {
          "w": "change",
          "u": "ch"
        },
        {
          "w": "charm",
          "u": "ch"
        },
        {
          "w": "cheese",
          "u": "ch"
        },
        {
          "w": "chemical",
          "u": "ch"
        }
      ],
      "answer": 3,
      "rule": "change、charm、cheese 中 ch 读 /tʃ/，chemical 中 ch 读 /k/",
      "year": 2026,
      "paper": "英语2026押题二",
      "cat": 6
    },
    {
      "id": "eng26p2_005",
      "items": [
        {
          "w": "sweat",
          "u": "ea"
        },
        {
          "w": "steam",
          "u": "ea"
        },
        {
          "w": "speak",
          "u": "ea"
        },
        {
          "w": "meal",
          "u": "ea"
        }
      ],
      "answer": 0,
      "rule": "steam、speak、meal 中 ea 读 /iː/，sweat 中 ea 读 /e/",
      "year": 2026,
      "paper": "英语2026押题二",
      "cat": 3
    },
    {
      "id": "eng26qz1_001",
      "items": [
        {
          "w": "gate",
          "u": "a"
        },
        {
          "w": "hate",
          "u": "a"
        },
        {
          "w": "made",
          "u": "a"
        },
        {
          "w": "staff",
          "u": "a"
        }
      ],
      "answer": 3,
      "rule": "gate/hate/made 中的 a 发 /eɪ/，staff 中的 a 发 /ɑː/",
      "year": 2026,
      "paper": "英语2026全真模拟（一）",
      "cat": 0
    },
    {
      "id": "eng26qz1_002",
      "items": [
        {
          "w": "challenge",
          "u": "ch"
        },
        {
          "w": "cheap",
          "u": "ch"
        },
        {
          "w": "choose",
          "u": "ch"
        },
        {
          "w": "character",
          "u": "ch"
        }
      ],
      "answer": 3,
      "rule": "challenge/cheap/choose 中 ch 发 /tʃ/，character 中 ch 发 /k/",
      "year": 2026,
      "paper": "英语2026全真模拟（一）",
      "cat": 6
    },
    {
      "id": "eng26qz1_003",
      "items": [
        {
          "w": "trouble",
          "u": "ou"
        },
        {
          "w": "soul",
          "u": "ou"
        },
        {
          "w": "double",
          "u": "ou"
        },
        {
          "w": "enough",
          "u": "ou"
        }
      ],
      "answer": 1,
      "rule": "trouble/double/enough 中 ou 发 /ʌ/，soul 中 ou 发 /əʊ/",
      "year": 2026,
      "paper": "英语2026全真模拟（一）",
      "cat": 12
    },
    {
      "id": "eng26qz1_004",
      "items": [
        {
          "w": "finger",
          "u": "ng"
        },
        {
          "w": "singer",
          "u": "ng"
        },
        {
          "w": "hanger",
          "u": "ng"
        },
        {
          "w": "ringer",
          "u": "ng"
        }
      ],
      "answer": 1,
      "rule": "finger/hanger/ringer 中的 ng 发 /ŋɡ/，singer 中的 ng 发 /ŋ/",
      "year": 2026,
      "paper": "英语2026全真模拟（一）",
      "cat": 11
    },
    {
      "id": "eng26qz1_005",
      "items": [
        {
          "w": "action",
          "u": "tion"
        },
        {
          "w": "section",
          "u": "tion"
        },
        {
          "w": "solution",
          "u": "tion"
        },
        {
          "w": "question",
          "u": "tion"
        }
      ],
      "answer": 3,
      "rule": "action/section/solution 中 tion 发 /ʃən/，question 中 tion 发 /tʃən/",
      "year": 2026,
      "paper": "英语2026全真模拟（一）",
      "cat": 5
    },
    {
      "id": "eng26qz2_001",
      "items": [
        {
          "w": "boom",
          "u": "oo"
        },
        {
          "w": "goose",
          "u": "oo"
        },
        {
          "w": "flood",
          "u": "oo"
        },
        {
          "w": "gloom",
          "u": "oo"
        }
      ],
      "answer": 2,
      "rule": "boom/goose/gloom 中 oo 发 /uː/，flood 中 oo 发 /ʌ/",
      "year": 2026,
      "paper": "英语2026全真模拟（二）",
      "cat": 2
    },
    {
      "id": "eng26qz2_002",
      "items": [
        {
          "w": "chin",
          "u": "i"
        },
        {
          "w": "bite",
          "u": "i"
        },
        {
          "w": "alive",
          "u": "i"
        },
        {
          "w": "side",
          "u": "i"
        }
      ],
      "answer": 0,
      "rule": "bite/alive/side 中 i 发 /aɪ/，chin 中 ch 组合发 /tʃ/、i 发 /ɪ/",
      "year": 2026,
      "paper": "英语2026全真模拟（二）",
      "cat": 0
    },
    {
      "id": "eng26qz2_003",
      "items": [
        {
          "w": "rescue",
          "u": "ue"
        },
        {
          "w": "league",
          "u": "ue"
        },
        {
          "w": "pursue",
          "u": "ue"
        },
        {
          "w": "argue",
          "u": "ue"
        }
      ],
      "answer": 1,
      "rule": "rescue/pursue/argue 中 ue 发 /juː/，league 中 ue 发 /iː/",
      "year": 2026,
      "paper": "英语2026全真模拟（二）",
      "cat": 3
    },
    {
      "id": "eng26qz2_004",
      "items": [
        {
          "w": "reception",
          "u": "p"
        },
        {
          "w": "receipt",
          "u": "p"
        },
        {
          "w": "capture",
          "u": "p"
        },
        {
          "w": "concept",
          "u": "p"
        }
      ],
      "answer": 1,
      "rule": "reception/capture/concept 中的 p 均发音，receipt 中的 p 不发音",
      "year": 2026,
      "paper": "英语2026全真模拟（二）",
      "cat": 7
    },
    {
      "id": "eng26qz2_005",
      "items": [
        {
          "w": "child",
          "u": "ch"
        },
        {
          "w": "character",
          "u": "ch"
        },
        {
          "w": "church",
          "u": "ch"
        },
        {
          "w": "chicken",
          "u": "ch"
        }
      ],
      "answer": 1,
      "rule": "child/church/chicken 中 ch 发 /tʃ/，character 中 ch 发 /k/",
      "year": 2026,
      "paper": "英语2026全真模拟（二）",
      "cat": 6
    },
    {
      "id": "eng26qz3_001",
      "items": [
        {
          "w": "captain",
          "u": "ai"
        },
        {
          "w": "sustain",
          "u": "ai"
        },
        {
          "w": "contain",
          "u": "ai"
        },
        {
          "w": "retain",
          "u": "ai"
        }
      ],
      "answer": 0,
      "rule": "sustain/contain/retain 中 ai 发 /eɪ/，captain 中 ai 发 /ɪ/",
      "year": 2026,
      "paper": "英语2026全真模拟（三）",
      "cat": 14
    },
    {
      "id": "eng26qz3_002",
      "items": [
        {
          "w": "blew",
          "u": "ew"
        },
        {
          "w": "crew",
          "u": "ew"
        },
        {
          "w": "sew",
          "u": "ew"
        },
        {
          "w": "Jew",
          "u": "ew"
        }
      ],
      "answer": 2,
      "rule": "blew/crew/Jew 中 ew 发 /uː/，sew 中 ew 发 /əʊ/",
      "year": 2026,
      "paper": "英语2026全真模拟（三）",
      "cat": 5
    },
    {
      "id": "eng26qz3_003",
      "items": [
        {
          "w": "honest",
          "u": "h"
        },
        {
          "w": "ghost",
          "u": "h"
        },
        {
          "w": "vehicle",
          "u": "h"
        },
        {
          "w": "hotel",
          "u": "h"
        }
      ],
      "answer": 3,
      "rule": "honest/ghost/vehicle 中 h 不发音，hotel 中 h 发 /h/",
      "year": 2026,
      "paper": "英语2026全真模拟（三）",
      "cat": 5
    },
    {
      "id": "eng26qz3_004",
      "items": [
        {
          "w": "sweat",
          "u": "ea"
        },
        {
          "w": "leap",
          "u": "ea"
        },
        {
          "w": "feature",
          "u": "ea"
        },
        {
          "w": "cheat",
          "u": "ea"
        }
      ],
      "answer": 0,
      "rule": "leap/feature/cheat 中 ea 发 /iː/，sweat 中 ea 发 /e/",
      "year": 2026,
      "paper": "英语2026全真模拟（三）",
      "cat": 3
    },
    {
      "id": "eng26qz3_005",
      "items": [
        {
          "w": "cloth",
          "u": "th"
        },
        {
          "w": "bathe",
          "u": "th"
        },
        {
          "w": "with",
          "u": "th"
        },
        {
          "w": "they",
          "u": "th"
        }
      ],
      "answer": 0,
      "rule": "bathe/with/they 中 th 发 /ð/，cloth 中 th 发 /θ/",
      "year": 2026,
      "paper": "英语2026全真模拟（三）",
      "cat": 1
    },
    {
      "id": "eng26qz4_001",
      "items": [
        {
          "w": "pension",
          "u": "sion"
        },
        {
          "w": "mission",
          "u": "sion"
        },
        {
          "w": "tension",
          "u": "sion"
        },
        {
          "w": "revision",
          "u": "sion"
        }
      ],
      "answer": 3,
      "rule": "pension/mission/tension 中 sion 发 /ʃən/，revision 中 sion 发 /ʒən/",
      "year": 2026,
      "paper": "英语2026全真模拟（四）",
      "cat": 5
    },
    {
      "id": "eng26qz4_002",
      "items": [
        {
          "w": "actress",
          "u": "s"
        },
        {
          "w": "business",
          "u": "s"
        },
        {
          "w": "excess",
          "u": "s"
        },
        {
          "w": "endless",
          "u": "s"
        }
      ],
      "answer": 1,
      "rule": "actress/excess/endless 中 s 发 /s/，business 中 s 发 /z/",
      "year": 2026,
      "paper": "英语2026全真模拟（四）",
      "cat": 5
    },
    {
      "id": "eng26qz4_003",
      "items": [
        {
          "w": "weapon",
          "u": "w"
        },
        {
          "w": "whole",
          "u": "w"
        },
        {
          "w": "water",
          "u": "w"
        },
        {
          "w": "wonder",
          "u": "w"
        }
      ],
      "answer": 1,
      "rule": "weapon/water/wonder 中 w 发 /w/，whole 中 w 不发音",
      "year": 2026,
      "paper": "英语2026全真模拟（四）",
      "cat": 3
    },
    {
      "id": "eng26qz4_004",
      "items": [
        {
          "w": "view",
          "u": "ew"
        },
        {
          "w": "flew",
          "u": "ew"
        },
        {
          "w": "few",
          "u": "ew"
        },
        {
          "w": "new",
          "u": "ew"
        }
      ],
      "answer": 1,
      "rule": "view/few/new 中 ew 发 /juː/，flew 中 ew 发 /uː/",
      "year": 2026,
      "paper": "英语2026全真模拟（四）",
      "cat": 0
    },
    {
      "id": "eng26qz4_005",
      "items": [
        {
          "w": "four",
          "u": "our"
        },
        {
          "w": "hour",
          "u": "our"
        },
        {
          "w": "pour",
          "u": "our"
        },
        {
          "w": "your",
          "u": "our"
        }
      ],
      "answer": 1,
      "rule": "four/pour/your 中 our 发 /ɔː/，hour 中 h 不发音、our 发 /aʊə/",
      "year": 2026,
      "paper": "英语2026全真模拟（四）",
      "cat": 16
    },
    {
      "id": "eng26qz5_001",
      "items": [
        {
          "w": "knee",
          "u": "k"
        },
        {
          "w": "know",
          "u": "k"
        },
        {
          "w": "kick",
          "u": "k"
        },
        {
          "w": "knife",
          "u": "k"
        }
      ],
      "answer": 2,
      "rule": "knee/know/knife 中 k 不发音，kick 中 k 发 /k/",
      "year": 2026,
      "paper": "英语2026全真模拟（五）",
      "cat": 7
    },
    {
      "id": "eng26qz5_002",
      "items": [
        {
          "w": "music",
          "u": "c"
        },
        {
          "w": "plastic",
          "u": "c"
        },
        {
          "w": "ocean",
          "u": "c"
        },
        {
          "w": "public",
          "u": "c"
        }
      ],
      "answer": 2,
      "rule": "music/plastic/public 中 c 发 /k/，ocean 中 c 发 /ʃ/",
      "year": 2026,
      "paper": "英语2026全真模拟（五）",
      "cat": 7
    },
    {
      "id": "eng26qz5_003",
      "items": [
        {
          "w": "sight",
          "u": "gh"
        },
        {
          "w": "bright",
          "u": "gh"
        },
        {
          "w": "daughter",
          "u": "gh"
        },
        {
          "w": "enough",
          "u": "gh"
        }
      ],
      "answer": 3,
      "rule": "sight/bright/daughter 中 gh 不发音，enough 中 gh 发 /f/",
      "year": 2026,
      "paper": "英语2026全真模拟（五）",
      "cat": 9
    },
    {
      "id": "eng26qz5_004",
      "items": [
        {
          "w": "dear",
          "u": "ear"
        },
        {
          "w": "heart",
          "u": "ear"
        },
        {
          "w": "ear",
          "u": "ear"
        },
        {
          "w": "tear",
          "u": "ear"
        }
      ],
      "answer": 1,
      "rule": "dear/ear/tear 中 ear 发 /ɪə/，heart 中 ear 发 /ɑː/",
      "year": 2026,
      "paper": "英语2026全真模拟（五）",
      "cat": 15
    },
    {
      "id": "eng26qz5_005",
      "items": [
        {
          "w": "equip",
          "u": "qu"
        },
        {
          "w": "mosquito",
          "u": "qu"
        },
        {
          "w": "liquid",
          "u": "qu"
        },
        {
          "w": "quarter",
          "u": "qu"
        }
      ],
      "answer": 3,
      "rule": "equip/mosquito/liquid 中 qu 发 /k/，quarter 中 qu 发 /kw/",
      "year": 2026,
      "paper": "英语2026全真模拟（五）",
      "cat": 5
    },
    {
      "id": "eng26qz6_001",
      "items": [
        {
          "w": "tie",
          "u": "ie"
        },
        {
          "w": "lie",
          "u": "ie"
        },
        {
          "w": "field",
          "u": "ie"
        },
        {
          "w": "die",
          "u": "ie"
        }
      ],
      "answer": 2,
      "rule": "tie/lie/die 中 ie 发 /aɪ/，field 中 ie 发 /iː/",
      "year": 2026,
      "paper": "英语2026全真模拟（六）",
      "cat": 0
    },
    {
      "id": "eng26qz6_002",
      "items": [
        {
          "w": "sincere",
          "u": "ere"
        },
        {
          "w": "there",
          "u": "ere"
        },
        {
          "w": "mere",
          "u": "ere"
        },
        {
          "w": "here",
          "u": "ere"
        }
      ],
      "answer": 1,
      "rule": "sincere/mere/here 中 -ere 发 /ɪə/，there 中 -ere 发 /eə/",
      "year": 2026,
      "paper": "英语2026全真模拟（六）",
      "cat": 1
    },
    {
      "id": "eng26qz6_003",
      "items": [
        {
          "w": "car",
          "u": "ar"
        },
        {
          "w": "far",
          "u": "ar"
        },
        {
          "w": "warm",
          "u": "ar"
        },
        {
          "w": "star",
          "u": "ar"
        }
      ],
      "answer": 2,
      "rule": "car/far/star 中 ar 发 /ɑː/，warm 中 ar 发 /ɔː/",
      "year": 2026,
      "paper": "英语2026全真模拟（六）",
      "cat": 5
    },
    {
      "id": "eng26qz6_004",
      "items": [
        {
          "w": "plays",
          "u": "ay"
        },
        {
          "w": "days",
          "u": "ay"
        },
        {
          "w": "says",
          "u": "ay"
        },
        {
          "w": "pays",
          "u": "ay"
        }
      ],
      "answer": 2,
      "rule": "plays/days/pays 中 ay 发 /eɪ/，says 中 ay 发 /e/",
      "year": 2026,
      "paper": "英语2026全真模拟（六）",
      "cat": 14
    },
    {
      "id": "eng26qz6_005",
      "items": [
        {
          "w": "wall",
          "u": "all"
        },
        {
          "w": "shall",
          "u": "all"
        },
        {
          "w": "fall",
          "u": "all"
        },
        {
          "w": "call",
          "u": "all"
        }
      ],
      "answer": 1,
      "rule": "wall/fall/call 中 all 发 /ɔːl/，shall 中 all 发 /æl/",
      "year": 2026,
      "paper": "英语2026全真模拟（六）",
      "cat": 5
    }
  ],
  "groups": [
    {
      "id": "g0",
      "name": "a / e / i / o / u",
      "prio": "P0",
      "pat": "开音节(…e 或 元+辅+不发音e)读字母名音 /eɪ/ /iː/ /aɪ/ /əʊ/ /juː/；闭音节（辅音结尾无 e）读短音 /æ/ /e/ /ɪ/ /ɒ/ /ʌ/",
      "eg": "cake/map · these/set · bike/sit · note/dog · use/cut"
    },
    {
      "id": "g1",
      "name": "th",
      "prio": "P0",
      "pat": "在 this/that/with 等代词、介词中读浊音 /ð/；其余多读清音 /θ/",
      "eg": "this/with → /ð/；think/three → /θ/"
    },
    {
      "id": "g2",
      "name": "oo",
      "prio": "P0",
      "pat": "多数读 /ʊ/；少数读 /uː/",
      "eg": "book/look/good → /ʊ/；moon/food/room → /uː/"
    },
    {
      "id": "g3",
      "name": "ea",
      "prio": "P1",
      "pat": "常读 /iː/；在 head/bread/dead 中读 /e/",
      "eg": "tea/read/meat → /iː/；head/bread → /e/"
    },
    {
      "id": "g4",
      "name": "-ed (过去式)",
      "prio": "P1",
      "pat": "清辅音后 /t/；浊辅音或元音后 /d/；t/d 后 /ɪd/",
      "eg": "washed/looked → /t/；played/called → /d/；wanted/needed → /ɪd/"
    },
    {
      "id": "g5",
      "name": "-s (复数/三单)",
      "prio": "P1",
      "pat": "清后 /s/；浊或元音后 /z/；s/ʃ/tʃ/z 后 /ɪz/",
      "eg": "maps/cats → /s/；dogs/boys → /z/；boxes/watches → /ɪz/"
    },
    {
      "id": "g6",
      "name": "ch",
      "prio": "P2",
      "pat": "一般 /tʃ/；在 machine/Chicago 等中 /ʃ/",
      "eg": "chair/teacher/child → /tʃ/；machine → /ʃ/"
    },
    {
      "id": "g7",
      "name": "c",
      "prio": "P0",
      "pat": "在 e/i/y 前读 /s/；其余 /k/",
      "eg": "city/cycle/face → /s/；cat/cold → /k/"
    },
    {
      "id": "g8",
      "name": "g",
      "prio": "P0",
      "pat": "在 e/i/y 前读 /dʒ/；其余 /g/",
      "eg": "page/large/gym → /dʒ/；go/get → /g/"
    },
    {
      "id": "g9",
      "name": "gh",
      "prio": "P2",
      "pat": "多数不发音；在 cough/rough/enough/laugh 中读 /f/",
      "eg": "high/light/right 不发音；cough/rough → /f/"
    },
    {
      "id": "g10",
      "name": "wh",
      "prio": "P2",
      "pat": "一般 /w/；在 who/whom/whose 中 /h/",
      "eg": "what/where/white → /w/；who → /h/"
    },
    {
      "id": "g11",
      "name": "ng",
      "prio": "P2",
      "pat": "词尾或 n+k 前读 /ŋ/；在 ngle 中读 /ŋg/",
      "eg": "sing/long/thing → /ŋ/；angle → /ŋg/"
    },
    {
      "id": "g12",
      "name": "ou",
      "prio": "P1",
      "pat": "常 /aʊ/；在 young/country/cousin 中 /ʌ/",
      "eg": "house/count/mouth → /aʊ/；young → /ʌ/"
    },
    {
      "id": "g13",
      "name": "ow",
      "prio": "P1",
      "pat": "词尾常 /aʊ/；在 low/know/show 中 /əʊ/",
      "eg": "how/now/down → /aʊ/；low/know → /əʊ/"
    },
    {
      "id": "g14",
      "name": "ai / ay",
      "prio": "P2",
      "pat": "常 /eɪ/；said 中 /e/",
      "eg": "rain/wait/day → /eɪ/；said → /e/"
    },
    {
      "id": "g15",
      "name": "ear",
      "prio": "P2",
      "pat": "在 bear/wear 中 /eə/；其余多 /ɪə/",
      "eg": "bear/wear → /eə/；ear/hear/near → /ɪə/"
    },
    {
      "id": "g16",
      "name": "our",
      "prio": "P2",
      "pat": "在 hour/our/flower 中 /aʊə/；在 four/your 中 /ɔː/",
      "eg": "hour/our/flower → /aʊə/；four/your → /ɔː/"
    }
  ]
};
