import LoginPage from '../../support/pages/LoginPage'
import InventoryPage from '../../support/pages/InventoryPage'
import CartPage from '../../support/pages/CartPage'

describe('Carrito — SauceDemo', () => {

  beforeEach(() => {
  cy.loginSauceDemo()   
})

  it('carrito — debe agregar un producto y mostrar badge', () => {

    cy.fixture('productos').then((products) => {
      InventoryPage.agregarAlCarrito(products.mochila)

      InventoryPage.badgeCarrito
      .should('be.visible')
      .and('have.text', '1')
    })    
  })

  it('carrito — debe mostrar el producto agregado', () => {
    cy.fixture('productos').then((products) => {
      InventoryPage.agregarAlCarrito(products.mochila)

      InventoryPage.irAlCarrito()

      CartPage.itemsCarrito.should('have.length', 1)
      cy.contains(products.mochila).should('be.visible')
    })
  })

  it('carrito — debe agregar múltiples productos', () => {
    cy.fixture('productos').then((products) => {
      InventoryPage.agregarAlCarrito(products.mochila)
      InventoryPage.agregarAlCarrito(products.luz_bicicleta)

      InventoryPage.badgeCarrito.should('have.text', '2')
      InventoryPage.irAlCarrito()

      CartPage.itemsCarrito.should('have.length', 2)
    })
  })

  it('carrito — debe estar vacío al inicio', () => {
    InventoryPage.badgeCarrito.should('not.exist')
  })

})