const { google } = require('googleapis')

const CalendarAuth = require('./auth')

class Calendar {
  static async authorize() {
    const auth = new CalendarAuth()
    await auth.authorize()
    return auth.oAuth2Client
  }

  constructor(auth) {
    this.calendar = google.calendar({version: 'v3', auth})
  }

  async listEvents() {
    const res = await this.calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })
    const events = res.data.items

    console.log(events)

    if (events.length) {
      console.log('Upcoming 10 events:')
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date
        console.log(`${start} - ${event.summary}`)
      })
    } else {
      console.log('No upcoming events found.')
    }
  }
}

module.exports = Calendar