require('dotenv').config()
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';
const controller = require('./controller');
const express = require('express');

const app = express();

app.get('/', controller.redirect)

app.listen(port, () => {
  console.log(`Example app listening at http://${host}:${port}`)
});