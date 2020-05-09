const database = require('../services/database')

const CommomModel = database.Model.extend({
  hasTimestamps: true,

  output (omitPivot=true) {
    return this.serialize({ omitPivot })
  }
}, {
  initialize () {
    this.constructor.__super__.initialize.apply(this, arguments)
  },

  find (where={}) {
    return this
    .forge()
    .where(where)
    .fetch({ withRelated: ['games', 'consoles'] })
  },

  async findLastId () {
    const result = await this.forge().orderBy('id', 'desc').fetch()

    return result.id
  }
})

const CommomCollection = database.Collection.extend({
  outputWithPaging (omitPivot=true) {
    return {
      rows: this.serialize({ omitPivot }),
      pagination: this.pagination
    }
  }
}, {
  findWithPaging ({ page=1, pageSize=10, where={}, order=[{ column: 'id', order: 'desc' }] }) {
    return this
    .forge()
    .where(where)
    .query('orderBy', order)
    .fetchPage({
      page,
      pageSize,
      withRelated: ['games', 'consoles']
    })
  }
})

module.exports = {
  CommomModel,
  CommomCollection
}
