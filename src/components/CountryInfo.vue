<template>
<div class="container text-center h-100 d-flex align-items-center flex-column justify-content-around">

  <div class="table-responsive table-cases w-100 h-100">
    <table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">Date </th>
            <th scope="col">Confirmed</th>
            <th scope="col">Recovered</th>
            <th scope="col">Deaths</th>
          </tr>
        </thead>
        <tbody>
          
          <template v-if="loading">
            <tr rowspan=2>
              <td colspan="2">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
          </template>
          <template v-else="">
            <tr v-for="(item, index) in confirmedData" v-bind:key="index">
              <td>{{ item.Date | isoTimeToReadable }}</td>
              <td>{{ item.Cases }}</td>
              <td>{{ getRecoveredDataForDate(item.Date) }}</td>
              <td>{{ getDeathsDataForDate(item.Date) }}</td>
            </tr>
          </template>

        </tbody>
    </table>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'countries',

  props: {
    activeCountry: String
  },

  created () {
    console.debug(`active country is ${this.activeCountry}`)
    this.init() // for the first item clicked
  },

  computed: {
    ...mapState('casesStatus', {
      loading: 'updating'
    }),

    confirmedData: function () {
      return this.$store.getters['cases/getDataForCountry']('confirmed', this.activeCountry)
    },

    parsedRecoveredData: function () {
      let data = {}
      this.recoveredData.forEach(element => {
        data[element.Date] = element.Cases
      })

      return data
    },

    parsedDeathData: function () {
      let data = {}
      this.deathData.forEach(element => {
        data[element.Date] = element.Cases
      })

      return data
    },

    recoveredData: function () {
      return this.$store.getters['cases/getDataForCountry']('recovered', this.activeCountry)
    },

    deathData: function () {
      return this.$store.getters['cases/getDataForCountry']('deaths', this.activeCountry)
    }
  },

  methods: {
    init () {
      let countrySlug = this.activeCountry
      this.$store.dispatch('cases/fetchCaseData', { countrySlug, caseType: 'confirmed' })
      this.$store.dispatch('cases/fetchCaseData', { countrySlug, caseType: 'recovered' })
      this.$store.dispatch('cases/fetchCaseData', { countrySlug, caseType: 'deaths' })
    },

    getRecoveredDataForDate (someDate) {
      return this.parsedRecoveredData[someDate]
    },

    getDeathsDataForDate (someDate) {
      return this.parsedDeathData[someDate]
    },
  },

  watch: {
    activeCountry: function (newCountrySlug, oldCountrySlug) {
      console.debug(`new slug: ${newCountrySlug}, old slug: ${oldCountrySlug}`)
      this.init()
    }
  },

  filters: {
    isoTimeToReadable (value) {
      let d = new Date(value)
      return d.toDateString()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-cases {
    max-height:80vh;
}
</style>
