const { google } = require('googleapis')

const CalendarAuth = require('./auth')
const CalendarTime = require('./time')

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
      timeMin: (CalendarTime.getWeekMonday()).toISOString(),
      timeMax: (CalendarTime.getWeekSunday()).toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })
    const events = res.data.items

    const taggedEvents = events.filter((event) => {
      const matches = event.summary.match(/\[(.*?)\]/)
      if (matches || event.attendees) {
        event.tag = (matches) ? matches[1] : "meetings"
        event.start = new Date(event.start.dateTime)
        event.end = new Date(event.end.dateTime)
        return true
      }
    })

    return taggedEvents
  }
}

module.exports = Calendar