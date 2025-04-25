<template>
  <div class="product-list">
    <div class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
    <div class="pagination">
      <button 
        @click="loadMore" 
        class="load-more-btn"
        :disabled="isLoading || skip >= total"
      >
        {{ isLoading ? 'Loading...' : 'Load More' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/interfaces/product'
import { api } from '@/services/api'
import { onMounted, ref } from 'vue'
import ProductCard from './ProductCard.vue'

const products = ref<Product[]>([])
const skip = ref(0)
const total = ref(0)
const isLoading = ref(false)

const loadProducts = async () => {
  isLoading.value = true
  try {
    const response = await api.getProducts(skip.value)
    products.value = [...products.value, ...response.products]
    total.value = response.total
  } catch (error) {
    console.error('Error loading products:', error)
  } finally {
    isLoading.value = false
  }
}

const loadMore = () => {
  skip.value += 6
  loadProducts()
}

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.product-list {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.load-more-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.load-more-btn:hover:not(:disabled) {
  background-color: #3aa876;
}

.load-more-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style> 