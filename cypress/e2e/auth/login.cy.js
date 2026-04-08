import LoginPage from '../../support/pages/LoginPage'

describe('Login — SauceDemo', () => {

  beforeEach(() => {
    LoginPage.visitar()
  })

  it('login — debe redirigir al inventario con credenciales válidas', () => {
    cy.fixture('usuarios').then((users) => {
      LoginPage.iniciarSesion(users.valido.usuario, users.valido.password)
      cy.url().should('include', '/inventory')
      cy.get('.inventory_list').should('be.visible')
    })
  })

  it('login — debe mostrar error con usuario bloqueado', () => {
    cy.fixture('usuarios').then((users) => {
      LoginPage.iniciarSesion(users.bloqueado.usuario, users.bloqueado.password)
      LoginPage.mensajeError
        .should('be.visible')
        .and('contain', 'locked out')
    })
  })

  it('login — debe mostrar error con contraseña incorrecta', () => {
    cy.fixture('usuarios').then((users) => {
      LoginPage.iniciarSesion(users.password_incorrecto.usuario, users.password_incorrecto.password)
      LoginPage.mensajeError
        .should('be.visible')
        .and('contain', 'Username and password do not match')
    })
  })

  it('login — debe mostrar error con campos vacíos', () => {
    LoginPage.botonLogin.click()

    LoginPage.mensajeError
      .should('be.visible')
      .and('contain', 'Username is required')
  })

})