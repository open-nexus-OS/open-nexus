---
sidebar_position: 2
description: "What runs today, in QEMU, and what comes next."
sidebar_custom_props:
  icon: flag
  color: "#ff9f0a"
---

# Roadmap

We're not stacking features. We're building the layers of a foundation, in order.
Each milestone is usable on its own, and each release is testable — host-first,
then proven in QEMU. The early layers below aren't promises; they already boot.

---

## Where we are now

It all runs in QEMU — emulated RISC-V, not yet a board on your desk. That's the
honest scope. But it's real code you can clone and boot, not a slide deck.

**Kernel & core services.**
The NEURON microkernel boots with capability-based IPC, process isolation, W^X
memory, and a 14-syscall surface — deny-by-default, enforced. On top run the core
services: service manager, policy engine, bundle manager, virtual filesystem,
keystore, logging. See [the architecture](/docs/category/architecture).

**A UI on the GPU.**
A full input-to-output loop driven by real interrupts — a kernel IRQ timer, and a GPU
command ring buffer with IRQ-driven completion. Input comes back as motion with a
fast path for the cursor; rendering runs on the GPU over virtio-gpu, accelerated with
virgl, with opacity, blur, and shadow. Windows are real applications.
See [We Made the Screen Light Up](/blog/we-made-the-screen-light-up).

---

## What's next

The screen is on. Next comes a real way into the system, then the parts that make it
a joy — first to build on, then to live in.

**Login & session.**
A real entry point — authenticated sessions built on the identity and keystore
services.

**Shell infrastructure & design primitives.**
The foundation a desktop is assembled from: the core surfaces, components, and layout
contracts the shell and apps will share.

**The Nexus DSL.**
Our own language for describing interfaces and how they bind to the services beneath
them — declarative, testable, and the piece that makes Open Nexus *fun to build on*.

**A new shell, written in the DSL.**
Not hand-wired this time — assembled from the primitives and expressed in our own
language. A shell and launcher that feel like home. The piece that makes Open Nexus
*fun to use*.

---

## Further out

**Secure device platform & first deployments.**
Boot lifecycle, policy enforcement, and update paths hardened for industrial HMIs,
kiosks, and public-sector endpoints — where security and auditability differentiate.

**Broader device classes.**
Expand from focused deployments toward laptops, mobile, and wider ecosystems as the
architecture and partner base mature. One OS. Many Devices. In the right order.

**Enterprise & advanced.**
Device management, compliance, distributed systems (DSoftBus), ML acceleration —
for organizations that will trust this platform at scale.

---

## How we ship

Slice by slice. From a booting kernel → to secure specialized deployments → to
broader device classes. Not rewrites for sport. Not roadmaps on slides. Just code,
progress, and proof you can run yourself.
