describe('cy.intercept — patrones de uso', () => {

  beforeEach(() => {
    cy.loginSauceDemo()
  })

  it('patrón 1 — verificar que la página carga sin requests fallidos', () => {
    // Interceptar cualquier request al inventario
    cy.intercept('GET', '**/inventory*').as('paginaInventario')

    cy.visit('/')
    cy.loginSauceDemo()

    // Verificar que la página cargó correctamente
    cy.get('.inventory_list').should('be.visible')
    cy.get('.inventory_item').should('have.length.greaterThan', 0)
  })

  it('patrón 2 — simular que un producto no tiene imagen', () => {
    // Interceptar imágenes y devolver error
    cy.intercept('GET', '**/*.jpg', {
      statusCode: 404,
      body: ''
    }).as('imagenRota')

    cy.visit('/')
    cy.loginSauceDemo()

    // Los productos siguen visibles aunque las imágenes fallen
    cy.get('.inventory_list').should('be.visible')
    cy.get('.inventory_item').should('have.length.greaterThan', 0)
  })

  it('patrón 3 — verificar que el carrito persiste después de navegar', () => {
  // Agregar producto
    cy.get('.inventory_item').first()
      .find('button').click()

    // Verificar badge
    cy.get('.shopping_cart_badge').should('have.text', '1')

    // Navegar al detalle de un producto y volver
    cy.get('.inventory_item').first()
      .find('.inventory_item_name').click()

    // Verificar que estamos en el detalle
    cy.url().should('include', '/inventory-item')

    // Volver al inventario
    cy.go('back')

    // El badge debe persistir
    cy.get('.shopping_cart_badge').should('have.text', '1')
  })
})