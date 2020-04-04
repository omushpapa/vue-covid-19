export function timeIsLessThan (diff, startDate, endDate) {
  let startDateTime = startDate.getTime()
  let endDateTime = endDate.getTime()

  let timeDiff = startDateTime - endDateTime
  return timeDiff < (diff * 1000)
}

export function isoTimeToReadable (value) {
  let d = new Date(value)
  return d.toDateString()
}
