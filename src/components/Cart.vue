<template>
  <div class="cart">
    <h2>Shopping Cart</h2>
    <div v-if="isCartEmpty" class="empty-cart">
      Your cart is empty
    </div>
    <div v-else class="cart-items">
      <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <img :src="item.thumbnail" :alt="item.title" class="cart-item-image" />
        <div class="cart-item-info">
          <h3 class="cart-item-title">{{ item.title }}</h3>
          <p class="cart-item-price">${{ item.price }}</p>
          <div class="cart-item-quantity">
            <button @click="decreaseQuantity(item.id)" class="quantity-btn">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item.id)" class="quantity-btn">+</button>
          </div>
        </div>
        <button @click="removeFromCart(item.id)" class="remove-btn">×</button>
      </div>
    </div>
    <div class="cart-total">
      <p>Total: ${{ cartStore.totalPrice.toFixed(2) }}</p>
    </div>
    <Alert 
      v-if="showAlert" 
      :message="alertMessage" 
      :type="alertType" 
      :duration="1000"
      @close="showAlert = false"
    />
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '@/interfaces/cart'
import { useCartStore } from '@/stores/cart'
import { computed, ref } from 'vue'
import Alert from './Alert.vue'

const cartStore = useCartStore()
const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref<'success' | 'error'>('success')

const isCartEmpty = computed(() => cartStore.items.length === 0)

const showNotification = (message: string, type: 'success' | 'error') => {
  alertMessage.value = message
  alertType.value = type
  showAlert.value = true
}

const updateQuantity = (productId: number, quantity: number) => {
  cartStore.updateQuantity(productId, quantity)
  showNotification('Product quantity has been updated', 'success')
}

const removeFromCart = (productId: number) => {
  cartStore.removeFromCart(productId)
  showNotification('Product has been removed from cart', 'success')
}

const decreaseQuantity = (productId: number) => {
  const item = cartStore.items.find((item: CartItem) => item.id === productId)
  if (item && item.quantity > 1) {
    updateQuantity(productId, item.quantity - 1)
  } else {
    removeFromCart(productId)
  }
}

const increaseQuantity = (productId: number) => {
  const item = cartStore.items.find((item: CartItem) => item.id === productId)
  if (item) {
    updateQuantity(productId, item.quantity + 1)
  }
}

</script>

<style scoped>
.cart {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* max-width: 1024px; */
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.empty-cart {
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 1.2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: white;
  transition: transform 0.2s;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.cart-item-info {
  flex: 1;
  min-width: 0;
}

.cart-item-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cart-item-price {
  margin: 4px 0;
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.1rem;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.2s;
}

.quantity-btn:hover {
  background: #f5f5f5;
  border-color: #ccc;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 8px;
  transition: color 0.2s;
  flex-shrink: 0;
}

.remove-btn:hover {
  color: #ff4444;
}

.cart-total {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #eee;
  text-align: right;
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-item-image {
    width: 100%;
    height: 200px;
  }

  .cart-item-info {
    width: 100%;
  }

  .remove-btn {
    position: absolute;
    top: 16px;
    right: 16px;
  }
}

@media (max-width: 480px) {
  .cart {
    padding: 16px;
  }

  .cart-item {
    padding: 12px;
  }

  .cart-item-image {
    height: 160px;
  }

  .cart-total {
    font-size: 1.2rem;
  }
}
</style> 