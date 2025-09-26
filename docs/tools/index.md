# 工具分享

分享一些在开发过程中常用的工具和资源，提高开发效率。

## 开发工具

### 代码编辑器

=== "VS Code"
    
    **推荐插件：**
    
    - **Python**: Python 开发必备
    - **Prettier**: 代码格式化
    - **GitLens**: Git 增强工具
    - **Live Server**: 本地服务器
    - **Thunder Client**: API 测试工具
    
    ```json
    // settings.json 推荐配置
    {
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
            "source.organizeImports": true
        },
        "python.defaultInterpreterPath": "./venv/bin/python"
    }
    ```

=== "JetBrains IDEs"
    
    **推荐 IDE：**
    
    - **PyCharm**: Python 开发
    - **WebStorm**: JavaScript/TypeScript 开发
    - **DataGrip**: 数据库管理
    - **IntelliJ IDEA**: Java 开发

### 版本控制

```bash
# Git 常用命令
git init                    # 初始化仓库
git add .                   # 添加所有文件
git commit -m "提交信息"     # 提交更改
git push origin main        # 推送到远程仓库

# 分支操作
git checkout -b feature/new-feature  # 创建并切换分支
git merge feature/new-feature        # 合并分支
git branch -d feature/new-feature    # 删除分支

# 查看状态和历史
git status                  # 查看状态
git log --oneline          # 查看提交历史
git diff                   # 查看差异
```

## 在线工具

### 代码相关

| 工具名称 | 用途 | 链接 |
|---------|------|------|
| **JSON Formatter** | JSON 格式化和验证 | [jsonformatter.org](https://jsonformatter.org/) |
| **Regex101** | 正则表达式测试 | [regex101.com](https://regex101.com/) |
| **Can I Use** | 浏览器兼容性查询 | [caniuse.com](https://caniuse.com/) |
| **CodePen** | 在线代码编辑器 | [codepen.io](https://codepen.io/) |

### 设计和原型

| 工具名称 | 用途 | 链接 |
|---------|------|------|
| **Figma** | UI/UX 设计 | [figma.com](https://www.figma.com/) |
| **Excalidraw** | 手绘风格图表 | [excalidraw.com](https://excalidraw.com/) |
| **Coolors** | 配色方案生成 | [coolors.co](https://coolors.co/) |
| **Unsplash** | 免费高质量图片 | [unsplash.com](https://unsplash.com/) |

## 命令行工具

### 系统工具

```bash
# 文件操作
ls -la                     # 列出详细文件信息
find . -name "*.py"        # 查找 Python 文件
grep -r "搜索内容" .        # 递归搜索文件内容
du -sh *                   # 查看目录大小

# 进程管理
ps aux                     # 查看所有进程
top                        # 实时查看系统状态
kill -9 PID               # 强制终止进程

# 网络工具
curl -X GET https://api.example.com/data  # HTTP 请求
wget https://example.com/file.zip          # 下载文件
ping google.com                            # 网络连通性测试
```

### 开发工具

```bash
# Python 环境管理
python -m venv venv        # 创建虚拟环境
source venv/bin/activate   # 激活虚拟环境 (Linux/Mac)
venv\Scripts\activate      # 激活虚拟环境 (Windows)
pip freeze > requirements.txt  # 导出依赖

# Node.js 包管理
npm init -y                # 初始化 package.json
npm install package-name   # 安装包
npm run build             # 运行构建脚本
npx create-react-app my-app  # 创建 React 应用

# Docker 容器
docker build -t my-app .   # 构建镜像
docker run -p 3000:3000 my-app  # 运行容器
docker ps                  # 查看运行中的容器
docker logs container-id   # 查看容器日志
```

## 浏览器扩展

### 开发者工具

!!! tip "推荐扩展"
    - **React Developer Tools**: React 调试
    - **Vue.js devtools**: Vue 调试
    - **JSON Viewer**: JSON 格式化显示
    - **Wappalyzer**: 技术栈识别
    - **ColorZilla**: 颜色拾取器

### 效率工具

!!! success "生产力提升"
    - **AdBlock Plus**: 广告拦截
    - **LastPass**: 密码管理
    - **Grammarly**: 英文语法检查
    - **Momentum**: 新标签页美化
    - **OneTab**: 标签页管理

## 学习资源

### 在线教程

- **MDN Web Docs**: Web 技术权威文档
- **freeCodeCamp**: 免费编程课程
- **Coursera**: 在线课程平台
- **YouTube**: 技术视频教程

### 技术社区

- **Stack Overflow**: 编程问答社区
- **GitHub**: 代码托管和协作
- **掘金**: 中文技术社区
- **知乎**: 技术问答和分享

---

*持续更新中，欢迎推荐好用的工具！*