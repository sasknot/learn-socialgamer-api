const { UserModel, UserCollection } = require('../models/user');
const { requestUtils } = require('../helpers')

module.exports = {
  Query: {
    async userList (root, args, context) {
      const params = requestUtils.getParams(args)
      const result = await UserCollection.findWithPaging(params)
      const output = result.outputWithPaging()

      return output
    },

    async userGet (root, args, context) {
      const id = requestUtils.getId(args)
      const result = await UserModel.find({ id })
      const output = result.output()

      return output
    }
  },

  // Mutation: {
  //   async userInsert (root, args, context) {
  //     const { req } = context
  //     const result = await UserModel.forge().save(req.body)
  //     const output = result.output()

  //     return output
  //   },

  //   async userUpdate (root, args, context) {
  //     const { req } = context
  //     const result = await UserModel.forge({ id: req.params.id }).save(req.body)
  //     const output = result.output()

  //     return output
  //   },

  //   async userDestroy (root, args, context) {
  //     const { req } = context
  //     const result = await UserModel.forge({ id: req.params.id }).destroy()
  //     const output = result.output()

  //     return output
  //   }
  // }
}
