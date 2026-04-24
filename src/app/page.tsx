"use client";

import { useLang } from "@/lib/i18n";
import Link from "next/link";
import { useState } from "react";

interface TopicItem {
  slug: string;
  title: string;
  titleZh: string;
  authors: string;
  year: number;
  venue: string;
  tags: string[];
  description: string;
  descriptionZh: string;
}

interface TopicSection {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  items: TopicItem[];
}

const promptInjectionItems: TopicItem[] = [
  {
    slug: "indirect-prompt-injection",
    title:
      "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection",
    titleZh: "你并未同意的风险：用间接提示注入攻陷真实世界 LLM 集成应用",
    authors: "Greshake et al.",
    year: 2023,
    venue: "AISec '23",
    tags: ["Security Paper", "Prompt Injection", "LLM Agents"],
    description:
      "The foundational indirect prompt-injection paper: adversarial instructions planted in retrieved data can steer LLM apps and tool calls.",
    descriptionZh:
      "间接提示注入的基础论文：藏在检索数据中的敌对指令可以操纵 LLM 应用和工具调用。",
  },
  {
    slug: "openai-agents-prompt-injection",
    title: "OpenAI: Designing AI Agents to Resist Prompt Injection",
    titleZh: "OpenAI：设计能够抵抗提示注入的 AI 智能体",
    authors: "OpenAI Security",
    year: 2026,
    venue: "OpenAI Blog",
    tags: ["Security Blog", "OpenAI", "LLM Agents"],
    description:
      "OpenAI's product-security framing for agent prompt injection: source-sink analysis, constrained actions, and user confirmation.",
    descriptionZh:
      "OpenAI 对智能体提示注入的产品安全框架：source-sink 分析、受约束动作和用户确认。",
  },
  {
    slug: "ai-recommendation-poisoning",
    title: "Microsoft: AI Recommendation Poisoning, Manipulating Assistant Memory for Profit",
    titleZh: "Microsoft：AI 推荐投毒，为了获利操纵助手记忆",
    authors: "Microsoft Defender Security Research Team",
    year: 2026,
    venue: "Microsoft Security Blog",
    tags: ["Security Blog", "Microsoft", "Memory Poisoning"],
    description:
      "Microsoft's field analysis of memory-poisoning links that try to persistently bias assistant recommendations.",
    descriptionZh:
      "Microsoft 对记忆投毒链接的一线分析：攻击者试图持久化影响助手未来推荐。",
  },
  {
    slug: "anthropic-browser-prompt-injection",
    title: "Anthropic: Mitigating the Risk of Prompt Injections in Browser Use",
    titleZh: "Anthropic：缓解浏览器使用中的提示注入风险",
    authors: "Anthropic",
    year: 2025,
    venue: "Anthropic Research",
    tags: ["Security Blog", "Anthropic", "Browser Agents"],
    description:
      "Anthropic's browser-agent security writeup on web attack surface, classifiers, model training, and red teaming.",
    descriptionZh:
      "Anthropic 的浏览器智能体安全文章，覆盖 Web 攻击面、分类器、模型训练和红队。",
  },
  {
    slug: "camel-defeating-prompt-injections",
    title: "Google / Google DeepMind: CaMeL, Defeating Prompt Injections by Design",
    titleZh: "Google / Google DeepMind：CaMeL，通过系统设计击败提示注入",
    authors: "Google, Google DeepMind, ETH Zurich",
    year: 2025,
    venue: "arXiv / Google Research",
    tags: ["Security Blog", "Google", "Defense Architecture"],
    description:
      "A system-design defense that separates trusted control flow from untrusted data and uses capabilities to block unauthorized exfiltration.",
    descriptionZh:
      "系统设计型防御：分离可信控制流与不可信数据，并用 capability 阻止未授权外泄。",
  },
];

