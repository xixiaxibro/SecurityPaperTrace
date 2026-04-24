export interface PaperMeta {
  slug: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  tags: string[];
  description: string;
  arxiv?: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  papers: PaperMeta[];
}

export const sections: Section[] = [
  {
    id: "frontier-llms",
    title: "Frontier LLMs",
    description:
      "Technical reports and architecture breakdowns of state-of-the-art large language models — covering MoE scaling, efficient attention, and modern training recipes.",
    papers: [
      {
        slug: "deepseek-v4",
        title: "DeepSeek-V4 Technical Report",
        authors: "DeepSeek AI",
        year: 2026,
        venue: "Technical Report",
        tags: ["MoE", "Efficient Attention", "Long Context", "Code"],
        description:
          "DeepSeek-V4-Pro: 1.6T-parameter MoE model (49B active) pre-trained on 32T+ tokens. Innovations: CSA/HCA compressed attention (10% KV cache vs V3.2), mHC Birkhoff-constrained residual connections, and Muon optimizer. 80.6% SWE Verified, 93.5 LiveCodeBench, Codeforces 3206 (Think Max). MIT license, open weights.",
        arxiv: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/blob/main/DeepSeek_V4.pdf",
      },
    ],
  },
  {
    id: "dllm",
    title: "Diffusion Language Models",
    description:
      "Applying diffusion processes to discrete text generation — an emerging alternative to autoregressive LLMs. These papers explore masked diffusion, fast sampling, and block-level generation.",
    papers: [
      {
        slug: "llada",
        title: "LLaDA: Large Language Diffusion with mAsking",
        authors: "Nie et al.",
        year: 2025,
        venue: "arXiv",
        tags: ["Diffusion LM", "Masked Diffusion", "Pre-training"],
        description:
          "Proposes a masked diffusion framework for large language models. LLaDA uses a forward process that progressively masks tokens and a reverse process that learns to predict masked tokens, enabling competitive performance with AR models at scale.",
        arxiv: "https://arxiv.org/abs/2502.09992",
      },
      {
        slug: "mdlm",
        title: "Simple and Effective Masked Diffusion Language Models (MDLM)",
        authors: "Sahoo et al.",
        year: 2024,
        venue: "NeurIPS",
        tags: ["Diffusion LM", "Masked Diffusion", "ELBO"],
        description:
          "Simplifies masked discrete diffusion with a principled training objective derived from a continuous-time ELBO. Achieves strong perplexity on language modeling benchmarks with clean, minimal design.",
        arxiv: "https://arxiv.org/abs/2406.07524",
      },
      {
        slug: "fast-dllm",
        title: "Fast Discrete Diffusion Language Models (Fast DLLM)",
        authors: "Shi et al.",
        year: 2025,
        venue: "arXiv",
        tags: ["Diffusion LM", "Fast Sampling", "Adaptive"],
        description:
          "Accelerates discrete diffusion LMs by introducing an adaptive noise schedule and importance sampling for the denoising steps, reducing the number of forward passes needed while maintaining generation quality.",
      },
      {
        slug: "block-diffusion",
        title:
          "Block Diffusion: Interpolating Between Autoregressive and Diffusion Language Models",
        authors: "Arriola et al.",
        year: 2025,
        venue: "arXiv",
        tags: ["Diffusion LM", "Block Generation", "Hybrid"],
        description:
          "Bridges AR and diffusion by generating text in blocks — each block is produced via discrete diffusion while blocks are generated left-to-right. Combines the fluency of AR with the parallel decoding of diffusion.",
      },
    ],
  },
  {
    id: "transformer-foundations",
    title: "Transformer Foundations",
    description:
      "The core architectures and mechanisms that power modern deep learning — attention, transformers, and their variants.",
    papers: [
      {
        slug: "attention-is-all-you-need",
        title: "Attention Is All You Need",
        authors: "Vaswani et al.",
        year: 2017,
        venue: "NeurIPS",
        tags: ["Transformer", "Attention", "Seq2Seq"],
        description:
          "The paper that introduced the Transformer — replacing recurrence entirely with self-attention. We walk through scaled dot-product attention, multi-head attention, and positional encoding.",
        arxiv: "https://arxiv.org/abs/1706.03762",
      },
    ],
  },
  {
    id: "ai-security",
    title: "Prompt Injection",
    description:
      "Prompt-injection papers and official security writeups on LLM-integrated applications, agent/tool risks, memory poisoning, and practical threat models for deployed AI systems.",
    papers: [
      {
        slug: "openai-agents-prompt-injection",
        title: "OpenAI: Designing AI Agents to Resist Prompt Injection",
        authors: "OpenAI Security",
        year: 2026,
        venue: "OpenAI Blog",
        tags: ["AI Security", "Prompt Injection", "LLM Agents"],
        description:
          "OpenAI's official guidance for agent prompt-injection resistance, framing attacks as social-engineering-style manipulation and emphasizing source-sink analysis, constrained actions, and user confirmation before sensitive data leaves the session.",
        arxiv:
          "https://openai.com/index/designing-agents-to-resist-prompt-injection/",
      },
      {
        slug: "anthropic-browser-prompt-injection",
        title: "Anthropic: Mitigating the Risk of Prompt Injections in Browser Use",
        authors: "Anthropic",
        year: 2025,
        venue: "Anthropic Research",
        tags: ["AI Security", "Prompt Injection", "Browser Agents"],
        description:
          "Anthropic's official browser-agent security writeup explaining why web browsing expands the prompt-injection attack surface and how model training, classifiers, behavioral interventions, and red teaming reduce risk.",
        arxiv: "https://www.anthropic.com/research/prompt-injection-defenses",
      },
      {
        slug: "camel-defeating-prompt-injections",
        title: "Google / Google DeepMind: CaMeL, Defeating Prompt Injections by Design",
        authors: "Google, Google DeepMind, ETH Zurich",
        year: 2025,
        venue: "arXiv / Google Research",
        tags: ["AI Security", "Prompt Injection", "Defense Architecture"],
        description:
          "Proposes a system-layer defense that extracts control and data flow from trusted user queries, prevents untrusted retrieved content from steering program flow, and uses capabilities to block unauthorized data exfiltration.",
        arxiv: "https://arxiv.org/abs/2503.18813",
      },
      {
        slug: "indirect-prompt-injection",
        title:
          "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection",
        authors: "Greshake et al.",
        year: 2023,
        venue: "AISec '23",
        tags: ["AI Security", "Prompt Injection", "LLM Agents"],
        description:
          "Introduces indirect prompt injection: adversarial instructions planted in external data that LLM-integrated applications retrieve at inference time. The paper develops a security taxonomy and demonstrates practical attacks against real-world and synthetic systems, including Bing Chat, code-completion engines, and GPT-4 based tool-using applications.",
        arxiv: "https://arxiv.org/abs/2302.12173",
      },
      {
        slug: "ai-recommendation-poisoning",
        title:
          "Microsoft: AI Recommendation Poisoning, Manipulating Assistant Memory for Profit",
        authors: "Microsoft Defender Security Research Team",
        year: 2026,
        venue: "Microsoft Security Blog",
        tags: ["AI Security", "Memory Poisoning", "Prompt Injection"],
        description:
          "Explains AI Recommendation Poisoning: promotional memory poisoning delivered through helpful-looking AI links that prefill prompts asking assistants to remember a company or source as trusted. Microsoft observed 50 distinct attempts from 31 companies across 14 industries over 60 days.",
        arxiv:
          "https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/",
      },
    ],
  },
];

export const allPapers = sections.flatMap((s) => s.papers);
