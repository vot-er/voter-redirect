const config = require('../../config');
const db = require('../../db');

class Event {
  static async create(event) {
    await db.addRow('Events', {
      Timestamp: new Date(),
      'Campaign ID': event.campaignId,
      'Target': event.target,
      'Type': event.type
    })
  }
}

module.exports = Event