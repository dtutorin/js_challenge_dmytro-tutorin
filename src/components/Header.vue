<template>
  <header class="header">
    <div class="header-left">
      <div class="logo">ABC Store</div>
    </div>
    <div class="header-right">
      <div class="cart-info">
        <router-link to="/cart" class="cart-link">
          <span class="cart-icon">🛒</span>
          <span class="cart-count">{{ cartStore.totalItems }}</span>
          <span class="cart-total">${{ cartStore.totalPrice.toFixed(2) }}</span>
        </router-link>
      </div>
      <div class="relative">
        <button 
          class="menu-toggle" 
          @click="toggleMenu"
          type="button"
        >
          <span class="menu-icon" :class="{ 'menu-icon--active': isMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        <div 
          v-if="isMenuOpen" 
          class="dropdown-menu"
        >
          <ul class="menu-list">
            <li>
              <router-link 
                to="/" 
                class="menu-item"
                @click="closeMenu"
              >
                <span class="menu-icon">🏠</span>
                <span>Home</span>
              </router-link>
            </li>
            <li>
              <router-link 
                to="/cart" 
                class="menu-item"
                @click="closeMenu"
              >
                <span class="menu-icon">🛒</span>
                <span>Cart</span>
                <span class="cart-count">{{ cartStore.totalItems }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { onMounted, ref } from 'vue'

const cartStore = useCartStore()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

onMounted(() => {
  cartStore.loadCart()
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
}

.header-right {
  display: flex;
  align-items: center;
}

.cart-info {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.cart-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #2c3e50;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.cart-link:hover {
  background-color: #f5f5f5;
}

.cart-icon {
  font-size: 1.2rem;
}

.cart-total {
  font-weight: 600;
}

.menu-toggle {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 24px;
}

.menu-icon span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: #2c3e50;
  transition: all 0.3s ease;
}

.menu-icon--active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-icon--active span:nth-child(2) {
  opacity: 0;
}

.menu-icon--active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
}

.menu-list {
  list-style: none;
  padding: 8px 0;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #2c3e50;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item.router-link-active {
  background-color: #42b983;
  color: white;
}

.menu-icon {
  font-size: 1.2rem;
}

.cart-count {
  margin-left: auto;
  background-color: #42b983;
  color: white;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.menu-item.router-link-active .cart-count {
  background-color: white;
  color: #42b983;
}
</style> 