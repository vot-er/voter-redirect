const config = require('./config')
const Kit = require('./kit')
const { buildUrl } = require('./utils/url')

async function getUrl(code) {
  try {
    if (!code) return config.baseRedirectUrl
    const kit = await Kit.getByCode(code)
    if (kit) {
      const { organizationId, customUrl } = kit
      return buildUrl(customUrl || config.baseRedirectUrl, {
        ref: code,
        organizationId,
      })
    }
  } catch (err) {
    console.error(err)
  }
  return buildUrl(config.baseRedirectUrl, { ref: code })
}

async function redirect(req, res) {
  let { code } = req.params
  if (!code || !code.length) code = null
  const url = await getUrl(code)
  return res.status(301).redirect(url)
}

module.exports = {
  redirect: redirect,
  getUrl: getUrl,
}
