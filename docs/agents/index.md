---
title: Agents
description: Notes and artifacts on agent systems, context engineering, memory, and workflow orchestration.
---

# Agents

Agent systems need more than a loop around a model. They need clear state, bounded
tool access, traceable context, evaluation, and human-readable failure modes.

## Current Themes

<div class="home-grid home-grid--two" markdown="1">

<article class="record-card" markdown="1">

### Workflow Orchestration

State machines, typed outputs, routing, tool contracts, and replayable execution.

**What it demonstrates:** designing agent systems that can be debugged and improved
after the first demo.

</article>

<article class="record-card" markdown="1">

### Context Engineering

Context providers, memory retrieval, instruction hierarchy, tool output compression,
and task-local state.

**What it demonstrates:** keeping agent behavior grounded without overloading the
context window.

</article>

<article class="record-card" markdown="1">

### Evaluation

Task success criteria, regression suites, hallucination checks, handoff quality, and
operational telemetry.

**What it demonstrates:** moving from impressive demos to repeatable behavior.

</article>

<article class="record-card" markdown="1">

### Domain Deployment

Finance, aviation, legal/docops, manufacturing, tutoring, and research assistant
prototypes where workflow shape matters as much as model quality.

**What it demonstrates:** matching autonomy level to domain risk and operator trust.

</article>

</div>

## Related Artifacts

| Artifact | Status | What It Demonstrates |
| --- | --- | --- |
| [Agent Workflow Orchestration](../blog/posts/251011-agent-workflow-orchestration.md) | Case note | Shared state, typed outputs, and replayable agent coordination. |
| [Forward Deployed Engineering for Building AI Agents](../blog/posts/250911-forward-deployed-engineering.md) | Essay | Product discovery from inside domain workflows. |
| [Context Engineering](../prime-directive/agents/context-engineering.md) | Note | Context as a first-class design surface for agents. |
| [Agent Memory](../prime-directive/agents/agent-memory.md) | Note | Memory patterns and failure modes. |
