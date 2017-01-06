import Input from '../node_modules/postcss/d.ts/input'

import {
  IToken,
  ITokenizer,
  IConfiguration
} from './interfaces'

import {TokenTypes} from './tokens'
import {InputStream} from './stream'

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
  private $stream: InputStream

  constructor(source: string, options?: IConfiguration) {
    this.$stream = new InputStream(source)

    this.source = source
    this.options = options
    this.length = this.source.length
  }

  /**
   * Read next token value
   */
  readNextToken(): Array<any> {
    return []
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
export function tokenize(input: Input, options?) {
  var css = input.css.valueOf()
  const tokenizer = new Tokenizer(css, options)
  return []
}
