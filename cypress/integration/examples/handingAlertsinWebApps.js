/// <reference types = "cypress"/>

describe('Testing Alerts and Confirm popin Web Apps', function(){
 
    // If you have mutltiple it blocks and everything is to be tested in the same url you can use beforeEach()
    // to ensure cy.visit() runs once before each test case (it block), so you don’t have to declare it repeatedly.
    // ✅ Use beforeEach() if you want a fresh visit for each test.
    // ✅ Use before() if you want to visit once and reuse the session.
    beforeEach(()=>
        {
            cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        })

    it('Verify Alerts are displaying', function(){
        cy.get('#alertbtn').click();
        cy.get('input[value = "Confirm"]').click();

        // What if you want to get the text out of it?
        // Cypress has capability to listen to browser events.
        // So basically if ALERT Popup is open there is an event window:alert that triggers on your browsers when any alert is open
        // If you trigger this event from Cypress that pop up will be captured and you can get the text present in that alert
        // cy.on is a method which will help you trigger any event and window:alert is the event
        // on method takes 2 arguments one is firing event which is the window:alert and the other one is output what you get from firing this event
        cy.on('window:alert', (str)=> 
        {
            // in mocaha comparing 2 strings are like this
            // This is your assertion to verify that correct text is displaying inside the pop up modal
            expect(str).to.be.equal('Hello , share this practice page and share your knowledge');
        }) 

        // Similiar way for confirm but confirm is a different event so just use the window:confirm 
        cy.on('window:confirm', (str)=>
        {
            expect(str).to.be.equal('Hello , Are you sure you want to confirm?');
        })

    })

    it('Declining the confirm pop up', function(){
        cy.get('input[value = "Confirm"]').click();

        // This will click the cancel button instead of Confirm
        cy.on('window:confirm', ()=> false)


    })

    it('Declining the confirm pop up with assertion that cancel is clicked', function(){
        cy.get('input[value = "Confirm"]').click();

        // How do you verify that the cancel button is clicked since it is not showing in Cypress runner?
        // You can use cy.stub() to spy on window.confirm and verify it was called.
        // As you can observe here the cy.stub is written first before triggering the confirm pop up to-
        // ensures that Cypress waits for the window object before executing the stub.
        // It prepares Cypress Before the Event Happen
        cy.window().then((win) => {
            cy.stub(win, 'confirm').returns(false).as('confirmStub'); // Clicks "Cancel"
          });

          cy.get('input[value = "Confirm"]').click(); // Triggers the confirm popup

        cy.get('@confirmStub').should('have.been.calledOnce'); // Verifies the confirm popup appeared
    })







})