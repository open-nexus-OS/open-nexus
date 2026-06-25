---
sidebar_position: 3
description: "Thin daemons, safe libraries, and the line between them."
sidebar_custom_props:
  icon: server
  color: "#0071e3"
---

# Services & Userspace

If the kernel does as little as possible, the system has to do the real work
somewhere. That somewhere is split in two: **safe userspace libraries** that hold
the logic, and **thin service daemons** that expose it over IPC. Keeping those
honest is most of what makes the architecture work.

## The thin-adapter pattern

A service is a process under `source/services/<name>d`. Its job is narrow:

- register with the service manager (`samgrd`),
- expose a Cap'n Proto interface,
- validate inputs and report rich errors,
- emit a deterministic readiness marker,
- and **delegate the actual logic** to a userspace library compiled for the OS.

That's it — wiring, lifecycle, and translation. The guiding rule:

> If service code starts accumulating "real logic," the boundary is leaking.

The logic lives in `userspace/` crates that are `#![forbid(unsafe_code)]` and tested
on the host. The daemon is just the adapter that lets the rest of the system reach
them.

## Control plane vs. data plane

Communication is split by size, which keeps the kernel out of the payload business:

- **Control plane (IPC).** Small, structured messages — registration, queries,
  commands. Typically under 1 KB, ~4 KB max. Encoded as Cap'n Proto, with a minimal
  byte-frame fallback for early QEMU bring-up. Schemas live in
  `tools/nexus-idl/schemas/`.
- **Data plane (bulk).** Large payloads use **VMOs** — kernel-backed shared memory.
  The producer allocates and writes, then transfers the capability to the consumer
  via metadata sent over the control plane. Zero-copy, and the kernel never parses
  the bytes.

## The core services

| Service | What it does |
|---|---|
| `samgrd` | Service registration and resolution — the registry everything else finds |
| `policyd` | The single policy authority; evaluates capability access, deny-by-default |
| `logd` | Bounded RAM journal — append / query / stats; the one observability authority |
| `bundlemgrd` | Install and query bundle (package) metadata |
| `execd` | Process spawning and crash reporting |
| `vfsd` | Virtual filesystem operations |
| `keystored` | Sign / verify; device identity keys |
| `identityd` | Identity and session management |
| `dsoftbusd` | Network payload transport (distributed device bus) |
| `rngd` | The single entropy authority (virtio-rng) |

Every one of them emits structured logs through the `nexus-log` facade — nothing
bypasses the logging path. One authority per concern, observable by default.

---

Next: [How we prove it →](/docs/architecture/validation)
