const config = require('./config')
const { getUrl } = require('./controller')

describe('getUrl', () => {
  it('returns the default baseUrl when no code is provided', async () => {
    return expect(getUrl(null)).resolves.toBe(config.baseRedirectUrl)
  })
})
