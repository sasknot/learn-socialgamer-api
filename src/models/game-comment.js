const { CommonModel, CommonCollection } = require('./_common')

const GameCommentModel = CommonModel.extend({
  tableName: 'game_comment'
})

const GameCommentCollection = CommonCollection.extend({
  get model() {
    return GameCommentModel
  }
})

module.exports = {
  GameCommentModel,
  GameCommentCollection
}
