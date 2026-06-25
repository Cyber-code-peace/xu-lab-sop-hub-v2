from __future__ import annotations

import json
import re
import shutil
import zipfile
from html import escape
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent
PAGES = ROOT / "pages"
SOP_PAGES = ROOT / "sop-pages"
DOWNLOADS = ROOT / "downloads"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def load_previous_data() -> dict:
    app = read_text(ROOT / "app.js")
    match = re.search(r"const siteData = (\{.*?\});\n\nlet selectedCategory", app, re.S)
    if not match:
        raise RuntimeError("Cannot find siteData in app.js")
    return json.loads(match.group(1))


def infer_tags(sop: dict) -> list[str]:
    text = f"{sop['title']} {sop['category']} {sop['file']}".lower()
    tags = []
    rules = [
        ("细胞", ["细胞", "transwell", "克隆"]),
        ("WB", ["wb", "western", "蛋白"]),
        ("PCR", ["pcr"]),
        ("电泳", ["电泳"]),
        ("基因鉴定", ["基因鉴定", "鼠尾dna"]),
        ("RNA", ["rna"]),
        ("动物", ["动物", "糖尿病", "造模"]),
        ("染色", ["染色", "免疫荧光", "免疫组化", "he"]),
        ("病理", ["切片", "病理", "he"]),
        ("数据库", ["数据", "网络药理", "检索"]),
        ("配方", ["配方", "lsb"]),
        ("仪器", ["仪", "电泳"]),
        ("免疫", ["免疫"]),
    ]
    for tag, needles in rules:
        if any(needle.lower() in text for needle in needles):
            tags.append(tag)
    if not tags:
        tags.append(sop["category"].replace("实验", ""))
    return list(dict.fromkeys(tags))


def infer_update_date(sop: dict) -> tuple[str, str]:
    file = sop["file"]
    match = re.search(r"(\d{2})[._-](\d{1,2})[._-](\d{1,2})", file)
    if not match:
        return "", "待补充"
    yy, mm, dd = map(int, match.groups())
    year = 2000 + yy
    iso = f"{year:04d}-{mm:02d}-{dd:02d}"
    return iso, iso


def enrich_sops(sops: list[dict]) -> list[dict]:
    enriched = []
    for index, sop in enumerate(sops, start=1):
        item = dict(sop)
        item["page"] = f"./sop-pages/sop-{index:02d}.html"
        item["tags"] = infer_tags(item)
        item["updateDate"], item["updateLabel"] = infer_update_date(item)
        item["favorite"] = item["title"] in {"WB 实验", "PCR 仪以及电泳仪", "PCR 仪及电泳仪使用", "细胞传代"}
        enriched.append(item)
    return enriched


def build_tools(previous_tools: list[dict]) -> list[dict]:
    existing = {tool["name"]: tool for tool in previous_tools}
    tools = [
        {"name": "NCBI", "url": "https://www.ncbi.nlm.nih.gov/", "desc": "整合基因、序列、蛋白、文献与生命科学数据库的综合入口。", "category": "综合数据库"},
        {"name": "PubMed", "url": "https://pubmed.ncbi.nlm.nih.gov/", "desc": "生物医学文献检索平台，适合查论文、综述和 MeSH 主题。", "category": "文献检索"},
        {"name": "SciDraw", "url": "https://scidraw.io/", "desc": "科研示意图素材平台，可用于论文、基金和汇报作图。", "category": "科研作图"},
        {"name": "PubChem", "url": "https://pubchem.ncbi.nlm.nih.gov/", "desc": "化合物结构、活性、安全信息和小分子资料查询平台。", "category": "化合物"},
        {"name": "UniProt", "url": "https://www.uniprot.org/", "desc": "蛋白序列、功能注释、结构域和物种同源信息数据库。", "category": "蛋白数据库"},
        {"name": "PDB", "url": "https://www.rcsb.org/", "desc": "蛋白、核酸和复合物三维结构数据检索入口。", "category": "结构数据库"},
        {"name": "GEO", "url": "https://www.ncbi.nlm.nih.gov/geo/", "desc": "基因表达与高通量组学数据仓库，可检索芯片和测序数据集。", "category": "组学数据"},
        {"name": "STRING", "url": "https://string-db.org/", "desc": "蛋白互作网络数据库，用于分析蛋白间关联和功能模块。", "category": "互作网络"},
        {"name": "KEGG", "url": "https://www.genome.jp/kegg/", "desc": "通路、基因、疾病和代谢网络数据库，适合机制通路查询。", "category": "通路数据库"},
        {"name": "Reactome", "url": "https://reactome.org/", "desc": "人工校订的生物通路数据库，适合通路浏览和富集解释。", "category": "通路数据库"},
        {"name": "DAVID", "url": "https://david.ncifcrf.gov/", "desc": "基因功能注释与富集分析工具，适合快速解释基因列表。", "category": "富集分析"},
        {"name": "Enrichr", "url": "https://maayanlab.cloud/Enrichr/", "desc": "在线富集分析平台，覆盖通路、转录因子和多种基因集库。", "category": "富集分析"},
        {"name": "ImageJ/Fiji", "url": "https://fiji.sc/", "desc": "常用科学图像分析软件，适合免疫荧光、WB 灰度和细胞图像处理。", "category": "图像分析"},
        {"name": "GraphPad", "url": "https://www.graphpad.com/", "desc": "统计分析与科研绘图工具，常用于实验数据可视化。", "category": "统计作图"},
        {"name": "UCSC", "url": "https://genome.ucsc.edu/", "desc": "基因组浏览器，可查看基因结构、注释轨道和物种基因组信息。", "category": "基因组浏览"},
        {"name": "JASPAR", "url": "https://jaspar.genereg.net/", "desc": "转录因子结合基序数据库，适合启动子和调控元件分析。", "category": "转录调控"},
    ]
    for tool in tools:
        if tool["name"] in existing:
            tool["url"] = existing[tool["name"]]["url"]
    return tools


