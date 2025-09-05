---
title: RAG 2.0
description: A pipeline approach to retrieval-augmented generation that emphasizes data quality, retrieval policies, and evals.
status: stable
tags: [rag, retrieval, data-quality]
---

## When to use
When domain knowledge is too large or dynamic to fit in context windows, and correctness matters.

## Architecture sketch
```
Ingest → Chunk → Enrich (entities, tables) → Index
             ↓                     ↑
         Policies ← Query → Retrieve → Compose → Evals
```

## Pitfalls
- Over-chunking without semantic boundaries
- Unenriched tables/figures → hallucinated facts
- Missing retrieval policies (filters, recency, diversity)

## Checklist
- [ ] Ground-truth set covering key intents
- [ ] Chunking with structure awareness (headings, tables)
- [ ] Enrichment: entities, citations, table extraction
- [ ] Retrieval policies + diversity
- [ ] Compose with citations and abstain behavior

## Good–Better–Best
- Good: naive vector search, simple compose
- Better: hybrid retrieval, citations, abstain
- Best: structured enrichments, policies, evaluators per intent

## Tiny eval snippet
```python
def evaluate(query, answer, gold):
    return int(citation_present(answer) and contains(gold, answer))
```

