---
slug: "we-taught-it-to-speak"
title: "We Taught It to Speak"
subtitle: "Six weeks later: our own UI language, a real app runtime, and an OS that finally types back"
authors: [jenning]
tags: [update, architecture, kernel, determinism, performance]
image: /img/20260805_ui/Desktop_light.png
---

import VideoEmbed from '@site/src/components/VideoEmbed';

In June, we ended with a promise: *the screen is on — now we teach it to think.*

Our own language. A shell. A launcher that feels like home.

Six weeks later, all three exist. And a few things we didn't promise, because we didn't yet know we'd need them.

<!-- truncate -->

![The Open Nexus desktop: wallpaper, app icons, a status bar with a live clock, and a dock](/img/20260805_ui/Desktop_light.png)

*This is the whole thing, today, on `qemu-system-riscv64`. The shell, the launcher and every window are programs; everything under them — kernel, drivers, compositor, filesystem — is ours. Some of what you see is deliberately still a mockup, and we'll come back to exactly which parts.*

## We said "our own language." We meant it.

Most projects at this stage reach for a config format. A tree of JSON, a toy markup, something you can parse in an afternoon and regret for years.

We built a language.

It's called NeX. Files end in `.nx`. It has a compiler, a canonical binary IR, a type checker, an interpreter for host previews, and a runtime that executes it as a real process on the OS. Here is a complete program:

```
Store CounterStore {
    value: Int = 0,
}

Event CounterEvent { Inc, Dec }

reduce CounterEvent {
    Inc => state.value += 1,
    Dec => state.value -= 1,
}

Page CounterPage {
    Stack {
        Text($state.value).textSize(xl)
        Button { label: "+" }
        on Tap -> dispatch(Inc)
    }
    .padding(4)
}
```

That looks like a lot of other declarative UI languages. The difference is what it *refuses* to let you write.

There are no floats in the semantics. No wall-clock reads. No unordered iteration. No `goto`, no unbounded `while`, no recursion in reducers — the IR is a total expression tree, so it *cannot represent* a back-edge. Termination isn't tested, it holds by construction. Reducer purity is a compile error, not a lint. Every collection and string carries a cap that is re-validated when the app is loaded, so a tampered bundle fails closed.

The result: **the same source compiles to byte-identical IR, and the same IR with the same inputs produces identical frames.** On every tier. That is the whole thesis of this OS, pushed all the way up into the application layer.

The design principles behind it aren't ours — they're Parnas on information hiding, Liskov on abstract data types, Dijkstra on structured control flow, Hoare on contracts. What's ours is the decision to make the language *enforce* them, so that writing the obvious program produces a well-architected app and nobody has to read a style guide.

![The calculator app: a result display reading 5 + 55 = 60 above a keypad of rounded keys](/img/20260805_ui/Calculator.png)

*The calculator is a `.nx` program — about a hundred lines of the language above. The keypad has no breakpoints in it: every key divides the available space exactly, and each label sizes itself from its own key, so the whole thing stays right at any window size.*

## A language needs somewhere to run

A UI language on its own is a rendering demo. What makes it an operating system is the runtime underneath, and the rules about who is allowed to do what.

So apps are no longer "the thing the compositor happens to be showing." An app is a bundle: a manifest, a compiled UI program, its assets, its translations. The runtime loads it into its own process, and the manifest declares what it is:

```toml
name = "greeter"
bundle_type = "greeter"
payload_kind = "ui-program"
caps = ["nexus.permission.WINDOW",
        "nexus.permission.SESSION",
        "nexus.permission.TIME"]
```

That `bundle_type` is not a label. It's a **privilege ceiling**, enforced when the bundle is packed. A normal app cannot even *ship* a manifest asking for a system capability — the packer refuses it. The login greeter may ask for session control. The file manager may ask for filesystem access. The calculator may ask for neither, and there is no runtime flag, no developer option, no "just this once" that changes that.

Which bundle actually *plays* a role is a separate question, answered by the product configuration: `shell = "desktop-shell"`, `greeter = "greeter"`. Any bundle implementing the contract can take the job. The shell is not privileged because it's ours — it's privileged because the product assigned it that role, and it would lose the privilege the moment we assigned the role to something else.

