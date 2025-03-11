const { defineConfig } = require("cypress");

// Every time this file is updated make sure to restart your runner first before running again

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  // video: true, // Ensures Cypress records videos regardless if pass or failed for mochawesome reporting, be default cypress only displays screenshot if failed
  viewportWidth: 1300,
  viewportHeight: 660,
  defaultCommandTimeout: 6000, // some websites take longer time to load so you can adjust the default your entire project timeout here
  env: {
    //I wanted to declare the base URL here so all my framework will follow the url what I write here
    baseurl: "https://rahulshettyacademy.com"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // This is where you can tweak the behavior of the cypress configurations
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on); //we added this to tell that once the test execution is done it will generate a report that is a json/html file
      //based on mochawesome plugin
    },
    // we are pointing here where our test cases are located
    specPattern: 'cypress/integration/examples/*.js'
  },
});
