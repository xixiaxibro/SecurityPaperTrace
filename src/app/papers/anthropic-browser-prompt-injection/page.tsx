"use client";

import { AuthorityBanner } from "@/components/AuthorityBanner";
import { Collapsible } from "@/components/Collapsible";
import { FlowChart } from "@/components/FlowChart";
import { DefenseLayersViz } from "@/components/widgets/DefenseLayersViz";
import { useLang } from "@/lib/i18n";
import Link from "next/link";

const sourceUrl = "https://www.anthropic.com/research/prompt-injection-defenses?curius=2071";

export default function AnthropicBrowserPromptInjectionPage() {
  const { t } = useLang();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {t(
            "Anthropic: Mitigating Prompt Injection Risk in Browser Use",
            "Anthropic：缓解浏览器使用中的提示注入风险"
          )}
        </h1>
        <p className="text-paper-800/50 dark:text-slate-400">
          Anthropic Product / Research &middot; Claude for Chrome &middot; 2025
        </p>
      </header>

      <AuthorityBanner
        org="Anthropic"
        orgZh="Anthropic"
        type="Official browser-agent security post"
        typeZh="官方浏览器智能体安全文章"
        sourceLabel="Anthropic source"
        sourceLabelZh="Anthropic 原文"
        sourceUrl={sourceUrl}
        emphasis="This is Anthropic's official browser-agent perspective: the web is adversarial, browser agents have broad action space, and prompt-injection defense must combine model training, classifiers, interventions, and red teaming."
        emphasisZh="这是 Anthropic 对浏览器智能体的官方安全视角：Web 是敌对环境，浏览器智能体动作空间很大，提示注入防御必须结合模型训练、分类器、行为干预和红队。"
      />

      <article className="paper-content">
        <section className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg p-5 mb-10">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">核心摘要</h3>
          <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed mb-0">
            {t(
              "Anthropic's article is about browser agents specifically. Their point is that every webpage, embedded document, advertisement, and dynamic script can become an injection source, while a browser agent can navigate, click, fill forms, and download files. Anthropic reports progress with Claude Opus 4.5 and describes a layered defense stack: reinforcement learning for robustness, classifiers over untrusted content, behavior interventions after detection, and scaled expert red teaming. They explicitly state the problem is not solved.",
              "Anthropic 这篇文章专门讨论浏览器智能体。它的核心观点是：每个网页、嵌入文档、广告和动态脚本都可能成为注入来源，而浏览器智能体又能导航、点击、填表和下载文件。Anthropic 报告了 Claude Opus 4.5 在鲁棒性上的进展，并描述了分层防御栈：用强化学习训练鲁棒性、对不可信内容做分类器检测、检测后进行行为干预，以及规模化专家红队。他们也明确表示问题尚未解决。"
            )}
          </p>
        </section>

        <FlowChart
          title={t("Anthropic's Browser-Agent Threat Model", "Anthropic 的浏览器智能体威胁模型")}
          steps={[
            { title: t("Web is adversarial", "Web 是敌对环境"), subtitle: t("Pages, ads, scripts, embedded docs", "页面、广告、脚本、嵌入文档"), color: "rose" },
            { title: t("Agent has real browser actions", "智能体拥有真实浏览器动作"), subtitle: t("Navigate, click, fill forms, download", "导航、点击、填表、下载"), color: "amber" },
            { title: t("Injection can hide in content", "注入可隐藏在内容中"), subtitle: t("White text, images, deceptive UI, dynamic content", "白色文本、图片、欺骗性 UI、动态内容"), color: "purple" },
            { title: t("Layered defense stack", "分层防御栈"), subtitle: t("RL, classifiers, interventions, red team", "RL、分类器、干预、红队"), color: "teal" },
          ]}
          arrows={[t("exposes", "暴露"), t("can be steered by", "可能被引导于"), t("requires", "需要")]}
          highlights={[
            { text: t("Anthropic official", "Anthropic 官方"), color: "blue" },
            { text: t("browser agents", "浏览器智能体"), color: "amber" },
            { text: t("not solved", "尚未解决"), color: "rose" },
          ]}
        />

        <h2>{t("1. Why Browser Use Is Different", "1. 为什么浏览器使用不同")}</h2>
        <p>
          {t(
            "Anthropic distinguishes browser use from ordinary chat. A browser agent does not just read one prompt; it moves through the web, processes arbitrary content, and can interact with pages. That makes the attack surface huge and continuously changing.",
            "Anthropic 将浏览器使用和普通聊天区分开来。浏览器智能体不只是读取一个提示词；它会在 Web 中移动，处理任意内容，并与页面交互。这使攻击面巨大且持续变化。"
          )}
        </p>
        <p>
          {t(
            "The article's email example makes this concrete: hidden instructions inside one message could try to make the agent forward confidential communications before completing the user's legitimate task. The danger is not reading malicious text; it is combining that text with browser and account actions.",
            "文章中的邮件示例让这一点具体化：某封邮件中的隐藏指令可能试图让智能体在完成用户正常任务前转发机密通信。危险不在于读取恶意文本本身，而在于这些文本与浏览器和账户动作结合。"
          )}
        </p>

        <h2>{t("2. Anthropic's Four-Part Defense Stack", "2. Anthropic 的四层防御栈")}</h2>
        <div className="grid gap-3 my-6">
          {[
            [t("Model training", "模型训练"), t("Expose Claude to simulated web prompt injections and reward refusal of malicious instructions.", "让 Claude 在训练中接触模拟网页提示注入，并奖励其拒绝恶意指令。")],
            [t("Classifiers", "分类器"), t("Scan untrusted content entering context for hidden text, manipulated images, and deceptive UI.", "扫描进入上下文的不可信内容，检测隐藏文本、被操纵图片和欺骗性 UI。")],
            [t("Behavior interventions", "行为干预"), t("Adjust model behavior when classifiers detect a likely prompt-injection attempt.", "当分类器检测到疑似提示注入时，调整模型行为。")],
            [t("Expert red teaming", "专家红队"), t("Use human security researchers because they still find creative vectors better than automated systems.", "使用人类安全研究员，因为他们仍比自动系统更擅长发现创造性攻击向量。")],
          ].map(([title, body]) => (
            <div key={title} className="rounded-lg border border-paper-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mt-0 mb-2 text-base font-semibold">{title}</h3>
              <p className="mb-0 text-sm">{body}</p>
            </div>
          ))}
        </div>

        <DefenseLayersViz />

        <h2>{t("3. The Important Caveat", "3. 重要限定")}</h2>
        <p>
          {t(
            "Anthropic says Claude Opus 4.5 is more robust than prior versions in browser use, but they explicitly warn that no browser agent is immune. They describe even a low attack success rate as meaningful risk because browser agents can touch real accounts and data.",
            "Anthropic 表示 Claude Opus 4.5 在浏览器使用中比旧版本更鲁棒，但他们明确提醒：没有浏览器智能体对提示注入免疫。即使攻击成功率很低，只要浏览器智能体能接触真实账户和数据，风险仍然有意义。"
          )}
        </p>

        <Collapsible title={t("How this differs from OpenAI's page", "它和 OpenAI 页面有何不同")}>
          <p>
            {t(
              "OpenAI emphasizes source-sink product controls and user confirmation before dangerous flows. Anthropic emphasizes the browser environment itself: huge attack surface, hidden page content, model robustness training, classifiers, and red-team pressure. They are complementary, not competing, defenses.",
              "OpenAI 强调 source-sink 产品控制，以及危险数据流前的用户确认。Anthropic 强调浏览器环境本身：巨大攻击面、隐藏页面内容、模型鲁棒性训练、分类器和红队压力。它们是互补防御，而不是竞争方案。"
            )}
          </p>
        </Collapsible>

        <h2>{t("Resources", "补充资源")}</h2>
        <ul>
          <li><a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{t("Anthropic official article", "Anthropic 官方文章")}</a></li>
          <li><Link href="/papers/openai-agents-prompt-injection" className="text-blue-600 dark:text-blue-400 hover:underline">{t("OpenAI agent defense framing", "OpenAI 智能体防御框架")}</Link></li>
          <li><Link href="/papers/camel-defeating-prompt-injections" className="text-blue-600 dark:text-blue-400 hover:underline">{t("Google / Google DeepMind CaMeL", "Google / Google DeepMind CaMeL")}</Link></li>
        </ul>
      </article>
    </div>
  );
}
