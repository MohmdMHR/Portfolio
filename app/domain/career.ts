export type RoleId = 'igaming' | 'retail' | 'ecommerce' | 'procurement' | 'telecom' | 'fleet'

export interface Site {
  /** Name shown on the page, the same as on the CV. */
  name: string
  url: string
}

export interface Role {
  id: RoleId
  /** Legal employer, as on the CV. */
  employer: string
  /** Employer, client or product sites, linked from the role. */
  sites: readonly Site[]
  /** Tech stack tags; tech names are the same in every language. */
  tech: readonly string[]
}

export const roles: readonly Role[] = [
  {
    id: 'igaming',
    employer: 'Cactus Gaming',
    sites: [{ name: 'cactusgaming.net/en', url: 'https://cactusgaming.net/en/' }],
    tech: ['React', 'React Router', 'Vite', 'TypeScript', 'Vue 3', 'Nuxt 3', 'Laravel', 'Spatie', 'WebSockets', 'Zod', 'Vitest', 'Playwright', 'Postman', 'GitHub Actions', 'Cloudflare Workers', 'Tailwind CSS'],
  },
  {
    id: 'retail',
    employer: 'SQLI',
    sites: [{ name: 'kamera-express.nl', url: 'https://www.kamera-express.nl/' }],
    tech: ['Vue 2 (Composition API)', 'Nuxt 2', 'Vue Storefront', 'TypeScript', 'Pinia', 'Vuex', 'Algolia (Vue InstantSearch)', 'Google Tag Manager', 'Google Ad Manager', 'Novulo', 'GitLab CI', 'GitFlow', 'Jira'],
  },
  {
    id: 'ecommerce',
    employer: 'Carrefour',
    sites: [{ name: 'carrefour.fr', url: 'https://www.carrefour.fr/' }],
    tech: ['Vue 2', 'Vue 3', 'TypeScript', 'DDD', 'TDD', 'Jest', 'Storybook', 'Google Tag Manager', 'Jenkins', 'Jira', 'Figma', 'Scrum'],
  },
  {
    id: 'procurement',
    employer: 'Atos',
    sites: [
      { name: 'highco.com/en', url: 'https://www.highco.com/en/' },
      { name: 'ugap.fr', url: 'https://ugap.fr/' },
    ],
    tech: ['React', 'Node.js', 'NestJS', 'Microservices', 'TypeScript', 'PostgreSQL', 'JWT', 'OAuth', 'Vue 2', 'Nuxt 2', 'Ara Framework', 'Apache Solr', 'Storybook', 'Redmine'],
  },
  {
    id: 'telecom',
    employer: 'Gear9',
    sites: [
      { name: 'inwi.ma', url: 'https://www.inwi.ma/' },
      { name: 'win.ma', url: 'https://www.win.ma/' },
    ],
    tech: ['Vue 2', 'Vue Storefront', 'Nuxt', 'Elasticsearch', 'Magento 2', 'Google Tag Manager', 'Google Analytics', 'Jira', 'Scrum'],
  },
  {
    id: 'fleet',
    employer: 'JP&CO',
    sites: [{ name: 'jp.co.ma', url: 'https://www.jp.co.ma/' }],
    tech: ['Vue 2', 'Vuetify', 'Leaflet.js', 'AngularJS', 'Laravel', 'GitLab', 'Jira'],
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
  { name: 'SSR', roles: ['igaming', 'retail', 'procurement', 'telecom'] },
  { name: 'Node.js and NestJS', roles: ['procurement'] },
  { name: 'Laravel', roles: ['igaming', 'fleet'] },
  { name: 'AngularJS', roles: ['fleet'] },
  { name: 'RTL and LTR', roles: ['telecom'] },
  { name: 'DDD', roles: ['igaming', 'ecommerce'] },
  { name: 'Test-first', roles: ['igaming', 'ecommerce'] },
  { name: 'Algolia and Elasticsearch', roles: ['retail', 'telecom'] },
  { name: 'Micro-frontends', roles: ['procurement'] },
  { name: 'Design systems', roles: ['retail', 'telecom'] },
  { name: 'WebSockets', roles: ['igaming'] },
  { name: 'PostgreSQL', roles: ['procurement'] },
  { name: 'Mentoring', roles: ['telecom', 'fleet'] },
  { name: 'Claude Code', roles: ['igaming'] },
]

export function rolesUsing(skillName: string): Role[] {
  const skill = skills.find(item => item.name === skillName)
  return roles.filter(role => skill?.roles.includes(role.id))
}
