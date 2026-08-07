// Apply saved theme before anything renders
(function applyThemeEarly() {
  const saved = localStorage.getItem("xu-lab-theme") || "mint";
  document.documentElement.setAttribute("data-theme", saved);
})();

const siteData = {
  "categories": [
    "全部",
    "细胞实验",
    "分子与基因",
    "蛋白与免疫",
    "组织病理",
    "动物实验",
    "仪器与配方",
    "数据与网络药理"
  ],
  "sops": [
    {
      "file": "CZK-细胞计数法-23.8.14.pdf",
      "title": "细胞计数法",
      "author": "CZK",
      "category": "细胞实验",
      "desc": "细胞计数操作流程与记录要点。",
      "page": "./sop-pages/sop-01.html",
      "pdf": "./experiment/CZK-细胞计数法-23.8.14.pdf",
      "tags": [
        "细胞"
      ],
      "updateDate": "2023-08-14",
      "updateLabel": "2023-08-14",
      "favorite": false
    },
    {
      "file": "WFN-细胞传代.pdf",
      "title": "细胞传代",
      "author": "WFN",
      "category": "细胞实验",
      "desc": "细胞传代的常规步骤、观察和注意事项。",
      "page": "./sop-pages/sop-02.html",
      "pdf": "./experiment/WFN-细胞传代.pdf",
      "tags": [
        "细胞"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": true
    },
    {
      "file": "WFN-细胞冻存.pdf",
      "title": "细胞冻存",
      "author": "WFN",
      "category": "细胞实验",
      "desc": "细胞冻存液准备、降温保存和标记规范。",
      "page": "./sop-pages/sop-03.html",
      "pdf": "./experiment/WFN-细胞冻存.pdf",
      "tags": [
        "细胞"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false
    },
    {
      "file": "WFN-细胞复苏.pdf",
      "title": "细胞复苏",
      "author": "WFN",
      "category": "细胞实验",
      "desc": "冻存细胞复苏、离心换液和培养恢复流程。",
      "page": "./sop-pages/sop-04.html",
      "pdf": "./experiment/WFN-细胞复苏.pdf",
      "tags": [
        "细胞"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false
    },
    {
      "file": "WM-Transwell.pdf",
      "title": "Transwell",
      "author": "WM",
      "category": "细胞实验",
      "desc": "Transwell 迁移或侵袭实验的操作 SOP。",
      "page": "./sop-pages/sop-05.html",
      "pdf": "./experiment/WM-Transwell.pdf",
      "tags": [
        "细胞"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false
    },
    {
      "file": "YZB-克隆形成实验.pdf",
      "title": "克隆形成实验",
      "author": "YZB",
      "category": "细胞实验",
      "desc": "细胞铺板、培养、染色与克隆计数流程。",
      "page": "./sop-pages/sop-06.html",
      "pdf": "./experiment/YZB-克隆形成实验.pdf",
      "tags": [
        "细胞"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false
    },
    {
      "file": "HYA-碱裂解法提取鼠尾DNA.pdf",
      "title": "碱裂解法提取鼠尾 DNA",
      "author": "HYA",
      "category": "分子与基因",
      "desc": "鼠尾 DNA 快速提取流程。",
      "page": "./sop-pages/sop-07.html",
      "pdf": "./experiment/HYA-碱裂解法提取鼠尾DNA.pdf",
      "tags": [
        "基因鉴定"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false
    },
    {
      "file": "HYA-观察基因鉴定方法.pdf",
      "title": "观察基因鉴定方法",
      "author": "HYA",
      "category": "分子与基因",
      "desc": "基因鉴定结果观察与判断方法。",
      "page": "./sop-pages/sop-08.html",
      "pdf": "./experiment/HYA-观察基因鉴定方法.pdf",
      "tags": [
        "基因鉴定"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false
    },
    {
      "file": "ZJH-基因鉴定.pdf",
      "title": "基因鉴定",
      "author": "ZJH",
      "category": "分子与基因",
      "desc": "基因鉴定实验完整 SOP。",
      "page": "./sop-pages/sop-09.html",
      "pdf": "./experiment/ZJH-基因鉴定.pdf",
      "tags": [
        "基因鉴定"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false
    },
    {
      "file": "基因鉴定的大致步骤-赵烨.pdf",
      "title": "基因鉴定的大致步骤",
      "author": "赵烨",
      "category": "分子与基因",
      "desc": "基因鉴定流程概览与关键节点。",
      "page": "./sop-pages/sop-10.html",
      "pdf": "./experiment/基因鉴定的大致步骤-赵烨.pdf",
      "tags": [
        "基因鉴定"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false
    },
    {
      "file": "观察基因鉴定结果方法示意-陈洪.pdf",
      "title": "观察基因鉴定结果方法示意",
      "author": "陈洪",
      "category": "分子与基因",
      "desc": "基因鉴定结果阅读示意。",
      "page": "./sop-pages/sop-11.html",
      "pdf": "./experiment/观察基因鉴定结果方法示意-陈洪.pdf",
      "tags": [
        "基因鉴定"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false
    },
    {
      "file": "XGZ-总的RNA的提取.pdf",
      "title": "总 RNA 的提取",
      "author": "XGZ",
      "category": "分子与基因",
      "desc": "RNA 提取步骤和防降解注意事项。",
      "page": "./sop-pages/sop-12.html",
      "pdf": "./experiment/XGZ-总的RNA的提取.pdf",
      "tags": [
        "RNA"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false
    },
    {
      "file": "CYL-WB实验_23.9.13.pdf",
      "title": "WB 实验",
      "author": "CYL",
      "category": "蛋白与免疫",
      "desc": "Western blot 实验流程。",
      "page": "./sop-pages/sop-13.html",
      "pdf": "./experiment/CYL-WB实验_23.9.13.pdf",
      "tags": [
        "WB",
        "免疫"
      ],
      "updateDate": "2023-09-13",
      "updateLabel": "2023-09-13",
      "favorite": true
    },
    {
      "file": "CZK-组织蛋白的提取-23.8.14.pdf",
      "title": "组织蛋白的提取",
      "author": "CZK",
      "category": "蛋白与免疫",
      "desc": "组织样本蛋白提取操作。",
      "page": "./sop-pages/sop-14.html",
      "pdf": "./experiment/CZK-组织蛋白的提取-23.8.14.pdf",
      "tags": [
        "WB",
        "免疫"
      ],
      "updateDate": "2023-08-14",
      "updateLabel": "2023-08-14",
      "favorite": false
    },
    {
      "file": "提蛋白步骤-脾脏和肝脏组织-系统19级学生整理.pdf",
      "title": "脾脏和肝脏组织提蛋白",
      "author": "系统19级学生整理",
      "category": "蛋白与免疫",
      "desc": "脾脏、肝脏样本蛋白提取步骤。",
      "page": "./sop-pages/sop-15.html",
      "pdf": "./experiment/提蛋白步骤-脾脏和肝脏组织-系统19级学生整理.pdf",
      "tags": [
        "WB",
        "免疫"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false
    },
    {
      "file": "免疫荧光步骤-25.7.28.pdf",
      "title": "免疫荧光步骤",
      "author": "课题组",
      "category": "蛋白与免疫",
      "desc": "免疫荧光染色与成像前处理流程。",
      "page": "./sop-pages/sop-16.html",
      "pdf": "./experiment/免疫荧光步骤-25.7.28.pdf",
      "tags": [
        "WB",
        "染色",
        "免疫"
      ],
      "updateDate": "2025-07-28",
      "updateLabel": "2025-07-28",
      "favorite": false
    },
    {
      "file": "免疫组化步骤-25.7.28.pdf",
      "title": "免疫组化步骤",
      "author": "课题组",
      "category": "蛋白与免疫",
      "desc": "IHC 染色实验流程。",
      "page": "./sop-pages/sop-17.html",
      "pdf": "./experiment/免疫组化步骤-25.7.28.pdf",
      "tags": [
        "WB",
        "染色",
        "免疫"
      ],
      "updateDate": "2025-07-28",
      "updateLabel": "2025-07-28",
      "favorite": false
    },
    {
      "file": "WM-HE染色.pdf",
      "title": "HE 染色",
      "author": "WM",
      "category": "组织病理",
      "desc": "HE 染色操作步骤。",
      "page": "./sop-pages/sop-18.html",
      "pdf": "./experiment/WM-HE染色.pdf",
      "tags": [
        "染色",
        "病理"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false
    },
    {
      "file": "YFY-冰冻切片制片实验步骤.pdf",
      "title": "冰冻切片制片实验步骤",
      "author": "YFY",
      "category": "组织病理",
      "desc": "冰冻切片制备流程。",
      "page": "./sop-pages/sop-19.html",
      "pdf": "./experiment/YFY-冰冻切片制片实验步骤.pdf",
      "tags": [
        "病理"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false
    },
    {
      "file": "YFY-Ⅱ型糖尿病造模.pdf",
      "title": "Ⅱ型糖尿病造模",
      "author": "YFY",
      "category": "动物实验",
      "desc": "动物模型构建步骤与记录要点。",
      "page": "./sop-pages/sop-20.html",
      "pdf": "./experiment/YFY-Ⅱ型糖尿病造模.pdf",
      "tags": [
        "动物"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false
    },
    {
      "file": "动物房相关事宜-陈洪.pdf",
      "title": "动物房相关事宜",
      "author": "陈洪",
      "category": "动物实验",
      "desc": "动物房使用与管理相关事项。",
      "page": "./sop-pages/sop-21.html",
      "pdf": "./experiment/动物房相关事宜-陈洪.pdf",
      "tags": [
        "动物"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false
    },
    {
      "file": "PCR仪以及电泳仪-赵烨.pdf",
      "title": "PCR 仪以及电泳仪",
      "author": "赵烨",
      "category": "仪器与配方",
      "desc": "PCR 仪和电泳仪使用说明。",
      "page": "./sop-pages/sop-22.html",
      "pdf": "./experiment/PCR仪以及电泳仪-赵烨.pdf",
      "tags": [
        "PCR",
        "电泳",
        "配方",
        "仪器"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": true
    },
    {
      "file": "ZX-PCR仪及电泳仪使用.pdf",
      "title": "PCR 仪及电泳仪使用",
      "author": "ZX",
      "category": "仪器与配方",
      "desc": "仪器操作流程与注意事项。",
      "page": "./sop-pages/sop-23.html",
      "pdf": "./experiment/ZX-PCR仪及电泳仪使用.pdf",
      "tags": [
        "PCR",
        "电泳",
        "配方",
        "仪器"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": true
    },
    {
      "file": "ZX-LSB配方及配置_23.8.31.pdf",
      "title": "LSB 配方及配置",
      "author": "ZX",
      "category": "仪器与配方",
      "desc": "LSB 试剂配方与配置方法。",
      "page": "./sop-pages/sop-24.html",
      "pdf": "./experiment/ZX-LSB配方及配置_23.8.31.pdf",
      "tags": [
        "配方",
        "仪器"
      ],
      "updateDate": "2023-08-31",
      "updateLabel": "2023-08-31",
      "favorite": false
    },
    {
      "file": "临床试验数据检索-25.8.12_ZT.pdf",
      "title": "临床试验数据检索",
      "author": "ZT",
      "category": "数据与网络药理",
      "desc": "临床试验数据检索流程。",
      "page": "./sop-pages/sop-25.html",
      "pdf": "./experiment/临床试验数据检索-25.8.12_ZT.pdf",
      "tags": [
        "数据库"
      ],
      "updateDate": "2025-08-12",
      "updateLabel": "2025-08-12",
      "favorite": false
    },
    {
      "file": "网络药理学整理-ZLZ-25.8.30.pdf",
      "title": "网络药理学整理",
      "author": "ZLZ",
      "category": "数据与网络药理",
      "desc": "网络药理学资料整理方法。",
      "page": "./sop-pages/sop-26.html",
      "pdf": "./experiment/网络药理学整理-ZLZ-25.8.30.pdf",
      "tags": [
        "数据库"
      ],
      "updateDate": "2025-08-30",
      "updateLabel": "2025-08-30",
      "favorite": false
    },
    {
      "file": "biorender绘图入门-wpy.pdf",
      "title": "BioRender 绘图入门",
      "author": "WPY",
      "category": "数据与网络药理",
      "desc": "BioRender 科研绘图基础入门与操作示例。",
      "page": "./sop-pages/sop-27.html",
      "pdf": "./experiment/biorender绘图入门-wpy.pdf",
      "tags": [
        "数据库"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false,
      "uploadDate": "2026-07-31"
    },
    {
      "file": "Figure Database.pdf",
      "title": "Figure Database",
      "author": "待补充",
      "category": "数据与网络药理",
      "desc": "科研作图与图形资源数据库整理。",
      "page": "./sop-pages/sop-28.html",
      "pdf": "./experiment/Figure Database.pdf",
      "tags": [
        "数据库"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false,
      "uploadDate": "2026-07-31"
    },
    {
      "file": "ZYC整理作图-传workshop.pdf",
      "title": "作图 Workshop",
      "author": "ZYC",
      "category": "数据与网络药理",
      "desc": "科研作图工作坊资料整理。",
      "page": "./sop-pages/sop-29.html",
      "pdf": "./experiment/ZYC整理作图-传workshop.pdf",
      "tags": [
        "数据库"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false,
      "uploadDate": "2026-07-31"
    },
    {
      "file": "CCK8.pdf",
      "title": "CCK8 细胞活力检测",
      "author": "待补充",
      "category": "细胞实验",
      "desc": "CCK-8 法检测细胞增殖与活力，含试剂配制与吸光度读取要点。",
      "tags": [
        "细胞"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false,
      "page": "./sop-pages/sop-30.html",
      "pdf": "./experiment/CCK8.pdf",
      "uploadDate": "2026-08-07"
    },
    {
      "file": "Graphpad-Prism-5.0-解析.pdf",
      "title": "GraphPad Prism 5.0 解析",
      "author": "待补充",
      "category": "数据与网络药理",
      "desc": "GraphPad Prism 5.0 统计分析与科研绘图操作教程。",
      "tags": [
        "数据库"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false,
      "page": "./sop-pages/sop-31.html",
      "pdf": "./experiment/Graphpad-Prism-5.0-解析.pdf",
      "uploadDate": "2026-08-07"
    },
    {
      "file": "使用Endnote在Office Word中插入文献的方法.pdf",
      "title": "Endnote 在 Word 中插入文献",
      "author": "待补充",
      "category": "数据与网络药理",
      "desc": "使用 EndNote 在 Word 中管理并插入参考文献的完整方法。",
      "tags": [
        "数据库"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false,
      "page": "./sop-pages/sop-32.html",
      "pdf": "./experiment/使用Endnote在Office Word中插入文献的方法.pdf",
      "uploadDate": "2026-08-07"
    },
    {
      "file": "动物药物体内使用浓度折算方式-26.8.7.pdf",
      "title": "动物药物体内使用浓度折算",
      "author": "待补充",
      "category": "动物实验",
      "desc": "动物实验中药物体内给药浓度的换算方式与参考表。",
      "tags": [
        "动物"
      ],
      "updateDate": "2026-08-07",
      "updateLabel": "2026-08-07",
      "favorite": false,
      "page": "./sop-pages/sop-33.html",
      "pdf": "./experiment/动物药物体内使用浓度折算方式-26.8.7.pdf",
      "uploadDate": "2026-08-07"
    },
    {
      "file": "细胞计数法.pdf",
      "title": "细胞计数法（参考版）",
      "author": "待补充",
      "category": "细胞实验",
      "desc": "细胞计数法操作步骤与注意事项，含血球计数板使用方法。",
      "tags": [
        "细胞"
      ],
      "updateDate": "",
      "updateLabel": "待补充",
      "favorite": false,
      "page": "./sop-pages/sop-34.html",
      "pdf": "./experiment/细胞计数法.pdf",
      "uploadDate": "2026-08-07"
    }
  ],
  "vendors": [
    {
      "name": "伊诺凯",
      "value": "https://www.inno-chem.com.cn/",
      "type": "url"
    },
    {
      "name": "毕得医药",
      "value": "https://www.bidepharm.com/",
      "type": "url"
    },
    {
      "name": "麦克林试剂",
      "value": "https://www.macklin.cn/",
      "type": "url"
    },
    {
      "name": "上海泰坦科技股份有限公司",
      "value": "https://www.titansci.com/index.action",
      "type": "url"
    },
    {
      "name": "上海源叶生物科技有限公司",
      "value": "https://www.shyuanye.com/index.html",
      "type": "url"
    },
    {
      "name": "Selleck",
      "value": "https://www.selleck.cn/index.html",
      "type": "url"
    },
    {
      "name": "MCE",
      "value": "https://www.medchemexpress.cn/",
      "type": "url"
    },
    {
      "name": "南京伊尔美生物科技有限公司",
      "value": "https://www.yormbio.com/",
      "type": "url"
    }
  ],
  "tools": [
    {
      "name": "NCBI",
      "url": "https://www.ncbi.nlm.nih.gov/",
      "desc": "整合基因、序列、蛋白、文献与生命科学数据库的综合入口。",
      "category": "综合数据库"
    },
    {
      "name": "PubMed",
      "url": "https://pubmed.ncbi.nlm.nih.gov/",
      "desc": "生物医学文献检索平台，适合查论文、综述和 MeSH 主题。",
      "category": "文献检索"
    },
    {
      "name": "SciDraw",
      "url": "https://scidraw.io/",
      "desc": "科研示意图素材平台，可用于论文、基金和汇报作图。",
      "category": "科研作图"
    },
    {
      "name": "PubChem",
      "url": "https://pubchem.ncbi.nlm.nih.gov/",
      "desc": "化合物结构、活性、安全信息和小分子资料查询平台。",
      "category": "化合物"
    },
    {
      "name": "UniProt",
      "url": "https://www.uniprot.org/",
      "desc": "蛋白序列、功能注释、结构域和物种同源信息数据库。",
      "category": "蛋白数据库"
    },
    {
      "name": "PDB",
      "url": "https://www.rcsb.org/",
      "desc": "蛋白、核酸和复合物三维结构数据检索入口。",
      "category": "结构数据库"
    },
    {
      "name": "GEO",
      "url": "https://www.ncbi.nlm.nih.gov/geo/",
      "desc": "基因表达与高通量组学数据仓库，可检索芯片和测序数据集。",
      "category": "组学数据"
    },
    {
      "name": "STRING",
      "url": "https://string-db.org/",
      "desc": "蛋白互作网络数据库，用于分析蛋白间关联和功能模块。",
      "category": "互作网络"
    },
    {
      "name": "KEGG",
      "url": "https://www.genome.jp/kegg/",
      "desc": "通路、基因、疾病和代谢网络数据库，适合机制通路查询。",
      "category": "通路数据库"
    },
    {
      "name": "Reactome",
      "url": "https://reactome.org/",
      "desc": "人工校订的生物通路数据库，适合通路浏览和富集解释。",
      "category": "通路数据库"
    },
    {
      "name": "DAVID",
      "url": "https://david.ncifcrf.gov/",
      "desc": "基因功能注释与富集分析工具，适合快速解释基因列表。",
      "category": "富集分析"
    },
    {
      "name": "Enrichr",
      "url": "https://maayanlab.cloud/Enrichr/",
      "desc": "在线富集分析平台，覆盖通路、转录因子和多种基因集库。",
      "category": "富集分析"
    },
    {
      "name": "ImageJ/Fiji",
      "url": "https://fiji.sc/",
      "desc": "常用科学图像分析软件，适合免疫荧光、WB 灰度和细胞图像处理。",
      "category": "图像分析"
    },
    {
      "name": "GraphPad",
      "url": "https://www.graphpad.com/",
      "desc": "统计分析与科研绘图工具，常用于实验数据可视化。",
      "category": "统计作图"
    },
    {
      "name": "UCSC",
      "url": "https://genome.ucsc.edu/",
      "desc": "基因组浏览器，可查看基因结构、注释轨道和物种基因组信息。",
      "category": "基因组浏览"
    },
    {
      "name": "JASPAR",
      "url": "https://jaspar.genereg.net/",
      "desc": "转录因子结合基序数据库，适合启动子和调控元件分析。",
      "category": "转录调控"
    }
  ],
  "favorites": [
    {
      "type": "SOP",
      "title": "WB 实验",
      "desc": "蛋白实验高频入口",
      "url": "./sop-pages/sop-13.html"
    },
    {
      "type": "SOP",
      "title": "PCR / 电泳",
      "desc": "PCR 仪和电泳仪使用",
      "url": "./sop-pages/sop-22.html"
    },
    {
      "type": "SOP",
      "title": "细胞传代",
      "desc": "细胞房常用流程",
      "url": "./sop-pages/sop-02.html"
    },
    {
      "type": "工具",
      "title": "PubMed",
      "desc": "文献检索",
      "url": "https://pubmed.ncbi.nlm.nih.gov/"
    },
    {
      "type": "工具",
      "title": "NCBI",
      "desc": "综合数据库",
      "url": "https://www.ncbi.nlm.nih.gov/"
    },
    {
      "type": "下载",
      "title": "全部 SOP",
      "desc": "一键下载 PDF 压缩包",
      "url": "./downloads/all-sop-pdfs.zip"
    }
  ],
  "quotes": [
    "自信驾驭强大",
    "Stay hungry, stay foolish",
    "问题越清楚，答案越锋利",
    "把复杂交给秩序，把热爱交给时间",
    "认真是最稳定的天赋",
    "在证据里保持勇气",
    "让每一次实验都有回声",
    "慢就是稳，稳就是快",
    "好奇心是科研的第一束光",
    "把不确定写进记录，把确定交给验证",
    "细节不是装饰，细节是方向",
    "Think deeply, act cleanly",
    "看见变量，也看见可能",
    "每一页 SOP 都是下一次成功的底座",
    "Knowledge grows where patience stays"
  ]
};

let selectedCategory = "全部";
let selectedTag = "全部";
let searchTerm = "";
let sortOption = "default";
let selectedToolCategory = "全部";
let vendorSearchTerm = "";

const categoryColors = {
  "细胞实验": "var(--accent)",
  "分子与基因": "var(--plum)",
  "蛋白与免疫": "var(--cool)",
  "组织病理": "var(--amber)",
  "动物实验": "var(--warm)",
  "仪器与配方": "var(--indigo)",
  "数据与网络药理": "var(--rose)"
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char]));
}

function basePath() {
  return document.body.dataset.base || ".";
}

function withBase(path) {
  if (!path || /^https?:|^mailto:|^tel:/.test(path)) return path;
  return `${basePath()}/${path.replace(/^\.\//, "")}`;
}

function cardLinkAttrs(url) {
  const isExternal = /^https?:/.test(url);
  return isExternal ? `href="${url}" target="_blank" rel="noopener"` : `href="${withBase(url)}"`;
}

function renderTabs() {
  const tabs = document.querySelector("#categoryTabs");
  if (!tabs) return;
  tabs.innerHTML = siteData.categories.map((category) => {
    const count = category === "全部" ? siteData.sops.length : siteData.sops.filter((sop) => sop.category === category).length;
    return `<button class="tab" type="button" aria-selected="${category === selectedCategory}" data-category="${escapeHtml(category)}">${escapeHtml(category)} ${count}</button>`;
  }).join("");
}

function renderTagTabs() {
  const tabs = document.querySelector("#tagTabs");
  if (!tabs) return;
  const allTags = ["全部", ...new Set(siteData.sops.flatMap((sop) => sop.tags))];
  tabs.innerHTML = allTags.map((tag) => `<button class="tag-tab" type="button" aria-selected="${tag === selectedTag}" data-tag="${escapeHtml(tag)}"># ${escapeHtml(tag)}</button>`).join("");
}

function filteredSops() {
  const term = searchTerm.trim().toLowerCase();
  return siteData.sops.filter((sop) => {
    const inCategory = selectedCategory === "全部" || sop.category === selectedCategory;
    const inTag = selectedTag === "全部" || sop.tags.includes(selectedTag);
    const haystack = `${sop.title} ${sop.author} ${sop.category} ${sop.file} ${sop.tags.join(" ")}`.toLowerCase();
    return inCategory && inTag && (!term || haystack.includes(term));
  });
}

function sopCard(sop, index) {
  const i = index || 0;
  return `
    <article class="sop-card" data-category="${escapeHtml(sop.category)}" style="--i:${i}">
      <div>
        <div class="meta">
          <span class="pill">${escapeHtml(sop.category)}</span>
          <span class="pill">${escapeHtml(sop.author)}</span>
        </div>
        <h3>${escapeHtml(sop.title)}</h3>
        <p>${escapeHtml(sop.desc)}</p>
        <div class="tag-line">${sop.tags.map((tag) => `<span># ${escapeHtml(tag)}</span>`).join("")}</div>
      </div>
      <div class="card-actions">
        <a class="button primary transition-link" href="${withBase(sop.page)}">预览 PDF</a>
        <a class="button ghost" href="${withBase(sop.pdf)}" target="_blank" rel="noopener">PDF</a>
      </div>
    </article>
  `;
}

function vendorCard(vendor, index) {
  const i = index || 0;
  return `
    <a class="vendor-card" href="${vendor.value}" target="_blank" rel="noopener" style="--i:${i}">
      <div>
        <div class="meta"><span class="pill">采购网站</span></div>
        <h3>${escapeHtml(vendor.name)}</h3>
        <p class="vendor-link">${escapeHtml(vendor.value)}</p>
      </div>
      <span class="button primary">打开平台</span>
    </a>
  `;
}

function toolCard(tool, index) {
  const i = index || 0;
  return `
    <a class="tool-card" href="${tool.url}" target="_blank" rel="noopener" style="--i:${i}">
      <span class="tool-mark">${escapeHtml(tool.name.slice(0, 2))}</span>
      <div>
        <span class="tool-kind">${escapeHtml(tool.category)}</span>
        <h3>${escapeHtml(tool.name)}</h3>
        <p>${escapeHtml(tool.desc)}</p>
      </div>
      <span class="tool-url">${escapeHtml(tool.url)}</span>
    </a>
  `;
}

function quickCard(item, index) {
  const i = index || 0;
  return `
    <a class="quick-card" ${cardLinkAttrs(item.url)} style="--i:${i}">
      <span class="pill">${escapeHtml(item.type)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.desc)}</p>
    </a>
  `;
}

function updateCard(sop, index) {
  const i = index || 0;
  const dateLabel = sop.uploadDate ? formatDateLabel(sop.uploadDate) : sop.updateLabel;
  return `
    <a class="update-card transition-link" href="${withBase(sop.page)}" style="--i:${i}">
      <time>${escapeHtml(dateLabel)}</time>
      <h3>${escapeHtml(sop.title)}</h3>
      <p>${escapeHtml(sop.category)} · ${escapeHtml(sop.tags.join(" / "))}</p>
    </a>
  `;
}

function recentSops() {
  return [...siteData.sops]
    .filter((sop) => sop.uploadDate || sop.updateDate)
    .sort((a, b) => {
      const aDate = a.uploadDate || a.updateDate;
      const bDate = b.uploadDate || b.updateDate;
      return bDate.localeCompare(aDate);
    });
}

function renderHome() {
  const sops = document.querySelector("#homeSops");
  if (sops) sops.innerHTML = siteData.sops.filter((sop) => sop.favorite).slice(0, 4).map((sop, i) => sopCard(sop, i)).join("");

  const catAccess = document.querySelector("#homeCatAccess");
  if (catAccess) {
    const cats = siteData.categories.filter((c) => c !== "全部");
    catAccess.innerHTML = cats.map((cat, i) => {
      const count = siteData.sops.filter((s) => s.category === cat).length;
      const color = categoryColors[cat] || "var(--accent)";
      return `<a class="cat-quick-item transition-link" href="${withBase("./pages/sop.html")}" style="--i:${i}; --cat-color:${color}" data-cat="${escapeHtml(cat)}">
        <span class="cat-quick-dot"></span>
        ${escapeHtml(cat)}
        <span class="cat-quick-count">${count}</span>
      </a>`;
    }).join("");
  }

  const vendors = document.querySelector("#homeVendors");
  if (vendors) {
    vendors.className = "vendor-compact-grid";
    vendors.innerHTML = siteData.vendors.slice(0, 8).map((vendor, i) => `
      <a class="vendor-compact-card" href="${vendor.value}" target="_blank" rel="noopener" style="--i:${i}">
        <span class="vendor-compact-icon">${escapeHtml(vendor.name.slice(0, 2))}</span>
        <div class="vendor-compact-info">
          <strong>${escapeHtml(vendor.name)}</strong>
          <span>点击打开采购平台</span>
        </div>
      </a>
    `).join("");
  }

  const tools = document.querySelector("#homeTools");
  if (tools) {
    tools.className = "tools-grouped";
    const groups = {};
    siteData.tools.forEach((t) => {
      if (!groups[t.category]) groups[t.category] = [];
      groups[t.category].push(t);
    });
    let html = "";
    let gi = 0;
    for (const [cat, catTools] of Object.entries(groups)) {
      html += `<div class="tool-group">`;
      html += `<div class="tool-group-head"><span class="tool-group-label">${escapeHtml(cat)}</span><span class="tool-group-line"></span></div>`;
      html += `<div class="tool-group-grid">`;
      html += catTools.map((t, i) => `
        <a class="tool-mini-card" href="${t.url}" target="_blank" rel="noopener" style="--i:${gi + i}">
          <span class="tool-mini-mark">${escapeHtml(t.name.slice(0, 2))}</span>
          <div class="tool-mini-info">
            <strong>${escapeHtml(t.name)}</strong>
            <span>${escapeHtml(t.url.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</span>
          </div>
        </a>
      `).join("");
      html += `</div></div>`;
      gi += catTools.length;
    }
    tools.innerHTML = html;
  }
}

function recentUploadBatches() {
  const withUpload = siteData.sops.filter((sop) => sop.uploadDate);
  const batches = {};
  for (const sop of withUpload) {
    if (!batches[sop.uploadDate]) batches[sop.uploadDate] = [];
    batches[sop.uploadDate].push(sop);
  }
  return Object.keys(batches)
    .sort((a, b) => b.localeCompare(a))
    .slice(0, 2)
    .map((date) => ({ date, sops: batches[date] }));
}

function formatDateLabel(iso) {
  const parts = iso.split("-");
  return `${parseInt(parts[1], 10)}月${parseInt(parts[2], 10)}日`;
}

function renderRecentStrip() {
  const tags = document.querySelector("#recentTags");
  if (!tags) return;
  const batches = recentUploadBatches();
  if (!batches.length) return;
  let html = "";
  batches.forEach((batch, i) => {
    if (i > 0) html += `<span class="recent-batch-divider"></span>`;
    html += `<span class="recent-batch-label">${escapeHtml(formatDateLabel(batch.date))}</span>`;
    html += batch.sops.map((sop) => `
      <a class="recent-tag transition-link" href="${withBase(sop.page)}">
        <span>${escapeHtml(sop.title)}</span>
      </a>
    `).join("");
  });
  tags.innerHTML = html;
}

function sortedSops(sops) {
  const list = [...sops];
  if (sortOption === "date-desc") {
    list.sort((a, b) => (b.uploadDate || b.updateDate || "").localeCompare(a.uploadDate || a.updateDate || ""));
  } else if (sortOption === "date-asc") {
    list.sort((a, b) => (a.uploadDate || a.updateDate || "").localeCompare(b.uploadDate || b.updateDate || ""));
  } else if (sortOption === "title") {
    list.sort((a, b) => a.title.localeCompare(b.title, "zh-CN"));
  }
  return list;
}

function renderSopDirectory() {
  const grid = document.querySelector("#sopDirectory");
  if (!grid) return;
  const sops = sortedSops(filteredSops());
  const countEl = document.querySelector("#sopResultCount");
  if (countEl) countEl.innerHTML = `共 <strong>${sops.length}</strong> 项 SOP`;
  grid.innerHTML = sops.length ? sops.map((sop, i) => sopCard(sop, i)).join("") : `<div class="empty">没有找到匹配的 SOP。</div>`;
}

function filteredVendors() {
  const term = vendorSearchTerm.trim().toLowerCase();
  if (!term) return siteData.vendors;
  return siteData.vendors.filter((v) => v.name.toLowerCase().includes(term) || v.value.toLowerCase().includes(term));
}

function renderVendorDirectory() {
  const grid = document.querySelector("#vendorDirectory");
  if (!grid) return;
  const vendors = filteredVendors();
  grid.innerHTML = vendors.length ? vendors.map((vendor, i) => vendorCard(vendor, i)).join("") : `<div class="empty">没有找到匹配的供应商。</div>`;
}

function renderToolDirectory() {
  const grid = document.querySelector("#toolDirectory");
  if (!grid) return;
  const tools = selectedToolCategory === "全部"
    ? siteData.tools
    : siteData.tools.filter((t) => t.category === selectedToolCategory);
  grid.innerHTML = tools.length ? tools.map((tool, i) => toolCard(tool, i)).join("") : `<div class="empty">没有找到匹配的工具。</div>`;
}

function renderUpdateDirectory() {
  const list = document.querySelector("#updateDirectory");
  if (!list) return;
  list.innerHTML = recentSops().map((sop, i) => updateCard(sop, i)).join("");
}

function initQuotes() {
  const button = document.querySelector("#quoteButton");
  const text = document.querySelector("#quoteText");
  if (!button || !text) return;
  const pick = () => {
    let next = siteData.quotes[Math.floor(Math.random() * siteData.quotes.length)];
    if (siteData.quotes.length > 1) {
      while (next === text.textContent) next = siteData.quotes[Math.floor(Math.random() * siteData.quotes.length)];
    }
    text.classList.remove("quote-pop");
    void text.offsetWidth;
    text.textContent = next;
    text.classList.add("quote-pop");
  };
  button.addEventListener("click", pick);
  pick();
}

function initTransitions() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a.transition-link, a.brand, .back-link");
    if (!link || link.target || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || /^https?:/.test(href)) return;
    event.preventDefault();
    document.body.classList.add("page-leave");
    window.setTimeout(() => { window.location.href = href; }, 180);
  });
}

function initNavScroll() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;
  const onScroll = () => {
    topbar.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initNavActive() {
  const navLinks = document.querySelectorAll(".nav a");
  if (!navLinks.length) return;
  let current = window.location.pathname.split("/").pop() || "index.html";
  if (current === "") current = "index.html";
  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const target = href.split("/").pop();
    link.classList.toggle("active", target === current);
  });
}

function initThemeSwitcher() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;
  const saved = localStorage.getItem("xu-lab-theme") || "mint";
  const themes = [
    { id: "mint", label: "薄荷" },
    { id: "aurora", label: "极光" },
    { id: "dawn", label: "晨曦" },
    { id: "midnight", label: "暗夜" },
    { id: "auto", label: "跟随系统" }
  ];
  const switcher = document.createElement("div");
  switcher.className = "theme-switcher";
  switcher.setAttribute("aria-label", "主题切换");
  themes.forEach((t) => {
    const dot = document.createElement("button");
    dot.className = "theme-dot" + (t.id === saved ? " active" : "");
    dot.setAttribute("data-theme", t.id);
    dot.setAttribute("type", "button");
    dot.setAttribute("title", t.label + "主题");
    dot.setAttribute("aria-label", t.label + "主题");
    if (t.id === "auto") {
      dot.style.background = "conic-gradient(from 0deg, #00b894, #6c5ce7, #ff5722, #7c4dff, #00b894)";
    }
    dot.addEventListener("click", () => {
      if (t.id === "auto") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const autoTheme = prefersDark ? "midnight" : "mint";
        document.documentElement.setAttribute("data-theme", autoTheme);
        localStorage.setItem("xu-lab-theme", "auto");
      } else {
        document.documentElement.setAttribute("data-theme", t.id);
        localStorage.setItem("xu-lab-theme", t.id);
      }
      switcher.querySelectorAll(".theme-dot").forEach((d) =>
        d.classList.toggle("active", d.dataset.theme === t.id)
      );
    });
    switcher.appendChild(dot);
  });
  const nav = topbar.querySelector(".nav");
  if (nav) nav.insertBefore(switcher, nav.firstChild);
  else topbar.appendChild(switcher);

  if (saved === "auto") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", prefersDark ? "midnight" : "mint");
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", (e) => {
      if (localStorage.getItem("xu-lab-theme") === "auto") {
        document.documentElement.setAttribute("data-theme", e.matches ? "midnight" : "mint");
      }
    });
  }
}

function injectUpdatesNav() {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  const existing = Array.from(nav.querySelectorAll("a")).find((a) => {
    const href = a.getAttribute("href") || "";
    return href.includes("updates.html");
  });
  if (existing) return;
  const link = document.createElement("a");
  link.setAttribute("href", withBase("./pages/updates.html"));
  link.setAttribute("data-nav", "updates");
  link.textContent = "最近更新";
  const sopLink = nav.querySelector('a[href*="sop.html"]');
  if (sopLink && sopLink.nextSibling) {
    nav.insertBefore(link, sopLink.nextSibling);
  } else {
    nav.appendChild(link);
  }
}

function initFooter() {
  const existing = document.querySelector(".site-footer");
  if (existing) return;
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  const lastUpdate = recentSops()[0];
  const lastDate = lastUpdate ? (lastUpdate.uploadDate || lastUpdate.updateDate || "") : "";
  footer.innerHTML = `
    <div class="site-footer-inner">
      <div class="site-footer-left">
        <span class="site-footer-mark">XL</span>
        <div class="site-footer-text">
          <strong>Xu Lab SOP Hub</strong><br />
          课题组实验资料库 · Designed by ZLZ${lastDate ? ` · 最近更新 ${lastDate}` : ""}
        </div>
      </div>
      <div class="site-footer-right">
        <a href="${withBase("./index.html")}">首页</a>
        <a href="${withBase("./pages/sop.html")}">实验 SOP</a>
        <a href="https://github.com/Cyber-code-peace/xu-lab-sop-hub-v2" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

function initGlobalSearch() {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  if (nav.querySelector(".search-trigger")) return;
  const trigger = document.createElement("button");
  trigger.className = "search-trigger";
  trigger.setAttribute("type", "button");
  trigger.setAttribute("aria-label", "搜索");
  trigger.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`;
  trigger.addEventListener("click", () => openSearchOverlay());
  nav.appendChild(trigger);

  if (!document.querySelector(".search-overlay")) {
    const overlay = document.createElement("div");
    overlay.className = "search-overlay";
    overlay.innerHTML = `
      <div class="search-overlay-box">
        <div class="search-overlay-input-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input class="search-overlay-input" type="search" placeholder="搜索 SOP、工具、供应商..." />
          <button class="search-overlay-close" type="button">ESC</button>
        </div>
        <div class="search-overlay-results"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeSearchOverlay();
    });
    const input = overlay.querySelector(".search-overlay-input");
    input.addEventListener("input", () => renderSearchResults(input.value));
    const closeBtn = overlay.querySelector(".search-overlay-close");
    closeBtn.addEventListener("click", closeSearchOverlay);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("open")) closeSearchOverlay();
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        openSearchOverlay();
      }
    });
  }
}

function openSearchOverlay() {
  const overlay = document.querySelector(".search-overlay");
  if (!overlay) return;
  overlay.classList.add("open");
  setTimeout(() => {
    const input = overlay.querySelector(".search-overlay-input");
    if (input) input.focus();
  }, 100);
}

function closeSearchOverlay() {
  const overlay = document.querySelector(".search-overlay");
  if (!overlay) return;
  overlay.classList.remove("open");
  const input = overlay.querySelector(".search-overlay-input");
  if (input) input.value = "";
  const results = overlay.querySelector(".search-overlay-results");
  if (results) results.innerHTML = "";
}

function renderSearchResults(query) {
  const results = document.querySelector(".search-overlay-results");
  if (!results) return;
  const term = query.trim().toLowerCase();
  if (!term) { results.innerHTML = ""; return; }
  const items = [];
  siteData.sops.forEach((sop) => {
    if (`${sop.title} ${sop.author} ${sop.category} ${sop.tags.join(" ")}`.toLowerCase().includes(term)) {
      items.push({ type: "SOP", title: sop.title, desc: `${sop.category} · ${sop.author}`, url: withBase(sop.page) });
    }
  });
  siteData.tools.forEach((tool) => {
    if (`${tool.name} ${tool.category} ${tool.desc}`.toLowerCase().includes(term)) {
      items.push({ type: "工具", title: tool.name, desc: tool.category, url: tool.url, external: true });
    }
  });
  siteData.vendors.forEach((vendor) => {
    if (`${vendor.name} ${vendor.value}`.toLowerCase().includes(term)) {
      items.push({ type: "供应商", title: vendor.name, desc: vendor.value, url: vendor.value, external: true });
    }
  });
  const sliced = items.slice(0, 12);
  results.innerHTML = sliced.length ? sliced.map((item) => `
    <a class="search-result-item" href="${item.url}" ${item.external ? 'target="_blank" rel="noopener"' : ""}>
      <span class="search-result-type">${escapeHtml(item.type)}</span>
      <div class="search-result-info">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.desc)}</span>
      </div>
    </a>
  `).join("") : `<div class="search-overlay-empty">没有找到匹配的结果</div>`;
}

function initBreadcrumb() {
  const layout = document.querySelector(".sop-preview-layout");
  if (!layout) return;
  if (layout.querySelector(".breadcrumb")) return;
  const backLink = layout.querySelector(".back-link");
  if (!backLink) return;
  const titleEl = layout.querySelector(".sop-hero h1");
  const catEl = layout.querySelector(".sop-hero .eyebrow");
  const title = titleEl ? titleEl.textContent : "";
  const category = catEl ? catEl.textContent : "";
  const crumb = document.createElement("nav");
  crumb.className = "breadcrumb";
  crumb.innerHTML = `
    <a href="${withBase("./index.html")}">首页</a>
    <span class="sep">/</span>
    <a href="${withBase("./pages/sop.html")}">实验 SOP</a>
    ${category ? `<span class="sep">/</span><a href="${withBase("./pages/sop.html")}">${escapeHtml(category)}</a>` : ""}
    <span class="sep">/</span>
    <span>${escapeHtml(title)}</span>
  `;
  layout.insertBefore(crumb, backLink);
}

function initRelatedSops() {
  const layout = document.querySelector(".sop-preview-layout");
  if (!layout) return;
  if (layout.querySelector(".related-sops")) return;
  const titleEl = layout.querySelector(".sop-hero h1");
  const catEl = layout.querySelector(".sop-hero .eyebrow");
  if (!titleEl) return;
  const title = titleEl.textContent;
  const category = catEl ? catEl.textContent : "";
  const current = siteData.sops.find((s) => s.title === title);
  if (!current) return;
  const related = siteData.sops
    .filter((s) => s.title !== title && (s.category === current.category || s.tags.some((t) => current.tags.includes(t))))
    .slice(0, 4);
  if (!related.length) return;
  const section = document.createElement("section");
  section.className = "related-sops";
  section.innerHTML = `
    <div class="related-sops-head">
      <p class="eyebrow">Related</p>
      <h3>相关 SOP</h3>
    </div>
    <div class="related-sops-grid">
      ${related.map((sop, i) => `
        <a class="related-sop-card transition-link" href="${withBase(sop.page)}" style="--i:${i}">
          <span class="pill">${escapeHtml(sop.category)}</span>
          <h4>${escapeHtml(sop.title)}</h4>
          <p>${escapeHtml(sop.desc)}</p>
        </a>
      `).join("")}
    </div>
  `;
  layout.appendChild(section);
}

function initPrevNext() {
  const layout = document.querySelector(".sop-preview-layout");
  if (!layout) return;
  if (layout.querySelector(".prev-next-nav")) return;
  const titleEl = layout.querySelector(".sop-hero h1");
  if (!titleEl) return;
  const title = titleEl.textContent;
  const idx = siteData.sops.findIndex((s) => s.title === title);
  if (idx === -1) return;
  const prev = idx > 0 ? siteData.sops[idx - 1] : null;
  const next = idx < siteData.sops.length - 1 ? siteData.sops[idx + 1] : null;
  if (!prev && !next) return;
  const nav = document.createElement("nav");
  nav.className = "prev-next-nav";
  let html = "";
  if (prev) {
    html += `<a class="prev-next-link prev transition-link" href="${withBase(prev.page)}">
      <span class="label">← 上一页</span>
      <span class="title">${escapeHtml(prev.title)}</span>
    </a>`;
  }
  if (next) {
    html += `<a class="prev-next-link next transition-link" href="${withBase(next.page)}">
      <span class="label">下一页 →</span>
      <span class="title">${escapeHtml(next.title)}</span>
    </a>`;
  }
  nav.innerHTML = html;
  layout.appendChild(nav);
}

function initPdfLoading() {
  const iframe = document.querySelector(".pdf-panel iframe");
  if (!iframe) return;
  const panel = iframe.closest(".pdf-panel");
  if (!panel) return;
  const loading = document.createElement("div");
  loading.className = "pdf-loading";
  loading.innerHTML = `<div class="pdf-loading-spinner">PDF 加载中...</div>`;
  panel.insertBefore(loading, iframe);
  iframe.style.display = "none";
  iframe.addEventListener("load", () => {
    loading.style.display = "none";
    iframe.style.display = "block";
    iframe.classList.add("loaded");
  });
  setTimeout(() => {
    if (loading.style.display !== "none") {
      loading.style.display = "none";
      iframe.style.display = "block";
      iframe.classList.add("loaded");
    }
  }, 3000);
}

function initBackToTop() {
  if (document.querySelector(".back-to-top")) return;
  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.setAttribute("type", "button");
  btn.setAttribute("aria-label", "返回顶部");
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>`;
  document.body.appendChild(btn);
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  const onScroll = () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initMobileNav() {
  if (document.querySelector(".mobile-nav")) return;
  if (window.innerWidth > 580) return;
  const nav = document.createElement("nav");
  nav.className = "mobile-nav";
  const base = basePath();
  const items = [
    { label: "首页", href: `${base}/index.html`, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
    { label: "SOP", href: `${base}/pages/sop.html`, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' },
    { label: "供应商", href: `${base}/pages/suppliers.html`, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h20l-2 5H4z"/><path d="M5 8v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/></svg>' },
    { label: "工具", href: `${base}/pages/tools.html`, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>' },
  ];
  let current = window.location.pathname.split("/").pop() || "index.html";
  if (current === "") current = "index.html";
  nav.innerHTML = items.map((item) => {
    const target = item.href.split("/").pop();
    const active = target === current ? " active" : "";
    return `<a href="${item.href}" class="${active}">${item.icon}<span>${item.label}</span></a>`;
  }).join("");
  document.body.appendChild(nav);
}

function initToolFilterTabs() {
  const container = document.querySelector("#toolFilterTabs");
  if (!container) return;
  const cats = ["全部", ...new Set(siteData.tools.map((t) => t.category))];
  container.innerHTML = cats.map((cat) =>
    `<button class="tag-tab" type="button" aria-selected="${cat === selectedToolCategory}" data-tool-cat="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`
  ).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const presetCat = localStorage.getItem("xu-lab-preset-category");
  if (presetCat) {
    selectedCategory = presetCat;
    localStorage.removeItem("xu-lab-preset-category");
  }

  renderTabs();
  renderTagTabs();
  renderHome();
  renderRecentStrip();
  renderSopDirectory();
  renderVendorDirectory();
  renderToolDirectory();
  renderUpdateDirectory();
  initQuotes();
  initTransitions();
  initNavScroll();
  initNavActive();
  initThemeSwitcher();
  injectUpdatesNav();
  initFooter();
  initGlobalSearch();
  initBreadcrumb();
  initRelatedSops();
  initPrevNext();
  initPdfLoading();
  initBackToTop();
  initMobileNav();
  initToolFilterTabs();

  const categoryTabs = document.querySelector("#categoryTabs");
  if (categoryTabs) categoryTabs.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    selectedCategory = button.dataset.category;
    renderTabs();
    renderSopDirectory();
  });

  const tagTabs = document.querySelector("#tagTabs");
  if (tagTabs) tagTabs.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-tag]");
    if (!button) return;
    selectedTag = button.dataset.tag;
    renderTagTabs();
    renderSopDirectory();
  });

  const search = document.querySelector("#sopSearchInput");
  if (search) search.addEventListener("input", (event) => {
    searchTerm = event.target.value;
    renderSopDirectory();
  });

  const sortSelect = document.querySelector("#sopSortSelect");
  if (sortSelect) sortSelect.addEventListener("change", (event) => {
    sortOption = event.target.value;
    renderSopDirectory();
  });

  const toolFilter = document.querySelector("#toolFilterTabs");
  if (toolFilter) toolFilter.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-tool-cat]");
    if (!button) return;
    selectedToolCategory = button.dataset.toolCat;
    initToolFilterTabs();
    renderToolDirectory();
  });

  const vendorSearch = document.querySelector("#vendorSearchInput");
  if (vendorSearch) vendorSearch.addEventListener("input", (event) => {
    vendorSearchTerm = event.target.value;
    renderVendorDirectory();
  });

  const catAccess = document.querySelector("#homeCatAccess");
  if (catAccess) catAccess.addEventListener("click", (event) => {
    const item = event.target.closest(".cat-quick-item");
    if (!item) return;
    event.preventDefault();
    const cat = item.dataset.cat;
    localStorage.setItem("xu-lab-preset-category", cat);
    window.location.href = withBase("./pages/sop.html");
  });
});
