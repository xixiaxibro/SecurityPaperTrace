# Review / 检查精读页面

当用户说“review”“检查这个页面”“重新检查”“质量把关”“这篇质量不好”时，使用本流程。

默认采取代码审查 + 内容审查的姿态：先找问题，再决定是否直接修。

## 输入

- paper slug，例如 `openai-agents-prompt-injection`
- 或用户当前浏览器页面
- 可选关注点：事实准确性、中文表达、页面结构、构建错误、UI、来源

## 步骤

1. 读取 `src/app/papers/<slug>/page.tsx`。
2. 读取 `src/lib/papers.ts`，确认 metadata 存在且一致。
3. 如果页面进入 daily，读取 `src/lib/daily.ts`。
4. 打开/读取原始权威来源。
5. 对照原文检查 2-3 个关键技术结论或数字。
6. 搜索常见问题：

```bash
rg -n "TL;DR|reportedly|据报|~[0-9]|claimed|sources say|estimated|speculated|unconfirmed" src/app/papers/<slug>/page.tsx
rg -n "inline|basePath" src/app/papers/<slug>/page.tsx
npm run build
```

7. 如果用户要求修复，或问题明显影响质量，直接修复并重新构建。

## Review 清单

### 事实准确性

- 标题、作者/机构、年份、来源链接正确。
- 所有数字来自原文。
- 没有用第三方总结补技术事实。
- 没有把作者的谨慎表述写成确定结论。
- 没有提供可直接滥用的完整攻击 prompt。

### 页面质量

- `核心摘要` 不是泛泛摘要，而是讲清这篇文章独有贡献。
- 章节顺序符合文章主线。
- 中文不是生硬翻译，能让中文读者直接理解。
- 至少有一个结构化图示或交互解释。
- 结尾说明与 PaperTrace AI Security 主线的关系。

### 代码质量

- 页面使用 `t(en, zh)`。
- Next 内链使用 `<Link>`，不要手写生产 `basePath`。
- `<Math>` 不使用 `inline` prop。
- `npm run build` 通过。

## 输出方式

如果只是 review，先列问题，按严重程度排序。

如果已修复，最终说明：

- 改了哪些文件
- 修复了哪些质量问题
- build 是否通过
- dev server 是否已重启
