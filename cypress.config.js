const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1300,
  viewportHeight: 660,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // we are pointing here where our test cases are located
    specPattern: 'cypress/integration/examples/*.js'
  },
});
