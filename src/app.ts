import express from "express";
import { renderDocs, renderInvestmentWaterfall, renderOverview, renderPeerGaps, renderVerification } from "./services/render.js";
import { capitalOptions, payload, riskMap, scenarioLane, summary, timingRisks, verification } from "./services/verticalBriefService.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/scenario-lane", (_req, res) => res.type("html").send(renderPeerGaps()));
  app.get("/capital-options", (_req, res) => res.type("html").send(renderInvestmentWaterfall()));
  app.get("/timing-risks", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/scenario-lane", (_req, res) => res.json(scenarioLane()));
  app.get("/api/capital-options", (_req, res) => res.json(capitalOptions()));
  app.get("/api/timing-risks", (_req, res) => res.json(timingRisks()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

const port = Number(process.env.PORT || 4010);

if (process.env.NODE_ENV !== "test") {
  createApp().listen(port, () => {
    console.log(`investment-committee-scenario-lab listening on http://127.0.0.1:${port}`);
  });
}
