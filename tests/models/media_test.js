const helper = require('../helper')
const { NotFoundError } = require('../../src/errors')
const { MediaModel } = require('../../src/models/media')

beforeAll(async () => {
  await helper.resetDatabase()
})

describe('models/media', () => {
  test('create', async () => {
    const data = {
      filename: "cover-1.png",
      url: "files/cover-1.png",
      mimetype: "image/png",
      kb_size: 300
    }
    const result = await MediaModel.create(data)
    const output = result.output()

    expect(output).toMatchObject(data)
  })

  test('update', async () => {
    const result = await MediaModel.update({ id: 1 }, { filename: 'cover-alt.png' })
    const output = result.output()

    expect(output.filename).toEqual('cover-alt.png')
  })

  test('destroy', async () => {
    const result = await MediaModel.destroy({ id: 1 })

    expect(result).toBe(true)
  })

  test('not create', async () => {
    const data = {}
    const result = async () => {
      await MediaModel.create(data)
    }

    expect(result).rejects.toThrow()
  })

  test('not update', async () => {
    const result = async () => {
      await MediaModel.update({ id: 999 }, { filename: 'cover-alt.png' })
    }

    expect(result).rejects.toThrow(NotFoundError)
  })

  test('not destroy', async () => {
    const result = await MediaModel.destroy({ id: 999 })

    expect(result).toBe(false)
  })
})

