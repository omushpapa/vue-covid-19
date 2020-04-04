<template>
  <div id="app" class="container-fluid h-100">

    <nav class="navbar navbar-light bg-light navbar-expand-md">
      <span class="navbar-brand mb-0 h1"><i class="fas fa-virus"></i></span>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link cursor-pointer" v-bind:class="{active: currentComponent === 'home'}" @click="selectComponent('home')" >Home <span class="sr-only">(current)</span></a>
          <a class="nav-item nav-link" v-bind:class="{active: currentComponent === 'countries'}"  @click="selectComponent('countries')" href="#">Countries</a>
          <a class="nav-item nav-link" href="#">About</a>
        </div>
        <div class="navbar-nav ml-auto">
          <a class="nav-item nav-link ml-auto">{{ lastUpdated | isoTimeToReadable }}</a>
        </div>
      </div>
    </nav>

    <div class="container h-100">
      <Home v-if="currentComponent === 'home'"
            v-bind:totalDeaths="totalDeaths"
            v-bind:totalConfirmed="totalConfirmed"
            v-bind:totalRecovered="totalRecovered" />

      <Countries v-if="currentComponent === 'countries'" />
    </div>
    
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import Home from './components/Home.vue'
import Countries from './components/Countries.vue'

import { isoTimeToReadable } from '@/helpers'

export default {
  name: 'App',
  data () {
    return {
      currentComponent: 'home'
    }
  },

  components: {
    Home,
    Countries
  },

  created () {
    this.init()
  },

  computed: {
    ...mapState('summaryStatus', {
      loading: 'updating'
    }),

    ...mapGetters('summary', {
      newConfirmed: 'getNewConfirmed', 
      totalConfirmed: 'getTotalConfirmed', 
      newDeaths: 'getNewDeaths',
      totalDeaths: 'getTotalDeaths', 
      newRecovered: 'getNewRecovered', 
      totalRecovered: 'getTotalRecovered'
    }),

    ...mapState('summary', {
      lastUpdated: 'lastRevision'
    }),
  },

  methods: {
    init () {
      this.updateCountries()
    },

    updateCountries () {
      this.$store.dispatch('summary/fetchSummary')
    },

    selectComponent (componentName) {
      console.debug(`selecting component ${componentName}`)
      this.currentComponent = componentName
    }
  },

  filters: {
    isoTimeToReadable (value) {
      return isoTimeToReadable(value)
    }
  }
}
</script>

<style>
html, body {
    height: 100%;
}

.cursor-pointer {cursor: pointer;}
</style>
