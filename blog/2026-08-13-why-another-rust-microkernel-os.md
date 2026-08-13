---
slug: "why-another-rust-microkernel-os"
title: "Why Another Rust Microkernel OS?"
subtitle: "I don't want to replace Linux — I want a set of trade-offs that one person can actually attempt"
description: "Why Open Nexus OS exists: a capability-based Rust microkernel for RISC-V, born from embedded driver rot, built around modularity, zero-copy IPC and deny-by-default security."
authors: [jenning]
tags: [vision, architecture, microkernel, rust, security]
image: /img/desktop.png
---

import VideoEmbed from '@site/src/components/VideoEmbed';

I don't want to replace Linux.

In fact, I probably couldn't have built Open Nexus OS without Linux. I use Linux every day, and for general-purpose computing it is an extraordinary piece of software.

So whenever I say that I am building a different operating system, I expect the obvious question:

**Why didn't you just modify Linux until it did what you wanted?**

That question is actually what led me to build this.

<!-- truncate -->

## It started with a TV

My father bought a new TV, and I wanted to watch some of my holiday videos from a USB stick.

The stick was formatted with ext3 because some of my video files are larger than 4 GB.

The TV couldn't read it.

At first, that sounds like a trivial missing feature. But the more I looked into embedded Linux systems, the more interesting the problem became.

Many consumer devices ship with heavily customized, often quite old Linux kernels. The problem isn't necessarily that Linux cannot support the hardware or filesystem. The problem is that the manufacturer has to maintain the entire software stack around a particular kernel and particular hardware.

At some point, maintaining an old driver becomes more expensive than leaving the system as it is.

I ran into essentially the same class of problem with my router.

And this made me wonder:

**What happens when the hardware changes faster than the software stack around it?**

## Embedded hardware has a different problem than the desktop

On the desktop, Linux has an enormous advantage: decades of community-driven driver development.

If I buy a new desktop GPU, network card or USB device, there is a reasonable chance that somebody has already dealt with it.

The embedded world is different.

There is a huge amount of proprietary hardware. A new SoC can require completely different display, GPU, video, audio, power-management and peripheral drivers. Some development boards ship with old binary blobs or drivers tied to old kernel versions.

Writing a new driver isn't just difficult because the driver itself is enormous. It is difficult because the surrounding operating system architecture often assumes that the driver is deeply integrated into everything else.

I wanted to explore a different trade-off.

Not:

> replace Linux everywhere.

But:

> make it possible for a small team to build a new operating system stack around new hardware without carrying decades of unrelated legacy with it.

That became the fundamental design constraint for Open Nexus OS.

## So I chose a microkernel

The idea is simple:

Keep the kernel small and move as much as possible into isolated services.

The NEURON kernel provides the fundamental mechanisms: scheduling, memory management, capabilities, IPC and the hardware-dependent core.

Above it is a service plane containing things like filesystem, networking, process management, window management and the compositor.

Drivers live outside the kernel as well.

This means a graphics driver doesn't have to contain everything that every graphics driver needs.

For example, I moved common functionality such as ring buffers, buffer budgeting and QoS into a Driver Kit. The GPU driver uses it today, and the same infrastructure is designed to serve audio, video and other drivers as they arrive.

The goal is something closer to the philosophy of a modern graphics API or SDK: the hardware-specific part should be as small as reasonably possible.

That does not make writing drivers easy.

I am currently running Open Nexus OS in QEMU, not on real hardware with a real GPU. Getting the first real GPU working will still be a lot of work.

But there is an important difference between:

> write one enormous driver integrated into a 30-year-old software stack

and:

> implement a relatively small hardware-specific component against a stable OS interface.

The latter is something I believe a small team can realistically tackle in months rather than requiring an entire organization to maintain an ecosystem.

## But there is a reason microkernels lost the original argument

There is a famous debate in operating-system history between Andrew Tanenbaum and Linus Torvalds about microkernels.

I think the practical criticism of microkernels was valid.

Moving services out of the kernel introduces IPC and context-switching overhead. An elegant architecture isn't useful if the system becomes slow.

So I didn't want to simply accept that trade-off.

I designed Open Nexus OS around minimizing data movement.

Where possible, services communicate using zero-copy mechanisms: bulk data such as file contents and framebuffers moves by transferring memory-object capabilities instead of copying bytes through the kernel. The hot service-to-service messages use a small declarative wire codec instead of a heavyweight serialization framework, and structured artifacts — compiled UI descriptions, manifests, configuration snapshots — are stored as Cap'n Proto.

This has two benefits.

First, it reduces the performance cost of a highly modular architecture.

Second, it reduces the amount of code that has to directly handle data.

