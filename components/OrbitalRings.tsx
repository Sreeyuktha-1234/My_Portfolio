'use client'

const rings = [
  { size: 600, duration: 80, items: ['Python', 'PyTorch', 'TensorFlow', 'LangChain'], color: '#10b981', reverse: false },
  { size: 900, duration: 120, items: ['Azure', 'GCP', 'AWS', 'Docker', 'Kubernetes'], color: '#f59e0b', reverse: true },
  { size: 1200, duration: 160, items: ['RAG', 'LLM', 'MLOps', 'GenAI'], color: '#f43f5e', reverse: false },
]

export default function OrbitalRings() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <style>{`
        @keyframes orbit-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-ccw { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>
      {rings.map((ring, i) => {
        const radius = ring.size / 2
        const dir = ring.reverse ? 'orbit-ccw' : 'orbit-cw'
        const counter = ring.reverse ? 'orbit-cw' : 'orbit-ccw'
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: ring.size,
              height: ring.size,
              border: `1px dashed ${ring.color}10`,
              animation: `${dir} ${ring.duration}s linear infinite`,
              willChange: 'transform',
            }}
          >
            {ring.items.map((item, j) => {
              const startAngle = (j / ring.items.length) * 360
              return (
                <div
                  key={item}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: 0,
                    height: 0,
                    transform: `rotate(${startAngle}deg)`,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: -radius,
                      left: 0,
                      transform: 'translateX(-50%)',
                      animation: `${counter} ${ring.duration}s linear infinite`,
                      willChange: 'transform',
                    }}
                  >
                    <div
                      className="px-3 py-1 text-[10px] font-medium rounded-full whitespace-nowrap glass border"
                      style={{ borderColor: `${ring.color}25`, color: `${ring.color}aa` }}
                    >
                      {item}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
