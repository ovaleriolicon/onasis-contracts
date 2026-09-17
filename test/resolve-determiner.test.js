const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const {
  resolveObject,
  resolveObjectDeterminerToken,
} = require("../dist/grammar/resolve-object");
const { resolveDeterminer } = require("../dist/grammar/resolve-determiner");
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

  it("report-activities → generic (uncountable bare / countable plural)", () => {
    const instagram = noun("Instagram", {
      countable: false,
      defaultDeterminer: "indefinite",
      type: "object",
    });
    const socialMedia = noun("social media", {
      countable: false,
      defaultDeterminer: "none",
      type: "object",
    });
    const photo = noun("photo", {
      countable: true,
      defaultDeterminer: "indefinite",
      type: "object",
    });

    assert.equal(getFunctionObjectNumber("report-activities"), "generic");
    // Verb defaults singular; Function generic must win.
    assert.equal(
      affirmative("I", "use", instagram, "report-activities"),
      "I use Instagram.",
    );
    assert.equal(
      affirmative("I", "use", socialMedia, "report-activities"),
      "I use social media.",
    );
    assert.equal(
      affirmative("I", "share", photo, "report-activities"),
      "I share photos.",
    );
  });
});

describe("Determiner Resolution V1", () => {
  const menuNone = noun("menu", {
    countable: true,
    defaultDeterminer: "none",
    type: "object",
  });
  const menuMissing = {
    id: "noun:menu-missing",
    lemma: "menu",
    translations: { es: "menú" },
    grammar: { countable: true },
    semantics: { type: "object", animate: false },
  };
  const menuDefinite = noun("menu", {
    countable: true,
    defaultDeterminer: "definite",
    type: "object",
  });
  const coffee = noun("coffee", {
    countable: false,
    defaultDeterminer: "none",
    type: "beverage",
  });
  const apple = noun("apple", {
    countable: true,
    defaultDeterminer: "indefinite",
    type: "food",
  });
  const old = {
    id: "adj:old",
    base: "old",
    unlockedAtVocabularyLevel: 0,
    semantics: {},
  };
  const big = {
    id: "adj:big",
    base: "big",
    unlockedAtVocabularyLevel: 0,
    semantics: {},
  };

  it("singular countable + none → indefinite", () => {
    assert.equal(
      resolveDeterminer({ noun: menuNone, objectNumber: "singular" }),
      "indefinite",
    );
    assert.equal(resolveObject(menuNone, undefined, "singular"), "a menu");
    assert.equal(
      affirmative("I", "want", menuNone, "express-desire"),
      "I want a menu.",
    );
  });

  it("singular countable + missing defaultDeterminer → indefinite", () => {
    assert.equal(
      resolveDeterminer({ noun: menuMissing, objectNumber: "singular" }),
      "indefinite",
    );
    assert.equal(resolveObject(menuMissing, undefined, "singular"), "a menu");
  });

  it("singular countable + explicit valid determiner is preserved", () => {
    assert.equal(
      resolveDeterminer({ noun: menuDefinite, objectNumber: "singular" }),
      "definite",
    );
    assert.equal(resolveObject(menuDefinite, undefined, "singular"), "the menu");
    assert.equal(
      resolveDeterminer({ noun: apple, objectNumber: "singular" }),
      "indefinite",
    );
    const someSoup = noun("soup", {
      countable: true,
      defaultDeterminer: "some",
      type: "food",
    });
    assert.equal(
      resolveDeterminer({ noun: someSoup, objectNumber: "singular" }),
      "some",
    );
    assert.equal(resolveObject(someSoup, undefined, "singular"), "some soup");
  });

  it("singular uncountable + none → bare", () => {
    assert.equal(
      resolveDeterminer({ noun: coffee, objectNumber: "singular" }),
      "none",
    );
    assert.equal(resolveObject(coffee, undefined, "singular"), "coffee");
    assert.equal(
      affirmative("I", "want", coffee, "express-desire"),
      "I want coffee.",
    );
  });

  it("generic behavior is unchanged", () => {
    assert.equal(
      resolveDeterminer({ noun: menuNone, objectNumber: "generic" }),
      "plural",
    );
    assert.equal(resolveObject(menuNone, undefined, "generic"), "menus");
    assert.equal(
      resolveDeterminer({ noun: apple, objectNumber: "generic" }),
      "plural",
    );
    assert.equal(resolveObject(apple, undefined, "generic"), "apples");
    assert.equal(
      resolveDeterminer({ noun: coffee, objectNumber: "generic" }),
      "none",
    );
    assert.equal(resolveObject(coffee, undefined, "generic"), "coffee");
    assert.equal(
      affirmative("I", "like", apple, "express-preference"),
      "I like apples.",
    );
    assert.equal(
      affirmative("I", "like", coffee, "express-preference"),
      "I like coffee.",
    );
  });

  it("adjective + singular countable chooses a/an from the adjective", () => {
    assert.equal(
      resolveObject(menuNone, undefined, "singular", big),
      "a big menu",
    );
    assert.equal(
      resolveObjectDeterminerToken(menuNone, "singular", big),
      "a",
    );
    assert.equal(
      resolveObject(menuNone, undefined, "singular", old),
      "an old menu",
    );
    assert.equal(
      resolveObjectDeterminerToken(menuNone, "singular", old),
      "an",
    );
  });
});
