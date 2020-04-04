<template>
<div class="row h-100">
  <div class="col d-flex align-items-center">
    <div class="jumbotron">
      <h1 class="display-4">COVID-19</h1>
      <p class="lead">
        COVID-19 is an infectious disease caused by a new strain of coronavirus.
      </p>
      <hr class="my-4">
      <p>
        According to the World Health Organization (WHO), coronaviruses are a family of viruses that cause illnesses ranging from the common cold to more severe diseases.
      </p>
      <p>
        COVID-19 is primarily spread from person-to-person through droplets of saliva or discharge from the nose when an infected person coughs or sneezes.
      </p>
    </div>
  </div>

  <div class="col ">
    <Totals />
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

import Totals from './Totals'

export default {
  name: 'home',

  components: {
    Totals
  },

  props: {
    totalDeaths: Number,
    totalConfirmed: Number,
    totalRecovered: Number
  },

  computed: {
    ...mapState('summaryStatus', {
      loading: 'updating'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
