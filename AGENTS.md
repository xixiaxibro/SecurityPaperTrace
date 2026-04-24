# SecurityPaperTrace Codex 工作说明

这个仓库由 Codex 协作维护。Codex 不会自动注册仓库里的自定义斜杠命令，所以不要依赖
`/deep-dive`、`/add-paper` 这类命令。用户通常会用中文自然语言发起任务，Codex 应根据语义主动匹配
`.codex/playbooks/` 下的流程文档。

## 当前产品方向

SecurityPaperTrace 已从泛 ML 论文精读站迁移为 **AI Security 精读站**。

当前展示主线：

- Prompt Injection / Indirect Prompt Injection
- Agent Security / Browser Agent Security
- Memory Poisoning / Recommendation Poisoning
- Defense Architecture / Source-Sink / Capability / Sandboxing

历史 ML 内容保留在代码和数据中，但默认不在首页和 `/daily` 展示。

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- KaTeX：`src/components/Math.tsx`
- 中英文：`useLang()` + `t(en, zh)`
- GitHub Pages 静态导出

## 本地命令

```bash
npm install
npm run dev
npm run build
```

开发端口在 `package.json` 中配置，目前是 `3888`。

## 中文触发语义

当用户说这些话时，优先使用对应 playbook：

- “加入这篇论文 / 加入这篇文章 / add this paper”
  - 使用 `.codex/playbooks/add-paper.md`
- “做成精读 / 写精读页 / build deep-dive / 作为精读文章呈现”
  - 使用 `.codex/playbooks/deep-dive.md`
- “review / 检查这个页面 / 重新检查 / 质量把关”
  - 使用 `.codex/playbooks/review-paper.md`
- “更新 daily / 更新安全动态 / update daily”
  - 使用 `.codex/playbooks/update-daily.md`

如果用户一次要求多个动作，例如“加入、做精读、review、更新 daily”，按顺序执行：

1. 读取权威来源
2. 更新 metadata
3. 写 deep-dive 页面
4. 更新 daily
5. review 并 `npm run build`
6. 重启 dev server 并验证路由

## 内容规则

- 面向用户的 React 文案必须用 `t(en, zh)`，除非是专有名词或固定标签。
- 摘要块标题用 `核心摘要`，不要再用 `TL;DR`。
- 不要在 `<Math>` 上使用 `inline` prop；行内数学用默认 `<Math tex="..." />`，块级数学用 `display`。
- Next `<Link href="...">` 不要手动拼 `${basePath}`。
- 技术事实必须来自权威来源：论文 PDF、arXiv HTML、官方博客、官方技术报告、官方 model card、标准组织文档。
- 不要用记忆、第三方博客或搜索摘要填充模型参数、benchmark 数字、架构细节、攻击步骤。
- 如果来源不可访问，页面中明确说明，不要猜。
- AI security 攻击内容要写成防御性分析，避免提供可直接滥用的完整攻击 prompt 或操作步骤。

## 重要文件

- `src/app/page.tsx`：首页展示内容。目前只展示 AI Security 主线。
- `src/lib/papers.ts`：论文/文章 metadata。
- `src/lib/daily.ts`：daily papers 数据。通过 `visibleDailyPapers` 控制展示。
- `src/app/daily/page.tsx`：daily news 仍在页面内，当前通过 security-only filter 控制展示。
- `src/app/papers/<slug>/page.tsx`：精读页面。
- `src/components/widgets/`：交互组件。
- `.codex/playbooks/*.md`：中文工作流说明。