def build_reagents() -> list[dict]:
    return [
        {"category": "抗体", "name": "一抗 / 二抗", "brand": "CST / Abcam / Proteintech / Servicebio", "spec": "按靶点与宿主补充", "supplier": "官网、泰坦、源叶、MCE", "note": "记录靶点、货号、批号、稀释比例和保存位置。"},
        {"category": "培养基", "name": "DMEM / RPMI-1640", "brand": "Gibco / BasalMedia / HyClone", "spec": "500 mL", "supplier": "泰坦、源叶、MCE", "note": "标注高糖/低糖、是否含丙酮酸钠。"},
        {"category": "培养基", "name": "胎牛血清 FBS", "brand": "Gibco / ExCell / PAN", "spec": "500 mL", "supplier": "泰坦、源叶", "note": "需记录批号，避免不同批次混用。"},
        {"category": "耗材", "name": "培养皿 / 培养板 / EP 管", "brand": "Corning / NEST / Axygen", "spec": "6 cm、10 cm、6/12/24/96 孔", "supplier": "泰坦、源叶、麦克林", "note": "按无菌、低吸附、离心耐受规格区分。"},
        {"category": "PCR 试剂", "name": "PCR Mix / qPCR Mix", "brand": "Vazyme / Takara / Yeasen", "spec": "2x Mix，按实验补充", "supplier": "泰坦、源叶、MCE", "note": "记录酶类型、荧光染料和适配仪器。"},
        {"category": "PCR 试剂", "name": "Agarose / DNA Marker", "brand": "Biowest / Vazyme / Takara", "spec": "100 g；100 bp / 1 kb Marker", "supplier": "麦克林、源叶、泰坦", "note": "电泳相关试剂建议与 PCR SOP 联动维护。"},
        {"category": "WB 试剂", "name": "RIPA / PMSF / 抑制剂 Cocktail", "brand": "Beyotime / Solarbio / Roche", "spec": "100 mL；按浓度补充", "supplier": "源叶、泰坦、麦克林", "note": "裂解液强弱、抑制剂现配比例需写清。"},
        {"category": "WB 试剂", "name": "BCA / PVDF / ECL", "brand": "Thermo / Bio-Rad / Millipore / Beyotime", "spec": "按包装补充", "supplier": "泰坦、源叶、MCE", "note": "记录膜孔径、曝光体系和有效期。"},
        {"category": "染色与免疫", "name": "多聚甲醛 / DAPI / 封片剂", "brand": "Servicebio / Beyotime / Solarbio", "spec": "4% PFA；按试剂补充", "supplier": "源叶、泰坦、麦克林", "note": "与免疫荧光、免疫组化、HE 染色 SOP 对应。"},
        {"category": "动物实验用品", "name": "STZ / 麻醉剂 / 采血耗材", "brand": "Sigma / Macklin / Servicebio", "spec": "按伦理审批与批次补充", "supplier": "麦克林、源叶、伊诺凯", "note": "动物实验用品需同步伦理编号和安全要求。"},
        {"category": "常规试剂", "name": "PBS / TBST / Tris / SDS", "brand": "Solarbio / Beyotime / Macklin", "spec": "粉末或 10x 储液", "supplier": "麦克林、泰坦、源叶", "note": "建议记录配方、pH、配置日期和负责人。"},
        {"category": "基质与迁移", "name": "Matrigel / Transwell 小室", "brand": "Corning / BD / NEST", "spec": "按孔径和胶浓度补充", "supplier": "泰坦、源叶、MCE", "note": "与 Transwell SOP、细胞侵袭实验条件关联。"},
    ]


def topbar(prefix: str) -> str:
    return f"""    <header class=\"topbar\">
      <a class=\"brand\" href=\"{prefix}index.html\" aria-label=\"返回首页\">
        <span class=\"brand-mark\">XL</span>
        <div>
          <strong>Xu Lab</strong>
          <span>实验 SOP 与科研导航</span>
        </div>
      </a>
      <div class=\"designer\">Designed by ZLZ</div>
      <nav class=\"nav\">
        <a href=\"{prefix}pages/sop.html\">实验 SOP</a>
        <a href=\"{prefix}pages/suppliers.html\">药品供应商</a>
        <a href=\"{prefix}pages/tools.html\">科研工具</a>
        <a href=\"{prefix}pages/reagents.html\">试剂耗材</a>
      </nav>
    </header>
"""


def shell(title: str, body: str, prefix: str = "./", cls: str = "") -> str:
    return f"""<!doctype html>
<html lang=\"zh-CN\">
  <head>
    <meta charset=\"utf-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
    <meta name=\"description\" content=\"Xu Lab 课题组实验 SOP、药品供应商、科研工具与常用耗材导航。\" />
    <meta name=\"theme-color\" content=\"#2f7d66\" />
    <title>{escape(title)} | Xu Lab SOP Hub</title>
    <link rel=\"stylesheet\" href=\"{prefix}styles.css\" />
  </head>
  <body class=\"{cls}\" data-base=\"{prefix.rstrip('/') or '.'}\">
{body}
  </body>
</html>
"""


