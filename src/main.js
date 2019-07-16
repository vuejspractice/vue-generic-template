// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import '@fortawesome/fontawesome-free/css/all.css'
import store from './store/index'
import VuetifyDialog from 'vuetify-dialog'
import _ from "lodash";

Vue.use(Vuetify, {
  iconfont: 'fa'
})

Vue.use(VuetifyDialog)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
