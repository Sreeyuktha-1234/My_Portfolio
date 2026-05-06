import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import BackgroundGrid from '@/components/BackgroundGrid'
import FloatingShapes from '@/components/FloatingShapes'
import Preloader from '@/components/Preloader'

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] })

export const metadata: Metadata = {
  title: 'Sree Yuktha Sunkara | AI ML Engineer',
  description: 'AI ML Engineer specializing in GenAI, RAG pipelines, and production ML systems.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-bg text-neutral-200 antialiased`}>
        <Preloader />
        <BackgroundGrid />
        <FloatingShapes />
        <CustomCursor />
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
