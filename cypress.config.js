const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1300,
  viewportHeight: 660,
  defaultCommandTimeout: 6000, // some websites take longer time to load so you can adjust the default your entire project timeout here
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // we are pointing here where our test cases are located
    specPattern: 'cypress/integration/examples/*.js'
  },
});
