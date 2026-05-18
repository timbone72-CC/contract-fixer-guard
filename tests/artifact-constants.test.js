import assert from "node:assert/strict";

import {
  ARTIFACT_ERROR_NAMES,
  ARTIFACT_FILE_NAME,
  ARTIFACT_SCHEMA_VERSION,
  REQUIRED_TOP_LEVEL_SECTIONS,
  SECURITY_FIELDS,
} from "../packages/artifact/constants.js";

assert.equal(ARTIFACT_FILE_NAME, "violations.json");
assert.equal(ARTIFACT_SCHEMA_VERSION, "1.0.0");

assert.deepEqual(REQUIRED_TOP_LEVEL_SECTIONS, [
  "schemaVersion",
  "issuer",
  "target",
  "generatedAt",
  "findings",
  "security",
]);

assert.deepEqual(SECURITY_FIELDS, [
  "payloadHash",
  "signature",
  "keyId",
]);

assert.deepEqual(Object.values(ARTIFACT_ERROR_NAMES), [
  "SCHEMA_INVALID",
  "VERSION_UNSUPPORTED",
  "SIGNATURE_INVALID",
  "PAYLOAD_HASH_MISMATCH",
  "ISSUER_UNTRUSTED",
  "TARGET_PROJECT_MISMATCH",
  "DATA_MINIMIZATION_VIOLATION",
]);
