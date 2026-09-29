# ML System Design Notes Platform

## Git Commit Rules

When completing a task, inspect the diff and recent commit history before committing.

- Separate unrelated changes into coherent commits.
- Give each distinct activity its own commit.
- Never include files you did not intentionally change.
- Follow the repository's existing commit-message convention.
- If no convention exists, use an imperative subject under 48 characters that describes the observable change.
- Format the subject as `<type>(<scope>): <imperative, mechanism not symptom>`.
- Add a body when the reason, trade-off, migration, or behavior change is not obvious. Explain why the change was made; let the diff show how.
- Limit each commit message to two lines: one subject line and, when needed, one explanatory line.
- Report only tests that were actually run.
- Before each commit, review the staged diff and verify that the proposed message accurately describes everything staged.
- If the work cannot be split safely, explain why.
- Do not add an AI agent or AI tool as a co-author or other project attribution.
- Do not add `Co-authored-by` trailers for AI agents.
- Keep human authorship information accurate.
