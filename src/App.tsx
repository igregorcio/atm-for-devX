import React, { useMemo } from 'react'

import './App.css'

import CashMachine from './api/CashMachine'
import Header from './Components/Header'
import Withdraw from './Components/Withdraw'

const AVAILABLE_NOTES = [100, 50, 20, 10]
const CURRENCY_SYMBOL = '$'

const App: React.FC = () => {
  const cashMachineInstance = useMemo(
    () => new CashMachine(AVAILABLE_NOTES, CURRENCY_SYMBOL),
    []
  )

  return (
    <div className="App-wrapper">
      <Header headline="Your ideal ATM" />
      <Withdraw cashMachineInstance={cashMachineInstance} />
    </div>
  )
}

export default App
