const config = require('../../config')
const db = require('../../db')

class Organization {
  static async findByExternalId(externalId) {
    await db.query({
      name: 'findOrganizationByExternalId',
      text: 'SELECT FROM organization WHERE "externalId" = $1 LIMIT 1',
      values: [externalId],
    })
  }
  static async put({ name = '', externalId }) {
    try {
      console.log('putting', name, externalId)
      const res = await db.query({
        name: 'createOrganization',
        text: 'INSERT INTO organization(name, "externalId") VALUES ($1, $2)',
        values: [name, externalId],
      })
      console.log('putres', res)
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

module.exports = Organization
