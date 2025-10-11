---
title: "Production Agent Workflows: Orchestration & Observability"
description: Building production-grade agent systems requires typed workflow graphs, fan-out/fan-in execution, checkpointing, HITL gates, and full OpenTelemetry instrumentation—from design to deployment.
date: 2025-10-11
tags:
  - agents
  - workflows
  - orchestration
  - telemetry
  - opentelemetry
  - production_engineering
---

### Why workflow orchestration matters for agents

Most agent demos are linear prompt chains with fragile state management. Production systems need **typed workflow graphs** with explicit coordination, checkpoint/resume, human-in-the-loop gates, and comprehensive telemetry. Without these primitives, agent systems fail silently, can't be debugged, and don't scale beyond toy examples.

### Core workflow capabilities

**Typed workflow graph**  
Define agents, edges, fan-out/fan-in points, sub-workflows, and decision gates as a declarative graph. Every node has typed inputs/outputs (Pydantic schemas). The runtime enforces contracts and rejects invalid transitions.

**Fan-out/fan-in execution**  
Launch parallel agent tasks (KYC, fraud, income verification) and synchronize results. The runtime manages concurrent execution, collects outputs, and handles partial failures with configurable policies (fail-fast vs. best-effort).

**Checkpointing & resume**  
Persist workflow state at named checkpoints. Resume from any checkpoint on failure, replay, or A/B testing scenarios. Checkpoints are versioned and include full shared state + conversation memory snapshots.

**Human-in-the-loop (HITL) gates**  
Explicit pause/resume points for human decisions. The workflow emits a structured request, waits for approval/rejection/adjustment, then resumes with the response injected into shared state. HITL gates are first-class nodes with telemetry coverage.

**Shared state & memory**  
Agents communicate via a shared state dictionary and thread-scoped conversation memory. State updates are atomic and observable. Memory is queryable for replay and debugging.

---

### Telemetry as a first-class concern

**OpenTelemetry end-to-end**  
Every workflow run, agent invocation, tool call, fan-out boundary, checkpoint, and HITL gate emits structured spans with trace and span IDs. FastAPI auto-instrumentation captures HTTP boundaries; custom spans cover workflow internals.

**Progress tracking**  
Weighted progress calculation across workflow stages. Each phase contributes a normalized weight to overall progress (e.g., doc intake 6%, parallel fan-out 32%, risk ensemble 22%). Real-time SSE streams expose granular progress + trace IDs to front-ends.

**Structured event streaming**  
Server-sent events (SSE) deliver typed JSON payloads for every workflow event—stage transitions, agent outputs, checkpoints, HITL requests, errors. Each event includes:
- Timestamp (ISO 8601)
- Event type (`progress`, `waiting`, `checkpoint.saved`, `hitl.resolved`)
- Phase identifier
- Status (`running`, `waiting`, `done`, `error`)
- Overall progress + step progress ratios
- Trace ID + span ID for correlation with Jaeger

**Jaeger integration**  
Docker Compose stack with OTEL Collector + Jaeger. Deep-link from run results to full trace timeline. Trace visualization shows agent orchestration, tool latencies, checkpoint saves, HITL wait durations, and error propagation.

**GenAI span attributes**  
Custom attributes for agent spans: `genai.agent`, `genai.model`, `genai.tokens.prompt`, `genai.tokens.completion`, `genai.latency_ms`, `genai.cache_hit`. Ready for Azure Monitor integration and cost analysis.

---

### Workflow visualization

**GraphViz export**  
Generate SVG workflow diagrams with color-coded node types:
- Agents (boxes)
- Decision points (diamonds)
- Fan-out/fan-in (octagons)
- HITL gates (hexagons, highlighted)
- Sub-workflows (double octagons)
- Start/end (ovals)

Edges show dependencies. The diagram is queryable via API (`GET /workflow/graph.svg`) for documentation or real-time UI rendering.

**Live trace timeline**  
Jaeger UI shows the full execution timeline—parallel agent fan-out, synchronization barriers, checkpoint saves, HITL pauses. Spans are nested to reflect orchestration hierarchy (workflow → stage → agent → tool).

---

### Implementation highlights

**RunContext abstraction**  
A context object threads through the entire workflow. Provides:
- `emit(event_type, message, payload)` → SSE stream
- `save_checkpoint(id, label, data)` → Persistent checkpoint
- `request_hitl(payload)` → Async HITL gate (blocks until response)
- `snapshot()` → State + memory + checkpoints for debugging

**ProgressTracker**  
Stage-aware progress tracking with weighted contribution. Tracks step progress within a stage and computes overall progress by summing weighted phase contributions. Auto-publishes to SSE stream with trace/span IDs.

