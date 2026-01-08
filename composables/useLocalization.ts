import { ref, watch, onMounted } from 'vue'
import { useHead } from '#app'
import gsap from 'gsap'

export const useLocalization = () => {
  const currentLocale = ref<'en' | 'fr' | 'ar'>('en')
  const isRTL = ref(false)

  const setLocale = (locale: 'en' | 'fr' | 'ar') => {
    currentLocale.value = locale
    isRTL.value = locale === 'ar'
  }

  // Animation and DOM updates
  watch(isRTL, (newVal) => {
    // 1. Update HTML dir attribute
    if (import.meta.client) {
      document.documentElement.setAttribute('dir', newVal ? 'rtl' : 'ltr')
      document.documentElement.setAttribute('lang', currentLocale.value)
    
      // 2. GSAP "Flip" Animation
      // We'll effectively invert the x-axis for a moment to create a "flip" feeling
      // or just fade out/in to smooth the layout shift.
      // A simple timeline:
      const tl = gsap.timeline()
      
      tl.to('body', {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          // The actual layout flip happens via CSS 'dir' change which we did above.
          // This pause allows the browser to repaint.
        }
      })
      .to('body', {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  })

  // Set initial state
  onMounted(() => {
    if (import.meta.client) {
      document.documentElement.setAttribute('dir', isRTL.value ? 'rtl' : 'ltr')
    }
  })

  return {
    currentLocale,
    isRTL,
    setLocale
  }
}