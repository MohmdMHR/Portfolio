<script setup lang="ts" generic="T extends string">
defineProps<{ options: readonly { id: T, label: string }[], label: string }>()
const selected = defineModel<T>({ required: true })
</script>

<template>
  <div
    class="ctrl"
    role="group"
    :aria-label="label"
  >
    <button
      v-for="option in options"
      :key="option.id"
      type="button"
      :aria-pressed="selected === option.id"
      @click="selected = option.id"
    >
      {{ option.label }}
    </button>
  </div>
</template>
