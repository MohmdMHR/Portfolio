<template>
  <div>
    <SiteHeader />
    <main>
    <div class="hero">
      <HeroFlow />
      <div class="wrap">
        <h1>Mohamed<br>Mahir</h1>
        <p class="title">
          Front-End Lead and Senior Full-Stack Engineer
        </p>
        <p class="lead">
          8+ years across iGaming, enterprise e-commerce and public-sector platforms. Based in Dubai, UAE.
        </p>
        <p class="stack">
          React, Vue, Nuxt, TypeScript, Node.js, NestJS, Laravel. Working in English, French and Arabic.
        </p>
        <div class="cta">
          <a
            class="btn"
            :href="links.cv"
            download
          >Download CV</a>
          <a :href="links.emailApp">Email</a>
          <a :href="links.whatsapp">WhatsApp</a>
          <a :href="links.linkedin">LinkedIn</a>
          <a :href="links.github">GitHub</a>
        </div>
      </div>
    </div>

      <section id="career">
        <div class="wrap">
          <h2>Eight years, one map</h2>
          <p class="intro">
            Pick a skill to see where it was used. Open a role for what happened there. Blacked-out names are clients and employers, and they are all on the CV.
          </p>
          <CareerMap />
        </div>
      </section>

      <section id="demos">
        <div class="wrap">
          <h2>Don't read about it. Break it.</h2>
          <p class="intro">
            Real problems from the work on the CV, rebuilt small so you can try them. These demos were written for this site. No client code.
          </p>
          <DemoTabs />
          <div class="also">
            <div>
              <h3>TypeScript into running code</h3>
              <p>A big-bang rewrite was off the table. It came in incrementally, with strictness tightening as files were touched. Seams, and the Boy Scout Rule.</p>
            </div>
            <div>
              <h3>Tokens as a shared language</h3>
              <p>Design decisions named once and used everywhere, across three squads and in telecom component libraries. Ubiquitous Language, between design and code.</p>
            </div>
            <div>
              <h3>Accessibility in the component</h3>
              <p>Page-by-page fixes get lost at the next change. Reusable WCAG-compliant catalog pieces for public procurement meant every page inherited them.</p>
            </div>
            <div>
              <h3>Reads off the backend</h3>
              <p>Faceted navigation asks many read questions per interaction, so catalog discovery moved to Algolia and Elasticsearch. A read model apart from the write model.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="read">
        <div class="wrap">
          <h2>Read the code</h2>
          <p class="intro">
            Client code stays private. This site is public, with its tests, CI and <a :href="links.notes">engineering notes</a> that go deeper on every case above. <a :href="links.repo">Open the repo</a>. Happy to do a live coding round too.
          </p>
        </div>
      </section>

      <section
        id="contact"
        class="last"
      >
        <div class="wrap">
          <h2>Write to Mohamed</h2>
          <p class="intro">
            Email or WhatsApp. Either goes straight to Mohamed.
          </p>
          <p class="big contact-address">
            <span class="sel">{{ links.email }}</span>
          </p>
          <div class="cta">
            <a
              class="btn"
              :href="links.gmail"
              target="_blank"
              rel="noopener"
            >Write in Gmail</a>
            <a :href="links.emailApp">Use your email app</a>
            <a :href="links.whatsapp">WhatsApp</a>
            <a :href="links.linkedin">LinkedIn</a>
            <a
              :href="links.cv"
              download
            >Download CV</a>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
