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

The build flow copies our Nexus “recipes” into the Redox fork,  
so we stay independent from Redox while still building on its kernel.  
That keeps the architecture clean — our modules live in our repo, not theirs.  

## Current State  

For now, builds target **x86**, not RISC-V.  
Why? Because Redox on x86 is the most stable path for development today.  
RISC-V support is coming — and it’s core to our vision —  
but if you want to contribute now, x86 is where the action is.  

---

In short:  
Linux + Makefile = a working Nexus.  
If you can build, you can contribute.
