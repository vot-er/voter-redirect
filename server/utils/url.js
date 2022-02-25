function buildUrl(baseUrl, params) {
  if (!params) return baseUrl
  const nonNullParams = Object.keys(params).reduce((all, key) => {
    if (params[key]) all[key] = params[key]
    return all
  }, {})
  const q = new URLSearchParams(nonNullParams).toString()
  return `${baseUrl}?${q}`
}

module.exports = {
  buildUrl: buildUrl,
}
