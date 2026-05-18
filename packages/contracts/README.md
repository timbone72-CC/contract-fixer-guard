# Contracts

Shared contract decisions for the Guard -> Fixer artifact trust boundary.

## Stable Error Names

- `SCHEMA_INVALID`
- `VERSION_UNSUPPORTED`
- `SIGNATURE_INVALID`
- `PAYLOAD_HASH_MISMATCH`
- `ISSUER_UNTRUSTED`
- `TARGET_PROJECT_MISMATCH`
- `DATA_MINIMIZATION_VIOLATION`

## Issuer Trust Rules

- Fixer controls the trusted issuer allowlist.
- Artifact contents cannot grant trust to themselves.
- The issuer declared by an artifact is explicit but not self-trusted.
- Fixer must reject artifacts from issuers outside its trusted allowlist.

## Target Project Manifest

- Manifest file name: `contract-project.json`
- Required fields:
  - `projectId`
  - `name`
- `projectId` must be present and non-empty.
- `name` must be present and non-empty.
- Explicit manifest identity is the Phase 1 project identity source.
- Path hashing is not part of the Phase 1 project identity source.
- Project-root hashing is not part of the Phase 1 project identity source.

No contract enforcement logic is implemented here yet.
