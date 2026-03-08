# P3R portfolio

一个受 P3R UI 气质启发的多语言个人主页模板，基于 Astro v5、React 19、Tailwind CSS v4 构建，适合用来搭建作品集、博客、研究记录或带强视觉风格的个人站。

P3R-inspired multilingual personal website template for portfolios, blogs, research notes, and stylized personal landing pages.

## Preview

- 在线示例 / Live Demo: [percival-cogito.netlify.app](https://percival-cogito.netlify.app)

![P3R portfolio template preview](./sample1.png)

## 这是什么

- 一个可直接部署到 Netlify 的静态网站模板
- 视觉方向受 P3R 风格启发，但不附带任何官方角色、剧情或受版权保护素材
- 内置 `zh / en / ja` 三语言路由
- 首页、内容页、关于页已经带完整视觉骨架
- 内容系统已分成 `posts / research / creatives` 三个集合
- 模板默认已经去除了个人身份信息，适合公开到 GitHub

## 技术栈

- Astro 5
- React 19
- Tailwind CSS 4
- Astro Content Collections
- Netlify 静态部署

## 快速开始

```bash
npm install
cp .env.example .env
npm run dev
```

如果你在 Windows PowerShell 下操作，可以用：

```powershell
Copy-Item .env.example .env
```

常用命令：

```bash
npm run build
npm run preview
```

局域网预览：

```bash
npm run dev:lan
npm run preview:lan
```

默认本地地址通常是 `http://localhost:4321`。

## 作为模板使用

如果你是从 GitHub 使用这个仓库：

1. 点击 `Use this template`
2. 创建你自己的新仓库
3. 克隆到本地后执行 `npm install`
4. 复制 `.env.example` 为 `.env`
5. 按下面的“替换清单”修改成你自己的站点

## 替换清单

公开发布前，优先改这几处：

- 首页文案和导航：`src/pages/[lang]/index.astro`
- 关于页姓名、简介、社媒、资源链接：`src/pages/[lang]/about/index.astro`
- 站点头像占位图：`public/avatar-placeholder.svg`
- 站点 favicon：`public/template-mark.svg`
- 默认站点域名与子路径：`.env`
- 示例文章和作品：`src/content/posts`、`src/content/research`、`src/content/creatives`

## 隐私检查

公开前建议再看一遍这几项：

- `.env` 保持本地使用，不要提交；仓库里只保留 `.env.example`
- 不要把 `.claude/settings.local.json`、编辑器私有设置或部署平台缓存目录提交进仓库
- `src/pages/[lang]/about/index.astro` 里的邮箱、社媒、机构和地点要替换成你愿意公开的信息
- 如果不想公开邮箱，把 `mailto:` 换成表单页、联系页或社媒私信入口
- 你的 Git 提交历史可能仍然包含真实用户名和邮箱；公开模板前建议检查 `git log --format="%an <%ae>"`，必要时重写历史
- GitHub 以后建议使用 no-reply 邮箱提交，避免新的公开 commit 继续暴露真实邮箱

## 文件入口

### 页面

- 首页：`src/pages/[lang]/index.astro`
- 关于页：`src/pages/[lang]/about/index.astro`
- 博客列表：`src/pages/[lang]/blog/index.astro`
- 研究列表：`src/pages/[lang]/research/index.astro`
- 作品列表：`src/pages/[lang]/gallery/index.astro`

### 布局与组件

- 内容页外壳：`src/layouts/P3RLayout.astro`
- 开场动画：`src/components/HomeBootSequence.tsx`
- 语言切换：`src/components/P3RLanguageSwitch.astro`

### 内容系统

- 内容 schema：`src/content/config.ts`
- 博客内容：`src/content/posts`
- 学术内容：`src/content/research`
- 创作内容：`src/content/creatives`

### 样式

- 全局共享样式：`src/styles/global.css`

规则：

- 多页面复用的外观样式放进 `src/styles/global.css`
- 页面专属的布局、尺寸、间距留在页面本地
- 不要让全局共享样式和页面局部覆盖互相打架

## 内容发布

新增内容时，把文件放到对应目录：

- 博客：`src/content/posts/`
- 学术：`src/content/research/`
- 创作：`src/content/creatives/`

详细 frontmatter 和示例见：

- `HOW_TO_POST.md`
- `BLOG_SYSTEM_SUMMARY.md`

## 部署到 Netlify

这个项目已经自带 `netlify.toml`。

默认配置：

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `20`

推荐做法：

- 导入仓库后保留默认 Build command 和 Publish directory
- 在 Netlify 环境变量中设置 `SITE_URL=https://你的正式域名`
- 如果你本地已经写好 `.env`，把同样的值同步到 Netlify 即可

如果不设置，项目会回退到 `process.env.URL`，再回退到 `https://example.com`。

## 部署到 GitHub Pages

这个模板也支持 GitHub Pages。

当前配置方式：

- `SITE_URL` 控制站点正式域名
- `BASE_PATH` 控制仓库子路径
- `astro.config.mjs` 已支持读取这两个环境变量
- 仓库已自带 `.github/workflows/astro.yml`

### 场景 1：用户主页仓库

仓库名如果是 `你的用户名.github.io`，通常用这组配置：

```bash
SITE_URL=https://你的用户名.github.io
BASE_PATH=/
```

### 场景 2：普通仓库页面

仓库名如果是 `my-template-site`，最终地址通常是：

```text
https://你的用户名.github.io/my-template-site/
```

对应配置：

```bash
SITE_URL=https://你的用户名.github.io
BASE_PATH=/my-template-site
```

### 发布步骤

1. 进入 GitHub 仓库 `Settings -> Pages`
2. 在 `Build and deployment` 中把 `Source` 设为 `GitHub Actions`
3. 按你的仓库类型修改 `.env` 中的 `SITE_URL` 和 `BASE_PATH`
4. 直接 push 到 `main` 或 `master`，内置 workflow 会自动构建并发布

如果你发布的是 `yourname.github.io` 这个仓库，把 `BASE_PATH` 设成 `/`。

### 发布前注意

- 如果页面资源路径错乱，优先检查 `BASE_PATH`
- 如果 canonical 或 sitemap 域名不对，优先检查 `SITE_URL`
- GitHub Pages 是静态托管，这个 Astro 项目当前可直接使用

## 发布前检查

至少检查这些：

1. `npm run build` 通过
2. 首页、栏目页、详情页都能打开
3. `zh / en / ja` 三种语言都能访问
4. 移动端宽度下布局正常
5. 头像、favicon、社媒链接、资源链接都已替换成你自己的
6. `git log --format="%an <%ae>"` 不再暴露你不想公开的邮箱

## 项目结构

```text
.
|-- public/
|-- src/
|   |-- components/
|   |-- content/
|   |-- layouts/
|   |-- pages/
|   `-- styles/
|-- astro.config.mjs
|-- netlify.toml
|-- HOW_TO_POST.md
|-- BLOG_SYSTEM_SUMMARY.md
|-- PROFILE_UPDATE_SUMMARY.md
`-- DESIGN_STYLE_GUIDE.md
```

## License

`MIT`，见 `LICENSE`
