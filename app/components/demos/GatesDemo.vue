<script setup lang="ts">
import { GATES, outcome, scenarios, type ScenarioId } from '~/domain/gates'

const m = useMessages()
const options = (Object.keys(scenarios) as ScenarioId[]).map(id => ({ id, label: m.demos.gates.scenarios[id].label }))
const selected = ref<ScenarioId>('design')
const revealed = ref<number>(GATES.length)

const statuses = computed(() => outcome(selected.value))
const stop = computed(() => statuses.value.indexOf('rejected'))
const lastStep = computed(() => (stop.value === -1 ? GATES.length : stop.value + 1))
const finished = computed(() => revealed.value >= lastStep.value)

const shown = (index: number) => (index < revealed.value ? statuses.value[index] : undefined)
const stateClass = (index: number) => {
  const status = shown(index)
  if (status === 'passed') return 'ok'
  if (status === 'rejected') return 'no'
  return status === 'not reached' ? 'skip' : ''
}
const statusLabel = (index: number) => {
  const status = shown(index)
  if (status === 'passed') return m.demos.gates.passed
  return status === 'rejected' ? m.demos.gates.rejected : ''
}

let timer: ReturnType<typeof setTimeout> | undefined
const advance = () => {
  if (finished.value) return
  revealed.value += 1
  timer = setTimeout(advance, 430)
}

watch(selected, () => {
  clearTimeout(timer)
  if (prefersReducedMotion()) {
    revealed.value = GATES.length
    return
  }
  revealed.value = 0
  advance()
})
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div>
    <h3>{{ m.demos.gates.heading }}</h3>
    <p class="why">
      {{ m.demos.gates.why }}
    </p>
    <p class="principle">
      {{ m.demos.gates.principle }}
    </p>
    <ChoiceGroup
      v-model="selected"
      :options="options"
      :label="m.demos.gates.label"
    />
    <ol class="gates">
      <li
        v-for="(gate, index) in GATES"
        :key="gate"
        class="gate"
        :class="stateClass(index)"
      >
        {{ m.demos.gates.names[gate] }}
        <small>{{ statusLabel(index) }}</small>
      </li>
    </ol>
    <p
      class="verdict"
      aria-live="polite"
    >
      {{ finished ? m.demos.gates.scenarios[selected].verdict : '' }}
    </p>
  </div>
</template>
