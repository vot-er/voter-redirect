const config = require('../../config')
const db = require('../../db')

class Referrer {
  static async create({
    ref,
    firstName,
    lastName,
    state,
    organization,
    externalOrderId,
  }) {
    return db.query({
      name: 'addRef',
      text:
        'INSERT INTO referrer(ref, firstName, lastName, state, organization, externalOrderId, "createdAt") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      values: [
        ref,
        firstName,
        lastName,
        state,
        organization,
        new Date(),
        externalOrderId,
      ],
    })
  }
}

module.exports = Referrer
