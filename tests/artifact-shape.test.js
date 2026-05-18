import assert from "node:assert/strict";

import { ARTIFACT_ERROR_NAMES } from "../packages/artifact/constants.js";
import { validateArtifactShape } from "../packages/artifact/validateArtifactShape.js";

function minimalArtifact(overrides = {}) {
  return {
    schemaVersion: "1.0.0",
    issuer: {},
    target: {},
    generatedAt: "2026-05-18T00:00:00.000Z",
    findings: [],
    security: {
      payloadHash: "hash",
      signature: "signature",
      keyId: "key",
    },
    ...overrides,
  };
}

assert.deepEqual(validateArtifactShape(minimalArtifact()), {
  ok: true,
  errors: [],
});

assert.equal(validateArtifactShape(null).ok, false);
assert.equal(
  validateArtifactShape(null).errors[0].code,
  ARTIFACT_ERROR_NAMES.SCHEMA_INVALID,
);

const missingTarget = minimalArtifact();
delete missingTarget.target;
assert.equal(validateArtifactShape(missingTarget).ok, false);
assert.equal(
  validateArtifactShape(missingTarget).errors[0].code,
  ARTIFACT_ERROR_NAMES.SCHEMA_INVALID,
);

const wrongVersion = minimalArtifact({ schemaVersion: "2.0.0" });
assert.equal(validateArtifactShape(wrongVersion).ok, false);
assert.equal(
  validateArtifactShape(wrongVersion).errors[0].code,
  ARTIFACT_ERROR_NAMES.VERSION_UNSUPPORTED,
);

const missingSignature = minimalArtifact({
  security: {
    payloadHash: "hash",
    keyId: "key",
  },
});
assert.equal(validateArtifactShape(missingSignature).ok, false);
assert.equal(
  validateArtifactShape(missingSignature).errors[0].code,
  ARTIFACT_ERROR_NAMES.SCHEMA_INVALID,
);

const nonArrayFindings = minimalArtifact({ findings: {} });
assert.equal(validateArtifactShape(nonArrayFindings).ok, false);
assert.equal(
  validateArtifactShape(nonArrayFindings).errors[0].code,
  ARTIFACT_ERROR_NAMES.SCHEMA_INVALID,
);
