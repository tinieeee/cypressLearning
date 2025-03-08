class ConfirmationCheckoutPage 
{



    submitFormDetails()
    {
        cy.submitFormDetails()
        // cy.get('input#country').type('India');
        // cy.get('.suggestions ul li a', { timeout: 5000 }).should('be.visible').click();
        // cy.get('.btn.btn-success.btn-lg').click();
    }

    getAlertMessage()
    {
        return cy.get('div.alert-success')
    }
}

export default ConfirmationCheckoutPage;