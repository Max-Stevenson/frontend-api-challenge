const deferred = require('./deferred')

context('Homepage', () => {
  beforeEach(function () {
    // We use a deferred object to make it easy to test
    // different scenarios
    this.fetchPeepsDeferred = deferred()

    cy.visit('http://127.0.0.1:8080/', {
      onBeforeLoad (win) {
        cy.stub(win, 'fetch')
        .withArgs('https://chitter-backend-api.herokuapp.com/peeps')
        .as('fetchPeeps')
        .returns(this.fetchPeepsDeferred.promise)
      },
    })
  })

  describe("Peep view", () => {
  	beforeEach(function () {
      this.fetchPeepsDeferred.resolve({
        json () { return [{
    		"id": 224,
    		"body": "I hate you KVN",
    		"created_at": "2018-12-11T16:32:05.275Z",
    		"updated_at": "2018-12-11T16:32:05.275Z",
    		"user": {
      		"id": 540,
      		"handle": "E35-12"
    		},
    		"likes": []
  		}]},
        ok: true,
      })
    })

  	it("clicking a button should display peeps", () => {
  		cy.contains('View Peeps').click()
  		cy.get("#returned-peeps").as('returnedPeeps')
  		.should('have.length', 1);

  		cy.get("@returnedPeeps").find("spanB")
      .should('have.text', 'I hate you KVN')
  	})
  })
})