def write_index() -> None:
    body = f"""{topbar('./')}
    <main class=\"page-enter\">
      <section class=\"landing compact-landing\" id=\"top\">
        <div class=\"landing-copy\">
          <button class=\"quote-chip\" id=\"quoteButton\" type=\"button\" aria-label=\"点击刷新名言\">
            <strong id=\"quoteText\">自信驾驭强大</strong>
          </button>
          <p class=\"eyebrow\">Standard Operating Procedures</p>
          <h1>课题组实验资料库</h1>
          <p>
            将组内规范化 SOP 按实验类型整理，支持快速筛选、关键词检索、PDF 预览和下载；
            常用药品平台整理为可点击入口，减少来回翻找。
          </p>
        </div>
        <div class=\"bubble-field\" aria-label=\"网站核心功能\">
          <a class=\"bubble bubble-main bubble-sop\" href=\"./pages/sop.html\">实验<br />SOP</a>
          <a class=\"bubble bubble-main bubble-buy\" href=\"./pages/suppliers.html\">药品<br />供应商</a>
          <a class=\"bubble bubble-main bubble-tools\" href=\"./pages/tools.html\">科研<br />工具</a>
          <a class=\"bubble bubble-small bubble-reagents\" href=\"./pages/reagents.html\">试剂<br />耗材</a>
        </div>
      </section>

      <section class=\"section tight-section\" id=\"sop\">
        <div class=\"section-head\">
          <div>
            <p class=\"eyebrow\">Experiments</p>
            <h2>实验 SOP</h2>
          </div>
          <div class=\"section-actions\">
            <a class=\"button primary\" href=\"./downloads/all-sop-pdfs.zip\" download>下载全部 SOP</a>
            <a class=\"button ghost\" href=\"./pages/sop.html\">进入 SOP 目录</a>
          </div>
        </div>
        <div class=\"preview-row\" id=\"homeSops\"></div>
      </section>

      <section class=\"section section-muted tight-section\" id=\"buy\">
        <div class=\"section-head\">
          <div>
            <p class=\"eyebrow\">Purchasing</p>
            <h2>药品供应商</h2>
          </div>
          <a class=\"button ghost\" href=\"./pages/suppliers.html\">查看供应商</a>
        </div>
        <div class=\"preview-row\" id=\"homeVendors\"></div>
      </section>

      <section class=\"section tight-section\" id=\"tools\">
        <div class=\"section-head\">
          <div>
            <p class=\"eyebrow\">Research Tools</p>
            <h2>科研工具与数据库</h2>
          </div>
          <a class=\"button ghost\" href=\"./pages/tools.html\">查看全部工具</a>
        </div>
        <div class=\"preview-row\" id=\"homeTools\"></div>
      </section>

      <section class=\"section section-muted tight-section\" id=\"reagents\">
        <div class=\"section-head\">
          <div>
            <p class=\"eyebrow\">Inventory</p>
            <h2>常用试剂与耗材</h2>
          </div>
          <a class=\"button ghost\" href=\"./pages/reagents.html\">查看清单</a>
        </div>
        <div class=\"preview-row\" id=\"homeReagents\"></div>
      </section>
    </main>
    <script src=\"./app.js\"></script>
"""
    write_text(ROOT / "index.html", shell("Xu Lab SOP Hub", body, "./"))


def page_header(kicker: str, title: str, desc: str) -> str:
    return f"""      <section class=\"page-hero\">
        <p class=\"eyebrow\">{escape(kicker)}</p>
        <h1>{escape(title)}</h1>
        <p>{escape(desc)}</p>
      </section>
"""


def write_pages() -> None:
    pages = {
        "sop.html": ("Experiments", "实验 SOP 目录", "按实验类型和标签筛选 SOP，进入页面可预览和下载原始 PDF。", "sop-page-main"),
        "suppliers.html": ("Purchasing", "药品供应商", "常用采购网站集中管理，点击卡片即可打开对应平台。", "supplier-page"),
        "tools.html": ("Research Tools", "科研工具与数据库", "整合文献检索、组学数据、通路富集、图像分析和科研作图入口。", "tool-page"),
        "reagents.html": ("Inventory", "常用试剂与耗材", "按抗体、培养基、PCR、WB、染色、动物实验等类别维护常用物资。", "reagent-page"),
        "updates.html": ("Recent", "最近更新", "集中查看 SOP 最近新增和修改记录，便于追踪资料版本。", "update-page"),
    }
    for filename, (kicker, title, desc, page_type) in pages.items():
        body = topbar("../")
        body += "    <main class=\"page-main page-enter\">\n"
        body += page_header(kicker, title, desc)
        if page_type == "sop-page-main":
            body += """      <section class=\"directory-tools\">
        <label class=\"search wide-search\">
          <span>搜索</span>
          <input id=\"sopSearchInput\" type=\"search\" placeholder=\"输入实验名、作者、标签或关键词\" />
        </label>
        <div class=\"category-tabs\" id=\"categoryTabs\" aria-label=\"SOP 分类\"></div>
        <div class=\"tag-tabs\" id=\"tagTabs\" aria-label=\"SOP 标签\"></div>
        <div class=\"page-actions\">
          <a class=\"button primary\" href=\"../downloads/all-sop-pdfs.zip\" download>下载全部 SOP</a>
        </div>
      </section>
      <section class=\"directory-grid sop-grid\" id=\"sopDirectory\"></section>
"""
        elif page_type == "supplier-page":
            body += "      <section class=\"directory-grid vendor-grid\" id=\"vendorDirectory\"></section>\n"
        elif page_type == "tool-page":
            body += "      <section class=\"directory-grid tool-grid\" id=\"toolDirectory\"></section>\n"
        elif page_type == "reagent-page":
            body += """      <section class=\"table-wrap\">
        <table class=\"inventory-table\">
          <thead>
            <tr>
              <th>类别</th>
              <th>名称</th>
              <th>品牌</th>
              <th>货号 / 规格</th>
              <th>常用供应商</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody id=\"reagentDirectory\"></tbody>
        </table>
      </section>
"""
        elif page_type == "update-page":
            body += "      <section class=\"timeline-list\" id=\"updateDirectory\"></section>\n"
        body += "    </main>\n    <script src=\"../app.js\"></script>\n"
        write_text(PAGES / filename, shell(title, body, "../", page_type))


