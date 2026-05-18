import assert from "node:assert/strict";

import { ARTIFACT_ERROR_NAMES } from "../packages/artifact/constants.js";
import { verifyTrustedIssuer } from "../packages/artifact/verifyTrustedIssuer.js";

function minimalArtifact(overrides = {}) {
  return {
    schemaVersion: "1.0.0",
    issuer: {
      id: "guard-dev",
    },
    target: {
      projectId: "fixture-project",
    },
    generatedAt: "2026-05-18T00:00:00.000Z",
    findings: [],
    security: {
      payloadHash: "hash",
      signature: "signature",
      keyId: "test-key",
    },
    ...overrides,
  };
}

const allowlist = {
  "guard-dev": ["test-key"],
};

const artifact = minimalArtifact();
const artifactBeforeVerification = structuredClone(artifact);
const allowlistBeforeVerification = structuredClone(allowlist);

assert.deepEqual(verifyTrustedIssuer(artifact, { trustedIssuers: allowlist }), {
  ok: true,
  errors: [],
});
assert.deepEqual(artifact, artifactBeforeVerification);
assert.deepEqual(allowlist, allowlistBeforeVerification);

assert.equal(
  verifyTrustedIssuer(minimalArtifact({ issuer: { id: "unknown-issuer" } }), {
    trustedIssuers: allowlist,
  }).errors[0].code,
  ARTIFACT_ERROR_NAMES.ISSUER_UNTRUSTED,
);

assert.equal(
  verifyTrustedIssuer(
    minimalArtifact({ security: { ...artifact.security, keyId: "wrong-key" } }),
    { trustedIssuers: allowlist },
  ).errors[0].code,
  ARTIFACT_ERROR_NAMES.ISSUER_UNTRUSTED,
);

assert.equal(
  verifyTrustedIssuer(minimalArtifact({ issuer: {} }), {
    trustedIssuers: allowlist,
  }).errors[0].code,
  ARTIFACT_ERROR_NAMES.ISSUER_UNTRUSTED,
);

assert.equal(
  verifyTrustedIssuer(artifact, {
    trustedIssuers: {
      "guard-dev": ["different-key"],
      "artifact-self": ["artifact-self"],
    },
  }).errors[0].code,
  ARTIFACT_ERROR_NAMES.ISSUER_UNTRUSTED,
);

assert.equal(
  verifyTrustedIssuer(artifact, { trustedIssuers: {} }).errors[0].code,
  ARTIFACT_ERROR_NAMES.ISSUER_UNTRUSTED,
);
