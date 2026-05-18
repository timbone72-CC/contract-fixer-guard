import { verify } from "node:crypto";

import { canonicalSerializeArtifactPayload } from "./canonicalSerialize.js";
import { ARTIFACT_ERROR_NAMES } from "./constants.js";
import { hashArtifactPayload } from "./hashArtifactPayload.js";

function verificationError(code, message) {
  return { code, message };
}

export function verifyArtifactSignature(artifact, { publicKey }) {
  const expectedPayloadHash = hashArtifactPayload(artifact);

  if (artifact.security.payloadHash !== expectedPayloadHash) {
    return {
      ok: false,
      errors: [
        verificationError(
          ARTIFACT_ERROR_NAMES.PAYLOAD_HASH_MISMATCH,
          "Artifact payload hash does not match the canonical payload.",
        ),
      ],
    };
  }

  const canonicalPayload = canonicalSerializeArtifactPayload(artifact);
  const signatureValid = verify(
    null,
    Buffer.from(canonicalPayload, "utf8"),
    publicKey,
    Buffer.from(artifact.security.signature, "base64"),
  );

  if (!signatureValid) {
    return {
      ok: false,
      errors: [
        verificationError(
          ARTIFACT_ERROR_NAMES.SIGNATURE_INVALID,
          "Artifact signature is invalid for the canonical payload.",
        ),
      ],
    };
  }

  return {
    ok: true,
    errors: [],
  };
}
