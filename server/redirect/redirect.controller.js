const Organization = require('../models').Organization;
const config = require('../config');

async function redirect(req, res) {
  try {
    const providerId = req.params.providerId;
    const ref = req.query.ref;
    const organization = await Organization.getByInternalCode(ref);
    organization.incrementCounter();
    const url = organization.buildReferralUrl(providerId);
    return res.status(301).redirect(url);  
  } catch(err) {
    console.error(err)
    return res.status(301).redirect(Provider.findById(providerId).getBaseUrl());
  }
}

module.exports = {
  redirect: redirect
}