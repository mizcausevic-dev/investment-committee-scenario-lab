import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleInvestmentCommitteeScenarioLab } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected item count", () => {
    const report = analyze(sampleInvestmentCommitteeScenarioLab, { now: "2026-06-01T00:00:00Z" });
    expect(report.items).toBe(sampleInvestmentCommitteeScenarioLab.length);
  });

  it("computes positive scenario metrics", () => {
    const report = analyze(sampleInvestmentCommitteeScenarioLab, { now: "2026-06-01T00:00:00Z" });
    expect(report.averageSavingsUnlock).toBeGreaterThan(0);
    expect(report.averageInvestmentNeed).toBeGreaterThan(0);
  });

  it("counts accelerate and defer tracks", () => {
    const report = analyze(sampleInvestmentCommitteeScenarioLab, { now: "2026-06-01T00:00:00Z" });
    expect(report.accelerateNowTracks).toBeGreaterThan(0);
    expect(report.deferTracks).toBeGreaterThan(0);
  });

  it("emits findings", () => {
    const report = analyze(sampleInvestmentCommitteeScenarioLab, { now: "2026-06-01T00:00:00Z" });
    expect(report.findingsList.length).toBeGreaterThan(0);
  });

  it("rolls up committee capital at risk", () => {
    const report = analyze(sampleInvestmentCommitteeScenarioLab, { now: "2026-06-01T00:00:00Z" });
    expect(report.committeeCapitalAtRiskMillions).toBeGreaterThan(0);
  });
});
