"use client";

import { AuthorityBanner } from "@/components/AuthorityBanner";
import { Collapsible } from "@/components/Collapsible";
import { FlowChart } from "@/components/FlowChart";
import { DefenseLayersViz } from "@/components/widgets/DefenseLayersViz";
import { useLang } from "@/lib/i18n";
import Link from "next/link";

const sourceUrl = "https://arxiv.org/abs/2503.18813";
const codeUrl = "https://github.com/google-research/camel-prompt-injection";

export default function CaMeLPromptInjectionPage() {
  const { t } = useLang();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {t(
            "Google / Google DeepMind: CaMeL, Defeating Prompt Injections by Design",
            "Google / Google DeepMind：CaMeL，通过系统设计击败提示注入"
          )}
        </h1>
        <p className="text-paper-800/50 dark:text-slate-400">
          Debenedetti et al. &middot; Google, Google DeepMind, ETH Zurich &middot; arXiv 2025
        </p>
      </header>

      <AuthorityBanner
        org="Google / Google DeepMind"
        orgZh="Google / Google DeepMind"
        type="Research paper + Google Research artifact"
        typeZh="研究论文 + Google Research 代码"
        sourceLabel="arXiv + code"
        sourceLabelZh="arXiv 与代码"
        sourceUrl={sourceUrl}
        emphasis="This is the Google / Google DeepMind system-design paper in our track. CaMeL does not try to make the model perfectly obedient; it puts a security layer around the model so untrusted data cannot steer control flow or exfiltrate private data through unauthorized tools."
        emphasisZh="这是本站主线中的 Google / Google DeepMind 系统设计论文。CaMeL 不试图让模型完美服从安全规则，而是在模型外构建安全层，使不可信数据不能操纵控制流，也不能通过未授权工具外泄私有数据。"
      />

      <article className="paper-content">
        <section className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg p-5 mb-10">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">核心摘要</h3>
          <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed mb-0">
            {t(
              "CaMeL is the most architectural of the three authoritative defenses. Its premise is blunt: LLM agents will keep seeing untrusted data, and underlying models may remain susceptible to attacks. So CaMeL creates a protective system layer around the LLM, extracts control and data flow from the trusted user query, prevents untrusted retrieved data from changing program flow, and uses capabilities to block private-data exfiltration over unauthorized tool flows. The paper reports 77% task completion with provable security in AgentDojo, compared with 84% for an undefended system.",
              "CaMeL 是这三篇权威防御中最偏系统架构的一篇。它的前提很直接：LLM 智能体会持续接触不可信数据，底层模型也可能继续容易受攻击。因此 CaMeL 在 LLM 外构建保护层，从可信用户查询中抽取控制流和数据流，防止不可信检索数据改变程序流程，并用 capability 阻止私有数据通过未授权工具流外泄。论文报告在 AgentDojo 上以可证明安全完成 77% 任务，而无防御系统为 84%。"
            )}
          </p>
        </section>

        <FlowChart
          title={t("CaMeL's Security Boundary", "CaMeL 的安全边界")}
          steps={[
            { title: t("Trusted user query", "可信用户查询"), subtitle: t("Defines intended program/control flow", "定义预期程序/控制流"), color: "blue" },
            { title: t("Untrusted retrieved data", "不可信检索数据"), subtitle: t("Can be processed only as data", "只能作为数据被处理"), color: "rose" },
            { title: t("Capability-guarded tools", "Capability 保护的工具"), subtitle: t("Policies enforced at tool calls", "在工具调用处执行策略"), color: "purple" },
            { title: t("Provable secure execution", "可证明安全执行"), subtitle: t("No unauthorized exfiltration path", "无未授权外泄路径"), color: "teal" },
          ]}
          arrows={[t("sets", "设定"), t("cannot override", "不能覆盖"), t("enforce", "执行")]}
          highlights={[
            { text: t("Google / Google DeepMind", "Google / Google DeepMind"), color: "blue" },
            { text: t("system layer", "系统层"), color: "purple" },
            { text: t("77% secure task completion", "77% 安全任务完成"), color: "teal" },
          ]}
        />

        <h2>{t("1. Why CaMeL Is Different", "1. CaMeL 为什么不同")}</h2>
        <p>
          {t(
            "Most prompt-injection defenses try to modify model behavior: train the model, prompt the model, or classify malicious input. CaMeL takes a software-security route. It assumes the model might still be fooled, then prevents untrusted data from being able to redirect the program.",
            "多数提示注入防御试图修改模型行为：训练模型、提示模型或分类恶意输入。CaMeL 走的是软件安全路线。它假设模型仍可能被骗，然后阻止不可信数据重定向程序。"
          )}
        </p>
        <p>
          {t(
            "This is why the paper's title says 'by design'. The defense is not a better warning label; it is a different execution architecture.",
            "这就是为什么论文标题说“by design”。这个防御不是更好的警告标签，而是一种不同的执行架构。"
          )}
        </p>

        <h2>{t("2. Control Flow Comes from Trusted Intent", "2. 控制流来自可信意图")}</h2>
        <p>
          {t(
            "CaMeL extracts control and data flows from the trusted user query. After that, external content can fill data slots, but it cannot decide which tools should run or what the program should do next. This directly targets the classic indirect prompt-injection failure mode: data being treated as instruction.",
            "CaMeL 从可信用户查询中抽取控制流和数据流。之后，外部内容可以填充数据槽，但不能决定应该运行哪些工具，也不能决定程序下一步做什么。这直接针对经典间接提示注入失败模式：数据被当成指令。"
          )}
        </p>

        <h2>{t("3. Capabilities Prevent Unauthorized Exfiltration", "3. Capability 防止未授权外泄")}</h2>
        <p>
          {t(
            "The second key idea is capability-based enforcement. Tool calls carry security policies, and private data can only flow through authorized paths. If untrusted content tries to create a new path to send private data elsewhere, the system layer should reject it.",
            "第二个关键思想是基于 capability 的执行。工具调用携带安全策略，私有数据只能沿授权路径流动。如果不可信内容试图创建新路径把私有数据发往别处，系统层应拒绝。"
          )}
        </p>

        <DefenseLayersViz />

        <h2>{t("4. Result and Tradeoff", "4. 结果与权衡")}</h2>
        <p>
          {t(
            "The arXiv v2 abstract reports 77% task completion with provable security in AgentDojo, compared with 84% for an undefended system. The important interpretation is not that CaMeL has no cost; it does have a utility tradeoff. The point is that the tradeoff buys a strong security property that model-only defenses cannot guarantee.",
            "arXiv v2 摘要报告 CaMeL 在 AgentDojo 上以可证明安全完成 77% 任务，而无防御系统完成 84%。重要的解读不是 CaMeL 没有成本；它确实有可用性权衡。关键是这个权衡换来了模型单独防御无法保证的强安全性质。"
          )}
        </p>

        <Collapsible title={t("Why Google Research code matters", "为什么 Google Research 代码重要")}>
          <p>
            {t(
              "The released repository is under google-research/camel-prompt-injection and lists affiliations across Google, Google DeepMind, and ETH Zurich. The README also warns that the implementation is a research artifact, not a supported Google product. That distinction matters: the paper is authoritative research, not a production guarantee.",
              "公开仓库位于 google-research/camel-prompt-injection，并列出 Google、Google DeepMind 与 ETH Zurich 的作者归属。README 同时提醒该实现是研究 artifact，不是受支持的 Google 产品。这个区分很重要：这是一篇权威研究，不是生产保证。"
            )}
          </p>
        </Collapsible>

        <h2>{t("5. How It Completes the Authority Triad", "5. 它如何补全权威三角")}</h2>
        <p>
          {t(
            "OpenAI gives product-security controls for deployed agents. Anthropic gives browser-agent robustness and red-team practice. Google / Google DeepMind's CaMeL gives the strongest system-design answer: separate control from data and enforce capabilities at tool boundaries.",
            "OpenAI 给出已部署智能体的产品安全控制。Anthropic 给出浏览器智能体鲁棒性和红队实践。Google / Google DeepMind 的 CaMeL 给出最强系统设计答案：分离控制与数据，并在工具边界执行 capability。"
          )}
        </p>

        <h2>{t("Resources", "补充资源")}</h2>
        <ul>
          <li><a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{t("arXiv paper", "arXiv 论文")}</a></li>
          <li><a href={codeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{t("Google Research code repository", "Google Research 代码仓库")}</a></li>
          <li><Link href="/papers/openai-agents-prompt-injection" className="text-blue-600 dark:text-blue-400 hover:underline">{t("OpenAI product-security framing", "OpenAI 产品安全框架")}</Link></li>
          <li><Link href="/papers/anthropic-browser-prompt-injection" className="text-blue-600 dark:text-blue-400 hover:underline">{t("Anthropic browser-agent defense", "Anthropic 浏览器智能体防御")}</Link></li>
        </ul>
      </article>
    </div>
  );
}
