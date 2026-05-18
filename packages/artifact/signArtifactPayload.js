import { sign } from "node:crypto";

import { canonicalSerializeArtifactPayload } from "./canonicalSerialize.js";
import { hashArtifactPayload } from "./hashArtifactPayload.js";

export function signArtifactPayload(artifact, { privateKey, keyId }) {
  const canonicalPayload = canonicalSerializeArtifactPayload(artifact);
  const payloadHash = hashArtifactPayload(artifact);
  const signature = sign(null, Buffer.from(canonicalPayload, "utf8"), privateKey)
    .toString("base64");

  return {
    ...artifact,
    security: {
      payloadHash,
      signature,
      keyId,
    },
  };
}
