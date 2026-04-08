import InventoryPage from '../../support/pages/InventoryPage'
import CartPage from '../../support/pages/CartPage'
import CheckoutPage from '../../support/pages/CheckoutPage'

describe('Checkout — SauceDemo', () => {

  beforeEach(() => {
    cy.loginSauceDemo()
  })

  it('checkout — debe completar la compra exitosamente', () => {
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
  })

  it('checkout — debe mostrar error si falta el nombre', () => {
    InventoryPage.agregarAlCarrito('Sauce Labs Backpack')
    InventoryPage.irAlCarrito()
    CartPage.irACheckout()

    // Solo apellido y postal — falta nombre
    CheckoutPage.campoApellido.type('QA')
    CheckoutPage.campoPostal.type('110111')
    CheckoutPage.botonContinuar.click()

    CheckoutPage.mensajeError
      .should('be.visible')
      .and('contain', 'First Name is required')
  })

  it('checkout — debe mostrar error si falta el código postal', () => {
    InventoryPage.agregarAlCarrito('Sauce Labs Backpack')
    InventoryPage.irAlCarrito()
    CartPage.irACheckout()

    CheckoutPage.campoNombre.type('Natram')
    CheckoutPage.campoApellido.type('QA')
    CheckoutPage.botonContinuar.click()

    CheckoutPage.mensajeError
      .should('be.visible')
      .and('contain', 'Postal Code is required')
  })

  it('checkout — debe poder cancelar y volver al inventario', () => {
    InventoryPage.agregarAlCarrito('Sauce Labs Backpack')
    InventoryPage.irAlCarrito()
    CartPage.irACheckout()

    cy.get('[data-test="cancel"]').click()
    cy.url().should('include', '/cart')
  })

})