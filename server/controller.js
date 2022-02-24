const config = require('./config')
const Kit = require('./kit')
const { constructDefaultUrl, constructOrganizationUrl } = require('./utils/url')

async function getOrganization(code) {
  const kit = await Kit.getByCode(code)
  if (kit.organization) return kit.organization
  return null
}

async function getUrl(code) {
  try {
    if (!code) return config.baseRedirectUrl
    const organization = await getOrganization(code)
    if (!organization) return constructDefaultUrl(code)
    return constructOrganizationUrl(code, organization)
  } catch (err) {
    console.error(err)
  }
  return constructDefaultUrl(code)
}

async function redirect(req, res) {
  const { code } = req.params
  if (!code || !code.length) code = null
  const url = await getUrl(code)
  return res.status(301).redirect(url)
}

module.exports = {
  redirect: redirect,
  getUrl: getUrl,
}
