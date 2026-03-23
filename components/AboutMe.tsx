'use client'

import { User, Target, Code2, Gamepad2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const AboutMe = () => {
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

    const element = document.getElementById('about')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  const personalTags = [
    {
      icon: User,
      title: '计算机工程学生',
      description: '系统学习计算机科学基础与工程实践',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Code2,
      title: 'AI 项目学习者',
      description: '专注于机器学习与AI应用开发',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Gamepad2,
      title: '游戏开发兴趣',
      description: '探索游戏引擎与交互设计',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Target,
      title: '长期主义成长路线',
      description: '持续积累，系统化提升能力',
      color: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <section id="about" className="section-padding max-w-7xl mx-auto">
      <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <User className="h-8 w-8 text-primary" />
            <span>关于我</span>
            <span className="text-primary"> / About Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧：介绍文本 */}
          <div className="space-y-6">
            <div className="glass-effect p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300">
              <p className="text-lg leading-relaxed text-muted-foreground">
                我是一名计算机工程方向的学生，正在持续推进{' '}
                <span className="text-primary font-medium">AI 应用</span>、
                <span className="text-primary font-medium"> 工程项目实践</span> 与{' '}
                <span className="text-primary font-medium">个人能力建设</span>。
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                我更关注{' '}
                <span className="text-accent font-medium">"把想法做成系统"</span>，希望通过长期积累项目与输出，形成真正可落地的技术能力。
              </p>
            </div>

            {/* 个人理念 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">个人理念</h3>
              <ul className="space-y-3">
                {[
                  '技术为解决问题而存在',
                  '持续学习是最好的投资',
                  '代码质量体现工程思维',
                  '开源与分享推动进步',
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 右侧：个人标签卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {personalTags.map((tag, index) => {
              const Icon = tag.icon
              return (
                <div
                  key={tag.title}
                  className={`glass-effect p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    isVisible ? 'animate-slide-up' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${tag.color} relative`}>
                      <Icon className="h-6 w-6 text-white" />
                      <div className="absolute -inset-1 bg-gradient-to-br opacity-20 blur-sm rounded-xl"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{tag.title}</h3>
                      <p className="text-sm text-muted-foreground">{tag.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 时间线/进度条 */}
        <div className="mt-12 glass-effect p-6 rounded-2xl border border-border">
          <h3 className="text-xl font-semibold mb-6 text-primary">当前学习重点</h3>
          <div className="space-y-6">
            {[
              { skill: 'AI/ML 项目开发', progress: 75 },
              { skill: 'Web 全栈开发', progress: 85 },
              { skill: '系统设计能力', progress: 60 },
              { skill: '工程实践能力', progress: 70 },
            ].map((item, index) => (
              <div key={item.skill} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.skill}</span>
                  <span className="text-primary font-medium">{item.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ${
                      isVisible ? 'w-full' : 'w-0'
                    }`}
                    style={{ width: isVisible ? `${item.progress}%` : '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe