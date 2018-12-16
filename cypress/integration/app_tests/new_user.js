const deferred = require('./deferred')
const testUser = {"user": {"handle":"Testing1", "password":"mypassword"}}
const serverResponse = {"user_id": 678, "session_key": "_2a_10_AsseGfGVHM4RVQJmqd2syO"}

context('New User', () => {
	beforeEach(function () {
    // We use a deferred object to make it easy to test
    // different scenarios
    this.fetchNewUserDeferred = deferred()

    cy.visit('http://127.0.0.1:8080/', {
      onBeforeLoad (win) {
        cy.stub(win, 'fetch')
        .withArgs('https://chitter-backend-api.herokuapp.com/users')
        .as('fetchNewUsers')
        .returns(this.fetchNewUserDeferred.promise)
      },
    })
  })

	describe('Creating a new user', () => {
		beforeEach(function () {
      this.fetchNewUserDeferred.resolve({
        json () { return serverResponse },
        ok: true,
      })
    })

		it('A user should be able to sign up', () => {
			cy.visit('http://127.0.0.1:8080/')
			cy.get('#new-user').within(($newuser) => {
				cy.get('input[id="new-handle"]').type('Testing1')
				cy.get('input[id="new-password"]').type('mypassword')
			})
			cy.contains('Submit').click()
		})
	})
})