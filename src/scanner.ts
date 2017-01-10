import { UnknownCharError } from './errors'
import { Character } from './interfaces'
import { TokenTypes, TokenNames } from './tokens'

/* Internal positioning state */
interface PositionState {
  cursor: number,
  line: number,
  column: number
}

/* Base class for working with character stream */
export class InputScanner {
  source: string
  currentChar: Character
  length: number
  $: PositionState

  /**
   * @class InputStream
   *
   * @param  {string} source
   * @param  {number} line=1
   * @param  {number} column=0
  */
  constructor(source: string, line = 1, column = 0) {
    this.source = source
    this.length = this.source.length

    /* Internal position variable */
    this.$ = {
      cursor: 0,
      line: line,
      column
    }

    /* currentCharacter */
    this.currentChar = null
  }

  expectNext() {}

  /**
   * Check if character is break line character
   */
  __isBreakLineCharacter(code: number): boolean {
    switch (code) {
      case TokenTypes.NewLine:
      case TokenTypes.Feed:
        return true

      case TokenTypes.Cr:
        return this.source.charCodeAt(this.$.cursor + 1) !== TokenTypes.NewLine
    }

    return false
  }

  /**
   * Read next character value
   */
  readNextChar(): Character {
    const charCode = this.source.charCodeAt(this.$.cursor)

    if (this.__isBreakLineCharacter(charCode)) {
      ++this.$.line
      this.$.column = 0
    } else {
      ++this.$.column
    }

    this.$.cursor++

    this.currentChar = {
      code: charCode,
      value: String.fromCharCode(charCode),
      line: this.$.line,
      column: this.$.column
    }

    return this.currentChar
  }

  /**
   * Lookup previous character
   */
  readPreviousChar() {

  }

  /**
   * Get current Character
   */
  getCurrentChar(): Character {
    return this.currentChar
  }

  /**
   * Check if end of file was reached
   */
  endOfFile(): boolean {
    return this.$.cursor >= this.length
  }

  /**
   * Raise expection on unknown character
   *
   * @param  {string} message
   * @param  {Character} char
   *
   * @throws UnknownCharError
   */
  raiseException(message: string, char: Character): UnknownCharError {
    throw new UnknownCharError(message, char)
  }
}