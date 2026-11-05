<script setup lang="ts">
type Direction = 'rtl' | 'ltr'

const m = useMessages()
const direction = ref<Direction>(useLocale() === 'ar' ? 'rtl' : 'ltr')
const options = computed(() => [
  { id: 'rtl' as const, label: m.demos.direction.arabic },
  { id: 'ltr' as const, label: m.demos.direction.english },
])

const copy = {
  rtl: {
    nav: ['الرئيسية', 'الطلبات', 'الحساب'],
    order: 'طلبك رقم',
    item: 'باقة إنترنت الألياف',
    call: 'للاستفسار اتصل على',
  },
  ltr: {
    nav: ['Home', 'Orders', 'Account'],
    order: 'Your order no.',
    item: 'Fibre internet plan',
    call: 'For help, call',
  },
}
const text = computed(() => copy[direction.value])

const rule = `.item { padding-inline-start: 16px; }  /* not padding-left */
.arrow:dir(rtl) { transform: scaleX(-1); }
<bdi>+971 4 000 0000</bdi>                 /* numbers stay readable */`
</script>

<template>
  <div>
    <h3>{{ m.demos.direction.heading }}</h3>
    <p class="why">
      {{ m.demos.direction.why }}
    </p>
    <p class="principle">
      {{ m.demos.direction.principle }}
    </p>
    <ChoiceGroup
      v-model="direction"
      :options="options"
      :label="m.demos.direction.label"
    />
    <div class="two">
      <div
        class="flip"
        :dir="direction"
        :lang="direction === 'rtl' ? 'ar' : 'en'"
        data-testid="flip"
      >
        <nav>
          <span
            v-for="link in text.nav"
            :key="link"
          >{{ link }}</span>
        </nav>
        <div class="item">
          <span class="thumb" />
          <span class="grow">{{ text.item }}<br>{{ text.order }} <bdi>10428</bdi></span>
          <span class="price"><bdi>AED 240</bdi></span>
          <svg
            class="arrow"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          ><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </div>
        <p class="note">
          {{ text.call }} <bdi>+971 4 000 0000</bdi>
        </p>
      </div>
      <div>
        <p class="note first">
          {{ m.demos.direction.codeNote }}
        </p>
        <pre tabindex="0">{{ rule }}</pre>
      </div>
    </div>
  </div>
</template>
