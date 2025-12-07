---
title: Context engineering
description: Minimal effective context for agents and LLM apps.
status: draft
tags: [agents, context, prompts]
---

# Context engineering: minimal effective context

It’s basically a “stop shoving your entire life into the prompt” manifesto.

**Core idea**

> Context engineering isn’t “more tokens = more intelligence”. It’s deciding, at each step, the **minimal effective context** the model actually needs to do the next thing well.

The patterns below are a mini-framework for how to do that in production.

---

## 0. Why this matters (first principles)

LLMs do one thing:

\[
p(\text{next tokens} \mid \text{context})
\]

If your context is:

* **too short** → model is blind (missing key facts / instructions),
* **too long or noisy** → important bits get diluted among junk, cost explodes, and behavior becomes unstable.

So **context engineering** = controlling that conditional. Not “how do I stuff more in?”, but:

> “Given this step, **what is the smallest conditional I can get away with?**”

That’s “minimal effective context”.

---

## 1. Context compaction and summarization prevent context rot

**Context rot** = when your appended history + partial summaries + stale instructions accumulate so much junk that:

* the *true* constraints/goals are buried,
* the model starts following accidental patterns (“it always replies this way in this thread”) instead of the intended spec.

Two main tools:

* **Compaction** = algorithmic shrinking of raw traces into structured state:
  * compress 50 turns of dialog into:
    * current user goal,
    * known constraints,
    * key entities + facts,
    * unresolved TODOs.

* **Summarization** = textual rewrite of many tokens into fewer, higher-signal tokens:
  * conversation summaries,
  * “project state” notes,
  * codebase summaries.

Key practice: **don’t keep appending raw logs**. Periodically:

1. Strip old turns out of the live context.
2. Replace them with short, curated summaries / state.

This gives you:

* lower token cost,
* less drift / hallucinated “prior commitments”,
* a stable “state vector” the model conditions on, not a soup of Slack history.

Mental pattern:

* **Bad**: append previous turns forever.
* **Good**: maintain a small, evolving “world state” and only occasionally sample raw history if needed.

---

## 2. Share context by communicating, not communicate by sharing context

This is the rant against “just dump everything into the prompt”.

* “Communicate by sharing context” =
  “I’ll put the whole product spec + architecture doc + prior emails in the prompt and hope the model figures out what I want.”

* “Share context by communicating” =
  “I tell the model **explicitly** what matters *about* those artefacts, in language tuned to the task.”

In other words:

* **You are the compiler.**
* Don’t outsource the job of deciding relevance to the model by throwing a 100-page PDF into the prompt.
* Instead:
  * read (or pre-process) the raw material,
  * extract the constraints and goals,
  * turn that into a small, explicit instruction block.

Example:

* Instead of:
  * “Here’s our entire company handbook, now write an onboarding email.”
* Do:
  * “Using the attached handbook, write an onboarding email. Don’t mention internal policies explicitly; instead:
    * Emphasize: remote-first, async culture.
    * Avoid: salary discussion, performance metrics.
    * Tone: friendly but not jokey.”

Same documents exist, but **you narrate the relevant slice** to the model.

In agent setups, that often means:

* tools that return **structured summaries / highlights**, not full text,
* prompts that feed those summaries, plus a clear instruction:
  “Given: {3 bullet summaries}, decide the next action.”

---

## 3. Keep the model’s toolset small

Every tool you expose is:

* extra surface area for failure,
* extra tokens (tool descriptions),
* extra branching entropy (“I could call 1 of N things”).

So:

* big tool menus → decision paralysis + weird tool selection,
* small, well-chosen tool sets → cleaner policy surface.

Corollaries:

* don’t give one agent 20 tools “just in case”,
* **compose systems** instead:
  * a top-level router agent with 2–4 big capabilities,
  * each capability may internally orchestrate more tools, but the *LLM interface* stays small per step.

Heuristic: tools are context too. They live in the prompt and in the model’s decision space. Minimize that.

---

## 4. Treat “agent as tool” with structured schemas

Once you accept that “fewer tools is better”, the next move is:

> Make **agents themselves** callable as tools with clear schemas.

Instead of a huge monolithic agent that:

* routes,
* searches,
* writes code,
* edits code,
* talks to the user,
* summarizes,

you:

* define **sub-agents** with narrow responsibilities,
* expose each as a **single tool** with a clean typed schema.

Example:

* Tool: `research_agent`
  * Input schema: `{ query: string, depth: "shallow" | "deep" }`
  * Output schema: `{ findings: Finding[], confidence: number }`

* Tool: `planner_agent`
  * Input: `{ goal: string, constraints: Constraint[] }`
  * Output: `{ steps: Step[], risks: Risk[] }`

To the top-level LLM, both are **just tools** with structured IO. It doesn’t see their inner mess.

Why this is good context engineering:

* the top-level prompt only needs a one-line description of each agent-tool,
* internal complexity and intermediate context live *inside* that tool’s sub-calls, not in the main conversation context.

You’re effectively **factoring context**:

* global context = small set of capabilities (agent-tools) + task state,
* local context (inside each agent-tool) can be big and specialized, but the top-level stays clean.

---

## 5. Best practices and implementation tips

There are now semi-standard patterns for doing all of the above; don’t reinvent the wheel.

Typical practices:

* Maintain **explicit state objects**:
  * `conversation_state`, `project_state`, `memory_state`.
* Implement **scheduled compaction**:
  * after N turns or N tokens, rewrite history → summary.
* Design **hierarchical agents**:
  * top-level: 3–5 tools,
  * mid-level: each tool may be an agent with its own micro-tools.
* Use **schemas in everything**:
  * JSON tool responses, typed fields, small enums, no free-text where structured values are expected.
* Separate **user-visible text** from **machine-visible state**:
  * don’t make the LLM reverse-engineer state from prose where a simple `state = {...}` object would do.

---

## Checklist: making it actionable

If you’re building agents / apps:

1. **Stop auto-appending everything.**  
   Maintain a `state` object and periodically summarize.
2. **Design “next-step context” as a function.**  
   Ask: “What does the model minimally need to decide the **next action**?” Only pass that.
3. **Shrink tools, deepen systems.**  
   Fewer tools per agent; more layering/composition between agents.
4. **Promote good sub-agents to first-class tools with strict schemas.**  
   Treat them like microservices: narrow API, clear IO.
5. **Narrate relevance to the model.**  
   Don’t just share documents. Tell the model what about them matters *for this step*.

If you want to go further, the next step is designing a “Context Engine” component in your stack (e.g., `StateManager`, summarization policies, tool registry with small surfaces, and an “agent-as-tool” pattern you can actually implement).

