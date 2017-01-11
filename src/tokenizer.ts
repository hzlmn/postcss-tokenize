import Input from '../node_modules/postcss/d.ts/input'

import {
  IToken,
  ITokenizer,
  IConfiguration,
  Character
} from './interfaces'

import {TokenTypes} from './tokens'
import {InputScanner} from './scanner'
import {isSpaceCharacter} from './helpers'
import {Token} from './token'

/* Matching regexes, should be revisited */
const RE_AT_END      = /[ \n\t\r\f\{\(\)'"\\;/\[\]#]/
const RE_WORD_END    = /[ \n\t\r\f\(\)\{\}:;@!'"\\\]\[#]|\/(?=\*)/
const RE_BAD_BRACKET = /.[\\\/\("'\n]/

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

  private $stream: InputScanner

  constructor(source: string, options?: IConfiguration) {
    this.$stream = new InputScanner(source)
    this.source = source
    this.options = options
    this.length = this.source.length
    this.buffer = []
  }

  /**
   * Read next char value
   */
  readNextChar(): Character {
    this.char = this.buffer.length ? this.buffer.shift() : this.$stream.readNextChar()
    return this.char
  }

  /**
   * Lookup next character value
   */
  lookupNextChar(): Character {
    const nextChar = this.$stream.readNextChar()
    this.buffer.push(nextChar)
    return nextChar
  }

  /**
   * Read while predicate true,
   * and collect value
   */
  readWhileHelper(predicate: Function): string {
    var value = String(this.char.value)
    while (!this.$stream.endOfFile() && predicate(this.readNextChar())) {
      value += this.char.value
      //console.log('in-while',this.char.value)
    }
    //console.log(this.char.value)
    this.buffer.push(this.char)
    return value
  }

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
          this.token = new Token('space', value)
          break

        case TokenTypes.OpenSquare:
          this.token = new Token('[', '[', this.char.line, this.char.column)
          break

        case TokenTypes.CloseSquare:
          this.token = new Token(']', ']', this.char.line, this.char.column)
          break

        case TokenTypes.OpenCurly:
          this.token = new Token('{', '{', this.char.line, this.char.column)
          break

        case TokenTypes.CloseCurly:
          this.token = new Token('}', '}', this.char.line, this.char.column)
          break

        case TokenTypes.Colon:
          this.token = new Token(':', ':', this.char.line, this.char.column)
          break

        case TokenTypes.Semicolon:
          this.token = new Token(';', ';', this.char.line, this.char.column)
          break

        case TokenTypes.At:
          var token = new Token('at-word', null, this.char.line, this.char.column)
          var value = this.readWhileHelper((char) => !RE_AT_END.test(char.value))
          token.value = value
          token.lineEnd = this.char.line
          token.columnEnd = this.char.column

          this.token = token
          break

        case TokenTypes.OpenParentheses:
          var prev = this.$stream.getPreviousValue() || ''
          var next = this.lookupNextChar().code

          if ( prev === 'url' &&
              next !== TokenTypes.SingleQuote &&
              next !== TokenTypes.DodubleQuote &&
              next !== TokenTypes.Space &&
              next !== TokenTypes.NewLine &&
              next !== TokenTypes.Tab &&
              next !== TokenTypes.Feed && next !== TokenTypes.Cr
            ) {

            }

        default:
          this.token = []
          break
      }

      return this.token.getToken()
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
