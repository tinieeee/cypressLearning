/// <reference types = "cypress"/>

describe('Mouse Hoovers', function(){
    it('Verify mouse hover', function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        // There is no direct support from Cypress to verify hovers buts
        // we are going to use jQuery called show() method - in jQuery this is used to display the hidden and selected elements
        cy.get('div.mouse-hover-content').invoke('show') // we are using the immediate parent instead ung parent button na mousehover kasi if may jQuery
        // ung immediate parent lang sya mag wowork so ung mga links is under ng immediate paren na mouse-hover-content
        // then verify what it contains once it is hovered
        cy.contains('Top').click()
        // then verify that the top is clicked the url will have /#top at the end 
        cy.url().should('include', 'top')

    })
})