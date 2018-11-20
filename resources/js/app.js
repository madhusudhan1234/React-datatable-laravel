require('./bootstrap')
import Vue from 'vue'
window.Vue = Vue

import DataTable from './components/DataTable'

const app = new Vue({
  el: '#app',
  components: {
    DataTable
  }
})
