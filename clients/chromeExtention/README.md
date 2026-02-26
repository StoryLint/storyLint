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

Current local files:

- `manifest.json`
- `popup.html`
- `popup.css`
- `popup.js`

To run Gen 1 locally:

1. Start backend API (`http://localhost:8000`) from `backends/`.
2. Open `chrome://extensions` and enable Developer mode.
3. Click **Load unpacked** and select `clients/chromeExtention`.
4. Open StoryLint popup, paste text, click **Send**, then **Copy Text**.

---

## Testing in Chrome (Local Dev)

Use this flow to test the extension in your browser while developing.

1) Open extension manager
- In Chrome, open `chrome://extensions`.
- Enable **Developer mode** (top-right).

2) Load unpacked extension
- Click **Load unpacked**.
- Select the extension root folder (the folder containing `manifest.json`).

3) Pin and open the extension UI
- Click the puzzle icon and pin StoryLint.
- Click the extension icon to open popup/side panel UI.

4) Test core UI flow
- Enter or paste requirement text.
- Click **Send**.
- Confirm loading spinner appears while processing.
- Confirm formatted output appears below the input.
- Click **Copy Text** and paste into another app to verify content.

5) Test with selected page text (if content script is enabled)
- Highlight text on any webpage.
- Open extension and verify selected text is available.

---

## Reload During Development

- After code changes, return to `chrome://extensions` and click **Reload** on StoryLint.
- Refresh the webpage too if you changed content scripts.

---

## Debugging

- Popup UI logs: right-click popup and click **Inspect**.
- Background/service worker logs: open StoryLint card in `chrome://extensions` and inspect the service worker.

---

## Common Issues

- Wrong folder loaded: ensure `manifest.json` exists at selected folder root.
- Changes not visible: reload extension, then refresh page.
- Clipboard copy fails: verify user action triggers copy and `clipboardWrite` permission is present.
- API call fails in local dev: verify backend is running and extension host permissions/CORS allow `localhost`.

---

## Philosophy

If a requirement cannot be expressed as
Given / When / Then,
it is not ready to be built.
