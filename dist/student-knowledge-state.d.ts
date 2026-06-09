export type KnowledgeMetric = {
    accuracy: number;
    recentAccuracy: number;
    totalAttempts: number;
    recentAttempts: number;
    lastSeenAt?: string;
};
export type ErrorKnowledgeMetric = {
    count: number;
    lastSeenAt?: string;
};
export type StudentKnowledgeState = {
    userId: string;
    patterns: Map<string, KnowledgeMetric>;
    errorStats: Map<string, ErrorKnowledgeMetric>;
    updatedAt?: string;
};
