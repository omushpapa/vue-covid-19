import Service from './service'

function getSummary () {
  let endpoint = '/summary'
  return Service.get(
    endpoint
  )
}

function getCaseData (caseType, countrySlug) {
  let endpoint = '/country'
  return Service.get(
    `${endpoint}/${countrySlug}/status/${caseType}`
  )
}

export default {
  getSummary,
  getCaseData
}
