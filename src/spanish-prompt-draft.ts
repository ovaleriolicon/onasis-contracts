import { Scene } from "./scene";

export type SpanishPromptDraft = {
  tense: Scene["tense"];

  polarity: Scene["polarity"];

  sentenceType: Scene["sentenceType"];

  subject: string;

  verb: string;

  englishSentence: string;
};
