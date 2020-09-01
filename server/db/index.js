const Database = require('./Database');
const config = require('../config');

const db = new Database(config.google.clientEmail, config.google.privateKey, config.google.spreadsheetId);


module.exports = db