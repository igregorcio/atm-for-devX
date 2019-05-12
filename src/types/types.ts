import CashMachine from '../api/CashMachine'

export type CashMachine = CashMachine
export type NotesArray = number[]

export interface AvailableNotes {
  sortedDesc: NotesArray
  minNote: number
}

export type NotesArrayWithQty = { value: number; quantity: number }[]
