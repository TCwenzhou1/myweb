import { Github, Linkedin, Mail, Code2 } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/TCwenzhou1', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/tcwenzhou', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@tcwenzhou.site', label: 'Email' },
  ]

  const quickLinks = [
    { label: '首页', href: '#home' },
    { label: '关于我', href: '#about' },
    { label: '项目', href: '#projects' },
    { label: '技能', href: '#skills' },
    { label: '作品', href: '#gallery' },
    { label: '联系', href: '#contact' },
  ]

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="section-padding max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Code2 className="h-8 w-8 text-primary" />
                <div className="absolute -inset-2 bg-primary/10 rounded-full blur-md"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TCwenzhou
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              专注于 AI 项目学习、工程实践与个人系统构建。
              未来计算机工程师的成长记录。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">快速导航</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">联系方式</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                <span className="font-medium">邮箱:</span> hello@tcwenzhou.site
              </li>
              <li className="text-sm text-muted-foreground">
                <span className="font-medium">微信:</span> tcwenzhou
              </li>
              <li className="text-sm text-muted-foreground">
                <span className="font-medium">状态:</span> 📚 学习中 / 可合作
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">社交平台</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-secondary hover:bg-primary/10 rounded-lg border border-border hover:border-primary/30 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TCwenzhou. 保留所有权利。
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            使用 Next.js + TypeScript + Tailwind CSS 构建
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer