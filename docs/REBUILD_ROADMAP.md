# Contract Guard + Contract Fixer Rebuild Roadmap

## 1. Executive Summary

Contract Guard and Contract Fixer will be rebuilt as two separate Base44-free apps that work together through a signed diagnostic artifact handoff.

The existing Base44 apps are reference material only. They may inform terminology, contracts, and lessons learned, but the rebuild must not inherit Base44 SDKs, folders, function packaging, app IDs, runtime assumptions, deployment model, or identity model.

The product is a safety and control layer for AI-assisted code changes:

- AI may recommend.
- Contracts decide what is allowed.
- User approves.
- Fixer executes only verified instructions.

Development starts CLI-first. The safety pipeline must pass deterministic command-line tests before UI work begins.

## 2. Product Definition

Contract Guard and Contract Fixer are separate tools with separate authority.

Contract Guard is diagnostic. It may scan, analyze, recommend, use AI later, and generate signed diagnostic artifacts. It must not modify user code.

Contract Fixer is surgical. It may verify signed artifacts, show dry-run diffs, create backups, apply approved changes, and roll back on failure. It must not independently diagnose or execute anything without both a verified artifact and explicit user approval.

The core handoff is:

1. Guard creates a signed artifact.
2. User transfers the artifact.
3. Fixer verifies the artifact.
4. Fixer shows a dry-run diff.
5. Fixer creates a backup.
6. User approves.
7. Fixer applies safely.
8. Fixer rolls back on failure.

## 3. Role Separation

### Contract Guard

Guard may:

- Scan or analyze a target project.
- Create findings.
- Recommend fixes or patch intent.
- Use AI later to improve diagnosis.
- Generate and sign diagnostic artifacts.

Guard must not:

- Modify user code.
- Apply patches.
- Create backups for mutation.
- Approve execution.
- Share runtime authority with Fixer.

### Contract Fixer

Fixer may:

- Verify signed artifacts.
- Reject invalid artifacts.
- Show dry-run diffs.
- Create backups before mutation.
- Apply verified, approved changes.
- Roll back on failure.
- Record audit events.

Fixer must not:

- Scan independently.
- Diagnose independently.
- Trust caller-provided origin data.
- Execute unsigned instructions.
- Execute AI output directly.
- Apply changes without explicit user approval.

## 4. GM / Builder Workflow Rule

The workflow roles are fixed:

- Codex is the builder, file creator, and implementation assistant.
- ChatGPT is the GM, verifier, workflow lead, and scope guard.
- User is the final authority.

Before each implementation batch, ChatGPT defines the scope, expected state, verification commands, and handoff criteria. Codex builds only within that scope and reports results. The user approves direction and commits.

## 5. No-Base44 Enforcement Rules

The rebuild must exclude Base44 completely:

- No Base44 SDK.
- No Base44 folders.
- No Base44 function packaging.
- No Base44 app IDs.
- No Base44 runtime assumptions.
- No Base44 deployment dependency.
- No Base44 identity model.

Any accidental Base44 dependency is a blocker until removed.

## 6. Proposed Monorepo Structure

Use one monorepo while preserving two-app separation:

```txt
contract-fixer-guard/
  apps/
    guard-cli/
    fixer-cli/
    guard-ui/
    fixer-ui/

  packages/
    contracts/
    artifact/
    crypto/
    guard-core/
    fixer-core/
    patch-engine/
    ai/
    storage/
    audit/
    test-fixtures/

  docs/
  tests/
```

Shared packages may define:

- Artifact schema.
- Canonical serialization.
- Crypto helpers.
- Validation.
- Error types.
- Shared types.
- Audit event types.
- Test fixtures.

Shared packages must not:

- Allow Guard to mutate files.
- Allow Fixer to run diagnostics independently.
- Allow AI output to execute directly.
- Erase the separation of power between Guard and Fixer.

## 7. CLI-First Rule

Build CLI flows before UI.

