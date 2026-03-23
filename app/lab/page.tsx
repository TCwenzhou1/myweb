import type { Metadata } from 'next'
import EmbedFrame from '@/components/EmbedFrame'

export const metadata: Metadata = {
  title: 'Lab | TCwenzhou',
  description: '实验室：尝试中的想法、交互 Demo、还没想清楚的东西。',
}

export default function LabPage() {
  return (
    <div className="section-padding py-16 max-w-4xl mx-auto">
      {/* header */}
      <div className="mb-12">
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-3">
          Lab
        </p>
        <h1 className="text-3xl font-bold text-foreground mb-4">实验室</h1>
        <p className="text-muted-foreground max-w-xl leading-relaxed">
          还没做完的东西、还没想清楚的想法、纯粹用来试验的 Demo。不追求完整，只追求有趣。
        </p>
      </div>

      {/* placeholder - ready for demos */}
      <div className="space-y-6">
        <EmbedFrame
          title="空位预留中"
          description="会在这里放一些正在实验的东西。"
          placeholder
        />
      </div>
    </div>
  )
}
