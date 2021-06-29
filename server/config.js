require('dotenv').config()

module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 5001,
  baseRedirectUrl: process.env.BASE_REDIRECT_URL,
  webappUrl: process.env.WEBAPP_URL,
}