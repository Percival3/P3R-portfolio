# 博客与内容系统总览（当前实现）

本文档记录当前仓库里真实在运行的内容系统，以及站点层数据和内容层数据分别在哪里维护。

## 1. 内容集合

当前有三个 Astro Content Collection：

- `posts`
- `research`
- `creatives`

对应目录：

- `src/content/posts/`
- `src/content/research/`
- `src/content/creatives/`

支持文件类型：

- `.md`
- `.mdx`

Schema 定义文件：

- `src/content/config.ts`

## 2. 路由结构

支持语言：

- `zh`
- `en`
- `ja`

当前路由：

- `/` -> 重定向到 `/zh/`
- `/{lang}/`
- `/{lang}/about`
- `/{lang}/blog`
- `/{lang}/blog/{slug}`
- `/{lang}/research`
- `/{lang}/research/{slug}`
- `/{lang}/gallery`
- `/{lang}/gallery/{slug}`

## 3. Schema 字段

### 3.1 全集合通用字段

- `title`
- `pubDate`
- `description`
- `author`
- `tags`
- `heroImage`
- `draft`
- `lang`
- `featured`

### 3.2 `research` 额外字段

- `type`
- `doi`
- `venue`
- `datasetUrl`
- `pdfUrl`

### 3.3 `creatives` 额外字段

- `techStack`
- `previewImage`
- `demoUrl`
- `category`

## 4. 内容渲染行为

### 4.1 列表页

列表页通用流程：

1. `getCollection(...)`
2. 过滤 `draft`
3. 按 `pubDate` 倒序
4. 渲染卡片或列表

### 4.2 详情页

详情页由 `[...slug].astro` 生成静态路由。

注意：

- 当前详情页构建没有统一排除 `draft`
- 所以 `draft: true` 的内容仍可能生成详情页
- `draft` 目前只是“列表隐藏”，不是严格私密机制

## 5. 页面职责

### 5.1 首页 `src/pages/[lang]/index.astro`

当前首页是一个多语言 dossier 封面页，包含：

- 开场打字动画
- 主标题和摘要
- manifesto
- 引导卡片
- 首页头像
- 两张静态氛围图
- 入口链接
- GitHub / 邮箱

首页不展示内容集合的 latest 列表。

首页的站点级文本维护入口：

- `homeCopy`
- `bootLines`

### 5.2 关于页 `src/pages/[lang]/about/index.astro`

当前关于页负责：

- 个人介绍
- 最新 3 条博客
- 最新 3 条研究
- 最新 3 条创作
- 邮箱和 CV
- 社媒入口
- 友情链接

关于页的站点级文本维护入口：

- `translations`
- `contactPlatforms`
- `resourceLinks`

### 5.3 博客 / 学术 / 作品页

这些页面主要消费内容集合数据，不适合放长期手写个人文案。

如果要改内容本体，请回到 `src/content/*`。

## 6. 站点级数据和内容级数据的边界

这点以后维护时很重要。

### 6.1 站点级数据

放在页面或组件代码里：

- 首页文案
- 关于页文案
- 开场动画文字
- 社媒链接
- 友情链接
- 导航文案
- 页脚文案
- 背景图路径

### 6.2 内容级数据

放在 `src/content/*`：

- 博客正文
- 论文 / 数据集说明
- 创作介绍
- 内容封面图
- tags / description / pubDate 等 frontmatter

## 7. 语言行为

当前行为：

- UI 文案随 `/{lang}/` 路由切换
- 内容条目当前不按 frontmatter `lang` 严格过滤
- 同一条内容通常可以在三个语言前缀下访问

如果以后要做严格语言隔离，需要在列表和详情查询里显式按 `item.data.lang` 过滤。

## 8. 图片与静态资源

站点级静态资源放在：

- `public/`

常见维护项：

- 头像：`public/avatar-placeholder.svg`
- favicon：`public/template-mark.svg`
- 第二按钮链接：在 `about` 页的 `secondaryLink` 中维护

## 9. 部署配置

配置文件：

- `astro.config.mjs`

当前配置：

- `site: process.env.SITE_URL || process.env.URL || 'https://example.com'`
- `base: '/'`

如果未来换域名，只需要改这里的默认站点地址，或在部署环境中设置 `SITE_URL` / `URL`。

## 10. 目前已知限制

- 暂无分页
- 暂无搜索
- `featured` 已定义但未形成统一展示流程
- `lang` 目前不是强过滤条件
- `draft` 不是强私密条件

## 11. 相关文档

- `README.md`
- `PROFILE_UPDATE_SUMMARY.md`
- `HOW_TO_POST.md`
- `DESIGN_STYLE_GUIDE.md`