const sections: TopicSection[] = [
  {
    id: "prompt-injection",
    title: "Prompt Injection",
    titleZh: "提示词注入",
    description:
      "Prompt injection, memory poisoning, browser-agent abuse, and defensive patterns for real-world agent systems.",
    descriptionZh:
      "提示词注入、记忆投毒、浏览器智能体滥用，以及真实智能体系统中的防御模式。",
    items: promptInjectionItems,
  },
];

export default function Home() {
  const { t, lang } = useLang();
  const basePath = process.env.NODE_ENV === "production" ? "/SecurityPaperTrace" : "";
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["prompt-injection"]));

  const toggleSection = (id: string) =>
    setExpandedSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="max-w-4xl mx-auto px-6">
      <section className="py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 animate-fadeInUp dark:text-slate-50">
          {t("Interactive deep-dives", "交互式精读")}
          <br />
          {t("into prompt injection", "进入提示词注入")}
        </h1>
        <p className="text-lg text-paper-800/60 dark:text-slate-400 max-w-2xl leading-relaxed animate-fadeInUp delay-1">
          {t(
            "A focused AI security track for prompt injection, memory poisoning, and agent/tool risk, organized first by topic and then by source type.",
            "一个聚焦提示词注入、记忆投毒和智能体/工具风险的 AI 安全主线：主页按主题组织，入口按来源类型跳转。"
          )}
        </p>
      </section>

      <div className="flex flex-wrap gap-3 pb-10 -mt-4">
        {[
          {
            href: `${basePath}/security-papers`,
            icon: "📄",
            label: t("Security Papers", "安全论文"),
            desc: t("Research foundations", "研究基础"),
          },
          {
            href: `${basePath}/security-blogs`,
            icon: "📰",
            label: t("Security Blogs", "安全博客"),
            desc: t("Official vendor writeups", "官方厂商文章"),
          },
          {
            href: `${basePath}/security-news`,
            icon: "⚠️",
            label: t("Security News", "安全新闻"),
            desc: t("Incidents and vulnerabilities", "事件与漏洞"),
          },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 border border-paper-200 dark:border-slate-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm dark:hover:shadow-blue-900/20 transition-all flex-1 min-w-[200px]"
          >
            <span className="text-xl">{item.icon}</span>
            <div>
              <div className="font-semibold text-sm dark:text-slate-100">{item.label}</div>
              <div className="text-xs text-paper-800/50 dark:text-slate-500">{item.desc}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="pb-10 space-y-4">
        {sections.map((section) => {
          const isOpen = expandedSections.has(section.id);
          return (
            <section key={section.id} className="border border-paper-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800/60 hover:bg-paper-50 dark:hover:bg-slate-800 transition-colors text-left"
              >
                <div>
                  <h2 className="text-lg font-bold tracking-tight dark:text-slate-100">
                    {lang === "en" ? section.title : section.titleZh}
                  </h2>
                  <p className="text-sm text-paper-800/50 dark:text-slate-400 mt-0.5">
                    {lang === "en" ? section.description : section.descriptionZh}
                  </p>
                </div>
                <span className={`text-paper-800/40 dark:text-slate-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-2 bg-paper-50/50 dark:bg-slate-900/40 space-y-4">
                  {section.items.map((item, idx) => (
                    <Link key={item.slug} href={`/papers/${item.slug}`} className="block group">
                      <article className={`bg-white dark:bg-slate-800 border border-paper-200 dark:border-slate-700 rounded-lg p-6 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md dark:hover:shadow-blue-900/10 hover:-translate-y-0.5 transition-all duration-200 animate-fadeInUp ${(["delay-1", "delay-2", "delay-3", "delay-4", "delay-5"] as const)[Math.min(idx, 4)]}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {lang === "en" ? item.title : item.titleZh}
                            </h3>
                            <p className="text-sm text-paper-800/50 dark:text-slate-500 mt-1">
                              {item.authors} &middot; {item.venue} {item.year}
                            </p>
                            <p className="text-sm text-paper-800/70 dark:text-slate-300 mt-2 leading-relaxed">
                              {lang === "en" ? item.description : item.descriptionZh}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className="text-paper-800/30 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors text-xl mt-1">
                            &rarr;
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
