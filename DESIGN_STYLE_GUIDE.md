# 视觉与交互设计规范（维护版）

这份文档面向以后继续维护站点时使用。

重点不是“设计理念展示”，而是明确：

- 哪些东西必须全局统一
- 哪些东西页面可以自由调整
- 新增样式时应该放哪里

## 1. 设计方向

当前站点采用“双背景语境 + 可读性优先”的策略：

- 白天：暖色、胶片感、偏人文
- 夜晚：冷色、赛博感、偏系统感
- 页面结构：有编排感，但正文始终优先保证可读

## 2. 全局统一规则

这是以后维护时必须遵守的第一原则。

### 2.1 全局负责的内容

文件：`src/styles/global.css`

全局统一负责：

- 白天 / 夜间主题 token
- 文本颜色体系
- 背景和表层颜色体系
- 卡片、chip、按钮、icon-button 等共享组件外观
- 页面间共用的 hover / 阴影 / 边框语言

### 2.2 页面负责的内容

页面文件只负责：

- 内容本身
- 组件顺序
- 布局位置
- 栅格
- 尺寸
- 间距
- 页面专属结构

页面文件不要覆盖全局已经定义好的：

- 文字主色
- 通用按钮底色
- 卡片背景
- icon-button 外观
- 通用 hover 阴影

### 2.3 新需求怎么落地

如果出现一个以后会重复使用的新视觉组件：

1. 先在 `global.css` 里定义 token
2. 再定义组件 class
3. 最后在页面里使用

不要先在页面里做一版，再复制到别的页面。

## 3. 当前主题 token 结构

`src/styles/global.css` 当前主要 token 分组：

### 3.1 文本与排版

- `--adaptive-text-strong`
- `--adaptive-text-body`
- `--adaptive-text-muted`
- `--adaptive-text-soft`
- `--adaptive-link`

### 3.2 页面表层

- `--surface-frame-*`
- `--surface-panel-*`
- `--surface-chip-*`
- `--surface-primary-button-*`

### 3.3 导航

- `--nav-shell-*`
- `--nav-link-*`
- `--nav-indicator-bg`
- `--nav-brand-bg`

### 3.4 图标按钮

- `--icon-button-border`
- `--icon-button-border-hover`
- `--icon-button-bg`
- `--icon-button-text`
- `--icon-button-shadow`
- `--icon-button-shadow-hover`

这些 token 已经分成：

- `:root` 白天
- `html.dark` 夜间

所以如果以后要改风格，优先改 token，而不是改每个页面的具体颜色。

## 4. 当前共享组件样式

`src/styles/global.css` 中已经存在的共享组件包括：

- `.glass-card`
- `.glass-chip`
- `.page-shell`
- `.page-hero`
- `.page-card`
- `.page-empty`
- `.article-prose`
- `.icon-button`
- `.icon-button__glyph`

维护原则：

- 能复用，就不要另起一套页面专属视觉组件
- 页面内仅做尺寸或排布补充

## 5. 页面分工建议

### 5.1 首页

文件：`src/pages/[lang]/index.astro`

首页可以自由调整：

- 文案
- 模块顺序
- 栅格比例
- 图片使用
- 卡片位置

首页不应该自己定义新的通用按钮或颜色体系。

### 5.2 关于页

文件：`src/pages/[lang]/about/index.astro`

关于页可以自由调整：

- 区块顺序
- 联系区、内容聚合区的位置
- 卡片大小
- 间距

关于页中的联系图标按钮已经是全局 `icon-button`，以后不要再在页面里单独定义它的颜色和背景。

### 5.3 内容页

博客、研究、作品列表与详情页优先复用：

- `.page-shell`
- `.page-card`
- `.article-prose`

## 6. P3R 背景系统维护

文件：

- `src/pages/[lang]/index.astro`
- `src/layouts/P3RLayout.astro`
- `src/components/ForestPresence.astro`

### 6.1 调整顺序

建议顺序：

1. 先判断是首页入口还是内容页壳
2. 只改构图时，优先改页面本地样式
3. 只改森林氛围时，优先改 `ForestPresence.astro`
4. 多页复用的 token，再进入 `src/styles/global.css`
5. 最后检查首页、栏目页、详情页和移动端可读性

### 6.2 不建议的做法

- 不要为了单页可读性去页面里写死一堆颜色
- 不要为了某张图单独破坏全局 token 结构

## 7. 图片和静态素材规范

静态资源放：

- `public/`

站点级素材例如：

- `avatar-placeholder.svg`
- `template-mark.svg`
- `cv-*.pdf`

建议：

- 能保留路径就保留路径
- 能替换同名文件就不要改引用

## 8. 维护检查清单

每次改视觉后至少检查：

1. 白天模式是否可读
2. 夜间模式是否可读
3. 首页、关于页、内容详情页是否都没被连带破坏
4. 移动端是否还成立
5. `npm run build` 是否通过

## 9. 当前项目的维护结论

以后如果你要继续改站点，请把下面这条当作默认规则：

“全局统一背景、颜色、共享组件设计；单页只负责内容、布局、尺寸和位置，不覆盖全局已经存在的外观定义。”
