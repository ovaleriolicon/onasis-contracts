"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDeterminer = resolveDeterminer;
function resolveDeterminer({ verb, noun, }) {
    // LIKE + FOOD
    if (verb === "like" && noun.semantics?.type === "food") {
        if (noun.grammar?.countable) {
            return "plural";
        }
        return "none";
    }
    return noun.grammar?.defaultDeterminer ?? "indefinite";
}
