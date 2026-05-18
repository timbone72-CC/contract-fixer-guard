import assert from "node:assert/strict";

import {
  canonicalSerialize,
  canonicalSerializeArtifactPayload,
} from "../packages/artifact/canonicalSerialize.js";

const unordered = {
  z: 3,
  a: 1,
  nested: {
    b: true,
    a: null,
  },
};

const ordered = {
  a: 1,
  nested: {
    a: null,
    b: true,
  },
  z: 3,
};

assert.equal(canonicalSerialize(unordered), canonicalSerialize(ordered));
assert.equal(
  canonicalSerialize(unordered),
  '{"a":1,"nested":{"a":null,"b":true},"z":3}',
);

assert.equal(canonicalSerialize({ values: [3, 2, 1] }), '{"values":[3,2,1]}');
assert.notEqual(
  canonicalSerialize({ values: [3, 2, 1] }),
  canonicalSerialize({ values: [1, 2, 3] }),
);

const artifact = {
  schemaVersion: "1.0.0",
  issuer: {
    id: "guard-dev",
  },
  target: {
    projectId: "fixture-project",
  },
  generatedAt: "2026-05-18T00:00:00.000Z",
  findings: [],
  security: {
    payloadHash: "hash",
    signature: "signature",
    keyId: "key",
  },
};

const artifactBeforeSerialization = structuredClone(artifact);
const serializedPayload = canonicalSerializeArtifactPayload(artifact);

assert.equal(
  serializedPayload,
  '{"findings":[],"generatedAt":"2026-05-18T00:00:00.000Z","issuer":{"id":"guard-dev"},"schemaVersion":"1.0.0","target":{"projectId":"fixture-project"}}',
);
assert.equal(serializedPayload.includes("security"), false);
assert.deepEqual(artifact, artifactBeforeSerialization);

assert.throws(
  () => canonicalSerialize({ unsupported: undefined }),
  /Cannot canonicalize unsupported JSON value\./,
);
