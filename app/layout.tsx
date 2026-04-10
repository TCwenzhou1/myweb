import type { Metadata, Viewport } from 'next'
import { Inter, Bodoni_Moda, Jost, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bodoni',
  adjustFontFallback: false,
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
    default: 'TCwenzhou | AI 项目、实验室与原型',
    template: '%s | TCwenzhou',
  },
  description:
    '计算机工程学生，持续做 AI 系统、学习产品实验和游戏原型。这里展示项目案例、日语学习实验室与公开工作流。',
  applicationName: 'TCwenzhou',
  keywords: ['TCwenzhou', 'AI 项目', '工程案例', '日语学习实验室', '游戏原型', '个人网站', 'Next.js'],
  authors: [{ name: 'TCwenzhou', url: siteUrl }],
  creator: 'TCwenzhou',
  alternates: {
    canonical: '/',
  },
  category: 'technology',
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'TCwenzhou | AI 项目、实验室与原型',
    description: '项目案例、日语学习实验室、游戏原型与持续公开的个人工作流。',
    url: siteUrl,
    siteName: 'TCwenzhou',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TCwenzhou | AI 项目、实验室与原型',
    description: '项目案例、日语学习实验室、游戏原型与持续公开的个人工作流。',
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