The microkernel isn't supposed to win because "microkernels are theoretically better."

It has to win because the resulting system is actually usable.

## Modularity is also a survival mechanism

There is another reason I wanted the system to be modular.

I'm building this alone.

And I have a terrible memory for complex structures.

I can't reliably remember everything I need when I go to the supermarket. Expecting myself to remember the architecture of a huge operating system several weeks later isn't much more realistic.

So I designed the system so that I don't have to keep the entire architecture in my head.

Open Nexus OS uses a service-plane architecture where individual components have relatively well-defined responsibilities and interfaces.

When I come back to a subsystem, I should be able to inspect that subsystem and understand how it works without reconstructing the entire operating system mentally.

Documentation is therefore part of the architecture for me.

I use extensive file headers and documentation to record assumptions, interfaces and design decisions — essentially writing down the things I know I will otherwise forget.

That sounds mundane, but for a solo developer it is surprisingly important.

## Security should not depend entirely on me writing perfect code

The same reasoning applies to security.

I don't want a system that is secure only if I manage to review every line of a huge codebase perfectly.

I want the architecture itself to constrain what components can do.

The NEURON kernel is capability-based, inspired by systems such as seL4.

Access is denied by default and resources are explicitly granted through capabilities.

The kernel is kept deliberately small — currently around 19,000 lines of Rust code, not counting comments and blank lines — and enforces W^X.

There is also an additional security layer implemented as a service rather than putting every policy decision into the kernel.

The entire system is written in `no_std` Rust where applicable, and `unsafe` code is confined to a few well-defined places: the syscall shim, allocators and device drivers. Everything above them forbids `unsafe` at the compiler level.

That doesn't magically make software secure.

It does, however, eliminate an entire class of memory-safety problems that I don't have to reason about manually.

Where possible, I also try to make components deterministically testable.

For a project of this size and with one developer, reducing the number of things I have to personally keep in my head is itself a security feature.

## I didn't want another Linux desktop distribution

There was another problem I wanted to solve: the application layer.

One thing that has always bothered me about Linux desktop software is the fragmentation around distribution and packaging.

You can have the same application packaged differently for different distributions, with different dependencies, runtimes and integration points.

So instead of treating the UI as another collection of third-party applications sitting on top of the operating system, I wanted to make the UI model part of the system itself.

That led to my own UI DSL.

The `.nx` (NeX) language is designed around deterministic rendering and a controlled runtime. An app is a handful of declarations: a `Store` holds the state, an `Event` names what can happen, `reduce` describes how state changes, and pages are trees of components with modifiers. Side effects are quarantined in `@effect` blocks, so reducers stay pure — the same events always produce the same state.

One unusual consequence is that I deliberately don't use floating-point numbers in the UI description layer — the only fractional type is fixed-point. This makes parts of the system easier to test deterministically, including directly on my Linux development machine rather than requiring QEMU for every test.

Queries are part of the language too. A query is a declaration, not a string — and the chat app is my favorite example of how much that buys you. This is, minus a few fields and the chat-bubble styling, the real chat transcript as a complete program — state, events, reducers, query, effect and UI, lazy loading included:

```nx
Store ChatStore {
    messages: List<Msg> = [],
    nextToken: Str = "",
    loading: Bool = false,
    lastError: Int = 0,
}

Event ChatEvent {
    LoadMore,
    Loaded(List<Msg>, Str),
    LoadFailed(Int),
}

reduce ChatEvent {
    LoadMore => state.loading = true,
    Loaded(rows, next) => {
        // keep only a 64-message window resident — the rest stays in the table
        state.messages = tail(state.messages + rows, 64);
        state.nextToken = next;
        state.loading = false;
    },
    LoadFailed(code) => {
        state.lastError = code;
        state.loading = false;
    },
}

Query Transcript on messages {
    orderBy seq,
    limit 60,
}

@effect on LoadMore {
    match Transcript(token: state.nextToken) {
        Ok(rows, next) => dispatch(Loaded(rows, next)),
        Err(e) => dispatch(LoadFailed(e)),
    }
}

Page ChatPage {
    Stack {
        List($state.messages) { msg in
            Text(msg.text).textSize(sm).fg(onSurface)
                .key(msg.seq)
        }
        .gap(2)
    }
    .grow(1)
    .padding(3)
    .scroll(vertical)
    on EndReached -> dispatch(LoadMore)
}
```

That's the whole thing. `Transcript` pages through a large message table with keyset paging; when you scroll to the end, `EndReached` fires, the continuation token resumes exactly where the last page ended, and only the visible window of messages is ever resident in memory. The first page loads the same way through a root effect at mount.

