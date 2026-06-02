import type { Scene } from "../scene";

import type { SceneAssets } from "../scene-assets";

export type FluencyExercise = {
  mode: "fluency";

  scene: Scene;

  assets: SceneAssets;
};
