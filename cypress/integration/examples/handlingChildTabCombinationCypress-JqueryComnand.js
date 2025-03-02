/// <reference types = "cypress"/>

describe('Test for handling the child windows',function(){
    before(() =>
    {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    })
    it('Verify Child window is opened', function(){
        // In Cypress no matter what you cannot switch to child window
        // The only way you can handle them is making application to load the child page itself in the parent page instead of opening a separate tab
        // How? there is always a specific attribute called target = _blank so using jQuery we can remove this attribute
        cy.get('#opentab').invoke('removeAttr', 'target').click();

        // Once the tab is open lets try few validation so now click about us
        // this is how we verify things cy.get('div#navbarSupportedContent').find('a[href="about.html"]').click(); but this will not work
        // if you use the code above there will be error because cypress doesn't support cross origin 
        // so as long as you are under the same the domain cypress won't complain
        // But this time we are using a brand new domain so for it to work with need to use the function cy.origin()
        // cy.origin is telling cypress hey we are doing this using a new domain
        cy.origin('https://www.qaclickacademy.com',()=>{
            cy.get('div#navbarSupportedContent').find('a[href="about.html"]').click();
            // Then validation that the text Welcome to QAClick Academy is displaying after clicking about me
            cy.get('.section-title.mt-50 h2').should('contain', 'Welcome to QAClick Academy');
        })
        
    })
})