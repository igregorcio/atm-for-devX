import React, { useState, useCallback } from 'react'

import './Withdraw.css'

import Input from '../Input'
import Button from '../Button'
import WithdrawResults from './Results'
import { NotesArrayWithQty, CashMachine } from '../../types'
import { AMOUNT_LIMIT, KEY_CODES } from '../../const'

interface Props {
  cashMachineInstance: CashMachine
}

const Withdraw: React.FC<Props> = ({ cashMachineInstance }) => {
  const [amount, setAmount] = useState(0)
  const [isWidthdrawOpen, setIsWidthdrawOpen] = useState(false)
  const [isTooGreedy, setIsTooGreedy] = useState(false)
  const [notesResultArray, setNotesResultArray] = useState<NotesArrayWithQty>(
    []
  )

  const onWithdraw = useCallback(() => {
    const { notes } = cashMachineInstance.withdraw(amount)

    setIsWidthdrawOpen(true)
    setNotesResultArray(notes)
  }, [amount, cashMachineInstance])

  const onInputKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (ev.keyCode === KEY_CODES.ENTER) {
        onWithdraw()
      }
    },
    [onWithdraw]
  )

  const onInputChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const value = ev.target.value
      const maybeInt = parseInt(value)

      const isPositiveInteger = (maybeInt: any): boolean =>
        !isNaN(maybeInt) && maybeInt > 0
      const isHigherThanLimit = (val: number): boolean =>
        maybeInt > AMOUNT_LIMIT

      if (isPositiveInteger(value)) {
        setIsWidthdrawOpen(false)

        if (isHigherThanLimit(maybeInt)) {
          setIsTooGreedy(true)
        } else {
          setIsTooGreedy(false)

          setAmount(maybeInt)
        }
      } else if (value === '') {
        setAmount(0)

        setIsWidthdrawOpen(false)
        setIsTooGreedy(false)
      }
    },
    []
  )

  return (
    <div data-testid="withdraw-wrapper">
      <div data-testid="withdraw-available-notes">
        Available notes:
        {cashMachineInstance.availableNotes.sortedDesc.map(note => (
          <span
            key={`available-note-${note}`}
            className="Withdraw-available-note"
          >{`${cashMachineInstance.currencySymbol}${note}`}</span>
        ))}
      </div>

      <Input
        onKeyDown={onInputKeyDown}
        onChange={onInputChange}
        value={amount}
        label="Enter amount"
        prefix={cashMachineInstance.currencySymbol}
        message={isTooGreedy ? `Don't be to greedy :D` : undefined}
      />

      <Button onClick={onWithdraw} disabled={!Boolean(amount)}>
        Withdraw
      </Button>

      {isWidthdrawOpen && (
        <WithdrawResults
          currencySymbol={cashMachineInstance.currencySymbol}
          notesArray={notesResultArray}
        />
      )}
    </div>
  )
}

export default Withdraw
