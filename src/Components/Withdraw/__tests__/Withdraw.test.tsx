import React from 'react'
import { render, getByText, fireEvent, prettyDOM } from 'react-testing-library'

import CashMachine from './../../../api/CashMachine'
import Withdraw from './../Withdraw'
import { AMOUNT_LIMIT } from '../../../const'

const INPUT_ID = 'input'
const AVAILABLE_NOTES_ID = 'withdraw-available-notes'
const RESULTS_ID = 'withdraw-results'
const RESULTS_EMPTY_ID = 'withdraw-results-empty'
const RESULTS_NOTES_ID = 'withdraw-results-notes'
const buttonLabel = 'Withdraw'

const availableNotes = [10, 20, 50, 100]
const currencySymbol = '$'
const cashMachineInstance = new CashMachine(availableNotes, currencySymbol)

const setup = () => {
  const utils = render(<Withdraw cashMachineInstance={cashMachineInstance} />)

  const input = utils.getByTestId(INPUT_ID)
  const button = utils.getByText(buttonLabel)

  return { input, button, ...utils }
}

describe('it renders', () => {
  const cashMachineInstance = new CashMachine(availableNotes, currencySymbol)

  test('with the info list about available notes', () => {
    const { getByTestId } = render(
      <Withdraw cashMachineInstance={cashMachineInstance} />
    )
    const notesInfo = getByTestId(AVAILABLE_NOTES_ID)

    availableNotes.forEach(note => {
      const noteElem = getByText(notesInfo, `${currencySymbol}${note}`)
      expect(noteElem).toBeInTheDocument()
    })
  })

  test('with withdraw button', () => {
    const { getByText } = render(
      <Withdraw cashMachineInstance={cashMachineInstance} />
    )

    expect(getByText(buttonLabel)).toBeInTheDocument()
  })

  test('results not rendered', () => {
    const { queryByTestId } = render(
      <Withdraw cashMachineInstance={cashMachineInstance} />
    )
    expect(queryByTestId(RESULTS_ID)).toBeNull()
  })
})

describe('it shows correct results ', () => {
  const cashMachineInstance = new CashMachine(availableNotes, currencySymbol)

  test('on button click', () => {
    const value = 120
    const { input, button, container, getByTestId } = setup()

    fireEvent.change(input, { target: { value } })
    fireEvent.click(button)

    const details = getByTestId(RESULTS_ID)

    expect(details.textContent).toMatch(`$100x 1`)
    expect(details.textContent).toMatch(`$20x 1`)
  })

  test('on enter key pressed click', () => {
    const value = 80
    const { input, button, container, getByTestId } = setup()

    fireEvent.change(input, { target: { value } })
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 })

    const details = getByTestId(RESULTS_ID)

    expect(details.textContent).toMatch(`$50x 1`)
    expect(details.textContent).toMatch(`$20x 1`)
    expect(details.textContent).toMatch(`$10x 1`)
  })

  test('when amount not dividable', () => {
    const value = 85
    const { input, button, queryByTestId } = setup()

    fireEvent.change(input, { target: { value } })
    fireEvent.click(button)

    const detailsEmpty = queryByTestId(RESULTS_EMPTY_ID)
    const detailsNotes = queryByTestId(RESULTS_NOTES_ID)

    expect(detailsEmpty).not.toBeNull()
    expect(detailsNotes).toBeNull()
  })
})

describe('on input change ', () => {
  const cashMachineInstance = new CashMachine(availableNotes, currencySymbol)

  test('it shows greedy message when amount too high', () => {
    const value = AMOUNT_LIMIT + 1
    const { input, getByText } = setup()
    fireEvent.change(input, { target: { value } })

    expect(getByText(/to greedy :D/i)).toBeInTheDocument()
  })

  test.todo('it does not change value if not integer')
  // NOTE: and I would probably make up some more cases
  // NOTE: but I think it already shows you my style
})
