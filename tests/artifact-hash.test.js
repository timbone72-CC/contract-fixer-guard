import assert from "node:assert/strict";

import { hashArtifactPayload } from "../packages/artifact/hashArtifactPayload.js";

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
      payloadHash: "hash",
      signature: "signature",
      keyId: "key",
    },
    ...overrides,
  };
}

const artifact = minimalArtifact();
const reorderedArtifact = {
  security: {
    keyId: "key",
    payloadHash: "different-hash-placeholder",
    signature: "different-signature-placeholder",
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

assert.equal(hashArtifactPayload(artifact), hashArtifactPayload(reorderedArtifact));

const changedPayload = minimalArtifact({
  findings: [
    {
      ...artifact.findings[0],
      summary: "Changed fixture finding.",
    },
  ],
});
assert.notEqual(hashArtifactPayload(artifact), hashArtifactPayload(changedPayload));

const changedSecurity = minimalArtifact({
  security: {
    payloadHash: "changed-hash",
    signature: "changed-signature",
    keyId: "changed-key",
  },
});
assert.equal(hashArtifactPayload(artifact), hashArtifactPayload(changedSecurity));

const changedArrayOrder = minimalArtifact({
  findings: [
    {
      ...artifact.findings[0],
      details: {
        ordered: ["b", "a"],
      },
    },
  ],
});
assert.notEqual(hashArtifactPayload(artifact), hashArtifactPayload(changedArrayOrder));

const artifactBeforeHash = structuredClone(artifact);
hashArtifactPayload(artifact);
assert.deepEqual(artifact, artifactBeforeHash);
