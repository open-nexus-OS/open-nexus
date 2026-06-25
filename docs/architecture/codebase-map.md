---
sidebar_position: 5
---

# Codebase Map

The OS repository is a collection of modules organized by the boundaries described
in the [overview](/docs/architecture/overview): kernel, services, userspace. Here's
where everything lives.

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
  - `tools/` — developer tools (IDL generators, schema validators, `arch-check`)
  - `tests/` — test suites (e2e, e2e_policy, remote_e2e, vfs_e2e)
  - `tasks/` — task tracking and execution plans
  - `scripts/` — build, run, test scripts (QEMU, CI)
  - `podman/` — container definitions (CI environment)
  - `recipes/` — reusable build recipes
  - `LICENSE`, `README.md`, `Makefile`, `justfile`

## Build flow

The same source compiles three ways, fastest feedback first:

- **Host userspace** — `nexus_env="host"`: fast, host-tested, Miri-validated.
- **OS userspace** — `nexus_env="os"`: identical code, real syscalls.
- **Kernel** — cross-compiled to RISC-V: minimal, capability-enforced.

The everyday loop is `just test-host → just miri-strict → just test-os`. How that
proof is gated end-to-end is covered in [how we prove it](/docs/architecture/validation).

---

Next: [Research & papers →](/docs/architecture/research-and-papers)
