const { CommomModel, CommomCollection } = require('./_commom')
const { GameModel } = require('./game')
const { ConsoleModel } = require('./console')

const UserModel = CommomModel.extend({
  tableName: 'user',
  hidden: ['password'],

  games () {
    return this.belongsToMany(GameModel, 'user_games', 'user', 'game')
  },

  consoles () {
    return this.belongsToMany(ConsoleModel, 'user_consoles', 'user', 'console')
  }
})

const UserCollection = CommomCollection.extend({
  get model() {
    return UserModel
  }
})

module.exports = {
  UserModel,
  UserCollection
}
