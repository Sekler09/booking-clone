const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/',
    viewportWidth: 1200,
    viewportHeight: 800,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
