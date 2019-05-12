import React from 'react'

import './WithdrawResults.css'
import { NotesArrayWithQty } from '../../../types'

interface Props {
  notesArray: NotesArrayWithQty
  currencySymbol: string
}

const WithdrawResults: React.FC<Props> = ({ notesArray, currencySymbol }) => {
  return (
    <div className="WithdrawResults-wrapper" data-testid="withdraw-results">
      {notesArray.length > 0 ? (
        <div data-testid="withdraw-results-notes">
          <h1>There you go:</h1>
          {notesArray.map(note => {
            return (
              <div
                key={`note-${note.value}`}
                className="WithdrawResults-detail"
              >
                <div className="WithdrawResults-note">
                  <span className="WithdrawResults-currency">
                    {currencySymbol}
                  </span>
                  {note.value}
                </div>
                <div className="WithdrawResults-quantity">
                  x {note.quantity} pcs.
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <h1 data-testid="withdraw-results-empty">
          There is no notes configuration that would make you satisfied :)
        </h1>
      )}
    </div>
  )
}

export default WithdrawResults
