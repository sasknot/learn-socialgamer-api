const { UserModel, UserCollection } = require('../models/user')
const { requestUtils } = require('../helpers')

module.exports = {
  Query: {
    async userList (root, args, context) {
      const { page, size } = args
      const result = await UserCollection.findWithPaging(page, size, {
        withRelated: UserModel.relations
      })
      const output = result.output()

      return output
    },

    async userRead (root, args, context) {
      const id = requestUtils.getId(args)
      const result = await UserModel.find({ id }, {
        withRelated: UserModel.relations
      })
      const output = result.output()

      return requestUtils.mustReturn(output)
    }
  },

  Mutation: {
    async userCreate (root, args, context) {
      const { data } = args
      const result = await UserModel.create(data)
      const output = result.output()

      return output
    },

    async userUpdate (root, args, context) {
      const id = requestUtils.getId(args)
      const { data } = args
      const result = await UserModel.update({ id }, data)
      const output = result.output()

      return output
    },

    async userDestroy (root, args, context) {
      const id = requestUtils.getId(args)
      const result = await UserModel.destroy({ id })

      return result
    }
  }
}
