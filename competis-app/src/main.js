import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueFinalModal from 'vue-final-modal'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueFinalModal())

Vue.config.productionTip = false

Vue.prototype.$apiURL = 'http://localhost:3000/api'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
