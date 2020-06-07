expect.extend({
  toHaveProperties(received, validProperties) {
    const pass = validProperties.every((property) => {
      return Object.keys(received).includes(property)
    })

    if (pass) {
      return {
        message: () =>
          `expected ${received} not to have one of properties ${validProperties}`,
        pass: true
      }
    } else {
      return {
        message: () =>
          `expected ${received} to have one of properties ${validProperties}`,
        pass: false
      }
    }
  },
})