That separation is why the greeter and the desktop shell can be ordinary DSL apps without being ordinary in power. Privilege comes from the manifest and the product, never from being lucky enough to boot first.

![The login greeter: a large clock, a user avatar, a password field, and sleep/restart/shutdown buttons](/img/20260805_ui/greeter.png)

*The greeter is the manifest above, running. It renders the login and asks the session service — it never decides. Any bundle implementing that contract could replace it.*

## Queries that know how to wait

Real apps read data. Data is where declarative UIs usually go to die: someone writes a string of SQL, someone else concatenates a user's name into it, and three years later that's a CVE.

In NeX a query is a **value**, not a string:

```nx
@effect on LoadRequested {
  match svc.db.users.query(query, limit=50, timeoutMs=250) {
    Ok(rows) => dispatch(Loaded(rows)),
    Err(e)   => dispatch(LoadFailed(e.code)),
  }
}
```

Fields are typed handles, not names — you cannot spell a field wrong, and you cannot inject one. Ordering is mandatory, so results can't shuffle between runs. Result counts, filter lists, and timeouts are capped. *Building* a query is pure and allowed anywhere; *executing* one is IO and only legal inside an effect. And errors come back as stable codes — never a formatted message someone will eventually parse.

The part we like most is what falls out of it for free. Because a query is a value with a canonical form, the runtime can hold it and decide *when* to run it. That is lazy loading — not as an optimization somebody remembers to add, but as the default shape of the thing. A list that shows ten thousand rows asks for a page, gets an opaque continuation token back, and requests the next page when the viewport gets close. The app author writes a list. The bounded in-flight requests, the placeholders, the paging — that's the runtime's job.

The developer never writes a loading spinner state machine. That is the entire point.

![A file listing in the file manager: columns for name, size and date, a navigation sidebar, and a properties pane](/img/20260805_ui/Stash_files-list.png)

*A list like this is a query: typed fields, a mandatory sort order, a result cap, and a page token. The app asks for a page; the runtime decides when to fetch the next one.*

## The shell stopped being a lie

In June we admitted that the windows on screen were scaffolding — painted by the compositor because we needed something to composite.

That's over. The desktop shell is an app. The launcher is an app. The login greeter is an app. Settings, the file manager, the calculator, the chat client, the on-screen keyboard — all of them are `.nx` programs, compiled, loaded, and run as separate processes.

The compositor composites. Nothing else. Thousands of lines of hand-painted interface came *out* of it and went where they belong. A compositor that draws your UI isn't a compositor, it's a monolith with good PR.

![The launcher as a floating glass panel over the desktop, with a search field and an app grid](/img/20260805_ui/Desktop_launcher-small.png)

![The same launcher filling the screen, with a greeting, a search field and larger app tiles](/img/20260805_ui/Desktop_launcher-full.png)

*One launcher app, two shapes. It isn't two code paths behind a breakpoint — the layout is a function of the space it's given, so the panel and the full-screen mode are the same program answering a different question.*

![The same shell on a tablet-shaped display: icons along the top, a centred floating dock](/img/20260805_ui/Tablet_light.png)

*And the same shell again on a different device class. The desktop doesn't get ported to the tablet; it gets measured.*

## Now look at those screenshots again

The battery says 78%. There's a track playing called *Summer Vibes* by *The Artist*. There's a Wi-Fi indicator, a Bluetooth panel, a notification badge with four items, a calendar.

None of that is real.

There is no power service. No audio service. No notification service. The battery percentage is literal text, the music player is a widget with nothing behind it, and the calendar panel contains three hand-written months because there is no date arithmetic yet. Large parts of that shell are a mockup — a picture of where this is going, rendered by the real thing.

We're saying that plainly because the alternative is letting you find out. But we should also say why it exists in that state, because it wasn't laziness and it wasn't a demo for a screenshot.

**We built the shell against the design before the services existed, on purpose, to find out what our own language couldn't do yet.**

