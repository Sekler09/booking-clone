const { defineConfig } = require('cypress');
const webpackPreprocessor = require('@cypress/webpack-preprocessor');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/',
    viewportWidth: 1200,
    viewportHeight: 800,
    setupNodeEvents(on, config) {
      const options = webpackPreprocessor.defaultOptions;
      options.webpackOptions.module.rules.push({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      });
      on('file:preprocessor', webpackPreprocessor(options));
    },
  },
});
