"use client";

import { useLang } from "@/lib/i18n";

const news = [
  {
    title: "Claude Code Source Leaked via npm Source Maps",
    titleZh: "Claude Code 源码通过 npm Source Map 泄露",
    source: "ccleaks.com Analysis",
    date: "2026-04-04",
    url: "https://ccleaks.com/",
    description:
      "A source-map exposure report covering Claude Code internals, feature flags, and unreleased agent-mode details.",
    descriptionZh:
      "一起 source map 暴露事件，涉及 Claude Code 内部实现、功能开关和未发布的智能体模式细节。",
  },
  {
    title: "3 Security Flaws in Claude Code Allow Remote Code Execution",
    titleZh: "Claude Code 3 个安全漏洞允许远程代码执行",
    source: "Check Point Research",
    date: "2026-04-03",
    url: "https://research.checkpoint.com/2026/rce-and-api-token-exfiltration-through-claude-code-project-files-cve-2025-59536/",
    description:
      "A vulnerability report on Claude Code attack paths that can lead to code execution and API-token exfiltration through malicious repositories.",
    descriptionZh:
      "一篇 Claude Code 漏洞报告，攻击者可通过恶意仓库触发代码执行并外泄 API token。",
  },
];

export default function SecurityNewsPage() {
  const { t, lang } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
          {t("Prompt Injection Track", "提示词注入主线")}
        </p>
        <h1 className="text-3xl font-bold tracking-tight mb-2 dark:text-slate-50">
          {t("Security News", "安全新闻")}
        </h1>
        <p className="text-paper-800/60 dark:text-slate-400 leading-relaxed max-w-2xl">
          {t(
            "Incidents and vulnerability reports relevant to agentic coding and browser-use systems.",
            "与智能体编码、浏览器使用等真实系统相关的安全事件和漏洞报道。"
          )}
        </p>
      </header>

      <div className="space-y-4">
        {news.map((item) => (
          <a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer" className="block group">
            <article className="bg-white dark:bg-slate-800 border border-paper-200 dark:border-slate-700 rounded-lg p-6 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md dark:hover:shadow-blue-900/10 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {lang === "en" ? item.title : item.titleZh}
                  </h2>
                  <p className="text-sm text-paper-800/50 dark:text-slate-500 mt-1">
                    {item.source} &middot; {item.date}
                  </p>
                  <p className="text-sm text-paper-800/70 dark:text-slate-300 mt-3 leading-relaxed">
                    {lang === "en" ? item.description : item.descriptionZh}
                  </p>
                </div>
                <span className="text-paper-800/30 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors text-xl">
                  ↗
                </span>
              </div>
            </article>
          </a>
        ))}
      </div>
    </div>
  );
}
