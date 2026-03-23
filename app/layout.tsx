import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TCwenzhou | 未来计算机工程师',
  description: '专注于 AI 项目学习、工程实践与个人系统构建。计算机工程学生，分享技术成长的路径。',
  keywords: ['计算机工程', 'AI项目', '作品集', '技术博客', '前端开发', '强化学习'],
  authors: [{ name: 'TCwenzhou', url: 'https://tcwenzhou.com' }],
  creator: 'TCwenzhou',
  metadataBase: new URL('https://tcwenzhou.com'),
  openGraph: {
    title: 'TCwenzhou | 未来计算机工程师',
    description: '专注于 AI 项目学习、工程实践与个人系统构建',
    url: 'https://tcwenzhou.com',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TCwenzhou | 未来计算机工程师',
    description: '专注于 AI 项目学习、工程实践与个人系统构建',
    creator: '@tcwenzhou',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className={`${inter.className} gradient-bg min-h-screen`}>
        <div className="relative">
          {/* 背景装饰元素 */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 -left-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
          
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}