<script setup lang="ts">
import { initialFlags, kill, release, usesNewCheckout } from '~/domain/flags'

const m = useMessages()
const flags = ref(initialFlags)
const label = (isNew: boolean) => (isNew ? m.demos.flags.newCheckout : m.demos.flags.oldCheckout)
const staging = computed(() => usesNewCheckout(flags.value, 'staging'))
const production = computed(() => usesNewCheckout(flags.value, 'production'))
</script>

<template>
  <div>
    <h3>{{ m.demos.flags.heading }}</h3>
    <p class="why">
      {{ m.demos.flags.why }}
    </p>
    <p class="principle">
      {{ m.demos.flags.principle }}
    </p>
    <div class="ctrl">
      <button
        type="button"
        @click="flags = release(flags)"
      >
        {{ m.demos.flags.release }}
      </button>
      <button
        type="button"
        @click="flags = kill(flags)"
      >
        {{ m.demos.flags.kill }}
      </button>
    </div>
    <div class="two">
      <div class="screen">
        <h4>{{ m.demos.flags.staging }}</h4>
        <div
          class="big"
          :class="{ good: staging }"
          data-testid="staging"
        >
          {{ label(staging) }}
        </div>
      </div>
      <div class="screen">
        <h4>{{ m.demos.flags.production }}</h4>
        <div
          class="big"
          :class="{ good: production }"
          data-testid="production"
          aria-live="polite"
        >
          {{ label(production) }}
        </div>
      </div>
    </div>
  </div>
</template>
