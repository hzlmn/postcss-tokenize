import { UnknownCharError } from './errors'
import { Character } from './interfaces'
import { TokenTypes, TokenNames } from './tokens'

/* List fo chars that starts new line */
const NEWLINE_CHARS = ''

/* Base class for working with character stream */
export class InputStream {
  source: string
  cursor: number
  line: number
  column: number
  char: Character
  $length: number

  constructor (
    source,
    position?: {
      line: number,
      column: number
    }) {
      this.source = source
      this.$length = this.source.length

      this.cursor = 0
      this.line = 1
      this.column = 0

      this.char = null
  }

  getInitialPosition() {}

  /**
   * Read next character value
   */
  readNextChar(): Character {
    const charCode = this.source.charCodeAt(this.cursor)
    if (charCode === TokenTypes.NewLine) {
      this.line = this.line + 1
      this.column = 0
    } else {
      this.column = this.column + 1
    }
    this.cursor++
    return {
      code: charCode,
      value: String.fromCharCode(charCode),
      line: this.line,
      column: this.column
    }
  }

  /**
   * Get current Character
   */
  getCurrentChar() {
    return this.char
  }

  /**
   * Check if end of file was reached
   */
  endOfFile() {
    return this.cursor >= this.$length
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
