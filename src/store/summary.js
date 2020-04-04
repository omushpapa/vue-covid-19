import { Repository } from '@/api'

export default {
  namespaced: true,

  state: {
    countryList: [],
    lastRevision: null
  },

  mutations: {
    updateCountryList (state, value) {
      state.countryList = value
    },

    updateLastRevision (state, value) {
      state.lastRevision = value
    }
  },

  getters: {
    getValidCountryList: (state) => {
      return state.countryList.filter(item => item.Country)
    },

    getCountryBySlug: (state) => (slug) => {
      return state.countryList.find((country) => country.CountrySlug === slug)
    },

    getGeneralStats: (state) => {
      let newConfirmed = 0
      let totalConfirmed = 0
      let newDeaths = 0
      let totalDeaths = 0
      let newRecovered = 0
      let totalRecovered = 0

      state.countryList.forEach(country => {
        newConfirmed += country.NewConfirmed
        totalConfirmed += country.TotalConfirmed
        newDeaths += country.NewDeaths
        totalDeaths += country.TotalDeaths
        newRecovered += country.NewRecovered
        totalRecovered += country.TotalRecovered
      })

      let data = {
        newConfirmed,
        totalConfirmed,
        newDeaths,
        totalDeaths,
        newRecovered,
        totalRecovered
      }

      return data
    },

    getNewConfirmed: (state, getters) => {
      return getters.getGeneralStats.newConfirmed
    },

    getTotalConfirmed: (state, getters) => {
      return getters.getGeneralStats.totalConfirmed
    },

    getNewDeaths: (state, getters) => {
      return getters.getGeneralStats.newDeaths
    },

    getTotalDeaths: (state, getters) => {
      return getters.getGeneralStats.totalDeaths
    },

    getNewRecovered: (state, getters) => {
      return getters.getGeneralStats.newRecovered
    },

    getTotalRecovered: (state, getters) => {
      return getters.getGeneralStats.totalRecovered
    }
    
  },

  actions: {
    fetchSummary ({ state, commit, rootGetters }) {
      commit('summaryStatus/updateStatus', true, { root: true })

      if (state.countryList.length > 0 && rootGetters['summaryStatus/isUptoDate']()) {
        commit('summaryStatus/updateStatus', false, { root: true })
        return
      }

      return Repository.getSummary()
        .then((response) => {
          if (response.success) {
            let data = response.data
            commit('updateCountryList', data.Countries)
            commit('updateLastRevision', data.Date)
            commit('summaryStatus/updateLastModified', null, { root: true })
          }
        })
        .finally(() => {
          commit('summaryStatus/updateStatus', false, { root: true })
        })
    }
  }
}
