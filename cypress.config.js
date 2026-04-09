const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // URL base — no repites el dominio en cada test
    baseUrl: 'https://www.saucedemo.com',

    // Tiempo máximo de espera por elemento
    defaultCommandTimeout: 8000,

    experimentalSessionAndOrigin: true,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      charts: true,
      reportPageTitle: 'QA Portfolio — SauceDemo',
      embeddedScreenshots: true,
      inlineAssets: true
    },
    retries: {
      runMode: 2,
      openMode: 0
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    excludeSpecPattern: [
      'cypress/e2e/1-getting-started/**',
      'cypress/e2e/2-advanced-examples/**'
    ],
    setupNodeEvents(on, config) {}
  },
  env: {
    SHELL: 'powershell'
  }
})