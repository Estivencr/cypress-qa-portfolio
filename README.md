# Cypress QA Portfolio — SauceDemo E2E Tests
[![Cypress Tests](https://github.com/Estivencr/cypress-qa-portfolio/actions/workflows/cypress-test.yml/badge.svg)](https://github.com/Estivencr/cypress-qa-portfolio/actions)

Suite de pruebas E2E automatizadas con Cypress para la aplicación [SauceDemo](https://www.saucedemo.com), con un pipeline de CI en GitHub Actions que corre las pruebas en cada Pull Request, publica un reporte HTML y protege la rama `main`.

## Cobertura de pruebas

| Módulo | Archivo | Tests | Positivos | Negativos |
|--------|---------|-------|-----------|-----------|
| Login | `auth/login.cy.js` | 4 | 1 | 3 |
| Carrito | `shop/carrito.cy.js` | 4 | 3 | 1 |
| Checkout | `shop/checkout.cy.js` | 4 | 1 | 3 |
| Intercept | `intercept/intercept-demo.cy.js` | 3 | 2 | 1 |
| **Total** | **4 suites** | **15** | **7** | **8** |

## Tecnologías

- Cypress 16
- JavaScript
- Node.js 22, 24 o ≥26 (requisito de Cypress 16)
- Mochawesome (`cypress-mochawesome-reporter`) para reportes HTML
- GitHub Actions (CI) y Dependabot

## Cómo ejecutar

```bash
# Instalar dependencias exactamente como en el package-lock.json
npm ci

# Abrir Cypress (modo visual)
npx cypress open

# Correr todos los tests (modo headless)
npx cypress run
```

Después de `npx cypress run`, el reporte HTML queda en `cypress/reports/index.html`.

## Estructura del proyecto

```
cypress/
├── e2e/
│   ├── auth/          # Login
│   ├── shop/          # Carrito y checkout
│   └── intercept/     # Patrones con cy.intercept
├── fixtures/          # Datos de prueba: usuarios, productos, checkout
└── support/
    ├── pages/         # Page Objects
    ├── commands.js    # cy.loginSauceDemo()
    └── e2e.js
.github/
├── workflows/cypress-test.yml
└── dependabot.yml
cypress.config.js
```

## Patrones aplicados

- **Page Object Model** — selectores y acciones separados de los tests (`LoginPage`, `InventoryPage`, `CartPage`, `CheckoutPage`)
- **Custom Commands** — `cy.loginSauceDemo()` reutilizable
- **Fixtures** — datos de prueba fuera del código
- **beforeEach** — cada test empieza desde un estado limpio y puede correr solo
- **Selectores `data-test`** — estables ante cambios de diseño
- **`cy.intercept`** — observar peticiones y simular fallos (imágenes que responden 404)

## Pipeline de CI

El workflow `cypress-test.yml` se ejecuta en cada push y Pull Request hacia `main`:

1. Descarga el código (`actions/checkout@v7`)
2. Instala dependencias con `npm ci`, usa caché y corre `cypress run` en Chrome headless (`cypress-io/github-action@v7`)
3. Publica las capturas de pantalla solo si algo falla (`if: failure()`)
4. Publica el reporte Mochawesome siempre (`if: always()`), como artifact `reporte-e2e`

La rama `main` está protegida con un ruleset: solo se entra por Pull Request y con el check `cypress-tests` en verde. Dependabot revisa cada semana las dependencias de npm y las acciones de GitHub.

## Decisiones técnicas

- **`npm ci` en lugar de `npm install`:** instala exactamente las versiones del `package-lock.json`, para que el CI y cualquier PC den el mismo resultado.
- **Reintentos (`retries.runMode: 2`):** las pruebas corren contra un sitio externo, y un fallo de red no debería bloquear un PR. Los reintentos no se ignoran: se revisan en el log (`Attempt`) y en los tiempos del reporte, y una prueba que los necesita se investiga.
- **Actualizaciones mayores:** cada PR de Dependabot con un salto mayor se revisa contra sus notas de versión ("breaking changes"), y lo que el robot no juzga, como el reporte, se verifica a mano.

## Autor

**EstivenCR** — QA Engineer
[LinkedIn](https://www.linkedin.com/in/estivencr/) | [Portafolio API Testing](https://github.com/Estivencr/qa-api-testing-portfolio)