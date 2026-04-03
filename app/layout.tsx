import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Bodoni_Moda, Jost, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bodoni',
})
const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
})
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const siteUrl = 'https://www.tcwenzhou.site'

export const viewport: Viewport = {
  themeColor: '#F8F5EE',
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'TCwenzhou | 个人主页',
    template: '%s | TCwenzhou',
  },
  description: '计算机工程学生，AI 项目学习者，游戏开发探索者。这里是项目、实验和长期成长的记录。',
  applicationName: 'TCwenzhou',
  keywords: ['TCwenzhou', '计算机工程', 'AI 项目', '游戏开发', '个人主页', '工程实践', '强化学习', 'Next.js portfolio'],
  authors: [{ name: 'TCwenzhou', url: siteUrl }],
  creator: 'TCwenzhou',
  alternates: {
    canonical: '/',
  },
  category: 'technology',
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'TCwenzhou | 个人主页',
    description: '计算机工程学生，AI 项目学习者，游戏开发探索者。',
    url: siteUrl,
    siteName: 'TCwenzhou',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TCwenzhou | 个人主页',
    description: '计算机工程学生，AI 项目学习者，游戏开发探索者。',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${bodoni.variable} ${jost.variable} ${cormorant.variable} ${inter.className} min-h-screen`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
