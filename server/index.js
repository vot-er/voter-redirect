const redirect = require('./controller').redirect;
const express = require('express');
const config = require('./config');
const useragent = require('express-useragent');

const app = express();

app.use(useragent.express())

app.get('/', redirect)
app.get('/:code', redirect)

app.get('*', function notFound(req, res) {
  return res.status(200).send('Page not found.')
});
app.listen(config.port, () => {
  console.log(`VotER redirect app listening at http://${config.host}:${config.port}`)
})