/// <reference types = 'cypress'/>

describe('Handling Radio Buttons', function(){
    it('Test Radio One', function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        
        cy.get('.radioButton').eq(1).check().should('be.checked').and('have.value', 'radio2');
        cy.get('input[value = "radio3"]').check().should('be.checked').and('have.attr', 'type', 'radio');

        // The issue is that the text inside the <label> contains extra spaces and new lines (\n, &nbsp;).
        // .invoke('text') → Gets the actual text inside the <label>
        // .trim() → Removes leading and trailing spaces.
        // .replace(/\s+/g, ' ') → Replaces multiple spaces with a single space (ignoring &nbsp;
        // .to.eq('Radio3') → Ensures the text matches exactly.
        cy.get('label[for="radio3"]').invoke('text').then((text) => {
            expect(text.trim().replace(/\s+/g, ' ')).to.eq('Radio3');
          });

    })
})