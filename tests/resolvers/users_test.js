const util = require('util')
const TestHelper = require('../helper')

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
  games {
    id
  }
  consoles {
    id
  }
`

beforeAll(() => {
  this.token = '123'
})

describe('resolvers/users', () => {
  test('userCreate', async () => {
    const input = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123456',
      birthday: '1990-10-10',
      location: 'US',
      description: 'Hello my name is John Doe'
    }
    const { data } = await TestHelper.gqlMutate(this.token, {
      mutation: `
        userCreate (data: ${TestHelper.objectStringify(input)}) {
          ${fields}
        }
      `
    })

    delete input.password

    expect(data.userCreate).toMatchObject(input)
  })

  test('userRead', async () => {
    const { data } = await TestHelper.gqlQuery(this.token, {
      query: `
        userRead (id: 1) {
          ${fields}
        }
      `
    })

    expect(data.userRead).toHaveProperties(TestHelper.properties['user'])
  })

  test('userUpdate', async () => {
    const input = {
      name: 'John Python'
    }
    const { data } = await TestHelper.gqlMutate(this.token, {
      mutation: `
        userUpdate (id: 1, data: ${TestHelper.objectStringify(input)}) {
          ${fields}
        }
      `
    })

    expect(data.userUpdate).toMatchObject(input)
  })

  test('userDestroy', async () => {
    const { data } = await TestHelper.gqlMutate(this.token, {
      mutation: `
        userDestroy (id: 1)
      `
    })

    expect(data.userDestroy).toBe(true)
  })

  test('userList', async () => {
    const { data } = await TestHelper.gqlQuery(this.token, {
      query: `
        userList (page: 1, size: 10) {
          rows {
            ${fields}
          }
          paging {
            page
            total
            size
            count
          }
        }
      `
    })

    expect(data.userList.rows[0]).toHaveProperties(TestHelper.properties['user'])
  })
})
