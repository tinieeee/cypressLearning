/// <reference types = "cypress"/>
/// <reference types = "cypress-iframe"/>
import 'cypress-iframe'

// Cypress does not support handling frames
// You need to install one plugin and make sure you are in the project level where node_modules folder are present
// Then in the terminal type npm install -D cypress-iframe
describe('Handling Frames', function(){

    it('Verify Frames in the web page', function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        // get the ID of the iFrame and load it to the Cypress object by using cy.frameLoaded instead of cy.get
        cy.frameLoaded('iframe#courses-iframe')
        

        // cy.iframe is telling Cypress to switch to iframe mode
        // So it will see the frames loaded in the object cy.frameLoaded('iframe#courses-iframe')
        // We are using eq to retrieve the index of a[href="mentorship"] because there are a total of 2 of them 
        cy.iframe().find('a[href="mentorship"]').eq(0).click()
        // it only worked when i added the cy.wait
        cy.wait(2000);

        

        // Then for assertion verify that there are 2 packages(Bronze and Platinum) under mentorship and get that count
        // The *= (contains) attribute selector means "select elements whose class attribute contains the substring 'pricing-title' anywhere in its value."
        // .should('have.length', 2) is checking if we have 2 packages under mentorship
        cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)



        
    })
})