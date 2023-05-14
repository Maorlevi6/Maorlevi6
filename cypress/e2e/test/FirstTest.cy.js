/// <reference types="cypress" />



describe("test1", () => {
    let text2
    let url = "https://www.shorturl.at/"
    beforeEach(() => {
        cy.visit(url)
    })
    it('valid case and H1 on the page', () => {

        cy.get('[type="text"]').should('be.visible').type('https://nodejs.org/en/download')
        cy.get('#formbutton > input').click()
        cy.get('h1').should('contain.text', 'Your shortened URL')
    })

    it('unvalid case and move to correct page', () => {
        cy.get('[type="text"]').should('be.visible').type('132456@@@!א')
        cy.wait(1500)
        cy.get('#formbutton > input').click()
        cy.get('ul').find('li').contains('Check if the domain is correct')
    })
    it('back to the first page', () => {
        cy.get('[type="text"]').should('be.visible').type('https://nodejs.org/en/download')
        cy.get('#formbutton > input').click()
        cy.wait(1500)
        cy.get('.boxtextleft > [href="https://www.shorturl.at/"]').click()
        cy.wait(5000)
    
    })

    it('write unvalid and after write valid url', () => {

        cy.get('[type="text"]').should('be.visible').type('132456@@@!א')
        cy.wait(1500)
        cy.get('#formbutton > input').click()
        cy.get('ul').find('li').contains('Check if the domain is correct')
        cy.get('.colorbutton').click()
        cy.get('[type="text"]').should('be.visible').type('https://unleash.org/')
        cy.get('#formbutton > input').click()
    })
    it('write unvalid url save the data from the second page', () => {

        cy.get('[type="text"]').should('be.visible').type('132456@@@!א')
        cy.wait(1500)
        cy.get('#formbutton > input').click()
        cy.get('ul').find('li').first().invoke('text').then((text) => {
            text2 = text
            cy.log(text2)
        }).then(() => {
            expect(text2).to.contains('Check if the domain is correct')
        })
    })
    it('scroll tp the last element on the page and go to pay page ', () => {
        cy.visit(url)
        cy.get('a').last().scrollIntoView()
        cy.get('.colorbutton').click()
    
    })

})

