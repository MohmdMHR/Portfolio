<script setup lang="ts">
import { ref, onMounted } from 'vue'

const input = ref('')
const output = ref<string[]>([
  'Guest session initialized...',
  'Type "help" for available commands.',
])
const inputRef = ref<HTMLInputElement | null>(null)

const commands = {
  help: 'Available commands: send-email, clear, date, whoami',
  date: () => new Date().toString(),
  whoami: 'guest@portfolio',
  clear: () => {
    output.value = []
    return ''
  }
}

const handleCommand = async () => {
  const cmd = input.value.trim()
  if (!cmd) return

  output.value.push(`guest@portfolio:~$ ${cmd}`)
  
  if (cmd.startsWith('send-email')) {
    output.value.push('> Connecting to Redis queue...')
    await new Promise(r => setTimeout(r, 800))
    output.value.push('> Message queued. ID: ' + Math.random().toString(36).substr(2, 9))
    output.value.push('> Server response: 200 OK')
  } else if (commands[cmd as keyof typeof commands]) {
    const response = commands[cmd as keyof typeof commands]
    const result = typeof response === 'function' ? response() : response
    if (result) output.value.push(`> ${result}`)
  } else {
    output.value.push(`> Command not found: ${cmd}`)
  }

  input.value = ''
  
  // Keep scrolling to bottom
  setTimeout(() => {
    const terminal = document.getElementById('terminal-output')
    if (terminal) terminal.scrollTop = terminal.scrollHeight
  }, 10)
}

onMounted(() => {
  if (inputRef.value) inputRef.value.focus()
})
</script>

<template>
  <div class="font-mono text-sm w-full max-w-2xl mx-auto rounded-lg overflow-hidden border border-slate-700 bg-black shadow-2xl">
    <!-- Terminal Header -->
    <div class="flex items-center justify-between bg-slate-800 px-4 py-2">
      <div class="flex gap-2">
        <div class="h-3 w-3 rounded-full bg-red-500"></div>
        <div class="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div class="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <div class="text-xs text-slate-400">guest@portfolio: ~</div>
    </div>

    <!-- Terminal Body -->
    <div 
      id="terminal-output"
      class="h-64 overflow-y-auto p-4 text-green-400 space-y-2 scrollbar-thin scrollbar-thumb-slate-700"
      @click="inputRef?.focus()"
    >
      <div v-for="(line, i) in output" :key="i" class="break-words">
        {{ line }}
      </div>
      
      <div class="flex items-center gap-2">
        <span class="text-blue-400">guest@portfolio:~$</span>
        <input 
          ref="inputRef"
          v-model="input"
          @keydown.enter="handleCommand"
          type="text" 
          class="flex-1 bg-transparent outline-none text-slate-100"
          autocomplete="off"
          spellcheck="false"
        />
      </div>
    </div>
  </div>
</template>
