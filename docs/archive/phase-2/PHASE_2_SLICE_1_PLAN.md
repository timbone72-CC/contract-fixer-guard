# Phase 2 Slice 1 Plan

## Slice Name

Shared artifact constants module and offline sanity test

## 1. Purpose

Phase 2 starts with the smallest real implementation step: a shared artifact constants module plus one offline sanity test that proves the exported constants are available and stable.

This plan does not implement code. It defines the exact future implementation scope, acceptance checks, and out-of-scope boundaries.

## 2. Option Decision

Decision: start Phase 2 with Option C.

Option C means the first implementation slice is intentionally narrow:

- Create shared constants only.
- Add a minimal offline sanity test only.
- Do not add artifact parsing, validation, canonical serialization, hashing, signing, or verification.
- Do not add Guard or Fixer runtime behavior.

## 3. Allowed Future Implementation Files

The future implementation slice may create or edit only:

- `packages/artifact/constants.js`
- `packages/artifact/README.md`
- `tests/artifact-constants.test.js`
- `package.json`

`package.json` may be edited only if needed to add a built-in Node test/check script that uses no dependencies.

## 4. Forbidden Future Implementation Files

The future implementation slice must not edit:

- Any app directory.
- `packages/crypto/`
- `packages/guard-core/`
- `packages/fixer-core/`
- `packages/patch-engine/`
- `packages/storage/`
- `packages/ai/`
- `packages/audit/`
- `packages/contracts/` except no changes are expected for this slice.
- Any dependency or lock file.
- Any UI file.
- Any cloud, storage, or billing file.

## 5. Constants To Implement Later

The future constants module may export only static values from Phase 1 decisions:

- Artifact file name: `violations.json`
- Schema version: `1.0.0`
- Required top-level sections:
  - `schemaVersion`
  - `issuer`
  - `target`
  - `generatedAt`
  - `findings`
  - `security`
- Security section fields:
  - `payloadHash`
  - `signature`
  - `keyId`
- Stable error names:
  - `SCHEMA_INVALID`
  - `VERSION_UNSUPPORTED`
  - `SIGNATURE_INVALID`
  - `PAYLOAD_HASH_MISMATCH`
  - `ISSUER_UNTRUSTED`
  - `TARGET_PROJECT_MISMATCH`
  - `DATA_MINIMIZATION_VIOLATION`

## 6. Offline Sanity Test Scope

The future test may verify only:

- Artifact file name constant equals `violations.json`.
- Schema version constant equals `1.0.0`.
- Required top-level sections include the six expected section names.
- Security fields include `payloadHash`, `signature`, and `keyId`.
- Stable error names include the seven expected names.

The test must run offline and use only built-in Node functionality.

## 7. Explicitly Out Of Scope

The future implementation slice must not add:

- Runtime behavior.
- Dependencies.
- Artifact parser.
- Schema validator.
- Canonical serializer.
- Hashing.
- Signing.
- Verification.
- File reads.
- Guard CLI behavior.
- Fixer CLI behavior.
- App logic.
- UI.
- AI.
- Storage, cloud, or billing logic.
- Base44 runtime files.

## 8. Guard / Fixer Separation

This slice must preserve separation of power:

- The constants module is shared inert data only.
- Guard gains no mutation authority.
- Fixer gains no diagnostic authority.
- No execution authority is introduced.
- Patch intent remains non-executable.

## 9. Acceptance Checks For Future Slice

Future implementation is acceptable only if:

- Only allowed files changed.
- No dependencies were added.
- No lock file was added.
- No Base44 folder or Base44-named file exists.
- Constants match Phase 1 decisions.
- The offline sanity test passes.
- Existing `npm run check` remains harmless and passes, or is replaced only with a dependency-free Node sanity command.

## 10. Manual Verification Commands

After the future implementation slice, run:

```bash
git status --short
git diff --stat
git diff -- packages/artifact/constants.js packages/artifact/README.md tests/artifact-constants.test.js package.json
find . -maxdepth 3 \( -type d -name "base44" -o -type f -iname "*base44*" \)
npm run check
```

If a separate test script is added, also run it explicitly.

## 11. Commit Safety Checklist

Before committing the future implementation slice, verify:

- The slice contains only shared constants and one offline sanity test.
- No parser, validator, canonical serializer, hashing, signing, or verification was added.
- No Guard or Fixer runtime behavior was added.
- No UI, AI, storage, cloud, or billing work was added.
- No dependencies or lock files were added.
- Guard/Fixer separation is preserved.
- Base44 remains excluded except reference-only exclusion language.
