import { ar } from '~/i18n/ar'
import { en } from '~/i18n/en'

export function useLocale(): 'en' | 'ar' {
  return useRoute().path.startsWith('/ar') ? 'ar' : 'en'
}

export function useMessages() {
  return useLocale() === 'ar' ? ar : en
}
