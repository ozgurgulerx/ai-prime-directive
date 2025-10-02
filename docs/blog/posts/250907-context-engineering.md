---
title: Context Engineering 
description: Explain the buzz around context engineering 
date: 2025-09-07
tags:
  - RAG 
  - data_integration_for_llms
---

### Context Engineering - What it is? Why it matters? 

Context is everything fed to the LLM during inference. This includes:
- The instructions - a.k.a prompt
- Retrieved facts (e.g. RAG, SQL queries, KG context, etc.)
- History of the conversation (e.g. chat history)
- Tool outputs (e.g. API responses)

Context Engineering is simply how to get out of today's models by optimising the context, which includes all of the above. In practice it is everything that makes your agents better.

Where prompt engineering is used to craft the instruction text, context engineering architects the whole information flow -data, tools, memory, ranking and budgets.
On top of RAG, context engineering adds query planning, re-ranking, compression, memory and policy loops.
So it includes both RAG and prompt-engineering and strives to build a system that optimises the context to generate the best llm outcome. 

Context Engineering - Core Tasks :

1. Context retrieval / generation (RAG) 

Prompt based generation as well as external data integration using advanced models like agentic RAG and integration of Graph Data.

2. Context processing 

*(Skip this part if you are not building an LLM but using existing LLMs from frontier labs)*. 

Is mostly about bringing structured, semi-structured and unstructured data together...

- Marrying structured, semi structured, and unstructured data
JSON, video, and columnar data should all be candidates for the context. Vector search and smart WHERE clauses with Postgres and pgvector is all you really need. You don't need fancy vector DBs like Qdrant or Pinecone. 

- Unstructured Data
Videos should be properly summarized to not flood the context window. Context windows are expanding here but costs are still per token so summarizing is still a very smart thing to do even though it does cause a loss of detail. Depending on your AI's needs, you might have to keep the entire context (e.g. legal documents)

- Semi-structured data
JSON data is notoriously messy and includes keys and data you don't always need. Being smart about the keys and values that the AI actually needs will help overcome hallucinates and memory issues. 

- Structured data
You can't inject every single row of data into the context window. Proper aggregate tables with WHERE clause can do wonders for getting the right data in front of AI without overwhelming it. 

Balancing relevance and completeness is the key to proper context engineering and it's 100% the future of data engineering


Another important task here is mostly  choosing or training a model which will accomodate the length of the context as by definition LLMs have a fixed context length. This can be done using state-space models, or models using sparse-attention or positional encoding tricks to handle long sequences. 

3. Context Management 

Memory hiearchies and compression  & optimization strategies.

Probably not a complete list of what context engineering for #LLM's entails...
Content I have seen -including the infamous survey paper-  is mostly referring to how each of these tasks to be optimised individually. Will need a tool like DSPy with extended capabilities addressing these tasks end-to-end...

- Prompt Engineering 
- Relational structural context 
- Graph context - KG / GNN integration 
- Dynamic context assembly, reranking & orchestration.
- Multimodal context integration
- Reasoning depth control
- Long-multimodal context compression 
- Memory integration 
- Self-reflection
- Long-context handling with SSM's, sparse attention, positional encoding tricks 
- Function calling / Agentic tool use 
- Guardrails - AI Safety / Grounding services

Azur AI Search 





**References**: 

- [2507 A Survey of Context Engineering for Large
Language Models](https://arxiv.org/pdf/2507.13334)
- [Context Engineering for LLMs](https://www.promptingguide.ai/guides/context-engineering-guide)
- *youtube*[Advanced Context Engineering for Agents talk from Human Layer](https://www.youtube.com/watch?v=IS_y40zY-hc)


<!-- Reading time is computed by the blog plugin. -->

