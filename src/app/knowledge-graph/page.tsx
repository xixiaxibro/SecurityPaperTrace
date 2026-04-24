"use client";

import { useLang } from "@/lib/i18n";

export default function KnowledgeGraphPage() {
  const { t } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
          {t("AI Security", "AI 安全")}
        </p>
        <h1 className="text-3xl font-bold tracking-tight mb-2 dark:text-slate-50">
          {t("Knowledge Graph", "知识图谱")}
        </h1>
        <p className="text-paper-800/60 dark:text-slate-400 leading-relaxed max-w-2xl">
          {t(
            "A security-focused graph will connect papers, official writeups, attacks, defenses, vendors, and tools.",
            "安全知识图谱将连接论文、官方文章、攻击、防御、厂商和工具。"
          )}
        </p>
      </header>

      <div className="border border-dashed border-paper-200 dark:border-slate-700 rounded-xl p-8 bg-paper-50/60 dark:bg-slate-900/40">
        <p className="text-sm text-paper-800/50 dark:text-slate-500">
          {t("Graph content is empty for now.", "图谱内容暂时留空。")}
        </p>
      </div>
    </div>
  );
}
