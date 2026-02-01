# StoryLint Admin API

Backend system of record for StoryLint.

This service handles:
- Authentication
- Subscriptions and entitlements
- Usage tracking
- Stripe webhooks
- Policy enforcement

The Chrome extension trusts this API.

---

## Responsibilities

- Verify user identity
- Store subscription state
- Enforce plan limits
- Process Stripe webhooks
- Expose entitlement + usage APIs

---

## Tech Stack

- Node.js (Fastify / Express)
- TypeScript
- PostgreSQL (or Supabase)
- Stripe SDK
- Optional LLM provider
- Hosted as API / serverless

---

## Core Tables

- users
- subscriptions
- entitlements
- usage_events
- organizations (future)

---

## Key Endpoints

- GET /me
- GET /entitlements
- POST /usage
- POST /stripe/webhook
- POST /checkout-session

---

## Stripe Integration

Stripe is **backend-only**.

Handled events:
- checkout.session.completed
- invoice.paid
- customer.subscription.updated
- customer.subscription.deleted

Stripe is not trusted as source of truth.
Database is.

---

## Non-Goals

- No UI
- No Chrome-specific logic
- No formatting rules

---

## Philosophy

This service exists to answer one question reliably:

"Is this user allowed to do this right now?"
