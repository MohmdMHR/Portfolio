type Theme = 'dark' | 'light'

export function useTheme() {
  const theme = ref<Theme>('dark')

  const read = (): Theme => {
    const set = document.documentElement.getAttribute('data-theme')
    if (set === 'dark' || set === 'light') return set
    return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }

  onMounted(() => {
    theme.value = read()
  })

  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', theme.value)
    try {
      localStorage.setItem('theme', theme.value)
    }
    catch {
      // Private windows can refuse storage. The switch still works for this visit.
    }
  }

  return { theme, toggle }
}
