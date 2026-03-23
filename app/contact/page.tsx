import type { Metadata } from 'next'
import { Github, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact | TCwenzhou',
  description: '联系 TCwenzhou',
}

export default function ContactPage() {
  return (
    <div className="section-padding py-16 max-w-2xl mx-auto">
      {/* header */}
      <div className="mb-10">
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-3">
          Contact
        </p>
        <h1 className="text-3xl font-bold text-foreground mb-4">联系</h1>
        <p className="text-muted-foreground leading-relaxed">
          有想法聊聊，或者有合适的项目想一起做，都可以找我。
        </p>
      </div>

      {/* contact methods */}
      <div className="space-y-3">
        <a
          href="mailto:hello@tcwenzhou.site"
          className="flex items-center gap-4 p-5 card-base card-hover group"
        >
          <div className="p-2.5 rounded-xl bg-secondary group-hover:bg-primary/8 transition-colors">
            <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">邮箱</p>
            <p className="text-sm text-muted-foreground">hello@tcwenzhou.site</p>
          </div>
        </a>

        <a
          href="https://github.com/TCwenzhou1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 card-base card-hover group"
        >
          <div className="p-2.5 rounded-xl bg-secondary group-hover:bg-primary/8 transition-colors">
            <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">GitHub</p>
            <p className="text-sm text-muted-foreground">github.com/TCwenzhou1</p>
          </div>
        </a>
      </div>
    </div>
  )
}
