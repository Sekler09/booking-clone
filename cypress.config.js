const { defineConfig } = require('cypress');
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const codeCoverageTask = require('@cypress/code-coverage/task');

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: false,

  e2e: {
    baseUrl: 'http://localhost:5173/',
    viewportWidth: 1200,
    viewportHeight: 800,
    setupNodeEvents(on, config) {
      const options = webpackPreprocessor.defaultOptions;
      codeCoverageTask(on, config);
      options.webpackOptions.module.rules.push({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      });
      on('file:preprocessor', webpackPreprocessor(options));

      return config;
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) {
      const options = webpackPreprocessor.defaultOptions;
      codeCoverageTask(on, config);
      options.webpackOptions.module.rules.push({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      });
      on('file:preprocessor', webpackPreprocessor(options));

      return config;
    },
  },
});
