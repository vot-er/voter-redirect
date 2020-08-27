const querystring = require('querystring');
const config = require('../../config');

function buildUrlWithQueryParams(baseUrl, params) {
  const q = querystring.stringify(params);
  return `${baseUrl}?${q}`;
}

const providers = {
  turbovote: {
    baseUrl: config.turbovote.baseUrl,
    paramKey: 'r'
  },
  voteorg: {
    baseUrl: config.voteorg.baseUrl,
    paramKey: 'ref'
  }
}

class Provider {
  constructor(id, options) {
    this.id = id
    this.baseUrl = options.baseUrl;
    this.paramKey = options.paramKey;
  }
  static getById(id) {
    if(providers[id]) return new Provider(id, providers[id]);
    return null;
  }
  buildReferralUrl(code) {
    if(!code) return this.baseUrl;
    return buildUrlWithQueryParams(this.baseUrl, {[this.paramKey]: code})
  }
}

module.exports = Provider