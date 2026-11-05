<script setup lang="ts">
type State = 'idle' | 'sending' | 'sent' | 'invalid' | 'failed'

const state = ref<State>('idle')
const form = reactive({ name: '', email: '', message: '', website: '' })

async function submit() {
  state.value = 'sending'
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form } })
    state.value = 'sent'
    Object.assign(form, { name: '', email: '', message: '' })
  }
  catch (error) {
    const status = (error as { statusCode?: number }).statusCode
    state.value = status === 422 ? 'invalid' : 'failed'
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <label for="contact-name">Your name
      <input
        id="contact-name"
        v-model="form.name"
        name="name"
        autocomplete="name"
        required
      >
    </label>
    <label for="contact-email">Your email
      <input
        id="contact-email"
        v-model="form.email"
        name="email"
        type="email"
        autocomplete="email"
        required
      >
    </label>
    <label for="contact-message">Message
      <textarea
        id="contact-message"
        v-model="form.message"
        name="message"
        rows="4"
        required
      />
    </label>
    <div
      class="hp"
      aria-hidden="true"
    >
      <label for="contact-website">Leave this empty
        <input
          id="contact-website"
          v-model="form.website"
          name="website"
          tabindex="-1"
          autocomplete="off"
        >
      </label>
    </div>
    <div>
      <button
        class="btn"
        type="submit"
        :disabled="state === 'sending'"
      >
        {{ state === 'sending' ? 'Sending' : 'Send' }}
      </button>
    </div>
    <p
      class="note form-note"
      role="status"
      data-testid="form-status"
    >
      <template v-if="state === 'sent'">
        Sent. Mohamed will reply to the address you gave.
      </template>
      <template v-else-if="state === 'invalid'">
        Please check the email address and that nothing is empty.
      </template>
      <template v-else-if="state === 'failed'">
        That did not send. Please email {{ links.email }} instead.
      </template>
    </p>
  </form>
</template>
