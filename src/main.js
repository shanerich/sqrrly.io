import Vue from 'vue'
import Vuethereum from 'vuethereum'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './firebase'

Vue.config.productionTip = false

Vue.use(Vuethereum)
Vue.use(VueAxios, axios)

new Vue({
  Vuethereum,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
