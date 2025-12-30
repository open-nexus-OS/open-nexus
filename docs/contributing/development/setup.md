---
sidebar_position: 2
---

# Development Setup  

Open Nexus is built with one principle:  
getting started should be as simple as cloning, building, and running.  

## Requirements  

Right now, the scripts expect a **Linux environment**.  
We’ve added checks for **Arch, Ubuntu, and Fedora**.  

- Arch and Ubuntu are fully tested.  
- Fedora should work, but is less battle-tested.  
- WSL may run into trouble with outdated packages.  
- macOS? Not yet. (If you make it work, tell us — you’ll be a hero.)  

## How It Works  

Inside `/scripts/` you’ll find a Makefile. Three commands are all you need:  

- `make initial-setup` — install dependencies, prepare the workspace  
- `make build` — compile the system  
- `make run` — boot it in QEMU  

## Current State  

**RISC-V is our foundation, not a future promise.**
We test on the host for speed, then validate in QEMU for truth.
That's how you build a real OS.

---

In short:  
Linux + Makefile = a working Nexus.  
If you can build, you can contribute.
