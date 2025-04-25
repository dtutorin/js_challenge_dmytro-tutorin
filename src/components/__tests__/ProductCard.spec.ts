import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import ProductCard from '../ProductCard.vue'

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  thumbnail: 'test.jpg'
}

describe('ProductCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders product information correctly', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct
      }
    })

    expect(wrapper.find('.product-title').text()).toBe('Test Product')
    expect(wrapper.find('.product-price').text()).toBe('$99.99')
    expect(wrapper.find('.product-image').attributes('src')).toBe('test.jpg')
  })

  it('emits add to cart event when button is clicked', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct
      }
    })

    await wrapper.find('.add-to-cart-btn').trigger('click')
    
    expect(wrapper.findComponent({ name: 'Alert' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'Alert' }).props('message')).toBe('Product has been added to cart')
  })
}) 