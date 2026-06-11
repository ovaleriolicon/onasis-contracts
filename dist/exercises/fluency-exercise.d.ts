import type { Scene } from "../scene";
import type { SceneAssets } from "../scene-assets";
import type { ConstructionStep } from "../construction/construction-step";
export type FluencyExercise = {
    mode: "fluency";
    scene: Scene;
    assets?: SceneAssets;
    constructionExplanation?: ConstructionStep[];
};
