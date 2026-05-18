import { createHash } from "node:crypto";

import { canonicalSerializeArtifactPayload } from "./canonicalSerialize.js";

export function hashArtifactPayload(artifact) {
  const canonicalPayload = canonicalSerializeArtifactPayload(artifact);

  return createHash("sha256").update(canonicalPayload, "utf8").digest("base64");
}
