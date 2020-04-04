import axios from 'axios'

import { errorParser, responseParser } from './helpers'

const Service = axios.create({
  baseURL: 'https://api.covid19api.com',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
})

Service.interceptors.request.use((request) => {
  console.debug('starting request', request)
  return request
})

Service.interceptors.response.use((response) => {
  console.debug('response: ', response)
  return responseParser(response)
}, (error) => {
  return errorParser(error)
})

export default Service