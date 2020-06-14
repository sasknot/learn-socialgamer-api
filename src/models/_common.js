const knex = require('knex')
const bookshelf = require('bookshelf')
const config = require('../../knexfile')
const { NotFoundError } = require('../errors')

const database = bookshelf(knex(config))

const CommonModel = database.Model.extend({
  hasTimestamps: true,

  output (omitPivot = true) {
    return this.serialize({ omitPivot })
  }
}, {
  initialize () {
    this.constructor.__super__.initialize.apply(this, arguments)
  },

  async find (where = {}, fetchOptions = {}) {
    try {
      const result = await this.forge().where(where).fetch(fetchOptions)
      return result
    } catch (error) {
      if (error instanceof database.Model.NotFoundError) {
        return this.__super__
      }

      throw error
    }
  },

  async findLastId (order = 'desc') {
    const result = await this.forge().orderBy('id', order).fetch()
    return result.id
  },

  async create (data) {
    return this.forge().save(data)
  },

  async update (fields, data) {
    try {
      const result = await this.forge(fields).save(data)
      return result
    } catch (error) {
      if (error instanceof database.Model.NoRowsUpdatedError) {
        throw new NotFoundError(`Could not update with ${JSON.stringify(fields)}`)
      }

      throw error
    }
  },

  async destroy (fields) {
    try {
      await this.forge(fields).destroy()
      return true
    } catch (error) {
      if (error instanceof database.Model.NoRowsDeletedError) {
        return false
      }

      throw error
    }
  }
})

const CommonCollection = database.Collection.extend({
  output (omitPivot = true) {
    return {
      rows: this.serialize({ omitPivot }),
      paging: {
        page: this.pagination.page,
        total: this.pagination.pageCount,
        size: this.pagination.pageSize,
        count: this.pagination.rowCount
      }
    }
  }
}, {
  findWithPaging (page = 1, size = 10, options = {}) {
    const fetchOptions = {
      page,
      pageSize: size
    }
    options.where = options.where || {}
    options.order = options.order || [{ column: 'id', order: 'desc' }]

    return this
    .forge()
    .where(options.where)
    .query('orderBy', options.order)
    .fetchPage(fetchOptions)
  }
})

module.exports = {
  CommonModel,
  CommonCollection
}