Reason: the safety pipeline must work in deterministic tests before screens are placed around it.

Conceptual early commands:

```bash
guard scan ./test-projects/bad-project --out ./tmp/violations.json
fixer verify ./test-projects/bad-project ./tmp/violations.json
fixer dry-run ./test-projects/bad-project ./tmp/violations.json
fixer apply ./test-projects/bad-project ./tmp/violations.json --approve
```

UI work must not begin until the CLI safety proof passes end to end.

## 8. Target Project Identity Decision

Use an explicit local project manifest first.

Example concept:

```json
{
  "projectId": "test-project-001",
  "name": "Bad Fixture Project"
}
```

Do not start with clever identity logic. Start explicit and testable.

Later phases may add path hashing, project-root hashing, or stronger identity proofs if they are needed and can be tested.

## 9. MVP Safety Path

The first reliable MVP must prove:

- Artifact schema.
- Canonical serialization.
- Signing.
- Verification.
- Target project match.
- Untrusted origin rejection.
- Tamper rejection.
- Dry-run diff.
- Backup before mutation.
- Explicit approval.
- One safe `REPLACE` patch type.
- Rollback on failure.
- Immutable zone protection.
- Audit log event creation.

## 10. Roadmap Phases

### Phase 0 - No-Base44 Rebuild Foundation

Goal: establish a clean rebuild foundation with no Base44 assumptions.

Build scope:

- Repository skeleton.
- Package boundaries.
- Tooling decisions.
- No-Base44 lint or grep checks.
- Initial docs and contracts.

Out of scope:

- App logic.
- UI.
- AI.
- Cloud storage.
- Patch execution.

Completion criteria:

- Monorepo structure exists.
- No Base44 files, imports, folders, IDs, or runtime assumptions exist.
- Guard and Fixer boundaries are documented.

Verification/tests:

- Grep for Base44 references.
- Basic package build check.
- Docs review by ChatGPT.

Risks:

- Accidentally carrying over Base44 naming or identity assumptions.
- Overbuilding before the safety core exists.

### Phase 1 - Shared Artifact / Crypto / Contract Core

Goal: define and test the signed artifact trust layer.

Build scope:

- Artifact schema.
- Canonical serialization.
- Signing and verification.
- Error codes.
- Trusted issuer model.
- Explicit target project manifest validation.

Out of scope:

- Scanning.
- Patching.
- UI.
- AI.
- Cloud storage.

Completion criteria:

- Valid artifacts verify.
- Tampered artifacts fail.
- Wrong target project fails.
- Untrusted issuer fails.
- Wrong schema version fails.

Verification/tests:

- Valid artifact test.
- Invalid signature test.
- Tampered artifact test.
- Wrong target project test.
- Untrusted issuer test.
- Wrong schema version test.
- Canonical serialization stability test.

Risks:

- Signature drift from unstable serialization.
- Weak issuer trust model.
- Ambiguous project identity.

### Phase 2 - Guard CLI

Goal: produce signed diagnostic artifacts locally.

Build scope:

- `guard scan` command.
- Deterministic non-AI rules.
- Data minimization checks.
- Signed artifact export.
- Guard audit events.

Out of scope:

- AI.
- UI.
- Cloud.
- Fix application.

Completion criteria:

- Guard can create a signed artifact from a fixture project.
- Artifact contains no raw source-code blocks by default.
- Guard does not mutate target files.

Verification/tests:

- Guard read-only behavior test.
- Data minimization test.
- Signed artifact fixture test.
- Artifact schema validation test.

Risks:

- Findings include too much source context.
- Guard accidentally writes to the project.

### Phase 3 - Fixer CLI

Goal: verify artifacts and safely apply one approved patch type.

Build scope:

- `fixer verify`.
- `fixer dry-run`.
- `fixer apply --approve`.
- Backup creation.
- One safe `REPLACE` patch type.
- Immutable zone protection.
- Rollback on forced failure.
- Fixer audit events.

