class InventoryPage {

  // Selectores
  get titulo()           { return cy.get('.title') }
  get listaProductos()   { return cy.get('.inventory_list') }
  get iconoCarrito()     { return cy.get('.shopping_cart_link') }
  get badgeCarrito()     { return cy.get('.shopping_cart_badge') }

  primerProducto() {
    return cy.get('.inventory_item').first()
  }

  botonAgregarProducto(nombre) {
    return cy.contains('.inventory_item', nombre)
      .find('button')
  }

  // Acciones
  agregarAlCarrito(nombre) {
    this.botonAgregarProducto(nombre).click()
  }

  irAlCarrito() {
    this.iconoCarrito.click()
  }

}

export default new InventoryPage()