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

  static formatDateWithMonth(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May",
    "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return date.getDate() + "-" +
      months[date.getMonth()] + "-" +
      date.getFullYear()
  }
}

module.exports = CalendarTime