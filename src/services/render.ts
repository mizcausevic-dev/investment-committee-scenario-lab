import { capitalOptions, payload, riskMap, scenarioLane, summary, timingRisks, verification } from "./verticalBriefService.js";

const productTitle = "Investment Committee Scenario Lab";
const domain = "https://scenario.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --panel-2: #102032;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid {
        display: grid;
        gap: 18px;
      }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 12px;
      }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

export function renderOverview() {
  const executiveSummary = summary();
  const lanes = scenarioLane().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.direction)}</div>
        <h3>${escapeHtml(item.scenarioTheme)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p>${escapeHtml(item.scenarioMove)}</p>
        <p><strong>Decision:</strong> ${escapeHtml(item.nextCommitteeDecision)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map((item) => `<li><strong>${escapeHtml(item.severity.toUpperCase())}</strong> · ${escapeHtml(item.message)}</li>`)
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Investment Committee Intelligence</span>
      <h1>What should we fund now, resequence next, and defer without losing the board story?</h1>
      <p class="lede">Investment Committee Scenario Lab turns portfolio complexity into capital-allocation scenarios across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Scenario lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled capital-allocation tracks in the current committee packet.</div></div>
        <div class="metric"><span class="metric-label">Savings unlock</span><span class="metric-value">${executiveSummary.averageSavingsUnlock}</span><div class="metric-copy">Average modeled savings unlock across the current scenarios.</div></div>
        <div class="metric"><span class="metric-label">Investment need</span><span class="metric-value">${executiveSummary.averageInvestmentNeed}</span><div class="metric-copy">Average investment pressure across the decision stack.</div></div>
        <div class="metric"><span class="metric-label">Capital at risk</span><span class="metric-value">$${executiveSummary.committeeCapitalAtRiskMillions}M</span><div class="metric-copy">Modeled capital still sitting behind under-ranked decisions.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Scenario queue</h2>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Priority findings</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready scenario surface for capital allocation choices, savings sequencing, and investment timing."
  );
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/scenario-lane", "Scenario lane"],
    ["/capital-options", "Capital options"],
    ["/timing-risks", "Timing risks"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => {
      const active = href === path ? ' class="active"' : "";
      return `<a${active} href="${href}">${label}</a>`;
    })
    .join("");
}

export function renderPeerGaps() {
  const rows = scenarioLane()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.direction)}</td>
        <td>${escapeHtml(item.scenarioTheme)}</td>
        <td>${escapeHtml(item.scenarioMove)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Scenario lane",
    "/scenario-lane",
    `<section class="hero">
      <span class="eyebrow">Scenario lane</span>
      <h1>Every capital move stays tied to one audience, one owner, and one board question.</h1>
      <p class="lede">The scenario-lane view keeps the committee path readable instead of letting capital-allocation choices fragment into disconnected workstreams.</p>
      <div class="nav">${navLinks("/scenario-lane")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Direction</th><th>Theme</th><th>Scenario move</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Scenario-lane view for committee direction, audience, and next investment move."
  );
}

export function renderInvestmentWaterfall() {
  const rows = capitalOptions()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${item.investmentNeedScore}</td>
        <td>${item.savingsUnlockScore}</td>
        <td>${item.upsideScore}</td>
        <td>${item.downsideScore}</td>
        <td>${escapeHtml(item.companyTags.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Capital options",
    "/capital-options",
    `<section class="hero">
      <span class="eyebrow">Capital options</span>
      <h1>See which scenarios deserve capital now and which should wait for better proof.</h1>
      <p class="lede">This view keeps investment need, savings unlock, upside, and downside together so the committee can rank scenarios instead of reacting to the loudest lane.</p>
      <div class="nav">${navLinks("/capital-options")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Need</th><th>Savings</th><th>Upside</th><th>Downside</th><th>Signals</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Capital-options view for investment need, savings unlock, upside, and downside."
  );
}

export function renderVerification() {
  const rows = timingRisks()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${item.urgencyScore}</td>
        <td>${item.confidenceScore}</td>
        <td>${escapeHtml(item.scenarioHeadline)}</td>
      </tr>`
    )
    .join("");
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return shell(
    "Timing risks",
    "/timing-risks",
    `<section class="hero">
      <span class="eyebrow">Timing risks</span>
      <h1>Urgency and confidence stay visible so the committee knows what can move now.</h1>
      <p class="lede">The timing-risks view highlights where urgency will outrun confidence if the evidence pack stays too thin.</p>
      <div class="nav">${navLinks("/timing-risks")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Urgency</th><th>Confidence</th><th>Headline</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>
    <section class="section">
      <h2>Verification</h2>
      <ul>${notes}</ul>
    </section>`,
    "Timing-risks view for committee urgency, confidence, and verification notes."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Investment Committee Scenario Lab docs</h1>
      <p class="lede">This surface packages investment what-if planning into board-readable routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/scenario-lane</code> keeps owners, audiences, and directions readable.</li>
        <li><code>/capital-options</code> compares need, savings, upside, and downside.</li>
        <li><code>/timing-risks</code> shows urgency, confidence, and timing pressure.</li>
        <li><code>/api/payload</code> exposes the reproducible scenario packet.</li>
      </ul>
      <pre>${escapeHtml(JSON.stringify(payload(), null, 2))}</pre>
    </section>`,
    "Product documentation for Investment Committee Scenario Lab and its scenario routes."
  );
}
