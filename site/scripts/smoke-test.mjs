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
  "Ozgur Guler",
  "AI Agents",
  "AI Inference",
  "Build Log",
  "Technical Blog",
  "Books",
  "Talks",
  "Consulting",
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

const talksHtml = readFileSync(new URL("talks/index.html", distDir), "utf8");
const requiredTalkImages = [
  "/images/speaking/fabric-unify-ai-foundry.jpeg",
  "/images/speaking/infobip-zagreb.jpeg",
  "/images/speaking/endeavor-johannesburg.jpeg",
  "/images/speaking/microsoft-startups-feb24.jpeg",
  "/images/speaking/microsoft-partners.jpeg",
  "/images/speaking/digitalzone-istanbul.jpeg",
  "/images/speaking/ytu-startup-house.jpeg",
];

const missingTalkImages = requiredTalkImages.filter((image) => !talksHtml.includes(image));

if (missingTalkImages.length > 0) {
  throw new Error(`Missing expected talk images:\n${missingTalkImages.map((image) => `- ${image}`).join("\n")}`);
}

const blogHtml = readFileSync(new URL("blog/index.html", distDir), "utf8");
const requiredBlogText = [
  "Highlighted from Medium",
  "The Missing Piece in Graph RAG: Graph Attention Networks",
  "Tackle Complex LLM Decision-Making",
  "Boost RAG Performance",
  "Building Agent Harnesses with Microsoft Agent-Framework Durable Extensions",
  "10 RAG Shifts Redefining Production AI in 2026",
];

const missingBlogText = requiredBlogText.filter((text) => !blogHtml.includes(text));

if (missingBlogText.length > 0) {
  throw new Error(`Missing expected Medium blog content:\n${missingBlogText.map((text) => `- ${text}`).join("\n")}`);
}

console.log("Smoke test passed: routes, key text, and public guardrails are aligned.");
