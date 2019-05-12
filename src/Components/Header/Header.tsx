import React from 'react'

import money from './../../public/img/money.svg'
import './Header.css'

const Header: React.FC<{ headline: string }> = ({ headline }) => {
  return (
    <header data-testid="header-wrapper">
      <h1>{headline}</h1>
      <img src={money} className="Header-img" alt="money" />
    </header>
  )
}

export default Header
