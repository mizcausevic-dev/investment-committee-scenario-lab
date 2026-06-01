import type { InvestmentScenarioReport } from "./types.js";

export function toSummary(report: InvestmentScenarioReport) {
  return [
    `Scenario lanes: ${report.items}`,
    `Average exposure: ${report.averageExposureScore}`,
    `Average savings unlock: ${report.averageSavingsUnlock}`,
    `Average investment need: ${report.averageInvestmentNeed}`,
    `Average confidence: ${report.averageConfidence}`,
    `Average urgency: ${report.averageUrgency}`,
    `Average upside: ${report.averageUpside}`,
    `Average downside: ${report.averageDownside}`,
    `Accelerate-now tracks: ${report.accelerateNowTracks}`,
    `Deferred tracks: ${report.deferTracks}`,
    `Committee capital at risk ($M): ${report.committeeCapitalAtRiskMillions}`,
    `High findings: ${report.findingsList.filter((item) => item.severity === "high").length}`
  ].join("\n");
}
