import { Scene } from "./scene";

export type SpanishPromptDraft = {
  tense: Scene["tense"];

  polarity: Scene["polarity"];

  subject: string;

  verb: string;

  correctSentence: string;
};