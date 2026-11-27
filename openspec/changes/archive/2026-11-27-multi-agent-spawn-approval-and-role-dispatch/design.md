# Design: Axiom 82 Multi-Agent Spawn Approval & Poteto Role Architecture

## Poteto Multi-Agent Alignment (`orchestrate.md` & `poteto-agent.md`)
1. **Coordinator Owns the Program**: The main agent maintains the role ledger, todo list, and every spawn decision; delegates never spawn unapproved agents.
2. **Bounded Role & Path Ownership**: Each agent receives a structured `roleTag` + `roleDetail` (including writable/read-only boundaries), preventing cross-role drift.
3. **Reuse on Follow-Up, Never Poll**: Existing idle agents with matching `roleTag` are reused via `send_message` with `focusedScope`; never messaged merely to poll status.
4. **Verifier Independence**: Implementation authors do not self-verify; verification tasks belong to a dedicated verifier role.
5. **User Spawn Sovereignty**: Overriding autonomous fan-out, **no new Swarm or Subagent may be spawned in any thread without explicit user approval**.
