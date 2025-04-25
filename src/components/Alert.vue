<template>
  <div 
    v-if="show" 
    class="alert" 
    :class="type"
  >
    <span class="alert-icon">{{ icon }}</span>
    <span class="alert-message">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  message: string
  type: 'success' | 'error'
  duration?: number
}>()

const show = ref(true)
const icon = props.type === 'success' ? '✅' : '❌'
const duration = props.duration ?? 900

onMounted(() => {
  setTimeout(() => {
    show.value = false
  }, duration)
})

defineExpose({
  show
})
</script>

<style scoped>
.alert {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: slideIn 0.3s ease-out;
  z-index: 1000;
}

.alert.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert-icon {
  font-size: 1.2rem;
}

.alert-message {
  font-weight: 500;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>

<script lang="ts">
export default {
  name: 'Alert'
}
</script> 