module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/popup.js',
    '**/popupUtils.js',
    '**/background.js'
  ],
  coverageDirectory: 'coverage',
  testMatch: [
    '**/*.test.js'
  ],
  roots: [
    '<rootDir>/../chromeExtention-tests',
    '<rootDir>'
  ]
};
