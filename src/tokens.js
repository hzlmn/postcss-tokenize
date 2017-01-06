"use strict";
var SINGLE_QUOTE = '\''.charCodeAt(0);
var DOUBLE_QUOTE = '"'.charCodeAt(0);
var BACKSLASH = '\\'.charCodeAt(0);
var SLASH = '/'.charCodeAt(0);
var NEWLINE = '\n'.charCodeAt(0);
var SPACE = ' '.charCodeAt(0);
var FEED = '\f'.charCodeAt(0);
var TAB = '\t'.charCodeAt(0);
var CR = '\r'.charCodeAt(0);
var OPEN_SQUARE = '['.charCodeAt(0);
var CLOSE_SQUARE = ']'.charCodeAt(0);
var OPEN_PARENTHESES = '('.charCodeAt(0);
var CLOSE_PARENTHESES = ')'.charCodeAt(0);
var OPEN_CURLY = '{'.charCodeAt(0);
var CLOSE_CURLY = '}'.charCodeAt(0);
var SEMICOLON = ';'.charCodeAt(0);
var ASTERISK = '*'.charCodeAt(0);
var COLON = ':'.charCodeAt(0);
var AT = '@'.charCodeAt(0);
/* List of all available toke types */
exports.TokenTypes = {
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
};
