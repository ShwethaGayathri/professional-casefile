import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Operation: Hire Me',
  description: 'Interactive portfolio — explore the case, connect the dots.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}