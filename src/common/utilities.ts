type PositiveInteger<N extends number> = N extends 0 ? never : `${N}` extends `-${string}` ? never : N

export const ArrayUtils = {
  splitIntoChunks<T, N extends number>(array: Array<T>, chunkSize: PositiveInteger<N>): Array<T>[] {
    const result: Array<T>[] = []
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize))
    }
    return result
  },
}