You cannot learn the limits of a UI language by writing counters and to-do lists. You learn them by taking the densest, most detailed interface you can draw — status bar, six panels, a control centre, a launcher in two modes, live theming — and trying to build it for real. Then the language stops being a nice idea and starts pushing back.

It pushed back in specific, useful ways. A reducer can't build or shrink a list, so the notification cards are authored markup and clearing them flips a single boolean rather than emptying a collection. There's no date arithmetic, so a month grid can't be computed — it has to be written out, and the chevrons clamp at three months instead of wrapping, because a chevron that silently loops back to June would be claiming a calendar we don't have.

Those aren't bugs. They're the shape of the language as of today, and we know it precisely because we walked into it at full speed. Every one of them now has a name and a place in the roadmap. That is worth considerably more than a shell with four working buttons and no idea what comes next.

It was also the performance experiment we needed. A shell that dense — dozens of layers, live glass, blur behind moving panels, text everywhere — is close to the worst case our compositor will ever be asked to handle. Building it told us what a heavy app actually costs, on real hardware timings, while it was still cheap to change the answer.

The discipline that makes this survivable is that the code says so, in the code. From the battery panel's own source:

> DEMO STATE — no power service exists. The charge percentage and the power source are not fields at all: they would be READINGS, and a reading nobody takes is worse than an obvious constant.

That's the rule. A placeholder is allowed to look finished, but it is never allowed to *claim* to be finished — not in the source, not in a status marker, not in a blog post. When the power service lands, that comment is the ticket.

For the record, what *is* real in those pictures: the clock (a real wall clock through a real time service), theme, accent colour, icon style, light/dark and shell mode — all live service writes that persist across reboots — window management, app launching, the launcher, and every file the file manager shows you.

The rest is a promise. We'll come back and mark them off one at a time.

## What a browser-style compositor buys you

When we rebuilt it, we took the architecture modern browser engines converged on — and it's worth explaining what that means, because it's the difference between an interface that *works* and one that feels alive.

The naive way to draw a screen is to ask the app: *what do you look like right now?* Every frame. Sixty times a second. The app rebuilds its world, hands over a picture, and the system copies it. It works, and it is why so much software feels like it's thinking about your scroll rather than following it.

Ours works the other way. An app describes its interface **once**, as a structure — this panel, that text, this image, these rounded corners. The compositor keeps that structure resident on the GPU as independent layers. From then on, it only touches what actually changed.

For you, that means:

- **Dragging a window** doesn't ask the app to redraw anything. The window already exists on the GPU; moving it is a transform. The app isn't even involved.
- **Scrolling** doesn't ask the app to re-emit the page. Content moves as a band that the compositor slides, so the list keeps up with your finger instead of chasing it — including the fling at the end.
- **Blur, shadow, and glass** are properties of a layer, not something recomputed from scratch behind every moving thing.
- **A busy app can't stutter the whole screen.** The clock keeps ticking, the cursor keeps moving, animations keep their timing, because those are layers too.

None of this is visible as a feature. You notice its absence — as lag, as tearing, as a window that lurches when you grab it. We spent six weeks making sure you'd have nothing to notice.

![The desktop in dark mode: the same layout, dark wallpaper, dark dock and status bar](/img/20260805_ui/Desktop_dark.png)

*Same desktop, dark. Because the compositor holds the scene as layers rather than a finished picture, a theme change re-tints what's affected instead of forcing every app to redraw itself from scratch.*

## It types back — in five languages

An OS you can only click at isn't finished.

Text input is now a real service with a real trust boundary. Keystrokes travel an identity-gated path where the kernel says who sent them, never the payload. The on-screen keyboard isn't special-cased into the compositor: it's an overlay *app*, injecting through a dedicated capability-gated endpoint nothing else can reach. Password fields bypass composition entirely.

Then it got interesting. Behind a single engine trait, we implemented Japanese romaji→kana→kanji, Korean 2-set jamo composition, and Chinese pinyin, with a bounded, deterministic user dictionary. Keyboard layouts are data, not code — rows come from a keymap source of truth, and the globe key cycles the system layout.

