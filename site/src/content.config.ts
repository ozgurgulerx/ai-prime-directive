import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const tags = z.array(z.string()).default([]);

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags,
    sourceUrl: z.string().optional(),
    publication: z.string().optional(),
    pinned: z.boolean().optional(),
  }),
});

const buildLog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/build-log" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags,
    artifact: z.string().optional(),
    repo: z.string().optional(),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/books" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    status: z.string(),
    description: z.string(),
    cover: z.string(),
    link: z.string().optional(),
    tags,
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/talks" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    location: z.string().optional(),
    type: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    video: z.string().optional(),
    tags,
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    area: z.enum(["agents", "inference", "data", "security", "domain"]),
    status: z.string(),
    summary: z.string(),
    demonstrates: z.string(),
    stack: z.array(z.string()).default([]),
    url: z.string().optional(),
    linkLabel: z.string().optional(),
  }),
});

const investments = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/investments" }),
  schema: z.object({
    title: z.string(),
    url: z.string(),
    summary: z.string(),
    relationship: z.string(),
    tags,
  }),
});

export const collections = {
  blog,
  "build-log": buildLog,
  books,
  talks,
  projects,
  investments,
};
