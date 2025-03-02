/// <reference types = 'cypress'/>

describe('Handling Invisible and Visible Elements', function(){
    it('Invisible and Visible Test1', function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        
        cy.get('#displayed-text').as('txtbox');
        cy.get('@txtbox').should('be.visible');


        // click the hide button should display text box then assert that the textbox is not displaying
        cy.get('#hide-textbox').click();
        cy.get('@txtbox').should('not.be.visible');



        // click the display button should display text box then assert that the textbox is  displaying
        cy.get('#show-textbox').click();
        cy.get('@txtbox').should('be.visible');








    })

})