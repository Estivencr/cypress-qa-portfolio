import LoginPage from '../../support/pages/LoginPage'

describe('Login — SauceDemo', () => {

  beforeEach(() => {
    LoginPage.visitar()
  })

  it('login — debe redirigir al inventario con credenciales válidas', () => {
    LoginPage.iniciarSesion('standard_user', 'secret_sauce')

    cy.url().should('include', '/inventory')
    cy.get('.inventory_list').should('be.visible')
  })

  it('login — debe mostrar error con usuario bloqueado', () => {
    LoginPage.iniciarSesion('locked_out_user', 'secret_sauce')

    LoginPage.mensajeError
      .should('be.visible')
      .and('contain', 'locked out')
  })

  it('login — debe mostrar error con contraseña incorrecta', () => {
    LoginPage.iniciarSesion('standard_user', 'password_malo')

    LoginPage.mensajeError
      .should('be.visible')
      .and('contain', 'Username and password do not match')
  })

  it('login — debe mostrar error con campos vacíos', () => {
    LoginPage.botonLogin.click()

    LoginPage.mensajeError
      .should('be.visible')
      .and('contain', 'Username is required')
  })

})