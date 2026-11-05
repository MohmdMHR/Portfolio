import { describe, expect, it } from 'vitest'
import { parseOrder, renderTrusting } from '../../app/domain/order-contract'

describe('parsing an order at the boundary', () => {
  it('accepts the agreed shape', () => {
    const result = parseOrder({ customer: 'Layla', total: 240 })

    expect(result).toEqual({ ok: true, order: { customer: 'Layla', total: 240 } })
  })

  it('names the field when one was renamed', () => {
    const result = parseOrder({ client: 'Layla', total: 240 })

    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.field).toBe('customer')
  })

  it('names the field when a number arrives as text', () => {
    const result = parseOrder({ customer: 'Layla', total: '240 AED' })

    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.field).toBe('total')
  })
})

describe('trusting the response without checking it', () => {
  it('works while the API behaves', () => {
    expect(renderTrusting({ customer: 'Layla', total: 240 })).toEqual({
      greeting: 'Hello Layla',
      total: 'Total with VAT: AED 252',
      broken: false,
    })
  })

  it('shows the customer undefined when a field is renamed', () => {
    const view = renderTrusting({ client: 'Layla', total: 240 })

    expect(view.greeting).toBe('Hello undefined')
    expect(view.broken).toBe(true)
  })

  it('shows the customer NaN when a number arrives as text', () => {
    const view = renderTrusting({ customer: 'Layla', total: '240 AED' })

    expect(view.total).toBe('Total with VAT: AED NaN')
    expect(view.broken).toBe(true)
  })
})
