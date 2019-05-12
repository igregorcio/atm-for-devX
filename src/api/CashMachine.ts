import { getArraySortedDescending, getMinValue } from './../utils'
import { AvailableNotes, NotesArray, NotesArrayWithQty } from '../types'
import { AMOUNT_LIMIT } from '../const'

export default class CashMachine {
  private _availableNotes: AvailableNotes

  private _currencySymbol: string

  constructor(availableNotes: NotesArray, currencySymbol: string) {
    this._availableNotes = {
      sortedDesc: getArraySortedDescending(availableNotes),
      minNote: getMinValue(availableNotes),
    }
    this._currencySymbol = currencySymbol
  }

  get availableNotes() {
    return this._availableNotes
  }

  get currencySymbol() {
    return this._currencySymbol
  }

  public withdraw(amount: number): { notes: NotesArrayWithQty } {
    if (amount > AMOUNT_LIMIT) {
      return { notes: [] }
    }

    const minNotesArray = getMinNotes(this._availableNotes.sortedDesc, amount)

    const notes =
      minNotesArray === null
        ? []
        : this._availableNotes.sortedDesc
            .map((note, idx) => ({ value: note, quantity: minNotesArray[idx] }))
            .filter((_, idx) => minNotesArray[idx] !== 0)

    return { notes }
  }
}

// https://stackoverflow.com/questions/31090857/greedy-algorithm-in-javascript
function getMinNotes(
  sortedNotesArr: number[],
  amount: number
): number[] | null {
  const resultArray = []

  let i = 0
  let amountReminder = amount
  let currentNote

  while (i < sortedNotesArr.length) {
    resultArray[i] = 0
    while (sortedNotesArr[i] <= amountReminder) {
      amountReminder = amountReminder - sortedNotesArr[i]
      currentNote = resultArray[i]
      currentNote += 1
      resultArray[i] = currentNote
    }

    i++
  }

  return amountReminder > 0 ? null : resultArray
}
