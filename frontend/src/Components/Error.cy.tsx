import { vhToPixel, vwToPixel } from '../Utils/f'
import { getViewport } from '../Cypress/utils'
import TestContainer from '../Cypress/TestContainer'
import ErrorComponent from './Error'
import en from '../Translations/en'

describe('<ErrorComponent />', () => {
  const error = 'Error'
  const { height, width }: { height: number, width: number } = getViewport()

  beforeEach(() => {
    cy.viewport(width, height).wait(500)
    cy.mount(
      <TestContainer>
        <ErrorComponent clearError={() => { }} msg={error} />
      </TestContainer>
    )
  })

  it('renders', () => {
    cy.get("[data-testid='error-component']").should('exist').and('be.visible')
  })

  it('displays error message', () => {
    cy.get("[data-testid='error-msg']").should('exist').and('contain.text', error)
  })

  it('check button label', () => {
    cy.get("[data-testid='error-button']").contains(en.error.button)
  })

  it('has correct styles', () => {
    cy.get("[data-testid='error-title']").should('have.css', 'margin-bottom', `${vhToPixel(2.5, height)}px`)
    cy.get("[data-testid='error-title']").should('have.css', 'font-size', '84px')

    cy.get("[data-testid='error-msg']").should('have.css', 'margin-bottom', `${vhToPixel(2.5, height)}px`)
    cy.get("[data-testid='error-msg']").should('have.css', 'font-size', '18px')

    cy.get("[data-testid='error-button']").should('have.css', 'margin-top', `${vhToPixel(2, height)}px`)
    cy.get("[data-testid='error-button']").should('have.css', 'width', `${vwToPixel(20, width)}px`)
  })
})
