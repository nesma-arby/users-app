describe('empty spec', () => {
  it('visit home page', () => {
    cy.visit('http://localhost:3001')
  })
  it('check the navbar navbar',()=>{
    cy.get('[data-cy=nav-bar]')
  })
})