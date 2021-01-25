const {Client} = require('pg');
const config = require('../config');

const client = new Client({
  connectionString: config.databaseUrl
})

module.exports = client