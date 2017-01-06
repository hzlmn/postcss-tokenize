"use strict";
var stream_1 = require('./stream');
/**
 * @class Tokenizer
 * Base class for working with tokens
 *
 * @param  {string} source
 * @param  {IConfiguration} options?
 */
var Tokenizer = (function () {
    function Tokenizer(source, options) {
        this.$stream = new stream_1.InputStream(source);
        this.source = source;
        this.options = options;
        this.length = this.source.length;
    }
    /**
     * Read next token value
     * @returns IToken
     */
    Tokenizer.prototype.readNextToken = function () { };
    /**
     * Driver for working with list of tokens
     */
    Tokenizer.prototype.tokenize = function () {
        var tokens = [];
        while (!this.$stream.endOfFile()) {
            tokens.push(this.readNextToken());
        }
        return tokens;
    };
    return Tokenizer;
}());
exports.Tokenizer = Tokenizer;
/* This is for backward compatibility with old mode */
function tokenize(input, options) {
    var tokenizer = new Tokenizer(input, options);
    return tokenizer.tokenize();
}
exports.tokenize = tokenize;
