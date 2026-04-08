const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // URL base — no repites el dominio en cada test
    baseUrl: 'https://www.saucedemo.com',

    // Tiempo máximo de espera por elemento
    defaultCommandTimeout: 8000,

    // Reintentar tests fallidos en CI/CD
    retries: {
      runMode: 2,
      openMode: 0
    },

    // Carpeta de tests
    specPattern: 'cypress/e2e/**/*.cy.js',

    setupNodeEvents(on, config) {}
  }
})