"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

const layers = [
  {
    label: "Untrusted input",
    labelZh: "不可信输入",
    body: "Web pages, emails, documents, ads, and tool outputs can carry instructions the user did not intend.",
    bodyZh: "网页、邮件、文档、广告和工具输出都可能携带用户并未授权的指令。",
  },
  {
    label: "Model behavior",
    labelZh: "模型行为",
    body: "Training and classifiers can help the model identify and refuse malicious instructions, but cannot be the only line of defense.",
    bodyZh: "训练和分类器可以帮助模型识别并拒绝恶意指令，但不能成为唯一防线。",
  },
  {
    label: "Control flow",
    labelZh: "控制流",
    body: "Secure designs separate trusted user intent from untrusted retrieved data so external content cannot decide what tools run.",
    bodyZh: "安全设计会把可信用户意图和不可信检索数据分离，避免外部内容决定工具如何执行。",
  },
  {
    label: "Sensitive sinks",
    labelZh: "敏感出口",
    body: "Navigation, form submission, email, file access, bookmarks, memory writes, and third-party transmission need explicit constraints.",
    bodyZh: "导航、表单提交、邮件、文件访问、书签、记忆写入和第三方传输都需要明确约束。",
  },
  {
    label: "User consent",
    labelZh: "用户确认",
    body: "When private data may leave the session or a high-impact action is requested, the system should block or ask for confirmation.",
    bodyZh: "当私有数据可能离开会话，或请求高影响动作时，系统应阻止或请求用户确认。",
  },
];

export function DefenseLayersViz() {
  const { lang, t } = useLang();
  const [active, setActive] = useState(0);
  const layer = layers[active];

  return (
    <div className="widget-container">
      <div className="widget-header">
        <span className="text-teal-600 dark:text-teal-400">&#9670;</span>
        <span>{t("Defense Layers", "防御层")}</span>
      </div>
      <div className="widget-body">
        <div className="grid grid-cols-5 gap-2 mb-4">
          {layers.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
              className={`min-h-16 rounded-lg border px-2 py-2 text-center text-xs transition ${
                active === index
                  ? "bg-teal-50 border-teal-300 text-teal-800 dark:bg-teal-900/30 dark:border-teal-700 dark:text-teal-200"
                  : "bg-paper-50 border-paper-200 text-paper-800/60 hover:bg-paper-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
              }`}
            >
              <div className="font-mono opacity-60">{index + 1}</div>
              <div className="font-semibold leading-tight">{lang === "en" ? item.label : item.labelZh}</div>
            </button>
          ))}
        </div>
        <div className="rounded-lg border border-teal-200 bg-teal-50 p-4 dark:border-teal-700/60 dark:bg-teal-900/20">
          <h3 className="mt-0 mb-2 text-base font-bold text-teal-900 dark:text-teal-100">
            {lang === "en" ? layer.label : layer.labelZh}
          </h3>
          <p className="mb-0 text-sm leading-6 text-teal-900/80 dark:text-teal-100/80">
            {lang === "en" ? layer.body : layer.bodyZh}
          </p>
        </div>
      </div>
    </div>
  );
}
