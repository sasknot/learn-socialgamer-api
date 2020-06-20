const Knex = require('knex')
const knexConfig = require('../knexfile')

class TestHelper {
  static properties = {
    paging: ['page', 'total', 'size', 'count'],
    user: ['id'],
    game: ['id']
  }

  /**
   * Sync database
   */
  static async resetDatabase () {
    const knex = Knex(knexConfig)
    await knex.migrate.rollback({ directory: knexConfig.migrations.directory }, true)
    await knex.migrate.latest()

    if (knexConfig.client === 'mysql') {
      await knex.raw('SET FOREIGN_KEY_CHECKS = 0;')
    }

    await knex.seed.run()

    if (knexConfig.client === 'mysql') {
      await knex.raw('SET FOREIGN_KEY_CHECKS = 1;')
    }
  }
}

module.exports = TestHelper
