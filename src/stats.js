class Stats {
  constructor(allocation, events) {
    this.allocation = allocation
    this.events = events
  }

  get _tagsRanked() {
    const entries = Object.entries(this.allocation.tags)
    return entries.slice().sort((tag1, tag2) => { return tag2[1]-tag1[1] })
  }

  _percentageOfTotal(time) {
    return Math.round(time * 100 / this.allocation.total)
  }

  get results() {
    return this._tagsRanked.map((tagArray, i) => (
      {
        id: tagArray[0],
        time: tagArray[1],
        percentage: this._percentageOfTotal(tagArray[1]),
        events: this.allocation.eventsByTag[tagArray[0]]
      }
    ))
  }
}

module.exports = Stats