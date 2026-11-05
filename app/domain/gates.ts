export const GATES = [
  'Plan',
  'Type-check',
  'Lint',
  'Vitest',
  'Playwright',
  'Visual QA',
  'Human review',
  'Merged',
] as const

export type Gate = (typeof GATES)[number]
export type GateStatus = 'passed' | 'rejected' | 'not reached'

export const scenarios = {
  clean: { stopsAt: null },
  design: { stopsAt: 'Human review' },
  visual: { stopsAt: 'Visual QA' },
  bypass: { stopsAt: 'Type-check' },
  layer: { stopsAt: 'Human review' },
} as const satisfies Record<string, { stopsAt: Gate | null }>

export type ScenarioId = keyof typeof scenarios

export function outcome(id: ScenarioId): GateStatus[] {
  const stopsAt: Gate | null = scenarios[id].stopsAt
  const stop = stopsAt === null ? -1 : GATES.indexOf(stopsAt)

  return GATES.map((_, index) => {
    if (stop === -1 || index < stop) return 'passed'
    return index === stop ? 'rejected' : 'not reached'
  })
}
