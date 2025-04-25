import type { CartItem, CartItemInput } from '@/interfaces/cart'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  
  const totalItems = computed(() => 
    items.value.reduce((total, item) => total + item.quantity, 0)
  )
  
  const totalPrice = computed(() => 
    items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  )

  function addToCart(product: CartItemInput) {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({
        ...product,
        quantity: 1,
        addedAt: Date.now()
      })
    }
    
    // Сортируем по времени добавления (новые сверху)
    items.value.sort((a, b) => b.addedAt - a.addedAt)
    
    // Сохраняем в localStorage
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  function removeFromCart(productId: number) {
    items.value = items.value.filter(item => item.id !== productId)
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      localStorage.setItem('cart', JSON.stringify(items.value))
    }
  }

  function loadCart() {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      items.value = JSON.parse(savedCart)
    }
  }

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    loadCart
  }
}) 