# Phase 1 Slice 1 Plan

## Slice Name

Shared artifact constants and error names

## 1. Purpose

This slice is the smallest safe first Phase 1 implementation step.

Its purpose is to document shared artifact constants and stable error names in existing placeholder README files only. It prepares the repository for later artifact and crypto implementation without adding runtime behavior.

This slice must not implement validation, canonical serialization, signing, verification, CLI commands, app logic, UI, AI, storage, cloud, billing, or dependencies.

## 2. Exact Files Allowed

The future implementation slice may edit only:

- `packages/artifact/README.md`
- `packages/contracts/README.md`
- `packages/test-fixtures/README.md`
- `tests/README.md`

## 3. Exact Files Forbidden

The future implementation slice must not edit:

- `package.json`
- `docs/REBUILD_ROADMAP.md`
- `docs/PHASE_0_SKELETON.md`
- `docs/PHASE_0_COMPLETION.md`
- `docs/PHASE_1_PLANNING.md`
- `docs/PHASE_1_DECISIONS.md`
- `apps/guard-cli/`
- `apps/fixer-cli/`
- `apps/guard-ui/`
- `apps/fixer-ui/`
- `packages/crypto/`
- `packages/guard-core/`
- `packages/fixer-core/`
- `packages/patch-engine/`
- `packages/ai/`
- `packages/storage/`
- `packages/audit/`
- Any new source code files.
- Any dependency or lock files.

## 4. Constants To Define Later

The future implementation slice may document these constants only.

Artifact file name:

- `violations.json`

Schema version:

- `1.0.0`

Required top-level sections:

- `schemaVersion`
- `issuer`
- `target`
- `generatedAt`
- `findings`
- `security`

Stable error names:

- `SCHEMA_INVALID`
- `VERSION_UNSUPPORTED`
- `SIGNATURE_INVALID`
- `PAYLOAD_HASH_MISMATCH`
- `ISSUER_UNTRUSTED`
- `TARGET_PROJECT_MISMATCH`
- `DATA_MINIMIZATION_VIOLATION`

## 5. What Must Not Be Implemented Yet

The future implementation slice must not add:

- Validation logic.
- Canonical serialization.
- Signing.
- Verification.
- CLI commands.
- App logic.
- UI.
- AI.
- Dependencies.
- Storage, cloud, or billing logic.
- Runtime source files.
- Test execution logic.

## 6. Minimum Manual Verification Commands

After the future implementation slice, run:

```bash
git status --short
git diff --stat
git diff -- packages/artifact/README.md packages/contracts/README.md packages/test-fixtures/README.md tests/README.md
find . -maxdepth 3 -type d -name "base44" -o -type f -name "*base44*"
npm run check
```

Expected results:

- Only the four allowed README files changed.
- No Base44 runtime folder or Base44-named file exists.
- No dependencies were added.
- `npm run check` passes.

## 7. Commit Safety Checklist

Before committing the future implementation slice, verify:

- The edit is documentation-only.
- Only allowed README files changed.
- Artifact constants match `docs/PHASE_1_DECISIONS.md`.
- Stable error names match `docs/PHASE_1_DECISIONS.md`.
- No validation logic was added.
- No canonical serialization was added.
- No signing or verification was added.
- No CLI or app logic was added.
- No UI, AI, storage, cloud, or billing work was added.
- No dependencies were added.
- Base44 remains excluded except reference-only exclusion language.
