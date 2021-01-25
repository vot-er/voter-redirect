const Event = require('../../models').Event;
const config = require('../../config');

function getUrl(ref) {
  if(!ref || !ref.length) return config.baseRedirectUrl;
  return `${config.baseRedirectUrl}?ref=${ref}`;
}

async function redirect(req, res) {
  try {
    const target = req.params.target;
    const {ref} = req.query;
    await Event.create({
      ref: ref,
      type: 'click',
      ip: req.ip,
      userAgent: req.useragent.source,
      device: req.useragent.isMobile ? 'mobile' : req.useragent.isDesktop ? 'desktop' : null,
      browser: req.useragent.browser,
      os: req.useragent.os,
      platform: req.useragent.platform
    })
    const url = getUrl(ref);
    return res.status(301).redirect(url);
  } catch(err) {
    console.error(err)
    const url = getUrl(ref);
    return res.status(301).redirect(url);
  }
}

module.exports = {
  redirect: redirect
}