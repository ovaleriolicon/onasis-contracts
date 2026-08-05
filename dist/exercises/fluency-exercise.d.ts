import type { Scene } from "../scene";
import type { SceneAssets } from "../scene-assets";
import type { ConstructionStep } from "../construction/construction-step";
import type { CommunicativeFunctionTurnMetadata } from "../pedagogy/communicative-function-turn-metadata";
export type FluencyExercise = {
    mode: "fluency";
    guidedMode: boolean;
    scene: Scene;
    assets?: SceneAssets;
    constructionExplanation?: ConstructionStep[];
    /**
     * F2: selected Communicative Function for this turn.
     * Metadata only — ignored by generateScene / realization.
     */
    metadata?: CommunicativeFunctionTurnMetadata;
};
