const { requestUtils, token } = require('../../src/helpers')

beforeAll(() => {
  this.data = { user: { id: 1 } }
})

afterAll(() => {
  delete this.data
})

describe('helpers/requestUtils', () => {
  test('requireAuth', () => {
    const userToken = token.encode(this.data)
    const output = requestUtils.requireAuth({ user: this.data, token: userToken })

    expect(output).toBe(true)
  })

  test('getParams', () => {
    const args = { page: 1, pageSize: 10 }
    const output = requestUtils.getParams(args)

    expect(output).toEqual(args)
  })

  test('getId', () => {
    const args = { id: 1, param: false }
    const output = requestUtils.getId(args)

    expect(output).toBe(args.id)
  })
})
