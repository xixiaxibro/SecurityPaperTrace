# 加入论文 / 文章 Metadata

当用户说“加入这篇论文”“加入这篇文章”“Add this paper to PaperTrace”时，使用本流程。

这个文件不是可执行命令，而是 Codex 的工作流说明。用户通常会给 arXiv、官方博客、官方报告或 model card 链接。

## 目标

把一篇权威 AI security 论文或官方文章加入 PaperTrace 的数据层。若用户还要求“做成精读”，继续执行
`deep-dive.md`。

## 需要的信息

优先从用户给的链接和官方来源中推断：

- 标题
- 作者/机构
- 年份
- 来源类型：arXiv、OpenAI Blog、Anthropic Research、Microsoft Security Blog 等
- 官方 URL
- URL-safe slug，例如 `openai-agents-prompt-injection`
- 归属分区：当前默认放入 `src/lib/papers.ts` 的 `AI Security`

如果 slug 或分区明显可判断，不要打断用户询问。

## 来源规则

- 只使用权威来源：论文、arXiv、官方博客、官方报告、官方 model card、标准组织文档。
- `description`、`why`、`whyZh` 中的数字必须来自原文。
- 非 arXiv 内容在 daily 中使用 `arxivId: ""` + `paperUrl`。
- 不要从第三方博客、社媒或搜索摘要中补事实。

## 操作步骤

1. 打开/抓取官方来源，确认标题、日期、作者/机构、核心贡献。
2. 在 `src/lib/papers.ts` 的 `AI Security` 分区加入 metadata：

```ts
{
  slug: "<slug>",
  title: "<官方英文标题>",
  authors: "<作者或机构>",
  year: <year>,
  venue: "<arXiv / OpenAI Blog / Anthropic Research / ...>",
  tags: ["AI Security", "Prompt Injection"],
  description: "<2-3 句，基于官方来源>",
  arxiv: "<官方 URL>",
}
```

3. 如果用户要求更新 daily，在 `src/lib/daily.ts` 的 `dailyPapers` 顶部加入：

```ts
{
  date: "YYYY-MM-DD",
  title: "<英文标题>",
  titleZh: "<中文标题>",
  authors: "<作者或机构>",
  arxivId: "<arXiv ID；非 arXiv 则为空字符串>",
  paperUrl: "<非 arXiv 官方 URL>",
  tags: ["AI Security", "Prompt Injection"],
  why: "<英文一句话，基于来源>",
  whyZh: "<中文一句话，基于来源>",
  pick: true,
  slug: "<slug>",
}
```

4. 确保 tag 属于当前安全主线，例如：

```text
AI Security
Prompt Injection
Indirect Prompt Injection
Memory Poisoning
LLM Agents
Browser Agents
Defense Architecture
Agent Security
```

5. 运行 `npm run build`。

## 检查项

- 原始旧 ML 内容不删除。
- 新增内容能在首页 AI Security 分区或 `/daily` 展示。
- `slug` 指向真实存在的页面，或者明确只是 metadata。
- 数字和强结论都能追溯到官方来源。
