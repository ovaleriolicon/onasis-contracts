// F0/F1/F4b — Structure Level catalog with adjective-noun-phrases insert.

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const {
  structureLevels,
  getStructureLevel,
  getByKey,
  getByLegacyLevel,
  getByOrder,
  orderOf,
  legacyLevelOf,
  ADJECTIVE_NOUN_PHRASES_KEY,
  assertStructureLevelCatalogParity,
  assertStructureLevelCatalogIntegrity,
  resolveStudentStructure,
  resolveStructureUnlockOrder,
  getEffectiveStructureOrder,
  isStructureUnlockedAt,
} = require("../dist");

describe("structure level catalog (adjective-noun-phrases)", () => {
  it("assertStructureLevelCatalogIntegrity passes", () => {
    assert.doesNotThrow(() => assertStructureLevelCatalogIntegrity());
    assert.doesNotThrow(() => assertStructureLevelCatalogParity());
  });

  it("inserts adjective-noun-phrases at order 6 without legacy", () => {
    assert.equal(structureLevels.length, 15);
    const adj = getByKey(ADJECTIVE_NOUN_PHRASES_KEY);
    assert.ok(adj);
    assert.equal(adj.order, 6);
    assert.equal(adj.legacyLevel, undefined);
    assert.equal(adj.level, undefined);
    assert.equal(adj.name, "Adjective + Noun");
    assert.equal(getByOrder(6)?.key, ADJECTIVE_NOUN_PHRASES_KEY);
  });

  it("keeps S0–S5 orders; shifts S6–S13 orders only", () => {
    for (let n = 0; n <= 5; n++) {
      const def = getByLegacyLevel(n);
      assert.equal(def.order, n);
      assert.equal(def.legacyLevel, n);
    }
    for (let n = 6; n <= 13; n++) {
      const def = getByLegacyLevel(n);
      assert.ok(def, `missing legacy ${n}`);
      assert.equal(def.legacyLevel, n);
      assert.equal(def.level, n);
      assert.equal(def.order, n + 1);
      assert.equal(orderOf(def.key), n + 1);
      assert.equal(legacyLevelOf(def.key), n);
    }
  });

  it("legacy lookups still resolve historical identity", () => {
    assert.equal(getStructureLevel(6)?.key, "to-be-past-affirmative");
    assert.equal(resolveStructureUnlockOrder(6), 7);
    assert.equal(
      resolveStructureUnlockOrder("to-be-past-affirmative"),
      7,
    );
    assert.equal(
      resolveStructureUnlockOrder(ADJECTIVE_NOUN_PHRASES_KEY),
      6,
    );
  });

  it("historical past student gets order 7", () => {
    const resolved = resolveStudentStructure({
      structureLevel: 6,
      structureLevelKey: "to-be-past-affirmative",
    });
    assert.equal(resolved.key, "to-be-past-affirmative");
    assert.equal(resolved.legacyLevel, 6);
    assert.equal(resolved.order, 7);
    assert.equal(
      getEffectiveStructureOrder({
        structureLevelKey: "to-be-past-affirmative",
        structureLevel: 6,
      }),
      7,
    );
    assert.ok(isStructureUnlockedAt(ADJECTIVE_NOUN_PHRASES_KEY, 7));
    assert.ok(isStructureUnlockedAt("to-be-past-affirmative", 7));
    assert.ok(!isStructureUnlockedAt("to-be-past-affirmative", 6));
  });

  it("key-only adjective-noun-phrases resolves without legacy", () => {
    const resolved = resolveStudentStructure({
      structureLevelKey: ADJECTIVE_NOUN_PHRASES_KEY,
    });
    assert.equal(resolved.key, ADJECTIVE_NOUN_PHRASES_KEY);
    assert.equal(resolved.order, 6);
    assert.equal(resolved.legacyLevel, undefined);
  });
});

describe("resolveStudentStructure (legacy S0–S13)", () => {
  it("legacy input → key → shifted order for S6–S13", () => {
    for (let n = 0; n <= 13; n++) {
      const resolved = resolveStudentStructure({ structureLevel: n });
      const catalog = getStructureLevel(n);
      assert.equal(resolved.legacyLevel, n);
      assert.equal(resolved.key, catalog.key);
      assert.equal(resolved.order, catalog.order);
    }
  });

  it("rejects mismatched key + level", () => {
    assert.throws(
      () =>
        resolveStudentStructure({
          structureLevel: 5,
          structureLevelKey: "to-be-past-affirmative",
        }),
      /does not match/,
    );
  });
});

describe("structureLevelWriteFields (Fase 2 key-only)", () => {
  it("requires structureLevelKey and rejects number-only", () => {
    const {
      structureLevelWriteFields,
      toStructureProgress,
      readStudentStructure,
    } = require("../dist");
    assert.deepEqual(
      structureLevelWriteFields({
        structureLevelKey: "to-be-past-affirmative",
      }),
      { structureLevelKey: "to-be-past-affirmative" },
    );
    assert.throws(
      () => structureLevelWriteFields({ structureLevel: 6 }),
      /structureLevel number is no longer accepted/,
    );
    assert.throws(
      () => readStudentStructure({ structureLevel: 6 }),
      /structureLevelKey required/,
    );
    assert.deepEqual(
      toStructureProgress({
        structureLevelKey: ADJECTIVE_NOUN_PHRASES_KEY,
      }),
      {
        structureLevelKey: ADJECTIVE_NOUN_PHRASES_KEY,
        structureOrder: 6,
      },
    );
  });
});
