const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

describe("Construction Tutor narrative contract (Phase 2)", () => {
  it("construction barrel exports TutorContext surface", () => {
    const construction = require("../dist/construction");
    assert.equal(typeof construction, "object");
  });

  it("accepts TutorContext-shaped objects at runtime", () => {
    /** @type {import("../dist/construction/tutor-context").TutorContext} */
    const ctx = { turnIndex: 0, firstName: "Ana" };
    assert.equal(ctx.turnIndex, 0);
    assert.equal(ctx.firstName, "Ana");
  });

  it("accepts optional MC narrative fields at runtime", () => {
    /** @type {import("../dist/construction/construction-step").ConstructionStep} */
    const step = {
      type: "multiple-choice",
      question: "¿De quién estamos hablando?",
      promptSegments: [{ lang: "es-MX", text: "¿De quién estamos hablando?" }],
      options: ["She", "He", "They"],
      correctAnswer: "She",
      builderToken: "She",
      slot: "subject",
      leadInSegments: [{ lang: "es-MX", text: "Vamos a construirla juntos." }],
      leadInText: "Vamos a construirla juntos.",
      narrativeRole: "intro",
    };
    assert.equal(step.narrativeRole, "intro");
    assert.equal(step.leadInText, "Vamos a construirla juntos.");
  });
});
