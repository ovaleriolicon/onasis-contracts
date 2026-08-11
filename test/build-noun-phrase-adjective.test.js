const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const { buildNounPhrase } = require("../dist/grammar/build-noun-phrase");
const { resolveObject } = require("../dist/grammar/resolve-object");

function noun(lemma, { countable = true, defaultDeterminer = "indefinite" } = {}) {
  return {
    id: `noun:${lemma}`,
    lemma,
    translations: { es: lemma },
    grammar: { countable, defaultDeterminer },
    semantics: { type: "object", animate: false },
  };
}

function adjective(base) {
  return {
    id: `adj:${base}`,
    base,
    unlockedAtVocabularyLevel: 0,
    semantics: {},
  };
}

describe("buildNounPhrase: optional attributive adjective", () => {
  const dog = noun("dog");
  const game = noun("game");
  const computer = noun("computer");
  const cute = adjective("cute");
  const old = adjective("old");
  const neu = adjective("new");

  it("dog → a dog (no adjective, unchanged)", () => {
    assert.equal(buildNounPhrase(dog, "indefinite"), "a dog");
    assert.equal(resolveObject(dog, undefined, "singular"), "a dog");
  });

  it("cute + dog → a cute dog", () => {
    assert.equal(buildNounPhrase(dog, "indefinite", cute), "a cute dog");
    assert.equal(
      resolveObject(dog, undefined, "singular", cute),
      "a cute dog",
    );
  });

  it("old + game → an old game (a/an from adjective)", () => {
    assert.equal(buildNounPhrase(game, "indefinite", old), "an old game");
    assert.equal(
      resolveObject(game, undefined, "singular", old),
      "an old game",
    );
  });

  it("new + computer → a new computer", () => {
    assert.equal(
      buildNounPhrase(computer, "indefinite", neu),
      "a new computer",
    );
    assert.equal(
      resolveObject(computer, undefined, "singular", neu),
      "a new computer",
    );
  });

  it("generic/plural without adjective unchanged", () => {
    const apple = noun("apple", { countable: true, defaultDeterminer: "indefinite" });
    assert.equal(buildNounPhrase(apple, "plural"), "apples");
    assert.equal(resolveObject(apple, undefined, "generic"), "apples");
  });

  it("generic/plural with adjective keeps bare plural shape", () => {
    const apple = noun("apple", { countable: true, defaultDeterminer: "indefinite" });
    assert.equal(buildNounPhrase(apple, "plural", cute), "cute apples");
    assert.equal(
      resolveObject(apple, undefined, "generic", cute),
      "cute apples",
    );
  });

  it("uncountable none without adjective unchanged", () => {
    const coffee = noun("coffee", {
      countable: false,
      defaultDeterminer: "none",
    });
    assert.equal(buildNounPhrase(coffee, "none"), "coffee");
    assert.equal(resolveObject(coffee, undefined, "generic"), "coffee");
  });

  it("objectPhrase still wins over adjective", () => {
    assert.equal(
      resolveObject(dog, "a special dog", "singular", cute),
      "a special dog",
    );
  });
});
