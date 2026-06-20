import type { Scene } from "../scene";

import type { SceneAssets } from "../scene-assets";

import type { ConstructionStep } from "../construction/construction-step";

export type FluencyExercise = {
  mode: "fluency";

  guidedMode: boolean;

  scene: Scene;

  assets?: SceneAssets;

  constructionExplanation?: ConstructionStep[];
};
