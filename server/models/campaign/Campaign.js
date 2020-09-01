const config = require('../../config');
const db = require('../../db');
const Provider = require('../event/Event');
const urlUtils = require('../../utils/url');

class Campaign {
  constructor(row) {
    this.id = row["ID"]
    this.name = row["Name"];
    this.codes = {
      turbovote: row['TurboVote ID'],
      voteorg: row['Vote.org ID']
    }
  }
  static async getById(id) {
    const row = await db.getRowById('Campaigns', id)
    return row ? new Campaign(row) : null;
  }
  static getFallback() {
    return new Campaign({
      ID: null,
      Name: null,
      'TurboVote ID': 'misc',
      'Vote.org ID': 'misc'
    });
  }
  getUrl(target) {
    switch(target) {
      case 'turbovote':
        return urlUtils.buildUrl(config.turbovote.baseUrl, {
          r: this.codes.turbovote
        })
      case 'voteorg':
        return urlUtils.buildUrl(config.voteorg.baseUrl, {
          campaign: this.codes.voteorg,
          partner: config.voteorg.partner
        })
      default:
        throw new Error(`Target ${target} not recognized.`);
    }
  }
}

module.exports = Campaign