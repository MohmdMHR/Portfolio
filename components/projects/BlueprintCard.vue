<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  project: {
    title: string
    description: string
    stack: string[]
    link?: string
  }
}>()

const isXRayEnabled = ref(false)
</script>

<template>
  <div class="group relative w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl transition-all hover:border-blue-500/50">
    
    <!-- Blueprint Grid Background (visible in X-Ray) -->
    <div 
      class="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700"
      :class="isXRayEnabled ? 'opacity-100' : 'opacity-0'"
      style="
        background-image: radial-gradient(circle, #1e40af 1px, transparent 1px);
        background-size: 20px 20px;
      "
    ></div>

    <!-- Header -->
    <div class="relative z-10 flex items-center justify-between border-b border-slate-700 bg-slate-900/90 p-4 backdrop-blur">
      <div>
        <h3 class="font-mono text-lg font-bold tracking-wider text-slate-100">
          PROJECT: {{ project.title.toUpperCase() }}
        </h3>
        <p class="text-xs text-slate-400">{{ project.description }}</p>
      </div>
      
      <!-- Toggle Switch -->
      <div class="flex items-center gap-3">
        <span class="font-mono text-xs font-bold text-blue-400" :class="{ 'animate-pulse': isXRayEnabled }">
          X-RAY MODE
        </span>
        <button 
          @click="isXRayEnabled = !isXRayEnabled"
          class="relative h-6 w-12 rounded-full border border-slate-600 bg-slate-800 transition-colors focus:outline-none"
          :class="{ 'border-blue-500 bg-blue-900/30': isXRayEnabled }"
        >
          <span 
            class="absolute left-1 top-1 h-4 w-4 rounded-full bg-slate-400 transition-transform duration-300"
            :class="{ 'translate-x-6 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]': isXRayEnabled }"
          ></span>
        </button>
      </div>
    </div>

    <!-- Viewport -->
    <div class="relative h-64 w-full overflow-hidden bg-slate-950 p-6">
      
      <!-- HIGH FIDELITIY UI LAYER -->
      <div 
        class="absolute inset-0 flex flex-col gap-4 p-6 transition-all duration-700 ease-in-out"
        :class="isXRayEnabled ? 'opacity-10 translate-y-4 blur-sm scale-95' : 'opacity-100 scale-100'"
      >
        <!-- Mock Navbar -->
        <div class="flex h-8 w-full items-center justify-between rounded bg-slate-800 px-4">
          <div class="h-2 w-20 rounded bg-slate-600"></div>
          <div class="flex gap-2">
             <div class="h-4 w-4 rounded-full bg-slate-700"></div>
             <div class="h-4 w-4 rounded-full bg-slate-700"></div>
          </div>
        </div>
        
        <!-- Mock Dashboard Content -->
        <div class="flex flex-1 gap-4">
          <!-- Sidebar -->
          <div class="w-1/4 rounded bg-slate-800/50 p-2">
            <div class="mb-2 h-2 w-3/4 rounded bg-slate-700"></div>
            <div class="mb-2 h-2 w-1/2 rounded bg-slate-700"></div>
            <div class="h-2 w-2/3 rounded bg-slate-700"></div>
          </div>
          <!-- Main Area -->
          <div class="flex-1 rounded bg-slate-800/80 p-4">
            <div class="mb-4 flex gap-4">
               <div class="h-20 w-1/3 rounded bg-emerald-500/20 border border-emerald-500/30"></div>
               <div class="h-20 w-1/3 rounded bg-indigo-500/20 border border-indigo-500/30"></div>
               <div class="h-20 w-1/3 rounded bg-orange-500/20 border border-orange-500/30"></div>
            </div>
            <div class="h-24 w-full rounded bg-slate-700/30"></div>
          </div>
        </div>
      </div>

      <!-- WIREFRAME / ARCHITECTURE LAYER -->
      <div 
        class="absolute inset-0 p-6 transition-all duration-700 ease-in-out"
        :class="isXRayEnabled ? 'opacity-100 scale-100' : 'opacity-0 -translate-y-4 scale-105 pointer-events-none'"
      >
        <!-- Blueprint Schematic Lines -->
        <div class="absolute inset-0 border-2 border-dashed border-blue-500/30 m-4 rounded box-border"></div>
        
        <!-- Connecting Lines SVG -->
        <svg class="absolute inset-0 h-full w-full pointer-events-none">
           <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4 4" class="opacity-40" />
           <line x1="80%" y1="30%" x2="50%" y2="50%" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4 4" class="opacity-40" />
           <circle cx="50%" cy="50%" r="40" fill="none" stroke="#60a5fa" stroke-width="1" class="animate-pulse opacity-50" />
        </svg>

        <!-- Dynamic Stack Badges -->
        <div class="relative h-full w-full">
            <div class="absolute top-4 left-4 rounded border border-blue-500 bg-blue-950/80 px-2 py-1 text-xs font-mono text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
               CORE: {{ project.stack[0] }}
            </div>
            <div class="absolute bottom-10 right-10 rounded border border-emerald-500 bg-emerald-950/80 px-2 py-1 text-xs font-mono text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
               {{ project.stack[1] || 'API' }}
            </div>
            <div v-if="project.stack[2]" class="absolute top-10 right-20 rounded border border-purple-500 bg-purple-950/80 px-2 py-1 text-xs font-mono text-purple-300 shadow-[0_0_15px_rgba(147,51,234,0.5)]">
               {{ project.stack[2] }}
            </div>
            
            <!-- Central Node -->
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div class="h-20 w-20 rounded-full border border-blue-400 bg-blue-900/20 backdrop-blur-sm flex items-center justify-center">
                <span class="font-mono text-xs text-blue-200">SYSTEM</span>
              </div>
            </div>
        </div>
      </div>
      
    </div>

    <!-- Tech Stack & Action Footer -->
    <div class="flex items-center justify-between border-t border-slate-700 bg-slate-900/50 p-3">
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="tech in project.stack" 
          :key="tech" 
          class="inline-block font-mono text-[10px] uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700"
        >
          {{ tech }}
        </span>
      </div>
      
      <a 
        v-if="project.link"
        :href="project.link" 
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 rounded bg-blue-600/10 px-3 py-1.5 text-[10px] font-bold tracking-wider text-blue-400 hover:bg-blue-600/20 hover:text-blue-300 transition-colors border border-blue-500/20"
      >
        VISIT SYSTEM <span class="text-xs">↗</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
/* Add a subtle scanline effect in X-Ray mode if desired, but CSS grid is good */
</style>
