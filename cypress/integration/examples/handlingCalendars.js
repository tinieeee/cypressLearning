/// <reference types ="cypress"/>

describe('Testing Calendars', function(){
    before(()=>{
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers')
    })
    it('Verify Calendars', function(){
        const monthNumber = "6";
        const date = "13";
        const year = "2027";
        const expectedList = [monthNumber, date, year]
            // Handling calendars are a bit tricky first thing you need to is select the calendar
            cy.get('.react-date-picker__inputGroup').click();
            // Then select year - as for the class name you can just select the partial class no need to select the entire class name
            cy.get('.react-calendar__navigation__label__labelText').click()
            // but you still need to click it again to display all the years(repeat same steps)
            cy.get('.react-calendar__navigation__label__labelText').click()
            cy.contains("button", year).click();


            // Then Select month
            // As you can see in the variable we are using a number but in the date picker it is the actual month
            // So how do you map a month number to its actual month
            // so get the class name if you get the class name there will be 12 items highlighted since we have 12 months and all those have the same class name
            // then select the index by using eq() we used month number - 1 because if we get the index it always starts from 0
            // Another problem here is monthNumber is string since it is inside double quotes, how to convert that to number? 
            // We can convert it by simply wrapping it to Number(monthNumber)-1
            cy.get('.react-calendar__year-view__months__month').eq(Number(monthNumber) - 1).click()


            // Then Select day
            // for day you can in the element it contains abbr so we can just use the contains
            // <abbr aria-label="May 31, 2027">31</abbr></button>
            cy.contains("abbr", date).click();


            // Assert that the selected dates are correct
            // This is a bit tricky because usually we just pull the text of it and print it but unfortunately text will not work here why?
            // because if you check the element where date is displaying it is broken into sub tags and not as one, so the 3 values has different tags
            // pull them to a list and extract each text of that tag
            cy.get('input.react-date-picker__inputGroup__input').each(($el,index)=>{
                // el - element, index nung element na iniisitore 
                // nag create din tayo ng expectedList sa taas const expectedList = [monthNumber, date, year]
                // need natin iwrap kasi we are using non cypress objects
                // bago natin ma compose ung code for assertion sa baba ito muna ginamit natin to verify na ung each list is nag rereturn ng tamang values each index
                // cy.wrap($el).invoke('val').then(function(text){
                // console.log(text) - pagka run nito kay cypress runner nilolog nya yung each values click mo lang ung log then inspect element > console
                // })
                cy.wrap($el).invoke('val').should('eq', expectedList[index]);
                // invoke('val') means iniinvoke natin ung laman nung value attribute
                // after natin makuha ung value each element per index next is .should() to compare ung nakuha natin values sa expectedlist per index

            })
    })
})