def write_sop_pages(sops: list[dict]) -> None:
    SOP_PAGES.mkdir(exist_ok=True)
    for i, sop in enumerate(sops, start=1):
        pdf = f"../experiment/{sop['file']}"
        body = f"""{topbar('../')}
    <main class=\"sop-preview-layout page-enter\">
      <a class=\"back-link\" href=\"../pages/sop.html\">返回 SOP 目录</a>
      <header class=\"sop-hero preview-only\">
        <p class=\"eyebrow\">{escape(sop['category'])}</p>
        <h1>{escape(sop['title'])}</h1>
        <p>{escape(sop['desc'])}</p>
        <div class=\"meta\">
          <span class=\"pill\">整理：{escape(sop['author'])}</span>
          <span class=\"pill\">{escape(' / '.join(sop['tags']))}</span>
          <span class=\"pill\">更新：{escape(sop['updateLabel'])}</span>
        </div>
      </header>

      <section class=\"pdf-panel preview-stage\" id=\"pdf-preview\">
        <div class=\"pdf-panel-head\">
          <div>
            <p class=\"eyebrow\">Original PDF</p>
            <h2>PDF 预览</h2>
          </div>
          <div class=\"dialog-actions compact\">
            <a class=\"button ghost\" href=\"{pdf}\" target=\"_blank\" rel=\"noopener\">新窗口打开</a>
            <a class=\"button primary\" href=\"{pdf}\" download>下载 PDF</a>
          </div>
        </div>
        <iframe src=\"{pdf}\" title=\"{escape(sop['title'])} 原始 PDF 预览\"></iframe>
      </section>
    </main>
    <script src=\"../app.js\"></script>
"""
        write_text(SOP_PAGES / f"sop-{i:02d}.html", shell(sop["title"], body, "../", "sop-page"))


