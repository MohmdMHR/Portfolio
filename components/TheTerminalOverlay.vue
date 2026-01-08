<script setup lang="ts">
import { useSystemState } from "~/stores/system";
import { computed, onMounted, onUnmounted, ref } from "vue";

const systemStore = useSystemState();
const recentLogs = computed(() => systemStore.logs.slice(0, 5));
const latestLog = computed(() => systemStore.logs[0]);

// Desktop State
const isMinimized = ref(false);

// Mobile State
const isMobile = ref(false);
const isDrawerOpen = ref(false);

const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value;
};

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const checkMobile = () => {
  isMobile.value = window.matchMedia("(max-width: 768px)").matches;
};

onMounted(() => {
  systemStore.logEvent("System initialized...");
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>

<template>
  <!-- MOBILE VIEW -->
  <div 
    v-if="isMobile"
    class="z-50 pointer-events-auto"
  >
    <!-- Top Ticker Bar -->
    <div 
      class="fixed top-0 left-0 w-full h-8 bg-black/90 backdrop-blur border-b border-white/10 flex items-center px-4 cursor-pointer overflow-hidden z-50"
      @click="toggleDrawer"
    >
      <div class="flex items-center gap-2 text-xs font-mono w-full">
        <span class="text-green-400 font-bold shrink-0">TERMINAL</span>
        <span class="text-white/40"> > </span>
        <div class="text-white/80 truncate flex-1 animate-fade-in" v-if="latestLog">
           {{ latestLog.message }}
        </div>
        <div class="text-white/80 truncate flex-1" v-else>
           _
        </div>
        <span class="text-[10px] text-white/30 shrink-0 select-none">TAP FOR HISTORY</span>
      </div>
    </div>

    <!-- Full Screen History Drawer -->
    <Transition
      enter-active-class="transition transform duration-300 ease-out"
      enter-from-class="-translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition transform duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-full opacity-0"
    >
      <div 
        v-if="isDrawerOpen" 
        class="fixed inset-0 bg-black/95 z-[60] flex flex-col pt-12 pb-8 px-4 font-mono"
      >
        <!-- Close Button -->
        <button 
          @click="toggleDrawer"
          class="absolute top-2 right-4 text-white/50 hover:text-white p-2"
        >
          [CLOSE]
        </button>

        <div class="text-green-400 font-bold mb-4 border-b border-white/10 pb-2">
          SYSTEM LOGS
        </div>

        <div class="flex-1 overflow-y-auto space-y-2">
          <div v-for="log in systemStore.logs" :key="log.id" class="text-xs">
            <span class="text-blue-400">[{{ log.timestamp }}]</span>
            <span class="text-white/60"> > </span>
            <span class="text-white/90">{{ log.message }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>

  <!-- DESKTOP VIEW (Original Behavior) -->
  <div 
    v-else 
    class="fixed top-4 right-4 p-4 z-50 pointer-events-auto"
  >
    <div
      class="bg-black/90 text-xs font-mono rounded-lg border border-white/10 w-80 text-green-400 font-bold shadow-2xl backdrop-blur overflow-hidden transition-all duration-300"
      :class="{ 'h-10': isMinimized }"
    >
      <div
        class="bg-white/5 p-2 px-4 border-b border-white/10 flex justify-between items-center cursor-pointer hover:bg-white/10 transition-colors"
        @click="toggleMinimize"
      >
         <div class="flex items-center gap-2">
          <span>TERMINAL</span>
          <span class="opacity-50 text-[10px]">zsh</span>
        </div>
        <button class="text-white/70 hover:text-white">
          {{ isMinimized ? "[+]" : "[-]" }}
        </button>
      </div>

      <div v-if="!isMinimized" class="p-4 space-y-1">
        <div v-for="log in recentLogs" :key="log.id" class="opacity-80">
          <span class="text-blue-400">[{{ log.timestamp }}]</span>
          <span class="text-white"> > </span>
          {{ log.message }}
        </div>
        <div class="animate-pulse">_</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
