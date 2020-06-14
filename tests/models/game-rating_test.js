const helper = require('../helper')
const { NotFoundError } = require('../../src/errors')
const { GameRatingModel } = require('../../src/models/game-rating')

beforeAll(async () => {
  await helper.syncDatabase()
})

describe('models/game-rating', () => {
  test('create', async () => {
    const data = {
      user: 1,
      game: 1,
      number: 3
    }
    const result = await GameRatingModel.create(data)
    const output = result.output()

    expect(output).toMatchObject(data)
  })

  test('update', async () => {
    const result = await GameRatingModel.update({ id: 1 }, { number: 5 })
    const output = result.output()

    expect(output.number).toEqual(5)
  })

  test('destroy', async () => {
    const result = await GameRatingModel.destroy({ id: 1 })

    expect(result).toBe(true)
  })

  test('not create', async () => {
    const data = {}
    const result = async () => {
      await GameRatingModel.create(data)
    }

    expect(result).rejects.toThrow()
  })

  test('not update', async () => {
    const result = async () => {
      await GameRatingModel.update({ id: 999 }, { number: 5 })
    }

    expect(result).rejects.toThrow(NotFoundError)
  })

  test('not destroy', async () => {
    const result = await GameRatingModel.destroy({ id: 999 })

    expect(result).toBe(false)
  })
})

