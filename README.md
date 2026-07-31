# Xu Lab SOP Hub

Xu Lab 课题组实验资料库：发布实验 SOP、试剂耗材、供应商与科研工具入口。

网站地址：[GitHub Pages](https://cyber-code-peace.github.io/xu-lab-sop-hub-v2/)。这是一个纯静态网站，由 `main` 分支发布。

本地预览：在仓库根目录运行 `python -m http.server 8000`，再访问 `http://localhost:8000/`。

更新 SOP 时：将正式 PDF 放入 `experiment/`；同步更新 `downloads/all-sop-pdfs.zip`，确保其仅包含当前 `experiment/` 中的 PDF；校验所有内部链接及 Linux 大小写；本地 HTTP 验证通过后提交。发布前先保留对应的 `backup/pre-site-refresh-*` 回滚分支。
