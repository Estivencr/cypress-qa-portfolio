class CartPage {

  // Selectores
  get itemsCarrito()     { return cy.get('.cart_item') }
  get botonCheckout()    { return cy.get('[data-test="checkout"]') }
  get botonContinuar()   { return cy.get('[data-test="continue-shopping"]') }

  nombreProducto(index = 0) {
    return cy.get('.cart_item_label').eq(index)
  }

  // Acciones
  irACheckout() {
    this.botonCheckout.click()
  }

}

export default new CartPage()