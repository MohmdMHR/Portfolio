export type RoleId = 'igaming' | 'retail' | 'ecommerce' | 'procurement' | 'telecom' | 'fleet'

export interface Role {
  id: RoleId
  title: string
  /** Named employer, or null when the name is withheld and shown as a redaction bar. */
  employer: string | null
  /** The contract was for a withheld client, shown after the employer. */
  forWithheldClient?: boolean
  context: string
  dates: string
  detail: string
}

export const roles: readonly Role[] = [
  {
    id: 'igaming',
    title: 'Front-End Tech Lead / Senior Full-Stack',
    employer: null,
    context: 'iGaming, Dubai',
    dates: '01/2026 to Present',
    detail: '4 React white-label platforms from scratch, the Vue 3 and Nuxt 3 player front-end, the back office with WebSockets, and the Laravel backend. Rewrote the validation layer across the whole app. Designed the team\'s Claude Code workflow.',
  },
  {
    id: 'retail',
    title: 'Front-End Developer',
    employer: 'SQLI Netherlands',
    forWithheldClient: true,
    context: 'European retail',
    dates: '10/2024 to 08/2025',
    detail: 'Core Web Vitals work on checkout and product pages, Algolia search across a high-SKU catalog, TypeScript into legacy repos, Git and CI standardised across squads.',
  },
  {
    id: 'ecommerce',
    title: 'Front-End Developer',
    employer: null,
    context: 'Multi-store European e-commerce',
    dates: '08/2023 to 07/2024',
    detail: 'Rewrote high-traffic checkout and minicart with localised payments. Led the migration of core modules to Vue and TypeScript with DDD and test-first. Design tokens across three squads.',
  },
  {
    id: 'procurement',
    title: 'Full-Stack Developer',
    employer: null,
    context: 'Retail tech and public procurement',
    dates: '08/2021 to 07/2023',
    detail: 'NestJS microservices, PostgreSQL, JWT, RBAC and rate limiting, with React dashboards. Vue and Nuxt micro-frontends on Java services, with WCAG-compliant catalog pages.',
  },
  {
    id: 'telecom',
    title: 'Front-End Developer',
    employer: 'Gear9',
    context: 'National telecom portals, Morocco',
    dates: '09/2020 to 08/2021',
    detail: 'Vue component libraries on shared design tokens. Elasticsearch faceted catalog navigation.',
  },
  {
    id: 'fleet',
    title: 'Full-Stack Developer',
    employer: 'JP&CO',
    context: 'Fleet telematics, Morocco',
    dates: '10/2018 to 09/2020',
    detail: 'Legacy apps migrated to Angular and Vue. Laravel REST APIs for vehicle telemetry, geofencing triggers and access control.',
  },
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
  { name: 'DDD', roles: ['igaming', 'ecommerce'] },
  { name: 'Test-first', roles: ['igaming', 'ecommerce'] },
  { name: 'Micro-frontends', roles: ['procurement'] },
  { name: 'Design tokens', roles: ['ecommerce', 'telecom'] },
  { name: 'WebSockets', roles: ['igaming'] },
  { name: 'PostgreSQL', roles: ['procurement'] },
  { name: 'Claude Code', roles: ['igaming'] },
  { name: 'Working knowledge: AWS, Docker, GraphQL', roles: [] },
]

export function rolesUsing(skillName: string): Role[] {
  const skill = skills.find(item => item.name === skillName)
  return roles.filter(role => skill?.roles.includes(role.id))
}
