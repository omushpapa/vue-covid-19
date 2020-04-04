import Vue from 'vue'
import Vuex from 'vuex'

import summary from './summary'
import status from './status'
import cases from './cases'
import itemStatus from './itemStatus'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    summary,
    cases,

    // status
    summaryStatus: status,
    casesStatus: status,
    caseItemStatus: itemStatus
  }
})
