# Phase 2 Slice 2 Plan

## Slice Name

Artifact shape validator module and offline sanity test

## 1. Purpose

Phase 2 Slice 2 plans the next narrow implementation step: an artifact shape validator module plus one offline sanity test.

The future validator must perform plain object-shape checks only. It must not make cryptographic, trust, target-project, runtime, or mutation decisions.

This document is a plan only. It does not implement code.

## 2. Allowed Future Implementation Files

The future implementation slice may create or edit only:

- `packages/artifact/validateArtifactShape.js`
- `packages/artifact/README.md`
- `tests/artifact-shape.test.js`
- `package.json`

`package.json` may be edited only if needed to run the new offline sanity test through an existing dependency-free check command.

## 3. Forbidden Future Implementation Files

The future implementation slice must not edit:

- Any app directory.
- `packages/crypto/`
- `packages/guard-core/`
- `packages/fixer-core/`
- `packages/patch-engine/`
- `packages/storage/`
- `packages/ai/`
- `packages/audit/`
- Any dependency or lock file.
- Any UI file.
- Any cloud, storage, or billing file.

## 4. Allowed Validator Scope

The future validator may check only:

- Artifact value is a plain object.
- Required top-level sections exist.
- `schemaVersion` matches the artifact constants.
- `security` section has:
  - `payloadHash`
  - `signature`
  - `keyId`
- `findings` is an array.

The future validator may return a simple result shape, but that shape must only represent object-shape status and missing/mismatched section information.

## 5. Explicitly Forbidden Behavior

The future implementation slice must not add:

- Dependencies.
- Lock files.
- Base44 files or folders.
- Canonical serialization.
- Hashing.
- Signing.
- Signature verification.
- Trusted issuer verification.
- Target project matching.
- File reads.
- Guard runtime behavior.
- Fixer runtime behavior.
- CLI behavior.
- UI.
- AI.
- Storage, cloud, or billing logic.
- Mutation or patch behavior.
- Execution authority.

## 6. Offline Sanity Test Scope

The future test may verify only:

- A minimal valid artifact shape passes.
- A non-object artifact fails.
- A missing required top-level section fails.
- A wrong `schemaVersion` fails.
- Missing `security` fields fail.
- Non-array `findings` fails.

The test must run offline and use only built-in Node functionality.

## 7. Guard / Fixer Separation

This slice must preserve separation of power:

- The validator is shared shape-checking logic only.
- Guard gains no mutation authority.
- Fixer gains no diagnostic authority.
- No trust decision is introduced.
- No execution authority is introduced.
- Patch intent remains non-executable.

## 8. Acceptance Checks For Future Slice

Future implementation is acceptable only if:

- Only allowed files changed.
- No dependencies were added.
- No lock file was added.
- No Base44 folder or Base44-named file exists.
- Validator performs only object-shape checks.
- No cryptographic or trust decisions were added.
- The offline sanity test passes.
- `npm run check` remains dependency-free and passes.

## 9. Manual Verification Commands

After the future implementation slice, run:

```bash
git status --short
git diff --stat
git diff -- packages/artifact/validateArtifactShape.js packages/artifact/README.md tests/artifact-shape.test.js package.json
find . -maxdepth 3 \( -type d -name "base44" -o -type f -iname "*base44*" \)
npm run check
```

If a separate test script is added, also run it explicitly.

## 10. Commit Safety Checklist

Before committing the future implementation slice, verify:

- The slice contains only artifact shape validation and one offline sanity test.
- No parser, canonical serializer, hashing, signing, signature verification, issuer verification, or target project matching was added.
- No Guard or Fixer runtime behavior was added.
- No CLI, UI, AI, storage, cloud, billing, mutation, or patch behavior was added.
- No dependencies or lock files were added.
- Guard/Fixer separation is preserved.
- Base44 remains excluded except reference-only exclusion language.
