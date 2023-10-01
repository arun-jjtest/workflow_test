/// <reference types="Cypress" />
import NewsletterPage from '../support/pageObjects/newsletterPage'
describe('Load more contents functionality', () => {

    const newsletterPage = new NewsletterPage();
    // Default number of rows expected on page load
    const rowNumber = 10;

    // Default state on load
    it('Check the default table state', () => {    
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length',rowNumber);
        });
        newsletterPage.getLoadMoreButton()
            .should('be.visible')
            .should('contain.text', 'Show more');
    });

    // Verify that more content is loaded and
    // Show More button disappears
    it('Verify the Show More button functionality', () => {
        newsletterPage.getLoadMoreButton()
            .should('be.visible')
            .click();
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length.greaterThan',rowNumber);
        });
        newsletterPage.getLoadMoreButton()
            .should('not.exist')
    });
});