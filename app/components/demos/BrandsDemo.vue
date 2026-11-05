<script setup lang="ts">
import { brands } from '~/domain/brands'

const m = useMessages()
const options = brands.map(brand => ({ id: brand.id, label: m.demos.brands.names[brand.id] ?? brand.id }))
const selected = ref('one')
const brand = computed(() => brands.find(item => item.id === selected.value) ?? brands[0]!)
const greeting = computed(() => m.demos.brands.greetings[brand.value.id] ?? '')
const tokens = computed(() => JSON.stringify({
  tenant: brand.value.id,
  tokens: { primary: brand.value.primary, surface: brand.value.surface, radius: brand.value.radius },
}, null, 2))
</script>

<template>
  <div>
    <h3>{{ m.demos.brands.heading }}</h3>
    <p class="why">
      {{ m.demos.brands.why }}
    </p>
    <p class="principle">
      {{ m.demos.brands.principle }}
    </p>
    <ChoiceGroup
      v-model="selected"
      :options="options"
      :label="m.demos.brands.label"
    />
    <div class="two">
      <div
        class="shop"
        :style="{ '--b': brand.primary, '--bi': '#FFFFFF', '--bs': brand.surface, '--r': brand.radius }"
      >
        <div class="top">
          <span>{{ m.demos.brands.names[brand.id] }}</span><span class="pill" />
        </div>
        <div class="tile">
          {{ greeting }}
        </div>
        <div class="row">
          <span>{{ m.demos.brands.account }}</span><span>{{ m.demos.brands.support }}</span>
        </div>
      </div>
      <pre tabindex="0">{{ tokens }}</pre>
    </div>
  </div>
</template>
