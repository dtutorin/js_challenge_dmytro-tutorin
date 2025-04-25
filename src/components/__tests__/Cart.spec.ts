import { useCartStore } from '@/stores/cart'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import Cart from '../Cart.vue'

const mockItems = [
  {
    id: 1,
    title: 'Product 1',
    price: 10,
    thumbnail: 'test1.jpg',
    quantity: 2
  },
  {
    id: 2,
    title: 'Product 2',
    price: 20,
    thumbnail: 'test2.jpg',
    quantity: 1
  }
]

describe('Cart', () => {
  let store: ReturnType<typeof useCartStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useCartStore()
    store.items = [...mockItems]
  })

  it('renders empty cart message when no items', () => {
    store.items = []
    const wrapper = mount(Cart)
    expect(wrapper.find('.empty-cart').exists()).toBe(true)
  })

  it('renders cart items correctly', () => {
    const wrapper = mount(Cart)
    expect(wrapper.findAll('.cart-item')).toHaveLength(2)
    expect(wrapper.find('.cart-total').text()).toContain('$40.00')
  })

  it('increases item quantity when plus button is clicked', async () => {
    const wrapper = mount(Cart)
    const plusButton = wrapper.findAll('.quantity-btn')[1]
    await plusButton.trigger('click')
    expect(store.items[0].quantity).toBe(3)
  })

  it('decreases item quantity when minus button is clicked', async () => {
    const wrapper = mount(Cart)
    const minusButton = wrapper.findAll('.quantity-btn')[0]
    await minusButton.trigger('click')
    expect(store.items[0].quantity).toBe(1)
  })

  it('removes item when remove button is clicked', async () => {
    const wrapper = mount(Cart)
    const removeButton = wrapper.find('.remove-btn')
    await removeButton.trigger('click')
    expect(store.items).toHaveLength(1)
  })
}) 