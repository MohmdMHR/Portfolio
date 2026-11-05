import { describe, expect, it } from 'vitest'
import { checkoutFor, initialFlags, kill, release } from '../../app/domain/flags'

describe('the new checkout behind a flag', () => {
  it('starts on staging only', () => {
    expect(checkoutFor(initialFlags, 'staging')).toBe('New checkout')
    expect(checkoutFor(initialFlags, 'production')).toBe('Old checkout')
  })

  it('reaches customers only on release', () => {
    expect(checkoutFor(release(initialFlags), 'production')).toBe('New checkout')
  })

  it('goes back for customers without touching staging', () => {
    const flags = kill(release(initialFlags))

    expect(checkoutFor(flags, 'production')).toBe('Old checkout')
    expect(checkoutFor(flags, 'staging')).toBe('New checkout')
  })
})
