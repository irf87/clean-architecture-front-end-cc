describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should show email validation errors', () => {
    // Test invalid email format
    cy.get('[data-testid="email-input"]').type('invalid-email')
    cy.get('[data-testid="email-input"]').blur() // Trigger validation by removing focus
    
    // Check for invalid email error message
    cy.get('[data-testid="email-input"]')
      .parent()
      .find('span') // HelperText is rendered as a span
      .should('be.visible')
      .and('have.text', 'Invalid email')
      .and('have.css', 'color', 'rgb(235, 90, 70)') // Updated to match theme.colors.status.error.DEFAULT

    // Test required field validation
    cy.get('[data-testid="email-input"]').clear()
    cy.get('[data-testid="email-input"]').blur()
    
    // Check for required field error message
    cy.get('[data-testid="email-input"]')
      .parent()
      .find('span')
      .should('be.visible')
      .and('have.text', 'Email is required')
      .and('have.css', 'color', 'rgb(235, 90, 70)') // Updated to match theme.colors.status.error.DEFAULT
  })

  it('should disable login button when email or password is empty', () => {
    // Both fields empty
    cy.get('button[type="submit"]').should('be.disabled')

    // Only email filled
    cy.get('[data-testid="email-input"]').type('test@example.com')
    cy.get('button[type="submit"]').should('be.disabled')

    // Only password filled
    cy.get('[data-testid="email-input"]').clear()
    cy.get('[data-testid="password-input"]').type('password123')
    cy.get('button[type="submit"]').should('be.disabled')

    // Both fields filled
    cy.get('[data-testid="email-input"]').type('test@example.com')
    cy.get('button[type="submit"]').should('not.be.disabled')
  })

  it('should show error message with invalid credentials', () => {
    cy.get('[data-testid="email-input"]').type('generic@mail.com')
    cy.get('[data-testid="password-input"]').type('generic password')
    cy.get('button[type="submit"]').click()

    // Assuming there's an error message element
    cy.get('[data-testid="error-message"]').should('be.visible')
  })

  it('should show loader and redirect to dashboard on successful login', () => {
    // Using the correct credentials from the README
    cy.get('[data-testid="email-input"]').type('george.bluth@reqres.in')
    cy.get('[data-testid="password-input"]').type('123456')
    
    // Click login button
    cy.get('button[type="submit"]').click()

    // Check for loader
    cy.get('button[type="submit"]').should('be.disabled')
    cy.get('[data-testid="loader"]').should('be.visible')

    // Check redirect to dashboard
    cy.url().should('include', '/dashboard')
  })
}) 