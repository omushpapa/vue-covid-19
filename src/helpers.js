export function timeIsLessThan (diff, startDate, endDate) {
  let startDateTime = startDate.getTime()
  let endDateTime = endDate.getTime()

  let timeDiff = startDateTime - endDateTime
  return timeDiff < (diff * 1000)
}
