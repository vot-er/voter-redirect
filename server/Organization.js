const querystring = require('querystring');
const config = require('./config');
const db = require('./db');
const ProviderOptions = require('./Provider');

class Organization {
  constructor(record) {
    this.id = record.id;
    this.score = record.fields.Score;
    this.shortcode = record.fields["Internal Code"];
    this.name = record.fields.Organization;
    this.codes = {
      turbovote: record.fields[config.turbovote.recordField],
      voteorg: record.fields[config.voteorg.recordField]
    }
  }
  static async getByIdOrDefault(id) {
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
  getUrl(providerId) {
    const options = ProviderOptions.getById(providerId);
    if(!options) throw new Error(`Provider ${providerId} not recognized.`);
    return options.getUrl(this.codes[providerId])
  }
}

module.exports = Organization