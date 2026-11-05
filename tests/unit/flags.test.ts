import { describe, expect, it } from 'vitest'
import { usesNewCheckout, initialFlags, kill, release } from '../../app/domain/flags'

describe('the new checkout behind a flag', () => {
  it('starts on staging only', () => {
    expect(usesNewCheckout(initialFlags, 'staging')).toBe(true)
    expect(usesNewCheckout(initialFlags, 'production')).toBe(false)
  })

  it('reaches customers only on release', () => {
    expect(usesNewCheckout(release(initialFlags), 'production')).toBe(true)
  })

  it('goes back for customers without touching staging', () => {
    const flags = kill(release(initialFlags))

    expect(usesNewCheckout(flags, 'production')).toBe(false)
    expect(usesNewCheckout(flags, 'staging')).toBe(true)
  })
})
