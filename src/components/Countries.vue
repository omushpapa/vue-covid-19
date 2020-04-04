<template>
<div class="row h-100">
  
  <div class="col">
    <div class="container mt-4">
      <div class="row">
        <div class="col">

          <template v-if="loading">
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </template>
          <template v-else="">
            <button v-on:click="updateCountries" type="button" class="btn btn-primary">
              Refresh
            </button>
          </template>
        </div>

        <div class="col">
          <nav aria-label="Page navigation">
            <ul class="pagination pagination-sm">
              <li class="page-item"
                v-bind:class="{disabled: !hasPrev}"
                v-on:click="toPrevPage()">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item" 
                  v-for="pPage in paginationPages"
                  v-bind:key="pPage"
                  v-on:click="selectPage(pPage)" >
                <a class="page-link" href="#">
                  {{ pPage }}
                </a>
              </li>
              <li class="page-item" 
                v-bind:class="{disabled: !hasNext}"
                v-on:click="toNextPage()" >
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div class="row">
        <ul class="list-group list-group-flush w-100">
          <li v-for="country in getItemsForPage()" :key="country.country" class="list-group-item d-flex justify-content-between align-items-center">
            {{ country.Country }}
            <span class="badge badge-secondary badge-pill">
              {{ country.TotalConfirmed }}
            </span>
          </li>
        </ul>
        
      </div>

    </div>
  </div>

  <div class="col ">
    <Totals />
  </div>

</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import Totals from './Totals'

export default {
  name: 'countries',

  components: {
    Totals
  },

  data () {
    return {
      page: 1
    }
  },

  computed: {
    ...mapState('summaryStatus', {
      loading: 'updating'
    }),

    ...mapGetters('summary', {
      countries: 'getValidCountryList',
      totalConfirmed: 'getTotalConfirmed', 
      totalDeaths: 'getTotalDeaths', 
      totalRecovered: 'getTotalRecovered'
    }),

    countryCount: function () {
      return this.countries.length
    },

    nextPage: function () {
      return this.page + 1
    },

    prevPage: function () {
      return this.page - 1
    },

    hasNext: function () {
      return this.page < this.pageCount
    },

    hasPrev: function () {
      return this.page > 1
    },

    pageCount: function () {
      let x = this.countryCount / 10
      return Math.ceil(x)
    },

    paginationPages: function () {
      let choices = []
      if (this.hasPrev) {
        choices.push(this.prevPage)
      }

      choices.push(this.page)

      if (this.hasNext) {
        choices.push(this.nextPage)
      }

      return choices
    }
  },

  methods: {
    updateCountries () {
      console.debug('updating countries')
      this.$store.dispatch('summary/fetchSummary')
    },

    getItemsForPage () {
      let actualPageNumber = this.page - 1
      let constant = 10
      let startIndex = constant * actualPageNumber
      let lastIndex = startIndex + constant
      return this.countries.slice(startIndex, lastIndex)
    },

    toNextPage () {
      if (this.hasNext) {
        this.page = this.nextPage
      }
    },

    toPrevPage () {
      if (this.hasPrev) {
        this.page = this.prevPage
      }
    },

    selectPage (pageNumber) {
      this.page = pageNumber
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
