<script setup lang="ts">
import BrandsDemo from './demos/BrandsDemo.vue'
import ContractDemo from './demos/ContractDemo.vue'
import DirectionDemo from './demos/DirectionDemo.vue'
import FlagsDemo from './demos/FlagsDemo.vue'
import GatesDemo from './demos/GatesDemo.vue'
import RedemptionDemo from './demos/RedemptionDemo.vue'
import ThinDemo from './demos/ThinDemo.vue'

const m = useMessages()
const demos = [
  { id: 'gates', component: GatesDemo },
  { id: 'direction', component: DirectionDemo },
  { id: 'contract', component: ContractDemo },
  { id: 'flags', component: FlagsDemo },
  { id: 'redemption', component: RedemptionDemo },
  { id: 'thin', component: ThinDemo },
  { id: 'brands', component: BrandsDemo },
] as const
const active = ref<string>(demos[0].id)
</script>

<template>
  <div>
    <div
      class="labnav"
      role="group"
      :aria-label="m.demos.label"
    >
      <button
        v-for="demo in demos"
        :key="demo.id"
        type="button"
        :aria-pressed="active === demo.id"
        @click="active = demo.id"
      >
        {{ m.demos.tabs[demo.id] }}
      </button>
    </div>
    <div
      v-for="demo in demos"
      v-show="active === demo.id"
      :key="demo.id"
      class="lab"
    >
      <component :is="demo.component" />
    </div>
  </div>
</template>
