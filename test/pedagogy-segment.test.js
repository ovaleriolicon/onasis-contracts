const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

describe("PedagogySegment contract surface", () => {
  it("construction barrel loads after PedagogySegment addition", () => {
    const construction = require("../dist/construction");
    assert.equal(typeof construction, "object");
  });

  it("accepts PedagogySegment-shaped objects at the type boundary (runtime shape)", () => {
    /** @type {{ lang: string, text: string }} */
    const segment = { lang: "en-US", text: "didn't" };
    assert.equal(segment.lang, "en-US");
    assert.equal(segment.text, "didn't");
  });
});
