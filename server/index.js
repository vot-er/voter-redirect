const controller = require('./redirect/redirect.controller');
const express = require('express');
const config = require('./config');

const app = express();

app.get('/r/:providerId', controller.redirect)

app.get('*', function notFound(req, res) {
  return res.status(200).send('Page not found.')
});


app.listen(config.port, () => {
  console.log(`Example app listening at http://${config.host}:${config.port}`)
});