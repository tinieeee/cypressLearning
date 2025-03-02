/// <reference types ="cypress"/>

describe('Test Checkboxes', function(){
    it('Checkbox 1 Test', function(){
        // visit the site
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

        // click the checkbox
        // for checkboxes we are using the check method instead of the click
        // then assert that the checkbox is ticked after - we used the .should('be.checked')
        // then assert if the value for that check box is correct (in the UI this checkbox displayed text is option1)
        // we have multiple assertions here since we also want to check the text instead of adding another should you can use .and()
        // lastly we want to validate the type is checkbox so we add another .and('have.attr', 'type', 'checkbox')
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1').and('have.attr', 'type', 'checkbox');

        // this time uncheck the checkbox and add assertion that the checbox is unticked
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked');

        // want to tick multiple checkboxes
        // find out the common locator for all those checkboxes which is the type
        // then check only specificed elements, so inside the check method let throw array of elements I only want to be checked so add the 'value' you want to be checked
        // Add assertion that those values are checked
        cy.get('input[type="checkbox"]').check(['option2', 'option3']).should('be.checked');













    })
})