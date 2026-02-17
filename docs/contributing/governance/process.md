---
sidebar_position: 1
---

# Contribution Workflow  

Open Nexus is a young project, but one thing is already clear:  
quality matters more than speed.  

We want the project to feel open, but also reliable.  
That means we optimize for **deterministic progress** over “inbox-driven development”.

One important note up front:
Open Nexus is currently maintained by a **solo developer**.  
So this workflow is less “submit anything” and more “here’s how we keep the system coherent”.

---

## How changes happen (in practice)

1. **Start with a conversation**  
   - Use Discord or a GitHub Discussion to describe the goal and why it matters.  
   - If it’s actionable, we’ll agree on scope and what “done” means.  

2. **Keep the change bounded**  
   - Small, focused diffs are reviewable. Big diffs are not.  
   - For larger shifts, we prefer an RFC first: write down the contract, invariants, and failure modes.  

3. **Proof before merge**  
   - Host-first tests where possible  
   - Bounded QEMU smoke proofs where necessary  
   - If we can’t validate it, we don’t ship it  

4. **Review and merge (single-maintainer gate)**  
   - Today, merges are reviewed and landed by the maintainer.  
   - Response time is best-effort. Silence usually means “not actionable right now,” not hostility.

---

## What we can and can’t take right now

- **Great right now**: docs fixes, clarifications, small isolated improvements with clear proof  
- **Maybe**: small bugfixes if they’re reproducible and scoped  
- **Not yet**: open-ended feature requests, broad refactors, “please triage my list” issues  

We’d rather be explicit than give false hope: the goal is to avoid building a backlog we can’t maintain.

If you’re excited about the project, the best starting point is still the same:  
talk to us. We’ll tell you where help would actually land.  
