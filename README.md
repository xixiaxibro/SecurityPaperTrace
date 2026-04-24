# SecurityPaperTrace

SecurityPaperTrace is a bilingual AI security reading site focused on papers, vendor writeups, and practical threat models for LLM applications.

Live site: [https://xixiaxibro.github.io/SecurityPaperTrace](https://xixiaxibro.github.io/SecurityPaperTrace)

Repository: [https://github.com/xixiaxibro/SecurityPaperTrace](https://github.com/xixiaxibro/SecurityPaperTrace)

## What This Project Covers

- Prompt injection and indirect prompt injection
- Agent, browser, and tool-use security
- RAG and retrieval-channel risks
- Memory poisoning and recommendation poisoning
- Defense patterns from OpenAI, Anthropic, Google, Microsoft, and academic work
- Interactive explanations that connect attacks, controls, and implementation tradeoffs

## Site Structure

- `/` - Security-focused home page with curated deep dives
- `/daily` - Paper and security-news feed
- `/security-papers` - Security paper collection
- `/security-blogs` - Vendor and lab writeups
- `/security-news` - AI security news and updates
- `/knowledge-graph` - Paper, lab, and concept graph
- `/timeline` - AI/ML timeline
- `/papers/*` - Individual interactive deep-dive pages
- `/resources` - Research and learning resources
- `/guide` - Study guide

## Featured Deep Dives

- Indirect Prompt Injection
- OpenAI Agents Prompt Injection
- Anthropic Browser Prompt Injection
- CaMeL: Defeating Prompt Injections
- AI Recommendation Poisoning
- RAG, attention, diffusion, and core ML papers that support the security track

## Tech Stack

- Next.js 14 App Router
- Static export for GitHub Pages
- React interactive widgets
- Tailwind CSS with dark mode
- KaTeX math rendering
- Lightweight custom bilingual i18n

## Local Development

```bash
git clone git@github.com:xixiaxibro/SecurityPaperTrace.git
cd SecurityPaperTrace
npm install
npm run dev
```

Open [http://localhost:3888](http://localhost:3888).

## Build

```bash
npm run build
```

The production build exports static files to `out/`.

## Deployment

Pushes to `main` deploy through GitHub Actions using `.github/workflows/deploy.yml`.

GitHub Pages should use:

- Source: GitHub Actions
- URL: [https://xixiaxibro.github.io/SecurityPaperTrace](https://xixiaxibro.github.io/SecurityPaperTrace)

## Adding A Deep Dive

1. Add metadata in `src/lib/papers.ts`.
2. Create a page under `src/app/papers/<slug>/page.tsx`.
3. Use existing components such as `PaperHeader`, `Math`, `Widget`, and paper-specific visualizations.
4. Keep the page bilingual where practical and connect the paper to related attack or defense patterns.

## Maintainer

- [xixiaxibro](https://github.com/xixiaxibro)

## Contributors

- [xixiaxibro](https://github.com/xixiaxibro)

## Community

Scan the QR code to join the WeChat community for AI security, papers, and research discussion.

<img src="./src/images/wechat_group.pic.jpg" alt="WeChat Group QR Code" width="200" />

## License

MIT
