const { UserModel, UserCollection } = require('../models/user');

const getParams = (params) => {
  const output = {}

  for (const [key, value] of Object.entries(params)) {
    if (
      value !== null
      && value !== undefined
      && value !== {}
      && value !== []
      && value !== ''
    ) {
      output[key] = value
    }
  }

  return output
}

const getId = (params) => {
  const id = +params.id || null
  return id
}

module.exports = {
  Query: {
    async userList (root, args, context) {
      const params = getParams(args)
      const result = await UserCollection.findWithPaging(params)
      const output = result.outputWithPaging()

      return output
    },

    async userGet (root, args, context) {
      const id = getId(args)
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
