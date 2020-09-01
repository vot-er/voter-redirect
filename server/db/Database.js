const { GoogleSpreadsheet } = require('google-spreadsheet'); 

class Database {
  constructor(email, secret, sheet) {
    this.email = email;
    this.secret = secret;
    this.doc = new GoogleSpreadsheet(sheet);
    this.loaded = false;
  }
  async load() {
    await this.doc.useServiceAccountAuth({
      client_email: this.email,
      private_key: this.secret,
    });
    await this.doc.loadInfo()
    this.loaded = true;
  }
  async getRowById(worksheetTitle, id) {
    const worksheet = this.doc.sheetsByTitle[worksheetTitle];
    if(!worksheet) throw new Error("Worksheet not found.");
    const rows = await worksheet.getRows();
    for(var i = 0; i < rows.length; i++) {
      const row = rows[i];
      if(row.ID == id) return row;
    }
    return null;
  }
  async addRow(worksheetTitle, row) {
    const worksheet = this.doc.sheetsByTitle[worksheetTitle];
    if(!worksheet) throw new Error("Worksheet not found.");
    return worksheet.addRow(row)
  }
}

module.exports = Database