export interface Brand {
  id: string
  name: string
  greeting: string
  primary: string
  surface: string
  radius: string
}

/** Invented for this demo. No real brand. */
export const brands: readonly Brand[] = [
  { id: 'one', name: 'Brand one', greeting: 'Welcome back', primary: '#0E7C86', surface: '#E3F4F5', radius: '10px' },
  { id: 'two', name: 'Brand two', greeting: 'Good to see you', primary: '#C2410C', surface: '#FFF0E6', radius: '2px' },
  { id: 'three', name: 'Brand three', greeting: 'Hello again', primary: '#4338A8', surface: '#ECEBFB', radius: '22px' },
]
