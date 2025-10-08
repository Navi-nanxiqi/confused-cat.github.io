# 技术博客

这是一个基于 MkDocs 构建的技术博客，用于分享编程经验、技术心得和学习笔记。

## 特性

- 📝 支持 Markdown 写作
- 🌍 多语言支持（中文/英文）
- 🎨 Material Design 主题
- 🔍 全文搜索功能
- 📱 响应式设计
- 🌙 深色模式支持
- 🚀 自动部署到 GitHub Pages

## 🚀 GitHub Pages 部署指南

### 必须的文件和配置

1. **GitHub Actions 工作流文件**：`.github/workflows/deploy.yml`
2. **依赖文件**：`requirements.txt`
3. **配置文件**：`mkdocs.yml`（正确的 site_url 配置）
4. **内容文件**：`docs/` 目录下的 Markdown 文件

### 部署步骤

#### 1. 准备 GitHub 仓库
```bash
# 创建 GitHub 仓库（在 GitHub 网站上操作）
# 仓库名称：tech-blog
# 设置为公开仓库
```

#### 2. 配置本地项目
确保 `mkdocs.yml` 中的配置正确：
```yaml
site_url: https://你的用户名.github.io/tech-blog/
repo_url: https://github.com/你的用户名/tech-blog
```

#### 3. 推送代码到 GitHub
```bash
# 初始化 Git 仓库（如果尚未初始化）
git init

# 添加远程仓库
git remote add origin https://github.com/你的用户名/tech-blog.git

# 添加所有文件
git add .

# 提交更改
git commit -m "初始化技术博客"

# 推送到 GitHub（确保分支名为 main）
git push -u origin main
```

#### 4. 配置 GitHub Pages
1. 进入 GitHub 仓库页面
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**
5. 保存设置

#### 5. 等待自动部署
- 推送代码后，GitHub Actions 会自动运行
- 在仓库的 **Actions** 标签页可以查看部署进度
- 部署完成后，网站将在 `https://你的用户名.github.io/tech-blog/` 可访问

### 🔧 故障排除

#### 常见问题及解决方案

1. **404 错误**
   - 检查 `mkdocs.yml` 中的 `site_url` 是否正确
   - 确认 GitHub Pages 设置为 "GitHub Actions"
   - 验证工作流是否成功运行

2. **工作流失败**
   - 检查 `requirements.txt` 文件是否存在
   - 确认所有依赖版本兼容
   - 查看 Actions 日志获取详细错误信息

3. **样式或功能异常**
   - 检查 `extra.css` 文件路径
   - 验证 Material 主题配置
   - 确认所有插件正确安装

### 📁 必须的文件结构

```
tech-blog/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 工作流
├── docs/
│   ├── index.md               # 首页内容
│   ├── about.md               # 关于页面
│   ├── stylesheets/
│   │   └── extra.css          # 自定义样式
│   └── [其他内容目录]/
├── mkdocs.yml                 # MkDocs 配置文件
├── requirements.txt           # Python 依赖
└── README.md                  # 项目说明
```

## 本地开发

1. 安装依赖：
```bash
pip install -r requirements.txt
```

2. 启动开发服务器：
```bash
mkdocs serve
```

3. 访问 http://127.0.0.1:8000 查看网站

## 构建

```bash
mkdocs build
```

## 目录结构

```
docs/
├── index.md          # 首页
├── about.md          # 关于页面
├── python/           # Python 相关文章
├── javascript/       # JavaScript 相关文章
├── database/         # 数据库相关文章
└── tools/           # 工具分享
```

## 🌐 在线访问

部署成功后，您可以通过以下地址访问博客：
- **主站**：https://你的用户名.github.io/tech-blog/
- **中文版**：https://你的用户名.github.io/tech-blog/zh/
- **英文版**：https://你的用户名.github.io/tech-blog/en/