const themeBootstrap = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}`

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  modules: ['@nuxt/eslint'],
  css: ['~/assets/main.css'],
  typescript: { strict: true, typeCheck: false },
  devtools: { enabled: false },
  telemetry: false,
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Mohamed Mahir, Senior Full Stack Engineer | Front-End Tech Lead',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        {
          name: 'description',
          content: 'Mohamed Mahir, Senior Full Stack Engineer and Front-End Tech Lead in Dubai. 8 years building web platforms with React, Vue, Nuxt, TypeScript, Node.js (NestJS) and Laravel.',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Kufi+Arabic:wght@500;700;900&display=swap',
        },
      ],
      script: [{ innerHTML: themeBootstrap, tagPosition: 'head' }],
    },
  },
  nitro: {
    prerender: { routes: ['/', '/ar'] },
  },
})
