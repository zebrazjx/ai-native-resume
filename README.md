# AI Native Resume Skill｜AI 原生 HTML 简历工作流

把 PDF / DOCX 简历转换成 **AI 友好、可编辑、可预览、可导出 A4 PDF** 的 HTML 简历，并支持基于岗位 JD 生成定制化版本。

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
- 可以根据岗位 JD 重排重点、改写摘要和优化经历表达
- 可以输出 JD 匹配报告，说明强匹配、弱匹配和不能编造的缺口
- 支持头像上传
- 支持复制 Markdown / JSON
- 支持导出一页 A4 PDF
- 页面比例严格贴合 A4：`210mm × 297mm`

## 适合谁用

- 想把 PDF 简历 HTML 化的人
- 想让 AI 更容易修改简历的人
- 想针对不同 JD 快速改简历的人
- 想为不同岗位保留多份定制版本的人
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
├── references/
│   └── candidate-material-library.md
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
- `references/candidate-material-library.md`：可选的长期求职素材库说明
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

也可以基于岗位 JD 定制已有 HTML 简历：

```text
这是我的 resume-data.js 和目标岗位 JD，请帮我生成一版更匹配这个 JD 的 HTML 简历，并输出匹配报告。
```

或者：

```text
根据这个 AI 产品经理 JD 定制我的简历，要求不编造经历，保留 A4 一页，并告诉我哪些 JD 要求目前证据不足。
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

如果提供了岗位 JD，Skill 还会：

1. 把 JD 拆成岗位画像、核心职责、必备能力、加分项和隐含考察点
2. 建立 JD 要求与简历证据的匹配矩阵
3. 判断每项要求是强匹配、部分匹配、可迁移、缺失还是不应强写
4. 选择最适合这个 JD 的经历，并说明选用和排除原因
5. 按岗位视角重构同一段项目叙事，比如产品、增长、研发、运营、商业化
6. 调整 `basics.summary`、`highlights`、经历顺序和 bullet 表达
7. 把最相关的证据放到简历前部
8. 保持真实性，不虚构公司、指标、工具、职责或成果
9. 输出 `jd-match-report.md`，说明匹配情况和建议补充的信息

## 根据 JD 定制简历

这个 Skill 现在不仅能把简历 HTML 化，也能基于目标岗位 JD 做定制化改写。

输入：

```text
1. 已有 PDF / DOCX 简历，或已有 HTML 简历项目
2. 目标岗位 JD
3. 可选：目标公司、岗位方向、投递版本要求
```

输出：

```text
1. 针对该 JD 的 HTML 简历
2. 一页 A4 PDF 导出版本
3. JD 匹配报告 jd-match-report.md
4. 被强化的关键词和能力说明
5. 不建议强写或无法证明的能力缺口
```

定制逻辑：

- 先拆 JD，而不是直接改简历
- 建立 JD 要求与简历证据的匹配矩阵
- 把强相关经历前置
- 强化真实存在的经历和成果
- 压缩与 JD 相关性低的内容
- 不做无证据的关键词堆砌
- 不编造公司、指标、工具、职责或成果

适合的使用方式：

```text
这是我的简历和目标 JD，请用 ai-native-resume skill 生成一版定制简历。
要求输出 HTML、A4 PDF，并附上 JD 匹配报告。
```

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

## 根据 JD 定制简历的原则

JD 定制不是简单堆关键词，而是证据驱动的简历重组。

推荐流程：

1. 解析 JD：岗位、职责、能力、关键词、隐含考察点
2. 解析简历：教育、经历、项目、技能、指标、行业经验
3. 建立匹配矩阵：每个 JD 要求都要找到对应证据
4. 制定策略：决定哪些经历前置、哪些 bullet 强化、哪些内容压缩
5. 改写简历：只重写有证据支撑的内容
6. 输出报告：告诉用户强项、弱项、缺口和本次修改内容

真实性规则：

- 不编造经历
- 不虚构指标
- 不把“参与”写成“主导”
- 不把“了解”写成“负责”
- 不把兴趣或观察写成工作经验
- 没有证据的 JD 要求应在报告中提示用户补充

## 可选：个人素材库

如果用户需要长期针对多个岗位定制简历，可以维护一个可复用素材库：

```text
candidate-materials/
├── self-profile.md
├── resume-base.md
└── projects/
    ├── project-a.md
    └── project-b.md
```

它的作用是：

- `self-profile.md` 保存稳定的个人背景、目标岗位、偏好和差异化标签
- `resume-base.md` 保存完整未压缩的全量简历
- `projects/` 每个项目单独存一份，保留背景、行动、结果、原始素材和能力标签

这样每次定制 JD 时，不需要从零改简历，而是从同一个素材库选择最匹配的项目和证据，再生成一份 A4 HTML 简历。

这个模式值得借鉴，但不应强制使用。一次性简历定制直接基于 `resume-data.js` 就够了；只有当用户反复投递多个岗位、素材很多、需要长期版本管理时，再建立素材库。

是否改名：

短期不建议改名。`ai-native-resume` 已经覆盖了核心概念：把简历变成 AI 友好的结构化 HTML，并支持后续 AI 修改。JD 定制是这个工作流的自然下一步，适合放在同一个 Skill 里。

如果未来扩展到 ATS 打分、求职信、面试准备、批量岗位版本、投递策略等完整求职系统，再考虑拆出独立的 `resume-jd-tailor` 或 `career-application-copilot`。

## Built with Verdent

Built with [Verdent](https://www.verdent.ai) — an AI coding agent that handled the full workflow in a single conversation.