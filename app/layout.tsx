import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TCwenzhou | 个人主页',
  description: '计算机工程学生，AI 项目学习者，游戏开发探索者。这里是项目、实验和长期成长的记录。',
  keywords: ['计算机工程', 'AI项目', '游戏开发', '个人主页', '工程实践', '强化学习'],
  authors: [{ name: 'TCwenzhou', url: 'https://www.tcwenzhou.site' }],
  creator: 'TCwenzhou',
  metadataBase: new URL('https://www.tcwenzhou.site'),
  openGraph: {
    title: 'TCwenzhou | 个人主页',
    description: '计算机工程学生，AI 项目学习者，游戏开发探索者。',
    url: 'https://www.tcwenzhou.site',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TCwenzhou | 个人主页',
    description: '计算机工程学生，AI 项目学习者，游戏开发探索者。',
    creator: '@tcwenzhou',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} page-bg min-h-screen`}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
