export const TOPICS = [
  "food",
  "music",
  "sports",
  "school",
  "work",
  "home",
  "travel",
  "health",
  "technology",
  "nature",
  "animals",
  "shopping",
  "transportation",
  "clothing",
  "people",
  "daily-life",
  "entertainment",
] as const;

export type Topic = (typeof TOPICS)[number];
