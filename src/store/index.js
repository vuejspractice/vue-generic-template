import dashboard from './dashboard.module';
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        dashboard
    }
})
