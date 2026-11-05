import { z } from 'zod'

const Message = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.email().max(320),
  message: z.string().trim().min(1).max(5000),
  /** Hidden from people. Only bots fill it in. */
  website: z.string().optional(),
})

export interface MailConfig {
  apiKey: string
  to: string
  from: string
}

export interface Mail {
  from: string
  to: string
  replyTo: string
  subject: string
  text: string
}

export type SendMail = (mail: Mail, apiKey: string) => Promise<{ ok: boolean }>

export async function handleContact(raw: unknown, config: MailConfig, send: SendMail): Promise<{ status: number }> {
  const parsed = Message.safeParse(raw)
  if (!parsed.success) return { status: 422 }

  const { name, email, message, website } = parsed.data
  if (website) return { status: 200 }

  if (!config.apiKey || !config.to || !config.from) return { status: 503 }

  try {
    const { ok } = await send(
      { from: config.from, to: config.to, replyTo: email, subject: `Portfolio message from ${name}`, text: message },
      config.apiKey,
    )
    return { status: ok ? 200 : 502 }
  }
  catch {
    return { status: 502 }
  }
}

export const sendWithResend: SendMail = async (mail, apiKey) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: mail.from,
      to: mail.to,
      reply_to: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
    }),
  })
  return { ok: response.ok }
}
