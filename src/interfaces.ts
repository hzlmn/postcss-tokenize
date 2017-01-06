/* Interface for config options of tokenizer */
export interface IConfiguration {
  ignoreErrors: boolean
}

/* Sharable interface for single token */
export interface IToken {
  type: string,
  value: string,
  offset: number,
  line: number,
  column: number
}

/* Tokenizer interface */
export interface ITokenizer {
  readNextToken(): IToken
}

/* Map structure interface */
export interface Map<T> {
  [key: string]: T
}

/* Interface for character object */
export interface Character {
  code: number,
  value: string
  line: number,
  column: number
}