def write_app(data: dict) -> None:
    js = f"""const siteData = {json.dumps(data, ensure_ascii=False, indent=2)};

let selectedCategory = "全部";
let selectedTag = "全部";
let searchTerm = "";

function escapeHtml(value) {{
  return String(value).replace(/[&<>"']/g, (char) => ({{
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }}[char]));
}}

function basePath() {{
  return document.body.dataset.base || ".";
}}

function withBase(path) {{
  if (!path || /^https?:|^mailto:|^tel:/.test(path)) return path;
  return `${{basePath()}}/${{path.replace(/^\\.\\//, "")}}`;
}}

function cardLinkAttrs(url) {{
  const isExternal = /^https?:/.test(url);
  return isExternal ? `href="${{url}}" target="_blank" rel="noopener"` : `href="${{withBase(url)}}"`;
}}

function renderTabs() {{
  const tabs = document.querySelector("#categoryTabs");
  if (!tabs) return;
  tabs.innerHTML = siteData.categories.map((category) => {{
    const count = category === "全部" ? siteData.sops.length : siteData.sops.filter((sop) => sop.category === category).length;
    return `<button class="tab" type="button" aria-selected="${{category === selectedCategory}}" data-category="${{escapeHtml(category)}}">${{escapeHtml(category)}} ${{count}}</button>`;
  }}).join("");
}}

function renderTagTabs() {{
  const tabs = document.querySelector("#tagTabs");
  if (!tabs) return;
  const allTags = ["全部", ...new Set(siteData.sops.flatMap((sop) => sop.tags))];
  tabs.innerHTML = allTags.map((tag) => `<button class="tag-tab" type="button" aria-selected="${{tag === selectedTag}}" data-tag="${{escapeHtml(tag)}}"># ${{escapeHtml(tag)}}</button>`).join("");
}}

function filteredSops() {{
  const term = searchTerm.trim().toLowerCase();
  return siteData.sops.filter((sop) => {{
    const inCategory = selectedCategory === "全部" || sop.category === selectedCategory;
    const inTag = selectedTag === "全部" || sop.tags.includes(selectedTag);
    const haystack = `${{sop.title}} ${{sop.author}} ${{sop.category}} ${{sop.file}} ${{sop.tags.join(" ")}}`.toLowerCase();
    return inCategory && inTag && (!term || haystack.includes(term));
  }});
}}

function sopCard(sop) {{
  return `
    <article class="sop-card">
      <div>
        <div class="meta">
          <span class="pill">${{escapeHtml(sop.category)}}</span>
          <span class="pill">${{escapeHtml(sop.author)}}</span>
        </div>
        <h3>${{escapeHtml(sop.title)}}</h3>
        <p>${{escapeHtml(sop.desc)}}</p>
        <div class="tag-line">${{sop.tags.map((tag) => `<span># ${{escapeHtml(tag)}}</span>`).join("")}}</div>
      </div>
      <div class="card-actions">
        <a class="button primary transition-link" href="${{withBase(sop.page)}}">预览 PDF</a>
        <a class="button ghost" href="${{withBase(sop.pdf)}}" target="_blank" rel="noopener">PDF</a>
      </div>
    </article>
  `;
}}

function vendorCard(vendor) {{
  return `
    <a class="vendor-card" href="${{vendor.value}}" target="_blank" rel="noopener">
      <div>
        <div class="meta"><span class="pill">采购网站</span></div>
        <h3>${{escapeHtml(vendor.name)}}</h3>
        <p class="vendor-link">${{escapeHtml(vendor.value)}}</p>
      </div>
      <span class="button primary">打开平台</span>
    </a>
  `;
}}

function toolCard(tool) {{
  return `
    <a class="tool-card" href="${{tool.url}}" target="_blank" rel="noopener">
      <span class="tool-mark">${{escapeHtml(tool.name.slice(0, 2))}}</span>
      <div>
        <span class="tool-kind">${{escapeHtml(tool.category)}}</span>
        <h3>${{escapeHtml(tool.name)}}</h3>
        <p>${{escapeHtml(tool.desc)}}</p>
      </div>
      <span class="tool-url">${{escapeHtml(tool.url)}}</span>
    </a>
  `;
}}

function reagentMiniCard(item) {{
  return `
    <article class="mini-card">
      <span class="pill">${{escapeHtml(item.category)}}</span>
      <h3>${{escapeHtml(item.name)}}</h3>
      <p>${{escapeHtml(item.brand)}}</p>
    </article>
  `;
}}

function quickCard(item) {{
  return `
    <a class="quick-card" ${{cardLinkAttrs(item.url)}}>
      <span class="pill">${{escapeHtml(item.type)}}</span>
      <h3>${{escapeHtml(item.title)}}</h3>
      <p>${{escapeHtml(item.desc)}}</p>
    </a>
  `;
}}

function updateCard(sop) {{
  return `
    <a class="update-card transition-link" href="${{withBase(sop.page)}}">
      <time>${{escapeHtml(sop.updateLabel)}}</time>
      <h3>${{escapeHtml(sop.title)}}</h3>
      <p>${{escapeHtml(sop.category)}} · ${{escapeHtml(sop.tags.join(" / "))}}</p>
    </a>
  `;
}}

function recentSops() {{
  return [...siteData.sops]
    .filter((sop) => sop.updateDate)
    .sort((a, b) => b.updateDate.localeCompare(a.updateDate));
}}

function renderHome() {{
  const sops = document.querySelector("#homeSops");
  if (sops) sops.innerHTML = siteData.sops.filter((sop) => sop.favorite).slice(0, 4).map(sopCard).join("");
  const vendors = document.querySelector("#homeVendors");
  if (vendors) vendors.innerHTML = siteData.vendors.slice(0, 4).map(vendorCard).join("");
  const tools = document.querySelector("#homeTools");
  if (tools) tools.innerHTML = siteData.tools.slice(0, 4).map(toolCard).join("");
  const reagents = document.querySelector("#homeReagents");
  if (reagents) reagents.innerHTML = siteData.reagents.slice(0, 4).map(reagentMiniCard).join("");
}}

function renderSopDirectory() {{
  const grid = document.querySelector("#sopDirectory");
  if (!grid) return;
  const sops = filteredSops();
  grid.innerHTML = sops.length ? sops.map(sopCard).join("") : `<div class="empty">没有找到匹配的 SOP。</div>`;
}}

function renderVendorDirectory() {{
  const grid = document.querySelector("#vendorDirectory");
  if (grid) grid.innerHTML = siteData.vendors.map(vendorCard).join("");
}}

function renderToolDirectory() {{
  const grid = document.querySelector("#toolDirectory");
  if (grid) grid.innerHTML = siteData.tools.map(toolCard).join("");
}}

function renderReagentDirectory() {{
  const body = document.querySelector("#reagentDirectory");
  if (!body) return;
  body.innerHTML = siteData.reagents.map((item) => `
    <tr>
      <td>${{escapeHtml(item.category)}}</td>
      <td>${{escapeHtml(item.name)}}</td>
      <td>${{escapeHtml(item.brand)}}</td>
      <td>${{escapeHtml(item.spec)}}</td>
      <td>${{escapeHtml(item.supplier)}}</td>
      <td>${{escapeHtml(item.note)}}</td>
    </tr>
  `).join("");
}}

function renderUpdateDirectory() {{
  const list = document.querySelector("#updateDirectory");
  if (!list) return;
  list.innerHTML = recentSops().map(updateCard).join("");
}}

function initQuotes() {{
  const button = document.querySelector("#quoteButton");
  const text = document.querySelector("#quoteText");
  if (!button || !text) return;
  const pick = () => {{
    let next = siteData.quotes[Math.floor(Math.random() * siteData.quotes.length)];
    if (siteData.quotes.length > 1) {{
      while (next === text.textContent) next = siteData.quotes[Math.floor(Math.random() * siteData.quotes.length)];
    }}
    text.classList.remove("quote-pop");
    void text.offsetWidth;
    text.textContent = next;
    text.classList.add("quote-pop");
  }};
  button.addEventListener("click", pick);
  pick();
}}

function initTransitions() {{
  document.addEventListener("click", (event) => {{
    const link = event.target.closest("a.transition-link, a.brand, .back-link");
    if (!link || link.target || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || /^https?:/.test(href)) return;
    event.preventDefault();
    document.body.classList.add("page-leave");
    window.setTimeout(() => {{ window.location.href = href; }}, 180);
  }});
}}

document.addEventListener("DOMContentLoaded", () => {{
  renderTabs();
  renderTagTabs();
  renderHome();
  renderSopDirectory();
  renderVendorDirectory();
  renderToolDirectory();
  renderReagentDirectory();
  renderUpdateDirectory();
  initQuotes();
  initTransitions();

  const categoryTabs = document.querySelector("#categoryTabs");
  if (categoryTabs) categoryTabs.addEventListener("click", (event) => {{
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    selectedCategory = button.dataset.category;
    renderTabs();
    renderSopDirectory();
  }});

  const tagTabs = document.querySelector("#tagTabs");
  if (tagTabs) tagTabs.addEventListener("click", (event) => {{
    const button = event.target.closest("button[data-tag]");
    if (!button) return;
    selectedTag = button.dataset.tag;
    renderTagTabs();
    renderSopDirectory();
  }});

  const search = document.querySelector("#sopSearchInput");
  if (search) search.addEventListener("input", (event) => {{
    searchTerm = event.target.value;
    renderSopDirectory();
  }});
}});
"""
    write_text(ROOT / "app.js", js)


