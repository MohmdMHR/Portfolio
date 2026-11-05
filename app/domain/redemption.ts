export interface RedemptionRun {
  log: string[]
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

const describeResult = (result: 'redeemed' | 'replayed', attempt: number): string => {
  if (result === 'replayed') return 'Server recognises the key and returns the first result'
  return attempt === 1 ? 'Server redeems the coupon' : 'Server redeems the coupon again'
}

export function simulateLostResponse({ withKey }: { withKey: boolean }): RedemptionRun {
  const server = createServer()
  const key = withKey ? '7f3a' : undefined

  const first = server.redeem(key)
  const log = [
    withKey ? 'Terminal sends redeem, with key 7f3a' : 'Terminal sends redeem',
    describeResult(first, 1),
    'The response is lost on the network',
    withKey ? 'Terminal retries with the same key' : 'Terminal retries',
  ]
  log.push(describeResult(server.redeem(key), 2))

  return { log, redemptions: server.redemptions }
}
