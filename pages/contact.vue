<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { resumeData } from '~/data/resume'
import { Check, ShieldCheck, MapPin, Clock, Send, Terminal, AlertCircle } from 'lucide-vue-next'
import TheHolographicGlobe from '~/components/contact/TheHolographicGlobe.vue'
import emailjs from '@emailjs/browser'

useHead({
  title: 'System Uplink | Mohamed Mahir'
})

// State
const globeRef = ref<InstanceType<typeof TheHolographicGlobe> | null>(null)
const form = ref({
  name: '',
  email: '',
  message: ''
})
const transmissionState = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
interface Log {
  text: string
  time: number
}
const logs = ref<Log[]>([])
const connectionStep = ref(0) // 0: init, 1: resolving, 2: routing, 3: established
const connectionLatency = ref(0)
const currentTime = ref('')
const config = useRuntimeConfig()

// Computed
const isConnected = computed(() => connectionStep.value >= 3)
const isSending = computed(() => transmissionState.value === 'sending')

// Lifecycle
onMounted(() => {
  initHandshake()
  updateTime()
  setInterval(updateTime, 1000)
  // Initialize EmailJS public key if needed immediately, but send() accepts it as 4th arg too
})

// Methods
const initHandshake = async () => {
  connectionLatency.value = Math.floor(Math.random() * (45 - 15) + 15)
  
  await delay(800)
  connectionStep.value = 1 // Resolving IP
  await delay(1200)
  connectionStep.value = 2 // Routing via Cloudflare
  await delay(1000)
  connectionStep.value = 3 // Established
}

const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString('en-US', { 
    timeZone: 'Africa/Casablanca',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }) + ' GMT+1'
}

const sendEmail = async () => {
  if (!form.value.name || !form.value.email || !form.value.message) return
  
  transmissionState.value = 'sending'
  logs.value = []
  logs.value.push({ text: '> Initializing Secure Uplink...', time: Date.now() })
  
  try {
    // ACTUAL NETWORK CALL
    // Using config values or fallbacks if not populated yet (though they should be)
    const serviceId = config.public.emailjs.serviceId || 'service_cerlv8p'
    const templateId = config.public.emailjs.templateId || 'template_sx8cm7h'
    const publicKey = config.public.emailjs.publicKey || 'PfDGhIjyvSD-t5M60'

    await emailjs.send(
      serviceId, 
      templateId, 
      { 
        from_name: form.value.name, 
        from_email: form.value.email, 
        message: form.value.message 
      },
      publicKey
    )
    
    logs.value.push({ text: '> 200 OK. Transmission Sent Successfully.', time: Date.now() })
    transmissionState.value = 'success'
    if (globeRef.value) globeRef.value.triggerSuccess()
    
    // Reset after delay
    setTimeout(() => {
      form.value.message = ''
      transmissionState.value = 'idle'
      logs.value = []
    }, 4000)

  } catch (error: any) {
    console.error('EmailJS Error:', error)
    logs.value.push({ text: '> ERROR: Uplink Failed. ' + (error.text || error.message || 'Unknown Error'), time: Date.now() })
    transmissionState.value = 'error'
  }
}

const formatLogTime = (ts: number) => {
  return new Date(ts).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }) + '.' + new Date(ts).getMilliseconds().toString().slice(0,2)
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
</script>

