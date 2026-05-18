import { ARTIFACT_ERROR_NAMES } from "./constants.js";

function verificationError(code, message) {
  return { code, message };
}

export function verifyTrustedIssuer(artifact, { trustedIssuers }) {
  const issuerId = artifact?.issuer?.id;
  const keyId = artifact?.security?.keyId;
  const allowedKeyIds = trustedIssuers?.[issuerId];

  if (
    !issuerId ||
    !Array.isArray(allowedKeyIds) ||
    !allowedKeyIds.includes(keyId)
  ) {
    return {
      ok: false,
      errors: [
        verificationError(
          ARTIFACT_ERROR_NAMES.ISSUER_UNTRUSTED,
          "Artifact issuer is not trusted by the provided allowlist.",
        ),
      ],
    };
  }

  return {
    ok: true,
    errors: [],
  };
}