def write_styles() -> None:
    css = r""":root {
  color-scheme: light;
  --bg: #f7f8f5;
  --surface: #ffffff;
  --surface-soft: #eef3ec;
  --ink: #17211d;
  --muted: #627169;
  --line: #dce4dc;
  --accent: #2f7d66;
  --accent-strong: #155b49;
  --gold: #b5822b;
  --shadow: 0 18px 50px rgba(28, 42, 36, 0.1);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  font-family: Inter, "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", Arial, sans-serif;
  letter-spacing: 0;
  animation: pageIn 420ms ease both;
}
body.page-leave { animation: pageOut 180ms ease both; }
a { color: inherit; text-decoration: none; }

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: minmax(180px, 1fr) auto minmax(180px, 1fr);
  align-items: center;
  gap: 24px;
  min-height: 72px;
  padding: 14px clamp(20px, 5vw, 68px);
  border-bottom: 1px solid var(--line);
  background: var(--bg);
}
.brand { display: flex; align-items: center; gap: 12px; width: fit-content; }
.brand-mark {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 8px;
  background: var(--ink);
  color: #fff;
  font-weight: 800;
}
.brand strong, .brand span { display: block; }
.brand span:not(.brand-mark) { color: var(--muted); font-size: 13px; margin-top: 2px; }
.designer { justify-self: center; color: var(--accent-strong); font-size: 14px; font-weight: 700; letter-spacing: 0.05em; }
.nav { display: flex; justify-content: flex-end; gap: 8px; }
.nav a { border-radius: 999px; color: var(--muted); font-size: 14px; padding: 9px 13px; }
.nav a:hover { background: var(--surface-soft); color: var(--accent-strong); }

main { padding: 0 clamp(18px, 5vw, 68px) 48px; }
.landing {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(360px, 1.08fr);
  gap: clamp(28px, 4vw, 58px);
  align-items: center;
  min-height: min(640px, calc(74vh - 72px));
  padding: 22px 0 14px;
}
.landing-copy h1 {
  max-width: 760px;
  margin: 0 0 22px;
  font-size: clamp(42px, 6.2vw, 76px);
  line-height: 1.05;
  letter-spacing: 0;
}
.landing-copy > p:last-child { max-width: 680px; color: var(--muted); font-size: 17px; line-height: 1.8; }
.quote-chip {
  display: inline-flex;
  max-width: min(100%, 640px);
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 28px;
  border: 0;
  border-left: 4px solid rgba(47, 125, 102, 0.45);
  background: var(--surface);
  color: var(--ink);
  cursor: pointer;
  padding: 14px 18px;
  text-align: left;
}
.quote-chip strong {
  font-family: "STKaiti", "KaiTi", "Kaiti SC", "Microsoft YaHei", serif;
  color: var(--accent-strong);
  font-size: clamp(24px, 3vw, 38px);
  font-weight: 800;
  line-height: 1.15;
}
.quote-pop { animation: quotePop 360ms ease both; }

.bubble-field {
  position: relative;
  min-height: 360px;
}
.bubble {
  position: absolute;
  display: grid;
  place-items: center;
  width: var(--size);
  height: var(--size);
  left: var(--x);
  top: var(--y);
  border: 1px solid var(--line);
  border-radius: 50%;
  background: var(--surface);
  box-shadow: var(--shadow);
  color: var(--accent-strong);
  font-size: var(--font);
  font-weight: 800;
  line-height: 1.15;
  text-align: center;
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
  animation: bubbleFloat 5.8s ease-in-out infinite;
  animation-delay: var(--delay);
}
.bubble:hover {
  border-color: rgba(47, 125, 102, 0.55);
  box-shadow: 0 24px 62px rgba(28, 42, 36, 0.16);
  transform: translateY(-8px) scale(1.04);
}
.bubble-main { --size: 188px; --font: clamp(28px, 3.2vw, 42px); }
.bubble-small { --size: 126px; --font: 22px; color: var(--muted); }
.bubble-sop { --x: 4%; --y: 18%; --delay: 0s; }
.bubble-buy { --x: 38%; --y: 4%; --delay: -1.2s; }
.bubble-tools { --x: 62%; --y: 34%; --delay: -2.2s; }
.bubble-reagents { --x: 29%; --y: 58%; --delay: -3s; }

.section { padding: 40px 0; border-top: 1px solid var(--line); }
.tight-section { padding: 34px 0; }
.section-muted {
  margin: 0 calc(clamp(18px, 5vw, 68px) * -1);
  padding-right: clamp(18px, 5vw, 68px);
  padding-left: clamp(18px, 5vw, 68px);
  background: var(--surface-soft);
}
.section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;
}
.section-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
}
.eyebrow {
  margin: 0 0 12px;
  color: var(--accent);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
h1, h2, h3, p { margin-top: 0; }
h2 { margin-bottom: 0; font-size: clamp(28px, 4vw, 44px); line-height: 1.15; }
h3 { margin-bottom: 8px; font-size: 19px; }

.directory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.preview-row {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(240px, 1fr);
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 4px;
  scroll-snap-type: x proximity;
}
.preview-row > * { scroll-snap-align: start; }
.sop-card, .vendor-card, .tool-card, .mini-card, .quick-card, .update-card {
  display: flex;
  min-height: 178px;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  padding: 18px;
  box-shadow: 0 8px 24px rgba(26, 39, 34, 0.04);
  transition: transform 160ms ease, border-color 160ms ease;
}
.sop-card:hover, .vendor-card:hover, .tool-card:hover, .mini-card:hover, .quick-card:hover, .update-card:hover {
  border-color: rgba(47, 125, 102, 0.45);
  transform: translateY(-2px);
}
.meta { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
.pill {
  display: inline-flex;
  border-radius: 999px;
  background: var(--surface-soft);
  color: var(--accent-strong);
  font-size: 12px;
  font-weight: 700;
  padding: 5px 8px;
}
.sop-card p, .vendor-card p, .tool-card p, .mini-card p, .quick-card p, .update-card p {
  color: var(--muted);
  font-size: 15px;
  line-height: 1.7;
}
.tag-line { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; color: var(--accent-strong); font-size: 12px; }
.card-actions, .page-actions, .dialog-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  border: 1px solid var(--line);
  border-radius: 8px;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  padding: 8px 12px;
}
.primary { border-color: var(--accent); background: var(--accent); color: #fff; }
.ghost { background: transparent; color: var(--accent-strong); }
.vendor-link, .tool-url { color: var(--accent-strong); overflow-wrap: anywhere; }
.tool-card { min-height: 220px; }
.tool-mark {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  margin-bottom: 16px;
  border-radius: 8px;
  background: var(--ink);
  color: #fff;
  font-weight: 800;
}
.tool-kind { color: var(--gold); font-size: 12px; font-weight: 800; }
.update-card time { color: var(--gold); font-weight: 800; }

.page-main { width: min(1240px, 100%); margin: 0 auto; padding-top: 34px; }
.page-hero {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  padding: clamp(26px, 5vw, 56px);
  margin-bottom: 24px;
  box-shadow: var(--shadow);
}
.page-hero h1 { margin: 0 0 16px; font-size: clamp(38px, 6vw, 72px); line-height: 1.06; }
.page-hero p:last-child { max-width: 780px; margin: 0; color: var(--muted); font-size: 18px; line-height: 1.75; }
.directory-tools {
  display: grid;
  gap: 14px;
  margin-bottom: 22px;
}
.search {
  display: flex;
  align-items: center;
  gap: 10px;
  width: min(100%, 520px);
  min-height: 48px;
  padding: 0 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}
.wide-search { width: min(100%, 760px); }
.search span { flex: 0 0 auto; color: var(--muted); font-size: 14px; }
.search input { width: 100%; min-width: 0; border: 0; outline: 0; background: transparent; color: var(--ink); font: inherit; }
.category-tabs, .tag-tabs { display: flex; flex-wrap: wrap; gap: 10px; }
.tab, .tag-tab {
  min-height: 38px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  color: var(--muted);
  cursor: pointer;
  font: inherit;
  padding: 7px 13px;
}
.tab[aria-selected="true"], .tag-tab[aria-selected="true"] { border-color: var(--accent); background: var(--accent); color: #fff; }

.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}
.inventory-table { width: 100%; border-collapse: collapse; min-width: 920px; }
.inventory-table th, .inventory-table td {
  border-bottom: 1px solid var(--line);
  padding: 14px 16px;
  text-align: left;
  vertical-align: top;
  line-height: 1.65;
}
.inventory-table th { color: var(--accent-strong); background: var(--surface-soft); font-size: 14px; }
.inventory-table td { color: var(--muted); font-size: 14px; }
.inventory-table tr:last-child td { border-bottom: 0; }
.timeline-list { display: grid; gap: 14px; }

.sop-preview-layout { width: min(1180px, 100%); margin: 0 auto; padding-top: 34px; }
.back-link { display: inline-flex; margin-bottom: 18px; color: var(--accent-strong); font-weight: 700; }
.sop-hero {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  padding: clamp(24px, 5vw, 54px);
  box-shadow: var(--shadow);
}
.sop-hero h1 { margin: 0 0 18px; font-size: clamp(36px, 6vw, 68px); line-height: 1.08; }
.sop-hero p { max-width: 780px; color: var(--muted); font-size: 18px; line-height: 1.85; }
.sop-hero.preview-only { margin: 18px 0 20px; }
.pdf-panel {
  margin-top: 24px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  padding: 18px;
}
.pdf-panel h2 { margin-bottom: 18px; font-size: 28px; }
.pdf-panel-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}
.dialog-actions.compact { margin-top: 0; }
.pdf-panel iframe {
  display: block;
  width: 100%;
  height: min(78vh, 860px);
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface-soft);
}
.empty {
  grid-column: 1 / -1;
  padding: 32px;
  border: 1px dashed var(--line);
  border-radius: 8px;
  color: var(--muted);
  text-align: center;
}

@keyframes pageIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pageOut { to { opacity: 0; transform: translateY(10px); } }
@keyframes quotePop { from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes bubbleFloat {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -12px; }
}

@media (max-width: 1080px) {
  .landing { grid-template-columns: 1fr; min-height: auto; }
  .bubble-field {
    min-height: auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(120px, 1fr));
    gap: 14px;
  }
  .bubble {
    position: relative;
    left: auto;
    top: auto;
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  }
}
@media (max-width: 820px) {
  .topbar { grid-template-columns: 1fr; align-items: start; position: static; }
  .designer { justify-self: start; }
  .nav { justify-content: flex-start; overflow-x: auto; }
  .section-head, .pdf-panel-head { align-items: stretch; flex-direction: column; }
}
@media (max-width: 580px) {
  main { padding-bottom: 32px; }
  .landing-copy h1 { font-size: 40px; }
  .bubble-field, .directory-grid { grid-template-columns: 1fr; }
  .preview-row { grid-auto-columns: minmax(250px, 84vw); }
  .bubble { width: min(100%, 240px); justify-self: center; }
  .card-actions, .page-actions, .dialog-actions { flex-direction: column; }
  .button { width: 100%; }
  .pdf-panel iframe { height: 64vh; }
}
"""
    write_text(ROOT / "styles.css", css)


