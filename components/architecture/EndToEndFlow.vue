<script setup lang="ts">
import { ref } from 'vue'
import { Database, Server, Layout, X } from 'lucide-vue-next'

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

<template>
  <div class="relative w-full rounded-xl border border-slate-700 bg-slate-950 p-8 shadow-2xl overflow-hidden">
    
    <!-- Flow Container -->
    <div class="flex items-center justify-between relative z-10">
      
      <!-- Node 1: Data Layer -->
      <div class="flex flex-col items-center gap-3">
        <button 
          @click="openModal"
          class="group relative flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/50 transition-all hover:scale-110 hover:border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          <Database class="h-8 w-8 text-emerald-400 group-hover:animate-pulse" />
          <div class="absolute -top-2 -right-2 h-4 w-4 animate-ping rounded-full bg-emerald-500 opacity-75"></div>
        </button>
        <div class="text-center">
          <span class="block font-mono text-sm font-bold text-emerald-400">DATA LAYER</span>
          <span class="block text-[10px] text-slate-500">Postgres / Supabase / AWS</span>
        </div>
      </div>

      <!-- Connector 1 -->
      <div class="relative h-[2px] flex-1 bg-slate-800 mx-4">
         <div class="absolute top-1/2 left-0 h-2 w-4 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-flow-right"></div>
      </div>

      <!-- Node 2: API Gateway -->
      <div class="flex flex-col items-center gap-3">
        <div class="flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/30 bg-red-950/50">
          <Server class="h-8 w-8 text-red-400" />
        </div>
        <div class="text-center">
          <span class="block font-mono text-sm font-bold text-red-400">API GATEWAY</span>
          <span class="block text-[10px] text-slate-500">NestJS / Node / Laravel</span>
        </div>
      </div>

      <!-- Connector 2 -->
      <div class="relative h-[2px] flex-1 bg-slate-800 mx-4">
         <div class="absolute top-1/2 left-0 h-2 w-4 -translate-y-1/2 rounded-full bg-red-400 shadow-[0_0_10px_#f87171] animate-flow-right" style="animation-delay: 1s;"></div>
      </div>

      <!-- Node 3: Client -->
      <div class="flex flex-col items-center gap-3">
        <div class="flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-950/50">
          <Layout class="h-8 w-8 text-blue-400" />
        </div>
        <div class="text-center">
          <span class="block font-mono text-sm font-bold text-blue-400">CLIENT</span>
          <span class="block text-[10px] text-slate-500">Vue / Nuxt / React</span>
        </div>
      </div>

    </div>

    <!-- SQL Modal -->
    <Teleport to="body">
      <div 
        v-if="isModalOpen" 
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        @click.self="closeModal"
      >
        <div class="w-full max-w-lg overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl animate-in zoom-in-95 duration-200">
          <div class="flex items-center justify-between border-b border-slate-800 px-4 py-3 bg-slate-800/50">
            <span class="font-mono text-xs font-bold text-slate-400">SUPABASE QUERY INSPECTION</span>
            <button @click="closeModal" class="text-slate-400 hover:text-white">
              <X class="h-5 w-5" />
            </button>
          </div>
          <div class="p-6 font-mono text-sm">
            <div class="text-purple-400">SELECT</div>
            <div class="pl-4 text-slate-300">*</div>
            <div class="text-purple-400">FROM</div>
            <div class="pl-4 text-yellow-300">'projects'</div>
            <div class="text-purple-400">WHERE</div>
            <div class="pl-4">
              <span class="text-blue-400">stack</span> <span class="text-slate-400">=</span> <span class="text-green-400">'Vue3'</span>;
            </div>
            
            <div class="mt-6 border-t border-slate-800 pt-4">
              <div class="flex items-center gap-2 mb-2 text-xs text-slate-500 uppercase">Input</div>
              <div class="text-slate-300">{"query": "Vue3"}</div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<style scoped>
@keyframes flow-right {
  0% { left: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

.animate-flow-right {
  animation: flow-right 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
</style>
