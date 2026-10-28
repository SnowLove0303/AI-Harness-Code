# PStack consolidated scope record

Use this record only when the selected PStack playbook, the user's request, or an irreversible action needs explicit scope documentation. It is information for the active OpenSpec change. It does not create a second task list or add an approval pause by default.

```markdown
## Scope record

- Original user request: <verbatim text or OpenSpec proposal pointer>
- Appended directives: <verbatim, chronological list>
- Active OpenSpec change and task: <change-id, task-id>
- Selected PStack playbook and steps: <source path; steps are in tasks.md>
- Prior verified work and Git state: <commit, branch, evidence>
- Writable paths: <paths>
- Read-only paths: <paths>
- Protected invariants: <OpenSpec invariant IDs and regression checks>
- Non-goals: <specific exclusions>
- Acceptance checks: <commands and observable outcomes>
```

Proceed under PStack's autonomy rules. Stop only when a genuine user decision, an explicit user gate, missing authority, or an irreversible action requires it.
