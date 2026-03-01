module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/clients/chromeExtention/popup.js',
    '**/clients/chromeExtention/popupUtils.js',
    '**/clients/chromeExtention/background.js'
  ],
  coverageDirectory: 'clients/chromeExtention/coverage',
  testMatch: [
    '**/clients/chromeExtention-tests/*.test.js'
  ],
  roots: [
    '<rootDir>/clients/chromeExtention-tests',
    '<rootDir>/clients/chromeExtention'
  ]
};
