const helper = require('../helper')
const { GameModel } = require('../../src/models/game')

beforeAll(async () => {
  await helper.syncDatabase()
})

describe('models/game', () => {
  test('insert', async () => {
    const data = {
      cover: 1,
      name: "Death Stranding",
      release_date: "2019-11-08",
      description: "Death Stranding is an action game developed by Kojima Productions. It is the first game from director Hideo Kojima and Kojima Productions after their disbandment from Konami in 2015."
    }
    const result = await GameModel.forge().save(data)
    const output = result.output()

    delete data.password

    expect(output).toMatchObject(data)
  })

  test('update', async () => {
    const result = await GameModel.forge({ id: 1 }).save({ name: 'Resident Evil 3' })
    const output = result.output()

    expect(output.name).toEqual('Resident Evil 3')
  })

  test('destroy', async () => {
    const result = await GameModel.forge({ id: 1 }).destroy()
    const output = result.output()

    expect(output).toEqual(expect.anything())
  })

  test('not insert', async () => {
    const data = {}
    const result = async () => {
      await GameModel.forge().save(data)
    }

    expect(result).rejects.toThrow()
  })

  test('not update', async () => {
    const lastId = await GameModel.findLastId()
    const result = async () => {
      await GameModel.forge({ id: (lastId+1) }).save({ name: 'Resident Evil 3' })
    }

    expect(result).rejects.toThrow(GameModel.NoRowsUpdatedError)
  })

  test('not destroy', async () => {
    const lastId = await GameModel.findLastId()
    const result = async () => {
      await GameModel.forge({ id: (lastId+1) }).destroy()
    }

    expect(result).rejects.toThrow(GameModel.NoRowsDeletedError)
  })
})