<template>
  <div class="relative min-h-screen w-full bg-slate-950 overflow-hidden font-mono text-slate-200">
    
    <!-- Background Globe -->
    <div class="absolute inset-0 z-0 opacity-40">
      <ClientOnly>
        <TheHolographicGlobe ref="globeRef" />
      </ClientOnly>
    </div>
    
    <!-- Overlay Grid -->
    <div class="absolute inset-0 z-0" style="background-image: radial-gradient(circle, rgba(59,130,246,0.05) 1px, transparent 1px); background-size: 30px 30px;"></div>

    <!-- Main Content -->
    <div class="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-8">
      
      <div class="flex w-full max-w-5xl flex-col gap-6 lg:flex-row">
        
        <!-- Left: Status Sidebar -->
        <div class="flex flex-col gap-4 lg:w-1/3">
          <!-- System Status Card -->
          <div class="rounded-lg border border-slate-700/50 bg-slate-900/60 p-6 backdrop-blur">
            <h2 class="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
              <ShieldCheck class="h-4 w-4 text-emerald-500" />
              Node Configuration
            </h2>
            
            <div class="space-y-4 text-sm">
              <div class="flex justify-between border-b border-slate-800 pb-2">
                <span class="text-slate-400">Target Node</span>
                <span class="font-bold text-blue-400">{{ resumeData.name }}</span>
              </div>
              <div class="flex justify-between border-b border-slate-800 pb-2">
                <span class="text-slate-400">Status</span>
                <span class="flex items-center gap-2 font-bold text-emerald-400">
                  <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
                  Online / Open
                </span>
              </div>
              <div class="flex justify-between border-b border-slate-800 pb-2">
                <span class="text-slate-400">Location</span>
                <span class="font-bold text-slate-200">{{ resumeData.location.split(' ')[0] }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-400">Server Time</span>
                <div class="flex items-center gap-2 rounded bg-slate-800 px-2 py-1 text-xs">
                  <Clock class="h-3 w-3" />
                  <span class="font-mono text-blue-300">{{ currentTime }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Connection Handshake Card -->
          <div class="flex-1 rounded-lg border border-slate-700/50 bg-slate-900/60 p-6 backdrop-blur">
            <h2 class="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Uplink Sequence</h2>
            <div class="space-y-4 font-mono text-xs">
              
              <!-- Step 1 -->
              <div class="flex items-center gap-3" :class="connectionStep >= 1 ? 'opacity-100' : 'opacity-30'">
                <div class="flex h-6 w-6 items-center justify-center rounded-full border border-slate-600 bg-slate-800">1</div>
                <div>Resolving Protocol IP...</div>
                <Check v-if="connectionStep >= 1" class="ml-auto h-4 w-4 text-emerald-500" />
              </div>

              <!-- Step 2 -->
              <div class="flex items-center gap-3" :class="connectionStep >= 2 ? 'opacity-100' : 'opacity-30'">
                <div class="flex h-6 w-6 items-center justify-center rounded-full border border-slate-600 bg-slate-800">2</div>
                <div>Routing via Cloudflare Edge...</div>
                <Check v-if="connectionStep >= 2" class="ml-auto h-4 w-4 text-emerald-500" />
              </div>

              <!-- Step 3 -->
              <div class="flex items-center gap-3" :class="connectionStep >= 3 ? 'opacity-100' : 'opacity-30'">
                <div class="flex h-6 w-6 items-center justify-center rounded-full border border-slate-600 bg-slate-800">3</div>
                <div>Handshake Established ({{ connectionLatency }}ms)</div>
                <Check v-if="connectionStep >= 3" class="ml-auto h-4 w-4 text-emerald-500" />
              </div>

              <!-- Progress Bar -->
              <div class="mt-4 h-1 w-full overflow-hidden rounded bg-slate-800">
                <div 
                  class="h-full bg-emerald-500 transition-all duration-1000"
                  :style="{ width: connectionStep === 0 ? '5%' : connectionStep === 1 ? '33%' : connectionStep === 2 ? '66%' : '100%' }"
                ></div>
              </div>

            </div>
          </div>
        </div>

        <!-- Right: Code Editor Input -->
        <div class="relative flex flex-col overflow-hidden rounded-lg border border-slate-700/50 bg-slate-900/80 shadow-2xl backdrop-blur lg:w-2/3">
          
          <!-- Editor Header -->
          <div class="flex items-center justify-between border-b border-slate-700 bg-slate-800/50 px-4 py-3">
            <div class="flex items-center gap-2">
               <div class="h-3 w-3 rounded-full bg-red-500/50"></div>
               <div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
               <div class="h-3 w-3 rounded-full bg-emerald-500/50"></div>
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-400">
              <Terminal class="h-3 w-3" />
              <span>payload_construct.ts</span>
            </div>
          </div>

          <!-- Code Body -->
          <div class="flex-1 p-6 lg:p-10 font-mono text-sm relative">
            <template v-if="transmissionState === 'idle' || transmissionState === 'error'">
               <div class="mb-6 flex gap-2 text-slate-500">
                  <span>//</span>
                  <span>Initialize secure message block</span>
               </div>

               <div class="group relative mb-4">
                  <label class="mb-1 block text-blue-400">const <span class="text-purple-400">name</span> =</label>
                  <input 
                     v-model="form.name"
                     type="text" 
                     placeholder="Enter Your Name"
                     class="w-full bg-transparent border-0 border-b border-slate-700 p-2 text-emerald-300 placeholder-slate-600 focus:border-blue-500 focus:ring-0 focus:outline-none transition-colors"
                  />
               </div>

               <div class="group relative mb-4">
                  <label class="mb-1 block text-blue-400">const <span class="text-purple-400">email</span> =</label>
                  <input 
                     v-model="form.email"
                     type="email" 
                     placeholder="Enter Your Email"
                     class="w-full bg-transparent border-0 border-b border-slate-700 p-2 text-emerald-300 placeholder-slate-600 focus:border-blue-500 focus:ring-0 focus:outline-none transition-colors"
                  />
               </div>

               <div class="group relative mb-8">
                  <label class="mb-1 block text-blue-400">const <span class="text-purple-400">message</span> =</label>
                  <textarea 
                     v-model="form.message"
                     rows="5"
                     placeholder="Enter Transmission Data..."
                     class="w-full bg-transparent border-0 border-b border-slate-700 p-2 text-slate-300 placeholder-slate-600 focus:border-blue-500 focus:ring-0 focus:outline-none transition-colors resize-none"
                  ></textarea>
               </div>

               <button 
                  @click="sendEmail"
                  :disabled="!isConnected || !form.name || !form.message || !form.email"
                  class="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded bg-blue-600 py-4 font-bold text-white transition-all hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  <span class="relative z-10 flex items-center gap-2">
                    <Send class="h-4 w-4" />
                    EXECUTE TRANSMISSION
                  </span>
                  <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
               </button>
               
               <!-- Error display -->
               <div v-if="transmissionState === 'error'" class="mt-4 p-3 border border-red-500/50 bg-red-500/10 rounded text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle class="h-4 w-4" />
                  <span>Transmission Failed. Check logs for details.</span>
               </div>
            </template>
            
            <!-- Transmission State (Log Overlay) -->
            <template v-else>
               <div class="h-full flex flex-col justify-end min-h-[400px]">
                  <div class="space-y-2 font-mono text-sm">
                    <div v-for="(log, i) in logs" :key="i" class="flex gap-3 text-emerald-400 border-l-2 border-emerald-500/50 pl-2 animate-in slide-in-from-bottom-2 fade-in duration-300">
                      <span class="text-slate-600 text-xs select-none">{{ formatLogTime(log.time) }}</span>
                      <span>{{ log.text }}</span>
                    </div>
                  </div>
                  
                  <div v-if="transmissionState === 'success'" class="mt-8 flex items-center justify-center">
                    <div class="rounded-full bg-emerald-500/20 px-6 py-2 text-emerald-400 border border-emerald-500/50 flex items-center gap-2 animate-bounce">
                      <Check class="h-4 w-4" />
                      TRANSMISSION COMPLETE
                    </div>
                  </div>
                  
                  <div v-if="transmissionState === 'sending'" class="mt-4 flex items-center gap-2 text-xs text-slate-500 animate-pulse">
                     <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
                     <span>Uplink Active...</span>
                  </div>
               </div>
            </template>

          </div>
          
        </div>

      </div>

    </div>
  </div>
</template>

