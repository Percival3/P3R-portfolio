# 个人信息与站点素材维护速查

这份文档是“以后自己改站点”时最快的入口。

如果你只想知道“某段文字、某张图、某个链接在哪改”，先看这里。

## 1. 首页相关

文件：`src/pages/[lang]/index.astro`

### 1.1 首页全部文案

在 `homeCopy` 对象中维护：

- 首页标题
- 首页简介
- 标签
- 按钮文案
- manifesto 文案
- 右侧卡片文案
- 首页底部状态栏文案
- 三种语言版本

### 1.2 首页开场动画

同文件中的：

- `bootLines`

如果只是改打字内容，改这里即可。

如果要改播放逻辑，再看：

- `src/components/HomeBootSequence.tsx`

### 1.3 首页头像与静态图

当前引用文件：

- 头像：`public/avatar-placeholder.svg`
- favicon：`public/template-mark.svg`

最省事的方式是直接替换同名文件。

### 1.4 首页社媒 / 联系方式

同文件中直接维护：

- GitHub 链接
- 邮箱 `mailto`

## 2. 关于页相关

文件：`src/pages/[lang]/about/index.astro`

### 2.1 个人资料文案

在 `translations` 对象中维护：

- 姓名
- 身份
- 学校
- 地点
- 简介
- 长说明
- 分区标题
- 按钮文案
- 三种语言版本

### 2.2 联系渠道

在 `contactPlatforms` 中维护：

- 图标 slug
- 外链 URL
- 各语言标签

说明：

- 图标外观已经是全局组件，不要在页面里单独改颜色和背景
- 页面层只需要提供内容数据：链接和图标名

### 2.3 邮箱和第二按钮链接

同文件中维护：

- `mailto:...`
- `secondaryLink`

默认模板把第二按钮做成了外链，不再依赖 `public/` 下的 PDF 文件。

### 2.4 友情链接

在 `resourceLinks` 中维护：

- 名称
- URL

## 3. 背景与视觉素材

文件：

- `src/pages/[lang]/index.astro`
- `src/layouts/P3RLayout.astro`
- `src/components/ForestPresence.astro`

原则：

- 首页入口构图优先在 `index.astro` 调
- 栏目页 / 详情页的统一壳优先在 `P3RLayout.astro` 调
- 森林氛围层优先在 `ForestPresence.astro` 调
- 多页共用的颜色 token 再进 `src/styles/global.css`

## 4. 导航、品牌信息

### 4.1 首页入口导航

文件：`src/pages/[lang]/index.astro`

可改内容：

- 首页菜单项名称
- 顶部轮播语句
- 开场文案

### 4.2 内容页导航

文件：`src/layouts/P3RLayout.astro`

可改内容：

- 栏目导航名称
- 返回入口
- 详情页“林隙 / 夜林”切换

## 5. 全局样式维护原则

文件：`src/styles/global.css`

这里统一维护：

- 白天 / 夜间主题 token
- 文本颜色
- 卡片背景
- chip 风格
- 主按钮风格
- `icon-button` 风格

维护规则：

1. 全局已经有的按钮、卡片、图标按钮，不要在单页重复写颜色、背景、阴影
2. 页面层只允许改布局、顺序、尺寸、间距
3. 如果出现新的可复用组件，先提升到 `global.css`

## 6. 内容发布位置

内容本体不在首页 / 关于页里，而在内容集合目录中：

- 博客：`src/content/posts/`
- 学术：`src/content/research/`
- 创作：`src/content/creatives/`

详见：

- `HOW_TO_POST.md`
- `BLOG_SYSTEM_SUMMARY.md`

## 7. 修改后的检查清单

1. `npm run build`
2. 首页白天 / 夜间检查
3. 关于页白天 / 夜间检查
4. 移动端检查
5. 社媒链接、邮箱、CV 是否可打开
6. 三种语言是否至少能正常打开

## 8. 推荐维护顺序

如果以后要整体更新个人站内容，建议顺序如下：

1. 先换头像和背景图
2. 再改首页 `homeCopy`
3. 再改关于页 `translations`
4. 再改社媒链接、CV、友情链接
5. 最后检查 `global.css` 是否真的需要改

如果只是改文字，不要顺手动全局视觉 token。
