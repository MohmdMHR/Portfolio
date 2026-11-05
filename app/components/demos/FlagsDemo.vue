<script setup lang="ts">
import { checkoutFor, initialFlags, kill, release } from '~/domain/flags'

const flags = ref(initialFlags)
const isNew = (label: string) => label === 'New checkout'
const staging = computed(() => checkoutFor(flags.value, 'staging'))
const production = computed(() => checkoutFor(flags.value, 'production'))
</script>

<template>
  <div>
    <h3>Ship a rewrite nobody sees yet</h3>
    <p class="why">
      A high-traffic checkout was totally rewritten in Vue and TypeScript and proven in staging, with much of the development behind feature flags. Domain rules were pulled out of the UI and written test-first. Merging code and releasing it stopped being the same decision.
    </p>
    <p class="principle">
      Bounded Context. Anti-Corruption Layer. Test-first. Separate deploy from release.
    </p>
    <div class="ctrl">
      <button
        type="button"
        @click="flags = release(flags)"
      >
        Release to customers
      </button>
      <button
        type="button"
        @click="flags = kill(flags)"
      >
        Something broke: turn it off
      </button>
    </div>
    <div class="two">
      <div class="screen">
        <h4>Staging, the team testing</h4>
        <div
          class="big"
          :class="{ good: isNew(staging) }"
          data-testid="staging"
        >
          {{ staging }}
        </div>
      </div>
      <div class="screen">
        <h4>Production, real customers</h4>
        <div
          class="big"
          :class="{ good: isNew(production) }"
          data-testid="production"
          aria-live="polite"
        >
          {{ production }}
        </div>
      </div>
    </div>
  </div>
</template>
