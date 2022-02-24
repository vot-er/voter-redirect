const config = require('./config')
const { getUrl } = require('./controller')

jest.mock('./kit')
describe('getUrl', () => {
  beforeEach(() => {
    // Reset mock
    require('./kit').__setThrowError(false)
    require('./kit').__setMockKit(null)
  })
  it('returns the default baseUrl when no code is provided', async () => {
    return expect(getUrl(null)).resolves.toBe(config.baseRedirectUrl)
  })
  it('returns the default baseUrl when an error is thrown getting the organization', async () => {
    require('./kit').__setThrowError(true)
    require('./kit').__setMockKit({
      id: '1',
      code: 'code',
      organization: {
        id: 'o4',
        customUrl: 'https://en.wiktionary.org/wiki/test',
      },
    })
    return expect(getUrl('withError')).resolves.toBe(
      `${config.baseRedirectUrl}?ref=withError`
    )
  })
  describe('kit with no organization', () => {
    it('returns the default baseUrl with ref when a code without an organization is provided', async () => {
      require('./kit').__setMockKit({
        id: '1',
        code: 'noOrg',
      })

      return expect(getUrl('noOrg')).resolves.toBe(
        `${config.baseRedirectUrl}?ref=noOrg`
      )
    })
  })
  describe('kit with organization but no customUrl', () => {
    it('returns the default baseUrl with ref and organizationId', async () => {
      require('./kit').__setMockKit({
        id: '1',
        code: 'code',
        organization: {
          id: 'o2',
          customUrl: null,
        },
      })
      return expect(getUrl('code')).resolves.toBe(
        `${config.baseRedirectUrl}?ref=code&organizationId=o2`
      )
    })
    it('returns the default baseUrl with ref and organizationId even with 0 char string customUrl', async () => {
      require('./kit').__setMockKit({
        id: '1',
        code: 'code',
        organization: {
          id: 'o3',
          customUrl: '',
        },
      })
      return expect(getUrl('code')).resolves.toBe(
        `${config.baseRedirectUrl}?ref=code&organizationId=o3`
      )
    })
  })
  describe('kit with organization with customUrl', () => {
    it('returns the organization customUrl with ref and organizationId', async () => {
      require('./kit').__setMockKit({
        id: '1',
        code: 'code',
        organization: {
          id: 'o4',
          customUrl: 'https://en.wiktionary.org/wiki/test',
        },
      })
      return expect(getUrl('code')).resolves.toBe(
        `https://en.wiktionary.org/wiki/test?ref=code&organizationId=o4`
      )
    })
  })
})
