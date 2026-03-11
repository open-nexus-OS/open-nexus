---
slug: "from-microkernel-to-methodology"
title: "From Microkernel to Methodology: Our Recent Papers"
subtitle: "Why we wrote them, what they say about NEURON, and where Open Nexus is heading next"
authors: [jenning]
tags: [research, architecture, microkernel, methodology, papers]
---

## Why we wrote these papers

Open Nexus OS is no longer just a set of ideas, prototypes, or isolated implementation decisions.

It is becoming something more important:
an architecture that can explain itself.

That is why we published this paper set.

Not to decorate the project with academic language.  
Not to turn engineering into performance.  
But to make the core decisions around **NEURON**, our Rust-based capability microkernel, explicit, citable, and reviewable.

<!-- truncate -->

Taken together, these papers document a clear line of thought:

- how we build the kernel,
- how we keep IPC and data movement bounded,
- how we decompose the OS into tractable services,
- how we expose device functionality without collapsing trust boundaries,
- and how we use AI-assisted development without turning the project into an unrepeatable black box.

This is the real milestone.

We are moving from “here is some promising kernel work” to “here is a documented system model with boundaries, trade-offs, and evidence.”

## Part I: Building a Deterministic Capability Microkernel

The first paper starts at the center of the system:
what kind of kernel NEURON is trying to be.

The answer is not “small at all costs,” and it is not “feature velocity without guard rails.”

It is a deliberate middle path between two extremes:

- proof-heavy kernels with very high assurance and very high verification cost,
- and production kernels that evolve quickly by expanding complexity and trusted code.

Our position is pragmatic:
use Rust’s type system and ownership model to encode structural guarantees,
keep resource growth bounded,
and make control-path behavior deterministic enough to reason about under load.

This paper matters because it defines the kernel stance for the whole project:
**explicit authority, bounded behavior, and reproducible operational rules before convenience.**

- DOI: [10.5281/zenodo.18935402](https://doi.org/10.5281/zenodo.18935402)

## Part II: From IPC to Explicit Data Paths

The second paper asks one of the oldest microkernel questions:
what happens when IPC becomes the center of the system?

Our answer is architectural discipline, not wishful thinking.

NEURON enforces a hard boundary between:

- a **bounded control plane** for small request/reply traffic,
- and an explicit **data plane** for bulk transfer via capability-protected memory objects.

That distinction is easy to say and hard to keep honest.
So we made it enforceable.

Inline IPC is capped at the syscall boundary.  
Large payloads do not “accidentally” turn into kernel copy paths.  
If the system needs throughput, it has to use the right primitive.

This is one of the most important patterns in the whole architecture, because it keeps service decomposition from collapsing into hidden transport cost.

- DOI: [10.5281/zenodo.18935755](https://doi.org/10.5281/zenodo.18935755)

## Part III: Scaling Services Without Losing Control

Once an OS moves beyond a single kernel binary, decomposition becomes its own problem.

Services are easy to create.  
A service architecture that stays analyzable as it grows is much harder.

The third paper introduces the methodology we use to keep that growth tractable:
**service planes** and a **capability-governed service mesh**.

The central idea is simple:
OS decomposition needs governance, not just process boundaries.

So instead of treating discovery, policy, lifecycle, persistence, and distribution as ad hoc concerns spread across the system, we define them as explicit planes with clear authority contracts.

That gives us a way to scale the OS without falling into the usual failure modes:

- fragmented authorization logic,
- restart behavior that exists only in tribal knowledge,
- and durable state that spreads everywhere without consistent rules.

This paper is where the project stops being “a set of services” and becomes **a governed service architecture**.

- DOI: [10.5281/zenodo.18938789](https://doi.org/10.5281/zenodo.18938789)

## Part IV: A Substrate for Userspace Device Services

Microkernel ideas only matter if they survive contact with hardware.

The fourth paper focuses on that boundary:
how do you move device-class functionality into userspace without quietly rebuilding a monolith through unsafe shortcuts?

Our answer is a minimal but enforceable substrate:

- capability-gated MMIO,
- bounded mapping rules,
- non-executable user mappings by construction,
- and userspace authority distribution with auditable policy decisions.

This is not yet the final answer to userspace drivers.
It is a foundation.

That distinction matters.

We are explicitly proving the first boundary before claiming the whole stack:
device access with controlled authority, deterministic timing support for bring-up, and a policy model that does not require kernel-level name magic.

For Open Nexus, this is a critical step toward a service-oriented OS that can interact with real hardware without abandoning its own design principles.

- DOI: [10.5281/zenodo.18939217](https://doi.org/10.5281/zenodo.18939217)

## Beyond the Kernel Series: Contract-Governed LLM Development

The fifth paper sits on a different layer, but it belongs in the same story.

The first four papers describe how we want the system to behave.
This one describes how we keep development from drifting away from that intent when AI tooling enters the loop.

Large language models can increase speed.  
They can also increase noise, scope drift, and false confidence.

So we built a workflow around contracts:

- RFCs define interfaces, invariants, and failure models,
- task files define scope, touched paths, proof commands, and stop conditions,
- ADRs capture boundary decisions,
- and completion is judged by recorded evidence rather than conversational momentum.

This paper matters because it explains something many teams still treat as informal:
how to use AI assistance in systems engineering without making the result less reproducible, less auditable, or less trustworthy.

For a project like Open Nexus, that is not a tooling footnote.
It is part of the architecture discipline itself.

- DOI: [10.5281/zenodo.18941284](https://doi.org/10.5281/zenodo.18941284)

## The Software Artifact

Alongside the papers, we also published the software artifact behind this body of work.

That matters because architecture claims should not live only in prose.
They should point back to code, tests, and a concrete implementation surface that others can inspect and build on.

- Software DOI: [10.5281/zenodo.18934993](https://doi.org/10.5281/zenodo.18934993)

## What this adds up to

If you zoom out, these publications are not five disconnected texts.

They describe one coherent direction:

- a capability-first kernel,
- bounded communication rules,
- a governed service architecture,
- explicit device boundaries,
- and a development workflow built around proof instead of drift.

That is the direction Open Nexus is taking.

Not just toward “an OS that boots.”  
Toward an OS that can explain its boundaries, justify its trade-offs, and evolve without losing control of its own design.

This paper set is one step in that process.
But it is an important one.

It turns implementation into something easier to discuss, challenge, cite, and improve.

And for a system project, that is how maturity starts to become visible.

[Read the papers on Zenodo](https://zenodo.org/)  
[Join the discussion on Discord](https://discord.gg/3sTZvH4PEq)  
[Contribute to the codebase](/docs/contributing)
