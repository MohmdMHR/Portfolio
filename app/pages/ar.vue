<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'ar', dir: 'rtl' },
  title: 'محمد ماهر، قائد تطوير الواجهات الأمامية ومهندس Full-Stack أول',
})
</script>

<template>
  <main class="hero arabic">
    <HeroFlow />
    <div class="wrap">
      <h1>محمد ماهر</h1>
      <p class="title">
        قائد تطوير الواجهات الأمامية ومهندس Full-Stack أول
      </p>
      <p class="lead">
        أكثر من 8 سنوات من الخبرة في منصات iGaming والتجارة الإلكترونية والقطاع العام. مقيم في دبي، الإمارات.
      </p>
      <p class="stack">
        <span class="ltr">React, Vue, Nuxt, TypeScript, Node.js, NestJS, Laravel</span>. أعمل بالعربية والإنجليزية والفرنسية.
      </p>
      <div class="cta">
        <a
          class="btn"
          :href="links.cv"
          download
        >تحميل السيرة الذاتية</a>
        <a :href="links.emailApp">البريد الإلكتروني</a>
        <a :href="links.whatsapp">واتساب</a>
        <a :href="links.linkedin">LinkedIn</a>
        <a :href="links.github">GitHub</a>
        <NuxtLink
          to="/"
          lang="en"
        >English</NuxtLink>
      </div>
    </div>
  </main>
</template>
