const helper = require('../helper')
const { NotFoundError } = require('../../src/errors')
const { ConsoleModel } = require('../../src/models/console')

beforeAll(async () => {
  await helper.resetDatabase()
})

describe('models/console', () => {
  test('create', async () => {
    const data = {
      name: "Wii U",
      release_date: "2012-11-18",
      description: "The Wii U is a home video game console developed by Nintendo as the successor to the Wii. Released in late 2012, it is the first eighth-generation video game console and competed with Microsoft's Xbox One and Sony's PlayStation 4."
    }
    const result = await ConsoleModel.create(data)
    const output = result.output()

    expect(output).toMatchObject(data)
  })

  test('update', async () => {
    const result = await ConsoleModel.update({ id: 1 }, { name: 'Switch' })
    const output = result.output()

    expect(output.name).toEqual('Switch')
  })

  test('destroy', async () => {
    const result = await ConsoleModel.destroy({ id: 1 })

    expect(result).toBe(true)
  })

  test('not create', async () => {
    const data = {}
    const result = async () => {
      await ConsoleModel.create(data)
    }

    expect(result).rejects.toThrow()
  })

  test('not update', async () => {
    const result = async () => {
      await ConsoleModel.update({ id: 999 }, { name: 'Switch' })
    }

    expect(result).rejects.toThrow(NotFoundError)
  })

  test('not destroy', async () => {
    const result = await ConsoleModel.destroy({ id: 999 })

    expect(result).toBe(false)
  })
})

