import LoginPage from '../../support/pages/LoginPage'
import InventoryPage from '../../support/pages/InventoryPage'
import CartPage from '../../support/pages/CartPage'

describe('Carrito — SauceDemo', () => {

  beforeEach(() => {
  cy.loginSauceDemo()   
})

  it('carrito — debe agregar un producto y mostrar badge', () => {
    InventoryPage.agregarAlCarrito('Sauce Labs Backpack')

    InventoryPage.badgeCarrito
      .should('be.visible')
      .and('have.text', '1')
  })

  it('carrito — debe mostrar el producto agregado', () => {
    InventoryPage.agregarAlCarrito('Sauce Labs Backpack')
    InventoryPage.irAlCarrito()

    CartPage.itemsCarrito.should('have.length', 1)
    cy.contains('Sauce Labs Backpack').should('be.visible')
  })

  it('carrito — debe agregar múltiples productos', () => {
    InventoryPage.agregarAlCarrito('Sauce Labs Backpack')
    InventoryPage.agregarAlCarrito('Sauce Labs Bike Light')

    InventoryPage.badgeCarrito.should('have.text', '2')
    InventoryPage.irAlCarrito()

    CartPage.itemsCarrito.should('have.length', 2)
  })

  it('carrito — debe estar vacío al inicio', () => {
    InventoryPage.badgeCarrito.should('not.exist')
  })

})