"use client";

import { useLang } from "@/lib/i18n";

interface AuthorityBannerProps {
  org: string;
  orgZh: string;
  type: string;
  typeZh: string;
  sourceLabel: string;
  sourceLabelZh: string;
  sourceUrl: string;
  emphasis: string;
  emphasisZh: string;
}

export function AuthorityBanner({
  org,
  orgZh,
  type,
  typeZh,
  sourceLabel,
  sourceLabelZh,
  sourceUrl,
  emphasis,
  emphasisZh,
}: AuthorityBannerProps) {
  const { t } = useLang();

  return (
    <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-700/50 dark:bg-blue-900/20">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
          {t(org, orgZh)}
        </span>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-blue-700 border border-blue-200 dark:bg-slate-900 dark:text-blue-300 dark:border-blue-700/60">
          {t(type, typeZh)}
        </span>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-blue-700 hover:underline dark:text-blue-300"
        >
          {t(sourceLabel, sourceLabelZh)} ↗
        </a>
      </div>
      <p className="mb-0 text-sm leading-6 text-blue-950/80 dark:text-blue-100/85">
        {t(emphasis, emphasisZh)}
      </p>
    </div>
  );
}
