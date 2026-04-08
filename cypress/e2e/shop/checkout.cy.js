import InventoryPage from '../../support/pages/InventoryPage'
import CartPage from '../../support/pages/CartPage'
import CheckoutPage from '../../support/pages/CheckoutPage'

describe('Checkout — SauceDemo', () => {

  beforeEach(() => {
    cy.loginSauceDemo()
  })

  it('checkout — debe completar la compra exitosamente', () => {

    cy.fixture('productos').then((products) => {
      cy.fixture('checkout').then((checkoutData) => {
        // Use the fixture data for checkout
        InventoryPage.agregarAlCarrito(products.mochila)
        InventoryPage.irAlCarrito()
        CartPage.irACheckout()

        CheckoutPage.llenarDatos(checkoutData.valido.nombre, checkoutData.valido.apellido, checkoutData.valido.postal)
        
        CheckoutPage.resumenTotal.should('be.visible')
        cy.contains(products.mochila).should('be.visible')
        CheckoutPage.terminarCompra()

        CheckoutPage.mensajeExito
          .should('be.visible')
          .and('contain', 'Thank you for your order')
      })
    })

    /*
    // Agregar producto
    InventoryPage.agregarAlCarrito('Sauce Labs Backpack')
    InventoryPage.irAlCarrito()

    // Ir a checkout
    CartPage.irACheckout()
    cy.url().should('include', '/checkout-step-one')

    // Llenar datos
    CheckoutPage.llenarDatos('Natram', 'QA', '110111')
    cy.url().should('include', '/checkout-step-two')

    // Verificar resumen
    CheckoutPage.resumenTotal.should('be.visible')
    cy.contains('Sauce Labs Backpack').should('be.visible')

    // Terminar compra
    CheckoutPage.terminarCompra()
    cy.url().should('include', '/checkout-complete')

    // Verificar confirmación
    CheckoutPage.mensajeExito
      .should('be.visible')
      .and('contain', 'Thank you for your order')
      */
  })

  it('checkout — debe mostrar error si falta el nombre', () => {
    cy.fixture('productos').then((products) => {
      cy.fixture('checkout').then((checkoutData) => {

        InventoryPage.agregarAlCarrito(products.mochila)
        InventoryPage.irAlCarrito()
        CartPage.irACheckout()

        CheckoutPage.campoApellido.type(checkoutData.sin_nombre.apellido)
        CheckoutPage.campoPostal.type(checkoutData.sin_nombre.postal)
        CheckoutPage.botonContinuar.click()

        CheckoutPage.mensajeError
          .should('be.visible')
          .and('contain', 'First Name is required')
      })
    })
  })

  it('checkout — debe mostrar error si falta el código postal', () => {
    cy.fixture('productos').then((products) => {
      cy.fixture('checkout').then((checkoutData) => {

        InventoryPage.agregarAlCarrito(products.mochila)
        InventoryPage.irAlCarrito()
        CartPage.irACheckout()

        CheckoutPage.campoNombre.type(checkoutData.sin_postal.nombre)
        CheckoutPage.campoApellido.type(checkoutData.sin_postal.apellido)
        CheckoutPage.botonContinuar.click()

        CheckoutPage.mensajeError
          .should('be.visible')
          .and('contain', 'Postal Code is required')
      })
    })
  })

  it('checkout — debe poder cancelar y volver al inventario', () => {
    cy.fixture('productos').then((products) => {
      cy.fixture('checkout').then((checkoutData) => {

        InventoryPage.agregarAlCarrito(products.mochila)
        InventoryPage.irAlCarrito()
        CartPage.irACheckout()

        cy.get('[data-test="cancel"]').click()
        cy.url().should('include', '/cart')
      })
    })
  })

})