`orderBy` and `limit` are mandatory, so an unbounded or non-deterministic query is simply not expressible — and there is no way for arbitrary SQL to leak through the application interface. No pagination framework, no loading-state library, no query builder — the language covers it.

An app runtime executes these UI descriptions; the compositor turns them into pixels. Its rendering model is closer to a minimal WebRender-style architecture: instead of throwing everything away and rendering the entire screen again, it tracks damage and updates only what changed.

## And it finally looks like an operating system

This is probably the part I'm most excited about.

Open Nexus OS now boots into a greeter, starts the desktop shell and launches applications that are actually written using the new UI system.

There is blur.

There are shadows.

There are real applications.

And, surprisingly, it is reasonably fluid in QEMU.

![The Open Nexus shell in tablet layout, with frosted blur and soft shadows, running on qemu-system-riscv64](/img/20260805_ui/Tablet_light.png)

The visual effects weren't just an aesthetic choice.

I wanted the desktop to be a performance test from the beginning.

If I could make a composited UI with effects work reasonably well on a virtual RISC-V machine, I would have a much better target for optimizing the rendering pipeline before moving to real hardware.

It is still buggy.

It is still incomplete.

It is still running in QEMU.

But it is no longer just a kernel experiment.

It is becoming a complete system.

<VideoEmbed
  id="Vrf6Z1sAY5I"
  title="Open Nexus OS – A Rust RISC-V-Only Microkernel Operating System"
/>

[Watch on YouTube](https://www.youtube.com/watch?v=Vrf6Z1sAY5I)

## Why RISC-V only?

There is one design decision I haven't justified yet: Open Nexus OS targets RISC-V exclusively. Not as one architecture among many — as the only one.

The honest reason is the endgame.

My dream is not an operating system that can be everything for everybody. Linux already exists, and it is very good at that.

My dream is a vertically optimized system: one open hardware path, taken all the way — ISA, drivers, compositor, UI runtime — tuned as a whole instead of as layers that merely tolerate each other. The kind of tight hardware-software integration that today mostly exists behind closed doors, inside companies that own their entire stack.

Open source can only do that on an open ISA. That's RISC-V.

And before the megalomania alarm goes off: I am one developer, without funding. Vertically optimizing an entire hardware-software stack is not a one-person project, and I know it. That endgame would need means I simply don't have.

But you can architect toward a dream you can't afford yet. A small kernel, isolated drivers, a deterministic UI layer — those decisions are made so that if the chance ever comes, the architecture won't be the thing standing in the way.

Until then, RISC-V-only is also just pragmatic: one target means every hour goes into depth instead of breadth.

## Yes, AI helped build a lot of this

There is one part of this project that I should be transparent about.

A significant amount of the implementation was built with AI coding agents.

I wanted this operating system to exist, and realistically I could not have written all of it alone at the pace required.

I don't think that means the project was built by simply "vibe coding" an operating system.

The architecture, constraints, interfaces, design decisions, testing strategy and a lot of debugging still have to come from somewhere. AI agents can produce enormous amounts of code very quickly, but they don't remove the need to understand what that code is supposed to do.

In fact, the architecture I described above is partly what makes AI-assisted development viable for me.

Small services.

Explicit interfaces.

Extensive documentation.

Deterministic tests.

A relatively small kernel.

Clear boundaries between components.

Those are useful properties for human developers too, but they also make the codebase much easier to work with using coding agents.

Without AI, Open Nexus OS probably wouldn't exist in its current form.

But without a defined architecture, it would also have been impossible to get this far by simply generating code.

## So why another operating system?

I don't think Linux has failed.

I think Linux succeeded so well that it became difficult to imagine a different set of trade-offs.

Open Nexus OS is an experiment in making those trade-offs explicit.

What if the primary target was RISC-V?

What if drivers were isolated from the kernel?

What if the kernel was kept small enough for one person to understand?

What if security boundaries were architectural rather than just additional checks?

What if IPC was designed around zero-copy from the beginning?

What if the UI runtime was part of the operating system rather than another layer of distribution-specific packages?

And what if modern AI tooling made it possible for one person to actually attempt the experiment?

I don't know yet whether all of these decisions will work on real hardware.

That's the next test.

For now, I'm doing some additional hardening and validation.

Then I want to get Open Nexus OS running on real RISC-V hardware, with real graphics hardware and real drivers.

If the architecture works there, I think it becomes a much more interesting experiment.

And if it doesn't, I'll at least have learned exactly where the theoretical advantages of this design stop being useful in practice.

[Join the discussion on Discord](https://discord.gg/3sTZvH4PEq)  
[Contribute to the codebase](/docs/contributing)
