import Vue from 'vue'

import { timeIsLessThan } from '@/helpers'
  
export default {
  namespaced:true,

  state: {
    lastModifiedData: {},
    statusData: {},
    updating: false,
    lastModified: new Date(),
    ttl: 600
  },

  mutations: {
    updateLastModified (state, name) {
      Vue.set(state.lastModifiedData, name, new Date())
    },

    updateStatus (state, payload) {
      let name = payload.name
      let value = payload.value
      Vue.set(state.statusData, name, value)
    }
  },

  getters: {
    getLastModified: (state) => (name) => {
      let lastModified = state.lastModifiedData[name]
      if (!lastModified) {
        lastModified = state.lastModified
      }
      return lastModified
    },

    isUptoDate: (state, getters) => (name, timeInSeconds) => {
      if (!timeInSeconds) {
        timeInSeconds = state.ttl
      }
      return timeIsLessThan(timeInSeconds, new Date(), getters.getLastModified(name))
    }
  }
}