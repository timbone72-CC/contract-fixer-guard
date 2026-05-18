# Artifact

Shared diagnostic artifact constants for the Guard -> Fixer handoff.

## Artifact File

- File name: `violations.json`
- Schema version: `1.0.0`

These values are exported by `constants.js` as inert shared constants.

## Shape Validator Boundary

`validateArtifactShape.js` checks object shape only:

- Artifact value is a plain object.
- Required top-level sections exist.
- `schemaVersion` matches the artifact constants.
- `security` contains `payloadHash`, `signature`, and `keyId`.
- `findings` is an array.

The shape validator does not parse files, perform canonical serialization, hash payloads, sign artifacts, verify signatures, verify trusted issuers, match target projects, or grant execution authority.

## Required Top-Level Sections

- `schemaVersion`
- `issuer`
- `target`
- `generatedAt`
- `findings`
- `security`

## Section Responsibilities

- `schemaVersion` identifies the artifact schema version.
- `issuer` identifies the diagnostic producer but does not grant trust.
- `target` identifies the intended target project.
- `generatedAt` records artifact generation time.
- `findings` contains minimal structural findings.
- `security` contains:
  - `payloadHash`
  - `signature`
  - `keyId`

## Content Rules

- Findings must stay minimal and structural.
- Findings must not include raw source-code blocks.
- Findings must not include secrets, credentials, tokens, PII, or proprietary business logic beyond structural references.
- Patch intent is not execution authority.
- Patch intent may include only enough information for a later safe `REPLACE` proof.

## Finding Shape Boundaries

Findings may include:

- Path.
- Line.
- Severity.
- Rule id.
- Summary.
- Future patch intent.

## Target Identity Rules

- Guard signs `target.projectId` into the artifact.
- Fixer later compares artifact `target.projectId` to the local manifest `projectId`.
- A mismatch must become `TARGET_PROJECT_MISMATCH`.
- Artifact target identity does not replace the local `contract-project.json` manifest.

## Canonical Serialization And Signing Boundary

- Deterministic serialization will be required later.
- The signing payload excludes `security`.
- `payloadHash` is computed from the canonical payload excluding `security`.
- The signature covers that canonical payload/hash boundary.
- `security` is evidence, not mutable working data.

## Canonical Serialization Boundary

`canonicalSerialize.js` provides deterministic serialization for plain JSON-compatible values:

- Object keys are sorted consistently.
- Array order is preserved.
- The top-level artifact `security` section is excluded by `canonicalSerializeArtifactPayload`.
- Input values are not mutated.
- Unsupported non-JSON-compatible values are rejected.

The canonical serializer does not hash payloads, sign artifacts, verify signatures, verify trusted issuers, match target projects, read files, or grant execution authority.
