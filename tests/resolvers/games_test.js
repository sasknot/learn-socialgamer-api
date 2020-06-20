const helper = require('../helper')
const apollo = require('../apollo')

const fields = `
  id
  cover
  cover_obj {
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
  test('gameCreate', async () => {
    const data = {
      cover: 1,
      name: "Death Stranding",
      release_date: "2019-11-08",
      description: "Death Stranding is an action game developed by Kojima Productions. It is the first game from director Hideo Kojima and Kojima Productions after their disbandment from Konami in 2015."
    }
    const { data: result } = await this.connection.mutate({
      name: 'gameCreate',
      input: { data },
      fields
    })

    expect(result.gameCreate).toMatchObject(data)
  })

  test('gameRead', async () => {
    const { data: result } = await this.connection.query({
      name: 'gameRead',
      input: { id: 1 },
      fields
    })

    expect(result.gameRead).toHaveProperties(helper.properties['user'])
  })

  test('gameUpdate', async () => {
    const data = {
      name: 'Resident Evil 3'
    }
    const { data: result } = await this.connection.mutate({
      name: 'gameUpdate',
      input: { id: 1, data },
      fields
    })

    expect(data.gameUpdate).toMatchObject(data)
  })

  test('gameDestroy', async () => {
    const { data: result } = await this.connection.mutate({
      name: 'gameDestroy',
      input: { id: 1 }
    })

    expect(result.gameDestroy).toBe(true)
  })

  test('gameList', async () => {
    const { data: result } = await this.connection.query({
      name: 'gameList',
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

    expect(result.gameList.rows[0]).toHaveProperties(helper.properties['game'])
    expect(result.gameList.paging).toHaveProperties(helper.properties['paging'])
  })
})
