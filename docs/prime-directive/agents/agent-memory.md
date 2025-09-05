---
title: Agent memory
description: Design policies for short-term state, long-term profiles, and task ledgers.
status: stable
tags: [agents, memory]
---

## When to use
Multi-step tasks with evolving user intent, preferences, or constraints.

## Architecture sketch
```
Input → Scratchpad (ephemeral) → Tools
      → Profile (long-term) → Ledger (task)
```

## Pitfalls
- Storing everything forever → privacy and drift
- Missing expiry windows and provenance

## Checklist
- [ ] Define memory types and retention windows
- [ ] Source-of-truth + PII handling
- [ ] Summarization with confidence and citations

## Good–Better–Best
- Good: ephemeral scratchpad
- Better: task ledger with rollups
- Best: governed profile with consent and expiry

## Tiny eval snippet
```python
def recall_rate(prompts, memory):
    return sum(int(intent in memory) for intent in prompts) / len(prompts)
```

