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

  async create (data, options = {}) {
    options = {
      ...options,
      method: 'insert',
      autoRefresh: true
    }

    return this.forge().save(data, options)
  },

  async update (fields, data, options = {}) {
    options = {
      ...options,
      method: 'update',
      patch: true,
      autoRefresh: true
    }

    try {
      const result = await this.forge(fields).save(data, options)
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
    options.where = options.where || {}
    options.order = options.order || [{ column: 'id', order: 'desc' }]

    let { where, order, ...fetchOptions } = options
    fetchOptions = {
      ...fetchOptions,
      page,
      pageSize: size
    }

    return this
    .forge()
    .where(where)
    .query('orderBy', order)
    .fetchPage(fetchOptions)
  }
})

module.exports = {
  CommonModel,
  CommonCollection
}
