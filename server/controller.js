const Organization = require('./Organization');
const config = require('./config');

async function redirect(req, res) {
  try {
    const providerId = req.params.providerId;
    const ref = req.query.ref;
    const organization = await Organization.getByIdOrDefault(ref);
    organization.incrementCounter();
    const url = organization.getUrl(providerId);
    return res.status(301).redirect(url);  
  } catch(err) {
    console.error(err)
    return res.status(301).redirect(Provider.findById(providerId).getBaseUrl());
  }
}

function notFound(req, res) {
  return res.send('Not found.')
}

module.exports = {
  redirect: redirect,
  notFound: notFound
}