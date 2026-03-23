'use client'

import { Code, Globe, Wrench, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const Skills = () => {
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

    const element = document.getElementById('skills')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  const skillCategories = [
    {
      title: '编程语言',
      icon: Code,
      skills: [
        { name: 'Python', level: 85, color: 'from-blue-500 to-cyan-500' },
        { name: 'TypeScript', level: 80, color: 'from-blue-600 to-blue-400' },
        { name: 'JavaScript', level: 85, color: 'from-yellow-500 to-yellow-300' },
        { name: 'Java', level: 70, color: 'from-red-500 to-orange-500' },
        { name: 'C++', level: 65, color: 'from-blue-700 to-blue-500' },
      ],
    },
    {
      title: '前端与 Web',
      icon: Globe,
      skills: [
        { name: 'React', level: 85, color: 'from-cyan-500 to-blue-500' },
        { name: 'Next.js', level: 80, color: 'from-gray-800 to-gray-600' },
        { name: 'Tailwind CSS', level: 90, color: 'from-teal-500 to-cyan-500' },
        { name: 'Vue.js', level: 70, color: 'from-green-500 to-emerald-400' },
        { name: 'Node.js', level: 75, color: 'from-green-600 to-green-400' },
      ],
    },
    {
      title: '工具与工程',
      icon: Wrench,
      skills: [
        { name: 'Git', level: 85, color: 'from-orange-600 to-orange-400' },
        { name: 'Docker', level: 70, color: 'from-blue-500 to-cyan-400' },
        { name: 'VS Code', level: 95, color: 'from-blue-600 to-blue-400' },
        { name: 'Figma', level: 75, color: 'from-purple-500 to-pink-500' },
        { name: 'PostgreSQL', level: 70, color: 'from-blue-400 to-blue-600' },
      ],
    },
    {
      title: '正在深入',
      icon: TrendingUp,
      skills: [
        { name: 'AI/ML', level: 60, color: 'from-purple-600 to-pink-500' },
        { name: '云原生', level: 55, color: 'from-blue-500 to-indigo-500' },
        { name: '系统设计', level: 65, color: 'from-gray-600 to-gray-400' },
        { name: '游戏开发', level: 50, color: 'from-green-500 to-cyan-500' },
        { name: 'DevOps', level: 55, color: 'from-orange-500 to-red-500' },
      ],
    },
  ]

  return (
    <section id="skills" className="section-padding max-w-7xl mx-auto">
      <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            技能栈
            <span className="text-primary ml-2">/ Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            技术能力的持续积累与系统化构建，涵盖从基础编程到专业工程实践的多个层面。
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4"></div>
        </div>

        {/* 技能分类网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={category.title}
                className={`glass-effect p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:scale-102 ${
                  isVisible ? 'animate-slide-up' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* 分类标题 */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                {/* 技能列表 */}
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{skill.name}</span>
                        <span className="text-primary font-medium">{skill.level}%</span>
                      </div>
                      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`absolute inset-0 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ${
                            isVisible ? 'w-full' : 'w-0'
                          }`}
                          style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                        ></div>
                        {/* 进度条光晕效果 */}
                        <div
                          className={`absolute inset-0 rounded-full bg-gradient-to-r ${skill.color} opacity-30 blur-sm transition-all duration-1000 ${
                            isVisible ? 'w-full' : 'w-0'
                          }`}
                          style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* 技能特点总结 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: '深度 vs 广度',
              description: '既追求技术深度，也注重知识广度的全面发展',
              icon: '🎯',
            },
            {
              title: '实战驱动',
              description: '通过项目实践验证技能，在做中学',
              icon: '⚙️',
            },
            {
              title: '持续迭代',
              description: '跟踪技术发展，定期更新技能树',
              icon: '🔄',
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="glass-effect p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        {/* 学习资源推荐 */}
        <div className="mt-12 glass-effect p-6 rounded-2xl border border-border">
          <h3 className="text-xl font-semibold mb-4 text-primary">当前学习方向</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              '大规模系统设计与架构',
              '分布式系统与云原生',
              '深度学习模型优化',
              'Web 3 & 区块链应用',
            ].map((resource) => (
              <div
                key={resource}
                className="flex items-center space-x-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="h-2 w-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">{resource}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills