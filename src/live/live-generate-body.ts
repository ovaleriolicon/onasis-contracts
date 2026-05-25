// packages/contracts/live/live-generate-body.ts

import type { TurnMode } from "./turn-mode";

export type LiveGenerateBody = {
  student: {
    id: string;

    currentModule: number;
  };

  mode: TurnMode;
};