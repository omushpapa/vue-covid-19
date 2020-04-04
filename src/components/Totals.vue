<template>
<div class="container text-center h-100 d-flex align-items-center flex-column justify-content-around">

  <ul class="list-unstyled">
    <li class="media">
      <img src="" class="mr-3" alt="">
      <div class="media-body">
        <h3 class="mt-0 mb-1">Total Confirmed</h3>

        <template v-if="loading">
          <div class="pt-3">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </template>
        <template v-else="">
          <h3 class="pt-3">{{ totalConfirmed | toLocaleString }}</h3>
        </template>

      </div>
    </li>

    <li class="media my-4">
      <img src="" class="mr-3" alt="">
      <div class="media-body">
        <h3 class="mt-0 mb-1">Total Recovered</h3>
        
        <template v-if="loading">
          <div class="pt-3">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </template>
        <template v-else="">
          <h3 class="pt-3">{{ totalRecovered | toLocaleString }}</h3>
        </template>

      </div>
    </li>

    <li class="media">
      <img src="" class="mr-3" alt="">
      <div class="media-body">
        <h3 class="mt-0 mb-1">Total Deaths</h3>
        
        <template v-if="loading">
          <div class="pt-3">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </template>
        <template v-else="">
          <h3 class="pt-3">{{ totalDeaths | toLocaleString }}</h3>
        </template>

      </div>
    </li>
  </ul>

</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'countries',

  computed: {
    ...mapState('summaryStatus', {
      loading: 'updating'
    }),

    ...mapGetters('summary', {
      totalConfirmed: 'getTotalConfirmed', 
      totalDeaths: 'getTotalDeaths', 
      totalRecovered: 'getTotalRecovered'
    }),
  },

  filters: {
    toLocaleString (value) {
      return value.toLocaleString()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
