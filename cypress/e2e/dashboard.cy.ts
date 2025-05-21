describe('Dashboard Page', () => {
  beforeEach(() => {
    // Login before each test
    cy.visit('/login')
    cy.get('[data-testid="email-input"]').type('george.bluth@reqres.in')
    cy.get('[data-testid="password-input"]').type('123456')
    cy.get('button[type="submit"]').click()
    
    // Verify we're on the dashboard
    cy.url().should('include', '/dashboard')
  })

  it('should display user email in navigation', () => {
    cy.contains('george.bluth@reqres.in').should('be.visible')
  })

  it('should logout and redirect to login page', () => {
    // Click logout button
    cy.get('[data-testid="logout-button"]').click()

    // Verify redirect to login page
    cy.url().should('include', '/login')

    // Verify we can't access dashboard after logout
    cy.visit('/dashboard')
    cy.url().should('include', '/login')
  })
}) 