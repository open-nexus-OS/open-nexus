---
slug: "neuron-a-microkernel-you-can-measure"
title: "NEURON: A Microkernel You Can Measure"
subtitle: "A pragmatic, capability-first kernel and a service graph built for deterministic iteration"
authors: [jenning]
tags: [research, architecture, microkernel, rust, determinism, security, performance]
---

## Why this post exists

If you come from a university lab or a research institute, you usually don’t ask, “Does it boot?”
You ask the questions that matter long-term:

- What is the *model*?
- What is the contract surface?
- How do you validate changes without destabilizing the system?
- Where does performance come from in a microkernel world?
- What does “secure” mean operationally, not rhetorically?

This is the current answer for Open Nexus OS.

<!-- truncate -->

## Kernel stance: seL4-inspired boundaries, Zircon-level pragmatism

NEURON is a minimal Rust microkernel targeting RISC‑V. The security posture is explicitly **capability-based** and **microkernel-hard** (in the seL4/Fuchsia tradition), but we’re also realistic about what we can prove today.

- **Like seL4**: authority is explicit, capability rights are kernel-enforced, ambient authority is treated as a bug.
- **Unlike seL4**: we are not betting the entire project on formal verification as the first milestone.
- **Like Zircon**: we optimize for a system that can evolve, ship, and be maintained by normal teams.
- **Unlike Zircon**: we lean on Rust’s compile-time guarantees to remove entire classes of concurrency and memory hazards by construction.

The result is a kernel that aims for the *security posture* of seL4, with the *pragmatic development curve* closer to Zircon—without inheriting C/C++’s default failure modes.

In other words: we want **explicit authority** and **hard boundaries**, but we also want an implementation and workflow that real teams can iterate on without turning every change into a multi-week integration event.

