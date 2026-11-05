export type RoleId = 'igaming' | 'retail' | 'ecommerce' | 'procurement' | 'telecom' | 'fleet'

export interface Role {
  id: RoleId
  /** Named employer, or null when the name is withheld and shown as a redaction bar. */
  employer: string | null
  /** The contract was for a withheld client, shown after the employer. */
  forWithheldClient?: boolean
}

export const roles: readonly Role[] = [
  { id: 'igaming', employer: null },
  { id: 'retail', employer: 'SQLI Netherlands', forWithheldClient: true },
  { id: 'ecommerce', employer: null },
  { id: 'procurement', employer: null },
  { id: 'telecom', employer: 'Gear9' },
  { id: 'fleet', employer: 'JP&CO' },
]

export interface Skill {
  name: string
  roles: readonly RoleId[]
}

export const skills: readonly Skill[] = [
  { name: 'Vue', roles: ['igaming', 'retail', 'ecommerce', 'procurement', 'telecom', 'fleet'] },
  { name: 'Nuxt', roles: ['igaming', 'retail', 'procurement', 'telecom'] },
  { name: 'React', roles: ['igaming', 'procurement'] },
  { name: 'TypeScript', roles: ['igaming', 'retail', 'ecommerce', 'procurement'] },
  { name: 'Node.js and NestJS', roles: ['procurement'] },
  { name: 'Laravel', roles: ['igaming', 'fleet'] },
  { name: 'Angular', roles: ['fleet'] },
  { name: 'RTL and LTR', roles: ['telecom'] },
  { name: 'DDD', roles: ['igaming', 'ecommerce'] },
  { name: 'Test-first', roles: ['igaming', 'ecommerce'] },
  { name: 'Micro-frontends', roles: ['procurement'] },
  { name: 'Design tokens', roles: ['ecommerce', 'telecom'] },
  { name: 'WebSockets', roles: ['igaming'] },
  { name: 'PostgreSQL', roles: ['procurement'] },
  { name: 'Claude Code', roles: ['igaming'] },
  { name: 'Working knowledge', roles: [] },
]

export function rolesUsing(skillName: string): Role[] {
  const skill = skills.find(item => item.name === skillName)
  return roles.filter(role => skill?.roles.includes(role.id))
}
