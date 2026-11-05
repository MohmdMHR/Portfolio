<script setup lang="ts">
import { simulateLostResponse } from '~/domain/redemption'

type Mode = 'key' | 'none'
const m = useMessages()
const options: { id: Mode, label: string }[] = [
  { id: 'key', label: m.demos.redemption.withKey },
  { id: 'none', label: m.demos.redemption.withoutKey },
]
const mode = ref<Mode>('key')
const run = computed(() => simulateLostResponse({ withKey: mode.value === 'key' }))
const revealed = ref(5)
const finished = computed(() => revealed.value >= run.value.log.length)

const result = computed(() => {
  if (!finished.value) return m.demos.redemption.running
  return run.value.redemptions === 1 ? m.demos.redemption.once : m.demos.redemption.twice
})

let timer: ReturnType<typeof setTimeout> | undefined
const advance = () => {
  if (finished.value) return
  revealed.value += 1
  timer = setTimeout(advance, 520)
}
watch(mode, () => {
  clearTimeout(timer)
  if (prefersReducedMotion()) {
    revealed.value = run.value.log.length
    return
  }
  revealed.value = 0
  advance()
})
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div>
    <h3>{{ m.demos.redemption.heading }}</h3>
    <p class="why">
      {{ m.demos.redemption.why }}
    </p>
    <p class="principle">
      {{ m.demos.redemption.principle }}
    </p>
    <ChoiceGroup
      v-model="mode"
      :options="options"
      :label="m.demos.redemption.label"
    />
    <div class="two">
      <div class="screen">
        <h4>{{ m.demos.redemption.logHeading }}</h4>
        <ol class="log">
          <li
            v-for="step in run.log.slice(0, revealed)"
            :key="step"
          >
            {{ m.demos.redemption.steps[step] }}
          </li>
        </ol>
      </div>
      <div class="screen">
        <h4>{{ m.demos.redemption.ledgerHeading }}</h4>
        <div
          class="big"
          :class="{ good: finished && run.redemptions === 1, bad: finished && run.redemptions > 1 }"
          aria-live="polite"
          data-testid="ledger"
        >
          {{ result }}
        </div>
      </div>
    </div>
  </div>
</template>
