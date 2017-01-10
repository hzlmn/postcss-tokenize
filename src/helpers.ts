import {TokenTypes} from './tokens'

export function isSpaceCharacter(code) {
  return (
    code === TokenTypes.Space ||
    code === TokenTypes.Feed ||
    code === TokenTypes.NewLine ||
    code === TokenTypes.Tab
  )
}
