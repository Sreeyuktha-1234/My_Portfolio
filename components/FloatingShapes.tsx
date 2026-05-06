'use client'

const shapes = [
  { type: 'circle', size: 6, x: '10%', y: '20%', dur: 8, delay: 0 },
  { type: 'diamond', size: 8, x: '85%', y: '60%', dur: 9, delay: 1 },
  { type: 'ring', size: 12, x: '90%', y: '40%', dur: 11, delay: 2 },
  { type: 'circle', size: 5, x: '15%', y: '70%', dur: 7, delay: 3 },
  { type: 'diamond', size: 5, x: '50%', y: '85%', dur: 8, delay: 1.5 },
]

function shapeStyle(type: string, size: number) {
  if (type === 'circle') return { width: size, height: size, background: 'rgba(16,185,129,0.12)', borderRadius: '9999px' }
  if (type === 'diamond') return { width: size, height: size, background: 'rgba(245,158,11,0.12)', transform: 'rotate(45deg)' }
  return { width: size, height: size, border: '1px solid rgba(16,185,129,0.12)', borderRadius: '9999px' }
}

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {shapes.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: s.x,
            top: s.y,
            animation: `float-shape ${s.dur}s ease-in-out ${s.delay}s infinite`,
            willChange: 'transform',
          }}
        >
          <div style={shapeStyle(s.type, s.size)} />
        </div>
      ))}
    </div>
  )
}
