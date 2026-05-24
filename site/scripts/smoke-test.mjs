import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const requiredRoutes = [
  "index.html",
  "agents/index.html",
  "inference/index.html",
  "build-log/index.html",
  "blog/index.html",
  "books/index.html",
  "talks/index.html",
  "consulting/index.html",
  "investments/index.html",
  "startup-notes/index.html",
  "prime-directive/index.html",
  "about/index.html",
];

const requiredText = [
  "Özgür Güler",
  "AI Agents",
  "LLM Inference",
  "Build Log",
  "Technical Blog",
  "Books",
  "Talks",
  "Consulting",
  "Startups",
  "Startup Work",
  "AI Prime Directive",
];

const prohibitedPublicText = [
  "future London employer",
  "AI consultant London",
  "London employer",
  "invest in the future",
  "visionary founders",
  "trusted by",
  "founder names",
  "/Users/",
];

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function frontmatterField(content, field) {
  const line = content.split("\n").find((item) => item.startsWith(`${field}:`));

  if (!line) {
    return undefined;
  }

  return line.slice(field.length + 1).trim().replace(/^["']|["']$/g, "");
}

const distDir = new URL("../dist/", import.meta.url);
const missingRoutes = requiredRoutes.filter((route) => !existsSync(new URL(route, distDir)));

if (missingRoutes.length > 0) {
  throw new Error(`Missing built routes:\n${missingRoutes.map((route) => `- ${route}`).join("\n")}`);
}

const html = walk(distDir.pathname)
  .filter((path) => path.endsWith(".html"))
  .map((path) => readFileSync(path, "utf8"))
  .join("\n");

const missingText = requiredText.filter((text) => !html.includes(text));

if (missingText.length > 0) {
  throw new Error(`Missing expected public text:\n${missingText.map((text) => `- ${text}`).join("\n")}`);
}

const prohibitedMatches = prohibitedPublicText.filter((text) => html.includes(text));

if (prohibitedMatches.length > 0) {
  throw new Error(`Found prohibited public text:\n${prohibitedMatches.map((text) => `- ${text}`).join("\n")}`);
}

const requiredAnalyticsText = [
  'src="https://plausible.io/js/script.js"',
  'data-domain="ozgurguler.org"',
  "plausible-event-name=email_click",
  "plausible-event-name=consulting_click",
  "plausible-event-name=talk_link_click",
  "plausible-event-name=download_or_artifact_click",
];

const missingAnalyticsText = requiredAnalyticsText.filter((text) => !html.includes(text));

if (missingAnalyticsText.length > 0) {
  throw new Error(`Missing analytics integration text:\n${missingAnalyticsText.map((text) => `- ${text}`).join("\n")}`);
}

const talksHtml = readFileSync(new URL("talks/index.html", distDir), "utf8");
const requiredTalkText = ["Building Successful AI Products", 'href="#workshop-topics"', 'id="workshop-topics"'];
const requiredTalkImages = [
  "/images/speaking/fabric-unify-ai-foundry.jpeg",
  "/images/speaking/infobip-zagreb.jpeg",
  "/images/speaking/endeavor-johannesburg.jpeg",
  "/images/speaking/microsoft-startups-feb24.jpeg",
  "/images/speaking/microsoft-partners.jpeg",
  "/images/speaking/digitalzone-istanbul.jpeg",
  "/images/speaking/ytu-startup-house.jpeg",
];

const missingTalkText = requiredTalkText.filter((text) => !talksHtml.includes(text));
const missingTalkImages = requiredTalkImages.filter((image) => !talksHtml.includes(image));

if (missingTalkText.length > 0) {
  throw new Error(`Missing expected talk page text:\n${missingTalkText.map((text) => `- ${text}`).join("\n")}`);
}

if (missingTalkImages.length > 0) {
  throw new Error(`Missing expected talk images:\n${missingTalkImages.map((image) => `- ${image}`).join("\n")}`);
}

const buildLogHtml = readFileSync(new URL("build-log/index.html", distDir), "utf8");
const requiredBuildLogProjectText = [
  "Summer House Guide",
  "https://summer-house-guide.redflower-7ad9e33f.uksouth.azurecontainerapps.io",
  "AI Infra Investment Assistant",
  "https://ai-infra-fund-frontend.azurewebsites.net",
  "Build Atlas",
  "https://buildatlas.net/",
  "startup news",
  "builder patterns",
];

const missingBuildLogProjectText = requiredBuildLogProjectText.filter((text) => !buildLogHtml.includes(text));

if (missingBuildLogProjectText.length > 0) {
  throw new Error(`Missing expected build-log project links:\n${missingBuildLogProjectText.map((text) => `- ${text}`).join("\n")}`);
}

const blogHtml = readFileSync(new URL("blog/index.html", distDir), "utf8");
const requiredBlogText = [
  "Highlighted From Medium",
  "The Missing Piece in Graph RAG: Graph Attention Networks",
  "Tackle Complex LLM Decision-Making",
  "Boost RAG Performance",
  "Building Agent Harnesses with Microsoft Agent-Framework Durable Extensions",
  "10 RAG Shifts Redefining Production AI in 2026",
  "Why do RAG pipelines fail? Advanced RAG Patterns — Part1",
  "How to improve RAG peformance — Advanced RAG Patterns — Part2",
];

const missingBlogText = requiredBlogText.filter((text) => !blogHtml.includes(text));

if (missingBlogText.length > 0) {
  throw new Error(`Missing expected Medium blog content:\n${missingBlogText.map((text) => `- ${text}`).join("\n")}`);
}

const prohibitedBlogText = [
  "March &#39;26 AI Funding: Infrastructure Up, App Layer Down",
  "March '26 AI Funding: Infrastructure Up, App Layer Down",
  "September&#39;s Mega Rounds",
  "September's Mega Rounds",
];

const prohibitedBlogMatches = prohibitedBlogText.filter((text) => blogHtml.includes(text));

if (prohibitedBlogMatches.length > 0) {
  throw new Error(`Found removed blog posts:\n${prohibitedBlogMatches.map((text) => `- ${text}`).join("\n")}`);
}

const requiredBlogThumbnailText = [
  'class="post-thumbnail"',
  'src="https://cdn-images-1.medium.com/max/1024/1*MiEQeTvUfK-F33ukThcrrw.png"',
  'src="https://cdn-images-1.medium.com/max/1024/1*ipXKNa54t6WA3R-6f6yG0w.jpeg"',
  'src="https://miro.medium.com/v2/resize:fit:700/1*Ko-TYWtzJhZNistEhQSwwQ.png"',
  'src="https://miro.medium.com/v2/resize:fit:700/1*GCAAtGC5r3Pm5kVr3jbnyw.png"',
  'src="https://miro.medium.com/v2/resize:fit:700/0*iAAHn2Vl2N717bZj.png"',
  'src="/generated/placeholders/advanced-rag-patterns.svg"',
  'alt="Title image for Building Production AI with Microsoft\'s Agent Framework: Credit Underwriting Case Study"',
  'alt="Title image for 10 RAG Shifts Redefining Production AI in 2026"',
  'alt="Title image for Tackle Complex LLM Decision-Making with Language Agent Tree Search (LATS) and GPT-4o"',
  'alt="Title image for Boost RAG Performance: Enhance Vector Search with Metadata Filters in Azure AI Search"',
  'alt="Title image for Generative UI"',
  '<span class="status publication-status">Microsoft Azure</span>',
  '<span class="status publication-status">TDS Archive</span>',
  '<span class="status publication-status">Cloud Atlas</span>',
];

const missingBlogThumbnailText = requiredBlogThumbnailText.filter((text) => !blogHtml.includes(text));

if (missingBlogThumbnailText.length > 0) {
  throw new Error(`Missing expected blog thumbnails or publisher labels:\n${missingBlogThumbnailText.map((text) => `- ${text}`).join("\n")}`);
}

const blogContentDir = new URL("../src/content/blog/", import.meta.url);
const blogPostFiles = readdirSync(blogContentDir).filter((file) => file.endsWith(".md"));
const mirroredPostsMissingImages = blogPostFiles
  .filter((file) => {
    const content = readFileSync(new URL(file, blogContentDir), "utf8");
    return content.includes("sourceUrl:") && !/^image:/m.test(content);
  });

if (mirroredPostsMissingImages.length > 0) {
  throw new Error(`Mirrored blog posts are missing thumbnail image metadata:\n${mirroredPostsMissingImages.map((file) => `- ${file}`).join("\n")}`);
}

const blogPostsMissingImages = blogPostFiles
  .filter((file) => {
    const content = readFileSync(new URL(file, blogContentDir), "utf8");
    return !/^image:/m.test(content);
  });

if (blogPostsMissingImages.length > 0) {
  throw new Error(`Blog posts are missing thumbnail image metadata:\n${blogPostsMissingImages.map((file) => `- ${file}`).join("\n")}`);
}

const localBlogImagesMissingFiles = blogPostFiles.flatMap((file) => {
  const content = readFileSync(new URL(file, blogContentDir), "utf8");
  const image = frontmatterField(content, "image");

  if (!image?.startsWith("/")) {
    return [];
  }

  return existsSync(new URL(`../public${image}`, import.meta.url)) ? [] : [`${file} (${image})`];
});

if (localBlogImagesMissingFiles.length > 0) {
  throw new Error(`Local blog thumbnail files are missing:\n${localBlogImagesMissingFiles.map((file) => `- ${file}`).join("\n")}`);
}

const blogRowCount = blogHtml.match(/class="row-card/g)?.length ?? 0;
const blogThumbnailCount = blogHtml.match(/class="post-thumbnail"/g)?.length ?? 0;

if (blogRowCount !== blogThumbnailCount) {
  throw new Error(`Blog row thumbnail count mismatch: ${blogThumbnailCount} thumbnails for ${blogRowCount} rows.`);
}

const blogDetailPagesMissingThumbnails = blogPostFiles.flatMap((file) => {
  const content = readFileSync(new URL(file, blogContentDir), "utf8");
  const image = frontmatterField(content, "image");
  const slug = file.replace(/\.md$/, "");
  const detailPage = new URL(`blog/${slug}/index.html`, distDir);

  if (!existsSync(detailPage)) {
    return [`${file} (missing built detail page)`];
  }

  const detailHtml = readFileSync(detailPage, "utf8");
  const missing = [
    !detailHtml.includes('class="post-hero-image"') && "post-hero-image",
    image && !detailHtml.includes(`src="${image}"`) && image,
  ].filter(Boolean);

  return missing.length > 0 ? [`${file} (${missing.join(", ")})`] : [];
});

if (blogDetailPagesMissingThumbnails.length > 0) {
  throw new Error(
    `Blog detail pages are missing configured thumbnail images:\n${blogDetailPagesMissingThumbnails
      .map((file) => `- ${file}`)
      .join("\n")}`,
  );
}

const booksHtml = readFileSync(new URL("books/index.html", distDir), "utf8");
const requiredBookText = [
  "Inference Engineering",
  "AI Agents in Production",
  "AI Data Integration Patterns",
  "AI Security",
  "Fundamentals of LLMs",
  "Reinforcement Learning in LLM Training",
  "AI-Assisted Software Engineering",
];
const prohibitedBookText = [
  "Favourite discovery feeds",
  "Özgür writing projects",
  "Prompt Engineering for Generative AI",
  "LLMs and Generative AI for Healthcare",
  "Manning MEAP Catalog",
];

const missingBookText = requiredBookText.filter((text) => !booksHtml.includes(text));
const prohibitedBookMatches = prohibitedBookText.filter((text) => booksHtml.includes(text));

if (missingBookText.length > 0) {
  throw new Error(`Missing expected Books- entries:\n${missingBookText.map((text) => `- ${text}`).join("\n")}`);
}

if (prohibitedBookMatches.length > 0) {
  throw new Error(`Found removed book content:\n${prohibitedBookMatches.map((text) => `- ${text}`).join("\n")}`);
}

console.log("Smoke test passed: routes, key text, and public guardrails are aligned.");
