'use client'

import { Target, Code2, Gamepad2, TrendingUp, Brain, Rocket, Layers, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

const Growth = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('growth')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  const growthCards = [
    {
      title: 'AI 项目学习',
      description: '深入机器学习、深度学习与AI应用开发，构建智能系统解决方案。',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      features: ['模型训练', '算法优化', '应用部署'],
    },
    {
      title: '工程实践',
      description: '从代码到系统，注重软件工程原则、架构设计与团队协作能力。',
      icon: Layers,
      color: 'from-blue-500 to-cyan-500',
      features: ['系统设计', '代码规范', '团队协作'],
    },
    {
      title: '游戏开发兴趣',
      description: '探索游戏引擎、图形渲染与交互设计，将创意转化为可玩体验。',
      icon: Gamepad2,
      color: 'from-green-500 to-emerald-500',
      features: ['Unity/Unreal', '图形学', '游戏设计'],
    },
    {
      title: '长期主义成长',
      description: '持续学习、系统化积累，构建可持续的技术成长路径。',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      features: ['知识体系', '项目积累', '技术视野'],
    },
  ]

  return (
    <section id="growth" className="section-padding max-w-7xl mx-auto">
      <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            成长方向
            <span className="text-primary ml-2">/ Growth Path</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            技术成长的系统化规划，关注长期价值与能力积累的多个维度。
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4"></div>
        </div>

        {/* 成长卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {growthCards.map((card, index) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className={`glass-effect p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  isVisible ? 'animate-slide-up' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* 图标 */}
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} inline-block mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* 标题 */}
                <h3 className="text-xl font-semibold mb-3">{card.title}</h3>

                {/* 描述 */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {card.description}
                </p>

                {/* 特性标签 */}
                <div className="space-y-2">
                  {card.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* 成长路径时间线 */}
        <div className="glass-effect p-6 rounded-2xl border border-border">
          <h3 className="text-xl font-semibold mb-6 text-primary">技术成长路径</h3>
          <div className="relative">
            {/* 时间线连接线 */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-accent/30 to-transparent"></div>

            {/* 时间线节点 */}
            <div className="space-y-8">
              {[
                {
                  time: '当前',
                  title: '技术深度探索',
                  description: '深入AI/ML、系统设计等专业领域，构建技术深度',
                  icon: Zap,
                },
                {
                  time: '短期目标',
                  title: '项目实践积累',
                  description: '完成多个完整项目，积累工程实践经验',
                  icon: Rocket,
                },
                {
                  time: '中期规划',
                  title: '技术广度扩展',
                  description: '探索云原生、分布式系统等前沿技术',
                  icon: Target,
                },
                {
                  time: '长期愿景',
                  title: '技术创新贡献',
                  description: '参与开源项目，进行技术输出与分享',
                  icon: Code2,
                },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="relative pl-12">
                    {/* 时间点 */}
                    <div className="absolute left-0 top-0 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    
                    {/* 内容 */}
                    <div>
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {item.time}
                        </span>
                        <h4 className="text-lg font-semibold">{item.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Growth