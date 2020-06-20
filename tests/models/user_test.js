const helper = require('../helper')
const { NotFoundError } = require('../../src/errors')
const { UserModel } = require('../../src/models/user')

beforeAll(async () => {
  await helper.resetDatabase()
})

describe('models/user', () => {
  test('create', async () => {
    const data = {
      name: "Netochka Nezvanova",
      email: "netochka.nezvanova@gmail.com",
      password: "123456",
      birthday: "1988-01-01",
      location: "Europe",
      description: "Hello"
    }
    const result = await UserModel.create(data)
    const output = result.output()

    delete data.password

    expect(output).toMatchObject(data)
  })

  test('update', async () => {
    const result = await UserModel.update({ id: 1 }, { name: 'Luther Blissett' })
    const output = result.output()

    expect(output.name).toEqual('Luther Blissett')
  })

  test('destroy', async () => {
    const result = await UserModel.destroy({ id: 1 })

    expect(result).toBe(true)
  })

  test('not create', async () => {
    const data = {}
    const result = async () => {
      await UserModel.create(data)
    }

    expect(result).rejects.toThrow()
  })

  test('not update', async () => {
    const result = async () => {
      await UserModel.update({ id: 999 }, { name: 'Luther Blissett' })
    }

    expect(result).rejects.toThrow(NotFoundError)
  })

  test('not destroy', async () => {
    const result = await UserModel.destroy({ id: 999 })

    expect(result).toBe(false)
  })
})

