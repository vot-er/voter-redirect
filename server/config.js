require('dotenv').config()

module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 5000,
  baseRedirectUrl: process.env.BASE_REDIRECT_URL,
  databaseUrl: process.env.DATABASE_URL
}