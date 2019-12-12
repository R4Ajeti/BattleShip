import Vue from 'vue'
import VueRouter from 'vue-router'

import Ventas from '../views/ventas.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Ventas',
    component: Ventas
  },
  {
    path: '/inventario',
    name: 'Inventario',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "inventario" */ '../views/inventario.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
