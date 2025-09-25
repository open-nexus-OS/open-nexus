---
sidebar_position: 1
---

# Codebase Overview

The Open Nexus OS repository is not a monolith.  
It’s a collection of modules, organized with purpose:  
simple to navigate, simple to extend, simple to build.  

## Structure

- `open-nexus-os/`
  - `config/` — which modules to load  
  - `docs/` — documentation  
  - `LICENSE`, `NOTICE`, `README.md`  
  - `recipes/` — our actual modules  
    - `gui/`  
      - `nexus/` — window manager  
      - `nexus-assets/` — icons, wallpapers  
      - `nexus-background/` — wallpaper compositor  
      - `nexus-launcher/` — launcher  
      - `nexus-login/` — login system  
    - `libs/`  
      - `libnexus/`  
        - `themes/` — SVG icons and colors from assets  
        - `ui/` — UI elements  
      - `nexus-actionbar/` — top bar: notifications, control center  
      - `nexus-settingsd/` — local settings: light/dark mode, mobile/desktop  
  - `redox/` — Redox fork (base kernel & services)  
  - `scripts/` — setup, build, run  

---

## Build Flow  

The workflow is simple:  

- **`make initial-setup`** → prepare everything after cloning  
- **`make build`** → compile the system  
- **`make run`** → boot it in QEMU  

Our build script copies the Nexus “recipes” into the Redox fork before building.  
That means we work in **our own repository**, not inside Redox itself.  

---

## Why This Matters  

This separation gives us freedom.  

- We stay **independent from upstream Redox**, while reusing its proven kernel.  
- Our modules are **self-contained recipes**: easy to replace, extend, or swap.  
- Developers don’t have to learn the internals of Redox to contribute to Nexus.  

In short: we inherit the strength of Redox,  
without inheriting its complexity.  

That’s what makes our architecture not just clean,  
but future-proof.

---
