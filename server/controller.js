const Organization = require('./Organization');

async function redirect(req, res) {
  try {
    const ref = req.query.ref;
    const organization = await Organization.getById(ref);
    organization.incrementCounter();
    return res.status(301).redirect(organization.getUrl('test', {ref: 'hi'}));  
  } catch(err) {
    console.error(err)
    return res.status(301).redirect('https://vote.org');
  }
}

module.exports = {
  redirect: redirect
}