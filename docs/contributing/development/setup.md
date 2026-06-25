---
sidebar_position: 2
---

# Development Setup

Getting started should be as simple as cloning, building, and running. It mostly is.

## Requirements

The scripts currently expect a **Linux environment**, with checks for **Arch,
Ubuntu, and Fedora**:

- Arch and Ubuntu are fully tested.
- Fedora should work, but is less battle-tested.
- WSL may struggle with outdated packages.
- macOS isn't supported yet. (Make it work and tell us — you'll be a hero.)

## Three commands

Inside `/scripts/` you'll find a Makefile. That's all you need:

- `make initial-setup` — install dependencies, prepare the workspace
- `make build` — compile the system
- `make run` — boot it in QEMU

RISC-V is the foundation, not a future promise: the build cross-compiles the kernel
to RISC-V and boots it under QEMU. For the host-first test loop behind this, see
[how we prove it](/docs/architecture/validation).

Once you can build, you can explore — and have useful, specific conversations about
the system.
