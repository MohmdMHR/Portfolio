import { z } from 'zod'

const Order = z.object({
  customer: z.string(),
  total: z.number(),
})
export type Order = z.infer<typeof Order>

export type ParsedOrder =
  | { ok: true, order: Order }
  | { ok: false, field: string, reason: string }

const VAT = 1.05

export const withVat = (total: number): number => Math.round(total * VAT * 100) / 100

export function parseOrder(raw: unknown): ParsedOrder {
  const parsed = Order.safeParse(raw)
  if (parsed.success) return { ok: true, order: parsed.data }

  const issue = parsed.error.issues[0]
  return {
    ok: false,
    field: String(issue?.path[0] ?? 'response'),
    reason: issue?.message ?? 'Invalid response',
  }
}

export interface TrustingView {
  greeting: string
  total: string
  broken: boolean
}

/** What an app shows when it believes its types instead of checking the response. */
export function renderTrusting(raw: unknown): TrustingView {
  const response = raw as Order
  const total = typeof response.total === 'number' ? withVat(response.total) : Number.NaN

  return {
    greeting: `Hello ${response.customer}`,
    total: `Total with VAT: AED ${total}`,
    broken: response.customer === undefined || Number.isNaN(total),
  }
}

export const responses = {
  agreed: { label: 'API as agreed', body: { customer: 'Layla', total: 240 } },
  renamed: { label: 'Backend renames a field', body: { client: 'Layla', total: 240 } },
  text: { label: 'Total arrives as text', body: { customer: 'Layla', total: '240 AED' } },
} as const

export type ResponseId = keyof typeof responses
