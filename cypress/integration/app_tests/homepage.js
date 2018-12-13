context('Homepage', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })
  
  describe("Homepage loads correctly", () =>{
  	it("Should load the title", () => {
  		cy.get("h1").should(($h1) => {
  			cy.expect($h1).to.contain("Not Just Another Chitter Challenge")
  		})
  	})
  })
})