const { MediaModel, MediaCollection } = require('../models/media')
const { requestUtils } = require('../helpers')

module.exports = {
  Query: {
    async mediaList (root, args, context) {
      const { page, size } = args
      const result = await MediaCollection.findWithPaging(page, size)
      const output = result.output()

      return output
    },

    async mediaRead (root, args, context) {
      const id = requestUtils.getId(args)
      const result = await MediaModel.find({ id })
      const output = result.output()

      return requestUtils.mustReturn(output)
    }
  },

  Mutation: {
    async mediaCreate (root, args, context) {
      const { data } = args
      const result = await MediaModel.create(data)
      const output = result.output()

      return output
    },

    async mediaDestroy (root, args, context) {
      const id = requestUtils.getId(args)
      const result = await MediaModel.destroy({ id })

      return result
    }
  }
}
