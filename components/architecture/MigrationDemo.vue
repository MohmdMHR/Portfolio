<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createHighlighter } from 'shiki'

const containerRef = ref<HTMLElement | null>(null)
const sliderPosition = ref(50)
const isDragging = ref(false)

const legacyCode = `// Options API (Vue 2)
export default {
  data() {
    return {
      search: '',
      results: [],
      loading: false
    }
  },
  watch: {
    search(newVal) {
      this.debouncedSearch(newVal)
    }
  },
  methods: {
    async fetchResults(q) {
      this.loading = true
      try {
        const res = await api.get('/items', { q })
        this.results = res.data
      } finally {
        this.loading = false
      }
    },
    debouncedSearch: _.debounce(function(q) {
      this.fetchResults(q)
    }, 300)
  }
}`

const modernCode = `// Composition API (Vue 3 + TS)
const search = ref('')

const { data: results, pending } = useAsyncData(
  'search-results',
  () => $fetch('/api/items', { 
    query: { q: search.value } 
  }),
  {
    watch: [search],
    transform: (res) => res.data,
    delay: 300 // Built-in debounce
  }
)
`

const legacyHtml = ref('')
const modernHtml = ref('')

onMounted(async () => {
  const highlighter = await createHighlighter({
    themes: ['github-dark', 'tokyo-night'],
    langs: ['javascript', 'typescript', 'vue'],
  })

  legacyHtml.value = highlighter.codeToHtml(legacyCode, {
    lang: 'javascript',
    theme: 'github-dark'
  })

  modernHtml.value = highlighter.codeToHtml(modernCode, {
    lang: 'typescript',
    theme: 'tokyo-night'
  })
})

const startDrag = () => {
  isDragging.value = true
}

const stopDrag = () => {
  isDragging.value = false
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value || !containerRef.value) return
  
  const rect = containerRef.value.getBoundingClientRect()
  const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
  const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
  sliderPosition.value = (x / rect.width) * 100
}

</script>

<template>
  <div 
    class="relative h-[400px] w-full select-none overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-2xl"
    ref="containerRef"
    @mousemove="onDrag"
    @touchmove="onDrag"
    @mouseup="stopDrag"
    @mouseleave="stopDrag"
    @touchend="stopDrag"
  >
    <!-- Backgrounds -->
    <div class="absolute inset-0 flex">
      <!-- Left: Legacy Code -->
      <div 
        class="h-full w-full overflow-hidden bg-[#0d1117]"
      >
        <div class="p-4" v-html="legacyHtml"></div>
        <div class="absolute top-4 right-4 rounded bg-red-900/50 px-2 py-1 text-xs font-mono text-red-400 border border-red-700">
          LEGACY (Vue 2)
        </div>
      </div>
    </div>

    <!-- Right: Modern Code (Overlay) -->
    <div 
      class="absolute inset-0 overflow-hidden bg-[#1a1b26] border-l border-blue-500/50"
      :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }"
    >
      <div class="p-4" v-html="modernHtml"></div>
      <div class="absolute top-4 left-4 rounded bg-emerald-900/50 px-2 py-1 text-xs font-mono text-emerald-400 border border-emerald-700">
        MODERN (Vue 3)
      </div>
    </div>

    <!-- Slider Handle -->
    <div 
      class="absolute inset-y-0 w-1 cursor-ew-resize bg-blue-500 hover:bg-blue-400 active:bg-blue-300 z-20"
      :style="{ left: `${sliderPosition}%` }"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <div class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="m9 18 6-6-6-6"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white rotate-180 absolute"><path d="m9 18 6-6-6-6"/></svg>
      </div>
    </div>

  </div>
</template>

<style>
/* Shiki Scoped Styles */
pre.shiki {
  background-color: transparent !important;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}
</style>
