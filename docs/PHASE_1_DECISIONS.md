# Phase 1 Decisions

## 1. Purpose

This document records the Phase 1 implementation decisions for the shared artifact, crypto, and contract core.

It is a planning and decision document only. It does not implement artifact logic, crypto logic, app logic, UI, AI, storage, cloud, billing, or tests.

## 2. Target Project Identity

Decision: use an explicit local project manifest named:

```txt
contract-project.json
```

Required fields:

- `projectId`
- `name`

Rules:

- `projectId` must be present and non-empty.
- `name` must be present and non-empty.
- Guard signs `target.projectId` into the artifact.
- Fixer reads the target project's `contract-project.json`.
- Fixer rejects the artifact if the target manifest `projectId` does not match the artifact `target.projectId`.

Deferred:

- Path hashing.
- Project-root hashing.
- Cloud project identity.
- Hosted account identity.

## 3. Artifact File And Schema

Decision: the diagnostic artifact file name is:

```txt
violations.json
```

Decision: the schema version is:

```json
"1.0.0"
```

Required top-level sections:

- `schemaVersion`
- `issuer`
- `target`
- `generatedAt`
- `findings`
- `security`

Finding rules:

- Findings must stay minimal and structural.
- Findings must not include raw source-code blocks.
- Findings may include only enough patch intent for a later safe `REPLACE` proof.
- Patch intent must not become executable authority by itself.

## 4. Issuer / Trust Model

Decision: issuer identity is explicit and not self-trusted.

Rules:

- The artifact may declare its issuer.
- The artifact cannot grant trust to its own issuer.
- Fixer controls the trusted issuer allowlist.
- Fixer verification must reject artifacts whose issuer is not trusted by Fixer configuration.
- Trusted issuer configuration is external to the artifact.

Deferred:

- Cloud-managed trust lists.
- Team trust policies.
- Key rotation policy beyond basic `keyId` representation.

## 5. Crypto / Signing Model

Decision: use deterministic canonical serialization.

Signing rules:

- The signature covers the artifact payload excluding `security`.
- `security` is appended after payload hashing/signing.
- Verification recomputes the canonical payload excluding `security`.
- Verification rejects payload hash mismatches before accepting a signature result.

Required `security` fields:

- `payloadHash`
- `signature`
- `keyId`

Deferred:

- Dev/test key format.
- Final production key format.
- Key rotation mechanics.
- Cloud key management.

No cloud key management is part of Phase 1.

## 6. Stable Error Names

Decision: Phase 1 uses these stable error names:

- `SCHEMA_INVALID`
- `VERSION_UNSUPPORTED`
- `SIGNATURE_INVALID`
- `PAYLOAD_HASH_MISMATCH`
- `ISSUER_UNTRUSTED`
- `TARGET_PROJECT_MISMATCH`
- `DATA_MINIMIZATION_VIOLATION`

These names are intended for test assertions and later CLI/UI display mapping.

## 7. Minimal Phase 1 Test Acceptance

Phase 1 cannot be considered complete until implementation tests pass for:

- Valid artifact.
- Invalid signature.
- Tampered artifact.
- Wrong target project.
- Untrusted issuer.
- Wrong schema version.
- Missing required top-level section.
- Missing required target project field.
- Empty `projectId`.
- Empty `name`.
- Canonical serialization stability.
- Payload hash mismatch.
- Signature over payload excluding `security`.
- Data minimization violation for raw source-code blocks.

Tests must not require:

- Network access.
- Cloud storage.
- UI.
- AI.
- Billing.
- Runtime deployment infrastructure.

## 8. Guard / Fixer Separation Confirmation

Guard may later produce and sign artifacts, but Guard must remain diagnostic and read-only.

Fixer may later verify artifacts and enforce trusted execution gates, but Fixer must not diagnose independently.

Shared packages may define schemas, canonical serialization, crypto helpers, validation, errors, and audit event types. Shared packages must not give Guard mutation authority or Fixer diagnostic authority.

## 9. Base44-Free Confirmation

Phase 1 remains Base44-free:

- No Base44 SDK.
- No Base44 folders.
- No Base44 app IDs.
- No Base44 function packaging.
- No Base44 runtime assumptions.
- No Base44 deployment dependency.
- No Base44 identity model.

Any Base44 reference in Phase 1 documentation is allowed only for exclusion or reference-only history.

## 10. Implementation Gate

Before Phase 1 implementation starts, ChatGPT must verify:

- This decision document is accepted.
- Target project identity uses `contract-project.json`.
- Artifact schema and required sections are accepted.
- Issuer trust remains Fixer-controlled.
- Crypto signing rules are accepted.
- Stable error names are accepted.
- Minimal test acceptance is accepted.
- No implementation has been introduced by this document.
- No dependency has been added by this document.
