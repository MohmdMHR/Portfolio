<script setup lang="ts">
import { shallowRef, toRefs } from 'vue'
import { useLoop } from '@tresjs/core'
import type { Mesh } from 'three'

const props = defineProps<{
  success: boolean
}>()

const { success } = toRefs(props)
const sphereRef = shallowRef<Mesh | null>(null)
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (sphereRef.value) {
    // Base rotation
    sphereRef.value.rotation.y += delta * 0.1
    
    // Fast spin on success
    if (success.value) {
      sphereRef.value.rotation.y += delta * 2
    }
  }
})
</script>

<template>
  <TresPerspectiveCamera :position="[0, 0, 3.5]" :fov="45" />
  
  <!-- Wireframe Globe -->
  <TresMesh ref="sphereRef" :rotation="[0.2, 0, 0]">
    <TresSphereGeometry :args="[1.5, 32, 32]" />
    <TresMeshBasicMaterial 
      :color="success ? '#10b981' : '#1e3a8a'" 
      wireframe 
      :transparent="true"
      :opacity="0.3"
    />
  </TresMesh>
  
  <!-- Ambient Light -->
  <TresAmbientLight :intensity="1" />
</template>
