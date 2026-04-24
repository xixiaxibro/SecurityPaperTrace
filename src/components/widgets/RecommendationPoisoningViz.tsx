"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

const stages = [
  {
    label: "Package",
    labelZh: "包装",
    title: "A helpful-looking AI link is created",
    titleZh: "创建一个看似有用的 AI 链接",
    body:
      "The link opens an AI assistant with a pre-filled prompt parameter. To the user, it may look like a normal 'Summarize with AI' button.",
    bodyZh:
      "这个链接会打开 AI 助手，并通过参数预填提示词。对用户来说，它可能只是一个普通的“用 AI 总结”按钮。",
  },
  {
    label: "Click",
    labelZh: "点击",
    title: "The user follows the link",
    titleZh: "用户点击链接",
    body:
      "The user intended to summarize content, not to authorize a long-term memory change.",
    bodyZh:
      "用户本意是总结内容，而不是授权修改长期记忆。",
  },
  {
    label: "Prefill",
    labelZh: "预填",
    title: "The assistant receives memory-oriented instructions",
    titleZh: "助手收到面向记忆的指令",
    body:
      "Microsoft observed prompts that used persistence language such as remembering a source as trusted or authoritative for future conversations.",
    bodyZh:
      "微软观察到一些提示词使用持久化措辞，例如要求把某来源记为未来对话中的可信或权威来源。",
  },
  {
    label: "Memory",
    labelZh: "记忆",
    title: "The assistant may store a biased preference",
    titleZh: "助手可能存下有偏偏好",
    body:
      "If the memory change succeeds, later answers can be nudged toward the promoted company, source, or product.",
    bodyZh:
      "如果记忆修改成功，之后的回答可能被引导偏向被推广的公司、来源或产品。",
  },
  {
    label: "Recommend",
    labelZh: "推荐",
    title: "Future recommendations become subtly biased",
    titleZh: "未来推荐被悄悄偏置",
    body:
      "The harm is persistent and hard to notice: the user sees a confident recommendation, not the hidden path that shaped it.",
    bodyZh:
      "危害在于持久且难察觉：用户看到的是自信的推荐，而不是塑造它的隐藏路径。",
  },
];

export function RecommendationPoisoningViz() {
  const { t, lang } = useLang();
  const [active, setActive] = useState(0);
  const current = stages[active];

  return (
    <div className="widget-container">
      <div className="widget-header">
        <span className="text-rose-600 dark:text-rose-400">&#9888;</span>
        <span>{t("Memory Poisoning Flow", "记忆投毒流程")}</span>
      </div>
      <div className="widget-body">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-5 gap-2">
            {stages.map((stage, index) => (
              <button
                key={stage.label}
                type="button"
                onClick={() => setActive(index)}
                className={`min-h-16 rounded-lg border px-2 py-2 text-center transition ${
                  active === index
                    ? "bg-rose-50 border-rose-300 text-rose-800 dark:bg-rose-900/30 dark:border-rose-700 dark:text-rose-200"
                    : "bg-paper-50 border-paper-200 text-paper-800/60 hover:bg-paper-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
                }`}
              >
                <div className="text-xs font-mono opacity-70">{index + 1}</div>
                <div className="text-xs sm:text-sm font-semibold leading-tight">
                  {lang === "en" ? stage.label : stage.labelZh}
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 dark:border-rose-700/60 dark:bg-rose-900/20">
            <div className="text-xs font-semibold text-rose-700/70 dark:text-rose-300/80 mb-2">
              {t(`Stage ${active + 1}`, `第 ${active + 1} 阶段`)}
            </div>
            <h3 className="mt-0 mb-2 text-base font-bold text-rose-900 dark:text-rose-100">
              {lang === "en" ? current.title : current.titleZh}
            </h3>
            <p className="mb-0 text-sm leading-6 text-rose-900/80 dark:text-rose-100/80">
              {lang === "en" ? current.body : current.bodyZh}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
