context('Homepage', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })

  describe("Homepage loads correctly", () => {
  	it("Should load the title", () => {
  		cy.get("h1").should(($h1) => {
  			cy.expect($h1).to.contain("Not Just Another Chitter Challenge")
  		})
  	})
  	it("Should have an area to display peeps", () => {
  		cy.get("#peeps-view").should(($pv) => {
  			cy.expect($pv).to.contain("I am a test peep")
  		})
  	})
  })
})