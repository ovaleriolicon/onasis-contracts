import type { Scene } from "../scene";

import type { SpanishPromptDraft } from "../spanish-prompt-draft";

export type FluencyExercise = {
    mode: "fluency";
  
    scene: Scene;
  
    spanishPrompt: string;
  
    spanishPromptDraft: SpanishPromptDraft;
  };