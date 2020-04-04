import Vue from 'vue'

import { Repository } from '@/api'

export default {
  namespaced: true,

  state: {
    confirmedData: {},
    recoveredData: {},
    deathData: {}
  },

  mutations: {
    updateConfirmed (state, payload) {
      let countrySlug = payload.countrySlug
      let data = payload.data

      Vue.set(state.confirmedData, countrySlug, data)
      // state.confirmedData[countrySlug] = data
    },

    updateRecovered (state, payload) {
      let countrySlug = payload.countrySlug
      let data = payload.data

      Vue.set(state.recoveredData, countrySlug, data)
      // state.recoveredData[countrySlug] = data
    },

    updateDeaths (state, payload) {
      let countrySlug = payload.countrySlug
      let data = payload.data

      Vue.set(state.deathData, countrySlug, data)
      // state.deathData[countrySlug] = data
    }
  },

  getters: {
    getDataForCountry: (state) => (caseType, countrySlug) => {
      let dataSet = null
      if (caseType === 'confirmed') {
        dataSet = state.confirmedData
      } else if (caseType === 'recovered') {
        dataSet = state.recoveredData
      } else if (caseType === 'deaths') {
        dataSet = state.deathData
      } else {
        return []
      }

      let countryData = dataSet[countrySlug]
      if (!countryData) {
        countryData = []
      }
      return countryData
    },

    hasData: (state, getters) => (caseType, countrySlug) => {
      let data = getters.getDataForCountry(caseType, countrySlug)
      return data.length > 0
    }
  },

  actions: {
    fetchCaseData ({ commit, getters, rootGetters }, payload) {
      commit('casesStatus/updateStatus', true, { root: true })
      commit('caseItemStatus/updateStatus', { name: countrySlug, value: true}, { root: true })
      let countrySlug = payload.countrySlug
      let caseType = payload.caseType

      if (
        getters.hasData(caseType, countrySlug) && 
        rootGetters['caseItemStatus/isUptoDate'](countrySlug)
      ) {
        commit('casesStatus/updateStatus', false, { root: true })
        commit('caseItemStatus/updateStatus', { name: countrySlug, value: false}, { root: true })
        return
      }

      return Repository.getCaseData(caseType, countrySlug)
        .then((response) => {
          if (response.success) {
            let data = response.data
            let mutation = null

            if (caseType === 'confirmed') {
              mutation = 'updateConfirmed'
            } else if (caseType === 'recovered') {
              mutation = 'updateRecovered'
            } else if (caseType === 'deaths') {
              mutation = 'updateDeaths'
            }

            if (mutation) {
              let finalData = {
                countrySlug,
                data
              }
              commit(mutation, finalData)
              commit('casesStatus/updateLastModified', null, { root: true })
              commit('caseItemStatus/updateLastModified', countrySlug, { root: true })
            }
            
          }
        })
        .finally(() => {
          commit('casesStatus/updateStatus', false, { root: true })
          commit('caseItemStatus/updateStatus', { name: countrySlug, value: false}, { root: true })
        })
    }
  }
}