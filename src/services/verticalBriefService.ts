import { analyze } from "../analyze.js";
import { sampleInvestmentCommitteeScenarioLab } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleInvestmentCommitteeScenarioLab, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    items: report.items,
    averageExposureScore: report.averageExposureScore,
    averageSavingsUnlock: report.averageSavingsUnlock,
    averageInvestmentNeed: report.averageInvestmentNeed,
    averageConfidence: report.averageConfidence,
    averageUrgency: report.averageUrgency,
    averageUpside: report.averageUpside,
    averageDownside: report.averageDownside,
    accelerateNowTracks: report.accelerateNowTracks,
    deferTracks: report.deferTracks,
    committeeCapitalAtRiskMillions: report.committeeCapitalAtRiskMillions,
    highFindings,
    recommendation:
      "Accelerate AI, revenue, and biotech where upside is already proven, resequence identity and procurement around reusable proof, and defer public-sector expansion until readiness ownership is explicit."
  };
}

export function scenarioLane() {
  return sampleInvestmentCommitteeScenarioLab.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    direction: item.direction,
    scenarioTheme: item.scenarioTheme,
    boardQuestion: item.boardQuestion,
    scenarioMove: item.scenarioMove,
    nextCommitteeDecision: item.nextCommitteeDecision
  }));
}

export function capitalOptions() {
  return sampleInvestmentCommitteeScenarioLab.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    scenarioTheme: item.scenarioTheme,
    investmentNeedScore: item.investmentNeedScore,
    savingsUnlockScore: item.savingsUnlockScore,
    upsideScore: item.upsideScore,
    downsideScore: item.downsideScore,
    companyTags: item.companyTags
  }));
}

export function timingRisks() {
  return sampleInvestmentCommitteeScenarioLab.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    urgencyScore: item.urgencyScore,
    confidenceScore: item.confidenceScore,
    currentPosture: item.currentPosture,
    scenarioHeadline: item.scenarioHeadline,
    relatedSurfaces: item.relatedSurfaces,
    requiredEvidence: item.requiredEvidence
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return [...report.findingsList].sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic scenario data only - no live board decisions, capital plans, or internal committee materials are included.",
    "Exposure, savings unlock, investment need, upside, downside, and urgency metrics are modeled from the sample executive-intelligence set in this repo.",
    "This surface is read-only and designed to show how Kinetic Gain can package investment-committee what-if scenarios into one board-readable operating layer.",
    "Company tags and track labels are synthetic design aids rather than audited market signals.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    scenarioLane: scenarioLane(),
    capitalOptions: capitalOptions(),
    timingRisks: timingRisks(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleInvestmentCommitteeScenarioLab
  };
}
