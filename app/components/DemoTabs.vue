<script setup lang="ts">
import BrandsDemo from './demos/BrandsDemo.vue'
import ContractDemo from './demos/ContractDemo.vue'
import FlagsDemo from './demos/FlagsDemo.vue'
import GatesDemo from './demos/GatesDemo.vue'
import RedemptionDemo from './demos/RedemptionDemo.vue'
import ThinDemo from './demos/ThinDemo.vue'

const demos = [
  { name: 'Working with Claude Code', component: GatesDemo },
  { name: 'Contract drift', component: ContractDemo },
  { name: 'Feature flags', component: FlagsDemo },
  { name: 'Idempotency', component: RedemptionDemo },
  { name: 'Thin controllers', component: ThinDemo },
  { name: 'One engine, many brands', component: BrandsDemo },
]
const active = ref(demos[0]?.name)
</script>

<template>
  <div>
    <div
      class="labnav"
      role="group"
      aria-label="Demos"
    >
      <button
        v-for="demo in demos"
        :key="demo.name"
        type="button"
        :aria-pressed="active === demo.name"
        @click="active = demo.name"
      >
        {{ demo.name }}
      </button>
    </div>
    <div
      v-for="demo in demos"
      v-show="active === demo.name"
      :key="demo.name"
      class="lab"
    >
      <component :is="demo.component" />
    </div>
  </div>
</template>
