const helper = require('../helper')
const { UserModel } = require('../../src/models/user')

beforeAll(async () => {
  await helper.syncDatabase()
})

describe('models/user', () => {
  test('insert', async () => {
    const data = {
      name: "Netochka Nezvanova",
      email: "netochka.nezvanova@gmail.com",
      password: "123456",
      birthday: "1988-01-01",
      location: "Europe",
      description: "Hello"
    }
    const result = await UserModel.forge().save(data)
    const output = result.output()

    delete data.password

    expect(output).toMatchObject(data)
  })

  test('update', async () => {
    const result = await UserModel.forge({ id: 1 }).save({ name: 'Luther Blissett' })
    const output = result.output()

    expect(output.name).toEqual('Luther Blissett')
  })

  test('destroy', async () => {
    const result = await UserModel.forge({ id: 1 }).destroy()
    const output = result.output()

    expect(output).toEqual(expect.anything())
  })

  test('not insert', async () => {
    const data = {}
    const result = async () => {
      await UserModel.forge().save(data)
    }

    expect(result).rejects.toThrow()
  })

  test('not update', async () => {
    const lastId = await UserModel.findLastId()
    const result = async () => {
      await UserModel.forge({ id: (lastId+1) }).save({ name: 'Luther Blissett' })
    }

    expect(result).rejects.toThrow(UserModel.NoRowsUpdatedError)
  })

  test('not destroy', async () => {
    const lastId = await UserModel.findLastId()
    const result = async () => {
      await UserModel.forge({ id: (lastId+1) }).destroy()
    }

    expect(result).rejects.toThrow(UserModel.NoRowsDeletedError)
  })
})

