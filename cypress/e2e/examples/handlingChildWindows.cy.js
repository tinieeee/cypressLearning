/// <reference types = "cypress"/>

describe('Testing Child Windows and tabs by not removing attribute target', function(){
    beforeEach(()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })
    it('Verify opening of child tabs without removing the target attribute', function(){
        
        // how to get attribute value (we are going to get the href link from the button)
        // instead of deleting the targeting attribute using jQuery i just want to directly access the url by getting the attribute value in the button
        // This time we need to rely again to jQuery method prop() which will help you get the property(attribute which is the href in this scenario) value
        // since prop is jQuery we need to resolve if by using then
        cy.get('#opentab').then(function(el)
        {
            const url = el.prop('href');
            cy.visit(url);
            cy.origin(url, ()=> {
            cy.get('div#navbarSupportedContent').find('a[href="about.html"]').click();
            // Then validation that the text Welcome to QAClick Academy is displaying after clicking about me
            cy.get('.section-title.mt-50 h2').should('contain', 'Welcome to QAClick Academy');
            })
        })
    })
})