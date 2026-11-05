<script setup lang="ts">
import { simulateLostResponse } from '~/domain/redemption'

type Mode = 'key' | 'none'
const options: { id: Mode, label: string }[] = [
  { id: 'key', label: 'Run with an idempotency key' },
  { id: 'none', label: 'Run without one' },
]
const mode = ref<Mode>('key')
const run = computed(() => simulateLostResponse({ withKey: mode.value === 'key' }))
const revealed = ref(5)
const finished = computed(() => revealed.value >= run.value.log.length)

const result = computed(() => {
  if (!finished.value) return 'Running'
  return run.value.redemptions === 1 ? 'Redeemed once' : 'Redeemed twice'
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
    <h3>Lose the network mid-redemption</h3>
    <p class="why">
      A point-of-sale terminal retries when the network fails. On a coupon platform built with NestJS and PostgreSQL, redemption is idempotent, so a retry cannot redeem twice. Turn the key off and watch what a retry costs.
    </p>
    <p class="principle">
      Idempotency. Dependency Inversion through dependency injection.
    </p>
    <ChoiceGroup
      v-model="mode"
      :options="options"
      label="How the terminal retries"
    />
    <div class="two">
      <div class="screen">
        <h4>What happened</h4>
        <ol class="log">
          <li
            v-for="line in run.log.slice(0, revealed)"
            :key="line"
          >
            {{ line }}
          </li>
        </ol>
      </div>
      <div class="screen">
        <h4>Coupon ledger</h4>
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
