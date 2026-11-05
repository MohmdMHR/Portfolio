<script setup lang="ts">
const { theme, toggle } = useTheme()
</script>

<template>
  <header class="bar">
    <div class="wrap">
      <strong>Mohamed Mahir</strong>
      <nav aria-label="Main">
        <a href="#career">Career</a>
        <a href="#demos">Demos</a>
        <a href="#read">Code</a>
        <a href="#contact">Contact</a>
        <NuxtLink
          to="/ar"
          lang="ar"
          class="arabic"
        >العربية</NuxtLink>
        <button
          class="switch"
          type="button"
          @click="toggle"
        >
          {{ theme === 'dark' ? 'Light mode' : 'Dark mode' }}
        </button>
        <a
          class="btn small"
          :href="links.cv"
          download
        >Download CV</a>
      </nav>
    </div>
  </header>
</template>
