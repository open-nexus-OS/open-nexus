---
sidebar_position: 6
description: "The published work behind the architecture."
sidebar_custom_props:
  icon: file
  color: "#0071e3"
---

# Research & Papers

The architecture on these pages isn't only described — it's published. The system
model is written up in a set of papers with DOIs, each tied back to code and a
released software artifact. If you want to validate the claims independently, start
here.

## The papers

| DOI | What it covers |
|---|---|
| [10.5281/zenodo.18935402](https://doi.org/10.5281/zenodo.18935402) | Deterministic capability microkernel |
| [10.5281/zenodo.18935755](https://doi.org/10.5281/zenodo.18935755) | Explicit control-plane / data-plane split |
| [10.5281/zenodo.18938789](https://doi.org/10.5281/zenodo.18938789) | Governed service architecture |
| [10.5281/zenodo.18939217](https://doi.org/10.5281/zenodo.18939217) | Userspace device-service substrate |
| [10.5281/zenodo.18941284](https://doi.org/10.5281/zenodo.18941284) | Contract-governed development workflow |
| [10.5281/zenodo.18934993](https://doi.org/10.5281/zenodo.18934993) | Published software artifact |

## Plain-language framing

The blog walks through what the papers mean and how they connect to the running code:

- [From Microkernel to Methodology](/blog/from-microkernel-to-methodology) — overview of the paper set
- [NEURON: A Microkernel You Can Measure](/blog/neuron-a-microkernel-you-can-measure) — technical framing for the kernel
- [Proof Over Luck](/blog/proof-over-luck) — progress on the distributed layer and system discipline

## Going deeper than this site

These pages are a curated entry point. The canonical, line-level reference lives in
the OS repository under [`docs/`](https://github.com/open-nexus-OS) — including a
numbered architecture reading order (kernel, selftest & CI, service onboarding, boot
and bring-up, policy flow, storage, identity) and deeper subsystem designs such as
the NexusGfx graphics stack, NexusInfer inference runtime, and the networking
authority. When this site and the repo disagree, the repo is the source of truth.
