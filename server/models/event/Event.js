const config = require('../../config');
const db = require('../../db');
class Event {
  static async create(event) {
    await db.query({
      name: 'addEvent',
      text: 'INSERT INTO event(ref, type, destination, "createdAt", ip, "userAgent", device, browser, os, platform) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      values: [event.ref, event.type, event.destination, new Date(), event.ip, event.userAgent, event.device, event.browser, event.os, event.platform]
    })
  }
}

module.exports = Event