Out of scope:

- Independent scanning.
- AI.
- UI.
- Multiple patch types.
- Cloud storage.

Completion criteria:

- Fixer refuses invalid artifacts.
- Dry-run diff appears before mutation.
- Backup is created before mutation.
- User approval is required.
- One safe patch applies.
- Forced failure rolls back.

Verification/tests:

- Dry-run diff test.
- Backup-before-mutation test.
- Patch apply success test.
- Forced patch failure rollback test.
- Immutable zone protection test.
- Fixer no-independent-diagnostics behavior test.

Risks:

- Partial mutation on failure.
- Approval gate bypass.
- Patch engine too permissive.

### Phase 4 - End-to-End Guard -> Artifact -> Fixer Handoff Proof

Goal: prove the complete local trust pipeline.

Build scope:

- Fixture project.
- Guard scan output.
- User-style artifact transfer through local files.
- Fixer verification.
- Dry-run.
- Backup.
- Approval.
- Apply.
- Rollback test.

Out of scope:

- UI.
- AI.
- Cloud storage.
- More patch types.

Completion criteria:

- Full local handoff works from Guard to Fixer.
- Invalid handoffs fail visibly.
- Audit events exist for major gates.

Verification/tests:

- End-to-end happy path.
- Tampered artifact path.
- Wrong target project path.
- Untrusted issuer path.
- Forced apply failure path.

Risks:

- CLI commands work individually but not as a pipeline.
- Audit trail misses critical gates.

### Phase 5 - Guard UI + Fixer UI

Goal: wrap the proven CLI/core flow in usable local screens.

Build scope:

- Guard UI for scan, review, and artifact export.
- Fixer UI for artifact upload, verification result, dry-run diff, approval, apply, and rollback status.
- UI uses core packages and cannot bypass safety gates.

Out of scope:

- AI.
- Cloud accounts.
- Hosted execution.
- Paid billing.

Completion criteria:

- UI performs the same safety path as CLI.
- UI cannot apply without verified artifact and approval.
- UI shows verification and failure states clearly.

Verification/tests:

- UI cannot bypass core gates test.
- Playwright handoff test.
- Approval gate test.
- Visible failure state test.

Risks:

- UI duplicates core logic.
- UI hides safety errors.
- UI introduces bypass paths.

### Phase 6 - AI-Assisted Guard

Goal: add AI diagnosis support without giving AI execution authority.

Build scope:

- Mock AI provider first.
- AI adapter interface.
- Guard-side AI explanations and finding suggestions.
- AI output schema validation.
- Provider adapters later for OpenAI, Anthropic, Grok, and local models.

Out of scope:

- AI directly editing files.
- AI signing artifacts by itself.
- AI approving execution.
- Background AI jobs.
- Paywall or billing system.

Completion criteria:

- Mock AI suggestions can become validated findings.
- Invalid AI output is rejected.
- AI output cannot bypass contracts.
- App works without AI.

Verification/tests:

- Mock AI provider tests.
- Malformed AI response tests.
- Prompt-injection resistance tests.
- Data minimization tests.

Risks:

- AI recommendations become de facto execution authority.
- Sensitive source is sent to AI unnecessarily.
- Provider-specific assumptions leak into core packages.

### Phase 7 - Advanced Patching

Goal: expand patch capability without becoming a broad AI coding agent.

Build scope:

- Additional patch types after `REPLACE`.
- Multi-file atomic apply.
- Conflict detection.
- Better immutable-zone rules.
- Patch capability matrix.

Out of scope:

- Agentic autonomous editing.
- Unreviewed changes.
- AI-controlled execution.

Completion criteria:

- Each patch type has dedicated tests.
- Multi-file failures roll back fully.
- Dry-run remains mandatory.

Verification/tests:

- Patch type matrix tests.
- Conflict tests.
- Multi-file rollback tests.
- Immutable-zone regression tests.

