export type BookLink = {
  title: string;
  bookmarkTitle: string;
  url: string;
  summary: string;
  status: string;
  tags: string[];
  series: string;
  cover: string;
  fallbackCover: string;
};

export const bookDraftLinks: BookLink[] = [
  {
    title: "Inference Engineering",
    bookmarkTitle: "InferenceEngineering",
    url: "https://docs.google.com/document/d/1VikC06l8cQtPtDbiv6MhVRuPpP0e3SN31Qme_iILkxU/edit?tab=t.0",
    summary: "Notes and book draft on inference architecture, serving, latency, throughput, and GPU/cloud economics.",
    status: "Google Doc",
    tags: ["inference", "serving", "gpu"],
    series: "Book 01",
    cover: "/generated/books/books-folder-inference-engineering.png",
    fallbackCover: "/generated/books/books-folder-inference-engineering.svg",
  },
  {
    title: "Prod Agents",
    bookmarkTitle: "Prod Agents",
    url: "https://docs.google.com/document/d/1UqLG2S5S1hOA9BjSei668Mx98wV5D9pRHMCh29IkO1Q/edit?tab=t.0",
    summary: "Book draft on production agent systems, durable harnesses, memory, tool boundaries, evals, and governance.",
    status: "Google Doc",
    tags: ["agents", "memory", "evals"],
    series: "Book 02",
    cover: "/generated/books/books-folder-prod-agents.png",
    fallbackCover: "/generated/books/books-folder-prod-agents.svg",
  },
  {
    title: "AI & Data",
    bookmarkTitle: "AI & Data",
    url: "https://docs.google.com/document/d/1MtsCbaOSRzPh10FM1_bOvMDSTzy4yviMZbGZhFVRxdI/edit?tab=t.0",
    summary: "Book draft on RAG, context engineering, knowledge graphs, semantic connectors, and enterprise data-to-AI patterns.",
    status: "Google Doc",
    tags: ["data", "rag", "knowledge graphs"],
    series: "Book 03",
    cover: "/generated/books/books-folder-ai-data.png",
    fallbackCover: "/generated/books/books-folder-ai-data.svg",
  },
  {
    title: "AI Security",
    bookmarkTitle: "AI Security",
    url: "https://docs.google.com/document/d/1K7B1ENVMcrCBHtrFKKr1BgFgBeuRHyOgnywka-r2SZY/edit?tab=t.0",
    summary: "Book draft on security patterns for AI systems, agents, data access, tool use, and AI application risk.",
    status: "Google Doc",
    tags: ["security", "governance", "agents"],
    series: "Book 04",
    cover: "/generated/books/books-folder-ai-security.png",
    fallbackCover: "/generated/books/books-folder-ai-security.svg",
  },
  {
    title: "LLM's",
    bookmarkTitle: "LLM's",
    url: "https://docs.google.com/document/d/1DeU-NV7sJhrW4caq0egiCvuFq81YQGQz7We20kANCS0/edit?tab=t.0",
    summary: "Book draft on modern LLMs, reasoning models, multimodal systems, and inference-time compute.",
    status: "Google Doc",
    tags: ["llms", "reasoning", "multimodal"],
    series: "Book 05",
    cover: "/generated/books/books-folder-llms.png",
    fallbackCover: "/generated/books/books-folder-llms.svg",
  },
  {
    title: "RL",
    bookmarkTitle: "RL",
    url: "https://docs.google.com/document/d/1Vcpa89bS_vOK4BUt_aN5KKP2jN_MuBS-adYdcgGKpQ4/edit?tab=t.0",
    summary: "Book draft on reinforcement learning concepts, environments, evaluation loops, and agent training patterns.",
    status: "Google Doc",
    tags: ["reinforcement learning", "agents", "evals"],
    series: "Book 06",
    cover: "/generated/books/books-folder-rl.png",
    fallbackCover: "/generated/books/books-folder-rl.svg",
  },
  {
    title: "AI Coding",
    bookmarkTitle: "AI Coding",
    url: "https://docs.google.com/document/d/18I0MMmuYGlTHqs44-xr8x7u_qACYWcR5iT7gdWMBo9o/edit?tab=t.0",
    summary: "Book draft on AI-assisted coding, agentic development workflows, code review, and software delivery loops.",
    status: "Google Doc",
    tags: ["ai coding", "developer tools", "agents"],
    series: "Book 07",
    cover: "/generated/books/books-folder-ai-coding.png",
    fallbackCover: "/generated/books/books-folder-ai-coding.svg",
  },
];
