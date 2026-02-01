# StoryLint App Backend (LLM API Layer)

Backend service that provides LLM-powered rewrites and structured transformations for the StoryLint Chrome extension.

This service exists to:
- Improve / rewrite stories beyond deterministic rule-based linting
- Enforce subscription entitlements and rate limits
- Provide consistent, versioned prompts and outputs
- Keep model keys and safety policies off the client

The Chrome extension never calls LLM providers directly.

---

## Responsibilities

- Authenticate requests from the extension (JWT or signed token)
- Validate entitlements (free/pro/team)
- Enforce quotas and abuse controls
- Run prompt pipelines (rewrite → normalize → validate)
- Return deterministic JSON output to the extension
- Log usage events for billing/analytics

---

## Non-Goals

- No UI
- No Stripe checkout flows (handled by Admin API / Web)
- No long-term user profile storage (stored in Admin DB)
- No story authoring/editor features (extension UI owns UX)

---

## Architecture

Extension → App Backend → LLM Provider(s)

- App Backend is a thin orchestration layer:
  - Request validation
  - Prompt/version selection
  - Provider routing + fallback
  - Output schema validation
  - Usage metering

---

## Tech Stack

- Node.js + TypeScript (Fastify recommended) OR Python (FastAPI)
- Schema validation: Zod (TS) / Pydantic (Py)
- Queue (optional): Redis + BullMQ / Celery (for retries and burst control)
- Storage:
  - Postgres (shared with Admin API) OR
  - Separate Postgres for model logs + prompt versions
- Observability: OpenTelemetry + structured logs
- Hosting: serverless (Lambda/Cloudflare) or container (Fly/Render)

---

## Data Contracts

### Input (from extension)
The extension sends a single payload and asks for a transformation mode.

Example:
```json
{
  "mode": "gwt_rewrite",
  "input_text": "messy requirement text here",
  "context": {
    "project": "optional",
    "domain": "optional",
    "format": "gwt"
  }
}
