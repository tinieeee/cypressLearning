/// <reference types="cypress"/>
// This time lets optmize Test1.js now
describe('Grocery Store Test', function(){

    it ('Add to cart and checkout', function(){
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)


        // we can use aliasing for products since we are using .products many times, instead of using it multiple times you can do this:
        // this will act as a variable
        // this best used if the locator name for example is changes you dont need to find all .products and rename it you just need to update onle line 
        // of code since we used aliasing. Since this is now centralized
        cy.get('.products').as('productLocator')

        cy.get('@productLocator').find('.product').each(($el, index, $list)=>{
            // used toLowercase for case sensitivity it will work for "cashews", "Cashews", "CASHEWS", etc.
            const textVeg = $el.find('h4.product-name').text().toLowerCase();
            if(textVeg.includes('cashews'))
            {
                cy.wrap($el).find('button').click();

            }
        })  
        // this time you want to add assertion - to assert if your logo text is correctly displayed
        // As we mentioned .text is not a cypress method but this time we have .should belongs to Chai library and that takes care of all the assertions
        // And in assertion every promise is automatically handled so don't worry about any promises after should
        cy.get('.brand').should('have.text','GREENKART')
        cy.get('.brand.greenLogo').then(function(logoElement){
            cy.log(logoElement.text())
        })

        // Click the cart icon
        // > symbols means selects the direct child
        cy.get('.cart-icon > img').click()

        // Then click Proceed to checkout button
        cy.get('.action-block > button').contains('PROCEED TO CHECKOUT').click();
        
        // Click the place order button
        cy.contains('button','Place Order').click();
        






        
    })
})