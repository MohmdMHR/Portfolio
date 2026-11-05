export type Environment = 'staging' | 'production'

export type Flags = Readonly<Record<Environment, boolean>>

export const initialFlags: Flags = { staging: true, production: false }

export const release = (flags: Flags): Flags => ({ ...flags, production: true })

export const kill = (flags: Flags): Flags => ({ ...flags, production: false })

export const checkoutFor = (flags: Flags, environment: Environment): string =>
  flags[environment] ? 'New checkout' : 'Old checkout'
