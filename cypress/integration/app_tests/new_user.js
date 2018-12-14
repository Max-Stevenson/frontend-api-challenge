const deferred = require('./deferred')
const testUser = {"user": {"handle":"Testing1", "password":"mypassword"}}

context('New User', () => {
	describe('Creating a new user', () => {
		it('A user should be able to sign up', () => {
			cy.visit('http://127.0.0.1:8080/')
			cy.get('#new-user').within(($newuser) => {
				cy.get('input[name="new-handle"]').type('Testing1')
				cy.get('input[name="new-password"]').type('mypassword')
			})
			cy.contains('Submit').click()
		})
	})
})