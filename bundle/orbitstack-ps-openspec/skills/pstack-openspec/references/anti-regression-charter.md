# Protect accepted fixes and optimizations

Use PStack's `Correct`, `Interrogate`, `Prove It Works`, and behavior-test principles as the review method. This extension supplies provenance across later tasks and uses Code Review Graph to find affected code.

## Record a protected behavior

When a user accepts a fix or optimization that must survive later work, record it as an OpenSpec requirement with:

- A stable invariant ID.
- The originating OpenSpec archive and commit.
- The user-observable behavior or metric that must remain true.
- The implementation path and qualified symbol.
- The regression test, golden sample, or repeatable benchmark that proves it.

The OpenSpec specification owns the protection reason and evidence link. Graph data is derived and rebuildable.

## Review later changes

1. Use Code Review Graph's delta and affected-flow tools to inspect changed symbols, callers, and tests.
2. Match affected code to protected invariant IDs in OpenSpec specs.
3. Run each linked regression test or benchmark.
4. If a user request intentionally changes the old behavior, add an explicit superseding requirement in the active OpenSpec change and prove the replacement before archive.
5. Keep archived source changes unchanged. Update the current spec only by archiving the approved supersession.

Graph supplies impact clues. It does not decide whether a behavior is important, prove the behavior still works, or infer a user's intent.

## Fallback when Graph is unavailable

Check the Git diff against the recorded implementation paths and symbols, search the relevant callers, and run the same regression checks. Continue unrelated PStack tasks while the graph is rebuilt. An unavailable graph is a missing review input, not a reason to skip regression evidence.

## Root-cause learning

When PStack `Correct` or `Reflect` identifies a repeated failure, encode the fix in the highest reliable structural layer. Keep OpenSpec as the task and provenance record. Do not add a second global error ledger.
