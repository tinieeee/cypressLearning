// By adding this header auto detects the next method you want that is built in sa Cypress
/// <reference types="cypress"/>
//  describe is Test Suite
describe('My First Test Suite', function(){
    // It are test cases
    it ('My First Test Case', function(){
        // These are now your test steps
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        // get the search box and type ca word
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        // verify that correct search results are displaying
        // getting all the elements with class name product
        // you will get error if you used this command because there are some elements that are insvisible with the same class name
        // cy.get('.product').should('have.length',4)
        // to update that you need only to make sure to retrieve only visible products
        // you can do that by using visible
        cy.get('.product:visible').should('have.length',4)

        // This time we will use the product child chaining 
        // so we will only get the products that we need (not including the invisible elements we encountered previously)
        // find method will find the element from the parent element only which is products
        cy.get('.products').find('.product').should('have.length',4)
        
        //out of the 4 products I want to click add to cart button for the second product 
        // we are using eq to pass the index of the product we want to select (2nd product which is the 2nd index) 
        // and used contains cypress will search for that particular text
        cy.get('.products').find('.product').eq(1).contains('ADD TO CART').click()

        // This time we should not only rely on indexing there is a posibilty that products will be added so this time we will get the name value
        // we will use each - it will help to iterate through the array(loop will run depends ilan element mo sa arrayand if na meet na nya si condition)
        // In our scenario we have 4 elements in the array
        // $el is the variable for first element of the array(will iterates kung ilang element meron ka sa array), 
        // index = is index of the array for first element it is 0, 
        // list is the total list
        // .button is the class name for the button ADD TO CART
        // but I think we just need to use the variable el only here
        cy.get('.products').find('.product').each(($el, index, $list)=>{
            // used toLowercase for case sensitivity it will work for "cashews", "Cashews", "CASHEWS", etc.
            const textVeg = $el.find('h4.product-name').text().toLowerCase();
            if(textVeg.includes('cashews'))
            {
                cy.wrap($el).find('button').click();

            }
        })  

        // I want to get the logo
        // .text is not a cypress command it is a jquery command but cypress supports jQuery but the code below will not work
        // cy.log(cy.get('.brand.greenLogo').text())

        // As you can see here we added .then() function we need to resolve the promise manually from the above code since we are using non cypress codes so that 
        // cypress wont be confused
        cy.get('.brand.greenLogo').then(function(logoElement){
            cy.log(logoElement.text())

        })







        
    })
})