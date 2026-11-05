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

interface Scenario {
  label: string
  stopsAt: Gate | null
  verdict: string
}

export const scenarios = {
  clean: {
    label: 'A clean, scoped change',
    stopsAt: null,
    verdict: 'Merged. The same gates run for every change, whoever or whatever wrote it.',
  },
  design: {
    label: 'Green tests, wrong design',
    stopsAt: 'Human review',
    verdict: 'Stopped at human review. It passed every check and it was still the wrong design. Most rejections are this one.',
  },
  visual: {
    label: 'Tests pass, screen looks wrong',
    stopsAt: 'Visual QA',
    verdict: 'Stopped at visual QA. Some decisions only show up when you look at the running UI.',
  },
  bypass: {
    label: 'The agent tries to skip a gate',
    stopsAt: 'Type-check',
    verdict: 'Stopped at the gate it tried to get past. Skipping a check counts as a failure.',
  },
  layer: {
    label: 'Front-end patch hiding a backend bug',
    stopsAt: 'Human review',
    verdict: 'Stopped at human review. It wrote front-end code to cover a backend issue without saying so. A workaround like that hides the real bug.',
  },
} as const satisfies Record<string, Scenario>

export type ScenarioId = keyof typeof scenarios

export function outcome(id: ScenarioId): GateStatus[] {
  const stopsAt: Gate | null = scenarios[id].stopsAt
  const stop = stopsAt === null ? -1 : GATES.indexOf(stopsAt)

  return GATES.map((_, index) => {
    if (stop === -1 || index < stop) return 'passed'
    return index === stop ? 'rejected' : 'not reached'
  })
}
