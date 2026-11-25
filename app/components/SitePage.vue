<script setup lang="ts">
const m = useMessages()
</script>

<template>
  <div>
    <SiteHeader />
    <main>
      <div class="hero">
        <HeroFlow />
        <div class="wrap">
          <h1>{{ `${m.hero.first} ` }}<br>{{ m.hero.last }}</h1>
          <p class="title">
            {{ m.hero.title }}
          </p>
          <p class="lead">
            {{ m.hero.lead }}
          </p>
          <p class="stack">
            {{ m.hero.stack }}
          </p>
          <div class="cta">
            <a
              class="btn"
              :href="links.cv"
              download
            >{{ m.actions.cv }}</a>
            <a
              class="btn wa"
              :href="links.whatsapp"
            ><IconWhatsApp />{{ m.actions.whatsapp }}</a>
            <a
              class="btn mail"
              :href="links.emailApp"
            ><IconMail />{{ m.actions.email }}</a>
            <a :href="links.linkedin">{{ m.actions.linkedin }}</a>
            <a :href="links.github">{{ m.actions.github }}</a>
          </div>
        </div>
      </div>

      <section id="work">
        <div class="wrap">
          <h2>{{ m.work.heading }}</h2>
          <p class="intro">
            {{ m.work.intro }}
          </p>
          <ul class="work">
            <li
              v-for="item in m.work.items"
              :key="item.name"
            >
              <p class="via">
                <bdi>{{ item.via }}</bdi>
              </p>
              <h3>{{ item.name }}</h3>
              <p class="part">
                {{ item.part }}
              </p>
              <p
                v-if="item.result"
                class="result"
              >
                {{ item.result }}
              </p>
              <p class="wstack">
                <bdi>{{ item.stack }}</bdi>
              </p>
              <a
                v-if="item.url"
                class="site"
                :href="item.url"
                target="_blank"
                rel="noopener"
              ><bdi>{{ item.site }}</bdi></a>
              <p
                v-else
                class="site private"
              >
                {{ m.work.privateLabel }}
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section id="career">
        <div class="wrap">
          <h2>{{ m.career.heading }}</h2>
          <p class="intro">
            {{ m.career.intro }}
          </p>
          <CareerMap />
        </div>
      </section>

      <section id="demos">
        <div class="wrap">
          <h2>{{ m.demos.heading }}</h2>
          <p class="intro">
            {{ m.demos.intro }}
          </p>
          <DemoTabs />
          <div class="also">
            <div
              v-for="item in m.demos.also"
              :key="item.heading"
            >
              <h3>{{ item.heading }}</h3>
              <p>{{ item.body }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="read">
        <div class="wrap">
          <h2>{{ m.code.heading }}</h2>
          <p class="intro">
            {{ m.code.before }} <a :href="links.notes">{{ m.code.notes }}</a> {{ m.code.after }} <a :href="links.repo">{{ m.code.repo }}</a>.
          </p>
        </div>
      </section>

      <section
        id="contact"
        class="last"
      >
        <div class="wrap">
          <h2>{{ m.contact.heading }}</h2>
          <p class="intro">
            {{ m.contact.intro }}
          </p>
          <p class="big contact-address">
            <span class="sel">{{ links.email }}</span>
          </p>
          <div class="cta">
            <a
              class="btn wa"
              :href="links.whatsapp"
            ><IconWhatsApp />{{ m.actions.whatsapp }}</a>
            <a
              class="btn mail"
              :href="links.gmail"
              target="_blank"
              rel="noopener"
            ><IconMail />{{ m.actions.gmail }}</a>
            <a :href="links.emailApp">{{ m.actions.emailApp }}</a>
            <a :href="links.linkedin">{{ m.actions.linkedin }}</a>
            <a
              :href="links.cv"
              download
            >{{ m.actions.cv }}</a>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
