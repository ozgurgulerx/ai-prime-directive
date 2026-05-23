import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const model = process.env.GEMINI_IMAGE_MODEL || "gemini-3-pro-image-preview";

const promptDir = new URL("../prompts/nano-banana/", import.meta.url);
const outputRoot = new URL("../public/generated/", import.meta.url);

const jobs = [
  ["bookmark-prompt-engineering-for-generative-ai.md", "books/bookmark-prompt-engineering-for-generative-ai.png", "2:3"],
  ["bookmark-llms-generative-ai-healthcare.md", "books/bookmark-llms-generative-ai-healthcare.png", "2:3"],
  ["ai-inference-engineering.md", "books/ai-inference-engineering.png", "2:3"],
  ["ai-agents-in-production.md", "books/ai-agents-in-production.png", "2:3"],
  ["ai-data-integration-patterns.md", "books/ai-data-integration-patterns.png", "2:3"],
  ["ai-security.md", "books/ai-security.png", "2:3"],
  ["modern-llms.md", "books/modern-llms.png", "2:3"],
  ["leveraging-technical-expertise.md", "books/leveraging-technical-expertise.png", "2:3"],
  ["leveraging-ai-expertise.md", "books/leveraging-ai-expertise.png", "2:3"],
  ["homepage-hero-abstract.md", "visuals/homepage-hero-abstract.png", "16:9"],
  ["agents-section-visual.md", "visuals/agents-section-visual.png", "16:9"],
  ["inference-section-visual.md", "visuals/inference-section-visual.png", "16:9"],
  ["build-log-og-image.md", "og/build-log-og-image.png", "16:9"],
  ["blog-og-image.md", "og/blog-og-image.png", "16:9"],
  ["talks-og-image.md", "og/talks-og-image.png", "16:9"],
  ["startup-work-og-image.md", "og/startup-work-og-image.png", "16:9"],
  ["consulting-og-image.md", "og/consulting-og-image.png", "16:9"],
  ["og-home.md", "og/og-home.png", "16:9"],
  ["og-agents.md", "og/og-agents.png", "16:9"],
  ["og-inference.md", "og/og-inference.png", "16:9"],
  ["og-books.md", "og/og-books.png", "16:9"],
  ["favicon-concept.md", "visuals/favicon-concept.png", "1:1"],
];

if (!apiKey) {
  console.log("No GEMINI_API_KEY or GOOGLE_API_KEY found. Prompt files are ready; skipping image generation.");
  process.exit(0);
}

const ai = new GoogleGenAI({ apiKey });

for (const [promptFile, relativeOutput, aspectRatio] of jobs) {
  const promptPath = new URL(promptFile, promptDir);
  if (!existsSync(promptPath)) {
    console.warn(`Missing prompt: ${promptFile}`);
    continue;
  }

  const outputPath = new URL(relativeOutput, outputRoot);
  mkdirSync(new URL("./", outputPath), { recursive: true });

  const prompt = readFileSync(promptPath, "utf8");

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseModalities: ["Image"],
        responseFormat: {
          image: {
            aspectRatio,
            imageSize: "2K",
          },
        },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((part) => part.inlineData);

    if (!imagePart?.inlineData?.data) {
      console.warn(`No image returned for ${promptFile}`);
      continue;
    }

    writeFileSync(outputPath, Buffer.from(imagePart.inlineData.data, "base64"));
    console.log(`Generated ${join("public/generated", relativeOutput)} from ${basename(promptFile)}`);
  } catch (error) {
    const status = error?.status || error?.code;
    const message = error?.message || "Unknown image generation error";

    if (status === 429 || message.includes("RESOURCE_EXHAUSTED") || message.includes("credits are depleted")) {
      console.warn("Gemini image generation is configured, but billing/prepayment credits are unavailable. Keeping prompt files and local placeholders.");
      process.exit(0);
    }

    console.warn(`Image generation failed for ${promptFile}: ${message}`);
    process.exit(1);
  }
}
