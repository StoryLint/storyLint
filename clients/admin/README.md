# StoryLint Admin Dashboard

Internal admin UI for operating StoryLint.

This application is used by founders / operators to:
- Monitor usage
- Inspect subscriptions
- Handle support issues
- Enforce policy

End users never see this app.

---

## Responsibilities

- View users and accounts
- Inspect subscription state
- Monitor usage and limits
- View Stripe event status (read-only)
- Manual entitlement overrides (emergency only)

---

## Tech Stack

- React (or Next.js)
- TypeScript
- Admin-only authentication
- Calls Admin API only
- Deployed behind access control

---

## Core Screens

- Users list
- User detail (plan, usage, status)
- Subscriptions view
- Usage metrics
- Stripe webhook health
- Feature flag overrides

---

## Data Access

- Read-heavy
- Minimal writes
- All changes audited

Admin frontend is **not** a source of truth.
It reflects Admin API state.

---

## Authentication

- Admin-only accounts
- No self-signup
- MFA required
- IP allowlist recommended

---

## Non-Goals

- No story linting
- No billing flows
- No Chrome extension logic

---

## Philosophy

If an operator needs to SSH into production,
this app has already failed.
