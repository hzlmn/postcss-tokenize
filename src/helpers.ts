import {TokenTypes} from './tokens'

/* Check if character is space character */
export function isSpaceCharacter(char) {
  switch (char.code) {
    case TokenTypes.Space:
    case TokenTypes.Feed:
    case TokenTypes.NewLine:
    case TokenTypes.Tab:
    case TokenTypes.Cr:
      return true
  }

  return false
}

