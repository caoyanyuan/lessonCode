import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

let arr = [1,2,4,5]
arr.map

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
