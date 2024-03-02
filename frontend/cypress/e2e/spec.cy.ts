import {environment} from "../../src/environments/environments";

describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('app is running!')
  })
})

describe('Admin Login Test'), () => {
    it('should login as admin and sees the navigation of an administrator', () => {
        cy.visit('/')
        cy.get('#username').type(environment.testAdmin.username)
        cy.get('#password').type(environment.testAdmin.password)

        cy.get('form').submit()
        cy.url().should('include', '/dashboard')
        cy.get('nav')
            .find('div')
            .should('have.length', 5)
    })
}
