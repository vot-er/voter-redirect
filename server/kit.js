const axios = require('axios')
const config = require('./config')

class Kit {
  static getByCode = async (code) => {
    const { data } = await axios.get(`${config.webappUrl}/api/kits/${code}`)
    return data
  }
}

module.exports = Kit
