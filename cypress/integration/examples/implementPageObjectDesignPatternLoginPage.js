/// <reference types ="cypress"/>

import LoginPage from "../../support/pageObjects/LoginPage";

describe('Test using Page Object Design Pattern', function()
{
    before(function()  // runs once before all test in this block  this called before hooks
    {

    cy.fixture('example').then(function(data)
     {
        this.data = data; 

        //create object to call Login class and can be used here in the entire file
         this.loginpage = new LoginPage()
     })
    })
    it('Test Object One', function(){
        
        const productName = this.data.productName // calling the productname from fixtures
        
        
        this.loginpage.goTo('https://rahulshettyacademy.com/loginpagePractise/#');
        cy.visit('https://rahulshettyacademy.com/loginpagePractise/#')
        const productpage = this.loginpage.login(this.data.username, this.data.password); // form a connection first dun sa login class by adding username and password parameter
        //para magamit natin si fixtures
        //take note we cannot use fixtures doon sa login class valid only dito sa actual test file
        //inadd natin ung const productpage kasi sa login class nirereturn din natin si products page kasi alam natin na
        //once ma click si login button it will redirect to products page
        // we do this instead na mag ccreate tayo ng new object sa test spec file which is not advisable

        // there is also cy.log to use for debugging i'll also use it here to check the username and password
        cy.log(this.data.username, this.data.password)

        productpage.getCurrentUrl().should('eq', 'https://rahulshettyacademy.com/angularpractice/shop');
        productpage.pageValidation().should('contain.text', 'Shop Name')
        productpage.getCardCount().should('have.length', 4)
        productpage.selectProduct(productName)
        productpage.selectFirstProduct()

        const cartpage = productpage.goToCart() // sa part na to alam natin na pag click natin ung checkout button mag reredirect na sya to cartpage
        // we do this instead na mag ccreate tayo ng new object sa test spec file which is not advisable
        cartpage.sumofProducts().then(function(sum){
            expect(sum).to.be.lessThan(200000)
            cy.log(sum)
        })
        
        cy.log('SUM OF PRODUCTS AFTER LINE')
        

        cartpage.maximumTotalAmount().then(function(amount){
            expect(amount).to.be.lessThan(200000)
            cy.log(amount)
        })

        cy.log('MAXIMUM TOTAL AMOUNT AFTER LINE')
        const confirmationcheckoutpage = cartpage.clickCheckout();

        // how to debug your test cases and pause? you can use cy.pause and investigate this part
        // cy.pause()
        // there is also cy.log to use for debugging
        

        confirmationcheckoutpage.submitFormDetails()
        confirmationcheckoutpage.getAlertMessage().should('contain','Success')

        

    })

})