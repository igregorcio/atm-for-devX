import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'

import Button from './../Button'

const label = 'My button'
const onClick = jest.fn()

const renderWithProps = (disabled = false) => {
  const utils = render(
    <Button onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  )
  const button = utils.getByText(label)

  return { button, ...utils }
}

test('renders native button with a given label', () => {
  const { button } = renderWithProps()

  expect(button).toBeInTheDocument()
})

test('calls onClick when button clicked', () => {
  const { button } = renderWithProps()

  fireEvent.click(button)

  expect(onClick).toBeCalled()
  expect(onClick).toBeCalledTimes(1)
})

test('does not call onClick when is disabled and clicked  ', () => {
  const { button } = renderWithProps(true)

  fireEvent.click(button)

  expect(onClick).not.toBeCalled()
})
