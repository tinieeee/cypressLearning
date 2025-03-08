import ConfirmationCheckoutPage from './ConfirmationCheckoutPage';

class CartPage{
 
    maximumTotalAmount(){
        return cy.get('tr td:nth-child(5) strong').invoke('text').then((text) => {
            cy.log(`Raw text: "${text}"`); // Debugging output
            const amount = Number(text.trim().split(" ")[1]); // Split by space and get the first index then convert it to a number
            // expect(amount).to.be.lessThan(200000)
            return cy.wrap(amount)
        
          });
        
          
    }

    sumofProducts()
    {
        // as you can see here this test case is to compute sum of products
        // class file is being used by everyone and is in a generic way so if you do it like this every test will consume this assertion
        // most likely other test doesnt need this
        // assertion should no be part of your page object file same with validations  => expect(sum).to.be.lessThan(200000) assertion should be part of your test
        // so we need to remove this part expect(sum).to.be.lessThan(200000) and ireturn lang si sum
     let sum = 0; 
     return cy.get('tr td:nth-child(4) strong').each(($el)=>{ 
     const amount = Number($el.text().split(" ")[1].trim());
         sum = sum + amount; 
     }).then(()=> { 
        return cy.wrap(sum);
        // tsaka natin sya gagamitin dun mismo sa spec file tsaka natin sya dadagdagan nung assertion
        })
    }


    clickCheckout(){
     //   This time let us now checkout by clicking the checkout button
     cy.contains('button', 'Checkout').click();
     return new ConfirmationCheckoutPage(); // added the confirmationcheckoutpage class kasi expected na once ma click ung checkout button mag reredirect sya sa checkout page
    }





}
export default CartPage; // we need to add this to export this classname so we can access anywhere outside of this class