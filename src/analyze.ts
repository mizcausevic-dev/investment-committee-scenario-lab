import type {
  Finding,
  InvestmentScenarioExport,
  InvestmentScenarioItem,
  InvestmentScenarioReport
} from "./types.js";

function average(items: InvestmentScenarioItem[], pick: (item: InvestmentScenarioItem) => number) {
  return Math.round(items.reduce((sum, item) => sum + pick(item), 0) / items.length);
}

function evaluate(item: InvestmentScenarioItem): Finding[] {
  const findings: Finding[] = [];

  if (item.direction === "ACCELERATE" && item.upsideScore >= 82 && item.confidenceScore >= 80) {
    findings.push({
      code: "accelerate-now",
      severity: "info",
      track: item.track,
      audience: item.audience,
      message: "This scenario is already strong enough to support an immediate acceleration recommendation."
    });
  }

  if (item.direction === "DEFER" && item.exposureScore >= 62) {
    findings.push({
      code: "defer-with-risk",
      severity: item.exposureScore >= 75 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "This scenario is being deferred despite material exposure, so the board story needs a clearer risk acceptance case."
    });
  }

  if (item.savingsUnlockScore >= 74 && item.direction !== "RESEQUENCE") {
    findings.push({
      code: "resequence-savings",
      severity: "medium",
      track: item.track,
      audience: item.audience,
      message: "This lane has enough savings potential that leadership should consider resequencing the investment path."
    });
  }

  if (item.confidenceScore < 74 || item.requiredEvidence.length > 4) {
    findings.push({
      code: "thin-scenario-proof",
      severity: item.confidenceScore < 62 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "The scenario recommendation is still resting on thin proof, which weakens the committee packet."
    });
  }

  if (item.nextCommitteeDecision.length < 90 || item.companyTags.length < 2) {
    findings.push({
      code: "committee-decision-blocker",
      severity: "medium",
      track: item.track,
      audience: item.audience,
      message: "The committee decision path is still too thin to defend as a board-ready capital allocation recommendation."
    });
  }

  return findings;
}

export function analyze(items: InvestmentScenarioItem[], options: { now?: string } = {}): InvestmentScenarioReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = items.flatMap((item) => evaluate(item));
  const accelerateNowTracks = items.filter((item) => item.direction === "ACCELERATE").length;
  const deferTracks = items.filter((item) => item.direction === "DEFER").length;
  const committeeCapitalAtRiskMillions = Math.round(
    items.reduce((sum, item) => sum + item.investmentNeedScore * 0.65 + item.exposureScore * 0.45, 0)
  );

  return {
    generatedAt,
    items: items.length,
    averageExposureScore: average(items, (item) => item.exposureScore),
    averageSavingsUnlock: average(items, (item) => item.savingsUnlockScore),
    averageInvestmentNeed: average(items, (item) => item.investmentNeedScore),
    averageConfidence: average(items, (item) => item.confidenceScore),
    averageUrgency: average(items, (item) => item.urgencyScore),
    averageUpside: average(items, (item) => item.upsideScore),
    averageDownside: average(items, (item) => item.downsideScore),
    accelerateNowTracks,
    deferTracks,
    committeeCapitalAtRiskMillions,
    findingsList,
    ok: findingsList.filter((item) => item.severity === "high").length <= items.length
  };
}

export function toExport(items: InvestmentScenarioItem[], now?: string): InvestmentScenarioExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    items
  };
}
