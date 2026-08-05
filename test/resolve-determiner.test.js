const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const { resolveObject } = require("../dist/grammar/resolve-object");
const {
  resolveObjectNumber,
  getFunctionObjectNumber,
} = require("../dist/pedagogy/resolve-object-number");

function verb(base, preferredObjectNumber) {
  return {
    base,
    behavior: "no-to-be",
    complements: ["object"],
    transitive: true,
    semantics: { type: "preference" },
    pedagogy: preferredObjectNumber
      ? { preferredObjectNumber }
      : undefined,
  };
}

function noun(lemma, { countable, defaultDeterminer, type }) {
  return {
    id: `noun:${lemma}`,
    lemma,
    translations: { es: lemma },
    grammar: { countable, defaultDeterminer },
    semantics: { type, animate: false },
  };
}

function affirmative(subject, verbBase, objectNoun, functionId) {
  const functionObjectNumber = getFunctionObjectNumber(functionId);
  const { objectNumber } = resolveObjectNumber({
    functionObjectNumber,
    verb: verb(
      verbBase,
      // lexical defaults used when Function has no override / as fallback layer
      ["like", "eat", "drink", "watch"].includes(verbBase)
        ? "generic"
        : "singular",
    ),
  });
  const object = resolveObject(objectNoun, undefined, objectNumber);
  return `${subject} ${verbBase} ${object}.`;
}

describe("objectNumber: Function ?? Verb ?? singular", () => {
  const apple = noun("apple", {
    countable: true,
    defaultDeterminer: "indefinite",
    type: "food",
  });
  const videoGame = noun("video game", {
    countable: true,
    defaultDeterminer: "indefinite",
    type: "activity",
  });
  const coffee = noun("coffee", {
    countable: false,
    defaultDeterminer: "none",
    type: "beverage",
  });
  const movie = noun("movie", {
    countable: true,
    defaultDeterminer: "indefinite",
    type: "activity",
  });
  const game = noun("game", {
    countable: true,
    defaultDeterminer: "indefinite",
    type: "activity",
  });
  const controller = noun("controller", {
    countable: true,
    defaultDeterminer: "indefinite",
    type: "object",
  });

  it("I like video games. (express-preference → generic)", () => {
    assert.equal(
      affirmative("I", "like", videoGame, "express-preference"),
      "I like video games.",
    );
  });

  it("I eat apples. (express-preference → generic)", () => {
    assert.equal(
      affirmative("I", "eat", apple, "express-preference"),
      "I eat apples.",
    );
  });

  it("I drink coffee. (express-preference → generic)", () => {
    assert.equal(
      affirmative("I", "drink", coffee, "express-preference"),
      "I drink coffee.",
    );
  });

  it("I watch movies. (verb default generic when no Function)", () => {
    const { objectNumber, source } = resolveObjectNumber({
      functionObjectNumber: undefined,
      verb: verb("watch", "generic"),
    });
    assert.equal(source, "verb");
    assert.equal(
      `I watch ${resolveObject(movie, undefined, objectNumber)}.`,
      "I watch movies.",
    );
  });

  it("I want a game. (express-desire → singular)", () => {
    assert.equal(
      affirmative("I", "want", game, "express-desire"),
      "I want a game.",
    );
  });

  it("I need a controller. (express-need → singular)", () => {
    assert.equal(
      affirmative("I", "need", controller, "express-need"),
      "I need a controller.",
    );
  });

  it("I won a game. (report-result → singular)", () => {
    // Instance reading; noun.defaultDeterminer is indefinite → "a game"
    assert.equal(
      affirmative("I", "won", game, "report-result"),
      "I won a game.",
    );
  });

  it("I lost a game. (report-result → singular)", () => {
    assert.equal(
      affirmative("I", "lost", game, "report-result"),
      "I lost a game.",
    );
  });

  it("report-result overrides a generic verb default", () => {
    const { objectNumber, source } = resolveObjectNumber({
      functionObjectNumber: getFunctionObjectNumber("report-result"),
      verb: verb("win", "generic"),
    });
    assert.equal(source, "function");
    assert.equal(objectNumber, "singular");
    assert.equal(resolveObject(game, undefined, objectNumber), "a game");
  });

  it("ask-information has no override; content function is used by caller", () => {
    assert.equal(getFunctionObjectNumber("ask-information"), undefined);
    assert.equal(
      getFunctionObjectNumber("express-preference"),
      "generic",
    );
  });
});
