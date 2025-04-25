import Cart from '@/components/Cart.vue'
import ProductList from '@/components/ProductList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductList
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ]
})

export default router 