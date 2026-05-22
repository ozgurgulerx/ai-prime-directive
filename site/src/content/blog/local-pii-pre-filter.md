---
title: "Local PII Pre-Filter with Microsoft Presidio and Qwen 2.5"
date: 2025-10-03
summary: "A local pre-prompt guardrail using Presidio and a small CPU model to reduce PII exposure before LLM calls."
tags: ["security", "privacy", "guardrails"]
---

A small local pre-filter can catch deterministic and fuzzy PII before content reaches an LLM. The pattern fits pre-ingest, pre-prompt, and guardrail-loop stages where auditability matters.

