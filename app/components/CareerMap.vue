<script setup lang="ts">
import { roles, rolesUsing, skills } from '~/domain/career'

const m = useMessages()
const locale = useLocale()
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
  const rtl = getComputedStyle(host).direction === 'rtl'

  paths.value = [...host.querySelectorAll('.role.hit')].map((role) => {
    const target = role.getBoundingClientRect()
    const x1 = (rtl ? skill.left : skill.right) - box.left
    const y1 = skill.top + skill.height / 2 - box.top
    const x2 = (rtl ? target.right : target.left) - box.left
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
      :aria-label="m.career.skillsLabel"
    >
      <button
        v-for="skill in skills"
        :key="skill.name"
        class="skill"
        type="button"
        :aria-pressed="active === skill.name"
        @click="active = skill.name"
      >
        {{ m.career.skills[skill.name] }}
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
            {{ m.career.roles[role.id].title }}{{ locale === 'ar' ? '،' : ',' }}
            <bdi>{{ role.employer }}</bdi>
          </span>
          <span class="m">{{ m.career.roles[role.id].location }}. <bdi>{{ m.career.roles[role.id].dates }}</bdi></span>
        </summary>
        <div class="d">
          <p class="ctx">
            {{ m.career.roles[role.id].context }}
          </p>
          <p class="sites">
            <span class="lbl">{{ m.career.sitesLabel }}:</span>
            <template
              v-for="site in role.sites"
              :key="site.url"
            >
              {{ ' ' }}<a
                :href="site.url"
                target="_blank"
                rel="noopener"
              ><bdi>{{ site.name }}</bdi></a>
            </template>
          </p>
          <ul class="outcomes">
            <li
              v-for="outcome in m.career.roles[role.id].outcomes"
              :key="outcome"
            >
              {{ outcome }}
            </li>
          </ul>
          <ul
            class="tags"
            :aria-label="m.career.techLabel"
          >
            <li
              v-for="tag in role.tech"
              :key="tag"
            >
              <bdi>{{ tag }}</bdi>
            </li>
          </ul>
        </div>
      </details>
    </div>
  </div>
</template>
