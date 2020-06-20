const { CommonModel, CommonCollection } = require('./_common')
const { UserModel } = require('./user')
const { GameModel } = require('./game')

const MediaModel = CommonModel.extend({
  tableName: 'media',

  users () {
    return this.hasMany(UserModel, 'avatar')
  },

  games () {
    return this.hasMany(GameModel, 'cover')
  }
})

const MediaCollection = CommonCollection.extend({
  get model() {
    return MediaModel
  }
})

module.exports = {
  MediaModel,
  MediaCollection
}
