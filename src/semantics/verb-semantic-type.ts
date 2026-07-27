// semantics/verb-semantic-type.ts
//
// Categorías semánticas de verbos. Se declaran desde ahora las 12
// categorías previstas (decisión arquitectónica confirmada), aunque hoy
// solo algunas tengan datos reales en vocabulary_items. El resto queda
// reservado para cuando el vocabulario crezca hacia ellas.
//
// Para agregar una categoría nueva: agregarla aquí. Nunca declarar una
// lista propia en el backend, el frontend o el motor de juego.

export const VERB_SEMANTIC_TYPES = [
  "state",
  "movement",
  "consumption",
  "possession",
  "preference",
  "necessity",
  "communication",
  "cognition",
  "perception",
  "creation",
  "change",
  "existence",
] as const;

export type VerbSemanticType = (typeof VERB_SEMANTIC_TYPES)[number];

export const VERB_SEMANTIC_TYPE_LABELS: Record<VerbSemanticType, string> = {
  state: "Estado",
  movement: "Movimiento",
  consumption: "Consumo",
  possession: "Posesión",
  preference: "Preferencia",
  necessity: "Necesidad",
  communication: "Comunicación",
  cognition: "Cognición",
  perception: "Percepción",
  creation: "Creación",
  change: "Cambio",
  existence: "Existencia",
};
