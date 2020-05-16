const { token } = require('../../src/helpers')

beforeAll(() => {
  this.data = { user: { id: 1 } }
})

describe('helpers/token', () => {
  test('encode', () => {
    const output = token.encode(this.data)

    expect(output).toMatch('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.')
  })

  test('decode', () => {
    const encoded = token.encode(this.data)
    const output = token.decode(encoded)

    expect(output).toMatchObject(this.data)
  })
})
