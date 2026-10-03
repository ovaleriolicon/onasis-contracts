const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const { buildNounPhrase } = require("../dist/grammar/build-noun-phrase");
const { resolveObject } = require("../dist/grammar/resolve-object");

function noun(lemma, grammar = {}) {
  return {
    id: `noun:${lemma}`,
    lemma,
    translations: { es: lemma },
    grammar: { countable: true, defaultDeterminer: "plural", ...grammar },
    semantics: { type: "object", animate: false },
    pedagogy: { preferredObjectNumber: "plural" },
  };
}

describe("plural surface", () => {
  it("pluralizes a singular citation lemma", () => {
    const shirt = noun("shirt");
    assert.equal(buildNounPhrase(shirt, "plural"), "shirts");
    assert.equal(resolveObject(shirt, undefined, "singular"), "shirts");
  });

  it("keeps a plural-only lemma", () => {
    const scissors = noun("scissors", { pluralOnly: true });
    assert.equal(buildNounPhrase(scissors, "plural"), "scissors");
    assert.equal(resolveObject(scissors, undefined, "singular"), "scissors");
    assert.equal(buildNounPhrase(scissors, "plural", { base: "new" }), "new scissors");
  });

  it("does not pluralize pants or clothes again", () => {
    for (const lemma of ["pants", "clothes"]) {
      const item = noun(lemma, { pluralOnly: true });
      assert.equal(buildNounPhrase(item, "plural"), lemma);
      assert.equal(resolveObject(item, undefined, "singular"), lemma);
    }
  });
});
