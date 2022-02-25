const axios = require('axios')
const config = require('./config')

function Kit() {}

Kit.getByCode = async (code) => {
  const { data } = await axios.get(
    `${config.webappUrl}/api/redirects/${code}`,
    { timeout: 2000 }
  )
  return data
}

module.exports = Kit
