describe('Task Form', () => {
  beforeEach(() => {
    // Use cy.session to maintain login state
    cy.session('task-form-login', () => {
      cy.visit('/login')
      
      // Check if we're already on dashboard (already logged in)
      cy.url().then((url) => {
        if (url.includes('/dashboard')) {
          return
        }
        
        // If not logged in, perform login
        cy.get('[data-testid="email-input"]').type('george.bluth@reqres.in')
        cy.get('[data-testid="password-input"]').type('123456')
        cy.get('button[type="submit"]').click()
        
        // Verify we're on the dashboard
        cy.url().should('include', '/dashboard')
      })
    }, {
      validate() {
        // Check if we're on the dashboard page
        cy.url().should('include', '/dashboard')
      },
      cacheAcrossSpecs: true
    })

    // Visit dashboard before each test
    cy.visit('/dashboard')
  })

  it('should validate form inputs and enable/disable submit button', () => {
    // Click Add Task button
    cy.contains('Add Task').click()
    
    // Submit button should be disabled initially
    cy.get('[data-testid="task-submit-button"]').should('be.disabled')
    
    // Enter invalid title (too short)
    cy.get('[data-testid="task-title-input"]').type('ab')
    cy.get('[data-testid="task-submit-button"]').should('be.disabled')
    
    // Enter valid title
    cy.get('[data-testid="task-title-input"]').clear().type('Valid Title')
    
    // Enter invalid description (too short)
    cy.get('[data-testid="task-description-input"]').type('short')
    cy.get('[data-testid="task-submit-button"]').should('be.disabled')
    
    // Enter valid description
    cy.get('[data-testid="task-description-input"]').clear().type('This is a valid description with more than 10 characters')
    
    // Select status
    cy.get('[data-testid="task-status-select"]').select('pending')
    
    // Submit button should be enabled
    cy.get('[data-testid="task-submit-button"]').should('not.be.disabled')
  })
}) 