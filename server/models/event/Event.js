const config = require('../../config');
const db = require('../../db');
const moment = require('moment');

class Event {
  static async create(event) {
    await db.addRow('Events', {
      Timestamp: moment.utc().format('YYYY/MM/DD HH:mm:ss'),
      'Campaign ID': event.campaignId,
      'Target': event.target,
      'Type': event.type,
      'IP Address': event.ip,
      'Device Type': event.device,
      'Browser': event.browser,
      'OS': event.os,
      'Platform': event.platform,
      'User Agent': event.userAgent
    })
  }
}

module.exports = Event