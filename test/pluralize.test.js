const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const { pluralize } = require("../dist/grammar/pluralize");
const { buildNounPhrase } = require("../dist/grammar/build-noun-phrase");
const { resolveObject } = require("../dist/grammar/resolve-object");

function noun(lemma, grammar = {}) {
  return {
    id: `noun:${lemma}`,
    lemma,
    translations: { es: lemma },
    grammar: { countable: true, defaultDeterminer: "plural", ...grammar },
    semantics: { type: "object", animate: false },
    pedagogy: {},
  };
}

describe("pluralize", () => {
  it("turns consonant-y into ies and vowel-y into ys", () => {
    assert.equal(pluralize("city"), "cities");
    assert.equal(pluralize("baby"), "babies");
    assert.equal(pluralize("toy"), "toys");
    assert.equal(pluralize("boy"), "boys");
    assert.equal(pluralize("key"), "keys");
    assert.equal(buildNounPhrase(noun("city"), "plural"), "cities");
    assert.equal(buildNounPhrase(noun("baby"), "plural"), "babies");
    assert.equal(buildNounPhrase(noun("toy"), "plural"), "toys");
    assert.equal(buildNounPhrase(noun("boy"), "plural"), "boys");
    assert.equal(buildNounPhrase(noun("key"), "plural"), "keys");
  });

  it("keeps attestedPlural ahead of pluralize", () => {
    const toy = noun("toy", { attestedPlural: "playthings" });
    assert.equal(buildNounPhrase(toy, "plural"), "playthings");
    assert.equal(resolveObject(toy, undefined, "generic"), "playthings");
  });
});
