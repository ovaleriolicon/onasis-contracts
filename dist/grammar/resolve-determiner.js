"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDeterminer = resolveDeterminer;
function resolveDeterminer({ verb, noun, }) {
    if (verb.pedagogy?.preferredObjectNumber === "generic" &&
        noun.semantics?.type === "food") {
        return noun.grammar?.countable ? "plural" : "none";
    }
    return noun.grammar?.defaultDeterminer ?? "indefinite";
}
