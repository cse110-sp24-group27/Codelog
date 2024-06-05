module.exports = {
  launch: {
    headless: true
  },
  config: {
    collectCoverage: true,
    collectCoverageFrom: [
      './source/assets/scripts/*.{js,jsx}'
    ],
    coverageReporters: ['clover', 'json', 'lcov', ['text', {skipFull: true}]],
    coverageDirectory: '.'
  }
}
