const data = window.resumeData;
const avatarStorageKey = "html-resume-avatar";

const text = (value) => document.createTextNode(value);

function createElement(tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content !== undefined) element.append(text(content));
  return element;
}

function renderBasics() {
  document.getElementById("candidate-name").textContent = data.basics.name;
  document.getElementById("candidate-target").textContent = data.basics.intent;
  document.getElementById("candidate-summary").textContent = data.basics.summary;

  const info = [
    ["社媒ID", data.basics.socialId],
    ["本科院校", data.basics.undergraduate],
    ["硕士院校", data.basics.graduate],
    ["邮箱", data.basics.email],
    ["手机号码", data.basics.phone],
    ["毕业年份", data.basics.graduationYear],
    ["关键词", data.highlights.join(" / ")]
  ];

  const container = document.getElementById("personal-info");
  info.forEach(([label, value]) => {
    const item = createElement("article", "info-item");
    item.append(createElement("strong", "", label));
    item.append(createElement("span", "", value));
    container.append(item);
  });
}

function setAvatar(source) {
  const avatar = document.getElementById("candidate-avatar");
  const fallback = document.getElementById("avatar-fallback");

  if (!source) {
    avatar.hidden = true;
    avatar.removeAttribute("src");
    fallback.hidden = false;
    return;
  }

  avatar.src = source;
  avatar.hidden = false;
  fallback.hidden = true;
}

function renderAvatar() {
  setAvatar(localStorage.getItem(avatarStorageKey) || data.basics.avatar);
}

function renderInternships() {
  const container = document.querySelector('[data-list="internships"]');

  data.internships.forEach((item) => {
    const article = createElement("article", "timeline-item");
    const header = createElement("header", "item-header");
    const titleWrap = createElement("div");
    titleWrap.append(createElement("h4", "", item.company));
    titleWrap.append(createElement("p", "role", item.role));
    header.append(titleWrap);
    header.append(createElement("time", "", item.period));
    article.append(header);
    article.append(createElement("p", "item-summary", item.summary));

    if (item.achievements.length) {
      const list = createElement("ul", "achievement-list");
      item.achievements.forEach((achievement) => {
        const listItem = createElement("li");
        listItem.append(createElement("strong", "", `${achievement.label}：`));
        listItem.append(text(achievement.text));
        list.append(listItem);
      });
      article.append(list);
    }

    container.append(article);
  });
}

function renderOtherExperience() {
  const container = document.querySelector('[data-list="otherExperience"]');

  data.otherExperience.forEach((item) => {
    const article = createElement("article", "experience-card");
    article.append(createElement("h4", "", item.title));
    article.append(createElement("p", "", item.text));
    if (item.link) {
      const link = createElement("a", "", item.link);
      link.href = item.link;
      link.target = "_blank";
      link.rel = "noreferrer";
      article.append(link);
    }
    container.append(article);
  });
}

function toMarkdown() {
  const lines = [
    `# ${data.basics.name} - ${data.basics.title}`,
    "",
    data.basics.intent,
    "",
    `- 社媒ID：${data.basics.socialId}`,
    `- 本科院校：${data.basics.undergraduate}`,
    `- 硕士院校：${data.basics.graduate}`,
    `- 邮箱：${data.basics.email}`,
    `- 手机号码：${data.basics.phone}`,
    `- 毕业年份：${data.basics.graduationYear}`,
    "",
    "## 核心关键词",
    ...data.highlights.map((item) => `- ${item}`),
    "",
    "## 实习经历"
  ];

  data.internships.forEach((item) => {
    lines.push("", `### ${item.company} - ${item.role}`, `时间：${item.period}`, "", item.summary);
    item.achievements.forEach((achievement) => {
      lines.push(`- **${achievement.label}：**${achievement.text}`);
    });
  });

  lines.push("", "## 其他经历");
  data.otherExperience.forEach((item) => {
    lines.push("", `### ${item.title}`, item.text);
    if (item.link) lines.push(item.link);
  });

  return lines.join("\n");
}

async function copyToClipboard(value, button) {
  await navigator.clipboard.writeText(value);
  const original = button.textContent;
  button.textContent = "已复制";
  setTimeout(() => {
    button.textContent = original;
  }, 1400);
}

function bindActions() {
  document.getElementById("avatar-upload").addEventListener("change", (event) => {
    const [file] = event.currentTarget.files;
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      localStorage.setItem(avatarStorageKey, reader.result);
      setAvatar(reader.result);
    });
    reader.readAsDataURL(file);
  });
  document.querySelector('[data-action="clear-avatar"]').addEventListener("click", () => {
    localStorage.removeItem(avatarStorageKey);
    document.getElementById("avatar-upload").value = "";
    setAvatar("");
  });
  document.querySelector('[data-action="print"]').addEventListener("click", () => window.print());
  document.querySelector('[data-action="copy-markdown"]').addEventListener("click", (event) => {
    copyToClipboard(toMarkdown(), event.currentTarget);
  });
  document.querySelector('[data-action="copy-json"]').addEventListener("click", (event) => {
    copyToClipboard(JSON.stringify(data, null, 2), event.currentTarget);
  });
}

renderBasics();
renderAvatar();
renderInternships();
renderOtherExperience();
bindActions();