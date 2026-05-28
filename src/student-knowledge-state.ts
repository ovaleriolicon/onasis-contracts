// contracts/student-knowledge.ts

export type KnowledgeMetric = {
    accuracy: number;
  
    recentAccuracy: number;
  
    totalAttempts: number;
  
    recentAttempts: number;
  
    lastSeenAt?: string;
  };
  
  export type StudentKnowledgeState = {
    userId: string;
  
    patterns: Record<
      string,
      KnowledgeMetric
    >;
  
    errorStats: Record<
      string,
      KnowledgeMetric
    >;
  
    updatedAt?: string;
  };