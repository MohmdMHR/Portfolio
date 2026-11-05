<script setup lang="ts">
import { brands } from '~/domain/brands'

const options = brands.map(brand => ({ id: brand.id, label: brand.name }))
const selected = ref('one')
const brand = computed(() => brands.find(item => item.id === selected.value) ?? brands[0]!)
const tokens = computed(() => JSON.stringify({
  tenant: brand.value.id,
  tokens: { primary: brand.value.primary, surface: brand.value.surface, radius: brand.value.radius },
  copy: { greeting: brand.value.greeting },
}, null, 2))
</script>

<template>
  <div>
    <h3>Rebrand the product</h3>
    <p class="why">
      Every new brand is a chance to fork the product. Across a multi-tenant iGaming engine and 4 React white-label platforms built from scratch, what varies lives outside the code path: runtime theming, tokenized environment variables, tenant data resolved by tenant ID. Switch brands. The components stay the same.
    </p>
    <p class="principle">
      Open/Closed. Separate what varies from what stays.
    </p>
    <ChoiceGroup
      v-model="selected"
      :options="options"
      label="Brand"
    />
    <div class="two">
      <div
        class="shop"
        :style="{ '--b': brand.primary, '--bi': '#FFFFFF', '--bs': brand.surface, '--r': brand.radius }"
      >
        <div class="top">
          <span>{{ brand.name }}</span><span class="pill" />
        </div>
        <div class="tile">
          {{ brand.greeting }}
        </div>
        <div class="row">
          <span>Account</span><span>Support</span>
        </div>
      </div>
      <pre tabindex="0">{{ tokens }}</pre>
    </div>
  </div>
</template>
