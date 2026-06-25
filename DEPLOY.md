# Xu Lab SOP Hub 扩展版部署说明

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