def write_deploy_doc() -> None:
    text = """# Xu Lab SOP Hub 扩展版部署说明

本文件夹是一个完整的 GitHub Pages 静态站点版本，可直接上传到仓库根目录。

## 上传内容

请上传本目录中的以下内容：

- `index.html`
- `styles.css`
- `app.js`
- `.nojekyll`
- `DEPLOY.md`
- `experiment/`
- `sop-pages/`
- `pages/`
- `downloads/`
- `buy/`

`tools/` 是本地维护脚本目录，上传与否不影响网页运行；如果你希望仓库保留可维护性，可以一起上传。

## GitHub 更新流程

1. 打开你的 GitHub 仓库。
2. 进入 `Code` 页面。
3. 删除旧的网页文件，或直接上传本文件夹内的新文件并选择覆盖。
4. 确保 `experiment/`、`sop-pages/`、`pages/`、`downloads/` 这几个文件夹都在仓库根目录。
5. 提交信息建议写：`Update Xu Lab SOP Hub expanded version`。
6. 进入 `Settings` -> `Pages`，确认仍然是 `Deploy from a branch`，分支为 `main`，目录为 `/root`。
7. 等待 1-3 分钟后刷新 GitHub Pages 链接。

## 发布后检查

- 首页气泡导航是否正常跳转
- SOP 页面分类和标签筛选是否正常
- SOP PDF 预览与下载是否正常
- `downloads/all-sop-pdfs.zip` 是否能下载
- 药品供应商是否能跳转
- 科研工具与数据库链接是否能跳转
- 试剂耗材表格是否能在手机端横向滚动查看
"""
    write_text(ROOT / "DEPLOY.md", text)


def write_download_zip() -> None:
    DOWNLOADS.mkdir(exist_ok=True)
    zip_path = DOWNLOADS / "all-sop-pdfs.zip"
    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for pdf in sorted((ROOT / "experiment").glob("*.pdf")):
            zf.write(pdf, arcname=pdf.name)


def main() -> None:
    previous = load_previous_data()
    sops = enrich_sops(previous["sops"])
    tools = build_tools(previous["tools"])
    reagents = build_reagents()
    favorites = [
        {"type": "SOP", "title": "WB 实验", "desc": "蛋白实验高频入口", "url": next(s["page"] for s in sops if s["title"] == "WB 实验")},
        {"type": "SOP", "title": "PCR / 电泳", "desc": "PCR 仪和电泳仪使用", "url": next(s["page"] for s in sops if s["title"] == "PCR 仪以及电泳仪")},
        {"type": "SOP", "title": "细胞传代", "desc": "细胞房常用流程", "url": next(s["page"] for s in sops if s["title"] == "细胞传代")},
        {"type": "工具", "title": "PubMed", "desc": "文献检索", "url": "https://pubmed.ncbi.nlm.nih.gov/"},
        {"type": "工具", "title": "NCBI", "desc": "综合数据库", "url": "https://www.ncbi.nlm.nih.gov/"},
        {"type": "下载", "title": "全部 SOP", "desc": "一键下载 PDF 压缩包", "url": "./downloads/all-sop-pdfs.zip"},
    ]
    data = {
        "categories": previous["categories"],
        "sops": sops,
        "vendors": previous["vendors"],
        "tools": tools,
        "reagents": reagents,
        "favorites": favorites,
        "quotes": previous["quotes"],
    }
    write_index()
    write_pages()
    write_sop_pages(sops)
    write_app(data)
    write_styles()
    write_deploy_doc()
    write_download_zip()
    write_text(ROOT / ".nojekyll", "GitHub Pages static site marker.\n")


if __name__ == "__main__":
    main()
