import { UnknownCharError } from './errors'
import { Character } from './interfaces'
import { TokenTypes, TokenNames } from './tokens'

/* List fo chars that starts new line */
const NEWLINE_CHARS = ''

/* Internal positioning state */
interface PositionState {
  cursor: number,
  line: number,
  column: number
}

/* Base class for working with character stream */
export class InputStream {
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
  constructor(source, line = 1, column = 0) {
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

  /**
   * Get initial cursor position
   * from line and column
   */
  getInitialPosition() {}

  /**
   * Read next character value
   */
  readNextChar(): Character {
    const charCode = this.source.charCodeAt(this.$.cursor)

    if (charCode === TokenTypes.NewLine || charCode === TokenTypes.Feed ||
        charCode === TokenTypes.Cr &&
        this.source.charCodeAt(this.$.cursor + 1) !== TokenTypes.NewLine) {

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
   * Get current Character
   */
  getCurrentChar() {
    return this.currentChar
  }

  /**
   * Check if end of file was reached
   */
  endOfFile() {
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
  raiseException(message: string, char: Character) {
    throw new UnknownCharError(message, char)
  }
}
