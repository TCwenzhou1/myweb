'use client'

import { Send, Mail, User, MessageSquare, Phone, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('contact')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // 模拟表单提交
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // 这里可以替换为实际的API调用
      console.log('Form submitted:', formData)
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // 3秒后重置状态
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: '邮箱',
      value: 'hello@tcwenzhou.site',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      title: '微信',
      value: 'tcwenzhou',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: MapPin,
      title: '位置',
      value: '中国',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <section id="contact" className="section-padding max-w-7xl mx-auto">
      <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            <span>联系方式</span>
            <span className="text-primary">/ Contact</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            有任何合作意向、技术讨论或只是打个招呼？随时联系我。
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 左侧：联系信息 */}
          <div className="space-y-6">
            <div className="glass-effect p-6 rounded-2xl border border-border">
              <h3 className="text-xl font-semibold mb-6 text-primary">联系信息</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={info.title} className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${info.color}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{info.title}</h4>
                        <p className="text-sm text-muted-foreground">{info.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 响应时间 */}
            <div className="glass-effect p-6 rounded-2xl border border-border">
              <h4 className="font-semibold mb-3 text-primary">响应时间</h4>
              <ul className="space-y-2">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">工作日</span>
                  <span className="text-primary">24小时内</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">周末</span>
                  <span className="text-primary">48小时内</span>
                </li>
              </ul>
            </div>

            {/* 合作方向 */}
            <div className="glass-effect p-6 rounded-2xl border border-border">
              <h4 className="font-semibold mb-3 text-primary">合作方向</h4>
              <div className="space-y-2">
                {[
                  'AI/ML 项目开发',
                  'Web 全栈应用',
                  '技术方案咨询',
                  '开源项目贡献',
                ].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：联系表单 */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-2xl border border-border">
              {/* 提交状态反馈 */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 text-sm">
                  消息发送成功！我会尽快回复您。
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
                  发送失败，请稍后重试。
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* 姓名 */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium flex items-center space-x-2">
                    <User className="h-4 w-4 text-primary" />
                    <span>名字</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    placeholder="请输入您的姓名"
                  />
                </div>

                {/* 邮箱 */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>邮箱</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    placeholder="请输入您的邮箱"
                  />
                </div>
              </div>

              {/* 留言 */}
              <div className="space-y-2 mb-8">
                <label htmlFor="message" className="text-sm font-medium flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span>留言</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                  placeholder="请输入您的留言或合作意向..."
                />
              </div>

              {/* 提交按钮 */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>发送中...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>发送消息</span>
                    </>
                  )}
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-lg -z-10 group-hover:blur-xl transition-all duration-300"></div>
              </button>

              {/* 隐私声明 */}
              <p className="text-xs text-muted-foreground text-center mt-6">
                提交此表单即表示您同意我根据隐私政策处理您的个人信息。
                您的信息仅用于回复您的留言，不会用于任何其他目的。
              </p>
            </form>

            {/* 其他联系方式 */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: '发送邮件',
                  description: '邮件回复通常在24小时内',
                  action: '发送邮件',
                },
                {
                  title: '技术交流',
                  description: '讨论项目与技术方案',
                  action: '微信联系',
                },
                {
                  title: '项目合作',
                  description: '感兴趣的合作项目',
                  action: '了解详情',
                },
              ].map((item) => (
                <div key={item.title} className="glass-effect p-4 rounded-xl border border-border hover:border-primary/30 transition-colors">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <button className="text-sm text-primary hover:text-accent transition-colors">
                    {item.action} →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact