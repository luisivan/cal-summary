const CalendarTime = require('./time')

class Formatter {
  constructor(stats) {
    this.stats = stats

    this.output = `
      ${CalendarTime.formatDateWithMonth(CalendarTime.getWeekMonday())}
      to 
      ${CalendarTime.formatDateWithMonth(CalendarTime.getWeekSunday())}
    `
    this.stats.map((tag) => {
      this.output += `
        ## ${this._capitalizeFirstLetter(tag.id)}
        ### Time: ${tag.time} (${tag.percentage}%)
      `
    })
  }

  _capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}

module.exports = Formatter