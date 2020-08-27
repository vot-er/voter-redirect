require('dotenv').config()

module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 5000,
  airtable: {
    sheet: process.env.AIRTABLE_SHEET,
    baseId: process.env.AIRTABLE_BASE_ID,
    secret: process.env.AIRTABLE_SECRET
  },
  turbovote: {
    baseUrl: process.env.TURBOVOTE_BASE_URL,
    recordField: process.env.TURBOVOTE_RECORD_FIELD
  },
  voteorg: {
    baseUrl: process.env.VOTEORG_BASE_URL,
    recordField: process.env.VOTEORG_RECORD_FIELD
  },
  catchAllCode: process.env.CATCH_ALL_CODE || 'misc'
}