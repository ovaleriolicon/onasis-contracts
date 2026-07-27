"use strict";
// grammar/determiner-policy.ts
//
// Política de determinante (artículo) por defecto para un sustantivo.
// Hoy existe declarado en lexicon.ts como `DeterminerPolicy`. Este
// archivo es la única fuente de verdad futura.
//
// Fuente única de verdad (fase 2 de la migración): lexicon.ts ahora
// importa este tipo en vez de declararlo inline.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DETERMINER_POLICY_LABELS = exports.DETERMINER_POLICIES = void 0;
exports.DETERMINER_POLICIES = [
    "none",
    "indefinite",
    "definite",
    "plural",
    "some",
    "any",
];
exports.DETERMINER_POLICY_LABELS = {
    none: "Sin artículo",
    indefinite: "Artículo indefinido (a/an)",
    definite: "Artículo definido (the)",
    plural: "Plural sin artículo",
    some: "Some",
    any: "Any",
};
