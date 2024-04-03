module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: ["node_modules/(?!axios)/"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
};
