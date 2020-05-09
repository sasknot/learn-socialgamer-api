const { UserModel, UserCollection } = require('../models/user');

exports = {
  Query: {
    async userList (root, args, context) {
      const { page, pageSize, filters } = args
      const result = await UserCollection.findWithPaging({ page: 1, pageSize: 10 })
      const output = result.outputWithPaging()

      return output
    },

    async userGet (root, args, context) {
      const { req } = context
      const result = await UserModel.find({ id: req.params.id })
      const output = result.output()

      return output
    }
  },

  Mutation: {
    async userInsert (root, args, context) {
      const { req } = context
      const result = await UserModel.forge().save(req.body)
      const output = result.output()

      return output
    },

    async userUpdate (root, args, context) {
      const { req } = context
      const result = await UserModel.forge({ id: req.params.id }).save(req.body)
      const output = result.output()

      return output
    },

    async userDestroy (root, args, context) {
      const { req } = context
      const result = await UserModel.forge({ id: req.params.id }).destroy()
      const output = result.output()

      return output
    }
  }
}
