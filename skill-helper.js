/**
 * 项目技能自动调用助手
 * 根据项目类型和任务自动推荐和使用技能
 */

class SkillHelper {
  constructor() {
    this.skills = {
      // 基础技能
      'agent-browser': {
        name: 'Agent Browser',
        description: '浏览器自动化，用于网页交互、截图、数据提取',
        triggers: ['网页', '浏览器', '自动化', '截图', '爬虫', '测试'],
        priority: 1
      },
      'find-skills': {
        name: 'Find Skills',
        description: '技能发现和安装，扩展能力',
        triggers: ['搜索技能', '安装技能', '扩展能力', '新功能'],
        priority: 2
      },
      'github': {
        name: 'Github',
        description: 'GitHub 操作（issues、PRs、CI/CD）',
        triggers: ['git', '版本控制', '代码管理', '部署', 'CI/CD'],
        priority: 1
      },
      'gog': {
        name: 'Gog',
        description: 'Google Workspace 集成（Gmail、Calendar、Drive）',
        triggers: ['google', '邮件', '日历', '文档', '表格'],
        priority: 2
      },
      'imessage': {
        name: 'iMessage',
        description: 'iOS 消息处理',
        triggers: ['消息', '通知', '苹果', 'iOS'],
        priority: 3
      },
      'mcp-manager': {
        name: 'MCP管理器',
        description: 'MCP 服务器管理',
        triggers: ['mcp', '服务器', '配置', '管理'],
        priority: 2
      },
      'ontology': {
        name: 'Ontology',
        description: '知识图谱和结构化记忆',
        triggers: ['知识', '记忆', '结构化', '关系', '实体'],
        priority: 1
      },
      'proactive-agent': {
        name: 'Proactive Agent',
        description: '主动规划和改进',
        triggers: ['规划', '主动', '优化', '改进', '策略'],
        priority: 1
      },
      'self-improving': {
        name: 'Self-Improving',
        description: '自我反思和学习',
        triggers: ['学习', '反思', '改进', '错误', '经验'],
        priority: 1
      },
      'skill-vetter': {
        name: 'Skill Vetter',
        description: '技能安全检查',
        triggers: ['安全', '检查', '安装技能', '风险'],
        priority: 1
      },
      'summarize': {
        name: 'Summarize',
        description: '内容摘要',
        triggers: ['摘要', '总结', '报告', '文档'],
        priority: 2
      },
      'agent-mail': {
        name: '智能体邮箱',
        description: '邮件处理',
        triggers: ['邮件', '邮箱', '发送邮件', '收件'],
        priority: 2
      },
      'im-channel': {
        name: '自动安装IM渠道',
        description: 'IM 渠道自动化设置',
        triggers: ['飞书', 'QQ', '微信', '渠道', '部署'],
        priority: 2
      },

      // 项目特定技能
      'browser-automation': {
        name: 'Browser Automation',
        description: '网页自动化测试',
        triggers: ['测试', '自动化', '网页测试', '验证'],
        priority: 1
      },
      'playwright-cli': {
        name: 'playwright-cli',
        description: 'Playwright 浏览器自动化',
        triggers: ['playwright', '测试', '自动化', '浏览器'],
        priority: 1
      },
      'modern-web-app': {
        name: 'modern-web-app',
        description: '现代 Web 应用开发',
        triggers: ['web', '前端', 'react', 'nextjs', '应用'],
        priority: 1
      },
      'ui-ux-pro-max': {
        name: 'ui-ux-pro-max',
        description: 'UI/UX 设计智能',
        triggers: ['设计', 'ui', 'ux', '界面', '用户体验'],
        priority: 1
      },
      'lucide-icons': {
        name: 'lucide-icons',
        description: '图标搜索和生成',
        triggers: ['图标', 'icon', 'svg', '图形'],
        priority: 2
      },
      'pptx': {
        name: 'pptx',
        description: 'PowerPoint 文档处理',
        triggers: ['ppt', '幻灯片', '演示', 'presentation'],
        priority: 1
      },
      'pdf': {
        name: 'pdf',
        description: 'PDF 文档处理',
        triggers: ['pdf', '文档', '转换', '提取'],
        priority: 1
      },
      'docx': {
        name: 'docx',
        description: 'Word 文档处理',
        triggers: ['word', '文档', 'doc', '报告'],
        priority: 1
      },
      'xlsx': {
        name: 'xlsx',
        description: 'Excel 数据处理',
        triggers: ['excel', '表格', '数据', 'xls', 'csv'],
        priority: 1
      }
    };

    this.projectTypes = {
      'web-development': {
        name: 'Web 开发项目',
        recommendedSkills: ['modern-web-app', 'browser-automation', 'agent-browser', 'ui-ux-pro-max', 'lucide-icons', 'github'],
        description: '网站或Web应用开发'
      },
      'data-analysis': {
        name: '数据分析项目',
        recommendedSkills: ['xlsx', 'pdf', 'docx', 'summarize', 'gog'],
        description: '数据收集、处理和分析'
      },
      'documentation': {
        name: '文档项目',
        recommendedSkills: ['pptx', 'pdf', 'docx', 'summarize', 'gog'],
        description: '文档编写和报告生成'
      },
      'automation': {
        name: '自动化项目',
        recommendedSkills: ['agent-browser', 'playwright-cli', 'browser-automation', 'im-channel'],
        description: '自动化流程和工具开发'
      },
      'mobile-app': {
        name: '移动应用项目',
        recommendedSkills: ['ui-ux-pro-max', 'agent-browser', 'browser-automation'],
        description: '移动应用开发'
      },
      'ai-ml': {
        name: 'AI/ML 项目',
        recommendedSkills: ['ontology', 'self-improving', 'proactive-agent'],
        description: '人工智能和机器学习项目'
      }
    };
  }

