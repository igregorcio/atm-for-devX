import React from 'react'
import { render } from 'react-testing-library'

import App from './../App'

const HEADER_ID = 'header-wrapper'
const WITHDRAW_ID = 'withdraw-wrapper'

test('it renders with a <Header> and <Withdraw>', () => {
  const { queryByTestId } = render(<App />)

  expect(queryByTestId(HEADER_ID)).toBeInTheDocument()
  expect(queryByTestId(WITHDRAW_ID)).toBeInTheDocument()
})
