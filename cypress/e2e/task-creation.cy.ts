describe('Task Creation', () => {
  beforeEach(() => {
    // Use cy.session to maintain login state
    cy.session('task-creation-login', () => {
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

  it('should create tasks with different statuses and verify their placement', () => {
    const createTask = (title: string, description: string, status: string, isFavorite: boolean = false) => {
      cy.contains('Add Task').click()
      cy.get('[data-testid="task-title-input"]').type(title)
      cy.get('[data-testid="task-description-input"]').type(description)
      cy.get('[data-testid="task-status-select"]').select(status)
      if (isFavorite) {
        cy.get('[data-testid="task-favorite-checkbox"]').check()
      }
      cy.get('[data-testid="task-submit-button"]').click()
    }

    // Create tasks for each status
    createTask('Pending Task', 'This is a pending task description', 'pending')
    createTask('In Progress Task', 'This is an in progress task description', 'in_progress', true)
    createTask('Done Task', 'This is a done task description', 'done')

    // Verify tasks are in correct columns
    cy.contains('Pending Task').parent().parent().parent().should('contain', 'pending')
    cy.contains('In Progress Task').parent().parent().parent().should('contain', 'in progress')
    cy.contains('Done Task').parent().parent().parent().should('contain', 'done')

    // Verify favorite status
    cy.contains('In Progress Task')
      .parent()
      .find('[data-testid^="task-favorite-"]')
      .should('contain', '★')
    
    cy.contains('Pending Task')
      .parent()
      .find('[data-testid^="task-favorite-"]')
      .should('contain', '☆')
  })
}) 