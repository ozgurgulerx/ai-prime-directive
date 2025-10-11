---
title: "True Multi‑Agency"
description: Building real multi‑agent systems beyond chained prompts — roles, shared state, coordination patterns, environments, and rigorous evaluation.
date: 2025-10-06
tags:
  - multi_agency
  - agents
  - orchestration
  - coordination
  - evaluation
---

### Why "true" multi‑agency matters

Most so‑called multi‑agent systems are linear toolchains with new names. True multi‑agency requires concurrent actors negotiating over a shared objective with explicit state, communication protocols, and guardrails.

### Core ingredients

- **Roles & capabilities**: Planners, critics, executors, tools. Each agent exposes a typed capability set, not free‑form prompts.
- **Shared state (blackboard/graph)**: Task graph + facts + artifacts. Updates are atomic and observable.
- **Coordination policy**: Who can act when, and on what. Turn‑taking, parallelism, and arbitration rules are explicit.
- **Environments**: Sandboxed I/O for tools, data, and effects; reproducible sims for learning/test.
- **Evaluation hooks**: Trace, critique, and score plans, actions, and outcomes continuously.

### Coordination patterns that work

- **Supervisor → Workers**: Planner decomposes; workers execute; critic verifies; loop until done.
- **Peer consensus (debate → resolution)**: Multiple planners produce plans; a judge selects/merges.
- **Market/auction**: Tasks bid out to specialized agents; cost/utility drives assignment.
- **Hierarchical control**: High‑level goals → subgoals → executable steps with feedback at each level.

### Communication & memory

- **Messages are structured**: intent, inputs, preconditions, effects, confidence.
- **Memory is layered**: short‑term (episode), long‑term (project), external (vector/graph indices).
- **State transitions are auditable**: every change is attributed to an agent + rationale.

### Safety & governance

- **Policy first**: allowlists, redaction, rate limits, authority boundaries per role.
- **Counterfactual checks**: simulate high‑risk actions in a shadow env; require approval.
- **Human‑in‑the‑loop gates**: elevation for sensitive scopes; rollbacks are first‑class.

### Engineering checklist

- Define the agent roles and their typed capabilities (interfaces + schemas).
- Stand up a shared blackboard/graph with optimistic concurrency + versioned snapshots.
- Implement a coordinator that schedules turns, arbitrates conflicts, and enforces policy.
- Add a critic/evaluator with golden tasks and outcome metrics (precision/latency/cost/SLA).
- Build a replayable environment (sim + fixtures) and wire tracing for every message/action.
- Ship canaries; measure deltas; promote policies by evidence, not vibes.

> North star: multiple specialized agents cooperating over a shared state to deliver a measurable outcome—reliably, safely, and faster than a single generalist.
