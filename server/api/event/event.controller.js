const Event = require('../../models').Event;
const config = require('../../config');

async function track(req, res) {
  try {
    const {ref, type, destination} = req.body;
    await Event.create({
      ref: ref,
      type: type,
      destination: destination,
      ip: req.ip,
      userAgent: req.useragent.source,
      device: req.useragent.isMobile ? 'mobile' : req.useragent.isDesktop ? 'desktop' : null,
      browser: req.useragent.browser,
      os: req.useragent.os,
      platform: req.useragent.platform
    })
    return res.status(204).end();
  } catch(err) {
    console.error(err)
    return res.status(500).end();
  }
}

module.exports = {
  track: track
}