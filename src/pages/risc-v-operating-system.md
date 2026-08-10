---
title: "RISC-V Operating System in Rust"
description: "Open Nexus is an open source RISC-V operating system written in Rust — the NEURON capability-based microkernel, a Rust userspace, and a GPU-composited desktop. Here is what runs today, and what doesn't."
keywords:
  - RISC-V operating system
  - Rust RISC-V operating system
  - open source RISC-V operating system
  - RISC-V OS
  - operating system written in Rust
image: /img/og-image.png
---

# A RISC-V Operating System, Written in Rust

Open Nexus is an open source operating system for RISC-V, built from the kernel up
in Rust. Not a Linux distribution with Rust components bolted on, and not a port of
an existing system to a new architecture — a separate stack, written for RISC-V and
only RISC-V, with no legacy system underneath it.

It is early. Everything described here runs in QEMU, on emulated RISC-V, not yet on
a board on your desk. That is the honest scope. But it is real code you can clone
and boot today, not a slide deck.

## Why RISC-V only

Most operating systems treat RISC-V as a port target: a third architecture added
after x86 and ARM, inheriting assumptions made for hardware that works differently.
Open Nexus starts at the other end. There is no x86 crutch and no compatibility
layer to preserve, so the memory model, the trap path and the boot sequence are
designed for the architecture rather than adapted to it.

That has a cost — no existing driver ecosystem, no shortcuts — and one benefit that
matters more here: on an open instruction set, what a device is allowed to do can be
decided by its hardware and its owner, rather than by whoever controls the platform.

## Why Rust

The kernel is written in Rust, and the userspace libraries that hold the actual
domain logic are marked `#![forbid(unsafe_code)]`. In a microkernel system, most
code lives outside the kernel — drivers, filesystems, networking, the graphics
stack all run as ordinary userspace processes. Rust's compile-time guarantees apply
to exactly that majority.

This is a deliberate position rather than a proof. Open Nexus leans on Rust's
compile-time guarantees instead of betting the project on formal verification as a
first milestone; the security posture is capability-based and microkernel-hard in
the seL4 tradition, but the development curve is meant to stay closer to something
a normal team can maintain.

## What runs today

- **The NEURON microkernel** boots with capability-based IPC, process isolation and
  W^X memory, over a 14-syscall baseline ABI that is deny-by-default and enforced at
  the syscall boundary.
- **Core services** run as separate userspace processes: a service manager, a policy
  engine, a bundle manager, a virtual filesystem, a keystore and a logging authority.
- **A desktop on the GPU.** Rendering runs over virtio-gpu, accelerated with virgl,
  with opacity, blur and shadow — driven by a full input-to-output loop on real
  interrupts.
- **Applications are programs.** The shell, the launcher, the login greeter, Settings,
  the file manager, the calculator and the on-screen keyboard are each written in
  NeX, our own interface language, compiled and run as separate processes.
- **Text input works across scripts,** including Japanese romaji→kana→kanji, Korean
  2-set jamo composition and Chinese pinyin, with live language switching that
  re-renders running apps in place.

What does *not* exist yet is equally worth stating: there is no power service, no
audio service and no notification service. Parts of the shell you see in screenshots
are deliberately a mockup — we go through exactly which parts on the
[RISC-V desktop page](/risc-v-desktop).

## How it is put together

Three tiers, and one boundary that matters:

1. **The kernel** isolates tasks, translates memory, schedules work and passes
   messages. No policy, no cryptography, no message parsing lives there.
2. **Service daemons** register with the service manager, expose a Cap'n Proto
   interface, and delegate the real work. They are adapters, not engines.
3. **Userspace libraries** hold the domain logic, and compile two ways from the same
   source — once for fast host testing under Miri, once for the real system.

One rule is enforced in CI: userspace may not depend on the kernel, the HAL, or on
service daemons. A dedicated check fails the build if it is violated.

Claims are held to the same standard. Every performance and security assertion is
tied to a test you can re-run, captured as a signed evidence bundle containing the
manifest, the UART log, the trace and the config. If we can't validate it, we don't
ship it.

## Read further

- [Architecture overview](/docs/architecture/overview) — the three tiers in detail
- [NEURON, the capability microkernel](/capability-microkernel) — the kernel itself
- [The RISC-V desktop](/risc-v-desktop) — the GUI, and what is real in it
- [How we prove it](/docs/architecture/validation) — the validation harness
- [Roadmap](/docs/intro/roadmap) — what is next
- [Build and boot it yourself](/docs/contributing/development/setup) — in QEMU

The papers behind the architecture, each with a DOI and tied back to code, are
listed under [research and papers](/docs/architecture/research-and-papers). When
this site and the repository disagree, the repository is the source of truth.
