const Campaign = require('../../models').Campaign;
const Event = require('../../models').Event;
const config = require('../../config');

async function redirect(req, res) {
  try {
    const target = req.params.target;
    const campaignId = req.query.ref;
    let campaign = await Campaign.getById(campaignId);
    if(!campaign) {
      campaign = Campaign.getFallback();
    }
    await Event.create({
      target: target,
      campaignId: campaignId,
      type: 'click',
      ip: req.ip,
      userAgent: req.useragent.source,
      device: req.useragent.isMobile ? 'mobile' : req.useragent.isDesktop ? 'desktop' : null,
      browser: req.useragent.browser,
      os: req.useragent.os,
      platform: req.useragent.platform
    })
    const url = campaign.getUrl(target);
    return res.status(301).redirect(url);
  } catch(err) {
    console.error(err)
    const campaign = Campaign.getFallback();
    const url = campaign.getUrl(target);
    return res.status(301).redirect(url);
  }
}

module.exports = {
  redirect: redirect
}