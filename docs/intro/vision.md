---
sidebar_position: 1
description: "Why Open Nexus exists, and the deal it sets out to change."
sidebar_custom_props:
  icon: eye
  color: "#ff9f0a"
---

# The Vision

I once had a file I couldn't copy onto a USB stick. The stick had room to spare. The
file wasn't the problem — the rules around it were.

The file was a little over four gigabytes. To be readable on the device I needed it
on, the stick had to be formatted FAT32 — a format from 1996 that flatly refuses any
single file larger than four gigabytes. There are formats that fix this. exFAT was
built for exactly this case — flash drives and memory cards — but it's patented by
Microsoft and licensed to device makers, which is why it's the mandated format on
every large SD card and why so many products quietly pay to support it. NTFS is
heavier and just as proprietary. And ext4 — the open one, free for anyone to use —
most consumer devices simply won't read.

So there I stood, holding a stick that worked perfectly: an open format nothing
supports, a capable format somebody owns, and a thirty-year-old format that runs
everywhere precisely because it can't do what I needed. The hardware was never the
limit. I was standing in the middle of a licensing standoff, holding a file I
couldn't move.

Once you notice it, you notice it everywhere. New devices that can't read a common
format. Capabilities that sit right there in the silicon but are switched off in
software. Limits that have nothing to do with what the machine can do — and
everything to do with licensing, platform politics, and someone deciding what you're
permitted to do with a thing you own.

That's the problem. Not "we need a nicer operating system." We need a different deal
between people and their machines.

## Every existing foundation asks you to give something up

- The dominant desktop instruction set is power-hungry, and was never designed for
  the thing that matters now: one app that runs across every device you own.
- The dominant mobile instruction set can be licensed, but not freely reshaped — you
  build in its lane, on its terms.
- Sealed ecosystems feel coherent precisely because they're closed: their standards,
  their walls, your data on their side of them.
- Open kernels are wonderful — but their driver layer often leans on vendor blobs,
  and the day one of those goes stale, the whole stack goes stale with it. You can't
  realistically write that driver yourself.
- General-purpose systems repurposed for embedded use are enormous, and size is
  attack surface — the one cost a connected device can't afford, plugged in or not.
- Even platforms built on open cores still ship proprietary layers on top.

None of these are villains. They're compromises — and compromises you never got to
vote on.

## So build the deal you actually want

Start from scratch, and the requirements write themselves.

**Open hardware, first.** RISC-V — an instruction set anyone can implement,
manufacture, and adapt, in any country, without asking permission. That's not a
slogan. It's the only arrangement where a broken driver gets fixed in *weeks*
instead of *never*.

**A kernel small enough to audit.** A microkernel — NEURON — with a trusted
computing base you can actually reason about, secured by capabilities, where one
compromised component can't take the system down with it. Isolation usually comes
with a tax: the message-passing overhead microkernels are famous for. Removing that
tax — keeping the isolation, dropping the cost — is the bet at the center of the
design.

**The same app, everywhere.** One architecture across device classes, so software is
written once and runs from a wall panel to a workstation — no per-platform rewrites,
no fragmentation by default.

**Proof instead of hope.** Every layer is deterministically tested — the pragmatic
middle between "move fast and break things" and formal verification that takes a
decade. Reactive, predictable, and re-runnable by anyone who clones the repo.

**Modular down to the driver,** so when the hardware changes, the system bends in
weeks — not whenever a vendor decides you still matter.

That's Open Nexus. Secure, high-performance, open from the silicon up. **One OS.
Many devices.** Built so what a device can do is decided by its hardware — and by
you. Not by a license you never signed.

## The ambition

This began as one person with an idea and no code. It's still early, and I'd rather
be precise than grand.

The real goal is a bridge: consumer devices, smart devices, and industrial devices,
meeting on the same open standards — one foundation the same app and the same trust
model can cross. The first plan was to start with industry, where security and
control matter most. The lesson was blunt: nobody adopts a system that hasn't proven
itself safe over years. Trust like that is earned, not pitched.

So we earn it, in the open, one layer at a time:

1. **A system on QEMU** that's genuinely fun to build on and to use — get the
   developer and the everyday experience right before anything ships.
2. **Common boards** — real RISC-V hardware people already have on their desks.
3. **Laptops, tablets, and maybe phones** — as the platform and its apps mature.
4. **Our own SoC** — so open source finally gets the vertical integration that closed
   platforms used to pull ahead: silicon and system designed for each other, but in
   the open.
5. **Everything else** — from that foundation, outward into the rest.

One OS. Many devices. Earned, not assumed.

---

## Go deeper

- [How the system works →](/docs/category/architecture) — the kernel, the services, and how we prove it
- [The roadmap →](/docs/intro/roadmap) — what runs today, what's next
- [Help build it →](/docs/contributing) · [Partner with us →](/docs/category/for-industry)
- [→ Whitepaper (PDF, English)](/files/whitepaper_en.pdf) · [→ Whitepaper (PDF, Deutsch)](/files/whitepaper_de.pdf)
