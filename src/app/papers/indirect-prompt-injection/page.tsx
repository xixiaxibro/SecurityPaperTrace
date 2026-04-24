"use client";

import { Collapsible } from "@/components/Collapsible";
import { FlowChart } from "@/components/FlowChart";
import { PaperHeader } from "@/components/PaperHeader";
import { IndirectPromptInjectionViz } from "@/components/widgets/IndirectPromptInjectionViz";
import { useLang } from "@/lib/i18n";

export default function IndirectPromptInjectionPage() {
  const { t } = useLang();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <PaperHeader
        title="Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection"
        titleZh="你并未同意的风险：用间接提示注入攻陷真实世界 LLM 集成应用"
        authors="Kai Greshake, Sahar Abdelnabi, Shailesh Mishra, Christoph Endres, Thorsten Holz, Mario Fritz"
        venue="AISec '23"
        year={2023}
        sourceUrl="https://doi.org/10.1145/3605764.3623985"
        sourceLabel="ACM DOI"
        sourceLabelZh="ACM DOI"
        difficulty="intermediate"
        tags={["AI Security", "Prompt Injection", "LLM Agents"]}
        prereqs={[
          { label: "RAG", labelZh: "检索增强生成", slug: "rag" },
          { label: "LLM tool use", labelZh: "LLM 工具调用" },
          { label: "Prompt injection", labelZh: "提示注入" },
        ]}
      />

      <article className="paper-content">
        <section className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg p-5 mb-10">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
            核心摘要
          </h3>
          <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed mb-0">
            {t(
              "This paper names and systematizes indirect prompt injection: attackers do not prompt the model directly, but plant instructions in data that an LLM-integrated application later retrieves. Once the model reads that data, the injected text can steer model behavior, tool calls, search queries, emails, memory, or user-facing summaries. The paper builds a security taxonomy and demonstrates the issue on Bing Chat, GitHub Copilot, and synthetic GPT-4/tool-using applications.",
              "这篇论文命名并系统化了“间接提示注入”：攻击者并不直接向模型输入提示，而是把指令藏在 LLM 集成应用稍后会检索的数据里。模型读取这些数据后，注入文本可能引导模型行为、工具调用、搜索查询、邮件、记忆或面向用户的摘要。论文给出安全分类法，并在 Bing Chat、GitHub Copilot 和合成的 GPT-4 工具应用中演示了该问题。"
            )}
          </p>
        </section>

        <FlowChart
          title={t("Indirect Prompt Injection Pipeline", "间接提示注入流程")}
          steps={[
            {
              title: t("Attacker controls external content", "攻击者控制外部内容"),
              subtitle: t("Web page, email, document, code context, hidden text, encoded payload", "网页、邮件、文档、代码上下文、隐藏文本、编码载荷"),
              color: "rose",
            },
            {
              title: t("User asks a normal question", "用户提出正常请求"),
              subtitle: t("The user never types the attack prompt", "用户并没有输入攻击提示词"),
              color: "blue",
            },
            {
              title: t("LLM-integrated app retrieves data", "LLM 集成应用检索数据"),
              subtitle: t("Retrieval makes untrusted data part of model context", "检索让不可信数据进入模型上下文"),
              color: "amber",
            },
            {
              title: t("Model treats data as instruction", "模型把数据当作指令"),
              subtitle: t("The paper argues that data and instruction modalities are not disentangled", "论文指出数据和指令模态并未被解耦"),
              color: "purple",
            },
            {
              title: t("Tools turn behavior drift into security impact", "工具把行为偏移放大为安全影响"),
              subtitle: t("Search, view, URL retrieval, email, address book, memory", "搜索、网页读取、URL 抓取、邮件、通讯录、记忆"),
              color: "teal",
            },
          ]}
          arrows={[
            t("plants", "投放"),
            t("triggers", "触发"),
            t("ingests", "摄入"),
            t("executes", "执行"),
          ]}
          highlights={[
            { text: t("Remote delivery", "远程投放"), color: "rose" },
            { text: t("Inference-time compromise", "推理时攻陷"), color: "amber" },
            { text: t("Tool/API amplification", "工具/API 放大"), color: "teal" },
          ]}
        />

        <h2>{t("1. What Problem Does This Paper Identify?", "1. 这篇论文识别了什么问题？")}</h2>
        <p>
          {t(
            "Classic prompt injection assumes the attacker directly prompts the same model instance they want to manipulate. This paper changes the threat model: the attacker can be remote and indirect. They place instructions into content that an LLM-integrated application is likely to read during inference.",
            "传统提示注入通常假设攻击者直接提示自己要操纵的模型实例。这篇论文改变了威胁模型：攻击者可以是远程的、间接的。他们把指令放进 LLM 集成应用在推理时可能读取的内容里。"
          )}
        </p>
        <p>
          {t(
            "The core security observation is that retrieval-augmented applications blur the boundary between data and instructions. A search result, email, document, website, or code file is supposed to be data, but the model may interpret text inside it as a higher-priority instruction.",
            "核心安全观察是：检索增强应用模糊了数据和指令的边界。搜索结果、邮件、文档、网站或代码文件本应只是数据，但模型可能把其中的文本解释为更高优先级的指令。"
          )}
        </p>

        <Collapsible title={t("The paper's key message in one sentence", "用一句话概括论文核心")}>
          <p className="mb-0">
            {t(
              "In LLM-integrated applications, untrusted retrieved content can become an execution channel for adversarial instructions.",
              "在 LLM 集成应用中，不可信的检索内容可能变成敌对指令的执行通道。"
            )}
          </p>
        </Collapsible>

        <h2>{t("2. Threat Model: Who Does What?", "2. 威胁模型：谁做了什么？")}</h2>
        <p>
          {t(
            "The paper separates the attacker, the benign user, the LLM-integrated application, external data sources, and tools/APIs. The attacker does not need direct access to the victim's chat. Instead, the attacker controls or influences content that the application may retrieve.",
            "论文区分了攻击者、普通用户、LLM 集成应用、外部数据源以及工具/API。攻击者不需要直接访问受害者的聊天界面，而是控制或影响应用可能检索到的内容。"
          )}
        </p>

        <IndirectPromptInjectionViz />

        <h2>{t("3. Injection Delivery Methods", "3. 注入投放方式")}</h2>
        <p>
          {t(
            "The paper organizes delivery methods by how the malicious instruction enters the model context. This is useful because defenses at the chat input box alone do not cover content pulled in by retrieval or tools.",
            "论文按恶意指令进入模型上下文的方式组织投放方法。这一点很关键，因为只在聊天输入框做防御，无法覆盖检索或工具拉入的内容。"
          )}
        </p>

        <div className="grid gap-3 my-6">
          {[
            {
              en: "Passive retrieval",
              zh: "被动检索",
              body: "Prompts are placed in public sources such as web pages, social media posts, documentation, or code repositories that may be retrieved later.",
              bodyZh: "提示词被放入网页、社交媒体、文档或代码仓库等公开来源，等待之后被检索到。",
            },
            {
              en: "Active delivery",
              zh: "主动投放",
              body: "Prompts are sent through channels the application processes, such as email for an LLM-augmented assistant.",
              bodyZh: "提示词通过应用会处理的渠道发送，例如面向 LLM 邮件助手的邮件。",
            },
            {
              en: "User-driven delivery",
              zh: "用户驱动投放",
              body: "Users can be tricked into copying or entering text that secretly contains adversarial instructions.",
              bodyZh: "用户可能被诱导复制或输入暗含敌对指令的文本。",
            },
            {
              en: "Hidden or staged payloads",
              zh: "隐藏或分阶段载荷",
              body: "The paper discusses hidden text, multi-stage retrieval, visual injections, and encoded prompts as harder-to-detect variants.",
              bodyZh: "论文讨论了隐藏文本、多阶段检索、视觉注入和编码提示等更难检测的变体。",
            },
          ].map((item) => (
            <div
              key={item.en}
              className="border border-paper-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-800"
            >
              <h3 className="mt-0 mb-2 text-base font-semibold">
                {t(item.en, item.zh)}
              </h3>
              <p className="mb-0 text-sm">{t(item.body, item.bodyZh)}</p>
            </div>
          ))}
        </div>

        <h2>{t("4. Threat Taxonomy", "4. 威胁分类法")}</h2>
        <p>
          {t(
            "Rather than treating indirect prompt injection as one trick, the paper maps it to a broader security landscape. The taxonomy is threat-based so it can generalize as models and integration patterns evolve.",
            "论文没有把间接提示注入视为单一技巧，而是把它映射到更广泛的安全图景中。这个分类法按威胁组织，因此能随着模型和集成模式演化而泛化。"
          )}
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-paper-100 dark:bg-slate-800">
                <th className="border border-paper-200 dark:border-slate-700 px-3 py-2 text-left">
                  {t("Threat", "威胁")}
                </th>
                <th className="border border-paper-200 dark:border-slate-700 px-3 py-2 text-left">
                  {t("What the injection tries to change", "注入试图改变什么")}
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Information gathering", "Collect or leak user data, chat content, credentials, or private context", "信息收集", "收集或泄露用户数据、聊天内容、凭据或私有上下文"],
                ["Fraud", "Make the application recommend scams, phishing pages, or credential requests", "欺诈", "让应用推荐诈骗、钓鱼页面或索要凭据"],
                ["Intrusion", "Turn tool access, memory, or code completion into a backdoor-like capability", "入侵", "把工具权限、记忆或代码补全变成类似后门的能力"],
                ["Malware-like spreading", "Use prompts as self-propagating instructions in email, memory, or other shared channels", "类似恶意软件的传播", "让提示词在邮件、记忆或共享通道中自我传播"],
                ["Manipulated content", "Bias summaries, hide facts, promote disinformation, or alter search behavior", "内容操纵", "偏置摘要、隐藏事实、传播虚假信息或改变搜索行为"],
                ["Availability", "Disrupt the model's usefulness, API calls, search queries, or response behavior", "可用性破坏", "破坏模型可用性、API 调用、搜索查询或响应行为"],
              ].map(([enThreat, enImpact, zhThreat, zhImpact]) => (
                <tr key={enThreat}>
                  <td className="border border-paper-200 dark:border-slate-700 px-3 py-2 font-medium">
                    {t(enThreat, zhThreat)}
                  </td>
                  <td className="border border-paper-200 dark:border-slate-700 px-3 py-2">
                    {t(enImpact, zhImpact)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>{t("5. Evaluation: What Did They Test?", "5. 评估：他们测试了什么？")}</h2>
        <p>
          {t(
            "The evaluation is qualitative rather than a benchmark with success rates. The authors built synthetic LLM-integrated applications with tool interfaces and also tested real-world systems. Their goal was to show practical viability and map the attack surface, not to claim a universal exploit rate.",
            "评估是定性的，而不是带成功率的基准测试。作者构建了带工具接口的合成 LLM 集成应用，也测试了真实世界系统。他们的目标是展示实践可行性并描绘攻击面，而不是声称一个通用攻击成功率。"
          )}
        </p>

        <ul>
          <li>
            {t(
              "Synthetic applications: chat apps with tools for search, page viewing, URL retrieval, email read/send, address book access, and key-value memory.",
              "合成应用：带有搜索、网页查看、URL 抓取、邮件读写、通讯录访问和键值记忆等工具的聊天应用。"
            )}
          </li>
          <li>
            {t(
              "Bing Chat: tested as a black-box real-world LLM-integrated search application, including the Edge sidebar's ability to read the current page.",
              "Bing Chat：作为黑盒真实世界 LLM 搜索集成应用测试，包括 Edge 侧边栏读取当前页面的能力。"
            )}
          </li>
          <li>
            {t(
              "GitHub Copilot: tested for prompt injection attacks that aim to manipulate code auto-completion from surrounding code context.",
              "GitHub Copilot：测试了通过周围代码上下文操纵代码补全的提示注入攻击。"
            )}
          </li>
        </ul>

        <Collapsible title={t("Why qualitative evaluation is still valuable here", "为什么这里的定性评估仍然有价值")}>
          <p>
            {t(
              "The paper was written when LLM-integrated applications were emerging quickly. The main contribution is a threat model and taxonomy grounded in concrete demonstrations. The authors explicitly note that measuring attack success across dynamic chat sessions, user behavior, prompts, and retrieval conditions is methodologically difficult and left for future work.",
              "这篇论文写作时，LLM 集成应用正在快速出现。它的主要贡献是一个由具体演示支撑的威胁模型和分类法。作者明确指出，在动态聊天会话、用户行为、提示词和检索条件下衡量攻击成功率在方法上很困难，并留给未来工作。"
            )}
          </p>
        </Collapsible>

        <h2>{t("6. Why Tool Use Changes the Risk", "6. 为什么工具调用改变了风险")}</h2>
        <p>
          {t(
            "A plain chatbot can mostly harm the conversation. A tool-using LLM-integrated application can affect external operations. The paper's synthetic setup gives the agent interfaces such as search, view, retrieve URL, read/send email, read address book, and memory. This turns prompt-following errors into security-relevant actions.",
            "普通聊天机器人主要影响对话本身。带工具的 LLM 集成应用则可能影响外部操作。论文的合成设置给智能体提供了搜索、查看、URL 抓取、邮件读写、通讯录读取和记忆等接口。这使提示服从错误变成安全相关动作。"
          )}
        </p>
        <p>
          {t(
            "The important design lesson is not that every tool is dangerous. It is that tool authority must be separated from untrusted retrieved text. If the same model context contains user goals, system rules, tool descriptions, and arbitrary web content, the application needs strong boundaries around which text can authorize action.",
            "重要的设计教训并不是“所有工具都危险”，而是工具权限必须和不可信检索文本分离。如果同一个模型上下文同时包含用户目标、系统规则、工具描述和任意网页内容，应用就需要清晰边界来决定哪些文本能授权行动。"
          )}
        </p>

        <h2>{t("7. Limitations and Responsible Framing", "7. 局限性与负责任表述")}</h2>
        <p>
          {t(
            "The authors avoided planting prompts into public sources that could be retrieved by other users. For real-world systems, they used local HTML files and controlled demonstrations where possible. They also disclose that exact reproducibility is hard for black-box systems whose models, prompts, filters, and retrieval environments can change.",
            "作者避免把提示词投放到可能被其他用户检索到的公开来源。对于真实系统，他们尽可能使用本地 HTML 文件和受控演示。他们也说明，对于模型、提示、过滤器和检索环境可能变化的黑盒系统，精确复现很困难。"
          )}
        </p>
        <p>
          {t(
            "The paper's strongest claims are therefore about attack surface and practical feasibility, not precise prevalence. That distinction matters: the work is a security warning and framework for evaluation, not a complete measurement of deployed risk.",
            "因此，论文最强的主张是关于攻击面和实践可行性，而不是精确流行程度。这个区分很重要：这项工作是安全预警和评估框架，而不是对已部署风险的完整测量。"
          )}
        </p>

        <h2>{t("8. Mitigation Ideas", "8. 缓解思路")}</h2>
        <p>
          {t(
            "The paper argues that simple filtering is brittle, especially when injections are hidden, staged, encoded, or embedded in modalities beyond text. It discusses several directions without presenting a foolproof defense.",
            "论文认为简单过滤很脆弱，尤其当注入被隐藏、分阶段、编码，或嵌入文本之外的模态时。它讨论了多个方向，但没有提出万无一失的防御。"
          )}
        </p>
        <ul>
          <li>
            {t(
              "Filter or classify retrieved inputs before passing them to an instruction-following model.",
              "在把检索输入交给指令跟随模型前，先过滤或分类这些输入。"
            )}
          </li>
          <li>
            {t(
              "Use supervisory or moderator models that detect malicious goals without directly executing retrieved instructions.",
              "使用监督或审核模型，在不执行检索指令的情况下检测恶意目标。"
            )}
          </li>
          <li>
            {t(
              "Constrain tool calls so retrieved text cannot authorize sensitive actions by itself.",
              "约束工具调用，避免检索文本单独授权敏感动作。"
            )}
          </li>
          <li>
            {t(
              "Verify model outputs against retrieved sources, while recognizing that this can itself create new prompt-injection pitfalls.",
              "将模型输出与检索来源核验，同时认识到核验流程本身也可能引入新的提示注入陷阱。"
            )}
          </li>
        </ul>

        <h2>{t("9. Why It Matters Now", "9. 为什么现在重要")}</h2>
        <p>
          {t(
            "This paper is a foundation for thinking about RAG and agent security. It reframes prompt injection from a jailbreak curiosity into a systems problem: untrusted inputs, confused deputies, authority boundaries, side effects, persistence, and propagation.",
            "这篇论文是理解 RAG 和智能体安全的基础之一。它把提示注入从越狱技巧重新定义为系统问题：不可信输入、权限混淆、授权边界、副作用、持久化和传播。"
          )}
        </p>
        <p>
          {t(
            "For builders, the practical takeaway is clear: once an LLM can retrieve data and act through tools, prompt handling becomes part of the application's security boundary. Treat retrieved text as hostile input, not as trusted instruction.",
            "对构建者来说，实践结论很明确：一旦 LLM 能检索数据并通过工具行动，提示处理就成为应用安全边界的一部分。应把检索文本视为敌对输入，而不是可信指令。"
          )}
        </p>

        <h2>{t("Resources", "补充资源")}</h2>
        <ul>
          <li>
            <a
              href="https://doi.org/10.1145/3605764.3623985"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t("ACM proceedings DOI", "ACM 会议论文 DOI")}
            </a>
          </li>
          <li>
            <a
              href="https://arxiv.org/abs/2302.12173"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t("arXiv preprint", "arXiv 预印本")}
            </a>
          </li>
          <li>
            <a
              href="https://arxiv.org/pdf/2302.12173"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t("Paper PDF", "论文 PDF")}
            </a>
          </li>
          <li>
            <a
              href="https://github.com/greshake/llm-security"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t("Authors' demonstration repository", "作者演示仓库")}
            </a>
          </li>
        </ul>
      </article>
    </div>
  );
}
