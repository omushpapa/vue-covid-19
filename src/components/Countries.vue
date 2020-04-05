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
            <button v-on:click="updateCountries" type="button" class="btn btn-primary btn-sm">
              Update
            </button>
          </template>
        </div>

        <div class="col">
          <nav v-if="!searchTerm && countryCount > 0" aria-label="Page navigation">
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

      <div class="row mt-2">
        <div class="col">
          <form class="form-inline my-2 my-lg-0">
            <input v-model="searchTerm" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          </form>
        </div>
      </div>

      <div class="row mt-2">
        <ul class="list-group list-group-flush w-100">
          <li class="list-group-item d-flex justify-content-between align-items-center"
          v-for="(country, index) in displayCountries" :key="index" 
          v-on:click="viewCountryInfo(country.Slug)" 
          v-bind:class="{active: activeCountry == country.Slug}">
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
    <template v-if="activeCountry">
      <CountryInfo v-bind:activeCountry="activeCountry" />
    </template>
    <template v-else="">
      <Totals />
    </template>
  </div>

</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import _ from 'lodash'

import Totals from './Totals'
import CountryInfo from './CountryInfo'

export default {
  name: 'countries',

  components: {
    Totals,
    CountryInfo
  },

  data () {
    return {
      page: 1,
      activeCountry: null,
      searchTerm: '',
      searchResults: [],
      itemsPerPage: 9
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
      let x = this.countryCount / this.itemsPerPage
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
    },

    displayCountries: function () {
      if (this.searchTerm) {
        return this.searchResults
      } else {
        return this.getItemsForPage()
      }
    }
  },

  methods: {
    updateCountries () {
      console.debug('updating countries')
      this.$store.dispatch('summary/fetchSummary')
    },

    getItemsForPage () {
      let actualPageNumber = this.page - 1
      let constant = this.itemsPerPage
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
    },

    viewCountryInfo (countrySlug) {
      console.debug(`viewing info for ${countrySlug}`)
      this.activeCountry = countrySlug
    },

    search (text) {
      this.searchResults = []
      this.countries.forEach(country => {
        if (country.Country && country.Country.toLowerCase().indexOf(text) != -1) {
          this.searchResults.push(country)
        }
      })
    }
  },

  watch: {
    searchTerm: function (oldValue, newValue) {
      console.debug(`old: ${oldValue}, new: ${newValue}`)
      let debouncedSearch = _.debounce(this.search, 500)
      debouncedSearch(newValue.toLowerCase())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
