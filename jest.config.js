module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  // collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"],
  coverageReporters: ["lcov", "text-summary"]
}