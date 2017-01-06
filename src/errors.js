"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* Base error class for tokenizer */
var CSSSyntaxError = (function (_super) {
    __extends(CSSSyntaxError, _super);
    function CSSSyntaxError(message) {
        _super.call(this, message);
    }
    return CSSSyntaxError;
}(Error));
exports.CSSSyntaxError = CSSSyntaxError;
/* Placholder for now */
var UnknownCharError = (function (_super) {
    __extends(UnknownCharError, _super);
    function UnknownCharError(message, char) {
        _super.call(this, message);
        this.char = char;
    }
    return UnknownCharError;
}(Error));
exports.UnknownCharError = UnknownCharError;
