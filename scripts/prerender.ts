import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { renderDocs, renderInvestmentWaterfall, renderOverview, renderPeerGaps, renderVerification } from "../src/services/render.js";
import { capitalOptions, payload, riskMap, scenarioLane, summary, timingRisks, verification } from "../src/services/verticalBriefService.js";

const root = path.resolve("site");
mkdirSync(root, { recursive: true });

if (existsSync("CNAME")) {
  writeFileSync(path.join(root, "CNAME"), readFileSync("CNAME", "utf8").trim() + "\n");
}

const htmlRoutes = new Map<string, [string, string]>([
  ["/", ["index.html", renderOverview()]],
  ["/scenario-lane", ["scenario-lane/index.html", renderPeerGaps()]],
  ["/capital-options", ["capital-options/index.html", renderInvestmentWaterfall()]],
  ["/timing-risks", ["timing-risks/index.html", renderVerification()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
]);

for (const [, [target, html]] of htmlRoutes) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://scenario.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://scenario.kineticgain.com/</loc></url><url><loc>https://scenario.kineticgain.com/scenario-lane/</loc></url><url><loc>https://scenario.kineticgain.com/capital-options/</loc></url><url><loc>https://scenario.kineticgain.com/timing-risks/</loc></url><url><loc>https://scenario.kineticgain.com/verification/</loc></url><url><loc>https://scenario.kineticgain.com/docs/</loc></url></urlset>`
);

const api = {
  "api/dashboard/summary.json": summary(),
  "api/scenario-lane.json": scenarioLane(),
  "api/capital-options.json": capitalOptions(),
  "api/timing-risks.json": timingRisks(),
  "api/risk-map.json": riskMap(),
  "api/verification.json": verification(),
  "api/sample.json": payload().sample,
  "api/payload.json": payload()
};

for (const [target, data] of Object.entries(api)) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}