And it can actually *draw* all of that. Latin, Cyrillic-capable text shaping, and the CJK glyph foundation are in the font pipeline, so a Japanese candidate strip renders real kanji, not tofu boxes. Every app ships German, English, Japanese, Korean, and Chinese catalogs. Switching the system language re-renders running apps in place — no restart, no relaunch.

The candidate strip learns, too. On every commit, a deterministic ranking engine updates, persists through the state filesystem, and reorders what you'll see next time. Because that's exactly the kind of feature that should make you suspicious, it ships with an off switch and a **"forget learned words"** button that actually forgets. Personalization you can't disable isn't a feature, it's a liability.

If you've been reading the screenshots rather than just looking at them, you've already noticed: this build is running in German. *Passwort eingeben. Guten Morgen. Einstellungen.* That's not a special edition — it's the same image, the same apps, a different locale pack.

![The Settings app: a sidebar of categories with an appearance page showing light/dark/auto modes, accent colour swatches, icon styles and folder colours](/img/20260805_ui/Settings.png)

*Settings is an app like any other, with a `settings` bundle type as its ceiling. Theme mode, accent colour, icon treatment and folder colour all apply live — one settings service is the single authority, and running apps receive the new state rather than being restarted into it.*

Where it's still rough: the language switch lives one row further down, and it works — but the path from *tapping that row* to *every surface agreeing on the new locale* still has seams we're not proud of. The engine is right. The control panel around it needs another pass. We'd rather say that than let you discover it.

## Your files are yours again

Data now survives a reboot on purpose.

Underneath is a real user-data filesystem — journaled, with an `fsck`, and with incremental journal replay so a cold boot finds exactly what you wrote and not a version of it from before the power went out. Above that, a VFS with stable error codes and reads that hand you the memory itself instead of copying bytes through three services to reach you.

On top of all that sits something much simpler: a folder.

It has your files in it. You can double-click it. You can drag things into it, sort them by name or type or date, switch between a grid of tiles and a list, copy, move, and delete — and when you delete, it goes to a trash you can change your mind about. Each file wears the right icon, because the icons are baked from a real type registry rather than guessed from a file extension at render time.

![Folder view in the file manager: coloured folder tiles for pictures, videos, audio, documents and downloads](/img/20260805_ui/Stash_folders.png)

![Grid view: file tiles with type-specific icons, a selected image, a floating action bar and a properties pane](/img/20260805_ui/Stash_files-grid.png)

*Folders, colours, a selection, an action bar that reacts to it, and a properties pane that agrees with all of them.*

That's the whole feature. It took a journal, a filesystem, a VFS, a zero-copy read path, a type registry, an icon pipeline, and a process model to make a folder open when you double-click it — and if we did it right, you'll never think about a single one of them.

## Multi-core was never the point

The kernel learned to use more than one hart: per-CPU schedulers, cross-core wake and preemption, work stealing with affinity, per-hart interrupt contexts and timers, epoch-based TLB shootdown, and CPU affinity and shares as a real syscall. Four cores is now the default for interactive boots.

Then we measured it, and the measurement was ugly. Under contention, waits on the kernel's big lock peaked at **90.8 ms**. On a system whose entire pitch is bounded latency, that's not a rough edge — that's a broken promise.

The first round of fixes was structural: phased syscalls, a lock-free syscall class, one core with right-of-way, and an O(n) deadline sweep gated behind the earliest deadline. Waits fell from 90.8 ms to about **6 ms**.

The second round is the one worth telling. A peak remained that we couldn't explain, and we chased it for real time — until the evidence said the peak wasn't in our kernel at all. It was an artifact of how the emulator schedules translated code. We had been staring at a graph that was measuring the *observer*.

Underneath it sat the actual cost, much smaller and much more boring: inter-processor wake interrupts. We instrumented them and found **99.7% were redundant** — waking a core that was already awake, or already scheduled to run. Elide those, and the rest mostly evaporates. We wrote about this in [Proof Over Luck](/blog/proof-over-luck); this is the cleanest example we've had. Trust the graph, and you optimize a phantom.

