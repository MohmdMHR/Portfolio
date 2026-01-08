<script setup lang="ts">
import { resumeData } from '~/data/resume'
import BlueprintCard from '~/components/projects/BlueprintCard.vue'

useHead({
  title: 'Projects | Mohamed Mahir'
})
</script>

<template>
  <div class="min-h-screen w-full bg-slate-950 px-6 py-20 md:px-12 md:py-24">
    <div class="mx-auto max-w-7xl">
      <header class="mb-16">
        <div class="flex items-center gap-4 mb-4">
           <div class="h-px flex-1 bg-gradient-to-r from-transparent to-blue-900"></div>
           <span class="font-mono text-sm text-blue-500 uppercase tracking-widest">System Architecture</span>
           <div class="h-px flex-1 bg-gradient-to-l from-transparent to-blue-900"></div>
        </div>
        <h1 class="text-4xl font-bold font-mono tracking-tighter text-slate-100 md:text-5xl mb-6">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">ENGINEERING</span> 
          LOGS
        </h1>
        <p class="text-slate-400 max-w-2xl text-lg leading-relaxed">
          Technical deep-dives into high-scale e-commerce and SaaS architectures. 
          Use <span class="text-blue-400 font-mono text-sm font-bold bg-blue-900/30 px-1 py-0.5 rounded">X-RAY MODE</span> 
          to inspect the underlying infrastructure stack.
        </p>
      </header>

      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <BlueprintCard
          v-for="project in resumeData.projects"
          :key="project.title"
          :project="project"
        />
      </div>
    </div>
  </div>
</template>
