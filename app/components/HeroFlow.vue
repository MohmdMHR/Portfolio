<script setup lang="ts">
interface Particle {
  x: number
  y: number
  speed: number
  size: number
  stopAt: number | null
  fading: number
  fall: number
}

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
const gateAt = [0.56, 0.68, 0.8, 0.92] as const

onMounted(() => {
  const element = canvas.value
  const context = element?.getContext('2d')
  if (!element || !context) return

  let width = 0
  let height = 0
  let particles: Particle[] = []
  let visible = true
  let frameId = 0
  let pointerX = -999
  let pointerY = -999

  const color = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

  const spawn = (anywhere: boolean): Particle => {
    const stops = Math.random() < 0.14
    const gate = gateAt[Math.floor(Math.random() * gateAt.length)] ?? 0.8
    return {
      x: anywhere ? Math.random() * width : -20,
      y: Math.random() * height,
      speed: 0.5 + Math.random() * 1.3,
      size: 1 + Math.random() * 1.9,
      stopAt: stops ? gate * width : null,
      fading: 0,
      fall: 0,
    }
  }

  const resize = () => {
    const ratio = Math.min(devicePixelRatio || 1, 1.5)
    const box = element.getBoundingClientRect()
    width = box.width
    height = box.height
    element.width = width * ratio
    element.height = height * ratio
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    particles = Array.from({ length: width < 700 ? 60 : 150 }, () => spawn(true))
  }

  const draw = (moving: boolean) => {
    const line = color('--line')
    const accent = color('--accent')
    const fail = color('--fail')
    const pass = color('--pass')

    context.clearRect(0, 0, width, height)
    context.strokeStyle = line
    context.lineWidth = 1
    for (const gate of gateAt) {
      context.beginPath()
      context.moveTo(gate * width, 0)
      context.lineTo(gate * width, height)
      context.stroke()
    }

    particles = particles.map((particle) => {
      const next = particle
      if (moving && next.fading) {
        next.fading += 1
        next.fall += 0.06
        next.y += next.fall
      }
      else if (moving) {
        next.x += next.speed
        const dx = next.x - pointerX
        const dy = next.y - pointerY
        const distance = dx * dx + dy * dy
        if (distance < 9000) next.y += (dy / Math.sqrt(distance + 1)) * 1.6
        if (next.stopAt !== null && next.x >= next.stopAt) next.fading = 1
      }

      context.globalAlpha = next.fading ? Math.max(0, 1 - next.fading / 70) : 0.75
      context.fillStyle = next.fading ? fail : next.x > 0.92 * width ? pass : accent
      context.beginPath()
      context.arc(next.x, next.y, next.size, 0, Math.PI * 2)
      context.fill()

      return next.x > width + 20 || next.fading > 70 ? spawn(false) : next
    })
    context.globalAlpha = 1
  }

  const loop = () => {
    if (visible) draw(true)
    frameId = requestAnimationFrame(loop)
  }

  const onMove = (event: PointerEvent) => {
    const box = element.getBoundingClientRect()
    pointerX = event.clientX - box.left
    pointerY = event.clientY - box.top
  }
  const onLeave = () => {
    pointerX = -999
    pointerY = -999
  }

  const host = element.parentElement
  host?.addEventListener('pointermove', onMove)
  host?.addEventListener('pointerleave', onLeave)

  const reduced = prefersReducedMotion()
  const onResize = () => {
    resize()
    if (reduced) draw(false)
  }
  window.addEventListener('resize', onResize)

  const watcher = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? true
  })
  watcher.observe(element)

  // Theme changes need a redraw when nothing is animating.
  const themeWatcher = new MutationObserver(() => {
    if (reduced) draw(false)
  })
  themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  resize()
  if (reduced) draw(false)
  else loop()

  onBeforeUnmount(() => {
    cancelAnimationFrame(frameId)
    watcher.disconnect()
    themeWatcher.disconnect()
    window.removeEventListener('resize', onResize)
    host?.removeEventListener('pointermove', onMove)
    host?.removeEventListener('pointerleave', onLeave)
  })
})
</script>

<template>
  <canvas
    ref="canvas"
    aria-hidden="true"
  />
</template>
