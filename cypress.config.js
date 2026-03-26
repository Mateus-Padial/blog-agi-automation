const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    requestTimeout: 20000,
    responseTimeout: 30000,
    retries: { runMode: 2, openMode: 2 },
    screenshotOnRunFailure: true,
    baseUrl: 'https://blogdoagi.com.br/',
    setupNodeEvents(on, config) {

    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
    chromeWebSecurity: false,
  },
});
