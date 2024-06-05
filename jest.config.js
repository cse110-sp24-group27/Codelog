/** @type {import('jest').Config} */
const config = {
  verbose: true,
  collectCoverage: true,
    collectCoverageFrom: [
      './source/assets/scripts/*.{js,jsx}'
    ],
    coverageReporters: ['clover', 'json', 'lcov', ['text', {skipFull: true}]]
};

module.exports = config;