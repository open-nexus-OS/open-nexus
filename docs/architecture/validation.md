---
sidebar_position: 4
description: "How a claim becomes something you can re-run."
sidebar_custom_props:
  icon: shield
  color: "#0071e3"
---

# How We Prove It

Anyone can claim their OS is secure and correct. The question worth asking is: *how
do you know?* Open Nexus is built so the answer is reproducible, not rhetorical — the
same checks run on a laptop and in CI, and every run leaves evidence behind.

The discipline is **host-first, QEMU-last**: catch structural problems on a normal
machine where feedback is instant, then prove real behavior on emulated RISC-V where
it counts.

## Two ways to run it

- **`just` — the developer surface.** A `justfile` collects everything you need to
  test comfortably from the host: `just test-host`, `just miri-strict`,
  `just arch-check`, `just test-e2e`, `just test-all`, plus the full OS profiles —
  `just test-os <profile>`, `ci-os-headless`, `ci-os-display-gpu-pci`, `ci-os-smp`,
  `os2vm`, and more. Fast, local iteration.
- **`make` — the reproducible pipeline.** The `Makefile` builds and runs the whole
  thing inside a rootless **Podman** container (`podman/Containerfile`), so a fresh
  machine and CI produce identical results. `make initial-setup`, `make build`,
  `make test`, `make run`.

## The proof harness is a pure observer

The canonical end-to-end proof runs inside the OS. A userspace task —
`selftest-client` — emits a stable **marker ladder** on the UART (`SELFTEST: …`), and
that ladder is gated against `proof-manifest/`, the single source of truth for which
markers must and must not appear under each profile. If a behavior isn't covered by a
declared marker, it simply isn't part of the boot-time proof.

By design, the harness only *watches*. Active test logic lives in the contract tests
below; the observer reads markers and judges them. Boot proceeds through ordered
readiness gates (`init: ready`, then each `<service>: ready`), and a failure reports
the **first failing phase** instead of a wall of output. Each pass is captured as a
sealed, signed evidence bundle (`nexus-evidence`) containing the manifest, UART,
trace, and config.

## Tests at three altitudes

- **Host logic + Miri.** Portable data structures and userspace libraries are tested
  on the host (`just test-host`), with Miri (`just miri-strict`) catching undefined
  behavior in unsafe paths. No kernel, no boot — instant feedback.
- **Per-service contract tests.** Each service proves its own contract at its
  process boundary, out-of-process — for example the input stack's `hid`, `touch`,
  `keymaps`, and `pointer_accel` contracts, or the `nx` CLI's exit-class and
  JSON-envelope contract. Logic is proven where it lives, not in the observer.
- **Integration chain tests.** `tools/nx/tests/chain_*.rs` validate whole chains
  end to end — the display pipeline, GPU scanout, the input pipeline — with a
  **per-hop marker** and a short deterministic timeout at each hop. A failed hop
  pinpoints the exact stage that broke, not just "the chain is red."

## When something breaks

Every run leaves a trail under `build/logs/`:

- A **timestamped directory per run** with the full `uart.log` (and `qemu.stderr`),
  plus a `latest` symlink — so you can diff one run against another and see exactly
  what changed.
- A structured **`hypothesis.json`** (newline-delimited JSON) recording exit and
  post-run summaries, failure classes, and warnings — machine-readable triage.
- For deep kernel faults, **`neuron-boot.map`** — the linker map down to section and
  symbol layout, so a raw fault address can be traced back to the code that owns it.

The point is simple: **if we can't validate it, we don't ship it.** Progress you can
re-run yourself beats progress on a slide.

---

Next: [Codebase map →](/docs/architecture/codebase-map)
