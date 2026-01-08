<script setup lang="ts">
import { useLocalization } from '~/composables/useLocalization'

const { currentLocale, setLocale } = useLocalization()

const locales = ['en', 'fr', 'ar'] as const
</script>

<template>
  <div class="flex items-center gap-1 rounded-full border border-slate-800 bg-slate-950/50 p-1 backdrop-blur-sm">
    <button
      v-for="locale in locales"
      :key="locale"
      @click="setLocale(locale)"
      class="relative rounded-full px-3 py-1 text-xs font-bold uppercase transition-all"
      :class="currentLocale === locale ? 'text-slate-950' : 'text-slate-400 hover:text-slate-200'"
    >
      <span v-if="currentLocale === locale" class="absolute inset-0 rounded-full bg-slate-100 mix-blend-screen" style="z-index: -1;"></span>
      {{ locale }}
    </button>
  </div>
</template>
