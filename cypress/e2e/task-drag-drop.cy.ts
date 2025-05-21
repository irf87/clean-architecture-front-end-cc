describe('Task Drag and Drop', () => {
  beforeEach(() => {
    // Use cy.session to maintain login state
    cy.session('task-drag-drop-login', () => {
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

  it('should allow dragging tasks between columns', () => {
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

    // Verify initial state
    cy.get('[data-testid="task-column-pending"]').should('contain', 'Pending Task')
    cy.get('[data-testid="task-column-in_progress"]').should('contain', 'In Progress Task')
    cy.get('[data-testid="task-column-done"]').should('contain', 'Done Task')

    // Drag Done task to Pending
    cy.contains('Done Task')
      .parent()
      .parent()
      .parent()
      .parent()
      .trigger('dragstart')
    
    cy.get('[data-testid="task-column-pending"]')
      .trigger('dragover')
      .trigger('drop')

    // Verify Done task moved to Pending
    cy.get('[data-testid="task-column-pending"]').should('contain', 'Done Task')
    cy.get('[data-testid="task-column-done"]').should('not.contain', 'Done Task')

    // Drag In Progress task to Done
    cy.contains('In Progress Task')
      .parent()
      .parent()
      .parent()
      .parent()
      .trigger('dragstart')
    
    cy.get('[data-testid="task-column-done"]')
      .trigger('dragover')
      .trigger('drop')

    // Verify In Progress task moved to Done
    cy.get('[data-testid="task-column-done"]').should('contain', 'In Progress Task')
    cy.get('[data-testid="task-column-in_progress"]').should('not.contain', 'In Progress Task')

    // Verify final state
    cy.get('[data-testid="task-column-pending"]').should('contain', 'Pending Task').and('contain', 'Done Task')
    cy.get('[data-testid="task-column-in_progress"]').should('not.contain', 'In Progress Task')
    cy.get('[data-testid="task-column-done"]').should('contain', 'In Progress Task')
  })
}) 