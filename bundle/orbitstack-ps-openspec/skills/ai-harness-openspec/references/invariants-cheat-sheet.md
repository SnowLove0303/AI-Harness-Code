# PStack-first invariants

The pinned upstream PStack principles and selected playbook are the authoritative engineering rules. Read them in full; this file does not copy or redefine them.

The OpenSpec adapter adds two scoped protections:

1. **Lossless handoff.** Preserve the original user request and later directives in order, reference OpenSpec change/task IDs, hash governing instructions, constrain writable paths, and have the parent verify the result.
2. **Historical behavior protection.** Record accepted behavior in OpenSpec with an invariant ID, source, implementation anchor, and regression check. Use Code Review Graph to find impact. Require explicit supersession and replacement evidence to change the behavior.

Project-specific instructions, architecture facts, build commands, and official domain pipelines remain project-owned and stay intact.
