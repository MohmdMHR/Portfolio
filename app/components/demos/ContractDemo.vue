<script setup lang="ts">
import { parseOrder, renderTrusting, responses, withVat, type ResponseId } from '~/domain/order-contract'

const m = useMessages()
const options = (Object.keys(responses) as ResponseId[]).map(id => ({ id, label: m.demos.contract.responses[id] }))
const selected = ref<ResponseId>('renamed')

const body = computed(() => responses[selected.value])
const trusting = computed(() => renderTrusting(body.value))
const parsed = computed(() => parseOrder(body.value))
</script>

<template>
  <div>
    <h3>{{ m.demos.contract.heading }}</h3>
    <p class="why">
      {{ m.demos.contract.why }}
    </p>
    <p class="principle">
      {{ m.demos.contract.principle }}
    </p>
    <ChoiceGroup
      v-model="selected"
      :options="options"
      :label="m.demos.contract.label"
    />
    <pre tabindex="0">GET /orders/1042
{{ JSON.stringify(body, null, 2) }}</pre>
    <div class="two stacked">
      <div class="screen">
        <h4>{{ m.demos.contract.trustingHeading }}</h4>
        <div
          class="big"
          :class="{ bad: trusting.broken }"
          data-testid="trusting"
        >
          {{ m.demos.contract.hello(trusting.name) }}<br>{{ m.demos.contract.total(trusting.total) }}
        </div>
        <p class="note">
          {{ trusting.broken ? m.demos.contract.brokenNote : m.demos.contract.fineNote }}
        </p>
      </div>
      <div class="screen">
        <h4>{{ m.demos.contract.parsedHeading }}</h4>
        <template v-if="parsed.ok">
          <div class="big">
            {{ m.demos.contract.hello(parsed.order.customer) }}<br>{{ m.demos.contract.total(String(withVat(parsed.order.total))) }}
          </div>
          <p class="note">
            {{ m.demos.contract.trustNote }}
          </p>
        </template>
        <template v-else>
          <div class="big">
            {{ m.demos.contract.failed }}
          </div>
          <p class="note good">
            {{ m.demos.contract.caught(parsed.field) }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>
