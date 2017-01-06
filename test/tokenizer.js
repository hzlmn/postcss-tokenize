/**
 * Port of test cases from postcss tokenizer
 * for granting backward compatibility
 */
"use strict";
var ava_1 = require('ava');
function run(t, css, opts, tokens) {
    if (typeof tokens === 'undefined')
        _a = [opts, tokens], tokens = _a[0], opts = _a[1];
    t.deepEqual(tokenize(new Input(css, opts)), tokens);
    var _a;
}
function ignoreRun(t, css, tokens) {
    t.deepEqual(tokenize(new Input(css), { ignoreErrors: true }), tokens);
}
ava_1.default('tokenizes empty file', function (t) {
    run(t, '', []);
});
ava_1.default('tokenizes space', function (t) {
    run(t, '\r\n \f\t', [['space', '\r\n \f\t']]);
});
ava_1.default('tokenizes word', function (t) {
    run(t, 'ab', [['word', 'ab', 1, 1, 1, 2]]);
});
ava_1.default('splits word by !', function (t) {
    run(t, 'aa!bb', [
        ['word', 'aa', 1, 1, 1, 2],
        ['word', '!bb', 1, 3, 1, 5]
    ]);
});
ava_1.default('changes lines in spaces', function (t) {
    run(t, 'a \n b', [
        ['word', 'a', 1, 1, 1, 1],
        ['space', ' \n '],
        ['word', 'b', 2, 2, 2, 2]
    ]);
});
ava_1.default('tokenizes control chars', function (t) {
    run(t, '{:;}', [
        ['{', '{', 1, 1],
        [':', ':', 1, 2],
        [';', ';', 1, 3],
        ['}', '}', 1, 4]
    ]);
});
ava_1.default('escapes control symbols', function (t) {
    run(t, '\\(\\{\\"\\@\\\\""', [
        ['word', '\\(', 1, 1, 1, 2],
        ['word', '\\{', 1, 3, 1, 4],
        ['word', '\\"', 1, 5, 1, 6],
        ['word', '\\@', 1, 7, 1, 8],
        ['word', '\\\\', 1, 9, 1, 10],
        ['string', '""', 1, 11, 1, 12]
    ]);
});
ava_1.default('escapes backslash', function (t) {
    run(t, '\\\\\\\\{', [
        ['word', '\\\\\\\\', 1, 1, 1, 4],
        ['{', '{', 1, 5]
    ]);
});
ava_1.default('tokenizes simple brackets', function (t) {
    run(t, '(ab)', [['brackets', '(ab)', 1, 1, 1, 4]]);
});
ava_1.default('tokenizes square brackets', function (t) {
    run(t, 'a[bc]', [
        ['word', 'a', 1, 1, 1, 1],
        ['[', '[', 1, 2],
        ['word', 'bc', 1, 3, 1, 4],
        [']', ']', 1, 5]
    ]);
});
ava_1.default('tokenizes complicated brackets', function (t) {
    run(t, '(())("")(/**/)(\\\\)(\n)(', [
        ['(', '(', 1, 1],
        ['brackets', '()', 1, 2, 1, 3],
        [')', ')', 1, 4],
        ['(', '(', 1, 5],
        ['string', '""', 1, 6, 1, 7],
        [')', ')', 1, 8],
        ['(', '(', 1, 9],
        ['comment', '/**/', 1, 10, 1, 13],
        [')', ')', 1, 14],
        ['(', '(', 1, 15],
        ['word', '\\\\', 1, 16, 1, 17],
        [')', ')', 1, 18],
        ['(', '(', 1, 19],
        ['space', '\n'],
        [')', ')', 2, 1],
        ['(', '(', 2, 2]
    ]);
});
ava_1.default('tokenizes string', function (t) {
    run(t, '\'"\'"\\""', [
        ['string', '\'"\'', 1, 1, 1, 3],
        ['string', '"\\""', 1, 4, 1, 7]
    ]);
});
ava_1.default('tokenizes escaped string', function (t) {
    run(t, '"\\\\"', [['string', '"\\\\"', 1, 1, 1, 4]]);
});
ava_1.default('changes lines in strings', function (t) {
    run(t, '"\n\n""\n\n"', [
        ['string', '"\n\n"', 1, 1, 3, 1],
        ['string', '"\n\n"', 3, 2, 5, 1]
    ]);
});
ava_1.default('tokenizes at-word', function (t) {
    run(t, '@word ', [['at-word', '@word', 1, 1, 1, 5], ['space', ' ']]);
});
ava_1.default('tokenizes at-word end', function (t) {
    run(t, '@one{@two()@three""@four;', [
        ['at-word', '@one', 1, 1, 1, 4],
        ['{', '{', 1, 5],
        ['at-word', '@two', 1, 6, 1, 9],
        ['brackets', '()', 1, 10, 1, 11],
        ['at-word', '@three', 1, 12, 1, 17],
        ['string', '""', 1, 18, 1, 19],
        ['at-word', '@four', 1, 20, 1, 24],
        [';', ';', 1, 25]
    ]);
});
ava_1.default('tokenizes urls', function (t) {
    run(t, 'url(/*\\))', [['word', 'url', 1, 1, 1, 3],
        ['brackets', '(/*\\))', 1, 4, 1, 9]]);
});
ava_1.default('tokenizes quoted urls', function (t) {
    run(t, 'url(")")', [['word', 'url', 1, 1, 1, 3],
        ['(', '(', 1, 4],
        ['string', '")"', 1, 5, 1, 7],
        [')', ')', 1, 8]]);
});
ava_1.default('tokenizes at-symbol', function (t) {
    run(t, '@', [['at-word', '@', 1, 1, 1, 1]]);
});
ava_1.default('tokenizes comment', function (t) {
    run(t, '/* a\nb */', [['comment', '/* a\nb */', 1, 1, 2, 4]]);
});
ava_1.default('changes lines in comments', function (t) {
    run(t, 'a/* \n */b', [
        ['word', 'a', 1, 1, 1, 1],
        ['comment', '/* \n */', 1, 2, 2, 3],
        ['word', 'b', 2, 4, 2, 4]
    ]);
});
ava_1.default('supports line feed', function (t) {
    run(t, 'a\fb', [
        ['word', 'a', 1, 1, 1, 1],
        ['space', '\f'],
        ['word', 'b', 2, 1, 2, 1]
    ]);
});
ava_1.default('supports carriage return', function (t) {
    run(t, 'a\rb\r\nc', [
        ['word', 'a', 1, 1, 1, 1],
        ['space', '\r'],
        ['word', 'b', 2, 1, 2, 1],
        ['space', '\r\n'],
        ['word', 'c', 3, 1, 3, 1]
    ]);
});
ava_1.default('tokenizes CSS', function (t) {
    var css = 'a {\n' +
        '  content: "a";\n' +
        '  width: calc(1px;)\n' +
        '  }\n' +
        '/* small screen */\n' +
        '@media screen {}';
    run(t, css, [
        ['word', 'a', 1, 1, 1, 1],
        ['space', ' '],
        ['{', '{', 1, 3],
        ['space', '\n  '],
        ['word', 'content', 2, 3, 2, 9],
        [':', ':', 2, 10],
        ['space', ' '],
        ['string', '"a"', 2, 12, 2, 14],
        [';', ';', 2, 15],
        ['space', '\n  '],
        ['word', 'width', 3, 3, 3, 7],
        [':', ':', 3, 8],
        ['space', ' '],
        ['word', 'calc', 3, 10, 3, 13],
        ['brackets', '(1px;)', 3, 14, 3, 19],
        ['space', '\n  '],
        ['}', '}', 4, 3],
        ['space', '\n'],
        ['comment', '/* small screen */', 5, 1, 5, 18],
        ['space', '\n'],
        ['at-word', '@media', 6, 1, 6, 6],
        ['space', ' '],
        ['word', 'screen', 6, 8, 6, 13],
        ['space', ' '],
        ['{', '{', 6, 15],
        ['}', '}', 6, 16]
    ]);
});
ava_1.default('throws error on unclosed string', function (t) {
    t.throws(function () {
        tokenize(new Input(' "'));
    }, /:1:2: Unclosed string/);
});
ava_1.default('throws error on unclosed comment', function (t) {
    t.throws(function () {
        tokenize(new Input(' /*'));
    }, /:1:2: Unclosed comment/);
});
ava_1.default('throws error on unclosed url', function (t) {
    t.throws(function () {
        tokenize(new Input('url('));
    }, /:1:4: Unclosed bracket/);
});
ava_1.default('ignores unclosing string on request', function (t) {
    ignoreRun(t, ' "', [['space', ' '], ['string', '\"', 1, 2, 1, 3]]);
});
ava_1.default('ignores unclosing comment on request', function (t) {
    ignoreRun(t, ' /*', [['space', ' '], ['comment', '/*', 1, 2, 1, 4]]);
});
ava_1.default('ignores unclosing comment on request', function (t) {
    ignoreRun(t, 'url(', [
        ['word', 'url', 1, 1, 1, 3],
        ['brackets', '(', 1, 4, 1, 4]
    ]);
});
