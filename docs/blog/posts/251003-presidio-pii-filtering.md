---
title: Local PII Pre-Filter with Microsoft Presidio + Qwen 2.5
description: Drop an explainable, high-confidence, local PII pre-filter in front of Copilot or any LLM using Microsoft Presidio plus a small CPU SLM.
date: 2025-10-03
tags:
  - pii
  - ai_safety
  - guardrails
  - presidio
  - slm
---

Place a small, local PII pre-filter in front of any LLM by combining deterministic, explainable detection from Microsoft Presidio ([GitHub](https://github.com/microsoft/presidio), [docs](https://microsoft.github.io/presidio/)) with a tiny CPU SLM such as [Qwen 2.5](https://huggingface.co/Qwen) to catch fuzzy or implicit PII—packaged in containers to run on laptops or servers with no GPU. This pre-ingest/pre-prompt guard blocks, redacts, or annotates content before the LLM sees it, emitting auditable spans, types, and confidences to reduce exfiltration risk and deliver compliance-by-construction. It fits as a pre-ingest, pre-prompt, or guardrail-loop step, forwarding only clean text to downstream copilots/LLMs. Live demo: [pii-checker.com](https://pii-checker.com).
