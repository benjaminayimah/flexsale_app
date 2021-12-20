import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '@/views/web/Home.vue'
import About from '@/views/web/About.vue'
import Login from '@/views/web/Login.vue'
import Logout from '@/components/app/Logout'
import AdminHome from '@/views/AdminHome.vue'
import WebHome from '@/views/WebHome.vue'
import Dashboard from '@/views/app/Dashboard.vue'
import Products from '@/views/app/Products.vue'
//import Error404 from '@/views/web/Error404.vue'

const routes = [
  { path: '/', component: WebHome,
  children: [
    { path: '/', component: Home, name: 'Home'},
    { path: '/about', name: 'About', component: About}
  ]},
  { path: '/', component: AdminHome, 
    meta: {requiresAuth: true },
    children: [
      { path: '/dashboard', name: 'Dashboard', component: Dashboard },
      { path: '/products', name: 'Products', component: Products },
      { path: '/logout', component: Logout , name: 'Logout', meta: {requiresAuth: true}},
    ]
  },
  { path: '/login', name: 'Login', component: Login, meta: {requiresVisitor: true}},
  //{ path: '/:pathMatch(.*)*', name: 'not-found', component: Error404 },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  window.scrollTo(0,0)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.auth) {
      next({
        name: 'Login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.auth) {
      next({
        name: 'Dashboard'
      })
    } else{
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})



export default router
