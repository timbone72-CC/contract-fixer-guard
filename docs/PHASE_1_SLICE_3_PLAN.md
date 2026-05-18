# Phase 1 Slice 3 Plan

## Slice Name

Artifact schema and signing boundary documentation

## 1. Purpose

This slice plans a future documentation-only update for `violations.json` schema responsibilities, data minimization rules, canonical serialization boundary, and signing coverage before any implementation exists.

The goal is to document each top-level artifact section's responsibility, the boundaries for minimal structural findings, and the signing boundary that later implementation must preserve.

## 2. Allowed Future Implementation-Slice Files

The future implementation slice may edit only:

- `packages/artifact/README.md`
- `packages/contracts/README.md`
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

## 4. Schema Section Responsibilities

The future implementation slice may document these responsibilities only:

- `schemaVersion` identifies the artifact schema version.
- `issuer` identifies the diagnostic producer but does not grant trust.
- `target` identifies the intended target project.
- `generatedAt` records artifact generation time.
- `findings` contains minimal structural findings.
- `security` contains:
  - `payloadHash`
  - `signature`
  - `keyId`

## 5. Finding Boundaries

The future implementation slice may document that findings may include:

- Path.
- Line.
- Severity.
- Rule id.
- Summary.
- Future patch intent.

The future implementation slice must document that findings must not include:

- Raw source-code blocks.
- Secrets.
- Credentials.
- Tokens.
- PII.
- Proprietary business logic beyond structural references.

Patch intent is not execution authority.

## 6. Canonical Serialization And Signing Boundary

The future implementation slice may document these signing boundary rules only:

- Deterministic serialization will be required later.
- The signing payload excludes the `security` block.
- `payloadHash` is computed from the canonical payload excluding `security`.
- The signature covers that canonical payload/hash boundary.
- `security` is evidence, not mutable working data.

## 7. What Must Not Be Implemented Yet

The future implementation slice must not add:

- Schema types.
- Validators.
- Parser.
- Serializer.
- Canonical serialization.
- Hashing.
- Signing.
- Verification.
- File reads.
- CLI.
- App logic.
- UI.
- AI.
- Dependencies.
- Tests.
- Storage, cloud, or billing logic.

## 8. Manual Verification Commands

After the future implementation slice, run:

```bash
git status --short
git diff --stat
git diff -- packages/artifact/README.md packages/contracts/README.md packages/test-fixtures/README.md tests/README.md
find . -maxdepth 3 \( -type d -name "base44" -o -type f -iname "*base44*" \)
npm run check
```

Expected results:

- Only allowed README files changed.
- No new source files were added.
- No dependency or lock files changed.
- No Base44 runtime folder or Base44-named file exists.
- `npm run check` passes.

## 9. Commit Safety Checklist

Before committing the future implementation slice, verify:

- The edit is documentation-only.
- Only allowed README files changed.
- Top-level `violations.json` section responsibilities are documented.
- Finding boundaries are documented.
- Data minimization rules are documented.
- Canonical serialization boundary is documented.
- Signing coverage is documented.
- Patch intent remains non-executable.
- No schema types, validators, parser, serializer, canonical serialization, hashing, signing, or verification were added.
- No file reads, CLI, app logic, UI, AI, storage, cloud, or billing work was added.
- No dependencies were added.
- Base44 remains excluded except reference-only exclusion language.
