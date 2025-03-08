import CartPage from "./CartPage";

class ProductPage{

    getCurrentUrl(){
        return cy.url()
        // return the url of the current page
    }
    pageValidation(){
        
        // cy.get('h1.my-4').should('contain.text', 'Shop Name');
        return cy.get('h1.my-4');
    }

    getCardCount(){
        cy.get('app-card.col-lg-3').as('productsList');
        // as mentioned in the confirmationcheckoutpage.js file we should not validate here in the page object so we removed .should('have.length', 4);
        return cy.get('@productsList');
    }

    selectFirstProduct(){
        // Then lets add another one product the first product from the list
       cy.get('@productsList').eq(0).find('button.btn.btn-info').click();
    }


    selectProduct(productName){
        cy.get('@productsList').filter(`:contains("${productName}")`) // product name is already declared so lets use it by using ${} and to use `` instead of ''
        .then(($element) =>
        {
            cy.wrap($element).find('button.btn.btn-info').click();
        })
    }

    goToCart(){
        // Then lets click checkout
        cy.contains('a', 'Checkout').click();
        return new CartPage() // kasi alam natin na after ma click si checkout button mag reredirect sya sa cart page
    }


}

export default ProductPage; // we need to add this to export this classname so we can access anywhere outside of this class