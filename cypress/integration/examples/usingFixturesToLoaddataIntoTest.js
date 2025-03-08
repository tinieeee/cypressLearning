/// <reference types ="cypress"/>

describe('Using Fixtures for Testing', function(){
    before(function()  // runs once before all test in this block  this called before hooks
        {
        // Using fixtures will be able to load the external file data into your actual tests
        // Step 1 So lets add the actual data into fixtures folder > example.json (I added lines 5-7(usernmae, pw, productname))
        // then lets add a method called cy.fixture(example.json) you need to add the file name where the data are stored

        cy.fixture('example').then(function(data)
         {
            this.data = data; // the data variable will be available for the entire file not just in this block so it can be used outside this block
            // will become global variable
         })
        })
    it('Testing using Fixtures', function(){
        const productName = this.data.productName

        cy.visit('https://rahulshettyacademy.com/loginpagePractise/#');
        cy.get('input#username').type(this.data.username);
        cy.get('input#password').type(this.data.password);
        cy.get('input#terms').check();
        cy.get('input#signInBtn').click();
        cy.url().should('eq', 'https://rahulshettyacademy.com/angularpractice/shop');
        cy.get('h1.my-4').should('contain.text', 'Shop Name');
        // once we are inside lets verify that we have 4 items listed down, so lets get their common clas names
        cy.get('app-card.col-lg-3').as('productsList');
        cy.get('@productsList').should('have.length', 4);

        cy.get('@productsList').filter(`:contains("${productName}")`) // product name is already declared so lets use it by using ${} and to use `` instead of ''
        .then(($element) =>
        {
            cy.wrap($element).find('button.btn.btn-info').click();
        })

        // Then lets compare the total amount to 200k and should be lessthan 200k
        cy.get('@productsList').eq(0).find('button.btn.btn-info').click();

        // Then lets click checkout
        cy.contains('a', 'Checkout').click();

        cy.get('tr td:nth-child(5) strong').invoke('text').then((text) => {
            cy.log(`Raw text: "${text}"`); // Debugging output
            const amount = Number(text.trim().split(" ")[1]); // Split by space and get the first index then convert it to a number
            expect(amount).to.be.lessThan(200000)
        
          });
        

        //   This time let us now checkout by clicking the checkout button
        cy.contains('button', 'Checkout').click();

        // then on the next page you will get the adress for delivery and click agree to terms and click purchase
        cy.get('input#country').type('India');
        cy.get('.suggestions ul li a').should('be.visible').click();
        cy.get('.btn.btn-success.btn-lg').click();
        cy.get('div.alert-success').should('contain','Success');

    })
})