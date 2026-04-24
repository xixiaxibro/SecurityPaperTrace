"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

const blogs = [
  {
    slug: "openai-agents-prompt-injection",
    title: "OpenAI: Designing AI Agents to Resist Prompt Injection",
    titleZh: "OpenAI：设计能够抵抗提示注入的 AI 智能体",
    meta: "OpenAI Security · Official blog 2026",
    metaZh: "OpenAI Security · 官方博客 2026",
    description:
      "OpenAI's product-security framing for agent prompt injection: source-sink analysis, constrained actions, and user confirmation.",
    descriptionZh:
      "OpenAI 对智能体提示注入的产品安全框架：source-sink 分析、受约束动作和用户确认。",
  },
  {
    slug: "ai-recommendation-poisoning",
    title: "Microsoft: AI Recommendation Poisoning, Manipulating Assistant Memory for Profit",
    titleZh: "Microsoft：AI 推荐投毒，为了获利操纵助手记忆",
    meta: "Microsoft Defender · Official security blog 2026",
    metaZh: "Microsoft Defender · 官方安全博客 2026",
    description:
      "Microsoft's field analysis of memory-poisoning links that try to persistently bias assistant recommendations.",
    descriptionZh:
      "Microsoft 对记忆投毒链接的一线分析：攻击者试图持久化影响助手未来推荐。",
  },
  {
    slug: "anthropic-browser-prompt-injection",
    title: "Anthropic: Mitigating the Risk of Prompt Injections in Browser Use",
    titleZh: "Anthropic：缓解浏览器使用中的提示注入风险",
    meta: "Anthropic Research · Official blog 2025",
    metaZh: "Anthropic Research · 官方博客 2025",
    description:
      "Anthropic's browser-agent security writeup on web attack surface, classifiers, model training, and red teaming.",
    descriptionZh:
      "Anthropic 的浏览器智能体安全文章，覆盖 Web 攻击面、分类器、模型训练和红队。",
  },
  {
    slug: "camel-defeating-prompt-injections",
    title: "Google / Google DeepMind: CaMeL, Defeating Prompt Injections by Design",
    titleZh: "Google / Google DeepMind：CaMeL，通过系统设计击败提示注入",
    meta: "Google, Google DeepMind, ETH Zurich · arXiv / Google Research 2025",
    metaZh: "Google、Google DeepMind、ETH Zurich · arXiv / Google Research 2025",
    description:
      "A system-design defense that separates trusted control flow from untrusted data and uses capabilities to block unauthorized exfiltration.",
    descriptionZh:
      "系统设计型防御：分离可信控制流与不可信数据，并用 capability 阻止未授权外泄。",
  },
];

export default function SecurityBlogsPage() {
  const { t, lang } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
          {t("Prompt Injection Track", "提示词注入主线")}
        </p>
        <h1 className="text-3xl font-bold tracking-tight mb-2 dark:text-slate-50">
          {t("Security Blogs", "安全博客")}
        </h1>
        <p className="text-paper-800/60 dark:text-slate-400 leading-relaxed max-w-2xl">
          {t(
            "Official vendor and lab writeups that have been turned into SecurityPaperTrace deep-dives.",
            "已经做成 SecurityPaperTrace 精读的官方厂商与实验室文章。"
          )}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <Link key={blog.slug} href={`/papers/${blog.slug}`} className="block group">
            <article className="h-full bg-white dark:bg-slate-800 border border-paper-200 dark:border-slate-700 rounded-lg p-5 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md dark:hover:shadow-blue-900/10 transition-all">
              <h2 className="font-semibold leading-snug dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {lang === "en" ? blog.title : blog.titleZh}
              </h2>
              <p className="text-xs text-paper-800/45 dark:text-slate-500 mt-1">
                {lang === "en" ? blog.meta : blog.metaZh}
              </p>
              <p className="text-sm text-paper-800/70 dark:text-slate-300 mt-3 leading-relaxed">
                {lang === "en" ? blog.description : blog.descriptionZh}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
