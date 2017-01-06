import { UnknownCharError } from './errors'
import { Character } from './interfaces'

/* Base class for working with character stream */
export class InputStream {
  source: string
  pos: number
  line: number
  offset: number
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

      this.pos = 0
      this.line = 1
      this.offset = -1

      this.char = null
  }

  getInitialPosition() {

  }

  readNextChar() {

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
    return this.pos > this.$length
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
