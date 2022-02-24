const querystring = require('querystring')
const config = require('../config')

function buildUrl(baseUrl, params) {
  if (!params) return baseUrl
  const q = querystring.stringify(params)
  return `${baseUrl}?${q}`
}

function constructOrganizationUrl(ref, organization) {
  const baseUrl = organization.customUrl || config.baseRedirectUrl
  return buildUrl(baseUrl, { ref: ref, organizationId: organization.id })
}

function constructDefaultUrl(ref) {
  return buildUrl(config.baseRedirectUrl, { ref: ref })
}

module.exports = {
  buildUrl: buildUrl,
  constructDefaultUrl: constructDefaultUrl,
  constructOrganizationUrl: constructOrganizationUrl,
}
