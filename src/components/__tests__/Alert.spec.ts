import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Alert from '../Alert.vue'

describe('Alert', () => {
  it('renders success alert with correct message', () => {
    const wrapper = mount(Alert, {
      props: {
        message: 'Test message',
        type: 'success'
      }
    })

    expect(wrapper.text()).toContain('Test message')
    expect(wrapper.find('.alert').classes()).toContain('success')
    expect(wrapper.find('.alert-icon').text()).toBe('✅')
  })

  it('renders error alert with correct message', () => {
    const wrapper = mount(Alert, {
      props: {
        message: 'Error message',
        type: 'error'
      }
    })

    expect(wrapper.text()).toContain('Error message')
    expect(wrapper.find('.alert').classes()).toContain('error')
    expect(wrapper.find('.alert-icon').text()).toBe('❌')
  })

  it('hides after default duration', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Alert, {
      props: {
        message: 'Test message',
        type: 'success'
      }
    })

    expect(wrapper.isVisible()).toBe(true)
    
    await vi.advanceTimersByTime(900)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.isVisible()).toBe(false)
    vi.useRealTimers()
  })

  it('hides after custom duration', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Alert, {
      props: {
        message: 'Test message',
        type: 'success',
        duration: 500
      }
    })

    expect(wrapper.isVisible()).toBe(true)
    
    await vi.advanceTimersByTime(500)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.isVisible()).toBe(false)
    vi.useRealTimers()
  })
}) 