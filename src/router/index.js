import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/About.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../components/Dashboard.vue'),
      meta: {
        requiresAuth: true
      }
    },
    { path: "*", component: () => import('../components/PageNotFound.vue') }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // console.log(store);
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router;