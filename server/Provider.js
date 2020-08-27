const querystring = require('querystring');
const config = require('./config');

function buildUrlWithQueryParams(baseUrl, params) {
  const q = querystring.stringify(params);
  return `${baseUrl}?${q}`;
}

const providers = {
  turbovote: function(code) {
    if(!code) return config.turbovote.baseUrl
    return buildUrlWithQueryParams(config.turbovote.baseUrl, {r: code})
  },
  voteorg: function(code) {
    if(!code) return config.voteorg.baseUrl
    return buildUrlWithQueryParams(config.voteorg.baseUrl, {ref: code})
  }
}

class Provider {
  constructor(buildUrl) {
    this.buildUrl = buildUrl;
  }
  static getById(id) {
    if(providers[id]) return new Provider(providers[id]);
    return null;
  }
  getUrl(code) {
    return this.buildUrl(code);
  }
}

module.exports = Provider