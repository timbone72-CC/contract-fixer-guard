# Phase 1 Slice 2 Plan

## Slice Name

Target project manifest contract

## 1. Purpose

This slice plans a future documentation-only update for the `contract-project.json` identity contract before any parsing, validation, project detection, or artifact verification logic exists.

The goal is to document the explicit local target project identity rules that Guard and Fixer will later rely on.

## 2. Allowed Future Implementation-Slice Files

The future implementation slice may edit only:

- `packages/contracts/README.md`
- `packages/artifact/README.md`
- `packages/test-fixtures/README.md`
- `tests/README.md`

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

## 4. Manifest Contract Decisions

The future implementation slice may document these decisions only:

- Manifest file name: `contract-project.json`
- Required fields:
  - `projectId`
  - `name`
- `projectId` must be present and non-empty.
- `name` must be present and non-empty.
- Guard signs `target.projectId`.
- Fixer reads the target manifest later.
- Fixer rejects an artifact when manifest `projectId` does not match artifact `target.projectId`.
- No path hashing in this slice.
- No project-root hashing in this slice.

## 5. What Must Not Be Implemented Yet

The future implementation slice must not add:

- Manifest parser.
- Schema validator.
- File reads.
- Project detection.
- Artifact verification.
- Crypto.
- CLI.
- App logic.
- UI.
- AI.
- Dependencies.
- Storage, cloud, or billing logic.
- Tests.

## 6. Manual Verification Commands

After the future implementation slice, run:

```bash
git status --short
git diff --stat
git diff -- packages/contracts/README.md packages/artifact/README.md packages/test-fixtures/README.md tests/README.md
find . -maxdepth 3 \( -type d -name "base44" -o -type f -iname "*base44*" \)
npm run check
```

Expected results:

- Only allowed README files changed.
- No new source files were added.
- No dependency or lock files changed.
- No Base44 runtime folder or Base44-named file exists.
- `npm run check` passes.

## 7. Commit Safety Checklist

Before committing the future implementation slice, verify:

- The edit is documentation-only.
- Only allowed README files changed.
- `contract-project.json` is documented as the manifest file name.
- `projectId` and `name` are documented as required non-empty fields.
- Guard/Fixer target project responsibilities are documented.
- No parser, validator, file reads, project detection, artifact verification, or crypto was added.
- No CLI, app, UI, AI, storage, cloud, or billing work was added.
- No dependencies were added.
- Base44 remains excluded except reference-only exclusion language.
