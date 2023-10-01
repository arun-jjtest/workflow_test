/// <reference types="Cypress" />
import NewsletterPage from '../support/pageObjects/newsletterPage'
describe('Verify the page elements', () => {

    const newsletterPage = new NewsletterPage();
    // Default number of rows expected on page load
    const rowNumber = 10;

    // Verify the page titles and headers
    it('Check the page headers', () => {
        newsletterPage.getPageIcon()
            .should('be.visible')
            .should('have.attr', 'src')
            .and('contain', '.svg');
        newsletterPage.getPageTitle()
            .should('be.visible')
            .should('contain.text', 'Newsletters');
    });

    // Verify the search bar
    it('Check the search bar', () => {
        newsletterPage.getSearchBar()
            .should('be.visible')
            .should('have.attr', 'placeholder', 'Search…');
    });

    // Verify if all the table headers are present
    it('Check the table headers', () => {
        newsletterPage.getTableHeaders()
            .should('be.visible')
            .should('contain.text', 'Name')
            .should('contain.text', 'Creator')
            .should('contain.text', 'Status')
            .should('contain.text', 'Date modified')
            .should('contain.text', 'Recipients')
            .should('contain.text', 'Remove');
    });

    // Verify that the table shows 10 entries by default 
    it('Check the table rows', () => { 
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length',rowNumber);
        });
        newsletterPage.getLoadMoreButton()
            .should('be.visible')
            .should('contain.text', 'Show more')
    });

});
