const { CommonModel, CommonCollection } = require('./_common')
const { UserModel } = require('./user')
const { GameModel } = require('./game')

const ConsoleModel = CommonModel.extend({
  tableName: 'console',
  relations: [],

  users () {
    return this.belongsToMany(UserModel, 'user_consoles', 'console', 'user')
  },

  games () {
    return this.belongsToMany(GameModel, 'game_consoles', 'console', 'game')
  }
})

const ConsoleCollection = CommonCollection.extend({
  get model() {
    return ConsoleModel
  }
})

module.exports = {
  ConsoleModel,
  ConsoleCollection
}

