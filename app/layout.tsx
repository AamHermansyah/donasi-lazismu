import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'LAZISMU Kabupaten Tasikmalaya',
  description: 'Mempersembahkan layanan donasi ZISKA (Zakat, Infak, Sedekah, Wakaf) yang mudah, aman, dan transparan melalui adopsi teknologi blockchain. Mewujudkan pemberdayaan umat LAZISMU.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
