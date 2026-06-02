import type { SpanishPromptDraft } from "./spanish-prompt-draft";
export type SceneAssets = {
    sceneId: string;
    spanishPrompt: string;
    spanishPromptDraft: SpanishPromptDraft;
    audioUrl?: string;
    createdAt: string;
};
