module.exports = {
  setupFiles: ["./source/setup-jest.js"],
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!game.mjs)"],
  transform: {
    "^.+\\.mjs?$": "babel-jest",
  },
};
