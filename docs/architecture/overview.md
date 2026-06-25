---
sidebar_position: 1
description: "The mental model — three tiers, and the one boundary that matters."
sidebar_custom_props:
  icon: compass
  color: "#0071e3"
---

# Overview

Open Nexus is not a monolith with security bolted on. It's a small kernel, a set of
thin service daemons, and a body of safe, host-testable libraries — with hard
boundaries between them that a machine checks, not a code reviewer's goodwill.

This page is the mental model. The pages after it go one layer deeper each.

## Three tiers

The system is **host-first, QEMU-last**: logic is written and tested on a normal
machine, then validated on real RISC-V in emulation. That shapes everything into
three tiers.

**1. The kernel — [`source/kernel/neuron/`](/docs/architecture/neuron-kernel)**
A minimal RISC-V runtime: scheduling, virtual memory, IPC, and capabilities.
No policy. No crypto. No message parsing. The kernel shuttles handles and memory;
it does not interpret them.

**2. Services — [`source/services/`](/docs/architecture/services-and-userspace)**
Daemons (the `*d` processes) that register with the service manager and translate
IPC into calls on a userspace library. They are adapters, not engines. When a
service starts accumulating "real logic," that's a sign the boundary is leaking.

**3. Userspace libraries — `userspace/`**
The actual domain logic, in SDK-style crates marked `#![forbid(unsafe_code)]`.
Each compiles two ways from the same source — `nexus_env="host"` for fast, Miri-
validated testing, and `nexus_env="os"` for the real system. Test the truth on the
host; run the same code on the device.

## The one boundary that matters

There is a single, mechanically enforced rule:

> **Userspace may not depend on the kernel, the HAL, or service daemons.**

The [`tools/arch-check`](https://github.com/open-nexus-OS) gate fails CI if it's
violated. This is what keeps userspace libraries safe, testable, and replaceable
without kernel knowledge — and what keeps services thin. Swap the adapter, keep the
logic.

## Single source of truth

Core roles are deliberately not duplicated: one init orchestrator, one process
spawner (`execd`), one loader library (`nexus-loader`), one observability authority
(`logd`), one policy authority (`policyd`). Fewer authorities, fewer ways to drift.

## Why this shape

Capability-based security isn't a feature here — it's the architecture. Because the
kernel is minimal and the boundaries are explicit, the trusted computing base stays
small enough to actually reason about. You get high assurance without high
complexity. That's the whole bet.

---

Next: [The NEURON kernel →](/docs/architecture/neuron-kernel)
