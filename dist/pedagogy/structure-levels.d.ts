export type StructureLevelDefinition = {
    level: number;
    key: string;
    name: string;
    description?: string;
};
export declare const structureLevels: StructureLevelDefinition[];
export declare function getStructureLevel(level: number): StructureLevelDefinition | undefined;
