const { CommomModel, CommomCollection } = require('./_commom')
const { UserModel } = require('./user')
const { GameModel } = require('./game')

const ConsoleModel = CommomModel.extend({
  tableName: 'console',

  users () {
    return this.belongsToMany(UserModel, 'user_consoles', 'console', 'user')
  },

  games () {
    return this.belongsToMany(GameModel, 'game_consoles', 'console', 'game')
  }
})

const ConsoleCollection = CommomCollection.extend({
  get model() {
    return ConsoleModel
  }
})

module.exports = {
  ConsoleModel,
  ConsoleCollection
}

