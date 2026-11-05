<script setup lang="ts">
import { GATES, outcome, scenarios, type ScenarioId } from '~/domain/gates'

const options = (Object.keys(scenarios) as ScenarioId[]).map(id => ({ id, label: scenarios[id].label }))
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
    <h3>Get this past the gates</h3>
    <p class="why">
      Claude Code writes the implementation inside strict TypeScript, DDD boundaries and failing tests. Custom skills carry the team's conventions and are constrained by domain interfaces, and every task starts from a plan. Pick a change and send it through. The scenarios are based on real rejections.
    </p>
    <p class="principle">
      Contract-first. Domain modelling stays the ground truth, and AI speeds up execution inside it.
    </p>
    <ChoiceGroup
      v-model="selected"
      :options="options"
      label="Change to send through the gates"
    />
    <ol class="gates">
      <li
        v-for="(gate, index) in GATES"
        :key="gate"
        class="gate"
        :class="stateClass(index)"
      >
        {{ gate }}
        <small>{{ shown(index) === 'not reached' ? '' : shown(index) }}</small>
      </li>
    </ol>
    <p
      class="verdict"
      aria-live="polite"
    >
      {{ finished ? scenarios[selected].verdict : '' }}
    </p>
  </div>
</template>
