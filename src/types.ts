export type ScenarioTrack =
  | "AI_PLATFORM"
  | "IDENTITY_SECURITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "PROCUREMENT_TRUST"
  | "PUBLIC_SECTOR";

export type ScenarioDirection = "ACCELERATE" | "HOLD" | "DEFER" | "RESEQUENCE";

export interface InvestmentScenarioItem {
  id: string;
  owner: string;
  audience: string;
  track: ScenarioTrack;
  direction: ScenarioDirection;
  scenarioTheme: string;
  boardQuestion: string;
  currentPosture: string;
  scenarioMove: string;
  exposureScore: number;
  savingsUnlockScore: number;
  investmentNeedScore: number;
  confidenceScore: number;
  urgencyScore: number;
  upsideScore: number;
  downsideScore: number;
  scenarioHeadline: string;
  scenarioNarrative: string;
  nextCommitteeDecision: string;
  companyTags: string[];
  relatedSurfaces: string[];
  requiredEvidence: string[];
}

export interface InvestmentScenarioExport {
  generatedAt: string;
  items: InvestmentScenarioItem[];
}

export type FindingCode =
  | "accelerate-now"
  | "defer-with-risk"
  | "resequence-savings"
  | "thin-scenario-proof"
  | "committee-decision-blocker";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  track: ScenarioTrack;
  audience: string;
  message: string;
}

export interface InvestmentScenarioReport {
  generatedAt: string;
  items: number;
  averageExposureScore: number;
  averageSavingsUnlock: number;
  averageInvestmentNeed: number;
  averageConfidence: number;
  averageUrgency: number;
  averageUpside: number;
  averageDownside: number;
  accelerateNowTracks: number;
  deferTracks: number;
  committeeCapitalAtRiskMillions: number;
  findingsList: Finding[];
  ok: boolean;
}
