import { describe, expect, it } from "vitest";
import { capitalOptions, payload, riskMap, scenarioLane, summary, timingRisks, verification } from "./verticalBriefService.js";

describe("investment committee scenario service", () => {
  it("returns the summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the scenario lane", () => {
    expect(scenarioLane()[0]?.audience).toBeTruthy();
  });

  it("returns the capital options view", () => {
    expect(capitalOptions()[0]?.investmentNeedScore).toBeGreaterThan(0);
  });

  it("returns the timing risks view", () => {
    expect(timingRisks()[0]?.urgencyScore).toBeGreaterThan(0);
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification()[0]).toContain("Synthetic");
  });

  it("keeps the scenario headline in the payload sample", () => {
    expect(payload().sample[0]?.scenarioHeadline).toBeTruthy();
  });
});
