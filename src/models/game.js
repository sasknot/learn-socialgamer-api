const { CommonModel, CommonCollection } = require('./_common')
const { MediaModel } = require('./media')
const { UserModel } = require('./user')
const { ConsoleModel } = require('./console')

const GameModel = CommonModel.extend({
  tableName: 'game',
  cover_obj () {
    return this.belongsTo(MediaModel, 'cover')
  },

  users () {
    return this.belongsToMany(UserModel, 'user_games', 'game', 'user')
  },

  consoles () {
    return this.belongsToMany(ConsoleModel, 'game_consoles', 'game', 'console')
  }
}, {
  relations: ['cover_obj', 'users', 'consoles']
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
