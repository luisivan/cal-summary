const Calendar = require('./src/cal')
const Allocation = require('./src/allocation')
const Stats = require('./src/stats')

const init = async function () {
  const auth = await Calendar.authorize()
  const cal = new Calendar(auth)
  const events = await cal.listEvents()
  const allocation = new Allocation()
  events.map((event) => allocation.add(event))
  const stats = new Stats(allocation, events)
  console.log(stats.results)
}

init()