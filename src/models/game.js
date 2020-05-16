const { CommonModel, CommonCollection } = require('./_common')
const { UserModel } = require('./user')
const { ConsoleModel } = require('./console')

const GameModel = CommonModel.extend({
  tableName: 'game',

  users () {
    return this.belongsToMany(UserModel, 'user_games', 'game', 'user')
  },

  consoles () {
    return this.belongsToMany(ConsoleModel, 'game_consoles', 'game', 'console')
  }
})

const GameCollection = CommonCollection.extend({
  get model() {
    return GameModel
  }
})

module.exports = {
  GameModel,
  GameCollection
}
