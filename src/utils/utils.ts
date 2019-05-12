export function getArraySortedDescending<T>(arr: Array<T>): Array<T> {
  return [...arr].sort((a: any, b: any) => b - a)
}

export function getMinValue(arr: Array<number>): number {
  const maybeMin = Math.min(...arr)
  return isFinite(maybeMin) ? maybeMin : 0
}
