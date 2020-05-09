const helper = require('../helper')
const { ConsoleModel } = require('../../src/models/console')

beforeAll(async () => {
  await helper.syncDatabase()
})

describe('models/console', () => {
  test('insert', async () => {
    const data = {
      name: "Wii U",
      release_date: "2012-11-18",
      description: "The Wii U is a home video game console developed by Nintendo as the successor to the Wii. Released in late 2012, it is the first eighth-generation video game console and competed with Microsoft's Xbox One and Sony's PlayStation 4."
    }
    const result = await ConsoleModel.forge().save(data)
    const output = result.output()

    delete data.password

    expect(output).toMatchObject(data)
  })

  test('update', async () => {
    const result = await ConsoleModel.forge({ id: 1 }).save({ name: 'Switch' })
    const output = result.output()

    expect(output.name).toEqual('Switch')
  })

  test('destroy', async () => {
    const result = await ConsoleModel.forge({ id: 1 }).destroy()
    const output = result.output()

    expect(output).toEqual(expect.anything())
  })

  test('not insert', async () => {
    const data = {}
    const result = async () => {
      await ConsoleModel.forge().save(data)
    }

    expect(result).rejects.toThrow()
  })

  test('not update', async () => {
    const lastId = await ConsoleModel.findLastId()
    const result = async () => {
      await ConsoleModel.forge({ id: (lastId+1) }).save({ name: 'Switch' })
    }

    expect(result).rejects.toThrow(ConsoleModel.NoRowsUpdatedError)
  })

  test('not destroy', async () => {
    const lastId = await ConsoleModel.findLastId()
    const result = async () => {
      await ConsoleModel.forge({ id: (lastId+1) }).destroy()
    }

    expect(result).rejects.toThrow(ConsoleModel.NoRowsDeletedError)
  })
})

