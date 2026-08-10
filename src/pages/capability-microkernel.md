---
title: "NEURON — A Capability-Based RISC-V Microkernel in Rust"
description: "NEURON is a capability-based RISC-V microkernel written in Rust: a 14-syscall baseline ABI, deny-by-default capabilities, Sv39 with W^X enforced, and a control-plane / data-plane split the kernel never parses."
keywords:
  - RISC-V microkernel
  - Rust microkernel
  - capability based RISC-V OS
  - RISC-V capability microkernel
  - capability based operating system
  - microkernel in Rust
image: /img/og-image.png
---

# NEURON: A Capability-Based Microkernel for RISC-V

NEURON is the kernel underneath Open Nexus. It is a minimal RISC-V microkernel
written in Rust, and its entire job is to isolate tasks, translate memory, schedule
work and pass messages — and to do nothing else.

## What "capability-based" actually means here

In most operating systems, authority is ambient. A process can attempt any
operation, and the system decides afterwards whether the caller was allowed. The
check happens at the point of use, against an identity, using rules that live
somewhere else.

A capability-based system inverts that. Authority is a thing you hold. If a process
does not hold a capability for an object, it cannot name that object at all, and
there is no call it can make to reach it. Access is not denied — it is
unrepresentable.

In NEURON that shape is concrete:

- Every capability belongs to **exactly one task-local table**. There is no global
  namespace to walk.
- **Rights are derived by intersection and can never escalate.** An endpoint needs
  `SEND` or `RECV`; a memory object needs `MAP`.
- Slots are pre-sized per task and validated at the syscall boundary. Operations
  without an explicit grant are rejected — **deny-by-default**, enforced rather than
  documented.
- The kernel stamps an **unforgeable sender identity** on channels, so a service
  always knows who is really calling. Identity comes from the kernel, never from the
  payload.

## A 14-syscall baseline

The core ABI is deliberately tiny. The minimal (`os-lite`) syscall set is fourteen
calls:

```text
yield   nsec    send    recv    map     vmo_create   vmo_write
spawn   cap_transfer    as_create    as_map    exit    wait    exec
```

Later work adds IPC variants, endpoint creation, MMIO mapping and capability
queries on top of this — the fourteen are the baseline, not a permanent ceiling. The
point is not the number. It is that a surface this narrow is one you can actually
audit.

## Memory: Sv39, and W^X enforced

Virtual memory uses Sv39 translation with three levels of page tables, with
intermediate tables allocated lazily during mapping. The ASID allocator reserves
slot 0 for the kernel and tracks 256 in total. Fresh address spaces get kernel
identity mappings with guarded stack pages.

Every user mapping rejects combined write-and-execute permission. W^X is enforced,
not advised.

Scheduling is round-robin across four priority buckets — `Idle`, `Normal`,
`Interactive` and `PerfBurst` — with cooperative yield in the idle loop.

## Messages the kernel does not read

IPC uses a fixed 16-byte header — source, destination, type, flags, payload length —
with inline payloads for small messages. Bulk data moves out-of-band through shared
memory objects.

That produces a clean split:

- **Control plane.** Small structured messages, typically under 1 KB and around 4 KB
  at most, encoded as Cap'n Proto. Cap'n Proto is a userspace contract tool; kernel
  components never parse it.
- **Data plane.** Large payloads use VMOs — kernel-backed shared memory. The producer
  allocates and writes, then transfers the capability to the consumer via metadata
  sent over the control plane. Zero-copy, and the kernel never interprets the bytes.

This is the reason the trusted computing base stays small enough to reason about: no
policy, no cryptography and no message parsing live in the kernel. It shuttles
handles and memory without interpreting them.

## Where this sits relative to seL4 and Zircon

We are explicit about the comparison, and about its limits:

- **Like seL4:** authority is explicit, capability rights are kernel-enforced, and
  ambient authority is treated as a bug.
- **Unlike seL4:** we are not betting the entire project on formal verification as
  the first milestone. NEURON is not formally verified, and we do not claim it is.
- **Like Zircon:** we optimize for a system that can evolve, ship, and be maintained
  by a normal team.
- **Unlike Zircon:** we lean on Rust's compile-time guarantees.

The bet at the centre of the design is that the isolation of a microkernel can be
kept while the IPC cost usually paid for it comes down. That is a bet, and we
measure it rather than assert it.

## The evidence

The system model is written up in a set of papers with DOIs, each tied back to code
and to a released software artifact — covering the deterministic capability
microkernel, the control-plane / data-plane split, the governed service
architecture, the userspace device-service substrate and the contract-governed
development workflow. They are listed under
[research and papers](/docs/architecture/research-and-papers).

Benchmarks are QEMU-emulated, and we say so. When a measurement turned out to be an
artifact of how the emulator schedules translated code rather than a property of the
kernel, we
[wrote that up too](/blog/we-taught-it-to-speak).

## Read further

- [The NEURON kernel, in the docs](/docs/architecture/neuron-kernel)
- [Services and userspace](/docs/architecture/services-and-userspace) — what runs on top
- [How we prove it](/docs/architecture/validation) — the validation harness
- [NEURON: A Microkernel You Can Measure](/blog/neuron-a-microkernel-you-can-measure)
- [The RISC-V operating system around it](/risc-v-operating-system)
