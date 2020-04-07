module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  coverageDirectory: "./coverage/",
  coverageReporters: ["lcov", "text-summary"]
}