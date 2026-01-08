<script setup lang="ts">
import { useSystemState } from '~/stores/system';
import { ref, computed } from 'vue';

const systemStore = useSystemState();
const floatingLabelVisible = ref(false);
let floatingLabelTimeout: NodeJS.Timeout | null = null;

const branches = [
  { id: 'main', label: 'Main (Home)', path: '/' },
  { id: 'projects', label: 'Feat/Projects', path: '/projects' },
  { id: 'architecture', label: 'Refactor/Architecture', path: '/architecture' },
  { id: 'contact', label: 'Deploy/Contact', path: '/contact' },
];

const currentBranchLabel = computed(() => {
  const branch = branches.find(b => b.id === systemStore.currentSection);
  return branch ? branch.label.toUpperCase() : '';
});

const navigate = (branch: typeof branches[0]) => {
  systemStore.setSection(branch.id);
  navigateTo(branch.path);
  
  // Trigger floating label
  floatingLabelVisible.value = true;
  if (floatingLabelTimeout) clearTimeout(floatingLabelTimeout);
  floatingLabelTimeout = setTimeout(() => {
    floatingLabelVisible.value = false;
  }, 2000);
};
</script>

<template>
  <div class="fixed bottom-0 left-0 w-full h-24 flex items-center justify-center z-40 bg-obsidian/80 backdrop-blur-sm border-t border-white/10">
    <!-- Floating Label (Mobile Only) -->
    <Transition
      enter-active-class="transition opacity-300 duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition opacity-300 duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div 
        v-if="floatingLabelVisible"
        class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-neon-cyan px-4 py-1 rounded-full text-xs font-mono font-bold tracking-widest border border-neon-cyan/30 shadow-[0_0_10px_rgba(0,243,255,0.2)] pointer-events-none md:hidden"
      >
        {{ currentBranchLabel }}
      </div>
    </Transition>

    <div class="relative w-full max-w-4xl flex items-center justify-between px-10">
      <!-- The Git Line -->
      <div class="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -z-10 transform -translate-y-1/2"></div>
      
      <!-- Commit Nodes -->
      <div 
        v-for="branch in branches" 
        :key="branch.id"
        @click="navigate(branch)"
        class="group relative flex flex-col items-center cursor-pointer transition-all duration-300"
      >
        <!-- Touch Target / Node Wrapper -->
        <div class="p-3"> <!-- Increases touch target to ~48px (24px icon + 12px padding*2) -->
           <!-- Node Circle -->
          <div 
            class="w-6 h-6 rounded-full border-2 transition-all duration-300 z-10"
            :class="[
              systemStore.currentSection === branch.id 
                ? 'bg-neon-cyan border-neon-cyan shadow-[0_0_15px_#00f3ff] scale-125' 
                : 'bg-obsidian border-gray-500 group-hover:border-white'
            ]"
          ></div>
        </div>
        
        <!-- Label (Hidden on Mobile, Visible on Desktop) -->
        <div 
          class="hidden md:block absolute top-10 text-xs font-mono tracking-wider transition-colors duration-300 whitespace-nowrap"
          :class="[
             systemStore.currentSection === branch.id ? 'text-neon-cyan' : 'text-gray-500 group-hover:text-white'
          ]"
        >
          {{ branch.label }}
        </div>
      </div>
    </div>
  </div>
</template>
