import { getArraySortedDescending, getMinValue } from './../utils'

describe('getArraySortedDescending()', () => {
  test('returns correct array', () => {
    const array = [4, 1, 5, 2]
    const sortedArray = getArraySortedDescending(array)

    expect(sortedArray).toEqual([5, 4, 2, 1])
  })

  test('does not mutate the argument array', () => {
    const array = [4, 1, 5, 2]
    const sortedArray = getArraySortedDescending(array)

    expect(array).toEqual([4, 1, 5, 2])
  })
})

describe('getMinValue()', () => {
  test('returns min number', () => {
    const min = getMinValue([4, 1, 5, 2])

    expect(min).toBe(1)
  })

  test('does zero for empty array', () => {
    const min = getMinValue([])

    expect(min).toBe(0)
  })

  test('does not mutate the argument array', () => {
    const array = [4, 1, 5, 2]
    getMinValue(array)

    expect(array).toEqual([4, 1, 5, 2])
  })
})
