<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ContactTerminal from '~/components/contact/ContactTerminal.vue'
import LanguageSwitcher from '~/components/ui/LanguageSwitcher.vue'

const time = ref('')
let interval: NodeJS.Timeout

const updateTime = () => {
  time.value = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Africa/Casablanca',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

onMounted(() => {
  updateTime()
  interval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <footer class="mt-20 border-t border-slate-800 bg-slate-950 pb-10 pt-20">
    <div class="mx-auto max-w-7xl px-6 md:px-12 pb-40">
      
      <div class="grid grid-cols-1 gap-16 lg:grid-cols-2">
        
        <!-- Contact Terminal -->
        <div>
          <h3 class="font-mono text-xl font-bold text-slate-200 mb-6">
            <span class="text-green-400">></span> INITIATE CONTACT
          </h3>
          <ContactTerminal />
        </div>

        <!-- Global Map & Info -->
        <div class="flex flex-col justify-between">
            
            <!-- Map Visualization -->
            <div class="relative h-64 w-full rounded-xl border border-slate-800 bg-[#0B1120] p-4 overflow-hidden">
                <div class="absolute top-2 right-2 z-10">
                   <LanguageSwitcher />
                </div>

                <!-- Minimal SVG Map -->
                <!-- Simplified Abstract Map for aesthetic -->
                <svg viewBox="0 0 400 200" class="h-full w-full opacity-60">
                    <!-- Continents (Abstract) -->
                    <path d="M50,40 Q80,20 120,50 T180,40 T250,60 T320,40" fill="none" stroke="#2c3e50" stroke-width="2" />
                    <path d="M60,100 Q100,120 140,90 T220,130" fill="none" stroke="#2c3e50" stroke-width="2" />
                    
                    <!-- Locations -->
                    <!-- Casablanca -->
                    <circle cx="160" cy="80" r="3" fill="#3b82f6" class="animate-pulse">
                        <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="165" y="85" class="text-[8px] fill-slate-400 font-mono">CASABLANCA (HQ)</text>

                    <!-- France -->
                    <circle cx="170" cy="50" r="2" fill="#ef4444" />
                    
                    <!-- Netherlands -->
                    <circle cx="180" cy="40" r="2" fill="#f59e0b" />

                    <!-- Connecting Lines -->
                    <path d="M160,80 L170,50" stroke="url(#gradientLine)" stroke-width="1" stroke-dasharray="2 2">
                        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                    </path>
                    <path d="M160,80 L180,40" stroke="url(#gradientLine)" stroke-width="1" stroke-dasharray="2 2" />

                    <defs>
                        <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0" />
                            <stop offset="100%" stop-color="#3b82f6" stop-opacity="1" />
                        </linearGradient>
                    </defs>
                </svg>
                
                <div class="absolute bottom-4 left-4 font-mono text-xs text-blue-400">
                    <div class="flex items-center gap-2">
                        <div class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                        SYSTEM ONLINE
                    </div>
                </div>
            </div>

            <!-- Footer Info -->
            <div class="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                   <div class="font-mono text-xs text-slate-500 mb-1">CURRENT TIME (CASABLANCA)</div>
                   <div class="font-mono text-3xl font-bold text-slate-100 tracking-widest">{{ time }}</div>
                </div>
                
                <div class="text-right">
                    <p class="text-xs text-slate-600">
                        &copy; {{ new Date().getFullYear() }} Mohamed Mahir.<br>
                        Built with Nuxt 3, TresJS & Tailwind.
                    </p>
                </div>
            </div>

        </div>

      </div>
    </div>
  </footer>
</template>
