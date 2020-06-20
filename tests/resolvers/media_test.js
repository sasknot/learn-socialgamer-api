const helper = require('../helper')
const apollo = require('../apollo')

const fields = `
  id
  cover {
    id
    filename
    url
  }
  name
  release_date
  description
  created_at
  updated_at
  ratings {
    id
  }
  comments {
    id
  }
  consoles {
    id
  }
  users {
    id
  }
`

beforeAll(async () => {
  await helper.resetDatabase()
  this.connection = new apollo('123')
})

afterAll(() => {
  delete this.connection
})

describe('resolvers/games', () => {
  test.only('mediaCreate', async () => {
    const data = {
      filename: "cover-1.png",
      url: "files/cover-1.png",
      mimetype: "image/png",
      kb_size: 300
    }
    const { data: result } = await this.connection.mutate({
      name: 'mediaCreate',
      input: { data },
      fields
    })

    expect(result.mediaCreate).toMatchObject(data)
  })

  test('mediaRead', async () => {
    const { data: result } = await this.connection.query({
      name: 'mediaRead',
      input: { id: 1 },
      fields
    })

    expect(result.mediaRead).toHaveProperties(helper.properties['media'])
  })

  test('mediaDestroy', async () => {
    const { data: result } = await this.connection.mutate({
      name: 'mediaDestroy',
      input: { id: 1 }
    })

    expect(result.mediaDestroy).toBe(true)
  })

  test('mediaList', async () => {
    const { data: result } = await this.connection.query({
      name: 'mediaList',
      input: { page: 1, size: 10 },
      fields: `
        rows {
          ${fields}
        }
        paging {
          page
          total
          size
          count
        }
      `
    })

    expect(result.mediaList.rows[0]).toHaveProperties(helper.properties['media'])
    expect(result.mediaList.paging).toHaveProperties(helper.properties['paging'])
  })
})
