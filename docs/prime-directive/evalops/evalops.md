---
title: EvalOps
description: Treat evaluations like tests—fast feedback, regression safety, and shared truth.
status: stable
tags: [evals, ops]
---

## When to use
Always. Start tiny, grow with coverage.

## Architecture sketch
```
Suites → Runner → Scores → Gates → Dashboards
```

## Pitfalls
- Vibes over metrics
- Only aggregate metrics without slices

## Checklist
- [ ] Golden set with categories and slices
- [ ] Prompt + retrieval snapshots
- [ ] Regression gates in CI/CD

## Good–Better–Best
- Good: manual runs on a small set
- Better: CI hook + dashboards
- Best: canary deploy + feedback loops

## Tiny eval snippet
```python
def pass_fail(scores, threshold=0.7):
    return sum(int(s>=threshold) for s in scores) / len(scores)
```

