# Cypress QA Portfolio — SauceDemo E2E Tests
[![Cypress Tests](https://github.com/Estivencr/cypress-qa-portfolio/actions/workflows/cypress-test.yml/badge.svg)](https://github.com/Estivencr/cypress-qa-portfolio/actions)

Suite de pruebas E2E automatizadas con Cypress para la aplicación SauceDemo.

## Cobertura de pruebas

| Módulo | Tests | Positivos | Negativos |
|--------|-------|-----------|-----------|
| Login | 4 | 1 | 3 |
| Carrito | 4 | 3 | 1 |
| Checkout | 4 | 1 | 3 |
| **Total** | **12** | **5** | **7** |

## Tecnologías

- Cypress 13+
- JavaScript
- Page Object Model
- GitHub Actions CI/CD

## Cómo ejecutar

```bash
# Instalar dependencias
npm install

# Abrir Cypress (modo visual)
npx cypress open

# Correr todos los tests (modo headless)
npx cypress run
```

## Patrones aplicados

- Page Object Model — selectores separados de los tests
- Custom Commands — `cy.loginSauceDemo()` reutilizable
- beforeEach — setup limpio antes de cada test
- data-test selectors — selectores estables ante cambios de UI

## Autor

**EstivenCR** — QA Engineer
[LinkedIn](https://www.linkedin.com/in/estivencr/) | [Portafolio API Testing](https://github.com/Estivencr/qa-api-testing-portfolio)
