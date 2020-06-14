const { CommonModel, CommonCollection } = require('./_common')

const GameRatingModel = CommonModel.extend({
  tableName: 'game_rating'
})

const GameRatingCollection = CommonCollection.extend({
  get model() {
    return GameRatingModel
  }
})

module.exports = {
  GameRatingModel,
  GameRatingCollection
}
