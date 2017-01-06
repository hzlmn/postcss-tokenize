import { Character } from './interfaces'

/* Base error class for tokenizer */
export class CSSSyntaxError extends Error {
  constructor (message: string) {
    super(message)
  }
}

/* Placholder for now */
export class UnknownCharError extends Error {
  char: Character
  constructor(message: string, char: Character) {
    super(message)
    this.char = char
  }
}
