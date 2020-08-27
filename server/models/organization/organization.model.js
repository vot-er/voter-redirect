const querystring = require('querystring');
const config = require('../../config');
const db = require('../../db');
const Provider = require('..').Provider;

class Organization {
  constructor(record) {
    this.id = record.id;
    this.score = record.fields.Score;
    this.internalCode = record.fields["Internal Code"];
    this.name = record.fields.Organization;
    this.codes = {
      turbovote: record.fields[config.turbovote.recordField],
      voteorg: record.fields[config.voteorg.recordField]
    }
  }
  static async getByInternalCode(id) {
    let record = await db.getRecordByField('Internal Code', id || config.catchAllCode)
    if(!record) {
      record = await db.getRecordByField('Internal Code', config.catchAllCode)
    }
    if(!record) throw new Error("No organization found.")

    return new Organization(record);
  }
  incrementCounter() {
    return db.update([
      {
        "id": this.id,
        "fields": {
          "Score": (this.score || 0) + 1,
        }
      },
    ])
  }
  buildReferralUrl(providerId) {
    const provider = Provider.getById(providerId);
    if(!provider) throw new Error(`Provider ${providerId} not recognized.`);
    return provider.buildReferralUrl(this.codes[providerId])
  }
}

module.exports = Organization