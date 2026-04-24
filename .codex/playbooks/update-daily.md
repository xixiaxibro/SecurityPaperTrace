# 更新 Daily / 安全动态

当用户说“更新 daily”“更新安全动态”“update daily with this blog/paper”时，使用本流程。

当前 `/daily` 只展示 AI Security 相关内容。旧 ML 内容可以继续保留在数据里，但不要展示。

## 输入

论文或文章：

- 日期
- 标题 / 中文标题
- 作者或机构
- arXiv ID 或官方 URL
- tags
- 英文一句话 why
- 中文一句话 whyZh
- 如果已有精读页，填写 `slug`

行业动态 / 官方博客：

- 日期
- 标题 / 中文标题
- 来源名
- 官方 URL
- 英文摘要
- 中文摘要
- tag: `Research` / `Release` / `Industry`

## 重要现状

- paper feed 数据在 `src/lib/daily.ts`
- news 数据目前仍在 `src/app/daily/page.tsx`
- `visibleDailyPapers` 控制 paper feed 展示
- `securityNewsItems` 控制 news 展示

## 步骤

1. 打开官方来源，确认日期、标题、机构、核心内容。
2. 如果是论文/文章精读项，更新 `src/lib/daily.ts` 的 `dailyPapers` 顶部。
3. 如果是 news，更新 `src/app/daily/page.tsx` 的 `newsItems`，并确保 `securityNewsItems` 会包含它。
4. tags 使用 AI security 主线：

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

5. 运行：

```bash
npm run build
```

6. 如果 dev server 正在跑，build 后重启 dev server 并验证 `/daily`。

## Paper entry 模板

```ts
{
  date: "YYYY-MM-DD",
  title: "<English title>",
  titleZh: "<中文标题>",
  authors: "<作者或机构>",
  arxivId: "<arXiv ID；非 arXiv 为空>",
  paperUrl: "<官方 URL>",
  tags: ["AI Security", "Prompt Injection"],
  why: "<英文一句话，基于来源>",
  whyZh: "<中文一句话，基于来源>",
  pick: true,
  slug: "<已有或新建精读页 slug>",
}
```

## News entry 模板

```ts
{
  date: "YYYY-MM-DD",
  title: "<English headline>",
  titleZh: "<中文标题>",
  description: "<English summary>",
  descriptionZh: "<中文摘要>",
  source: "<Source name>",
  sourceUrl: "<official URL>",
  tag: "Research",
}
```

## 检查项

- `/daily` 不展示非安全内容。
- 不编造数字。
- 如果有 slug，路由必须存在。
- build 通过。
