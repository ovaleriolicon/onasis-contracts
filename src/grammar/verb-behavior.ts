// grammar/verb-behavior.ts
//
// Comportamiento sintáctico del verbo: si se conjuga como "to be" o como
// un verbo regular. Hoy existe declarado de forma independiente en 3
// lugares (scene.ts como tipo nombrado, lexicon.ts y patterns.ts como
// literal inline). Este archivo es la única fuente de verdad futura.
//
// Fuente única de verdad (fase 2 de la migración): scene.ts y patterns.ts
// ahora importan este tipo en vez de declararlo inline.

export const VERB_BEHAVIORS = ["to-be", "no-to-be"] as const;

export type VerbBehavior = (typeof VERB_BEHAVIORS)[number];

export const VERB_BEHAVIOR_LABELS: Record<VerbBehavior, string> = {
  "to-be": "Verbo 'to be'",
  "no-to-be": "Verbo regular",
};
