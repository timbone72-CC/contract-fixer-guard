# Phase 0 Skeleton

## Purpose

Phase 0 creates the Base44-free monorepo skeleton for Contract Guard and Contract Fixer. It establishes directories, package metadata, and project boundaries without implementing app logic.

## Directory Roles

- `apps/guard-cli/`: future Guard command-line app for diagnostic workflows.
- `apps/fixer-cli/`: future Fixer command-line app for verified surgical workflows.
- `apps/guard-ui/`: future Guard UI, after CLI safety proof.
- `apps/fixer-ui/`: future Fixer UI, after CLI safety proof.
- `packages/contracts/`: shared contracts, policies, and authority boundaries.
- `packages/artifact/`: future artifact schema, validation, and canonical serialization.
- `packages/crypto/`: future signing and verification helpers.
- `packages/guard-core/`: future read-only diagnostic Guard logic.
- `packages/fixer-core/`: future verified and approved Fixer orchestration.
- `packages/patch-engine/`: future constrained patch planning and application primitives.
- `packages/ai/`: future AI provider adapters.
- `packages/storage/`: future local-first storage adapters.
- `packages/audit/`: future audit event types and logging support.
- `packages/test-fixtures/`: future fixture projects and sample artifacts.
- `tests/`: future cross-package and end-to-end tests.

## Explicit Non-Goals

- No app implementation.
- No artifact implementation.
- No crypto implementation.
- No UI implementation.
- No AI implementation.
- No cloud storage.
- No billing.
- No runtime deployment setup.

## No-Base44 Rule

This rebuild must not add Base44 SDKs, folders, app IDs, function packaging, runtime assumptions, deployment dependencies, or identity model. Old Base44 apps are reference material only.

## Guard / Fixer Separation Rule

Guard remains diagnostic and read-only. Fixer remains surgical and write-capable only after a verified artifact and explicit user approval. Shared packages must not erase this separation of power.

## Next Phase Gate

Before Phase 1 starts, ChatGPT must verify that the skeleton preserves two-app separation, excludes Base44 completely, keeps CLI-first ordering intact, and has not introduced implementation logic ahead of the artifact, crypto, and contract core phase.
