# Internal SaaS Modeling Scaffold

Internal SaaS pages need a different upstream model than public marketing pages. The strategic diagnosis should identify whether the page is a repeat-use work surface, occasional admin page, setup flow, analytical dashboard, or exception triage queue.

Before architecture, collect or infer:

- object/entity model
- primary task model
- user roles and permissions
- data density expectation
- table/list/detail behavior
- bulk actions
- filters/sort/search
- empty/loading/error states
- escalation/audit/billing/security states
- mobile degradation policy

Use `schemas/internal-page-task-model.v1.schema.json` as a starting contract for these pages.
