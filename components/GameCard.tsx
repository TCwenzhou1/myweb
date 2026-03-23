import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'

interface GameCardProps {
  title: string
  description: string
  tags?: string[]
  /** 跳转到游戏详情页 */
  href?: string
  /** 直接可玩的 iframe 链接 */
  playUrl?: string
  /** GitHub 仓库链接 */
  github?: string
  status?: 'playable' | 'demo' | 'wip'
}

const statusConfig = {
  playable: { label: '可试玩', color: '#059669' },
  demo: { label: 'Demo', color: '#2563eb' },
  wip: { label: '开发中', color: '#d97706' },
}

/**
 * GameCard
 * 游戏/可玩内容卡片，用于 Games 页面。
 */
export default function GameCard({
  title,
  description,
  tags = [],
  href,
  playUrl,
  github,
  status = 'wip',
}: GameCardProps) {
  const s = statusConfig[status]

  const inner = (
    <div className="card-base card-hover p-5 md:p-6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
          <span
            className="text-xs px-2 py-0.5 rounded-full border"
            style={{
              color: s.color,
              borderColor: s.color + '40',
              background: s.color + '10',
            }}
          >
            {s.label}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {playUrl && (
            <a
              href={playUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Play"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )

  if (href) {
    return <Link href={href}>{inner}</Link>
  }
  return inner
}
