const { CommomModel, CommomCollection } = require('./_commom')
const { UserModel } = require('./user')
const { ConsoleModel } = require('./console')

const GameModel = CommomModel.extend({
  tableName: 'game',

  users () {
    return this.belongsToMany(UserModel, 'user_games', 'game', 'user')
  },

  consoles () {
    return this.belongsToMany(ConsoleModel, 'game_consoles', 'game', 'console')
  }
})

const GameCollection = CommomCollection.extend({
  get model() {
    return GameModel
  }
})

module.exports = {
  GameModel,
  GameCollection
}
