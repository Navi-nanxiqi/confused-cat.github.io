# 技术博客

基于 MkDocs 和 Material 主题构建的现代化技术博客网站。

## 特性

- 🎨 **现代化设计**: 使用 Material Design 风格的主题
- 🌙 **深色模式**: 支持浅色/深色主题切换
- 📱 **响应式布局**: 完美适配各种设备
- 🔍 **全文搜索**: 内置搜索功能
- 📝 **Markdown 支持**: 支持丰富的 Markdown 扩展
- 🎯 **代码高亮**: 支持多种编程语言的语法高亮
- 📊 **图表支持**: 集成 Mermaid 图表库
- 🏷️ **标签系统**: 文章分类和标签管理

## 技术栈

- **MkDocs**: 静态站点生成器
- **Material for MkDocs**: 现代化主题
- **Python**: 运行环境
- **Markdown**: 内容编写格式

## 快速开始

### 环境要求

- Python 3.8+
- pip

### 安装依赖

```bash
pip install -r requirements.txt
```

### 本地开发

```bash
# 启动开发服务器
mkdocs serve

# 访问 http://127.0.0.1:8000
```

### 构建静态文件

```bash
# 构建生产版本
mkdocs build

# 生成的文件在 site/ 目录下
```

## 项目结构

```
tech-blog/
├── docs/                   # 文档源文件
│   ├── index.md           # 首页
│   ├── about.md           # 关于页面
│   ├── python/            # Python 相关文章
│   ├── javascript/        # JavaScript 相关文章
│   ├── database/          # 数据库相关文章
│   ├── tools/             # 工具分享
│   └── stylesheets/       # 自定义样式
├── mkdocs.yml             # MkDocs 配置文件
├── requirements.txt       # Python 依赖
└── README.md             # 项目说明
```

## 配置说明

### 主要配置项

- **site_name**: 网站名称
- **site_description**: 网站描述
- **theme**: 主题配置
- **nav**: 导航结构
- **plugins**: 插件配置
- **markdown_extensions**: Markdown 扩展

### 自定义样式

自定义样式文件位于 `docs/stylesheets/extra.css`，包含：

- 主题色彩调整
- 代码块样式优化
- 响应式设计优化
- 深色模式适配

## 部署

### GitHub Pages

1. 创建 GitHub 仓库
2. 推送代码到仓库
3. 配置 GitHub Actions 自动部署

```yaml
# .github/workflows/ci.yml
name: ci
on:
  push:
    branches:
      - master
      - main
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure Git Credentials
        run: |
          git config user.name github-actions[bot]
          git config user.email 41898282+github-actions[bot]@users.noreply.github.com
      - uses: actions/setup-python@v4
        with:
          python-version: 3.x
      - run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV
      - uses: actions/cache@v3
        with:
          key: mkdocs-material-${{ env.cache_id }}
          path: .cache
          restore-keys: |
            mkdocs-material-
      - run: pip install -r requirements.txt
      - run: mkdocs gh-deploy --force
```

### 其他部署方式

- **Netlify**: 连接 GitHub 仓库自动部署
- **Vercel**: 支持静态站点托管
- **自建服务器**: 使用 nginx 托管静态文件

## 内容管理

### 添加新文章

1. 在相应目录下创建 `.md` 文件
2. 在 `mkdocs.yml` 中更新导航结构
3. 使用 Markdown 语法编写内容

### Markdown 扩展

支持的扩展功能：

- **代码高亮**: 支持行号和代码复制
- **警告框**: info, tip, warning, danger 等
- **标签页**: 内容分组显示
- **任务列表**: 待办事项列表
- **表格**: 增强的表格样式
- **数学公式**: LaTeX 数学公式支持
- **图表**: Mermaid 流程图和图表

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

*Built with ❤️ using MkDocs and Material Theme*