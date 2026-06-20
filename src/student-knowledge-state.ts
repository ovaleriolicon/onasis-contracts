// contracts/student-knowledge.ts

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

  guidedMode?: boolean;

  patterns: Map<string, KnowledgeMetric>;

  errorStats: Map<string, ErrorKnowledgeMetric>;

  updatedAt?: string;
};
