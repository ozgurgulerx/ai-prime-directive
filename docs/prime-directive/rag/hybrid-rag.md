---
title: Hybrid RAG
description: When and how to combine multiple retrieval strategies.
---

# Hybrid RAG

Outline what to mix (keyword, dense, graph), selection policies, and fallbacks.

## Pitfalls
- Unclear selection policies → inconsistent results
- Over-fetching → latency and cost

## Checklist
- [ ] Define routing criteria (by query intent)
- [ ] Instrument retrieval choices and outcomes
- [ ] Add evals per route (e.g., factuality, coverage)
