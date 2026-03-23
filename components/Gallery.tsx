'use client'

import { Camera, Image as ImageIcon, Eye, Maximize2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const Gallery = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('gallery')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  const galleryImages = [
    {
      id: 1,
      title: '代码美学',
      description: '精心设计的代码结构与视觉呈现',
      category: '技术',
      color: 'from-blue-500/20 to-blue-700/20',
    },
    {
      id: 2,
      title: '界面设计',
      description: '用户交互与视觉体验的探索',
      category: '设计',
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      id: 3,
      title: '系统架构',
      description: '技术方案的思维导图与设计',
      category: '工程',
      color: 'from-green-500/20 to-emerald-500/20',
    },
    {
      id: 4,
      title: '概念原型',
      description: '创意想法的早期可视化呈现',
      category: '创意',
      color: 'from-orange-500/20 to-red-500/20',
    },
    {
      id: 5,
      title: '技术图解',
      description: '复杂概念的视觉化解释',
      category: '教育',
      color: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      id: 6,
      title: '作品展示',
      description: '项目成果的视觉化呈现',
      category: '展示',
      color: 'from-violet-500/20 to-purple-500/20',
    },
  ]

  return (
    <section id="gallery" className="section-padding max-w-7xl mx-auto">
      <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <Camera className="h-8 w-8 text-primary" />
            <span>作品展示</span>
            <span className="text-primary">/ Gallery</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            技术创作、设计思考与项目成果的视觉化记录，展现工程与美学的结合。
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4"></div>
        </div>

        {/* 图片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105 ${
                isVisible ? 'animate-slide-up' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(image.id)}
            >
              {/* 图片占位背景 */}
              <div className={`aspect-square bg-gradient-to-br ${image.color} relative`}>
                {/* 装饰性图形 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-xl"></div>
                </div>
                
                {/* 占位图标 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="h-16 w-16 text-white/20" />
                </div>

                {/* 悬停遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                        <p className="text-white/80 text-sm">{image.description}</p>
                      </div>
                      <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                        <Maximize2 className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 角标 */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full border border-primary/30">
                    {image.category}
                  </span>
                </div>
              </div>

              {/* 底部信息 */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-white/60" />
                    <span className="text-xs text-white/60">点击查看详情</span>
                  </div>
                  <span className="text-xs text-white/60">#{image.id.toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 画廊说明 */}
        <div className="mt-12 glass-effect p-6 rounded-2xl border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-primary">视觉记录</h4>
              <p className="text-sm text-muted-foreground">
                通过图像记录技术思考、设计过程和项目成果，形成可视化的成长档案。
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-primary">创作理念</h4>
              <p className="text-sm text-muted-foreground">
                注重技术表达的美学呈现，追求代码与设计的和谐统一，展现工程思维的艺术性。
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-primary">更新计划</h4>
              <p className="text-sm text-muted-foreground">
                定期更新项目截图、设计稿和技术图解，持续丰富作品集内容。
              </p>
            </div>
          </div>
        </div>

        {/* 模态框 - 图片详情 */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative max-w-4xl w-full">
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {galleryImages.find(img => img.id === selectedImage)?.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {galleryImages.find(img => img.id === selectedImage)?.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <Maximize2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className={`aspect-video rounded-lg bg-gradient-to-br ${
                    galleryImages.find(img => img.id === selectedImage)?.color
                  } flex items-center justify-center`}>
                    <div className="text-center">
                      <ImageIcon className="h-20 w-20 mx-auto text-white/20 mb-4" />
                      <p className="text-white/40">图片详情展示区域</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery