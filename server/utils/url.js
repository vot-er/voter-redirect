const querystring = require('querystring');

function buildUrl(baseUrl, params) {
  if (!params) return baseUrl;
  const q = querystring.stringify(params);
  return `${baseUrl}?${q}`;
}

module.exports = {
  buildUrl:buildUrl
}