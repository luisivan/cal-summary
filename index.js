const Calendar = require('./src/cal')

const init = async function () {
  const auth = await Calendar.authorize()
  const cal = new Calendar(auth)
  cal.listEvents()
}

init()