# Tests

Future cross-package and end-to-end test area.

## Phase 1 Acceptance Notes

- No tests are added yet.
- Future tests must run offline.
- Future tests must not require UI, AI, cloud, billing, deployment, or Base44 runtime.
- Future tests must verify artifact constants.
- Future tests must verify target manifest contract.
- Future tests must verify schema section requirements.
- Future tests must verify data minimization rejection.
- Future tests must verify signing payload excludes `security`.

## Future Artifact Schema Acceptance

- Future tests must verify schema section requirements.
- Future tests must verify data minimization rejection.
- Future tests must verify `security` is excluded from the signing payload.
- Future tests must remain offline.
- Future tests must not require UI, AI, cloud, billing, or deployment infrastructure.

## Future Target Manifest Acceptance

- Tests must eventually verify required manifest fields.
- Tests must eventually verify `TARGET_PROJECT_MISMATCH` behavior.
- Tests must remain offline.
- Tests must not require UI, AI, cloud, billing, or deployment infrastructure.

Future tests should verify the artifact and trust-boundary decisions before Guard or Fixer app logic is added.
