import assert from "node:assert/strict";

import { ARTIFACT_ERROR_NAMES } from "../packages/artifact/constants.js";
import { signArtifactPayload } from "../packages/artifact/signArtifactPayload.js";
import { verifyArtifactSignature } from "../packages/artifact/verifyArtifactSignature.js";

const privateKey = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIEy7kOScI0vrgCYHbC1lKQVTv/ohGp49H76cRkjqTy3Y
-----END PRIVATE KEY-----`;

const publicKey = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEA+1jco3r6up+JFjW93nW7rQxDyNC5l8ZNqcQXb2Af5XI=
-----END PUBLIC KEY-----`;

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

const artifact = minimalArtifact();
const signedArtifact = signArtifactPayload(artifact, {
  privateKey,
  keyId: "test-key",
});
const signedArtifactBeforeVerify = structuredClone(signedArtifact);

assert.deepEqual(verifyArtifactSignature(signedArtifact, { publicKey }), {
  ok: true,
  errors: [],
});
assert.deepEqual(signedArtifact, signedArtifactBeforeVerify);

const tamperedPayload = {
  ...signedArtifact,
  findings: [
    {
      ...signedArtifact.findings[0],
      summary: "Tampered fixture finding.",
    },
  ],
};
assert.deepEqual(
  verifyArtifactSignature(tamperedPayload, { publicKey }).errors[0].code,
  ARTIFACT_ERROR_NAMES.PAYLOAD_HASH_MISMATCH,
);

const changedPayloadHash = {
  ...signedArtifact,
  security: {
    ...signedArtifact.security,
    payloadHash: "changed-payload-hash",
  },
};
assert.deepEqual(
  verifyArtifactSignature(changedPayloadHash, { publicKey }).errors[0].code,
  ARTIFACT_ERROR_NAMES.PAYLOAD_HASH_MISMATCH,
);

const changedSignature = {
  ...signedArtifact,
  security: {
    ...signedArtifact.security,
    signature: Buffer.from("changed-signature").toString("base64"),
  },
};
assert.deepEqual(
  verifyArtifactSignature(changedSignature, { publicKey }).errors[0].code,
  ARTIFACT_ERROR_NAMES.SIGNATURE_INVALID,
);

const changedKeyId = {
  ...signedArtifact,
  security: {
    ...signedArtifact.security,
    keyId: "different-key-id",
  },
};
assert.deepEqual(verifyArtifactSignature(changedKeyId, { publicKey }), {
  ok: true,
  errors: [],
});

const reorderedSignedArtifact = {
  security: {
    keyId: signedArtifact.security.keyId,
    payloadHash: signedArtifact.security.payloadHash,
    signature: signedArtifact.security.signature,
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
assert.deepEqual(verifyArtifactSignature(reorderedSignedArtifact, { publicKey }), {
  ok: true,
  errors: [],
});
