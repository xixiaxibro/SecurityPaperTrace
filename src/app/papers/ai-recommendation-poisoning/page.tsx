"use client";

import { Collapsible } from "@/components/Collapsible";
import { FlowChart } from "@/components/FlowChart";
import { AuthorityBanner } from "@/components/AuthorityBanner";
import { RecommendationPoisoningViz } from "@/components/widgets/RecommendationPoisoningViz";
import { useLang } from "@/lib/i18n";
import Link from "next/link";

const sourceUrl =
  "https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/";

export default function AIRecommendationPoisoningPage() {
  const { t } = useLang();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {t(
            "Microsoft: AI Recommendation Poisoning, Manipulating Assistant Memory for Profit",
            "Microsoft：AI 推荐投毒，为了获利操纵助手记忆"
          )}
        </h1>
        <p className="text-paper-800/50 dark:text-slate-400 mb-3">
          {t("Microsoft Defender Security Research Team", "Microsoft Defender 安全研究团队")} &middot;{" "}
          {t("Microsoft Security Blog", "Microsoft 安全博客")} &middot; 2026 &middot;{" "}
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t("source", "原文")}
          </a>
        </p>
        <div className="flex flex-wrap gap-2">
          {["AI Security", "Memory Poisoning", "Prompt Injection", "AI Agents"].map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full dark:bg-blue-500/20 dark:text-blue-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <AuthorityBanner
        org="Microsoft"
        orgZh="Microsoft"
        type="Official security blog"
        typeZh="官方安全博客"
        sourceLabel="Microsoft source"
        sourceLabelZh="Microsoft 原文"
        sourceUrl={sourceUrl}
        emphasis="This is Microsoft Defender's official field analysis of AI Recommendation Poisoning: a memory-poisoning pattern where promotional AI links try to persistently bias assistant recommendations."
        emphasisZh="这是 Microsoft Defender 对 AI 推荐投毒的官方一线分析：推广型 AI 链接试图污染助手记忆，并持续影响未来推荐。"
      />

      <article className="paper-content">
        <section className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg p-5 mb-10">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
            核心摘要
          </h3>
          <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed mb-0">
            {t(
              "Microsoft describes AI Recommendation Poisoning: a promotional memory-poisoning tactic where helpful-looking AI links prefill prompts that try to make assistants remember a company, source, or product as trusted. Microsoft observed 50 distinct attempts from 31 companies across 14 industries over 60 days. The risk is persistent bias: later recommendations can look objective while being shaped by hidden memory changes.",
              "微软披露了 AI 推荐投毒：一种带推广目的的记忆投毒手法，通过看似有用的 AI 链接预填提示词，试图让助手把某家公司、来源或产品记为可信。微软在 60 天内观察到来自 31 家公司、覆盖 14 个行业的 50 个不同尝试。风险在于持久偏置：之后的推荐看似客观，却可能被隐藏的记忆修改塑造。"
            )}
          </p>
        </section>

        <FlowChart
          title={t("From AI Link to Persistent Bias", "从 AI 链接到持久偏置")}
          steps={[
            {
              title: t("Helpful-looking button", "看似有用的按钮"),
              subtitle: t("A 'Summarize with AI' or share link points to an assistant", "“用 AI 总结”或分享链接指向 AI 助手"),
              color: "blue",
            },
            {
              title: t("Pre-filled prompt parameter", "预填提示参数"),
              subtitle: t("The URL carries prompt text through parameters such as query fields", "URL 通过查询字段等参数携带提示文本"),
              color: "amber",
            },
            {
              title: t("Memory-oriented instruction", "面向记忆的指令"),
              subtitle: t("Observed wording asks the assistant to remember a source as trusted or authoritative", "观测到的措辞要求助手把来源记为可信或权威"),
              color: "rose",
            },
            {
              title: t("Persistent recommendation bias", "持久推荐偏置"),
              subtitle: t("Future answers may favor the promoted entity without obvious warning", "未来回答可能在没有明显警告的情况下偏向被推广对象"),
              color: "purple",
            },
            {
              title: t("Detection and memory hygiene", "检测与记忆卫生"),
              subtitle: t("Hunt for suspicious AI URLs and review saved memories", "排查可疑 AI URL，并检查已保存记忆"),
              color: "teal",
            },
          ]}
          arrows={[
            t("click", "点击"),
            t("prefill", "预填"),
            t("persist", "持久化"),
            t("defend", "防御"),
          ]}
          highlights={[
            { text: t("1-click delivery", "一次点击投放"), color: "amber" },
            { text: t("commercial motive", "商业动机"), color: "rose" },
            { text: t("memory as attack surface", "记忆成为攻击面"), color: "purple" },
          ]}
        />

        <h2>{t("1. What Is AI Recommendation Poisoning?", "1. 什么是 AI 推荐投毒？")}</h2>
        <p>
          {t(
            "Microsoft uses the term AI Recommendation Poisoning for promotional techniques that target AI assistants rather than search engines or browsers. The goal is to position a company or source as preferred in future assistant responses by manipulating memory.",
            "微软用 AI Recommendation Poisoning 描述一种推广技术：它不再主要瞄准搜索引擎或浏览器，而是瞄准 AI 助手。目标是通过操纵记忆，让某家公司或来源在未来助手回答中变成优先推荐对象。"
          )}
        </p>
        <p>
          {t(
            "The important shift is persistence. A normal prompt injection may affect one session; memory poisoning tries to leave behind a saved preference that continues to influence future conversations.",
            "关键变化是持久性。普通提示注入可能只影响一次会话；记忆投毒试图留下已保存偏好，持续影响未来对话。"
          )}
        </p>

        <RecommendationPoisoningViz />

        <h2>{t("2. How the Attack Is Delivered", "2. 攻击如何投放")}</h2>
        <p>
          {t(
            "The trend Microsoft observed used clickable AI links, often presented as helpful 'Summarize with AI' buttons. The link opens an AI assistant and pre-populates a prompt through URL parameters. The user sees a convenience feature, but the hidden payload may include memory-oriented instructions.",
            "微软观察到的趋势使用可点击的 AI 链接，常被包装成有用的“用 AI 总结”按钮。链接会打开 AI 助手，并通过 URL 参数预填提示词。用户看到的是便利功能，但隐藏载荷可能包含面向记忆的指令。"
          )}
        </p>

        <Collapsible title={t("Delivery vectors Microsoft lists", "微软列出的投放向量")}>
          <ul>
            <li>
              {t(
                "Malicious links with pre-filled prompts that are parsed by an assistant.",
                "带有预填提示词的恶意链接，由助手解析。"
              )}
            </li>
            <li>
              {t(
                "Embedded prompts hidden in documents, emails, or web pages, described as a form of cross-prompt injection.",
                "隐藏在文档、邮件或网页中的嵌入式提示，属于跨提示注入的一种形式。"
              )}
            </li>
            <li>
              {t(
                "Social engineering where users are tricked into pasting memory-altering prompts.",
                "通过社会工程诱导用户粘贴会修改记忆的提示词。"
              )}
            </li>
          </ul>
        </Collapsible>

        <h2>{t("3. What Microsoft Found in the Wild", "3. 微软在真实环境中发现了什么")}</h2>
        <p>
          {t(
            "Microsoft says it reviewed AI-related URLs observed in email traffic over 60 days and found 50 distinct prompt-based attempts aimed at influencing assistant memory for promotional purposes. These attempts came from 31 companies across 14 industries, including finance, health, legal services, SaaS, marketing agencies, food and recipe sites, and business services.",
            "微软表示，他们在 60 天内审查了邮件流量中观察到的 AI 相关 URL，发现 50 个不同的基于提示词的尝试，目标是为了推广目的影响助手记忆。这些尝试来自 31 家公司，覆盖 14 个行业，包括金融、健康、法律服务、SaaS、营销机构、食品食谱网站和商业服务。"
          )}
        </p>

        <div className="grid sm:grid-cols-3 gap-3 my-6">
          {[
            [t("60 days", "60 天"), t("Observation window", "观察窗口")],
            [t("50 attempts", "50 个尝试"), t("Distinct prompt-based cases", "不同的提示词案例")],
            [t("31 companies", "31 家公司"), t("Across 14 industries", "覆盖 14 个行业")],
          ].map(([metric, label]) => (
            <div
              key={metric}
              className="rounded-lg border border-paper-200 bg-white p-4 text-center dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="text-2xl font-bold text-paper-900 dark:text-slate-100">
                {metric}
              </div>
              <div className="text-xs text-paper-800/50 dark:text-slate-400 mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>

        <h2>{t("4. Common Patterns", "4. 常见模式")}</h2>
        <p>
          {t(
            "The most useful part of the blog is the pattern language. Microsoft reports that every observed case involved real companies rather than obvious scammers, the prompts were packaged behind friendly AI links, and all prompts included persistence wording such as remembering a source for future conversations.",
            "这篇博客最有价值的部分是模式语言。微软报告称，所有观察到的案例都涉及真实公司而非明显诈骗者；提示词被包装在友好的 AI 链接背后；所有提示词都包含持久化措辞，例如要求在未来对话中记住某来源。"
          )}
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-paper-100 dark:bg-slate-800">
                <th className="border border-paper-200 dark:border-slate-700 px-3 py-2 text-left">
                  {t("Pattern", "模式")}
                </th>
                <th className="border border-paper-200 dark:border-slate-700 px-3 py-2 text-left">
                  {t("Why it matters", "为什么重要")}
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Legitimate businesses",
                  "The source may look professional and trustworthy, so users lower their guard.",
                  "真实企业",
                  "来源可能看起来专业可信，用户更容易放松警惕。",
                ],
                [
                  "Deceptive packaging",
                  "A summarization button hides the fact that an assistant may receive extra instructions.",
                  "欺骗性包装",
                  "总结按钮掩盖了助手可能收到额外指令的事实。",
                ],
                [
                  "Persistence wording",
                  "Phrases about future conversations, trusted sources, or citations are meant to outlive one click.",
                  "持久化措辞",
                  "关于未来对话、可信来源或引用的措辞，目标是让影响超出一次点击。",
                ],
                [
                  "Trust amplification",
                  "If a domain is remembered as authoritative, unvetted comments or user content on that domain may inherit undue weight.",
                  "信任放大",
                  "如果某域名被记为权威，其评论区或用户内容也可能获得不应有的权重。",
                ],
              ].map(([enPattern, enWhy, zhPattern, zhWhy]) => (
                <tr key={enPattern}>
                  <td className="border border-paper-200 dark:border-slate-700 px-3 py-2 font-medium">
                    {t(enPattern, zhPattern)}
                  </td>
                  <td className="border border-paper-200 dark:border-slate-700 px-3 py-2">
                    {t(enWhy, zhWhy)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>{t("5. Why This Is More Than SEO", "5. 为什么这不只是 SEO")}</h2>
        <p>
          {t(
            "Microsoft explicitly compares the technique to SEO poisoning and adware. Like SEO poisoning, it manipulates visibility and recommendations. Like adware, it introduces promotional influence without clear user awareness. The difference is the target: the assistant's memory becomes the ranking and recommendation surface.",
            "微软明确将这种技术类比为 SEO 投毒和广告软件。像 SEO 投毒一样，它操纵可见性和推荐；像广告软件一样，它在用户没有清楚意识到的情况下引入推广影响。不同之处在于目标：助手记忆变成了排序和推荐界面。"
          )}
        </p>
        <p>
          {t(
            "That makes the attack subtle. Users may not see a popup or obviously poisoned search result. They may simply receive a confident recommendation days or weeks later.",
            "这让攻击更隐蔽。用户可能看不到弹窗或明显被投毒的搜索结果，只是在数天或数周后收到一个自信的推荐。"
          )}
        </p>

        <h2>{t("6. Detection: What to Hunt For", "6. 检测：应该排查什么")}</h2>
        <p>
          {t(
            "For security teams, Microsoft recommends hunting for URLs that point to AI assistant domains and contain prompt-like query parameters with memory manipulation keywords.",
            "对安全团队，微软建议排查指向 AI 助手域名、且查询参数中包含记忆操纵关键词的 URL。"
          )}
        </p>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-700/60 dark:bg-amber-900/20">
          <h3 className="mt-0 text-base font-semibold text-amber-900 dark:text-amber-100">
            {t("Defensive keyword set", "防御性关键词集合")}
          </h3>
          <p className="mb-0 text-sm text-amber-900/80 dark:text-amber-100/80">
            {t(
              "Microsoft lists memory, trusted, authoritative, future, citation, cite, and remember as useful hunt terms when inspecting AI assistant URLs.",
              "微软列出 memory、trusted、authoritative、future、citation、cite 和 remember，作为检查 AI 助手 URL 时的有用排查词。"
            )}
          </p>
        </div>

        <h2>{t("7. Mitigations", "7. 缓解措施")}</h2>
        <p>
          {t(
            "The blog splits advice between everyday AI users, security teams, and Microsoft AI services. The common theme is memory hygiene plus better separation between user intent, external content, and assistant memory.",
            "博客将建议分给普通 AI 用户、安全团队和 Microsoft AI 服务。共同主题是记忆卫生，以及更好地区分用户意图、外部内容和助手记忆。"
          )}
        </p>
        <ul>
          <li>
            {t(
              "Hover before clicking AI links, especially links that open assistant domains.",
              "点击 AI 链接前先悬停查看，尤其是打开助手域名的链接。"
            )}
          </li>
          <li>
            {t(
              "Treat 'Summarize with AI' buttons as potentially carrying more than a summary request.",
              "把“用 AI 总结”按钮视为可能携带的不只是总结请求。"
            )}
          </li>
          <li>
            {t(
              "Review saved memories, delete suspicious entries, and periodically clear memory after questionable clicks.",
              "检查已保存记忆，删除可疑条目，并在点击可疑链接后定期清理记忆。"
            )}
          </li>
          <li>
            {t(
              "For organizations, hunt across email, Teams, proxy logs, endpoint telemetry, and browser history for suspicious AI assistant links.",
              "对组织来说，应在邮件、Teams、代理日志、终端遥测和浏览器历史中排查可疑 AI 助手链接。"
            )}
          </li>
          <li>
            {t(
              "Microsoft says its AI services use prompt filtering, content separation, memory controls, continuous monitoring, and ongoing AI poisoning research.",
              "微软表示其 AI 服务使用提示过滤、内容分离、记忆控制、持续监控和持续的 AI 投毒防御研究。"
            )}
          </li>
        </ul>

        <h2>{t("8. Relationship to Indirect Prompt Injection", "8. 与间接提示注入的关系")}</h2>
        <p>
          {t(
            "AI Recommendation Poisoning is a narrower, commercialized descendant of indirect prompt injection. The delivery path is familiar: untrusted content crosses into the model's instruction channel. The new twist is the memory target and business incentive.",
            "AI 推荐投毒可以看作间接提示注入的一个更窄、更商业化的后代。投放路径很熟悉：不可信内容跨入模型指令通道。新的变化在于目标变成记忆，并且存在明确商业动机。"
          )}
        </p>
        <p>
          {t(
            "For builders, the lesson is direct: memory writes are security-sensitive actions. They should be transparent, reviewable, attributable, and protected from external content that the user did not explicitly authorize.",
            "对构建者来说，教训很直接：写入记忆是安全敏感动作。它应该透明、可审查、可归因，并防止外部内容在用户未明确授权时影响记忆。"
          )}
        </p>

        <h2>{t("Resources", "补充资源")}</h2>
        <ul>
          <li>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t("Microsoft Security Blog source article", "Microsoft 安全博客原文")}
            </a>
          </li>
          <li>
            <a
              href="https://atlas.mitre.org/techniques/AML.T0080"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t("MITRE ATLAS: Memory Poisoning", "MITRE ATLAS：记忆投毒")}
            </a>
          </li>
          <li>
            <Link
              href="/papers/indirect-prompt-injection"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t("Related SecurityPaperTrace deep dive: Indirect Prompt Injection", "相关 SecurityPaperTrace 精读：间接提示注入")}
            </Link>
          </li>
        </ul>
      </article>
    </div>
  );
}