(If you want the canonical framing: [`docs/architecture/RUST-ADVANTAGES.md`](https://github.com/open-nexus-OS/open-nexus-OS/blob/main/docs/architecture/RUST-ADVANTAGES.md).)

## OHOS-aligned system design: a service graph, not a monolith

We intentionally adopted an **OHOS/HarmonyOS-aligned “service graph”** approach: the OS is not “one big program.” It is a set of services with explicit roles, lifecycles, and contracts.

- **Discovery/service graph**: `samgrd` acts as the service manager and discovery point (OHOS-aligned).
- **Everything is a service**: system ability–style components are processes, not namespaces with hidden shared state.
- **Policy as a first-class service**: `policyd` is the single authority for security decisions; the kernel enforces capability rights, and policy decides who gets which capabilities.

This structure is not a stylistic choice—it’s what lets you change one component, prove it, and avoid turning the entire OS into an unreviewable global diff.

We treat “process-per-service” as a core architectural constraint, and we keep the service contracts explicit so that review and testing can stay local instead of turning into global guesswork.

If you want the written contracts behind this:  

- process-per-service RFC: [`docs/rfcs/RFC-0002-process-per-service-architecture.md`](https://github.com/open-nexus-OS/open-nexus-OS/blob/main/docs/rfcs/RFC-0002-process-per-service-architecture.md)  
- service architecture ADR: [`docs/adr/0017-service-architecture.md`](https://github.com/open-nexus-OS/open-nexus-OS/blob/main/docs/adr/0017-service-architecture.md)

## Deterministic development: host-first, OS-last, proof-gated

Most OS projects die in the same place: integration becomes too expensive, so iteration slows down, so correctness drifts, so contributors stop trusting the system.

We built a workflow designed to prevent that failure mode:

- **Userspace libraries (`userspace/`) are the single source of behavioral truth**, host-tested with `cargo test`.
- **Daemons (`source/services/*d`) stay thin**: they translate IPC into calls to those libraries.
- **QEMU is reserved for bounded, deterministic smoke proofs**, not for day-to-day logic development.

The key idea is simple:

**The system must be testable in slices.**  
If you can’t validate a change quickly, you can’t keep the architecture honest.

The proof model and harness layers live in [`docs/testing/index.md`](https://github.com/open-nexus-OS/open-nexus-OS/blob/main/docs/testing/index.md).

## Microkernel performance: control-plane/data-plane split + zero-copy primitives

The common academic critique of microkernels is also the practical critique: “IPC overhead kills you.”

We respond with architecture and mechanism, not slogans:

1. **Control plane stays small and structured**  
   Service calls are designed as bounded request/response frames.

2. **Data plane goes out-of-band**  
   Large payloads do not get shoveled through IPC byte copies. Instead:
   - production uses **VMOs** (capability-referenced transferable memory objects),
   - testing/exports use a **filebuffer** model with the same semantic split.

That split is a recurring contract in the system: small messages in IPC; bulk data via VMO/filebuffer. The kernel provides the primitives (VMO create/map; rights enforcement; W^X at mapping boundaries), while userland owns the protocol meaning.

If you want the crisp contract statement: [`docs/adr/0017-service-architecture.md`](https://github.com/open-nexus-OS/open-nexus-OS/blob/main/docs/adr/0017-service-architecture.md).

### Where Cap’n Proto fits

Cap’n Proto is treated as **a userspace contract tool**, not a kernel dependency:

- Cap’n Proto schemas live in userspace (`tools/nexus-idl` + `userspace/nexus-idl-runtime`).
- Kernel components **never parse Cap’n Proto**. They move handles/VMOs and enforce rights.
- On host and in higher-level workflows, Cap’n Proto gives us evolvable, type-safe contracts (and deterministic bytes where the bytes are the contract).

This keeps the kernel small and strict: it enforces rights and moves primitives; higher layers negotiate structure and evolution.

The canonical architecture overview is [`docs/ARCHITECTURE.md`](https://github.com/open-nexus-OS/open-nexus-OS/blob/main/docs/ARCHITECTURE.md).

## Concurrency + security in fewer lines: Rust as a kernel design tool

We treat Rust as more than “a safer language.” It is a way to encode invariants so that entire classes of bugs become *compile errors*:

- **Ownership** expresses lifecycle and exclusivity (critical for kernel objects and shared state).
- **Newtypes** stop “same integer, different meaning” mistakes at the type level.
- **`Send`/`Sync` boundaries** turn concurrency assumptions into explicit interfaces.
- **`#[must_use]` + `Result` propagation** prevents silent failure paths that are catastrophic in OS code.

This isn’t idealism; it’s how you keep velocity without ballooning the codebase or the review surface—correctness becomes something the compiler and types help enforce, not something you “remember to do.”

## Planning and documentation: contracts as guide rails, not ballast

We run the project as a set of contracts with an authority model:

- **Tasks are the execution truth**: scope, stop conditions, proof commands.
- **RFCs are design contracts**: interfaces, invariants, failure models.
- **ADRs are narrow decisions**: one decision, one rationale.

This is not “more process.” It is a drift-prevention mechanism: it keeps the system explainable while it grows.

Documentation is treated as a **safety rope**: it keeps the lines visible when the system grows. If the docs disagree with reality, either the docs are wrong or the implementation is drifting—both are treated as bugs.

The authority model for RFCs is in [`docs/rfcs/README.md`](https://github.com/open-nexus-OS/open-nexus-OS/blob/main/docs/rfcs/README.md), and tasks live under [`tasks/`](https://github.com/open-nexus-OS/open-nexus-OS/tree/main/tasks).

## Tooling pragmatism: modern tools are allowed, discipline is required

We don’t exclude modern development tooling out of ideology—especially not tooling that improves iteration speed and review quality.

But we are strict about *how* tools are used:

- Keep work scoped (tasks define touched paths and proof).
- Keep evidence deterministic (marker-driven QEMU, bounded timeouts, no “it worked once”).
- Treat **context as a resource**: optimize for problem-solving signal, not for copying chat history, hauling uncommitted diffs, or burning cycles on debugging “chain loops.”

In practice, we codify this discipline and automate parts of it through workflow scaffolding and review gates—so “proof” is something the project enforces, not a vibe.

If you’re curious what that looks like in practice: [`docs/agents/PLAYBOOK.md`](https://github.com/open-nexus-OS/open-nexus-OS/blob/main/docs/agents/PLAYBOOK.md) and [`.cursor/`](https://github.com/open-nexus-OS/open-nexus-OS/tree/main/.cursor).

## Why this matters for research teams

If you want an OS codebase that is friendly to research-style iteration, you typically need:

- clear contracts (what must hold),
- controlled experiments (what changed),
- reproducible proofs (how you know),
- and bounded integration cost (how fast you can iterate).

That is exactly the direction we’re building toward: **a microkernel system that you can change surgically and validate deterministically**, without turning every experiment into a weeks-long integration exercise.

If you want a starting point, begin with:

- [`docs/ARCHITECTURE.md`](https://github.com/open-nexus-OS/open-nexus-OS/blob/main/docs/ARCHITECTURE.md) (canonical overview)
- [`docs/testing/index.md`](https://github.com/open-nexus-OS/open-nexus-OS/blob/main/docs/testing/index.md) (proof model)
- [`docs/adr/0017-service-architecture.md`](https://github.com/open-nexus-OS/open-nexus-OS/blob/main/docs/adr/0017-service-architecture.md) (control/data plane split)
- [`docs/rfcs/README.md`](https://github.com/open-nexus-OS/open-nexus-OS/blob/main/docs/rfcs/README.md) (contract authority model)
- Browse the full docs tree: [`docs/`](https://github.com/open-nexus-OS/open-nexus-OS/tree/main/docs)

[Join the discussion on Discord](https://discord.gg/3sTZvH4PEq)  
[Contribute to the codebase](https://github.com/open-nexus-OS/open-nexus-OS)
