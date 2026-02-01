# StoryLint Chrome Extension

Linting for product requirements.

StoryLint converts narrative product stories into deterministic,
testable **Given / When / Then** specifications.

Runs locally. Fast. Opinionated.

---

## What It Does

- Accepts pasted or selected text
- Normalizes messy input
- Extracts behavior and conditions
- Outputs clean Given / When / Then
- Copies Jira-ready acceptance criteria

---

## What It Does NOT Do

- No billing
- No Stripe
- No auth logic
- No data storage beyond local prefs

---

## Architecture

- Manifest V3
- Content Script (text selection)
- Background Service Worker
- React UI (popup or side panel)
- TypeScript core compiler

---

## Core Modules

- normalize/
- segment/
- gwt/
- rules/
- templates/

The compiler is deterministic and rule-based.

---

## Optional Backend Interaction

- Fetch entitlement state
- Submit usage counters
- Never sends raw story text unless user opts in

---

## Permissions

- activeTab
- storage
- clipboardWrite

Nothing else.

---

## Installation

Loaded unpacked during development.
Published via Chrome Web Store for users.

---

## Philosophy

If a requirement cannot be expressed as
Given / When / Then,
it is not ready to be built.
