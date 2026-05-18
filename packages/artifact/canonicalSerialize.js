function isPlainObject(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function serializeValue(value) {
  if (value === null) {
    return "null";
  }

  if (typeof value === "string" || typeof value === "boolean") {
    return JSON.stringify(value);
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new TypeError("Cannot canonicalize non-finite number.");
    }

    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => serializeValue(item)).join(",")}]`;
  }

  if (isPlainObject(value)) {
    const entries = Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${serializeValue(value[key])}`);

    return `{${entries.join(",")}}`;
  }

  throw new TypeError("Cannot canonicalize unsupported JSON value.");
}

export function canonicalSerialize(value) {
  return serializeValue(value);
}

export function canonicalSerializeArtifactPayload(artifact) {
  if (!isPlainObject(artifact)) {
    throw new TypeError("Artifact payload must be a plain object.");
  }

  const { security, ...payload } = artifact;
  return canonicalSerialize(payload);
}
