// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import NewsletterPage from '../support/pageObjects/newsletterPage';

const newsletterPage = new NewsletterPage();

// Search for a provided string
Cypress.Commands.add('searchColumn', (keyword) => { 
    newsletterPage.getSearchBar()
        .should('be.visible')
        .clear()
        .click()
        .type(keyword);
});

// Confirm if the provided string is in every row
Cypress.Commands.add('verifyEachRow', (searchString) => {
    newsletterPage.getTableRows().each((row, index, $list) => {
        expect(row).to.contain(searchString);
    });
});