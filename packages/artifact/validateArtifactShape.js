import {
  ARTIFACT_ERROR_NAMES,
  ARTIFACT_SCHEMA_VERSION,
  REQUIRED_TOP_LEVEL_SECTIONS,
  SECURITY_FIELDS,
} from "./constants.js";

function isPlainObject(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function shapeError(code, message) {
  return { code, message };
}

export function validateArtifactShape(artifact) {
  const errors = [];

  if (!isPlainObject(artifact)) {
    return {
      ok: false,
      errors: [
        shapeError(
          ARTIFACT_ERROR_NAMES.SCHEMA_INVALID,
          "Artifact must be a plain object.",
        ),
      ],
    };
  }

  for (const section of REQUIRED_TOP_LEVEL_SECTIONS) {
    if (!(section in artifact)) {
      errors.push(
        shapeError(
          ARTIFACT_ERROR_NAMES.SCHEMA_INVALID,
          `Missing required top-level section: ${section}.`,
        ),
      );
    }
  }

  if (
    "schemaVersion" in artifact &&
    artifact.schemaVersion !== ARTIFACT_SCHEMA_VERSION
  ) {
    errors.push(
      shapeError(
        ARTIFACT_ERROR_NAMES.VERSION_UNSUPPORTED,
        `Unsupported schemaVersion: ${artifact.schemaVersion}.`,
      ),
    );
  }

  if ("security" in artifact) {
    if (!isPlainObject(artifact.security)) {
      errors.push(
        shapeError(
          ARTIFACT_ERROR_NAMES.SCHEMA_INVALID,
          "security must be a plain object.",
        ),
      );
    } else {
      for (const field of SECURITY_FIELDS) {
        if (!(field in artifact.security)) {
          errors.push(
            shapeError(
              ARTIFACT_ERROR_NAMES.SCHEMA_INVALID,
              `Missing required security field: ${field}.`,
            ),
          );
        }
      }
    }
  }

  if ("findings" in artifact && !Array.isArray(artifact.findings)) {
    errors.push(
      shapeError(
        ARTIFACT_ERROR_NAMES.SCHEMA_INVALID,
        "findings must be an array.",
      ),
    );
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}
