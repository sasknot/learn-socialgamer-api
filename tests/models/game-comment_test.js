const helper = require('../helper')
const { NotFoundError } = require('../../src/errors')
const { GameCommentModel } = require('../../src/models/game-comment')

beforeAll(async () => {
  await helper.resetDatabase()
})

describe('models/game-comment', () => {
  test('create', async () => {
    const data = {
      user: 1,
      game: 1,
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat voluptas fuga explicabo libero commodi dolorem deserunt id architecto ducimus numquam sit nihil dolores aspernatur magni, laudantium, velit adipisci aliquid odit.'
    }
    const result = await GameCommentModel.create(data)
    const output = result.output()

    expect(output).toMatchObject(data)
  })

  test('update', async () => {
    const result = await GameCommentModel.update({ id: 1 }, { message: 'Lorem ipsum dolor sit amet' })
    const output = result.output()

    expect(output.message).toEqual('Lorem ipsum dolor sit amet')
  })

  test('destroy', async () => {
    const result = await GameCommentModel.destroy({ id: 1 })

    expect(result).toBe(true)
  })

  test('not create', async () => {
    const data = {}
    const result = async () => {
      await GameCommentModel.create(data)
    }

    expect(result).rejects.toThrow()
  })

  test('not update', async () => {
    const result = async () => {
      await GameCommentModel.update({ id: 999 }, { message: 5 })
    }

    expect(result).rejects.toThrow(NotFoundError)
  })

  test('not destroy', async () => {
    const result = await GameCommentModel.destroy({ id: 999 })

    expect(result).toBe(false)
  })
})

