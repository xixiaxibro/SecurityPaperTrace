"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

const papers = [
  {
    slug: "indirect-prompt-injection",
    title:
      "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection",
    titleZh: "你并未同意的风险：用间接提示注入攻陷真实世界 LLM 集成应用",
    meta: "Greshake et al. · AISec '23",
    metaZh: "Greshake 等 · AISec '23",
    description:
      "The foundational indirect prompt-injection paper: adversarial instructions planted in retrieved data can steer LLM apps and tool calls.",
    descriptionZh:
      "间接提示注入的基础论文：藏在检索数据中的敌对指令可以操纵 LLM 应用和工具调用。",
  },
];

export default function SecurityPapersPage() {
  const { t, lang } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
          {t("Prompt Injection Track", "提示词注入主线")}
        </p>
        <h1 className="text-3xl font-bold tracking-tight mb-2 dark:text-slate-50">
          {t("Security Papers", "安全论文")}
        </h1>
        <p className="text-paper-800/60 dark:text-slate-400 leading-relaxed max-w-2xl">
          {t(
            "Research papers that define the threat model and technical foundation.",
            "定义威胁模型和技术基础的安全论文。"
          )}
        </p>
      </header>

      <div className="space-y-4">
        {papers.map((paper) => (
          <Link key={paper.slug} href={`/papers/${paper.slug}`} className="block group">
            <article className="bg-white dark:bg-slate-800 border border-paper-200 dark:border-slate-700 rounded-lg p-6 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md dark:hover:shadow-blue-900/10 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {lang === "en" ? paper.title : paper.titleZh}
                  </h2>
                  <p className="text-sm text-paper-800/50 dark:text-slate-500 mt-1">
                    {lang === "en" ? paper.meta : paper.metaZh}
                  </p>
                  <p className="text-sm text-paper-800/70 dark:text-slate-300 mt-3 leading-relaxed">
                    {lang === "en" ? paper.description : paper.descriptionZh}
                  </p>
                </div>
                <span className="text-paper-800/30 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors text-xl">
                  &rarr;
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
