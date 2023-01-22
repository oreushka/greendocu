const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  e2e: {
    setupNodeEvents() {},
    baseUrl: "http://127.0.0.1:5000",
  },
});
