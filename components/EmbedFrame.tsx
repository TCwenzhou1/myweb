interface EmbedFrameProps {
  /** iframe src URL */
  src?: string
  /** 展示标题 */
  title: string
  /** 简短说明 */
  description?: string
  /** 占位模式：没有内容时显示 */
  placeholder?: boolean
  /** 容器高度，默认 480px */
  height?: number
}

/**
 * EmbedFrame
 * 用于嵌入 HTML5 游戏、Canvas Demo、iframe 内容。
 * 传 placeholder=true 时显示占位卡片。
 * 传 src 时渲染 iframe。
 */
export default function EmbedFrame({
  src,
  title,
  description,
  placeholder = false,
  height = 480,
}: EmbedFrameProps) {
  if (placeholder || !src) {
    return (
      <div
        className="card-base flex flex-col items-center justify-center text-center p-12"
        style={{ minHeight: height / 2 }}
      >
        <div className="w-10 h-10 rounded-xl border-2 border-dashed border-border flex items-center justify-center mb-4">
          <span className="text-muted-foreground/50 text-xl">+</span>
        </div>
        <p className="text-sm font-medium text-foreground mb-1">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    )
  }

  return (
    <div className="card-base overflow-hidden">
      <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <iframe
        src={src}
        title={title}
        width="100%"
        height={height}
        className="block"
        sandbox="allow-scripts allow-same-origin allow-forms"
        loading="lazy"
      />
    </div>
  )
}
