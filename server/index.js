const redirect = require('./api/redirect/redirect.controller').redirect;
const express = require('express');
const config = require('./config');
const db = require('./db');
const useragent = require('express-useragent');

const app = express();

app.use(useragent.express())

app.get('/r/:target', redirect)

app.get('*', function notFound(req, res) {
  return res.status(200).send('Page not found.')
});

db.load()
  .then(() => app.listen(config.port, () => {
    console.log(`VotER redirect app listening at http://${config.host}:${config.port}`)
  }))
  .catch(err => {throw err})

