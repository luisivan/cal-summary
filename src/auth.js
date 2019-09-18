const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
const CREDENTIALS_PATH = __dirname + '/../credentials.json'
const TOKEN_PATH = __dirname + '/../token.json'

class CalendarAuth {
  constructor() {
    const { client_id, client_secret, redirect_uris } = this.credentials
    this.oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
  }

  get credentials() {
    return JSON.parse(fs.readFileSync(CREDENTIALS_PATH)).installed
  }

  get token() {
    return JSON.parse(fs.readFileSync(TOKEN_PATH))
  }

  async loadToken() {
    if (!fs.existsSync(TOKEN_PATH)) {
      const token = await this.getAccessToken()
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(token))
      console.log('Token stored to', TOKEN_PATH)
    }
  }

  async authorize() {
    await this.loadToken()
    
    this.oAuth2Client.setCredentials(this.token)
  }

  async readTokenInput() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    return new Promise((resolve) => {
      rl.question('Enter the code from that page here: ', (code) => {
        resolve(code)
        rl.close()
      })
    })
  }

  async getAccessToken() {
    const authUrl = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    })
    console.log('Authorize this app by visiting this url:', authUrl)
    const code = await this.readTokenInput()
    const res = await this.oAuth2Client.getToken(code)
    return res.tokens
  }
}

module.exports = CalendarAuth