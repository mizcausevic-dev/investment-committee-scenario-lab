import { toExport } from "../src/analyze.js";
import { sampleInvestmentCommitteeScenarioLab } from "../src/data/sampleVerticalBrief.js";
import { writeFileSync } from "node:fs";

const clean = sampleInvestmentCommitteeScenarioLab.map((item) => ({
  ...item,
  relatedSurfaces: [...item.relatedSurfaces].sort(),
  requiredEvidence: [...item.requiredEvidence].sort(),
  companyTags: [...item.companyTags].sort()
}));

writeFileSync(
  "fixtures/investment-committee-scenario-lab.json",
  JSON.stringify(toExport(sampleInvestmentCommitteeScenarioLab), null, 2)
);

writeFileSync(
  "fixtures/investment-committee-scenario-lab-clean.json",
  JSON.stringify(toExport(clean), null, 2)
);
