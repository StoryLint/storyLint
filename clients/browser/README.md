# StoryLint Web

Marketing site, authentication entry point, and billing portal for StoryLint.

This app exists to:
- Explain what StoryLint does
- Handle user authentication
- Manage subscriptions and billing
- Act as the bridge between Stripe and the Chrome extension

The product logic does NOT live here.

---

## Responsibilities

- Landing / pricing pages
- Login / signup
- Stripe Checkout + Customer Portal
- Account status display
- Redirect users back to the Chrome extension

---

## Tech Stack

- React (or Next.js)
- TypeScript
- Stripe (Checkout + Customer Portal)
- OAuth / magic-link auth
- Hosted separately from the extension

---

## Non-Goals

- No story parsing
- No Given/When/Then generation
- No business rules

This app sells and manages access. Nothing else.

---

## Environment Variables

- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- AUTH_PROVIDER_KEYS
- API_BASE_URL

---

## Deployment

- Vercel / Netlify / equivalent
- HTTPS required (Stripe)

---

## Philosophy

The web app should be boring, stable, and thin.
All product value lives elsewhere.
