/// <reference types ="cypress"/>

describe('End to End E Commerce Test', function(){
    it('Testing login page',function(){
        const productName = 'Nokia Edge';


        cy.visit('https://rahulshettyacademy.com/loginpagePractise/#');
        cy.get('input#username').type('rahulshettyacademy');
        cy.get('input#password').type('learning');
        cy.get('input#terms').check();
        cy.get('input#signInBtn').click();
        cy.url().should('eq', 'https://rahulshettyacademy.com/angularpractice/shop');
        cy.get('h1.my-4').should('contain.text', 'Shop Name');
        // once we are inside lets verify that we have 4 items listed down, so lets get their common clas names
        cy.get('app-card.col-lg-3').as('productsList');
        cy.get('@productsList').should('have.length', 4);

        // Then lets get a product called Nokia Edge, so we need to iterate through the list and find nokia edge
        // Before we used each but this time we can use something new which is filter where the code is much shorter
        // So after returning the 4 carts we will filter and we will use jQuery we will start with : as this is jQuery Standards then add contains and product name
        // After filtering once na nakuha na nya yung element nun isstore nya yun returned element sa $element
        // then we will put it inside wrap para magamit natin ung Cypress actions dun sa jQuery(yielded element)
        
        cy.get('@productsList').filter(`:contains("${productName}")`) // product name is already declared so lets use it by using ${} and to use `` instead of ''
        .then(($element) =>
        {
            cy.wrap($element).find('button.btn.btn-info').click();
        })

        // Then lets add another one product the first product from the list
        cy.get('@productsList').eq(0).find('button.btn.btn-info').click();

        // Then lets click checkout
        cy.contains('a', 'Checkout').click();

        // Will be redirected to the Checkout page, verify that the amount for the selected items will not exceed 200,000
        // but this time lets try first to get the total price of each product and get the sum and sum should not exceed 200k

        let sum = 0; //at the beginning the sum value is 0
        cy.get('tr td:nth-child(4) strong').each(($el)=>{  //then in here we will iterate through the elements so 1st value will be 100k check sum comment
                const amount = Number($el.text().split(" ")[1].trim());
                sum = sum + amount; //then after adding 0 to first amount 100k = 100k then will iterate again current sum is 100k+65k (2nd iteration) = 165k
                //we will be getting the text first, trim it it is currently displaying as ₹. 10000 so we need to split it into 2 strings
                // we will split it based on space. and it will break into 2 indexes left part is 0 index right part is 1 index and get the
                // 1st index thats why we use [1]
                // applying .trim to remove whitespaces in beginning or end
                // and we need to sum it, currently it is in string format we need to conver it to number format so we need to wrap it to Number()
        
            }).then(()=> {  // so after the for loop is completed (.each()) we need to compare the sum to 200k thats why we have .then() after the each(for loop)
                //we directly used .then() after the each becuase inside each is not Cypress so we need to resolve it by manually adding the promise which is .then()
                //because if these are not cypress command there is no guarantee it will run in sequence because Cypress is Asynchronous
                expect(sum).to.be.lessThan(200000)
            })

        // This time lets get the total from the page instead of manually extracting them and should be less than 200k
        cy.get('tr td:nth-child(5) strong')
        .invoke('text')
        .then((text) => {
          cy.log(`Raw text: "${text}"`); // Debugging output
      
          // Step 1: Clean the text (remove commas and non-numeric characters)
          const cleanedText = text.trim()
          .replace(/^\.*/, '') // remove leading dots (since there is a dot before the number)
          .replace(/,/g, '') // Remove commas
          .replace(/[^0-9]/g, ''); // Keep only numbers 
      
          cy.log(`Cleaned text: "${cleanedText}"`); // Debugging output
      
          // Step 2: Convert the cleaned text to a number
          const number = parseFloat(cleanedText);
      
          cy.log(`Converted number: ${number}`); // Debugging output
      
          // Step 3: Assert the number is below 200,000
          expect(number).to.be.lessThan(200000);
        });


        // lets use another approach by using split
        cy.get('tr td:nth-child(5) strong').invoke('text').then((text) => {
            cy.log(`Raw text: "${text}"`); // Debugging output
            const amount = Number(text.trim().split(" ")[1]); // Split by space and get the first index then convert it to a number
            expect(amount).to.be.lessThan(200000)
        
          });
        

        //   This time let us now checkout by clicking the checkout button
        cy.contains('button', 'Checkout').click();

        // then on the next page you will get the adress for delivery and click agree to terms and click purchase
        cy.get('input#country').type('India');
        cy.get('.suggestions ul li a', { timeout: 5000 }).should('be.visible').click();
        cy.get('.btn.btn-success.btn-lg').click();
        cy.get('div.alert-success').should('contain','Success');
        
    })
})