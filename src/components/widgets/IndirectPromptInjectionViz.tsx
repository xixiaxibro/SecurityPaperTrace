"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

const steps = [
  {
    actor: "attacker",
    label: "Plant",
    labelZh: "投放",
    title: "Attacker plants hostile instructions in external data",
    titleZh: "攻击者把敌对指令放进外部数据",
    detail:
      "The paper studies prompts placed in web pages, emails, retrieved documents, code context, hidden comments, images, or encoded payloads.",
    detailZh:
      "论文研究了放在网页、邮件、检索文档、代码上下文、隐藏注释、图片或编码载荷里的提示词。",
  },
  {
    actor: "user",
    label: "Ask",
    labelZh: "提问",
    title: "A benign user asks an LLM-integrated app for help",
    titleZh: "普通用户向集成 LLM 的应用求助",
    detail:
      "The user does not type the attacker prompt. The attack is delivered through content the application later reads.",
    detailZh:
      "用户没有输入攻击者提示词。攻击通过应用稍后读取的内容被间接送入模型。",
  },
  {
    actor: "model",
    label: "Retrieve",
    labelZh: "检索",
    title: "The app retrieves untrusted content at inference time",
    titleZh: "应用在推理时检索不可信内容",
    detail:
      "Retrieval blurs the boundary between data and instructions: the model receives source text and may treat it as a command.",
    detailZh:
      "检索模糊了数据和指令的边界：模型收到来源文本后，可能把其中内容当成命令执行。",
  },
  {
    actor: "model",
    label: "Follow",
    labelZh: "服从",
    title: "The model follows the injected instruction",
    titleZh: "模型服从被注入的指令",
    detail:
      "The paper reports qualitative demonstrations where injected prompts steer behavior, persist through a session, or change tool calls.",
    detailZh:
      "论文展示了注入提示如何引导行为、在会话中持续生效，或改变工具/API 调用。",
  },
  {
    actor: "tool",
    label: "Act",
    labelZh: "行动",
    title: "Tools and APIs amplify the compromise",
    titleZh: "工具和 API 放大被攻陷后的影响",
    detail:
      "If the model can search, read pages, send email, retrieve URLs, or use memory, the injected instruction can affect those operations.",
    detailZh:
      "如果模型能搜索、读取网页、发送邮件、抓取 URL 或写入记忆，注入指令就可能影响这些操作。",
  },
  {
    actor: "victim",
    label: "Impact",
    labelZh: "影响",
    title: "The user, app, or information channel is affected",
    titleZh: "用户、应用或信息通道受到影响",
    detail:
      "The taxonomy covers information gathering, fraud, intrusion, malware-like prompt spreading, manipulated content, and availability attacks.",
    detailZh:
      "论文分类包括信息收集、欺诈、入侵、类似恶意软件的提示传播、内容操纵和可用性攻击。",
  },
];

const actorStyles: Record<string, string> = {
  attacker: "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-900/30 dark:border-rose-700/50 dark:text-rose-200",
  user: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700/50 dark:text-blue-200",
  model: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-700/50 dark:text-amber-200",
  tool: "bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-900/30 dark:border-purple-700/50 dark:text-purple-200",
  victim: "bg-teal-50 border-teal-200 text-teal-800 dark:bg-teal-900/30 dark:border-teal-700/50 dark:text-teal-200",
};

export function IndirectPromptInjectionViz() {
  const { t, lang } = useLang();
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div className="widget-container">
      <div className="widget-header">
        <span className="text-amber-600 dark:text-amber-400">&#9888;</span>
        <span>{t("Interactive Attack Chain", "交互式攻击链")}</span>
      </div>
      <div className="widget-body">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
          {steps.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
              className={`h-20 border rounded-lg px-3 py-2 text-left transition ${
                active === index
                  ? actorStyles[item.actor]
                  : "bg-paper-50 border-paper-200 text-paper-800/70 hover:bg-paper-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
              }`}
            >
              <div className="text-xs font-mono opacity-70">{index + 1}</div>
              <div className="text-sm font-semibold leading-tight">
                {lang === "en" ? item.label : item.labelZh}
              </div>
            </button>
          ))}
        </div>

        <div className={`border rounded-lg p-4 ${actorStyles[step.actor]}`}>
          <div className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-2">
            {t(`Step ${active + 1}`, `第 ${active + 1} 步`)}
          </div>
          <h3 className="mt-0 mb-2 text-base font-bold">
            {lang === "en" ? step.title : step.titleZh}
          </h3>
          <p className="mb-0 text-sm leading-6">
            {lang === "en" ? step.detail : step.detailZh}
          </p>
        </div>
      </div>
    </div>
  );
}
