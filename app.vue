<script setup lang="ts">
import TheGitBranchNav from "~/components/TheGitBranchNav.vue";
import TheTerminalOverlay from "~/components/TheTerminalOverlay.vue";
import TheFooter from "~/components/layout/TheFooter.vue";
</script>

<template>
  <div
    class="bg-obsidian min-h-screen relative overflow-hidden selection:bg-neon-cyan selection:text-black"
  >
    <!-- Main Content Area -->
    <main class="relative z-10 pb-24 md:pb-40">
      <NuxtPage />
    </main>

    <!-- Global Overlays -->
    <TheFooter />
    <TheGitBranchNav />
    <TheTerminalOverlay />
  </div>
</template>

<style>
body {
  @apply bg-obsidian text-white;
}
</style>
