/// <reference types = "cypress"/>

describe('Test Dropdowns', function(){
    it('Static Dropdowns Test', function(){

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        // We have 2 kinds of Dropdowns static and dynamic dropdowns
        // Static - the options are static
        // Dynamic - you get options based on your inputs

        // Lets go to static dropdowns first
        // for dropdowns we use the select method and we need to pass the option name or the value attribute of that option
        // Assert if selected option is correct

        // we are using the option name
        // .find(':selected') → Finds the currently selected <option>
        cy.get('#dropdown-class-example').select('Option2').find(':selected').should('have.text', 'Option2')
        // we are using the value attribute
        cy.get('#dropdown-class-example').select('option3').should('have.value', 'option3')


        // This time lets try the dynamic dropdowns
        // This is a little bit tricky because the option will only display if you type
        // and the option are disappearing if you spy to get the element so you need to click inspec element on the options itself once it displays
        // 
        cy.get('#autocomplete').type('Ind');
        // Parent to child we use space to go through from paren to child .ui-menu-item is parent <space> tagname of the child(ui-menu-item-wrapper)
        cy.get('.ui-menu-item  div' ).each(($country)=>{
            // remember that .text is a jQuery but since we have .each above it will auto resolve the promise
            if($country.text() === 'India')
            {
                
                cy.wrap($country).click();
                // Assert that the selected value is India
                // Since this is a dynamic dropdown (likely a <div> or <ul> list), 
                // the correct way to assert the selected value is by verifying the text inside the input field 
                // it is not the usual assertion where we can have .should connected after.click()
                cy.get('#autocomplete').should('have.value', 'India');
                
            }
        })


        //

    })
})