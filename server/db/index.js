const Airtable = require('airtable');
const config = require('../config');

class Database {
  constructor() {
    this.base = new Airtable({apiKey: config.airtable.secret}).base(config.airtable.baseId);
  }
  getRecordByField(key, value) {
    return new Promise((resolve, reject) => {
      this.base(config.airtable.sheet).select({
          maxRecords: 1,
          view: "Grid view",
          filterByFormula: `{${key}}='${value || config.catchAllInternalCode}'`
        }).eachPage(function page(records, fetchNextPage) {
          try {
            if (records.length == 0) return resolve(null);
            return resolve(records[0])
          } catch(err) {
            return reject(err)
          }
        }, function done(err) {
          if (err) return reject(err);
          return resolve(defaultOrganization);
        })
    })
  }
  update(patches) {
    return this.base(config.airtable.sheet).update(patches)
  }
}

const db = new Database()

module.exports = db