**Deterministic agent shims**  
Development-time shims for Microsoft Agent Framework (pre-release). Agents return deterministic typed outputs while keeping integration points ready. Swap to `ChatClientAgent` when the SDK is released—contracts stay identical.

**File-based tooling**  
Tools read from local synthetic files (applications, identity docs, bureau reports, fraud signals) to simulate external APIs. Every tool call is instrumented with custom OTEL spans for latency + error tracking.

---

### Production patterns

**Event-driven API design**  
- `POST /runs` → Start workflow, returns `run_id` immediately
- `GET /runs/{run_id}/events` → SSE stream (long-lived connection)
- `POST /runs/{run_id}/hitl` → Fulfill HITL request
- `POST /runs/{run_id}/resume` → Resume from checkpoint
- `GET /runs/{run_id}/state` → Snapshot shared state + memory

**Graceful degradation**  
Workflow tolerates missing OTEL collector (falls back to console export), missing Graphviz (returns fallback SVG), and missing checkpoints (replays from start).

**Policy-first orchestration**  
Fan-out policies (fail-fast vs. best-effort), HITL timeout policies, and checkpoint retention policies are configurable via environment. Policies are enforced at runtime, not post-hoc.

---

### Observability stack

**Local development**  
```bash
docker-compose up  # Backend + OTEL Collector + Jaeger
```

**Jaeger access**  
<http://localhost:16686> → Select service `credit-desk-lite` → View traces

**Trace correlation**  
Every SSE event includes `trace_id` and `span_id`. Front-ends can deep-link to Jaeger for root-cause analysis. Example event payload:
```json
{
  "ts": "2025-10-11T08:23:14.123Z",
  "type": "progress",
  "phase": "risk_ensemble",
  "status": "running",
  "message": "Risk PD model complete",
  "progress": 0.54,
  "step_progress": 0.33,
  "trace_id": "a1b2c3d4e5f6...",
  "span_id": "f9e8d7c6...",
  "meta": {"model": "gpt-4o", "tokens": 1234}
}
```

**Azure Monitor ready**  
Point `OTLP_ENDPOINT` to Azure Monitor OTLP ingestion. GenAI attributes map to Azure Monitor custom metrics for cost/latency dashboards.

---

### Why this approach works

**Contracts over chaos**  
Typed schemas for every edge. Runtime validates inputs/outputs and rejects invalid transitions early. Errors are attributed to specific agents/tools with full trace context.

**Replay & debugging**  
Checkpoint any run, replay from any stage. Combine with trace timeline to isolate failures. Shared state snapshots enable diffing between checkpoints.

**Observable by default**  
Every action emits telemetry. No manual instrumentation required—the runtime auto-instruments workflow primitives. Add custom spans for domain-specific logic.

**Human-in-the-loop as first-class**  
HITL gates are explicit workflow nodes, not hacks. They emit waiting events, track pause duration, and inject human responses into shared state with full attribution.

**Front-end ready**  
SSE + trace IDs enable rich UIs—live progress bars, trace timelines, state diffing, workflow graph rendering. No polling required.

---

### Engineering checklist

- Define workflow graph with typed nodes (Pydantic schemas for inputs/outputs)
- Implement `RunContext` with emit/checkpoint/HITL primitives
- Add fan-out/fan-in executors with configurable policies
- Instrument all workflow boundaries with OTEL spans (workflow → stage → agent → tool)
- Stand up OTEL Collector + Jaeger (local Docker Compose or Azure Monitor)
- Build SSE streaming API with trace/span IDs in every event
- Implement weighted progress tracker with per-stage contributions
- Add GraphViz export for workflow visualization
- Write smoke tests that exercise normal/borderline/failure paths
- Ship canaries; measure latency/error rates; promote by evidence

---

### Demo stack

**Credit Desk Lite** showcases all primitives in a multi-agent credit underwriting workflow:
- Typed workflow graph with 8 stages, 6 agents, fan-out/fan-in, sub-workflows
- Full OTEL instrumentation (FastAPI + custom workflow spans)
- SSE streaming with granular progress + trace correlation
- HITL gates for borderline decisions
- Checkpoint/resume for replays
- GraphViz export for workflow viz
- Deterministic synthetic data (runs offline, no external APIs)

**Tech stack**: FastAPI, Pydantic, OpenTelemetry, Jaeger, GraphViz, SQLite checkpoints, SSE streaming.

**Repo**: `agent-framework-backend-custom01/credit-desk-lite`

> North star: Production agent systems are workflow orchestrators with typed contracts, comprehensive telemetry, and human-in-the-loop gates—not prompt chains with logging.

