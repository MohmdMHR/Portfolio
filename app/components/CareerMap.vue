<script setup lang="ts">
import { roles, rolesUsing, skills } from '~/domain/career'

const active = ref('Vue')
const paths = ref<string[]>([])

const map = useTemplateRef<HTMLElement>('map')
const hits = computed(() => new Set(rolesUsing(active.value).map(role => role.id)))
const anyHit = computed(() => hits.value.size > 0)

function drawLinks() {
  const host = map.value
  if (!host || innerWidth <= 820) {
    paths.value = []
    return
  }
  const box = host.getBoundingClientRect()
  const skill = host.querySelector('.skill[aria-pressed="true"]')?.getBoundingClientRect()
  if (!skill) return

  paths.value = [...host.querySelectorAll('.role.hit')].map((role) => {
    const target = role.getBoundingClientRect()
    const x1 = skill.right - box.left
    const y1 = skill.top + skill.height / 2 - box.top
    const x2 = target.left - box.left
    const y2 = target.top + target.height / 2 - box.top
    const middle = (x1 + x2) / 2
    return `M${x1} ${y1}C${middle} ${y1} ${middle} ${y2} ${x2} ${y2}`
  })
}

const redraw = () => nextTick(drawLinks)

watch(active, redraw)
onMounted(() => {
  drawLinks()
  window.addEventListener('resize', drawLinks)
  document.fonts?.ready.then(drawLinks)
})
onBeforeUnmount(() => window.removeEventListener('resize', drawLinks))
</script>

<template>
  <div
    ref="map"
    class="map"
  >
    <svg aria-hidden="true">
      <path
        v-for="path in paths"
        :key="path"
        :d="path"
        fill="none"
        stroke="var(--accent)"
        stroke-width="1.5"
      />
    </svg>
    <div
      class="skills"
      role="group"
      aria-label="Skills"
    >
      <button
        v-for="skill in skills"
        :key="skill.name"
        class="skill"
        type="button"
        :aria-pressed="active === skill.name"
        @click="active = skill.name"
      >
        {{ skill.name }}
      </button>
    </div>
    <div class="roles">
      <details
        v-for="(role, index) in roles"
        :key="role.id"
        class="role"
        :class="{ hit: hits.has(role.id), dim: anyHit && !hits.has(role.id) }"
        :open="index === 0"
        @toggle="redraw"
      >
        <summary>
          <span class="t">
            {{ role.title }},
            <template v-if="role.employer">
              {{ role.employer }}<template v-if="role.forWithheldClient">, for <RedactedName /></template>
            </template>
            <RedactedName v-else />
          </span>
          <span class="m">{{ role.context }}. {{ role.dates }}</span>
        </summary>
        <p class="d">
          {{ role.detail }}
        </p>
      </details>
    </div>
  </div>
</template>
