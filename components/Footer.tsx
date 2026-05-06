'use client'

export default function Footer() {
  return (
    <footer className="py-8 border-t border-neutral-800/50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-600">
          &copy; {new Date().getFullYear()} Sree Yuktha Sunkara
        </p>
        <div className="flex items-center gap-1 text-sm text-neutral-600">
          <span className="w-2 h-2 rounded-full bg-accent-emerald/50 animate-pulse" />
          Built with intention
        </div>
      </div>
    </footer>
  )
}
