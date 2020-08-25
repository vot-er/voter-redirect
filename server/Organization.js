var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_SECRET}).base(process.env.AIRTABLE_BASE_ID);
const querystring = require('querystring');

class Organization {
  constructor({id, shortcode, name, tags, score}) {
    this.id = id;
    this.score = score;
    this.shortcode = shortcode;
    this.name = name;
    this.tags = tags;
  }
  static getById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await base(process.env.AIRTABLE_BASE_NAME).select({
          maxRecords: 3,
          view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
          records.forEach(record => {
            console.log(record.fields.Shortcode)
            if(record.fields.Shortcode == id) {
              const organization = new Organization({
                shortcode: record.fields.Shortcode,
                name: record.fields.Organization,
                tags: {
                  turbovote: record.fields['TurboVote Code'] || null,
                  voteOrg: record.fields['VoteOrg Code'] || null
                }
              })
              return resolve(organization)
            }
          })
        })
      } catch(err) {
        console.error(err)
        reject(err)
      }
    })
  }
  incrementCounter() {
    return base(process.env.AIRTABLE_BASE_NAME).update([
      {
        "id": this.id,
        "fields": {
          "Score": this.score + 1,
        }
      },
    ])
  }
  getUrl(name, params) {
    const q = querystring.stringify(params);
    return `${process.env.TURBOVOTE_BASE_URL}?${q}`;
  }
}

module.exports = Organization