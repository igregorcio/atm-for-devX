import CashMachine from '../CashMachine'

const availableNotes = [20, 100, 50, 10]
const currencySymbol = '$'

describe('CashMachine instance is created', () => {
  test('with correct available notes', () => {
    const cashMachine = new CashMachine(availableNotes, currencySymbol)

    expect(cashMachine.availableNotes.sortedDesc).toEqual([100, 50, 20, 10])
  })

  test('with correct available min note', () => {
    const cashMachine = new CashMachine(availableNotes, currencySymbol)

    expect(cashMachine.availableNotes.minNote).toEqual(10)
  })

  test('with correct currency', () => {
    const cashMachine = new CashMachine(availableNotes, currencySymbol)

    expect(cashMachine.currencySymbol).toEqual(currencySymbol)
  })
})

describe('withdraw ', () => {
  const cashMachine = new CashMachine(availableNotes, currencySymbol)

  test('returns correct notes for ammount of 30', () => {
    const { notes } = cashMachine.withdraw(30)
    const expectedNotes = [
      { value: 20, quantity: 1 },
      { value: 10, quantity: 1 },
    ]

    expect(notes).toEqual(expectedNotes)
  })

  test('returns correct notes for ammount of 80', () => {
    const { notes } = cashMachine.withdraw(80)
    const expectedNotes = [
      { value: 50, quantity: 1 },
      { value: 20, quantity: 1 },
      { value: 10, quantity: 1 },
    ]

    expect(notes).toEqual(expectedNotes)
  })

  test('returns correct notes for ammount of 140', () => {
    const { notes } = cashMachine.withdraw(140)
    const expectedNotes = [
      { value: 100, quantity: 1 },
      { value: 20, quantity: 2 },
    ]

    expect(notes).toEqual(expectedNotes)
  })

  test('returns empty array when amount is lower than lowest available note', () => {
    const { notes } = cashMachine.withdraw(5)
    expect(notes).toEqual([])
  })

  test('returns empty array when amount is not dividable by notes', () => {
    const { notes } = cashMachine.withdraw(145)
    expect(notes).toEqual([])
  })
})
