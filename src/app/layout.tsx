import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Luxembourg Tax Simulator',
  description: 'Interactive tool for comparing joint vs individual taxation in Luxembourg',
  keywords: ['Luxembourg', 'tax', 'simulation', 'joint taxation', 'individual taxation'],
  authors: [{ name: 'Luxembourg Institute of Socio-Economic Research (LISER)' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#00A1DE" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
