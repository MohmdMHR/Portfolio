<script setup lang="ts">
import { ref } from 'vue'
import TheGlobeMesh from './TheGlobeMesh.vue'

const isSuccess = ref(false)

// Expose method to parent
defineExpose({
  triggerSuccess: () => {
    isSuccess.value = true
    setTimeout(() => {
      isSuccess.value = false
    }, 3000)
  }
})
</script>

<template>
  <TresCanvas clear-color="#000000" alpha>
    <TheGlobeMesh :success="isSuccess" />
  </TresCanvas>
</template>

