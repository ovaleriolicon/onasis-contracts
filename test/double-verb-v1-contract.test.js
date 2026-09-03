// Double Verb V1 — contract surface (Phase 1).

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const {
  COMPLEMENT_TYPES,
  COMPLEMENT_TYPE_LABELS,
  DOUBLE_VERB_INFINITIVE_KEY,
  orderOf,
  isPatternUnlockedAt,
  isStructureUnlockedAt,
} = require("../dist");

describe("Double Verb V1 contract", () => {
  it("includes infinitive in ComplementType", () => {
    assert.ok(COMPLEMENT_TYPES.includes("infinitive"));
    assert.equal(COMPLEMENT_TYPE_LABELS.infinitive, "Infinitivo");
  });

  it("DOUBLE_VERB_INFINITIVE_KEY gates at order 15", () => {
    assert.equal(orderOf(DOUBLE_VERB_INFINITIVE_KEY), 15);
    assert.ok(!isStructureUnlockedAt(DOUBLE_VERB_INFINITIVE_KEY, 14));
    assert.ok(isStructureUnlockedAt(DOUBLE_VERB_INFINITIVE_KEY, 15));
  });

  it("pattern unlock helper keeps order-14 students locked", () => {
    const pattern = { unlockedAtStructureKey: DOUBLE_VERB_INFINITIVE_KEY };
    assert.ok(!isPatternUnlockedAt(pattern, 14));
    assert.ok(isPatternUnlockedAt(pattern, 15));
  });
});
