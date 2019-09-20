class CalendarTime {
  static getWeekMonday() {
    const d = new Date()
    const day = d.getDay(), diff = d.getDate() - day + (day == 0 ? - 6:1)
    return new Date(d.setDate(diff))
  }

  static getWeekSunday() {
    const d = new Date()
    const day = d.getDay(), diff = d.getDate() - day + (day == 0 ? - 0:7)
    return new Date(d.setDate(diff))
  }
}

module.exports = CalendarTime