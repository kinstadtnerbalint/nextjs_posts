import { MainHeader } from '@/components/mainHeader'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextJS posts',
  icons: {
    icon: 'favicon.ico'
  }
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-slate-100 container mx-auto p-4`}>
        <MainHeader/>
        {children}
      </body>
    </html>
  )
}

