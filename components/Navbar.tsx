'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Code2 } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: '首页', href: '#home' },
    { label: '关于我', href: '#about' },
    { label: '项目', href: '#projects' },
    { label: '技能', href: '#skills' },
    { label: '成长', href: '#growth' },
    { label: '作品', href: '#gallery' },
    { label: '联系', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-effect py-3' : 'bg-transparent py-4'
    }`}>
      <div className="section-padding max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <Code2 className="h-8 w-8 text-primary animate-float" />
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TCwenzhou
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary group-hover:w-4/5 group-hover:left-1/10 transition-all duration-300"></span>
              </a>
            ))}
            <button className="ml-6 px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]">
              联系我
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 glass-effect rounded-xl border border-border p-4 animate-slide-up">
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button className="w-full mt-4 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full border border-primary/30 hover:border-primary/50 transition-all duration-300">
                联系我
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar