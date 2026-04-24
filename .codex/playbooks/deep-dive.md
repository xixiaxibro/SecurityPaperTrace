# 做成精读页面

当用户说“做成精读”“作为精读文章呈现”“写 deep-dive page”“Build deep-dive page”时，使用本流程。

重要：一次只认真处理一篇。用户如果给多篇，优先拆成多轮，或明确说明先处理哪一篇。不要为了速度批量生成低质量页面。

## 基本原则

当前 PaperTrace 是 AI Security 站点。精读页应该服务这条主线：

- 解释攻击面和防御边界
- 抽象出安全模型，例如 source/sink、capability、sandbox、memory boundary
- 给构建者可执行的设计启发

## 必须使用权威来源

每个技术事实必须来自以下来源之一：

1. 论文 PDF / arXiv HTML
2. 官方博客或官方技术报告
3. 官方 model card / README
4. 标准组织文档，例如 OWASP、MITRE
5. 论文中引用的 companion paper

不要用第三方博客、新闻报道、搜索摘要或记忆填充细节。

如果来源打不开，页面中明确写“来源不可访问，以下只保留已确认事实”，不要猜。

## 工作步骤

1. 收集来源：

```text
arXiv: https://arxiv.org/abs/<id>
arXiv HTML: https://arxiv.org/html/<id>
PDF: https://arxiv.org/pdf/<id>
官方博客 / 官方报告 / GitHub repo
用户给出的论文名，去网上查找并下载，在本地阅读pdf
```

2. 精读来源并提取：

- 这篇文章要解决的安全问题
- 威胁模型：攻击者、用户、系统、工具、数据源
- 核心机制或防御架构
- 关键术语：例如 source、sink、capability、memory poisoning
- 原文数字和 benchmark，必须精确
- 局限性和作者谨慎表述
- 与本站已有页面的关系

3. 更新 `src/lib/papers.ts` metadata。

4. 创建 `src/app/papers/<slug>/page.tsx`。

5. 至少加入一个交互式解释或结构化可视化。优先复用：

- `FlowChart`
- `Collapsible`
- `Widget`
- `DefenseLayersViz`
- 现有 `src/components/widgets/*`

必要时新增 `src/components/widgets/<Name>.tsx`。

6. 如用户要求，更新 `src/lib/daily.ts`。

7. 如果原文中有出色的（威胁或防护）架构图，使用原文中的架构图

8. 非常必要时可用image2构造威胁模型

9. review 并验证：

```bash
npm run build
grep -n "reportedly\\|据报\\|~[0-9]\\|claimed\\|sources say\\|is said to\\|believed to\\|estimated\\|speculated\\|unconfirmed" src/app/papers/<slug>/page.tsx
```

## 页面结构建议

除非文章明显需要特殊结构，使用以下骨架：

```tsx
"use client";

import { useLang } from "@/lib/i18n";
import { FlowChart } from "@/components/FlowChart";
import { Collapsible } from "@/components/Collapsible";

export default function Page() {
  const { t } = useLang();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {t("<English title>", "<中文标题>")}
        </h1>
        <p className="text-paper-800/50 dark:text-slate-400">
          <作者/机构> · <年份> · <官方链接>
        </p>
      </header>

      <article className="paper-content">
        <section className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg p-5 mb-10">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
            核心摘要
          </h3>
          <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed mb-0">
            {t("<经过核实的英文摘要>", "<经过核实的中文摘要>")}
          </p>
        </section>

        <FlowChart title={...} steps={[...]} arrows={[...]} highlights={[...]} />

        <h2>{t("1. Problem", "1. 问题")}</h2>
        <h2>{t("2. Threat Model", "2. 威胁模型")}</h2>
        <h2>{t("3. Core Mechanism", "3. 核心机制")}</h2>
        <h2>{t("4. Defensive Takeaways", "4. 防御启发")}</h2>
        <h2>{t("Resources", "补充资源")}</h2>
      </article>
    </div>
  );
}
```

## 内容质量要求

- 中文摘要标题统一用 `核心摘要`，英文用 `TL;DR`。
- 每个强结论都必须能回到原文。
- 不要堆砌泛泛概念，要讲清这篇文章独有的贡献。
- 如果是官方博客，重点提炼其产品/工程防御模式。
- 如果是论文，重点讲威胁模型、方法、实验、局限性。
- 结尾必须写“与本站主线的关系”或“构建者启发”。
