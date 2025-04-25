import type { Product, ProductsResponse } from '@/interfaces/product'
import axios from 'axios'

const API_BASE_URL = 'https://dummyjson.com'

export const api = {
  async getProducts(skip = 0, limit = 6): Promise<ProductsResponse> {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: {
        skip,
        limit
      }
    })
    return response.data
  },

  async getProduct(id: number): Promise<Product> {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`)
    return response.data
  }
} 