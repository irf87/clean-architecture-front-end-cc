describe('Task Modal', () => {
  beforeEach(() => {
    // Use cy.session to maintain login state
    cy.session('task-modal-login', () => {
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

  it('should close modal when clicking outside', () => {
    // Click Add Task button
    cy.contains('Add Task').click()
    
    // Verify modal is open
    cy.get('[role="dialog"]').should('be.visible')
    
    // Click outside modal (on the overlay)
    cy.get('[role="dialog"]').parent().click({ force: true })
    
    // Verify modal is closed
    cy.get('[role="dialog"]').should('not.exist')
  })

  it('should close modal when clicking cancel or close button', () => {
    // Click Add Task button
    cy.contains('Add Task').click()
    
    // Verify modal is open
    cy.get('[role="dialog"]').should('be.visible')
    
    // Click cancel button
    cy.get('[data-testid="task-cancel-button"]').click()
    
    // Verify modal is closed
    cy.get('[role="dialog"]').should('not.exist')
    
    // Open modal again
    cy.contains('Add Task').click()
    
    // Click close button (×)
    cy.get('button[aria-label="Close modal"]').click()
    
    // Verify modal is closed
    cy.get('[role="dialog"]').should('not.exist')
  })
}) 