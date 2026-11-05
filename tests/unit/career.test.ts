import { describe, expect, it } from 'vitest'
import { roles, rolesUsing, skills } from '../../app/domain/career'
import { ar } from '../../app/i18n/ar'
import { en } from '../../app/i18n/en'

describe('the career map', () => {
  it('has all six roles, newest first, with the current one still open', () => {
    expect(roles).toHaveLength(6)
    expect(en.career.roles[roles[0]!.id].dates).toBe('01/2026 to Present')
  })

  it('gives every role and skill a label in both languages', () => {
    for (const messages of [en, ar]) {
      for (const role of roles) expect(messages.career.roles[role.id].detail).not.toBe('')
      for (const skill of skills) expect(messages.career.skills[skill.name]).toBeTruthy()
    }
  })

  it('ties RTL and LTR to the telecom portals', () => {
    expect(rolesUsing('RTL and LTR').map(role => role.id)).toEqual(['telecom'])
  })

  it('ties Vue to every role', () => {
    expect(rolesUsing('Vue')).toHaveLength(6)
  })

  it('keeps Angular to one role', () => {
    expect(rolesUsing('Angular').map(role => role.id)).toEqual(['fleet'])
  })

  it('points every skill at roles that exist', () => {
    const ids = new Set(roles.map(role => role.id))
    for (const skill of skills) {
      for (const id of skill.roles) expect(ids.has(id)).toBe(true)
    }
  })

  it('keeps working-knowledge tools off every role', () => {
    const skill = skills.find(item => item.name.startsWith('Working knowledge'))
    expect(skill?.roles).toEqual([])
  })
})
