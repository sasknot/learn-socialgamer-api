const { CommonModel, CommonCollection } = require('./_common')
const { GameModel } = require('./game')
const { ConsoleModel } = require('./console')

const UserModel = CommonModel.extend({
  tableName: 'user',
  hidden: ['password'],
  relations: ['games', 'consoles'],

  games () {
    return this.belongsToMany(GameModel, 'user_games', 'user', 'game')
  },

  consoles () {
    return this.belongsToMany(ConsoleModel, 'user_consoles', 'user', 'console')
  }
})

const UserCollection = CommonCollection.extend({
  get model() {
    return UserModel
  }
})

module.exports = {
  UserModel,
  UserCollection
}
