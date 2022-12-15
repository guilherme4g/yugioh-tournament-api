export interface Hasher {
  hash: (plainText: string) => string
  compare: (plainText: string, hashText: string) => boolean
}
