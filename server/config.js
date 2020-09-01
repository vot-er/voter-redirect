require('dotenv').config()

module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 5000,
  google: {
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    privateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n')
  },
  turbovote: {
    baseUrl: process.env.TURBOVOTE_BASE_URL,
    recordField: process.env.TURBOVOTE_RECORD_FIELD
  },
  voteorg: {
    baseUrl: process.env.VOTEORG_BASE_URL,
    partnerId: process.env.VOTEORG_PARTNER_ID,
    recordField: process.env.VOTEORG_RECORD_FIELD
  }
}