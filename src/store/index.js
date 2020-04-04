import Vue from 'vue'
import Vuex from 'vuex'

import summary from './summary'
import status from './status'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    summary,

    // status
    summaryStatus: status
  }
})
