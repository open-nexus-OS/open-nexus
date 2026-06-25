---
sidebar_position: 1
---

# Codebase Overview

The Open Nexus OS repository is not a monolith.  
It’s a collection of modules, organized with purpose:  
simple to navigate, simple to extend, simple to build.  

## Structure

- `open-nexus-os/`
  - `config/` — workspace configuration (clippy, cargo-deny, rustfmt)
  - `docs/` — architecture, RFCs, ADRs, testing guides
  - `kernel/` — NEURON kernel workspace configuration
  - `source/` — OS source code
    - `kernel/`
      - `neuron/` — kernel runtime (scheduler, IPC, traps, capabilities)
      - `neuron-boot/` — boot entry point
    - `services/` — service daemons (thin IPC adapters)
      - `samgrd/` — service manager
      - `bundlemgrd/` — bundle manager
      - `execd/` — process spawner
      - `policyd/` — policy engine
      - `vfsd/` — virtual filesystem
      - `keystored/`, `identityd/`, `dsoftbusd/`, etc.
    - `apps/` — system applications (privileged, direct kernel access)
      - `nexus-init/` — init orchestrator
      - `selftest-client/` — kernel selftest runner
    - `libs/` — kernel libraries (nexus-abi, nexus-hal, nexus-log, etc.)
    - `drivers/` — device drivers (virtio console, net, block)
  - `userspace/` — safe libraries (host-first, `#![forbid(unsafe_code)]`)
    - `apps/` — user applications (bundle-deployed)
    - `samgr/`, `bundlemgr/`, `nexus-ipc/`, `nexus-loader/` — core domain libraries
    - `nexus-idl-runtime/` — Cap'n Proto IDL runtime
  - `tools/` — developer tools (IDL generators, schema validators)
  - `tests/` — test suites (e2e, e2e_policy, remote_e2e, vfs_e2e)
  - `tasks/` — task tracking and execution plans
  - `scripts/` — build, run, test scripts (QEMU, CI)
  - `podman/` — container definitions (CI environment)
  - `recipes/` — reusable build recipes
  - `LICENSE`, `README.md`, `Makefile`, `justfile`

---

## Build Flow  

**`We test on the host first, validate in QEMU second.`**

- **`Host userspace builds`** with nexus_env="host" — fast, testable, Miri-validated.
- **`OS userspace builds`** with nexus_env="os" — same code, syscall stubs.
- **`Kernel cross-compiles`** to RISC-V — minimal, capability-enforced.

The workflow: just test-host → just miri-strict → just test-os.
Fast feedback first.
Truth validation second.
That's how you build a real OS.

---

## Why This Matters  

**`This architecture gives us freedom.`**

- **`Host-first testing`** means validate logic fast, validate truth in QEMU.
- **`Userspace libraries are independent:`** safe, testable, replaceable—no kernel knowledge required.
- **`Services stay thin:`** they're adapters, not engines. Swap the adapter, keep the logic.
- **`Capability-based security`** is enforced at the architecture level, not bolted on.

In short: we get **`the highest security`**
without the highest complexity.
That's what makes our architecture not just secure,
but maintainable.

---
