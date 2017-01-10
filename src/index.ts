import Input from '../node_modules/postcss/d.ts/input'

import {
  IToken,
  ITokenizer,
  IConfiguration,
  Character
} from './interfaces'

import {TokenTypes} from './tokens'
import {InputStream} from './stream'
import {isSpaceCharacter} from './helpers'


/**
 * @class Tokenizer
 * Base class for working with tokens
 *
 * @param  {string} source
 * @param  {IConfiguration} options?
 */
export class Tokenizer {
  source: string
  options: IConfiguration
  length: number
  char: Character
  token: any
  buffer: Array<any>

  private $stream: InputStream

  constructor(source: string, options?: IConfiguration) {
    this.$stream = new InputStream(source)
    this.source = source
    this.options = options
    this.length = this.source.length
    this.buffer = []
  }

  /**
   * Read next char value
   */
  readNextChar() {
    this.char = this.buffer.length ? this.buffer.shift() : this.$stream.readNextChar()
  }

  /**
   * Lookup next character value
   */
  lookupNextChar() {
    const nextChar = this.$stream.readNextChar()
    this.buffer.push(nextChar)
    return nextChar
  }


  /**
   * Lookup previous character value
   */
  getPreviousCharacter() {}

  /**
   * Read while predicate true,
   * and collect value
   */
  readWhileHelper(predicate: Function): string {
    var value = String(this.char.value)
    this.readNextChar()

    while (predicate(this.char.code)) {
      value += this.char.value
      this.readNextChar()
    }

    this.buffer.push(this.char)
    return value
  }

  /* Start initial token */
  startToken() {}

  /* Finish token structure */
  endToken() {}

  /**
   * Read next token value
   */
  readNextToken(): any {
    if (!this.$stream.endOfFile()) {
      this.readNextChar()

      switch (this.char.code) {
        case TokenTypes.NewLine:
        case TokenTypes.Feed:
        case TokenTypes.Space:
        case TokenTypes.Tab:
        case TokenTypes.Cr:
          var value = this.readWhileHelper(isSpaceCharacter)
          this.token = ['space', value]
          break

        case TokenTypes.OpenSquare:
          this.token = ['[', '[', this.char.line, this.char.column]
          break

        case TokenTypes.CloseSquare:
          this.token = [']', ']', this.char.line, this.char.column]
          break

        case TokenTypes.OpenCurly:
          this.token = ['{', '{', this.char.line, this.char.column]
          break

        case TokenTypes.CloseCurly:
          this.token = ['}', '}', this.char.line, this.char.column]
          break

        case TokenTypes.Colon:
          this.token = [':', ':', this.char.line, this.char.column]
          break

        case TokenTypes.Semicolon:
          this.token = [';', ';', this.char.line, this.char.column]
          break

        case TokenTypes.OpenParentheses:



        default:
          var nextChar = this.lookupNextChar()
          if (this.char.code === TokenTypes.Slash && nextChar.code === TokenTypes.Asterisk) {
            this.startToken()
          }
          break
      }

      return this.token
    }
  }

  /**
   * Driver for working with list of tokens
   */
  tokenize() {
    let tokens: Array<any> = []
    while (!this.$stream.endOfFile()) {
      tokens.push(this.readNextToken())
    }
    return tokens
  }
}

/* This is for backward compatibility with old mode */
export function tokenize(input: string, options?) {
  const tokenizer = new Tokenizer(input, options)
  return tokenizer.tokenize()
}
