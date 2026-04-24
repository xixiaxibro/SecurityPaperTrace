"use client";

import { useLang } from "@/lib/i18n";

export default function DailyPage() {
  const { t } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
          {t("AI Security", "AI 安全")}
        </p>
        <h1 className="text-3xl font-bold tracking-tight mb-2 dark:text-slate-50">
          {t("Daily", "每日")}
        </h1>
        <p className="text-paper-800/60 dark:text-slate-400 leading-relaxed max-w-2xl">
          {t(
            "Daily AI-security updates will live here. The section is intentionally empty while the security feed format is being rebuilt.",
            "每日 AI 安全更新会放在这里。当前版式正在重建中，暂时留空。"
          )}
        </p>
      </header>

      <div className="border border-dashed border-paper-200 dark:border-slate-700 rounded-xl p-8 bg-paper-50/60 dark:bg-slate-900/40">
        <p className="text-sm text-paper-800/50 dark:text-slate-500">
          {t("No daily entries yet.", "暂时没有每日条目。")}
        </p>
      </div>
    </div>
  );
}
