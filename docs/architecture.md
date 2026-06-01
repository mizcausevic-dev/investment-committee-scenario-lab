# Architecture

Investment Committee Scenario Lab is a static-friendly TypeScript executive-intelligence surface for capital-allocation choices, savings sequencing, investment timing, and board-safe scenario planning.

## Core flow

- `src/data/sampleVerticalBrief.ts` models committee scenarios across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness.
- `src/analyze.ts` scores exposure, savings unlock, investment need, confidence, urgency, upside, and downside while generating committee findings.
- `src/services/verticalBriefService.ts` exposes the scenario-lane, capital-options, timing-risks, and risk-map packets used by both the app and prerender step.
- `src/services/render.ts` turns those packets into board-readable HTML routes plus a sample export.
- `scripts/prerender.ts` produces the static site and JSON payloads for GitHub Pages.

## Output shape

Each scenario is designed to answer the same executive questions:

- what should we accelerate now
- what should we resequence for savings
- what should we defer without losing the board story
- what evidence still blocks a committee-quality decision

## Guardrails

- synthetic data only
- read-only public surface
- no tenant credentials or private documents
- no compliance overclaim language
