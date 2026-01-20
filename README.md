# 金数据开放平台文档

金数据开放平台文档中心，基于 [Docusaurus](https://docusaurus.io/) 构建。

**线上地址**：https://open.jinshuju.net

## 本地开发

```bash
npm install
npm run start
```

访问 http://localhost:3000 查看文档。

## 构建

```bash
npm run build
```

构建产物在 `build` 目录，包含：
- 静态 HTML 文件
- `llms.txt` - AI/LLM 文档索引
- `llms-full.txt` - 完整文档内容

## 部署

推送到 `master` 分支后，GitHub Actions 自动构建并部署到 GitHub Pages。

## 文档结构

```
docs/
├── intro.md              # 首页
├── api_v1/               # API v1 文档
├── webhook/              # Webhook 文档
├── url_params/           # URL 传参文档
├── embedded/             # 表单嵌入文档
├── api_code_alias/       # API CODE 重命名
└── best_practice.md      # 场景案例
```
