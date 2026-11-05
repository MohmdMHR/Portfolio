import { handleContact, sendWithResend } from '../utils/contact'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { status } = await handleContact(
    await readBody(event).catch(() => null),
    { apiKey: config.resendApiKey, to: config.contactTo, from: config.contactFrom },
    sendWithResend,
  )

  setResponseStatus(event, status)
  return { ok: status === 200 }
})
