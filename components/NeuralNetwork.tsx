'use client'

import { useEffect, useRef } from 'react'

type Node = { x: number; y: number; vx: number; vy: number; radius: number; layer: number; pulse: number }
type Connection = { from: number; to: number; weight: number }
type DataPacket = { connectionIdx: number; progress: number; speed: number; color: string }

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Cap DPR to avoid retina-driven slowdowns
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let animationId = 0
    let nodes: Node[] = []
    let connections: Connection[] = []
    let packets: DataPacket[] = []
    let lastFrame = 0
    const targetFps = 40
    const frameInterval = 1000 / targetFps

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const W = () => canvas.width / dpr
    const H = () => canvas.height / dpr

    const buildNetwork = () => {
      nodes = []
      connections = []
      packets = []

      const layers = [3, 5, 5, 3]
      const layerSpacing = W() / (layers.length + 1)
      const layerStartIdx: number[] = []

      layers.forEach((nodeCount, layerIdx) => {
        layerStartIdx.push(nodes.length)
        const x = layerSpacing * (layerIdx + 1)
        const verticalSpacing = H() / (nodeCount + 1)
        for (let i = 0; i < nodeCount; i++) {
          nodes.push({
            x,
            y: verticalSpacing * (i + 1),
            vx: 0,
            vy: 0,
            radius: 3,
            layer: layerIdx,
            pulse: Math.random() * Math.PI * 2,
          })
        }
      })

      // Sparse connections — each node connects to only 2 nearest in next layer
      for (let l = 0; l < layers.length - 1; l++) {
        const startA = layerStartIdx[l]
        const startB = layerStartIdx[l + 1]
        const nextCount = layers[l + 1]
        for (let i = 0; i < layers[l]; i++) {
          // Connect to 2 random next-layer nodes (not all-to-all)
          const used = new Set<number>()
          for (let k = 0; k < Math.min(2, nextCount); k++) {
            let j = Math.floor(Math.random() * nextCount)
            while (used.has(j)) j = (j + 1) % nextCount
            used.add(j)
            connections.push({
              from: startA + i,
              to: startB + j,
              weight: Math.random() * 0.4 + 0.15,
            })
          }
        }
      }

      // Data packets — fewer
      const colors = ['#10b981', '#f59e0b']
      for (let i = 0; i < 8; i++) {
        packets.push({
          connectionIdx: Math.floor(Math.random() * connections.length),
          progress: Math.random(),
          speed: 0.004 + Math.random() * 0.004,
          color: colors[i % 2],
        })
      }
    }

    buildNetwork()

    const onResize = () => {
      resize()
      buildNetwork()
    }
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('resize', onResize)
    canvas.addEventListener('mousemove', onMouseMove, { passive: true })

    let visible = true
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    const animate = (now: number) => {
      animationId = requestAnimationFrame(animate)
      if (!visible) return
      const elapsed = now - lastFrame
      if (elapsed < frameInterval) return
      lastFrame = now - (elapsed % frameInterval)

      ctx.clearRect(0, 0, W(), H())

      // Update node physics
      const m = mouseRef.current
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const dx = m.x - n.x
        const dy = m.y - n.y
        const distSq = dx * dx + dy * dy
        if (distSq < 40000) {
          const dist = Math.sqrt(distSq)
          const force = (200 - dist) / 200
          n.vx -= (dx / dist) * force * 0.04
          n.vy -= (dy / dist) * force * 0.04
        }
        n.x += n.vx
        n.y += n.vy
        n.vx *= 0.92
        n.vy *= 0.92
        n.pulse += 0.04
      }

      // Connections — solid color, no gradient per call
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)'
      ctx.lineWidth = 0.6
      ctx.beginPath()
      for (let i = 0; i < connections.length; i++) {
        const c = connections[i]
        const a = nodes[c.from]
        const b = nodes[c.to]
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
      }
      ctx.stroke()

      // Data packets — no shadow per frame
      for (let i = 0; i < packets.length; i++) {
        const p = packets[i]
        p.progress += p.speed
        if (p.progress > 1) {
          p.progress = 0
          p.connectionIdx = Math.floor(Math.random() * connections.length)
        }
        const c = connections[p.connectionIdx]
        if (!c) continue
        const a = nodes[c.from]
        const b = nodes[c.to]
        const x = a.x + (b.x - a.x) * p.progress
        const y = a.y + (b.y - a.y) * p.progress
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(x, y, 2.2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Nodes — single radial gradient cached via fillStyle, no shadow
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const pulse = n.radius + Math.sin(n.pulse) * 1.2

        // Soft halo
        ctx.fillStyle = 'rgba(16, 185, 129, 0.08)'
        ctx.beginPath()
        ctx.arc(n.x, n.y, pulse * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.fillStyle = '#10b981'
        ctx.beginPath()
        ctx.arc(n.x, n.y, pulse, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      io.disconnect()
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />
}
