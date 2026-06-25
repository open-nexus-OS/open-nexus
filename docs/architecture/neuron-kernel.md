---
sidebar_position: 2
---

# The NEURON Kernel

NEURON is the part we keep small on purpose. It's a minimal RISC-V microkernel
whose entire job is to isolate tasks, translate memory, schedule work, and pass
messages — and to do nothing else. No policy, no cryptography, no message parsing
lives here. The smaller this layer, the smaller the trusted computing base, and the
more of the system we can actually reason about.

## A 14-syscall surface

The core ABI is deliberately tiny. The minimal (os-lite) syscall set is:

```
yield   nsec    send    recv    map     vmo_create   vmo_write
spawn   cap_transfer    as_create    as_map    exit    wait    exec
```

Later work adds IPC v1 variants, endpoint creation, MMIO mapping, and capability
queries — but the baseline is fourteen calls. A surface this narrow is one you can
audit.

## Capabilities, deny-by-default

Every capability belongs to **exactly one task-local table**. Rights are derived by
intersection and can never escalate — an endpoint needs `SEND`/`RECV`, a VMO needs
`MAP`, and slots are pre-sized per task and validated at the syscall boundary.
Operations without an explicit grant are rejected. The kernel also stamps an
unforgeable sender identity on channels, so a service always knows who is really
calling.

## Memory: Sv39, W^X

Virtual memory uses **Sv39** translation with three levels of page tables;
intermediate tables are allocated lazily during mapping. The ASID allocator reserves
slot 0 for the kernel and tracks 256 total. Fresh address spaces get kernel identity
mappings with guarded stack pages and UART access — and every user mapping rejects
combined write-and-execute permission. **W^X** is enforced, not advised.

## Scheduling & IPC

Scheduling is round-robin across four priority buckets — `Idle`, `Normal`,
`Interactive`, `PerfBurst` — with cooperative yield in the idle loop. IPC uses a
fixed 16-byte header (source, destination, type, flags, payload length) with inline
payloads for small messages; bulk data moves out-of-band through shared memory
objects (see [services & userspace](/docs/architecture/services-and-userspace)).
Endpoints are namespace-managed by the kernel's `Router`.

## Invariants you don't touch

A few things are load-bearing and don't change without an RFC or ADR first:

- No shared mutable state without explicit synchronization.
- Kernel-owned subsystems are intentionally `!Send` / `!Sync`.
- Task PID allocation is centralized in `TaskTable`.
- All address-space mutations route through `AddressSpaceManager`.
- Syscall IDs/ABI, the trap prologue/epilogue, and the kernel memory map / SATP
  assumptions are fixed contracts.

---

Next: [Services & userspace →](/docs/architecture/services-and-userspace)
