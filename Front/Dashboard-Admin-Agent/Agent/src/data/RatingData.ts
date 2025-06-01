export interface AgentRating {
  id: string;
  agentId: string;
  clientId: string;
  score: number;
  comment?: string;
  createdAt: string;
  client?: {
    id: string;
    name: string;
    photo?: string;
  };
}

export interface AgentRatingSummary {
  average: number;
  totalRatings: number;
}
