'use client'

import { ArrowRight, Sparkles, Cpu } from 'lucide-react'
import { useEffect, useState } from 'react'

const Hero = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.1

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
        ></div>
        
        {/* 网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="section-padding max-w-7xl mx-auto text-center relative z-10">
        {/* 装饰性图标 */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl"></div>
            <Cpu className="h-16 w-16 text-primary animate-float" />
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-accent animate-pulse" />
          </div>
        </div>

        {/* 主标题 */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="block text-foreground">未来</span>
          <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            计算机工程师
          </span>
        </h1>

        {/* 副标题 */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          专注于 <span className="text-primary font-medium">AI 项目学习</span>、
          <span className="text-primary font-medium"> 工程实践</span> 与
          <span className="text-primary font-medium"> 个人系统构建</span>。
          <br />
          这里展示我的项目、技能栈，以及持续成长的路径。
        </p>

        {/* 按钮组 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="group relative px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
            <span className="flex items-center space-x-2">
              <span>查看项目</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute -inset-1 bg-primary/30 rounded-full blur-md -z-10 group-hover:blur-lg transition-all duration-300"></div>
          </button>
          
          <button className="px-8 py-3 bg-transparent text-primary rounded-full font-medium border border-primary/30 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-105">
            联系我
          </button>
        </div>

        {/* 滚动提示 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
          </div>
        </div>

        {/* 数据统计 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto">
          {[
            { label: '项目完成', value: '12+' },
            { label: '技能掌握', value: '15+' },
            { label: '学习时长', value: '2000h+' },
            { label: '代码提交', value: '500+' },
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="glass-effect p-4 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 装饰性代码片段 */}
      <div className="absolute bottom-20 left-4 md:left-8 text-xs text-primary/30 font-mono hidden md:block">
        <div className="animate-pulse">{'// 持续构建中...'}</div>
        <div className="ml-4">const growth = ∞</div>
      </div>
    </section>
  )
}

export default Hero