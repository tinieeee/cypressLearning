// Create a class for login page of this site https://rahulshettyacademy.com/loginpagePractise/#

import ProductPage from "./ProductPage";  // Ensure ProductPage is imported we used it in line 24

class LoginPage
{

    goTo(url)
    {
        //visit the url
        cy.visit(url)

    }
    //created a method called login

    login(username,password) //lets add username and password parameter here so we can use the fixtures in the actual test spec file
    {
        //take note we cannot use fixtures dito sa login class valid only sa actual test file
        cy.get('input#username').type(username);
        cy.get('input#password').type(password);
        cy.get('input#terms').check();
        cy.get('input#signInBtn').click();

        return new ProductPage() // bakit inadd to dito? kasi alam natin na once na click mo yung sign in mag reredirect sya sa products page
        //so instead na mag ccreate tayo ng new object sa test spec file dito na lang natin sya iadd
    }
}

export default LoginPage; // we need to add this to export this classname so we can access anywhere outside of this class