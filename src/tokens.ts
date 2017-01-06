import {Map} from './interfaces'

const SINGLE_QUOTE      = '\''.charCodeAt(0);
const DOUBLE_QUOTE      =  '"'.charCodeAt(0);
const BACKSLASH         = '\\'.charCodeAt(0);
const SLASH             =  '/'.charCodeAt(0);
const NEWLINE           = '\n'.charCodeAt(0);
const SPACE             =  ' '.charCodeAt(0);
const FEED              = '\f'.charCodeAt(0);
const TAB               = '\t'.charCodeAt(0);
const CR                = '\r'.charCodeAt(0);
const OPEN_SQUARE       =  '['.charCodeAt(0);
const CLOSE_SQUARE      =  ']'.charCodeAt(0);
const OPEN_PARENTHESES  =  '('.charCodeAt(0);
const CLOSE_PARENTHESES =  ')'.charCodeAt(0);
const OPEN_CURLY        =  '{'.charCodeAt(0);
const CLOSE_CURLY       =  '}'.charCodeAt(0);
const SEMICOLON         =  ';'.charCodeAt(0);
const ASTERISK          =  '*'.charCodeAt(0);
const COLON             =  ':'.charCodeAt(0);
const AT                =  '@'.charCodeAt(0);

/* List of all available toke types */
export const TokenTypes = {
  SingleQuote: SINGLE_QUOTE,
  DodubleQuote: DOUBLE_QUOTE,
  BackSlash: BACKSLASH,
  Slash: SLASH,
  NewLine: NEWLINE,
  Space: SPACE,
  Feed: FEED,
  Tab: TAB,
  Cr: CR,
  OpenSquare: OPEN_SQUARE,
  CloseSquare: CLOSE_SQUARE,
  OpenParentheses: OPEN_PARENTHESES,
  CloseParentheses: CLOSE_PARENTHESES,
  OpenCurly: OPEN_CURLY,
  CloseCurly: CLOSE_CURLY,
  Semicolon: SEMICOLON,
  Asterisk: ASTERISK,
  Colon: COLON,
  At: AT
}

/* Get back map of token values */
const getTokenValues = (tokenTypes) =>
  Object.keys(tokenTypes)
    .reduce((acc, key) => {
      acc[tokenTypes[key]] = key
      return acc
    }, {})


export const TokenNames = getTokenValues(TokenTypes)
