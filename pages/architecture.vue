<script setup lang="ts">
import MigrationDemo from '~/components/architecture/MigrationDemo.vue'
import EndToEndFlow from '~/components/architecture/EndToEndFlow.vue'
import { resumeData } from '~/data/resume'

useHead({
  title: 'Architecture | Mohamed Mahir'
})
</script>

<template>
  <div class="min-h-screen w-full bg-slate-950 px-6 py-20 md:px-12 md:py-24">
    <div class="mx-auto max-w-5xl">
      
      <header class="mb-16">
        <h1 class="text-3xl font-bold font-mono tracking-tighter text-slate-100 md:text-5xl mb-6">
          SYSTEM <span class="text-blue-500">ARCHITECTURE</span>
        </h1>
        <p class="text-slate-400 max-w-2xl text-lg leading-relaxed">
          Visualizing the evolution of code and data flow across complex systems.
        </p>
      </header>

      <!-- Section 1: Code Migration -->
      <section class="mb-24">
        <div class="flex items-center gap-4 mb-8">
           <div class="h-8 w-8 rounded bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-500 font-mono font-bold">1</div>
           <h2 class="text-2xl font-bold text-slate-200">Vue 2 to Composition API</h2>
        </div>
        <p class="text-slate-400 mb-8 max-w-3xl">
          Drag the slider to observe the refactoring pattern from Options API to TypeScript-powered Composition API.
        </p>
        <MigrationDemo />
      </section>

      <!-- Section 2: Data Flow -->
      <section class="mb-24">
        <div class="flex items-center gap-4 mb-8">
           <div class="h-8 w-8 rounded bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-500 font-mono font-bold">2</div>
           <h2 class="text-2xl font-bold text-slate-200">End-to-End Data Pipeline</h2>
        </div>
        <p class="text-slate-400 mb-8 max-w-3xl">
          Trace the journey of a data packet from the PostgreSQL cluster through the Gateway to the Client.
          <span class="text-emerald-400 text-sm ml-2 font-mono">Click the Database node to inspect the query.</span>
        </p>
        <EndToEndFlow />
      </section>

      <!-- Section 3: System Capabilities (Skills) -->
      <section>
        <div class="flex items-center gap-4 mb-8">
           <div class="h-8 w-8 rounded bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-500 font-mono font-bold">3</div>
           <h2 class="text-2xl font-bold text-slate-200">System Capabilities</h2>
        </div>
        <p class="text-slate-400 mb-8 max-w-3xl">
          Active modules and core competencies currently loaded into the system.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Frontend Rack -->
          <div class="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
            <div class="mb-4 flex items-center gap-2 border-b border-slate-700 pb-2">
              <div class="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"></div>
              <h3 class="font-mono text-sm font-bold text-blue-400">INTERFACE_LAYER</h3>
            </div>
            <div class="space-y-2">
              <div 
                v-for="skill in resumeData.skills.frontend" 
                :key="skill"
                class="flex items-center justify-between rounded bg-slate-800 px-3 py-2 text-xs font-mono text-slate-300 border border-slate-700/50"
              >
                <span>{{ skill }}</span>
                <div class="h-1.5 w-1.5 rounded-full bg-blue-500/50"></div>
              </div>
            </div>
          </div>

          <!-- Backend Rack -->
          <div class="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
            <div class="mb-4 flex items-center gap-2 border-b border-slate-700 pb-2">
              <div class="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></div>
              <h3 class="font-mono text-sm font-bold text-emerald-400">CORE_SERVICES</h3>
            </div>
            <div class="space-y-2">
              <div 
                v-for="skill in resumeData.skills.backend" 
                :key="skill"
                class="flex items-center justify-between rounded bg-slate-800 px-3 py-2 text-xs font-mono text-slate-300 border border-slate-700/50"
              >
                <span>{{ skill }}</span>
                <div class="h-1.5 w-1.5 rounded-full bg-emerald-500/50"></div>
              </div>
            </div>
          </div>

          <!-- Arch Rack -->
          <div class="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
            <div class="mb-4 flex items-center gap-2 border-b border-slate-700 pb-2">
              <div class="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_8px_#fbbf24]"></div>
              <h3 class="font-mono text-sm font-bold text-orange-400">INFRA_PROTOCOLS</h3>
            </div>
            <div class="space-y-2">
              <div 
                v-for="skill in resumeData.skills.arch" 
                :key="skill"
                class="flex items-center justify-between rounded bg-slate-800 px-3 py-2 text-xs font-mono text-slate-300 border border-slate-700/50"
              >
                <span>{{ skill }}</span>
                <div class="h-1.5 w-1.5 rounded-full bg-orange-500/50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>