  /**
   * 根据项目描述推荐技能
   * @param {string} projectDescription 项目描述
   * @returns {Array} 推荐技能列表
   */
  recommendSkills(projectDescription) {
    const description = projectDescription.toLowerCase();
    const recommended = new Set();
    
    // 1. 先根据项目类型推荐
    for (const [type, config] of Object.entries(this.projectTypes)) {
      if (description.includes(type.replace('-', ' ')) || 
          config.keywords?.some(keyword => description.includes(keyword))) {
        config.recommendedSkills.forEach(skill => recommended.add(skill));
      }
    }

    // 2. 根据触发词推荐
    for (const [skillId, skill] of Object.entries(this.skills)) {
      if (skill.triggers.some(trigger => description.includes(trigger.toLowerCase()))) {
        recommended.add(skillId);
      }
    }

    // 3. 总是推荐基础技能
    recommended.add('ontology'); // 知识管理
    recommended.add('proactive-agent'); // 主动规划
    recommended.add('self-improving'); // 自我改进

    // 按优先级排序
    return Array.from(recommended)
      .map(skillId => ({ id: skillId, ...this.skills[skillId] }))
      .sort((a, b) => a.priority - b.priority);
  }

  /**
   * 生成技能使用计划
   * @param {string} projectDescription 项目描述
   * @returns {Object} 技能使用计划
   */
  generateSkillPlan(projectDescription) {
    const skills = this.recommendSkills(projectDescription);
    
    const plan = {
      project: projectDescription,
      recommendedSkills: skills,
      phases: {
        planning: this.getSkillsForPhase('planning', skills),
        development: this.getSkillsForPhase('development', skills),
        testing: this.getSkillsForPhase('testing', skills),
        deployment: this.getSkillsForPhase('deployment', skills),
        maintenance: this.getSkillsForPhase('maintenance', skills)
      },
      priorityOrder: this.getPriorityOrder(skills)
    };

    return plan;
  }

  /**
   * 获取各阶段技能
   */
  getSkillsForPhase(phase, allSkills) {
    const phaseMap = {
      planning: ['ontology', 'proactive-agent', 'find-skills', 'skill-vetter'],
      development: ['modern-web-app', 'ui-ux-pro-max', 'lucide-icons', 'browser-automation'],
      testing: ['agent-browser', 'playwright-cli', 'browser-automation'],
      deployment: ['github', 'im-channel', 'gog'],
      maintenance: ['self-improving', 'ontology', 'proactive-agent']
    };

    return allSkills.filter(skill => 
      phaseMap[phase]?.includes(skill.id)
    );
  }

  /**
   * 获取优先级顺序
   */
  getPriorityOrder(skills) {
    return skills
      .filter(skill => skill.priority === 1)
      .map(skill => skill.id);
  }

  /**
   * 生成技能调用命令
   * @param {string} skillId 技能ID
   * @returns {string} 调用命令
   */
  getSkillCommand(skillId) {
    const skill = this.skills[skillId];
    if (!skill) return null;

    return `use_skill("${skillId}")`;
  }

  /**
   * 生成技能使用报告
   * @param {Object} plan 技能计划
   * @returns {string} 报告文本
   */
  generateReport(plan) {
    let report = `# 项目技能使用计划\n\n`;
    report += `**项目**: ${plan.project}\n\n`;
    
    report += `## 推荐技能 (${plan.recommendedSkills.length}个)\n`;
    plan.recommendedSkills.forEach((skill, index) => {
      report += `${index + 1}. **${skill.name}** - ${skill.description}\n`;
    });

    report += `\n## 分阶段技能使用\n`;
    for (const [phase, skills] of Object.entries(plan.phases)) {
      if (skills.length > 0) {
        report += `\n### ${phase.toUpperCase()} 阶段\n`;
        skills.forEach(skill => {
          report += `- ${skill.name}: ${this.getSkillCommand(skill.id)}\n`;
        });
      }
    }

    report += `\n## 优先级顺序\n`;
    plan.priorityOrder.forEach((skillId, index) => {
      const skill = this.skills[skillId];
      report += `${index + 1}. ${skill.name} (立即调用)\n`;
    });

    report += `\n## 使用说明\n`;
    report += `1. 项目开始时立即调用: ${plan.priorityOrder.map(id => this.skills[id].name).join(', ')}\n`;
    report += `2. 根据项目阶段按需调用其他技能\n`;
    report += `3. 项目结束后调用 Self-Improving 进行总结\n`;

    return report;
  }
}

// 使用示例
const helper = new SkillHelper();

// 示例1: Web开发项目
const webProject = "开发一个React电商网站，需要UI设计、自动化测试和部署";
console.log("=== Web开发项目技能推荐 ===");
const webPlan = helper.generateSkillPlan(webProject);
console.log(helper.generateReport(webPlan));

// 示例2: 数据分析项目
const dataProject = "处理Excel数据，生成PDF报告，进行数据摘要";
console.log("\n=== 数据分析项目技能推荐 ===");
const dataPlan = helper.generateSkillPlan(dataProject);
console.log(helper.generateReport(dataPlan));

// 示例3: 自动化项目
const autoProject = "自动化网页操作，飞书渠道部署，自动化测试";
console.log("\n=== 自动化项目技能推荐 ===");
const autoPlan = helper.generateSkillPlan(autoProject);
console.log(helper.generateReport(autoPlan));

module.exports = SkillHelper;