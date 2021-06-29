const axios = require('axios')
const config = require('./config')

function getUrl(ref) {
  if (!ref || !ref.length) return config.baseRedirectUrl
  return `${config.baseRedirectUrl}?ref=${ref}`
}

async function redirect(req, res) {
  const { code } = req.params
  const url = getUrl(code)
  return res.status(301).redirect(url)
}

module.exports = {
  redirect: redirect,
}
