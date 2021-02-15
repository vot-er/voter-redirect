const redirect = require('./api/redirect/redirect.controller').redirect;
const track = require('./api/event/event.controller').track;
const express = require('express');
const config = require('./config');
const db = require('./db');
const useragent = require('express-useragent');
const bodyParser = require('body-parser');

const app = express();
var jsonParser = bodyParser.json()

app.use(useragent.express())

app.get('/api/events', jsonParser, track)
app.get('/', redirect)


app.get('*', function notFound(req, res) {
  return res.status(200).send('Page not found.')
});

db.connect()
  .then(() => app.listen(config.port, () => {
    console.log(`VotER redirect app listening at http://${config.host}:${config.port}`)
  }))
  .catch(err => {throw err})

