/// <reference types = "cypress"/>

describe('Test Web Tables', function(){
    beforeEach(()=>
    {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    })
    it('Get the price for the Python course', function(){
        // Identify the price for Pythong Languages
        // You need to scan the entire course column to find the Python why we need to scan? position might change 
        // How to get the CSS selector for table and you only want to get the 2nd column the? tr td:nth-child(2)
        // tr is the parend td is the child nth-child(2) is selecting the second index
        
        cy.get('tr td:nth-child(2)').each(($el, index, $list)=>
        {
            const courseText =  $el.text()
            if(courseText.includes("Python"))
            {
                // Since we already checked that the 2nd column is Python now what we want to get is the next column to display the price
                // so this is going to be another td - so these tds are called siblings
                // So to immediately find the next sibling there is a method called next()
                // next() immediately get the following sibling of each DOM element within a set of DOM elements.
                // next() will only be applied next to get()
                cy.get('tr td:nth-child(2)').eq(index).next().then(function(price){
                   const priceText = price.text()
                   expect(priceText).to.equal('25') 
                })

                // in the .eq(index) this is getting the index in the iteration kung saan nag display yung python para makuha nya yung ung price sa sibiling element
                // so this instance 7th index so pagkahanap nya sa 7th index gagana si next to check anong value nung sibling ng nasa index 7 which is 25

            }
        })
    })

    it('Get the price for the API course', function(){
        cy.get('tr td:nth-child(2)').each(($e2, index, $list)=>
            {
                const courseText =  $e2.text()
                if(courseText.includes("API"))
                {
                    cy.get('tr td:nth-child(2)').eq(index).next().then(function(price){
                       const coursePrice = price.text()
                       expect(coursePrice).to.equal('35') 
                    })
    
                }
            })       

    })
})