Risks:

- Patch engine becomes too broad.
- Edge cases undermine rollback.

### Phase 8 - Storage / Cloud / Billing

Goal: add optional persistence and paid services without vendor lock-in.

Build scope:

- Local storage adapter remains default.
- Cloud storage adapter interface.
- Optional encrypted artifact or backup storage.
- User-provided API key model for AI.
- Pay-as-you-go design for later hosted usage.

Out of scope:

- Required cloud dependency.
- Required database.
- Raw source-code storage by default.
- Hosted accounts as a prerequisite.

Completion criteria:

- Local mode works with no account and no network.
- Cloud storage can be swapped through an adapter.
- AI costs are user-controlled.

Verification/tests:

- Local-only mode test.
- Storage adapter contract tests.
- No raw-source default storage test.
- Missing API key behavior test.

Risks:

- Cloud complexity arrives too early.
- Vendor lock-in.
- Hidden AI costs.

### Phase 9 - Production Hardening / Hosted Version

Goal: prepare a durable production offering after the local safety model works.

Build scope:

- Hosted account model if needed.
- Encrypted storage.
- Key rotation.
- Team audit retention.
- Release signing.
- Security review.
- Packaging and distribution.

Out of scope:

- Changing the core authority model.
- Letting hosted services bypass local safety gates.

Completion criteria:

- Hosted mode preserves local trust model.
- Keys can rotate.
- Audit records are reliable.
- Security review issues are addressed.

Verification/tests:

- Key rotation tests.
- Hosted/local parity tests.
- Security regression tests.
- Release smoke tests.

Risks:

- Hosted version weakens local-first safety.
- Billing/account features distract from reliability.

## 11. AI Strategy

AI belongs in Guard first.

AI may:

- Explain risks.
- Suggest findings.
- Classify severity.
- Propose patch intent.

AI must not:

- Directly edit files.
- Sign artifacts by itself.
- Approve execution.
- Bypass schema validation.
- Override contracts.
- Decide trusted origin.
- Run background jobs without user action.

Use a mock AI provider first. Add OpenAI, Anthropic, Grok, and local adapters later through the `packages/ai` boundary. AI usage can become user-funded or pay-as-you-go later, but AI must not be required for the local MVP.

## 12. Storage Strategy

Start with local filesystem storage:

- Local artifacts.
- Local backups.
- Local audit logs.
- No database for MVP.

Do not store raw source code by default.

Cloud storage comes later through an adapter. If cloud storage is added, support encryption where needed and avoid vendor lock-in.

## 13. Cost Strategy

The local MVP can be $0:

- No cloud dependency.
- No database.
- No required AI key.
- Local artifacts, backups, and audit logs.

Likely paid later:

- AI API usage.
- Hosted accounts.
- Cloud storage.
- Audit retention.
- Managed signing keys.

The first paid AI model should be user-provided API keys or explicit pay-as-you-go usage. The app must show or control AI usage so costs do not happen silently.

## 14. Testing Strategy

Required tests:

- Valid artifact.
- Invalid signature.
- Tampered artifact.
- Wrong target project.
- Untrusted issuer.
- Wrong schema version.
- Canonical serialization stability.
- Data minimization.
- Dry-run diff.
- Backup created before mutation.
- Patch apply success.
- Forced patch failure rollback.
- Immutable zone protection.
- Guard read-only behavior.
- Fixer no-independent-diagnostics behavior.
- UI cannot bypass core gates later.

Testing should use fixture projects copied into temporary directories so mutation tests never touch source fixtures directly.

## 15. First Build Gate

Before any implementation beyond this roadmap, ChatGPT must verify:

- The roadmap preserves two-app separation.
- Base44 is fully excluded.
- The CLI-first order is intact.
- Target project identity is explicit and testable.
- MVP scope has not expanded.
- AI has no execution authority.
- Storage, cloud, and billing are later phases.
- No UI work starts before CLI safety proof.
