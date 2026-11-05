<script setup lang="ts">
import { parseOrder, renderTrusting, responses, withVat, type ResponseId } from '~/domain/order-contract'

const options = (Object.keys(responses) as ResponseId[]).map(id => ({ id, label: responses[id].label }))
const selected = ref<ResponseId>('renamed')

const body = computed(() => responses[selected.value].body)
const trusting = computed(() => renderTrusting(body.value))
const parsed = computed(() => parseOrder(body.value))
</script>

<template>
  <div>
    <h3>Change the API under the app</h3>
    <p class="why">
      TypeScript types disappear at runtime. A type says what the API should return, not what it did return. Change the response and compare the two versions. This is why a whole app's validation layer was rewritten with Zod and typed service boundaries.
    </p>
    <p class="principle">
      Parse, don't validate. The Dependency Rule.
    </p>
    <ChoiceGroup
      v-model="selected"
      :options="options"
      label="API response"
    />
    <pre tabindex="0">GET /orders/1042
{{ JSON.stringify(body, null, 2) }}</pre>
    <div class="two stacked">
      <div class="screen">
        <h4>Types only, trusting the response</h4>
        <div
          class="big"
          :class="{ bad: trusting.broken }"
        >
          {{ trusting.greeting }}<br>{{ trusting.total }}
        </div>
        <p class="note">
          {{ trusting.broken ? 'It compiled fine. The customer sees this.' : 'Works today.' }}
        </p>
      </div>
      <div class="screen">
        <h4>Parsed once at the boundary</h4>
        <template v-if="parsed.ok">
          <div class="big">
            Hello {{ parsed.order.customer }}<br>Total with VAT: AED {{ withVat(parsed.order.total) }}
          </div>
          <p class="note">
            Everything past the boundary can trust its type.
          </p>
        </template>
        <template v-else>
          <div class="big">
            This order could not load.
          </div>
          <p class="note good">
            Caught at the edge, with the exact field: {{ parsed.field }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>
