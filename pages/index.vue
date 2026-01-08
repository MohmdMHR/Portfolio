<script setup lang="ts">
import { resumeData } from "~/data/resume";
import { ref, watch } from "vue";
import { Mail, Linkedin, Phone, Check } from 'lucide-vue-next';
import TheMonolithScene from "~/components/TheMonolithScene.vue";

const showTitle = ref(false);
const showIdentity = ref(false);
const showToast = ref(false);

// Trigger identity cluster appearance shortly after title
watch(showTitle, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      showIdentity.value = true;
    }, 800);
  }
});

const copyPhoneNumber = async () => {
  try {
    await navigator.clipboard.writeText('(+212) 6 70 70 81 16');
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  } catch (err) {
    console.error('Failed to copy', err);
  }
};
</script>

<template>
  <div class="relative w-full h-screen bg-obsidian overflow-hidden">
    <!-- 3D Scene Layer -->
    <div class="absolute inset-0 z-0">
      <ClientOnly>
        <TresCanvas clear-color="#0a0a0a" shadows alpha>
          <TheMonolithScene @ready="showTitle = true" />
        </TresCanvas>
      </ClientOnly>
    </div>

    <!-- UI Overlay Layer -->
    <div
      class="relative z-10 pointer-events-none h-full flex flex-col items-center justify-center"
    >
      <!-- Text overlay that fades in -->
      <div
        class="transition-opacity duration-1000 ease-in-out flex flex-col items-center space-y-4"
        :class="showTitle ? 'opacity-100' : 'opacity-0'"
      >
        <h1
          class="text-6xl md:text-8xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 tracking-tighter"
        >
          ORDER FROM CHAOS
        </h1>
        <p class="font-mono text-neon-cyan text-sm tracking-[0.5em] uppercase">
          System Initialized
        </p>

        <!-- Identity Cluster -->
        <div 
          class="flex items-center gap-8 mt-12 transition-all duration-1000 delay-300 pointer-events-auto"
           :class="showIdentity ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          <!-- Email -->
          <a 
            href="mailto:mohamdmahir@gmail.com"
            class="group relative p-3 rounded-lg border border-cyan-900/30 bg-black/40 backdrop-blur hover:bg-cyan-950/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            title="Send Email"
          >
            <Mail class="w-6 h-6 text-cyan-400/70 group-hover:text-cyan-400 transition-colors" />
          </a>

          <!-- LinkedIn -->
          <a 
            href="https://www.linkedin.com/in/mohamed-mahir-0b872b89"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative p-3 rounded-lg border border-cyan-900/30 bg-black/40 backdrop-blur hover:bg-cyan-950/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            title="Connect on LinkedIn"
          >
            <Linkedin class="w-6 h-6 text-cyan-400/70 group-hover:text-cyan-400 transition-colors" />
          </a>

          <!-- Phone -->
          <button 
            @click="copyPhoneNumber"
            class="group relative p-3 rounded-lg border border-cyan-900/30 bg-black/40 backdrop-blur hover:bg-cyan-950/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            title="Copy Phone Number"
          >
            <Phone class="w-6 h-6 text-cyan-400/70 group-hover:text-cyan-400 transition-colors" />
          </button>
        </div>
      </div>
    </div>

    <!-- Header Info (Absolute) -->
    <header class="absolute top-0 left-0 p-10 z-20 pointer-events-auto">
      <h2 class="text-2xl font-bold font-sans">{{ resumeData.name }}</h2>
      <p class="text-sm font-mono text-gray-400">{{ resumeData.title }}</p>
    </header>

    <!-- Toast Notification -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="-translate-x-10 opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="-translate-x-10 opacity-0"
    >
      <div 
        v-if="showToast"
        class="fixed top-32 left-10 z-50 flex items-center gap-3 px-6 py-3 bg-cyan-950/90 border border-cyan-500/50 rounded-full text-cyan-50 shadow-[0_0_20px_rgba(34,211,238,0.2)] backdrop-blur-md"
      >
        <Check class="w-4 h-4 text-cyan-400" />
        <span class="text-sm font-mono">Number Copied to Clipboard</span>
      </div>
    </Transition>
  </div>
</template>
