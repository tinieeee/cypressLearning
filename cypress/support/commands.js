// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// create a cypress command in this file
Cypress.Commands.add('submitFormDetails', ()=>{
    // this is originally in the confirmationspage object under support folder but we created this command instead of adding it there if command is used in multiple pages
    // then in the confirmationspage object we can just simple call this command
    // to call this just use cy.submitFormDetails()
    cy.get('input#country').type('India');
    cy.get('.suggestions ul li a', { timeout: 5000 }).should('be.visible').click();
    cy.get('.btn.btn-success.btn-lg').click();
})