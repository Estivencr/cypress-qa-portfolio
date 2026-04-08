class LoginPage {

  // Selectores
  get campoUsuario()  { return cy.get('[data-test="username"]') }
  get campoPassword() { return cy.get('[data-test="password"]') }
  get botonLogin()    { return cy.get('[data-test="login-button"]') }
  get mensajeError()  { return cy.get('[data-test="error"]') }

  // Acciones
  visitar() {
    cy.visit('/')
  }

  iniciarSesion(usuario, password) {
    this.campoUsuario.type(usuario)
    this.campoPassword.type(password)
    this.botonLogin.click()
  }

}

export default new LoginPage()