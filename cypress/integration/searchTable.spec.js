/// <reference types="Cypress" />
import NewsletterPage from '../support/pageObjects/newsletterPage'
describe('Verify the search functionality', () => {

    const newsletterPage = new NewsletterPage();
    const nameSearch = ['february','February','eekly', '2022', 'randomString22'];
    const creatorSearch = ['Hugo','James','db', 'DB'];
    const statusSearch = ['Draft', 'draft', 'DRAFT'];
    const recipientSearch = ['All org', 'engineering', 'Engineering', '491'];
    const dateSearch = ['11 Months', '11 months ago', '1 year ago'];

    // Search the table based on the name column
    it('Search for names', () => {
        // Verify search works and is case insensitive
        cy.searchColumn(nameSearch[0]);
        newsletterPage.getLoadMoreButton()
            .should('not.exist');
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length.above', 2)
                .should('contain.text',nameSearch[0])
                .should('contain.text',nameSearch[1]);  
        });
        // Verify the search works with partial text not from begining of the string
        cy.searchColumn(nameSearch[2]);
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length.above', 2);
            cy.verifyEachRow(nameSearch[2]);    
        });
        // Verify the search works with numbers in the string
        cy.searchColumn(nameSearch[3]);
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length.above', 2);
            cy.verifyEachRow(nameSearch[3]);    
        });
        // Verify the searching for non existant string returns an empty table
        cy.searchColumn(nameSearch[4]);
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length', 0);   
        });
    });

    // Search the table based on the creator column
    it('Search for creator', () => {
        cy.searchColumn(creatorSearch[0]);
        newsletterPage.getLoadMoreButton()
            .should('not.exist');
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length.above', 2);
            cy.verifyEachRow(creatorSearch[0]);
        });
        // Verify the search works with case insensitive string
        cy.searchColumn(creatorSearch[2]);
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length.above', 2)
                .should('contain.text',creatorSearch[2])
                .should('contain.text',creatorSearch[3]);
        });
    });

    // Search the table based on the status column
    it('Search for status', () => {
        // Search with all lowercase status string
        cy.searchColumn(statusSearch[1]);
        newsletterPage.getLoadMoreButton()
            .should('not.exist');
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length.above', 1);
            cy.verifyEachRow(statusSearch[0]);
        });
        // Search with all uppercase status string
        cy.searchColumn(statusSearch[2]);
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length.above', 1);
            cy.verifyEachRow(statusSearch[0]);
        });
    });

    // Search the table based on the recipient column
    it('Search for recipient', () => {
        cy.searchColumn(recipientSearch[0]);
        newsletterPage.getLoadMoreButton()
            .should('not.exist');
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length.above', 1);
            cy.verifyEachRow(recipientSearch[0]);
        });
        // Verify the search works with case insensitive string
        cy.searchColumn(recipientSearch[1]);
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length.above', 2);
            cy.verifyEachRow(recipientSearch[2]);
        });
        // Verify the search works with numbers in the string
        cy.searchColumn(recipientSearch[3]);
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length.above', 2);
            cy.verifyEachRow(recipientSearch[3]);
        });
    });

    // Search the table based on the date modified column
    it('Search for date modified', () => {
        cy.searchColumn(dateSearch[0]);
        newsletterPage.getLoadMoreButton()
            .should('not.exist');
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length.at.least', 1);
            cy.verifyEachRow(dateSearch[1]);
        });    
        cy.searchColumn(dateSearch[2]);
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length.above', 2);
            cy.verifyEachRow(dateSearch[2]);
        });
    });
});