export type Verdict = "CONTEXT_MISMATCH" | "AUTHENTIC" | "SUSPECTED_MANIPULATION";

export interface Citation {
  source_name: string;
  url: string;
  trust_score: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: Date | string;
  lastActive: Date | string;
}

export interface SavedAudit {
  id?: string;
  userId: string;
  claimText: string;
  mediaUrl?: string;
  verdict: Verdict;
  confidenceScore: number;
  summary: string;
  citations: Citation[];
  createdAt: Date | string;
}

/**
 * What a caller passes to `saveAuditReport` — `userId` comes from the active
 * session and `createdAt` is written server-side, so neither is supplied.
 */
export type NewAuditReport = Omit<SavedAudit, "userId" | "createdAt">;
