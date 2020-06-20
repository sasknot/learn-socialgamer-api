const helper = require('../helper')
const { NotFoundError } = require('../../src/errors')
const { GameModel } = require('../../src/models/game')

beforeAll(async () => {
  await helper.resetDatabase()
})

describe('models/game', () => {
  test('create', async () => {
    const data = {
      cover: 1,
      name: "Death Stranding",
      release_date: "2019-11-08",
      description: "Death Stranding is an action game developed by Kojima Productions. It is the first game from director Hideo Kojima and Kojima Productions after their disbandment from Konami in 2015."
    }
    const result = await GameModel.create(data)
    const output = result.output()

    expect(output).toMatchObject(data)
  })

  test('update', async () => {
    const result = await GameModel.update({ id: 1 }, { name: 'Resident Evil 3' })
    const output = result.output()

    expect(output.name).toEqual('Resident Evil 3')
  })

  test('destroy', async () => {
    const result = await GameModel.destroy({ id: 1 })

    expect(result).toBe(true)
  })

  test('not create', async () => {
    const data = {}
    const result = async () => {
      await GameModel.create(data)
    }
    expect(result).rejects.toThrow()
  })

  test('not update', async () => {
    const result = async () => {
      await GameModel.update({ id: 999 }, { name: 'Resident Evil 3' })
    }
    expect(result).rejects.toThrow(NotFoundError)
  })

  test('not destroy', async () => {
    const result = await GameModel.destroy({ id: 999 })
    expect(result).toBe(false)
  })
})

