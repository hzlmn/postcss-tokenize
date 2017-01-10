import test from 'ava'
import {InputStream} from '../src/stream'

test('InputStream should be defined', t => {
  t.deepEqual(typeof InputStream, 'function')
})

test('endOfFile should correctly check', t => {
  const stream = new InputStream('aaa')
  t.falsy(stream.endOfFile())

  stream.readNextChar()
  stream.readNextChar()
  stream.readNextChar()
  stream.readNextChar()

  t.truthy(stream.endOfFile())
})

test('stream simple characters', t => {
  const stream = new InputStream('aaB')

  // mock stream values
  const streamValues = [{
    code: 97,
    value: 'a',
    line: 1,
    column: 1
  }, {
    code: 97,
    value: 'a',
    line: 1,
    column: 2
  }, {
    code: 66,
    value: 'B',
    line: 1,
    column: 3
  }]

  var $id = 0
  while (!stream.endOfFile()) {
    t.deepEqual(streamValues[$id], stream.readNextChar())
    $id++
  }
})

// test('stream should jump to specific line', t => {
//   const stream = new InputStream('   a', 1, 4)

//   t.deepEqual({
//     code: 97,
//     value: 'a',
//     line: 1,
//     column: 4
//   }, stream.readNextChar())
// })

test('stream should produce error', t => {
  const stream = new InputStream(' a')
  const char = stream.readNextChar()
  t.throws(() => {
    stream.raiseException('message', char)
  })
})

