export type RedemptionStep =
  | 'send'
  | 'sendWithKey'
  | 'redeem'
  | 'lost'
  | 'retry'
  | 'retryWithKey'
  | 'redeemAgain'
  | 'replay'

export interface RedemptionRun {
  log: RedemptionStep[]
  redemptions: number
}

function createServer() {
  const seen = new Set<string>()
  let redemptions = 0

  return {
    redeem(key?: string): 'redeemed' | 'replayed' {
      if (key && seen.has(key)) return 'replayed'
      if (key) seen.add(key)
      redemptions += 1
      return 'redeemed'
    },
    get redemptions() {
      return redemptions
    },
  }
}

export function simulateLostResponse({ withKey }: { withKey: boolean }): RedemptionRun {
  const server = createServer()
  const key = withKey ? '7f3a' : undefined

  server.redeem(key)
  const second = server.redeem(key)
  const log: RedemptionStep[] = [
    withKey ? 'sendWithKey' : 'send',
    'redeem',
    'lost',
    withKey ? 'retryWithKey' : 'retry',
    second === 'replayed' ? 'replay' : 'redeemAgain',
  ]

  return { log, redemptions: server.redemptions }
}
