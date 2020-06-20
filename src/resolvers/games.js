const { GameModel, GameCollection } = require('../models/game')
const { requestUtils } = require('../helpers')

module.exports = {
  Query: {
    async gameList (root, args, context) {
      const { page, size } = args
      const result = await GameCollection.findWithPaging(page, size, {
        withRelated: GameModel.relations
      })
      const output = result.output()

      return output
    },

    async gameRead (root, args, context) {
      const id = requestUtils.getId(args)
      const result = await GameModel.find({ id }, {
        withRelated: GameModel.relations
      })
      const output = result.output()

      return requestUtils.mustReturn(output)
    }
  },

  Mutation: {
    async gameCreate (root, args, context) {
      const { data } = args
      const result = await GameModel.create(data)
      const output = (await result.fetch({
        withRelated: GameModel.relations
      })).output()

      return output
    },

    async gameUpdate (root, args, context) {
      const id = requestUtils.getId(args)
      const { data } = args
      const result = await GameModel.update({ id }, data)
      const output = (await result.fetch({
        withRelated: GameModel.relations
      })).output()

      return output
    },

    async gameDestroy (root, args, context) {
      const id = requestUtils.getId(args)
      const result = await GameModel.destroy({ id })

      return result
    }
  }
}
