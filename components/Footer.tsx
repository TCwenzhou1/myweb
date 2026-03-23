import { Github, Mail } from 'lucide-react'
import Link from 'next/link'

const navLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Games', href: '/games' },
  { label: 'Lab', href: '/lab' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const Footer = () => {
  return (
    <footer className="border-t border-border mt-24">
      <div className="section-padding max-w-6xl mx-auto py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* brand */}
          <div>
            <Link href="/" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              TCwenzhou
            </Link>
            <p className="text-xs text-muted-foreground mt-1">
              hello@tcwenzhou.site
            </p>
          </div>

          {/* nav links */}
          <div className="flex flex-wrap gap-x-5 gap-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* social */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/TCwenzhou1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="mailto:hello@tcwenzhou.site"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} TCwenzhou · Built with Next.js + Tailwind · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
