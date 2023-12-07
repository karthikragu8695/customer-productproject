import { createRouter, createWebHistory } from 'vue-router'
import CustomerDetails from'../components/CustomerDetails'
import ProductDetails from'../components/ProductDetails'

const routes = [
  {
    path: '/',
    component: CustomerDetails
  },
  {
    path: '/',
    component: ProductDetails
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
