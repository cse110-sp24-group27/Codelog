/** @type {import('jest').Config} */
const config = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './source/assets/scripts/*.{js,jsx}'
  ],
  coverageReporters: ['clover']
}

module.exports = config
