import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
//import Home from '@/views/web/Home.vue'
//import About from '@/views/web/About.vue'
import Login from '@/views/web/Login.vue'
import AdminHome from '@/views/AdminHome.vue'
//import WebHome from '@/views/WebHome.vue'
import Dashboard from '@/views/app/Dashboard.vue'
import Products from '@/views/app/Products.vue'
import Notifications from '@/views/app/Notifications.vue'
import Profile from '@/views/app/Profile.vue'
import Settings from '@/views/app/Settings.vue'
import Tags from '@/views/app/Tags.vue'
import All from '@/components/app/layouts/AllProducts.vue'
import Filter from '@/components/app/layouts/ProductFilter.vue'
import DetailedTag from '@/views/app/DetailedTag.vue'
import DetailedProduct from '@/views/app/DetailedProduct.vue'
import DetailedSupplier from '@/views/app/DetailedSupplier.vue'
import Discount from '@/views/app/Discount.vue'
import Suppliers from '@/views/app/Suppliers.vue'
import Customers from '@/views/app/Customers.vue'
import Invoice from '@/views/app/Invoice.vue'
import Reports from '@/views/app/Reports.vue'
import ProductDetailsBasic from '@/components/app/layouts/ProductInfoDetails.vue'
import ProductDetailsStats from '@/components/app/layouts/ProductInfoStats.vue'
import ProductDetailsLogs from '@/components/app/layouts/ProductInfoLogs.vue'
import DetailedDiscount from '@/views/app/DetailedDiscount.vue'
import ProfileStoreDetails from '@/components/app/layouts/ProfileStoreDetails.vue'
import ProfileAdministration from '@/components/app/layouts/ProfileAdministration.vue'










//import Error404 from '@/views/web/Error404.vue'

const routes = [
  /*{ path: '/', component: WebHome,
  children: [
    { path: '/', component: Home, name: 'Home'},
    { path: '/about', name: 'About', component: About}
  ]},*/
  { path: '/', component: AdminHome, 
    meta: {requiresAuth: true },
    children: [
      { path: '/', name: 'Dashboard', component: Dashboard },
      { path: '/', component: Products,
      children: [
        { path: '/products', name: 'AllProducts', component: All},
        { path: '/products/filter/:id/:name', name: 'ProdFilter', component: Filter},
      ]
    },
    { path: '/notifications', name: 'Notifications', component: Notifications },
    { path: '/profile/:name', component: Profile, 
    children: [
      { path: '/profile/:name', name: 'ProfileStoreDetails', component: ProfileStoreDetails},
      { path: '/profile/:name/admins', name: 'ProfileAdministration', component: ProfileAdministration},
    ]},
    { path: '/settings', name: 'Settings', component: Settings },
    { path: '/tags', name: 'Tags', component: Tags },
    { path: '/tag/:id/:name', name: 'DetailedTag', component: DetailedTag },
    { path: '/product/:id/:name', component: DetailedProduct,
    children: [
      { path: '/product/:id/:name', name: 'ProductDetailsBasic', component: ProductDetailsBasic},
      { path: '/product/stats/:id/:name', name: 'ProductDetailsStats', component: ProductDetailsStats},
      { path: '/product/logs/:id/:name', name: 'ProductDetailsLogs', component: ProductDetailsLogs},
    ]},
    { path: '/discounts', name: 'Discount', component: Discount },
    { path: '/discounts/:id/:name', name: 'DetailedDiscount', component: DetailedDiscount },
    { path: '/supplier/:id/:name', name: 'DetailedSupplier', component: DetailedSupplier },
    { path: '/reports', name: 'Reports', component: Reports },
    { path: '/suppliers', name: 'Suppliers', component: Suppliers },
    { path: '/Customers', name: 'Customers', component: Customers },
    { path: '/invoice', name: 'Invoice', component: Invoice },

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
  //window.scrollTo(0,0)
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
