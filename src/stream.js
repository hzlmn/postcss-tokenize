"use strict";
var errors_1 = require('./errors');
/* Base class for working with character stream */
var InputStream = (function () {
    function InputStream(source, position) {
        this.source = source;
        this.$length = this.source.length;
        this.pos = 0;
        this.line = 1;
        this.offset = -1;
        this.char = null;
    }
    InputStream.prototype.getInitialPosition = function () {
    };
    InputStream.prototype.readNextChar = function () {
    };
    /**
     * Get current Character
     */
    InputStream.prototype.getCurrentChar = function () {
        return this.char;
    };
    /**
     * Check if end of file was reached
     */
    InputStream.prototype.endOfFile = function () {
        return this.pos > this.$length;
    };
    /**
     * Raise expection on unknown character
     *
     * @param  {string} message
     * @param  {Character} char
     *
     * @throws UnknownCharError
     */
    InputStream.prototype.raiseException = function (message, char) {
        throw new errors_1.UnknownCharError(message, char);
    };
    return InputStream;
}());
exports.InputStream = InputStream;
