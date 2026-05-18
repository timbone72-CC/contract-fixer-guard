# Phase 1 Planning Note

## 1. Phase 1 Purpose

Phase 1 defines the shared artifact, crypto, and contract core for the Base44-free Contract Guard + Contract Fixer rebuild.

The goal is to decide the trust-layer details before implementation:

- Artifact shape.
- Canonical serialization rules.
- Signature and verification model.
- Trusted issuer model.
- Explicit target project identity.
- Shared errors and validation boundaries.
- Minimal tests required before Guard or Fixer app logic begins.

Phase 1 is planning-first. It must not implement artifact logic, crypto logic, app logic, UI, AI, storage, cloud, or billing.

## 2. In-Scope Packages

Planning may cover these packages:

- `packages/contracts/`: authority rules, trust boundaries, and allowed behavior.
- `packages/artifact/`: artifact schema decisions, versioning, canonicalization requirements, and validation expectations.
- `packages/crypto/`: signing and verification decisions, key format choices, and trust model requirements.
- `packages/audit/`: audit event names and trust-gate event expectations.
- `packages/test-fixtures/`: fixture categories needed for Phase 1 tests.

Planning may reference these packages only to define boundaries:

- `packages/guard-core/`: future Guard producer of signed artifacts.
- `packages/fixer-core/`: future Fixer verifier and enforcement layer.

## 3. Out-of-Scope Items

Phase 1 planning must not add:

- App logic.
- Guard scanning logic.
- Fixer apply logic.
- Artifact implementation.
- Crypto implementation.
- UI.
- AI.
- Cloud storage.
- Billing.
- Runtime deployment setup.
- Dependencies.
- Tests.

## 4. Guard / Fixer Separation Rules

Guard remains diagnostic and read-only:

- Guard may create findings.
- Guard may generate artifact payloads later.
- Guard may sign artifacts later.
- Guard must not modify user files.
- Guard must not approve execution.

Fixer remains surgical and gated:

- Fixer may verify artifacts later.
- Fixer may reject artifacts later.
- Fixer may dry-run and apply changes later only after verification and user approval.
- Fixer must not scan independently.
- Fixer must not diagnose independently.
- Fixer must not execute AI output directly.

Shared packages must support both apps without merging their authority. Shared artifact, crypto, validation, error, and audit types are allowed. Shared mutation or diagnosis authority is not allowed.

## 5. Base44-Free Confirmation

Phase 1 must remain Base44-free:

- No Base44 SDK.
- No Base44 folders.
- No Base44 app IDs.
- No Base44 function packaging.
- No Base44 runtime assumptions.
- No Base44 deployment dependency.
- No Base44 identity model.

Any Base44 reference in Phase 1 docs may only describe exclusion rules or reference-only history.

## 6. Explicit Target Project Identity Proposal

Use an explicit local project manifest first.

Proposed manifest file name:

```txt
contract-project.json
```

Proposed minimal fields:

```json
{
  "projectId": "test-project-001",
  "name": "Bad Fixture Project"
}
```

Initial rules to decide before implementation:

- `projectId` must be present and non-empty.
- `name` must be present and non-empty.
- Guard signs the target `projectId` into the artifact.
- Fixer reads the target project's manifest and rejects artifacts whose `projectId` does not match.
- No path hashing or project-root hashing in Phase 1.

Reasoning:

- Explicit identity is easy to inspect.
- It is deterministic in tests.
- It avoids clever identity logic before the trust layer is proven.

Later phases may consider path hashing, project-root hashing, or stronger project identity proofs only after the explicit manifest flow is tested.

## 7. Artifact Schema Questions To Decide

Before implementation, ChatGPT must decide or approve:

- Artifact file name convention, such as `violations.json`.
- Top-level schema version format, such as `"1.0.0"` or `"1"`.
- Required issuer fields.
- Required target project fields.
- Required generated timestamp format.
- Required finding fields.
- Allowed severity values.
- Allowed patch-intent fields.
- Whether artifact IDs are required.
- Whether artifact payloads may contain line text snippets.
- Data minimization limits for paths, line numbers, summaries, and code excerpts.
- Whether findings may contain multiple proposed fixes.
- Whether patch intent is required in Phase 1 or can wait for Fixer phases.
- Exact error names for schema validation failures.

Initial planning bias:

- Keep the artifact minimal.
- Prefer structural references over source text.
- Do not include raw source-code blocks by default.
- Include only enough patch intent to support a later safe `REPLACE` proof.

## 8. Crypto / Signing Questions To Decide

Before implementation, ChatGPT must decide or approve:

- Signature algorithm.
- Key format for test/dev keys.
- Public key distribution model.
- Trusted issuer allowlist shape.
- Canonical serialization rules.
- Whether the signature covers the entire artifact minus the signature block.
- Whether payload hash and signature are both required.
- Key ID format.
- How key rotation is represented later.
- Which verification errors are visible and stable.

Initial planning bias:

- Use one deterministic canonical serialization function.
- Sign the canonical artifact payload excluding the signature block.
- Verify against an explicit trusted issuer list controlled by Fixer configuration, not artifact contents.
- Keep dev keys local and testable.
- Do not add cloud key management in Phase 1.

## 9. Minimal Test Plan Proposal

Phase 1 implementation should eventually include tests for:

- Valid artifact.
- Invalid signature.
- Tampered artifact.
- Wrong target project.
- Untrusted issuer.
- Wrong schema version.
- Missing required fields.
- Canonical serialization stability.
- Signature excludes only the signature block.
- Data minimization rules.

Tests should use fixtures under `packages/test-fixtures/` or `tests/` and must not require network access, cloud storage, UI, or AI.

No tests are added by this planning note.

## 10. Phase 1 Implementation Gate Checklist

Before Phase 1 implementation begins, ChatGPT must verify:

- Phase 1 remains planning-complete and implementation-ready.
- Guard/Fixer separation is preserved.
- Base44 remains fully excluded.
- Target project identity uses an explicit manifest first.
- Artifact schema questions have decisions.
- Crypto/signing questions have decisions.
- Minimal test plan is accepted.
- No UI work is introduced.
- No AI work is introduced.
- No storage, cloud, or billing work is introduced.
- No dependencies are added without an explicit Phase 1 implementation prompt.
