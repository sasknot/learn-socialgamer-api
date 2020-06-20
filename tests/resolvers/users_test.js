const helper = require('../helper')
const apollo = require('../apollo')

const fields = `
  id
  avatar {
    id
    filename
    url
  }
  name
  email
  birthday
  location
  description
  created_at
  updated_at
  friends {
    id
  }
  games {
    id
  }
  consoles {
    id
  }
  game_ratings {
    id
  }
  game_comments {
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

describe('resolvers/users', () => {
  test('userCreate', async () => {
    const data = {
      name: "Netochka Nezvanova",
      email: "netochka.nezvanova@gmail.com",
      password: "123456",
      birthday: "1988-01-01",
      location: "Europe",
      description: "Hello"
    }
    const { data: result } = await this.connection.mutate({
      name: 'userCreate',
      input: { data },
      fields
    })

    delete data.password

    expect(result.userCreate).toMatchObject(data)
  })

  test('userRead', async () => {
    const { data: result } = await this.connection.query({
      name: 'userRead',
      input: { id: 1 },
      fields
    })

    expect(result.userRead).toHaveProperties(helper.properties['user'])
  })

  test('userUpdate', async () => {
    const data = {
      name: 'Luther Blissett'
    }
    const { data: result } = await this.connection.mutate({
      name: 'userUpdate',
      input: { id: 1, data },
      fields
    })

    expect(result.userUpdate).toMatchObject(data)
  })

  test('userDestroy', async () => {
    const { data: result } = await this.connection.mutate({
      name: 'userDestroy',
      input: { id: 1 }
    })

    expect(result.userDestroy).toBe(true)
  })

  test('userList', async () => {
    const { data: result } = await this.connection.query({
      name: 'userList',
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

    expect(result.userList.rows[0]).toHaveProperties(helper.properties['user'])
    expect(result.userList.paging).toHaveProperties(helper.properties['paging'])
  })
})
