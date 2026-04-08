class CheckoutPage {

  // Selectores — paso 1 (datos personales)
  get campoNombre()    { return cy.get('[data-test="firstName"]') }
  get campoApellido()  { return cy.get('[data-test="lastName"]') }
  get campoPostal()    { return cy.get('[data-test="postalCode"]') }
  get botonContinuar() { return cy.get('[data-test="continue"]') }
  get mensajeError()   { return cy.get('[data-test="error"]') }

  // Selectores — paso 2 (resumen)
  get botonTerminar()  { return cy.get('[data-test="finish"]') }
  get resumenTotal()   { return cy.get('.summary_total_label') }

  // Selectores — confirmación
  get mensajeExito()   { return cy.get('.complete-header') }

  // Acciones
  llenarDatos(nombre, apellido, postal) {
    this.campoNombre.type(nombre)
    this.campoApellido.type(apellido)
    this.campoPostal.type(postal)
    this.botonContinuar.click()
  }

  terminarCompra() {
    this.botonTerminar.click()
  }

}

export default new CheckoutPage()