---
title: Graph RAG
description: Use knowledge graphs to enrich retrieval and reasoning over entities and relations.
status: experimental
tags: [rag, graph]
---

## When to use
When relationships matter more than raw text: compliance, research, multi-hop questions.

## Architecture sketch
```
Text → NER/RE → Triples → Graph DB
Query (entities/paths) → Retrieve → Compose → Evals
```

## Pitfalls
- Noisy extraction → brittle paths
- Over-indexing without clear query policies

## Checklist
- [ ] Define entity/edge schema
- [ ] Extraction evals on representative corpus
- [ ] Hybrid retrieve: graph paths + text

## Good–Better–Best
- Good: simple entity linking
- Better: typed relations and path constraints
- Best: learned policies + feedback loops

## Tiny eval snippet
```python
def path_coverage(query, graph_paths):
    return any(required_edge in p for p in graph_paths)
```

