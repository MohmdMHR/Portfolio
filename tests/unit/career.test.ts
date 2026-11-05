import { describe, expect, it } from 'vitest'
import { roles, rolesUsing, skills } from '../../app/domain/career'

describe('the career map', () => {
  it('has all six roles, newest first, with the current one still open', () => {
    expect(roles).toHaveLength(6)
    expect(roles[0]?.dates).toBe('01/2026 to Present')
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
