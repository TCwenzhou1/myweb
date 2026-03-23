import type { Metadata } from 'next'
import EmbedFrame from '@/components/EmbedFrame'

export const metadata: Metadata = {
  title: 'Games | TCwenzhou',
  description: '游戏开发探索：可试玩的内容、交互作品、正在做的游戏项目。',
}

export default function GamesPage() {
  return (
    <div className="section-padding py-16 max-w-4xl mx-auto">
      {/* header */}
      <div className="mb-12">
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-3">
          Games
        </p>
        <h1 className="text-3xl font-bold text-foreground mb-4">游戏</h1>
        <p className="text-muted-foreground max-w-xl leading-relaxed">
          对游戏开发有长期兴趣，这里是可以直接试玩或查看的内容。目前还在早期阶段，会陆续补充。
        </p>
      </div>

      {/* placeholder - ready for embed */}
      <div className="space-y-6">
        <EmbedFrame
          title="即将到来"
          description="正在开发中，暂无可展示内容。"
          placeholder
        />
      </div>
    </div>
  )
}
