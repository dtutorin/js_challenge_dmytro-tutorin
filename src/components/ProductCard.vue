<template>
  <div class="product-card">
    <img 
      :src="product.thumbnail" 
      :alt="product.title" 
      class="product-image" 
      @error="handleImageError"
    />
    <div class="product-info">
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-price">${{ product.price }}</p>
      <button @click="addToCart" class="add-to-cart-btn">{{ $t('common.addToCart') }}</button>
    </div>
    <Alert 
      v-if="showAlert" 
      :message="$t('alerts.addedToCart')" 
      type="success"
      @close="showAlert = false"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProductCard'
}
</script>

<script setup lang="ts">
import type { Product } from '@/interfaces/product';
import { useCartStore } from '@/stores/cart';
import { defineProps, ref } from 'vue';
import Alert from './Alert.vue';

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
const showAlert = ref(false)
const imageError = ref(false)

const handleImageError = () => {
  imageError.value = true
}

const addToCart = () => {
  cartStore.addToCart({
    id: props.product.id,
    title: props.product.title,
    price: props.product.price,
    thumbnail: props.product.thumbnail
  })
  showAlert.value = true
}
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  height: 100%;
  box-sizing: border-box;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  aspect-ratio: 1;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 0.9rem;
}

.product-image::after {
  content: attr(data-no-image);
  display: block;
  text-align: center;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: 700;
  margin: 0;
}

.add-to-cart-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
  margin-top: auto;
}

.add-to-cart-btn:hover {
  background-color: #3aa876;
}
</style> 