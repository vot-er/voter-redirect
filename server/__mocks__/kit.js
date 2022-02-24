let mockKit = null
let throwError = false

const Kit = jest.createMockFromModule('../kit')

Kit.__setThrowError = (val) => (throwError = val)
Kit.__setMockKit = (kit) => (mockKit = kit)

Kit.getByCode = async () => {
  if (throwError) throw Error('Mock error.')
  return mockKit
}

module.exports = Kit
