require('dotenv').config()
const Airtable = require('airtable')
const { Client } = require('pg')
const { Referrer, Organization } = require('../models')
const db = require('../db')

const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(
  process.env.AIRTABLE_APP
)

async function createOrganizationFromAirtableRecord(organizationRecord) {
  return Organization.put({
    externalId: organizationRecord.id,
    name: organizationRecord.get('Name'),
  })
}

async function syncAllOrganizations() {
  return new Promise((resolve, reject) => {
    base('Organizations')
      .select({
        maxRecords: 10,
      })
      .eachPage(
        async function page(records, fetchNextPage) {
          try {
            const promises = records.map(createOrganizationFromAirtableRecord)
            await Promise.all(promises)
            fetchNextPage()
          } catch (err) {
            reject(err)
          }
        },
        function done(err) {
          if (err) {
            reject(err)
            return
          }
          resolve()
        }
      )
  })
}

async function handleOrderRecord(record) {
  const airtableOrganizationId = (record.get('Organization') || [])[0]
  let organizationId = null
  if (airtableOrganizationId) {
    const organization = await Organization.findByExternalId(
      airtableOrganizationId
    )
    organizationId = organization.id
  }
  const ref = await createReferralCode({
    firstName: record.get('First Name'),
    lastName: record.get('Last Name'),
    state: record.get('State'),
    externalOrderId: record.id,
    organization: organizationId,
  })
  if (!ref) return
  await base('Orders').update([
    {
      id: record.id,
      fields: {
        'Referral Code': ref,
      },
    },
  ])
}

async function createReferralCode(
  {
    firstName = '',
    lastName = '',
    orderId,
    state,
    organization,
    externalOrderId,
  },
  number = 1
) {
  const ref = `${firstName.slice(0, 1)}${lastName}${number}`.toLowerCase()
  const res = await Referrer.create({
    ref,
    firstName,
    lastName,
    state,
    orderId,
    organization,
    externalOrderId,
  })
  console.log('res', res)
  if (res.rows[0].count > 0) {
    return generateReferralCode(firstName, lastName, number + 1)
  }
  return ref
}

function syncAllOrders() {
  return new Promise((resolve, reject) => {
    base('Orders')
      .select({
        maxRecords: 10,
        view: 'Needs Referral Code',
      })
      .eachPage(
        async function page(records, fetchNextPage) {
          try {
            console.log('records', records)
            const promises = records.map(handleOrderRecord)
            await Promise.all(promises)
            fetchNextPage()
          } catch (err) {
            reject(err)
          }
        },
        function done(err) {
          if (err) {
            reject(err)
            return
          }
          resolve()
        }
      )
  })
}

db.connect()
  .then(() => {
    console.log('connected')
    return Promise.resolve()
  })
  .then(() => syncAllOrganizations())
  .then(() => syncAllOrders())
  .catch((err) => console.error(err))
  .finally(() => process.exit())
