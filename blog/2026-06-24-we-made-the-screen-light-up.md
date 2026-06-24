---
slug: "we-made-the-screen-light-up"
title: "We Made the Screen Light Up"
subtitle: "How a from-scratch, RISC-V-only OS went from a single scanline to real apps in 90 days"
authors: [jenning]
tags: [update, performance, architecture, microkernel, vision]
image: /img/screenshot-onos.png
---

In March, we showed you a kernel that could explain itself.

Today, it can show itself.

Three months ago, NEURON was an argument. A set of papers. A microkernel you could measure, but not see. There was nothing on the screen — because there was no screen.

<!-- truncate -->

Then we drew one pixel. Then a line. Then a window you could move. Built from nothing, on hardware most operating systems still refuse to take seriously: RISC-V, and only RISC-V. No Linux underneath. No x86 crutch. Made in Germany, from scratch.

![NEURON running on RISC-V: layered, blurred glass windows composited on the GPU](/img/screenshot-onos.png)

This is the story of those three months.

## The screen lights up

The first thing a new operating system has to earn is the right to put something on a display. Not a logo someone else's firmware draws. A pixel that we computed, we pushed, and we own from kernel to glass.

We started with the most honest renderer there is: a CPU drawing scanlines, one row at a time, into a framebuffer. It was slow. It was simple. It was completely under our control — which is exactly what you want for the first one. If a row was wrong, we knew precisely why.

That single line on the screen looks unremarkable in a screenshot. It isn't. It's the moment a microkernel stops being a paper and starts being a machine you can look at.

## Input becomes a sense

A screen that only outputs is a television. An operating system has to feel you.

So we built the other half of the loop: a full input-to-output pipeline. Mouse and keyboard events enter at the driver, travel through the kernel as messages, and come back out as motion on the display. The first time the cursor followed the mouse, the whole thing became a computer.

But "it works" was never the bar. The cursor has to feel instant — and a general pipeline isn't instant. So we built a fast path just for the pointer: the most latency-sensitive thing on the screen gets the shortest route through the system, while everything else takes the normal road. You don't notice a fast path when it's there. You notice its absence as lag. We made sure you'd never notice it.

## We picked the hardest things on purpose

Here is where most teams would have stopped to make a pretty desktop. We did the opposite.

We added a JPEG wallpaper, a real cursor, and then — deliberately — the three most expensive things a compositor can do: opacity, blur, and shadow.

Not because we're chasing a glassy Apple aesthetic. Because they are a stress test. Translucency forces correct blending. Blur forces you to read pixels back and process them under a frame budget. Shadows force you to think about layers and bounds. If your rendering pipeline is lying to you about how fast it really is, these three will expose it immediately.

This is the same principle we wrote about in [Proof Over Luck](/blog/proof-over-luck): build the hardest case first, so the system is forced to be honest. A demo that only renders flat rectangles proves nothing. A demo that survives a real-time blur tells you the foundation can carry weight.

## When it got slow, we didn't fake it

And then it got slow.

We introduced animation — smooth, blurred, moving — and the whole thing buckled. Frames dropped. The honest CPU renderer that served us so well at one pixel could not carry a moving, blurred, layered scene.

There are two ways to respond to that moment. You can fake it — cache a few screenshots, fudge the numbers, ship the demo. Or you can rebuild the foundation. We rebuilt.

First, the cheap, correct wins: we stopped redrawing the entire screen every frame and switched to dirty rectangles — only the pixels that actually changed get recomputed. We added the tools a real UI engine needs: signed-distance fields for crisp shapes and shadows at any scale, nine-slice scaling for resizable surfaces, each one landing with its own targeted tests so a fix in one place couldn't silently break another.

It wasn't enough. So we did the thing we'd been building toward all along: we moved the entire pipeline off the CPU and onto the GPU. A proper graphics path — multiple buffers in flight, a scene graph and node tree describing what to draw, and a compositor assembling the final frame from independent layers. The CPU now decides; the GPU draws.

And when even that left performance on the table, we went one level deeper and brought up virgl — real, GPU-accelerated rendering for our virtualized target. Gradients, vector effects, and layered glass, composited on the hardware that was built to do it.

That progression — scanline, dirty rects, SDF, virtio-gpu, virgl — isn't a detour. It's the whole point. Each step was forced by an honest measurement, not a roadmap we wrote in advance.

## Windows became apps

For most of this journey, the windows on the screen were a lie we told ourselves on purpose. They were hardcoded — drawn by the compositor because we needed something to composite. Useful scaffolding. Not a system.

The most recent step changes that. Windows are no longer painted by hand. They are real applications, loaded and run by the system, each one a separate program the compositor places on the screen. We're being honest about where this is: the application runtime is still young, and some plumbing is still wired by hand rather than discovered dynamically. We'll tell you when that's done, not before.

But the shape is now correct. A window on the screen is an app. That is the difference between a graphics demo and an operating system.

## Ninety days

In March, the question was whether a microkernel built from scratch could justify its own design. We answered it with papers.

In June, the question was whether it could become something you can see and touch, in real time, on RISC-V, with no legacy system underneath to lean on. We answered it with pixels — a screen that lights up, a cursor that feels instant, glass that survives a stress test, and windows that are finally real programs.

We are building a high-performance operating system in Germany, on RISC-V, the hard way: from the kernel up, owning every layer. There are no shortcuts in that sentence, and we don't want any.

If you want to watch this happen — or help build it — the code is open, and the door is too. Join us on Discord, read the papers, and pick up an issue.

The screen is on. Now we teach it to think — our own language, a shell, and a launcher that feels like home.

[Join the discussion on Discord](https://discord.gg/3sTZvH4PEq)  
[Contribute to the codebase](/docs/contributing)
