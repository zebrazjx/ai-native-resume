# AI Native Resume Skill｜AI 原生 HTML 简历生成器

把 PDF / DOCX 简历转换成 **AI 友好、可编辑、可预览、可导出 A4 PDF** 的 HTML 简历。

在线预览：

https://zebrazjx.github.io/ai-native-resume/

模板预览：

https://zebrazjx.github.io/ai-native-resume/assets/template/index.html

## 这个项目是什么

传统简历通常是 PDF 或 Word，适合人阅读，但不适合 AI 修改、版本管理和针对岗位定制。

这个 Skill 会把一份简历变成一个小型 HTML 项目：

```text
resume-data.js  -> 结构化简历数据，方便 AI 修改
index.html      -> 简历页面
styles.css      -> A4 页面视觉样式
script.js       -> 渲染、复制、头像上传、打印导出
avatar.jpeg     -> 默认头像
```

最终效果：

- 浏览器打开即可预览
- 内容集中在 `resume-data.js`，方便 AI 修改
- 支持头像上传
- 支持复制 Markdown / JSON
- 支持导出一页 A4 PDF
- 页面比例严格贴合 A4：`210mm × 297mm`

## 适合谁用

- 想把 PDF 简历 HTML 化的人
- 想让 AI 更容易修改简历的人
- 想针对不同 JD 快速改简历的人
- 想把简历做成个人主页的人
- 想用 Verdent / Claude Code / Cursor 管理简历的人
- 想做 Resume as Code / AI-native Resume 的开发者

## 仓库结构

```text
.
├── README.md
├── SKILL.md
├── ai-native-resume.skill
├── index.html
└── assets/
    └── template/
        ├── index.html
        ├── resume-data.js
        ├── script.js
        ├── styles.css
        └── avatar.jpeg
```

说明：

- `SKILL.md`：Verdent Skill 的核心说明文件
- `ai-native-resume.skill`：打包后的 Skill 文件，可用于分发
- `index.html`：GitHub Pages 展示页
- `assets/template/`：真正的 HTML 简历模板

## 如何使用：普通用户

### 方法一：直接使用模板

1. 打开模板：

   https://zebrazjx.github.io/ai-native-resume/assets/template/index.html

2. 下载或复制本仓库。

3. 修改：

   ```text
   assets/template/resume-data.js
   ```

4. 用浏览器打开：

   ```text
   assets/template/index.html
   ```

5. 如果要换头像：

   - 可以替换 `assets/template/avatar.jpeg`
   - 也可以在网页左侧点击“上传头像”

6. 如果要导出 PDF：

   - 点击页面左侧“打印 / 导出 PDF”
   - 纸张选择 A4
   - 边距选择“无”
   - 开启“背景图形”
   - 保存为 PDF

### 方法二：让 AI 帮你填充

把你的简历内容发给 AI，然后让它修改 `resume-data.js`。

可以这样说：

```text
请把我的简历内容填充到这个 HTML 简历模板的 resume-data.js 中。
要求保持 A4 一页，内容刚好占满页面，实习经历是重点，不要让字体太小。
```

## 如何使用：Verdent 用户

如果你使用 Verdent，可以安装或引用这个 Skill，然后上传你的 PDF / DOCX 简历，直接说：

```text
帮我把这份简历 HTML 化，填充到 AI Native Resume 模板中，并导出一页 A4 PDF。
```

或者：

```text
把我的简历转成 AI-friendly HTML resume，头像用我上传的照片，要求预览和 PDF 一致。
```

Skill 会做这些事：

1. 读取你的 PDF / DOCX 简历
2. 抽取姓名、教育、联系方式、实习经历、项目经历等信息
3. 复制内置 HTML 模板
4. 填充 `resume-data.js`
5. 根据内容长度自动调整字号、行距、间距和模块占比
6. 打开浏览器预览
7. 检查 A4 页面是否刚好填满
8. 导出或验证 PDF

## 如何安装 Skill

### 方式一：使用 `.skill` 文件

下载仓库中的：

```text
ai-native-resume.skill
```

然后导入到 Verdent 的 Skill 管理中。

### 方式二：手动放到本地 Skills 目录

把整个 `ai-native-resume` 文件夹放到：

```text
~/.verdent/skills/ai-native-resume
```

目录里至少需要包含：

```text
SKILL.md
assets/template/
```

然后在 Verdent 中触发：

```text
把这份简历 HTML 化
```

或：

```text
使用 ai-native-resume skill 处理这份简历
```

## 如何部署到 GitHub Pages

如果你想部署自己的简历页面，可以这样做。

### 第 1 步：复制模板

复制：

```text
assets/template/
```

到你的新仓库根目录。

复制后结构应该类似：

```text
my-resume/
├── index.html
├── resume-data.js
├── script.js
├── styles.css
└── avatar.jpeg
```

### 第 2 步：修改简历数据

编辑：

```text
resume-data.js
```

把里面的示例内容替换成你的真实经历。

### 第 3 步：推送到 GitHub

```bash
git init
git add .
git commit -m "Add AI native resume"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 第 4 步：开启 GitHub Pages

进入 GitHub 仓库：

```text
Settings -> Pages
```

选择：

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

保存后，等待 1-2 分钟。

你的页面会在这里：

```text
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

## 如何导出 PDF

推荐使用 Chrome 或 Edge：

1. 打开 `index.html`
2. 点击“打印 / 导出 PDF”
3. 目标打印机选择“保存为 PDF”
4. 纸张选择 A4
5. 边距选择“无”
6. 开启“背景图形”
7. 保存

注意：

- 如果蓝色横条、浅色背景、边框没有显示，通常是没有开启“背景图形”
- 如果导出成两页，说明内容太多，需要压缩内容或调整样式
- 如果底部贴边，需要增加底部留白或压缩其他区域

## 模板质量标准

这个模板不是简单地把文字塞进网页，而是追求接近真实投递质量。

核心标准：

- A4 比例：`210mm × 297mm`
- PDF 必须是一页
- 内容要刚好填满页面
- 底部要有安全边距
- 不能为了塞内容把字体缩得过小
- 实习 / 工作经历应占最大视觉权重
- 个人信息要紧凑
- 其他经历不要喧宾夺主
- 预览和导出 PDF 应尽量一致
- 头像可以由用户自行上传

建议底部留白：

```text
12px - 45px
```

小于 `8px` 会显得太挤，大于 `60px` 会显得页面没有填满。

## 内容调整建议

如果内容太多：

1. 先压缩文字，不要先缩小字体
2. 每段实习保留 1 句 summary + 2 条 achievement
3. 减少其他经历
4. 压缩个人信息区
5. 最后再微调字号、行距、卡片 padding

如果内容太少：

1. 增加实习经历的行距和字号
2. 增加每段经历的成果描述
3. 适当扩大模块间距
4. 不要单纯放大个人信息区来填空间

## 适配其他岗位

当前模板示例偏 AI 产品经理，但可以改成：

- 产品经理
- AI 产品经理
- 大模型产品经理
- 前端工程师
- 后端工程师
- 算法工程师
- 设计师
- 运营

主要改 `resume-data.js` 即可。

## Built with Verdent

Built with [Verdent](https://www.verdent.ai) — an AI coding agent that handled the full workflow in a single conversation.