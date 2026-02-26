You are joining an existing monorepo and need to get fully up to speed quickly so the team can execute today.

Objectives
- Build accurate project context first.
- Identify what is production-ready vs in-progress vs docs-only.
- Produce an actionable plan that lets developers move forward immediately.

How to work
- Do a read-only context pass first. Do not make code changes until I explicitly say implement.
- Use repo tools to inspect structure, key docs, entrypoints, configs, and scripts.
- Be practical and specific. If anything is ambiguous, state assumptions clearly.
- Do not ask broad questions early; gather what you can first, then ask only high-value clarifying questions.

What I need from you after context gathering
1) Repo map
- What exists now vs what is planned.
- Which components are implemented, partial, or docs-only.
- How major services/apps/packages connect.

2) Run readiness check
- Exact local run steps for each relevant app/service.
- Required environment variables and dependencies.
- How to verify health and core functionality.
- Likely failure points and fast fixes.

3) Delivery plan
- Recommended implementation order for MVP progress.
- Minimal, concrete build plan with milestones.
- Local development workflow across dependent components.

4) Execution checklist for today
- Prioritized checklist developers can execute immediately.
- First 3 implementation tasks with acceptance criteria.
- Risks/blockers with mitigations.

Output format
- Start with a concise summary.
- Then provide sections: Current State, Runbook, Delivery Workflow, Today’s Task List, Open Questions.
- Keep output action-oriented and specific to this repo.

Optional add-on line if immediate action is desired:
After the summary, begin implementing step 1 of the plan and continue until blocked.
