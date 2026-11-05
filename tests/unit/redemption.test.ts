import { describe, expect, it } from 'vitest'
import { simulateLostResponse } from '../../app/domain/redemption'

describe('a terminal retries after losing the response', () => {
  it('redeems once with an idempotency key', () => {
    expect(simulateLostResponse({ withKey: true }).redemptions).toBe(1)
  })

  it('redeems twice without one', () => {
    expect(simulateLostResponse({ withKey: false }).redemptions).toBe(2)
  })

  it('tells the story in order, ending on what the server did', () => {
    const withKey = simulateLostResponse({ withKey: true }).log
    const without = simulateLostResponse({ withKey: false }).log

    expect(withKey).toHaveLength(5)
    expect(withKey.at(-1)).toBe('replay')
    expect(without.at(-1)).toBe('redeemAgain')
  })
})
