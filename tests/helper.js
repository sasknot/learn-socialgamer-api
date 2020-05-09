const database = require('../services/database')

const syncDatabase = async () => {
  await database.knex.migrate.latest()
  await database.knex.seed.run()
  await database.knex.seed.run({
    directory: './tests/fixtures'
  })
}

module.exports = {
  syncDatabase
}
