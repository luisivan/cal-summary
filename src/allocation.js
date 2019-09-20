class Allocation {
  constructor() {
    this.tags = []
    this.eventsByTag = {}
    this.total = 0
  }

  _calculateHoursBetween(start, end) {
    const diff = Math.abs(end - start)
    return diff / (1000 * 60 * 60)
  }

  add({ tag, start, end, summary }) {
    if (!this.tags[tag]) {
      this.tags[tag] = 0
      this.eventsByTag[tag] = []
    }

    const time = this._calculateHoursBetween(start, end)

    this.tags[tag] += time
    this.total += time
    this.eventsByTag[tag].push({ start, end, summary })
  }
}

module.exports = Allocation