// Structure Level catalog — key + order only (Fase 3b).

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const {
  structureLevels,
  getByKey,
  getByOrder,
  orderOf,
  ADJECTIVE_NOUN_PHRASES_KEY,
  assertStructureLevelCatalogParity,
  assertStructureLevelCatalogIntegrity,
  resolveStudentStructure,
  resolveStructureUnlockOrder,
  getEffectiveStructureOrder,
  isStructureUnlockedAt,
  structureLevelWriteFields,
  toStructureProgress,
  readStudentStructure,
} = require("../dist");

describe("structure level catalog (key + order)", () => {
  it("assertStructureLevelCatalogIntegrity passes", () => {
    assert.doesNotThrow(() => assertStructureLevelCatalogIntegrity());
    assert.doesNotThrow(() => assertStructureLevelCatalogParity());
  });

  it("has unique keys and orders; length 15", () => {
    assert.equal(structureLevels.length, 15);
    const keys = new Set(structureLevels.map((d) => d.key));
    const orders = new Set(structureLevels.map((d) => d.order));
    assert.equal(keys.size, 15);
    assert.equal(orders.size, 15);
    for (const def of structureLevels) {
      assert.equal(def.legacyLevel, undefined);
      assert.equal(def.level, undefined);
      assert.equal(orderOf(def.key), def.order);
      assert.equal(getByKey(def.key)?.order, def.order);
      assert.equal(getByOrder(def.order)?.key, def.key);
    }
  });

  it("adjective-noun-phrases is order 6", () => {
    const adj = getByKey(ADJECTIVE_NOUN_PHRASES_KEY);
    assert.ok(adj);
    assert.equal(adj.order, 6);
    assert.equal(adj.name, "Adjective + Noun");
    assert.equal(getByOrder(6)?.key, ADJECTIVE_NOUN_PHRASES_KEY);
  });

  it("to-be-past-affirmative is order 7", () => {
    const past = getByKey("to-be-past-affirmative");
    assert.ok(past);
    assert.equal(past.order, 7);
    assert.equal(orderOf("to-be-past-affirmative"), 7);
  });

  it("key → order unlocks", () => {
    assert.equal(resolveStructureUnlockOrder("to-be-past-affirmative"), 7);
    assert.equal(resolveStructureUnlockOrder(ADJECTIVE_NOUN_PHRASES_KEY), 6);
    assert.throws(
      () => resolveStructureUnlockOrder(6),
      /numeric unlock refs are no longer accepted/,
    );
    assert.ok(isStructureUnlockedAt(ADJECTIVE_NOUN_PHRASES_KEY, 7));
    assert.ok(isStructureUnlockedAt("to-be-past-affirmative", 7));
    assert.ok(!isStructureUnlockedAt("to-be-past-affirmative", 6));
  });

  it("resolveStudentStructure is key-only", () => {
    const resolved = resolveStudentStructure({
      structureLevelKey: "to-be-past-affirmative",
    });
    assert.equal(resolved.key, "to-be-past-affirmative");
    assert.equal(resolved.order, 7);
    assert.equal(resolved.legacyLevel, undefined);
    assert.throws(
      () => resolveStudentStructure({ structureLevel: 6 }),
      /structureLevelKey required/,
    );
  });
});

describe("structureLevelWriteFields / progress (key-only)", () => {
  it("writes and reads structureLevelKey → order", () => {
    assert.deepEqual(
      structureLevelWriteFields({
        structureLevelKey: "to-be-past-affirmative",
      }),
      { structureLevelKey: "to-be-past-affirmative" },
    );
    assert.throws(
      () => structureLevelWriteFields({}),
      /structureLevelKey required/,
    );
    assert.throws(
      () => readStudentStructure({}),
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
    assert.equal(
      getEffectiveStructureOrder({
        structureLevelKey: "to-be-past-affirmative",
      }),
      7,
    );
  });
});
