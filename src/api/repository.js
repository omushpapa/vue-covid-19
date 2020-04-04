import Service from './service'

function getSummary () {
    let endpoint = '/summary'
    return Service.get(
        endpoint
    )
}

export default {
    getSummary
}
