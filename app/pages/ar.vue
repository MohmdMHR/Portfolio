<script setup lang="ts">
import { ar } from '~/i18n/ar'

useHead({
  htmlAttrs: { lang: 'ar', dir: 'rtl' },
  title: ar.meta.title,
  meta: [{ name: 'description', content: ar.meta.description }],
})
</script>

<template>
  <SitePage />
</template>
