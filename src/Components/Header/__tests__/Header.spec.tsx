import React from 'react'
import { render } from 'react-testing-library'

import Header from './../Header'

test('it renders with a headline', () => {
  const headline = 'hey dude'
  const { queryByText } = render(<Header headline={headline} />)

  expect(queryByText(headline)).toBeInTheDocument()
})
