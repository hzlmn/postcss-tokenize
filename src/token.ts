/**
 * @class Token
 * Single token base class
 */
export class Token {
  type: string
  value: string
  lineStart: number
  columnStart: number
  lineEnd: number
  columnEnd: number

  /**
   * @param  {string} type
   * @param  {string} value
   * @param  {number} lineStart?
   * @param  {number} columnStart?
   * @param  {number} lineEnd?
   * @param  {number} columnEnd?
   */
  constructor(
    type: string,
    value: string,
    lineStart?: number,
    columnStart?: number,
    lineEnd?: number,
    columnEnd?: number
  ) {
    this.type = type
    this.value = value
    this.lineStart = lineStart
    this.columnStart = columnStart
    this.lineEnd = lineEnd
    this.columnEnd = columnEnd
  }

  /**
   * Get token value compatible with PostCSS token
   */
  getToken() {
    if (this.lineStart && this.columnStart) {
      if (this.lineEnd && this.columnEnd) {
        return [this.type, this.value, this.lineStart, this.columnStart, this.lineEnd, this.columnEnd]
      }

      return [this.type, this.value, this.lineStart, this.columnStart]
    }

    return [this.type, this.value]
  }
}