But cores are plumbing. Here's the part we actually care about.

## Nobody should have to write parallel code

We made a product decision early, and it's a strong one: **application developers must never see, learn, or reason about parallelism.** Not "should be able to avoid it." Must never see it.

So we built the machinery one layer down, as a system-internal compute broker. A caller hands it a declarative job — *this data, partitioned this way, mapped by this kind of work* — as a memory object that moves by capability rather than being copied. The broker computes and writes the result header last, as a release fence. If it can't take the job, it says so through that header and the caller falls back to computing inline. It never blocks you to be clever.

The important design decision isn't the broker. It's this: **the interface is declarative and stable, and the evaluator behind it is exchangeable.**

Version one runs on a deterministic worker pool — flat, partition-and-map, exactly right for baking assets, rasterizing vector graphics in parallel bands, or bulk-transforming buffers. That covers most of what an OS actually does in the background.

But some work isn't flat. Compiler passes, type checking, symbolic evaluation — those are trees, and a partition-and-map pool is the wrong shape for them. So we built a second backend on the same wire: an evaluator based on **interaction combinators**, the graph-rewriting calculus from Lafont's work in 1990, where computation is local rewrites on a net of connected agents. Because that calculus is confluent, the answer doesn't depend on how the work was split or in what order results merged. One worker and sixteen workers produce not just the same value but the *same interaction count* — which is why we can prove parallelism correct rather than benchmark it and hope.

Two evaluators, one interface, both boot-proven. That's the seam we needed, and now it exists.

Here is where it's going. Eventually a developer writes something like:

```nx
@effect on ExportRequested {
  match svc.media.render(project) { ... }
}
```

...and that call fans out across every core in the machine — or, later, across every device you own — because the *service* knows how to describe its work declaratively and the *broker* knows how to evaluate it. The developer wrote one line and thought about their app. Somebody who needs more can write a library that speaks to the broker directly. Nobody writes a thread.

To be precise about today: the broker is system-internal. It has no DSL surface, no app permission, no way for an app to reach it, and it is deliberately banned from frame-critical paths. The foundation is real and proven; the developer-facing API is not built yet. We'll show you that when it runs, not before.

## The unglamorous six weeks

The last stretch wasn't features. It was making "it works here" mean "it works everywhere."

One pinned toolchain for everything — lint, format, host tests, cross-build, CI — because a stable/nightly split diverges silently and you find out weeks later. Warnings became a hard gate under every configuration, with blanket suppressions banned. A structure ratchet that stops modules from growing into god-files. A dependency gate that keeps forbidden crates out of the OS graph. And a marker contract: the strings our boot prints as proof of behavior are a source of truth, so a stub can never print `ok`.

We'll be honest about where that leaves us: **one CI lane is red right now.** The cross-device networking lane expects a peer the single-VM profile doesn't have, and the two-machine runner times out during discovery. We know exactly which two things are broken and why. We're telling you now rather than after we've fixed it, because a green board you can't trust is worse than a red one you can.

## Six weeks

In March, the question was whether a from-scratch microkernel could justify its own design. We answered with papers.

In June, the question was whether it could put something on a screen and feel instant. We answered with pixels.

Today the question is whether it can carry an actual operating system — a language of its own, apps that are real processes with real privilege boundaries, text input in five scripts, files that persist, a compositor that stays out of your way, and a compute foundation nobody has to understand to use. We think the answer is starting to be yes, and every claim in this post has a boot log behind it.

Still RISC-V only. Still no legacy system underneath. Still built in Germany, from the kernel up, owning every layer.

Next: we make it talk to other machines.

## See it running

Screenshots can be staged. This isn't — it's the system booting and being used on `qemu-system-riscv64`.

<VideoEmbed
  id="Vrf6Z1sAY5I"
  title="Open Nexus OS – A Rust RISC-V-Only Microkernel Operating System"
/>

[Watch on YouTube](https://www.youtube.com/watch?v=Vrf6Z1sAY5I)

[Join the discussion on Discord](https://discord.gg/3sTZvH4PEq)  
[Contribute to the codebase](/docs/contributing)
