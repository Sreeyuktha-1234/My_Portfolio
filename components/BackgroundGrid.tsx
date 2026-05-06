'use client'

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-accent-emerald/[0.04] rounded-full blur-[80px]" />
        <div className="absolute top-[60%] right-[10%] w-96 h-96 bg-accent-amber/[0.04] rounded-full blur-[80px]" />
        <div className="absolute bottom-[10%] left-[30%] w-64 h-64 bg-accent-coral/[0.03] rounded-full blur-[80px]" />
      </div>
    </div>
  )
}
