"use client";

import { AuthorityBanner } from "@/components/AuthorityBanner";
import { Collapsible } from "@/components/Collapsible";
import { FlowChart } from "@/components/FlowChart";
import { DefenseLayersViz } from "@/components/widgets/DefenseLayersViz";
import { useLang } from "@/lib/i18n";
import Link from "next/link";

const sourceUrl =
  "https://openai.com/index/designing-agents-to-resist-prompt-injection/";

export default function OpenAIAgentsPromptInjectionPage() {
  const { t } = useLang();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {t(
            "OpenAI: Designing AI Agents to Resist Prompt Injection",
            "OpenAI：设计能够抵抗提示注入的 AI 智能体"
          )}
        </h1>
        <p className="text-paper-800/50 dark:text-slate-400">
          Thomas Shadwell, Adrian Spânu &middot; OpenAI Security &middot; 2026
        </p>
      </header>

      <AuthorityBanner
        org="OpenAI"
        orgZh="OpenAI"
        type="Official security article"
        typeZh="官方安全文章"
        sourceLabel="OpenAI source"
        sourceLabelZh="OpenAI 原文"
        sourceUrl={sourceUrl}
        emphasis="This is OpenAI's own product-security framing for agent prompt injection: treat the problem like social engineering plus source-sink control, not merely malicious-string detection."
        emphasisZh="这是 OpenAI 对智能体提示注入的官方产品安全框架：把问题视为社会工程 + source-sink 控制，而不是单纯检测恶意字符串。"
      />

      <article className="paper-content">
        <section className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg p-5 mb-10">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
            核心摘要
          </h3>
          <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed mb-0">
            {t(
              "OpenAI argues that real-world prompt injection against agents is evolving from crude instruction override into social-engineering-style manipulation. The core defense is not just filtering text: agent systems must identify untrusted sources, identify dangerous sinks, and prevent external content from silently causing private-data transmission or consequential tool actions. Safe Url is OpenAI's concrete product pattern for this boundary: show the user what would be sent, ask for confirmation, or block and continue another way.",
              "OpenAI 认为，真实世界的智能体提示注入正在从粗暴的指令覆盖，演化为类似社会工程的上下文操纵。核心防御不只是过滤文本：智能体系统必须识别不可信 source、识别危险 sink，并防止外部内容静默触发私有数据传输或高影响工具动作。Safe Url 是 OpenAI 给出的具体产品模式：展示即将发送的内容、请求用户确认，或阻止并换一种方式继续。"
            )}
          </p>
        </section>

        <FlowChart
          title={t("OpenAI's Model: Social Engineering + Source-Sink Control", "OpenAI 模型：社会工程 + Source-Sink 控制")}
          steps={[
            {
              title: t("Agent reads adversarial outside content", "智能体读取敌对外部内容"),
              subtitle: t("Web, email, retrieved files, third-party text", "网页、邮件、检索文件、第三方文本"),
              color: "rose",
            },
            {
              title: t("Attack becomes contextual persuasion", "攻击变成上下文说服"),
              subtitle: t("False authority, urgency, task framing", "虚假授权、紧迫感、任务包装"),
              color: "amber",
            },
            {
              title: t("Sensitive sink is requested", "请求敏感 sink"),
              subtitle: t("Send data, follow link, interact with tool", "发送数据、访问链接、调用工具"),
              color: "purple",
            },
            {
              title: t("Runtime constrains impact", "运行时限制影响"),
              subtitle: t("Safe Url, consent, block, sandbox", "Safe Url、用户确认、阻止、沙箱"),
              color: "teal",
            },
          ]}
          arrows={[
            t("influences", "影响"),
            t("steers toward", "引向"),
            t("must pass", "必须经过"),
          ]}
          highlights={[
            { text: t("OpenAI official guidance", "OpenAI 官方指南"), color: "blue" },
            { text: t("not just filtering", "不只是过滤"), color: "amber" },
            { text: t("product-level controls", "产品级控制"), color: "teal" },
          ]}
        />

        <h2>{t("1. OpenAI's Key Reframe", "1. OpenAI 的关键重构")}</h2>
        <p>
          {t(
            "OpenAI's article says the strongest prompt-injection attempts increasingly look less like direct command conflicts and more like social engineering. The attacker embeds misleading context in external content and tries to persuade the agent that a dangerous action is legitimate.",
            "OpenAI 这篇文章指出，最有效的提示注入越来越不像直接命令冲突，而更像社会工程。攻击者把误导性上下文嵌入外部内容，试图让智能体相信某个危险动作是合理的。"
          )}
        </p>
        <p>
          {t(
            "This matters because a firewall that only classifies text as malicious or benign is solving the wrong problem. The hard case is contextual deception: deciding whether a request is truthful, authorized, and safe given the whole task.",
            "这很重要，因为只把文本分类成恶意或正常的 firewall 解决错了问题。真正困难的是上下文欺骗：在完整任务背景下判断一个请求是否真实、被授权且安全。"
          )}
        </p>

        <h2>{t("2. Source-Sink Analysis", "2. Source-Sink 分析")}</h2>
        <p>
          {t(
            "OpenAI borrows a classic security idea: an attacker needs a source and a sink. A source is a way to influence the system; a sink is a capability that becomes dangerous in the wrong context. Agent prompt injection is dangerous when untrusted outside content can steer a sensitive sink.",
            "OpenAI 借用了经典安全思路：攻击者需要 source 和 sink。source 是影响系统的入口；sink 是在错误上下文中会变危险的能力。当不可信外部内容能操纵敏感 sink 时，智能体提示注入才真正危险。"
          )}
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-paper-100 dark:bg-slate-800">
                <th className="border border-paper-200 dark:border-slate-700 px-3 py-2 text-left">{t("Term", "术语")}</th>
                <th className="border border-paper-200 dark:border-slate-700 px-3 py-2 text-left">{t("In OpenAI's agent setting", "在 OpenAI 的智能体场景中")}</th>
                <th className="border border-paper-200 dark:border-slate-700 px-3 py-2 text-left">{t("Defensive question", "防御问题")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-paper-200 dark:border-slate-700 px-3 py-2 font-medium">Source</td>
                <td className="border border-paper-200 dark:border-slate-700 px-3 py-2">
                  {t("External content: webpages, emails, documents, retrieved context", "外部内容：网页、邮件、文档、检索上下文")}
                </td>
                <td className="border border-paper-200 dark:border-slate-700 px-3 py-2">
                  {t("Can this content influence the agent, and who controls it?", "这些内容能否影响智能体？由谁控制？")}
                </td>
              </tr>
              <tr>
                <td className="border border-paper-200 dark:border-slate-700 px-3 py-2 font-medium">Sink</td>
                <td className="border border-paper-200 dark:border-slate-700 px-3 py-2">
                  {t("Sending information, following links, interacting with tools, sandboxed app communication", "发送信息、访问链接、工具交互、沙箱应用通信")}
                </td>
                <td className="border border-paper-200 dark:border-slate-700 px-3 py-2">
                  {t("Could this action leak private data or create an external side effect?", "这个动作会不会泄露私有数据或产生外部副作用？")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <DefenseLayersViz />

        <h2>{t("3. Safe Url Is the Concrete Pattern", "3. Safe Url 是具体模式")}</h2>
        <p>
          {t(
            "OpenAI describes Safe Url as a mitigation for cases where information the assistant learned in the conversation would be transmitted to a third party. If the risky flow is detected, the product either shows the user the information that would be transmitted and asks for confirmation, or blocks the attempt and asks the agent to proceed another way.",
            "OpenAI 将 Safe Url 描述为一种缓解机制：当助手在会话中学到的信息可能被传给第三方时，它会介入。如果检测到风险数据流，产品要么向用户展示即将传输的信息并请求确认，要么阻止该尝试并要求智能体换一种方式继续。"
          )}
        </p>
        <p>
          {t(
            "This is the article's most actionable idea. It turns prompt-injection defense from an instruction in the model prompt into a runtime boundary around navigation, bookmarks, searches, sandboxed apps, and external communication.",
            "这是文章中最可执行的思路。它把提示注入防御从模型提示词里的要求，变成围绕导航、书签、搜索、沙箱应用和外部通信的运行时边界。"
          )}
        </p>

        <Collapsible title={t("OpenAI's human-agent analogy", "OpenAI 的人类客服类比")}>
          <p>
            {t(
              "OpenAI compares AI agents to customer support agents: they are meant to act on behalf of someone, but they constantly interact with third parties who may mislead them. In real organizations, the answer is not unlimited trust; deterministic systems limit refunds, flag phishing, and constrain the damage from one compromised agent. AI agents need the same style of product controls.",
              "OpenAI 把 AI 智能体类比为客服人员：它们代表某一方行动，但会持续接触可能误导它们的第三方。在真实组织中，答案不是无限信任；确定性系统会限制退款、标记钓鱼并约束单个被攻陷客服造成的损害。AI 智能体也需要同类产品控制。"
            )}
          </p>
        </Collapsible>

        <h2>{t("4. Builder Takeaways", "4. 构建者启发")}</h2>
        <ul>
          <li>{t("Treat external content as influence, not authority.", "把外部内容视为影响来源，而不是授权来源。")}</li>
          <li>{t("List sensitive sinks explicitly: third-party transmission, navigation, tool calls, data writes, and sandbox communication.", "显式列出敏感 sink：第三方传输、导航、工具调用、数据写入和沙箱通信。")}</li>
          <li>{t("Do not rely only on classifiers or prompt wording; constrain the runtime.", "不要只依赖分类器或提示词措辞；要约束运行时。")}</li>
          <li>{t("When private data may leave the session, ask the user to confirm the exact data flow.", "当私有数据可能离开会话时，请用户确认具体数据流。")}</li>
        </ul>

        <h2>{t("5. Why This Page Belongs in Our Core Track", "5. 为什么这是本站核心主线")}</h2>
        <p>
          {t(
            "This is the OpenAI node in our authority triad. Anthropic gives the browser-agent robustness perspective; Google/Google DeepMind's CaMeL gives a system-design paper; OpenAI gives the product-security pattern for deployed agents.",
            "这是本站权威三角中的 OpenAI 节点。Anthropic 提供浏览器智能体鲁棒性视角；Google/Google DeepMind 的 CaMeL 提供系统设计论文；OpenAI 则给出已部署智能体的产品安全模式。"
          )}
        </p>

        <h2>{t("Resources", "补充资源")}</h2>
        <ul>
          <li><a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{t("OpenAI official article", "OpenAI 官方文章")}</a></li>
          <li><Link href="/papers/anthropic-browser-prompt-injection" className="text-blue-600 dark:text-blue-400 hover:underline">{t("Anthropic browser-agent defense", "Anthropic 浏览器智能体防御")}</Link></li>
          <li><Link href="/papers/camel-defeating-prompt-injections" className="text-blue-600 dark:text-blue-400 hover:underline">{t("Google / Google DeepMind CaMeL paper", "Google / Google DeepMind CaMeL 论文")}</Link></li>
        </ul>
      </article>
    </div>
  );
}
