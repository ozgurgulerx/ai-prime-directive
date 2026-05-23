export type BookLink = {
  title: string;
  url: string;
  summary: string;
  status: string;
  tags: string[];
};

export const directBookLinks: BookLink[] = [
  {
    title: "Prompt Engineering for Generative AI",
    url: "https://learning.oreilly.com/library/view/prompt-engineering-for/9781098153427/",
    summary: "Direct O'Reilly book link from the Books favorites folder.",
    status: "O'Reilly book",
    tags: ["llms", "prompt engineering", "generative ai"],
  },
  {
    title: "LLMs and Generative AI for Healthcare",
    url: "https://learning.oreilly.com/library/view/llms-and-generative/9781098160913/",
    summary: "Direct O'Reilly book link from the Books favorites folder.",
    status: "O'Reilly book",
    tags: ["llms", "healthcare", "generative ai"],
  },
];

export const favoriteBookFeeds: BookLink[] = [
  {
    title: "Manning MEAP Catalog",
    url: "https://www.manning.com/meap-catalog",
    summary: "Early-access technical books from Manning.",
    status: "publisher feed",
    tags: ["technical books", "meap", "early access"],
  },
  {
    title: "Best AI and Machine Learning Books",
    url: "https://www.amazon.com/Best-Sellers-AI-Machine-Learning/zgbs/books/3887",
    summary: "Amazon bestseller feed for AI and machine learning books.",
    status: "discovery feed",
    tags: ["ai", "machine learning", "amazon"],
  },
  {
    title: "Machine Learning New Releases",
    url: "https://www.amazon.com/gp/new-releases/books/3887",
    summary: "New releases in machine learning and AI.",
    status: "discovery feed",
    tags: ["machine learning", "new releases", "amazon"],
  },
  {
    title: "Cloud Computing New Releases",
    url: "https://www.amazon.com/gp/new-releases/books/10806612011",
    summary: "New releases in cloud computing.",
    status: "discovery feed",
    tags: ["cloud", "infrastructure", "amazon"],
  },
  {
    title: "Best Cloud Computing Books",
    url: "https://www.amazon.com/Best-Sellers-Kindle-Store-Cloud-Computing/zgbs/digital-text/16977223011",
    summary: "Bestseller feed for cloud computing books.",
    status: "discovery feed",
    tags: ["cloud", "infrastructure", "amazon"],
  },
  {
    title: "Python New Releases",
    url: "https://www.amazon.com/gp/new-releases/books/285856",
    summary: "New Python programming book releases.",
    status: "discovery feed",
    tags: ["python", "programming", "amazon"],
  },
  {
    title: "Best Python Books",
    url: "https://www.amazon.com/Best-Sellers-Books-Python-Programming/zgbs/books/285856",
    summary: "Bestseller feed for Python programming books.",
    status: "discovery feed",
    tags: ["python", "programming", "amazon"],
  },
  {
    title: "Computers and Technology New Releases",
    url: "https://www.amazon.com/gp/new-releases/books/5/ref=zg_bsnr_unv_books_2_549646_1",
    summary: "Broad technical new-release feed for computer and technology books.",
    status: "discovery feed",
    tags: ["technology", "computer science", "amazon"],
  },
  {
    title: "Computer Programming New Releases",
    url: "https://www.amazon.com/gp/new-releases/books/3839/ref=zg_bsnr_nav_b_2_5",
    summary: "New releases in computer programming.",
    status: "discovery feed",
    tags: ["programming", "software", "amazon"],
  },
  {
    title: "Software Development New Releases",
    url: "https://www.amazon.com/gp/new-releases/books/4016/ref=zg_b_hnr_4016_1",
    summary: "New releases in software development.",
    status: "discovery feed",
    tags: ["software", "engineering", "amazon"],
  },
  {
    title: "Best Web Development and Design Books",
    url: "https://www.amazon.com/Best-Sellers-Books-Web-Development-Design/zgbs/books/3510/ref=zg_bs_nav_b_2_5",
    summary: "Bestseller feed for web development and design books.",
    status: "discovery feed",
    tags: ["web", "design", "amazon"],
  },
  {
    title: "Computer Vision and Pattern Recognition",
    url: "https://www.amazon.com/Best-Sellers-Books-Computer-Vision-Pattern-Recognition/zgbs/books/132552011/ref=zg_bs_nav_b_4_3887",
    summary: "Computer vision and pattern recognition book feed.",
    status: "discovery feed",
    tags: ["computer vision", "machine learning", "amazon"],
  },
  {
    title: "Data Warehousing New Releases",
    url: "https://www.amazon.com/gp/new-releases/books/3655",
    summary: "New releases in data warehousing.",
    status: "discovery feed",
    tags: ["data", "warehousing", "amazon"],
  },
  {
    title: "Quantum Theory New Releases",
    url: "https://www.amazon.com/gp/new-releases/books/14581",
    summary: "New releases in quantum theory.",
    status: "discovery feed",
    tags: ["quantum", "science", "amazon"],
  },
  {
    title: "Best Quantum Theory Books",
    url: "https://www.amazon.com/Best-Sellers-Kindle-Store-Quantum-Theory/zgbs/digital-text/159799011/ref=zg_bsnr_tab_t_digital-text_bs",
    summary: "Bestseller feed for quantum theory books.",
    status: "discovery feed",
    tags: ["quantum", "science", "amazon"],
  },
  {
    title: "Neuroscience New Releases",
    url: "https://www.amazon.com/gp/new-releases/books/227637",
    summary: "New releases in neuroscience.",
    status: "discovery feed",
    tags: ["neuroscience", "cognition", "amazon"],
  },
  {
    title: "Best Neuroscience Books",
    url: "https://www.amazon.com/gp/bestsellers/digital-text/157199011/ref=zg_b_bs_157199011_1",
    summary: "Bestseller feed for neuroscience books.",
    status: "discovery feed",
    tags: ["neuroscience", "cognition", "amazon"],
  },
  {
    title: "Memory New Releases",
    url: "https://www.amazon.com/gp/new-releases/books/4743",
    summary: "New releases around memory and cognition.",
    status: "discovery feed",
    tags: ["memory", "cognition", "amazon"],
  },
  {
    title: "Startup New Releases",
    url: "https://www.amazon.com/gp/new-releases/digital-text/8493731011",
    summary: "New releases in startup and entrepreneurship books.",
    status: "discovery feed",
    tags: ["startups", "business", "amazon"],
  },
  {
    title: "Best Venture Capital Books",
    url: "https://www.amazon.com/Best-Sellers-Books-Venture-Capital/zgbs/books/10020679011/ref=zg_bs_pg_1?_encoding=UTF8&pg=1",
    summary: "Bestseller feed for venture capital books.",
    status: "discovery feed",
    tags: ["venture capital", "startups", "amazon"],
  },
  {
    title: "Financial Services New Releases",
    url: "https://www.amazon.com/gp/new-releases/books/10020696011",
    summary: "New releases in financial services.",
    status: "discovery feed",
    tags: ["finance", "financial services", "amazon"],
  },
  {
    title: "FinTech Book Search",
    url: "https://www.amazon.com/Books-FinTech/s?rh=n%3A283155%2Cp_28%3AFinTech",
    summary: "Saved Amazon search for FinTech books.",
    status: "discovery feed",
    tags: ["fintech", "finance", "amazon"],
  },
  {
    title: "Biotech New Releases",
    url: "https://www.amazon.com/gp/new-releases/books/13518",
    summary: "New releases in biotechnology.",
    status: "discovery feed",
    tags: ["biotech", "science", "amazon"],
  },
  {
    title: "Best Books of the Year So Far",
    url: "https://www.amazon.com/b?ref=ess_dp_epicks_r&node=3003015011",
    summary: "Amazon editors' broad book discovery feed.",
    status: "editor feed",
    tags: ["general reading", "editors", "amazon"],
  },
  {
    title: "Best Books of the Month: Nonfiction",
    url: "https://www.amazon.com/b?ref=ess_dp_epicks_T2&node=17276799011",
    summary: "Amazon editors' nonfiction monthly picks.",
    status: "editor feed",
    tags: ["nonfiction", "editors", "amazon"],
  },
];
