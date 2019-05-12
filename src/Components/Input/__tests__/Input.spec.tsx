import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Input, { Props } from './../Input'

const INPUT_ID = 'input'

const defaultProps = {
  onChange: jest.fn(),
  onKeyDown: jest.fn(),
  label: 'my label',
  prefix: 'E',
  message: 'My awesome message',
  value: 10,
}

const renderWithProps = (props?: Partial<Props>) => {
  const utils = render(<Input {...defaultProps} {...props} />)

  return utils
}

test('it renders with a value, label, message and prefix', () => {
  const { queryByTestId, queryByText } = renderWithProps()

  expect(queryByTestId(INPUT_ID)).toBeInTheDocument()
  expect(queryByText(defaultProps.label)).toBeInTheDocument()
  expect(queryByText(defaultProps.prefix)).toBeInTheDocument()
  expect(queryByText(defaultProps.message)).toBeInTheDocument()
})

describe('it renders with no message', () => {
  test('when message not passed in props', () => {
    const { queryByTestId, queryByText } = renderWithProps({
      message: undefined,
    })

    expect(queryByText(defaultProps.message)).not.toBeInTheDocument()
  })

  test('when message is enpty string', () => {
    const { queryByTestId, queryByText } = renderWithProps({ message: '' })

    expect(queryByText(defaultProps.message)).not.toBeInTheDocument()
  })
})

test('it sets focus on render', () => {
  const { queryByTestId } = renderWithProps()

  const input = queryByTestId(INPUT_ID)

  expect(input).toHaveFocus()
})
test('it calls onChange when input changed', () => {
  const value = 20
  const { getByTestId } = renderWithProps()
  const input = getByTestId(INPUT_ID)

  fireEvent.change(input, { target: { value } })

  expect(defaultProps.onChange).toBeCalled()
  expect(defaultProps.onChange).toBeCalledTimes(1)
})
