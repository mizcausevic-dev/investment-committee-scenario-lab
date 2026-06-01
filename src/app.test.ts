import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("investment-committee-scenario-lab app", () => {
  it("serves the HTML routes", async () => {
    const htmlRoutes = ["/", "/scenario-lane", "/capital-options", "/timing-risks", "/verification", "/docs"];

    for (const route of htmlRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
      expect(response.type).toContain("html");
    }
  });

  it("serves the JSON routes", async () => {
    const jsonRoutes = [
      "/api/dashboard/summary",
      "/api/scenario-lane",
      "/api/capital-options",
      "/api/timing-risks",
      "/api/risk-map",
      "/api/verification",
      "/api/sample",
      "/api/payload"
    ];

    for (const route of jsonRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
      expect(response.type).toContain("json");
    }
  });
});
