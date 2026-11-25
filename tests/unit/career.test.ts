import { describe, expect, it } from 'vitest'
import { roles, rolesUsing, skills } from '../../app/domain/career'
import { ar } from '../../app/i18n/ar'
import { en } from '../../app/i18n/en'

describe('the career map', () => {
  it('has all six roles, newest first, with the current one still open', () => {
    expect(roles).toHaveLength(6)
    expect(en.career.roles[roles[0]!.id].dates).toBe('01/2026 – Present')
  })

  it('gives every role and skill a label in both languages', () => {
    for (const messages of [en, ar]) {
      for (const role of roles) expect(messages.career.roles[role.id].outcomes.length).toBeGreaterThan(0)
      for (const skill of skills) expect(messages.career.skills[skill.name]).toBeTruthy()
    }
  })

  it('ties RTL and LTR to the telecom portals', () => {
    expect(rolesUsing('RTL and LTR').map(role => role.id)).toEqual(['telecom'])
  })

  it('ties Vue to every role', () => {
    expect(rolesUsing('Vue')).toHaveLength(6)
  })

  it('keeps AngularJS to one role', () => {
    expect(rolesUsing('AngularJS').map(role => role.id)).toEqual(['fleet'])
  })

  it('points every skill at roles that exist', () => {
    const ids = new Set(roles.map(role => role.id))
    for (const skill of skills) {
      for (const id of skill.roles) expect(ids.has(id)).toBe(true)
    }
  })

  it('names every employer and links at least one live site per role', () => {
    for (const role of roles) {
      expect(role.employer).not.toBe('')
      expect(role.sites.length).toBeGreaterThan(0)
      for (const site of role.sites) expect(site.url).toMatch(/^https:\/\//)
    }
  })

  it('keeps the React platforms described as deployed to staging, never live', () => {
    const cactus = en.career.roles.igaming.outcomes.join(' ')
    expect(cactus).toContain('deployed to staging and approved for launch')
    expect(cactus).not.toMatch(/\b(live|in production|shipped)\b/i)
  })
})
