<script setup lang="ts">
const m = useMessages()
const { theme, toggle } = useTheme()
</script>

<template>
  <header class="bar">
    <div class="wrap">
      <strong>{{ m.nav.name }}</strong>
      <nav :aria-label="m.nav.label">
        <a href="#career">{{ m.nav.career }}</a>
        <a href="#demos">{{ m.nav.demos }}</a>
        <a href="#read">{{ m.nav.code }}</a>
        <a href="#contact">{{ m.nav.contact }}</a>
        <NuxtLink
          :to="m.nav.otherLanguagePath"
          :lang="m.nav.otherLanguageTag"
          data-testid="language"
        >{{ m.nav.otherLanguage }}</NuxtLink>
        <button
          class="switch"
          type="button"
          @click="toggle"
        >
          {{ theme === 'dark' ? m.nav.toLight : m.nav.toDark }}
        </button>
        <a
          class="btn small"
          :href="links.cv"
          download
        >{{ m.actions.cv }}</a>
      </nav>
    </div>
  </header>
</template>
