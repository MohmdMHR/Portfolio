import { describe, expect, it } from 'vitest'
import { GATES, outcome, scenarios } from '../../app/domain/gates'

describe('sending a change through the gates', () => {
  it('merges a clean change through every gate', () => {
    expect(outcome('clean').every(status => status === 'passed')).toBe(true)
  })

  it('stops a wrong design at human review, after every check is green', () => {
    const result = outcome('design')
    const review = GATES.indexOf('Human review')

    expect(result.slice(0, review).every(status => status === 'passed')).toBe(true)
    expect(result[review]).toBe('rejected')
  })

  it('never reaches the gates after a rejection', () => {
    const result = outcome('bypass')
    const stop = result.indexOf('rejected')

    expect(stop).toBeGreaterThan(-1)
    expect(result.slice(stop + 1).every(status => status === 'not reached')).toBe(true)
  })

  it('never lets a rejected scenario be marked as merged', () => {
    for (const id of Object.keys(scenarios) as (keyof typeof scenarios)[]) {
      if (id === 'clean') continue
      expect(outcome(id).at(-1)).not.toBe('passed')
    }
  })
})
