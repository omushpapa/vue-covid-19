import Vue from 'vue'
import Toast from "vue-toastification";

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import "vue-toastification/dist/index.css";

import App from './App.vue'

require('dotenv').config()

import { store } from './store'

Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  beforeCreate () {
    Vue.$toast = this.$toast
  },
}).$mount('#app')
