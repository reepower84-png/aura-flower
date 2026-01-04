import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '아우라플라워 - 전국 꽃배달 & 플라워샵 창업',
  description: '전국 꽃배달 서비스와 플라워샵 창업을 도와드립니다. 축하화환, 근조화환, 꽃다발, 꽃바구니 전문.',
  keywords: '꽃배달, 화환, 꽃다발, 꽃바구니, 플라워샵 창업, 화환수거, 전국배달',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
