import assert from "node:assert/strict";

import { canonicalSerializeArtifactPayload } from "../packages/artifact/canonicalSerialize.js";
import { hashArtifactPayload } from "../packages/artifact/hashArtifactPayload.js";
import { signArtifactPayload } from "../packages/artifact/signArtifactPayload.js";

const privateKey = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIEy7kOScI0vrgCYHbC1lKQVTv/ohGp49H76cRkjqTy3Y
-----END PRIVATE KEY-----`;

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
    findings: [
      {
        ruleId: "fixture.rule",
        severity: "medium",
        path: "src/example.js",
        line: 1,
        summary: "Fixture finding.",
        details: {
          ordered: ["a", "b"],
        },
      },
    ],
    security: {
      payloadHash: "old-hash",
      signature: "old-signature",
      keyId: "old-key",
    },
    ...overrides,
  };
}

function isBase64(value) {
  return Buffer.from(value, "base64").toString("base64") === value;
}

const artifact = minimalArtifact();
const artifactBeforeSigning = structuredClone(artifact);
const signedArtifact = signArtifactPayload(artifact, {
  privateKey,
  keyId: "test-key",
});

assert.equal(signedArtifact.security.payloadHash, hashArtifactPayload(artifact));
assert.equal(signedArtifact.security.keyId, "test-key");
assert.equal(isBase64(signedArtifact.security.signature), true);
assert.deepEqual(artifact, artifactBeforeSigning);

const canonicalPayload = canonicalSerializeArtifactPayload(artifact);
assert.equal(canonicalPayload.includes("security"), false);

const reorderedArtifact = {
  security: {
    keyId: "different-key",
    payloadHash: "different-hash",
    signature: "different-signature",
  },
  findings: [
    {
      summary: "Fixture finding.",
      line: 1,
      path: "src/example.js",
      details: {
        ordered: ["a", "b"],
      },
      severity: "medium",
      ruleId: "fixture.rule",
    },
  ],
  generatedAt: "2026-05-18T00:00:00.000Z",
  target: {
    projectId: "fixture-project",
  },
  issuer: {
    id: "guard-dev",
  },
  schemaVersion: "1.0.0",
};
assert.equal(
  signArtifactPayload(reorderedArtifact, { privateKey, keyId: "test-key" })
    .security.payloadHash,
  signedArtifact.security.payloadHash,
);

const changedPayload = minimalArtifact({
  findings: [
    {
      ...artifact.findings[0],
      summary: "Changed fixture finding.",
    },
  ],
});
assert.notEqual(
  signArtifactPayload(changedPayload, { privateKey, keyId: "test-key" }).security
    .payloadHash,
  signedArtifact.security.payloadHash,
);

const changedSecurity = minimalArtifact({
  security: {
    payloadHash: "changed-hash",
    signature: "changed-signature",
    keyId: "changed-key",
  },
});
assert.equal(
  signArtifactPayload(changedSecurity, { privateKey, keyId: "test-key" }).security
    .payloadHash,
  signedArtifact.security.payloadHash,
);
