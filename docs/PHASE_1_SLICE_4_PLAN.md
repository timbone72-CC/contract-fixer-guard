# Phase 1 Slice 4 Plan

## Slice Name

Fixture/test acceptance and Phase 1 completion gate documentation

## 1. Purpose

This slice plans a future documentation-only update for final Phase 1 fixture categories, future offline test expectations, and Phase 1 completion criteria before any tests or implementation exist.

The goal is to close the documentation loop for Phase 1 without starting runtime work.

## 2. Allowed Future Implementation-Slice Files

The future implementation slice may edit only:

- `packages/test-fixtures/README.md`
- `tests/README.md`
- `docs/PHASE_1_COMPLETION.md`

## 3. Forbidden Future Implementation-Slice Files

The future implementation slice must not edit:

- `package.json`
- Any app directory.
- `packages/crypto/`
- `packages/guard-core/`
- `packages/fixer-core/`
- `packages/patch-engine/`
- `packages/storage/`
- `packages/ai/`
- Any new source files.
- Any dependency or lock files.

## 4. Final Fixture Categories To Document

The future implementation slice may document these fixture categories only:

- Valid artifact.
- Invalid signature.
- Tampered artifact.
- Wrong target project.
- Untrusted issuer.
- Wrong schema version.
- Missing required fields.
- Empty manifest fields.
- Raw source-code block violation.
- Secret/token data minimization violation.
- Security block mutation case.

## 5. Future Test Acceptance Expectations

The future implementation slice may document these expectations only:

- Tests are not added yet.
- Future tests must run offline.
- Future tests must not require UI, AI, cloud, billing, deployment, or Base44 runtime.
- Future tests must verify artifact constants.
- Future tests must verify target manifest contract.
- Future tests must verify schema section requirements.
- Future tests must verify data minimization rejection.
- Future tests must verify signing payload excludes `security`.

## 6. Phase 1 Completion Gate

The future implementation slice may document these Phase 1 completion criteria:

- Phase 1 docs are complete.
- Guard/Fixer separation is preserved.
- Base44 is excluded.
- No source or runtime code has been added.
- No dependencies have been added.
- Next phase must explicitly decide whether to start real implementation.
- No CLI, UI, AI, storage, cloud, or billing work starts automatically.

## 7. What Must Not Be Implemented Yet

The future implementation slice must not add:

- Tests.
- Source files.
- Runtime logic.
- Dependencies.
- Validation.
- Serialization.
- Canonical serialization.
- Hashing.
- Signing.
- Verification.
- CLI.
- App logic.
- UI.
- AI.
- Storage, cloud, or billing logic.

## 8. Manual Verification Commands

After the future implementation slice, run:

```bash
git status --short
git diff --stat
git diff -- packages/test-fixtures/README.md tests/README.md docs/PHASE_1_COMPLETION.md
find . -maxdepth 3 \( -type d -name "base44" -o -type f -iname "*base44*" \)
npm run check
```

Expected results:

- Only allowed documentation files changed.
- No new source files were added.
- No dependency or lock files changed.
- No Base44 runtime folder or Base44-named file exists.
- `npm run check` passes.

## 9. Commit Safety Checklist

Before committing the future implementation slice, verify:

- The edit is documentation-only.
- Only allowed files changed.
- Final fixture categories are documented.
- Future offline test acceptance expectations are documented.
- Phase 1 completion gate is documented.
- Guard/Fixer separation is preserved.
- Base44 remains excluded except reference-only exclusion language.
- No tests, source files, runtime logic, validation, serialization, hashing, signing, or verification were added.
- No CLI, app logic, UI, AI, storage, cloud, or billing work was added.
- No dependencies were added.
