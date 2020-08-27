const querystring = require('querystring');
const config = require('../../config');

function buildUrlWithQueryParams(baseUrl, params) {
  if (!params) return baseUrl;
  const q = querystring.stringify(params);
  return `${baseUrl}?${q}`;
}

const providers = {
  turbovote: {
    baseUrl: config.turbovote.baseUrl,
    getParams(code) {
      if(!code) return null;
      return {
        r: code
      }
    }
  },
  voteorg: {
    baseUrl: config.voteorg.baseUrl,
    getParams(code) {
      if(!code) {
        return {
          partner: config.voteorg.partnerId
        }
      }
      return {
        campaign: code,
        partner: config.voteorg.partnerId
      }
    }
  }
}

class Provider {
  constructor(id, options) {
    this.id = id
    this.baseUrl = options.baseUrl;
    this.getParams = options.getParams;
  }
  static getById(id) {
    if(providers[id]) return new Provider(id, providers[id]);
    return null;
  }
  buildReferralUrl(code) {
    return buildUrlWithQueryParams(this.baseUrl, this.getParams(code))
  }
}

module.exports = Provider