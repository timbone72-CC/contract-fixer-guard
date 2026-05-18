# Artifact

Shared diagnostic artifact constants for the Guard -> Fixer handoff.

## Artifact File

- File name: `violations.json`
- Schema version: `1.0.0`

## Required Top-Level Sections

- `schemaVersion`
- `issuer`
- `target`
- `generatedAt`
- `findings`
- `security`

## Content Rules

- Findings must stay minimal and structural.
- Findings must not include raw source-code blocks.
- Patch intent is not execution authority.
- Patch intent may include only enough information for a later safe `REPLACE` proof.

## Target Identity Rules

- Guard signs `target.projectId` into the artifact.
- Fixer later compares artifact `target.projectId` to the local manifest `projectId`.
- A mismatch must become `TARGET_PROJECT_MISMATCH`.
- Artifact target identity does not replace the local `contract-project.json` manifest.

No validation, canonical serialization, signing, or verification logic is implemented here yet.
