import type { Ecosystem } from "./ecosystem";
export declare const ecosystems: Ecosystem[];
export declare function getEcosystem(id: string): Ecosystem | undefined;
export declare function getEcosystemsSorted(): Ecosystem[];
export declare function getEcosystemsByFamily(familyId: string): Ecosystem[];
