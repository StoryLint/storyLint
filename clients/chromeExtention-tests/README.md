# Chrome Extension Unit Testing with Jest

This folder uses [Jest](https://jestjs.io/) for unit testing JavaScript files for the Chrome extension.

## How to Run Tests

1. Open a terminal in the workspace root.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run all tests:
   ```bash
   npx jest clients/chromeExtention-tests
   ```
4. Run tests with coverage report:
   ```bash
   npx jest clients/chromeExtention-tests --coverage
   ```
   Coverage results will appear in the `clients/chromeExtention/coverage/` folder.

## Adding More Tests
- Add test files with the `.test.js` suffix (e.g., `popup.unit.test.js`) in `clients/chromeExtention-tests`.
- Import and test functions from your extension scripts (e.g., `popupUtils.js`).
- Mock `chrome.*` APIs as needed for logic that interacts with browser APIs.

## Example Test
See `clients/chromeExtention-tests/popup.unit.test.js` for a sample test.
