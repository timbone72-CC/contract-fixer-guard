export const ARTIFACT_FILE_NAME = "violations.json";

export const ARTIFACT_SCHEMA_VERSION = "1.0.0";

export const REQUIRED_TOP_LEVEL_SECTIONS = Object.freeze([
  "schemaVersion",
  "issuer",
  "target",
  "generatedAt",
  "findings",
  "security",
]);

export const SECURITY_FIELDS = Object.freeze([
  "payloadHash",
  "signature",
  "keyId",
]);

export const ARTIFACT_ERROR_NAMES = Object.freeze({
  SCHEMA_INVALID: "SCHEMA_INVALID",
  VERSION_UNSUPPORTED: "VERSION_UNSUPPORTED",
  SIGNATURE_INVALID: "SIGNATURE_INVALID",
  PAYLOAD_HASH_MISMATCH: "PAYLOAD_HASH_MISMATCH",
  ISSUER_UNTRUSTED: "ISSUER_UNTRUSTED",
  TARGET_PROJECT_MISMATCH: "TARGET_PROJECT_MISMATCH",
  DATA_MINIMIZATION_VIOLATION: "DATA_MINIMIZATION_VIOLATION",
});
