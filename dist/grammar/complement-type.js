"use strict";
// grammar/complement-type.ts
//
// Tipos de complemento que puede exigir un verbo (objeto directo, lugar,
// adjetivo predicativo). Antes vivía como literal inline duplicado en
// VerbEntry.complements (lexicon.ts) y Pattern.structure.complements
// (patterns.ts). Esta es ahora la única fuente de verdad.
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPLEMENT_TYPE_LABELS = exports.COMPLEMENT_TYPES = void 0;
exports.COMPLEMENT_TYPES = [
    "object",
    "place",
    "adjective",
    "infinitive",
];
exports.COMPLEMENT_TYPE_LABELS = {
    object: "Objeto",
    place: "Lugar",
    adjective: "Adjetivo",
    infinitive: "Infinitivo",
};
