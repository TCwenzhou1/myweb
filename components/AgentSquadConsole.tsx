'use client'

import { useMemo, useState } from 'react'
import { AlertTriangle, CheckCircle2, Loader2, Play, ShieldCheck, UsersRound } from 'lucide-react'
import {
  agentSquadRoles,
  defaultAgentSquadBrief,
  type AgentSquadAssignment,
  type AgentSquadPlan,
  type AgentSquadRole,
} from '@/lib/agentSquad'

interface AgentSquadConsoleProps {
  initialBrief?: string
}

export default function AgentSquadConsole({ initialBrief = defaultAgentSquadBrief }: AgentSquadConsoleProps) {
  const [selectedRoleId, setSelectedRoleId] = useState(agentSquadRoles[0]?.id ?? '')
  const [brief, setBrief] = useState(initialBrief)
  const [plan, setPlan] = useState<AgentSquadPlan | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [model, setModel] = useState<string | null>(null)

  const selectedRole = useMemo(
    () => agentSquadRoles.find((role) => role.id === selectedRoleId) ?? agentSquadRoles[0],
    [selectedRoleId],
  )

  const selectedAssignment = useMemo(() => {
    if (!plan || !selectedRole) return null
    return plan.assignments.find((assignment) => assignment.roleId === selectedRole.id) ?? null
  }, [plan, selectedRole])

  async function runSquad() {
    const normalizedBrief = brief.trim()
    if (normalizedBrief.length < 12) {
      setError('先写一个具体需求，至少说明要做什么、给谁用、希望怎么验收。')
      return
    }

    setIsRunning(true)
    setError(null)

    try {
      const response = await fetch('/api/agent-squad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ brief: normalizedBrief }),
      })

      const payload = (await response.json()) as { plan?: AgentSquadPlan; model?: string; error?: string }

      if (!response.ok || !payload.plan) {
        throw new Error(payload.error ?? 'AI 小队编排失败')
      }

      setPlan(payload.plan)
      setModel(payload.model ?? null)
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : 'AI 小队编排失败'
      setError(message)
    } finally {
      setIsRunning(false)
    }
  }

  if (!selectedRole) {
    return null
  }

  return (
    <section className="mt-6 overflow-hidden rounded-[18px] border border-[#dfceb3] bg-[#171819] text-[#f8f3ea] shadow-[0_24px_80px_rgba(20,18,20,0.18)]">
      <div className="grid gap-0 xl:grid-cols-[360px_minmax(0,1fr)]">
        <div className="border-b border-white/10 bg-white/[0.035] p-5 sm:p-6 xl:border-b-0 xl:border-r">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#c79e5b]/45 bg-[#c79e5b]/12 text-[#c79e5b]">
              <UsersRound className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#c79e5b]">AI Squad Console</p>
              <h2 className="mt-2 text-3xl leading-tight text-[#fff8ee] sm:text-4xl" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                9 人工程小队
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#d8cbbb]">
                输入一个真实需求，让服务端大模型把它拆成角色分工、交接链路、风险和验收项。
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2">
            {agentSquadRoles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRoleId(role.id)}
                className={`min-h-12 rounded-[10px] border px-3 py-2 text-left text-sm transition ${
                  role.id === selectedRole.id
                    ? 'border-[#c79e5b] bg-[#c79e5b]/16 text-[#fff8ee]'
                    : 'border-white/10 bg-white/[0.035] text-[#d8cbbb] hover:border-[#c79e5b]/60 hover:bg-white/[0.06]'
                }`}
              >
                <span className="block text-[10px] uppercase tracking-[0.18em] text-[#c79e5b]">{role.title}</span>
                <span className="mt-1 block font-medium">{role.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
          <RolePanel role={selectedRole} assignment={selectedAssignment} />

          <div className="border-t border-white/10 p-5 sm:p-6 lg:border-l lg:border-t-0">
            <label htmlFor="agent-squad-brief" className="text-[11px] uppercase tracking-[0.28em] text-[#c79e5b]">
              Product Brief
            </label>
            <textarea
              id="agent-squad-brief"
              value={brief}
              onChange={(event) => setBrief(event.target.value)}
              className="mt-3 min-h-36 w-full resize-y rounded-[12px] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-[#f8f3ea] outline-none transition placeholder:text-[#91877a] focus:border-[#c79e5b]/70"
              placeholder="写一个产品或工程需求，让 AI 小队拆解..."
            />

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={runSquad}
                disabled={isRunning}
                className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-[#c79e5b] px-4 py-2 text-sm font-medium text-[#171819] transition hover:bg-[#dfb86f] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                {isRunning ? '模型编排中' : '运行 AI 小队'}
              </button>
              <span className="inline-flex items-center gap-2 text-xs text-[#d8cbbb]">
                <ShieldCheck className="h-4 w-4 text-[#6f8e7b]" />
                服务端调用，不暴露 API Key
              </span>
            </div>

            {error && (
              <div className="mt-4 flex gap-3 rounded-[12px] border border-[#c96d54]/40 bg-[#c96d54]/12 p-4 text-sm leading-6 text-[#ffd8ce]">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {plan ? (
              <PlanResult plan={plan} model={model} />
            ) : (
              <div className="mt-5 rounded-[12px] border border-white/10 bg-white/[0.035] p-4 text-sm leading-7 text-[#d8cbbb]">
                第一版不使用假演示数据。这里必须真实请求大模型，成功后才会生成流程、角色动作和验收清单。
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function RolePanel({ role, assignment }: { role: AgentSquadRole; assignment: AgentSquadAssignment | null }) {
  return (
    <div className="p-5 sm:p-6">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[#c79e5b]">Selected Role</p>
      <h3 className="mt-3 text-3xl leading-tight text-[#fff8ee]" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
        {role.name}
      </h3>
      <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[#91877a]">{role.title}</p>
      <p className="mt-4 text-sm leading-7 text-[#d8cbbb]">{role.mission}</p>

      <div className="mt-5 grid gap-3">
        <MiniList title="输入" items={role.inputs} />
        <MiniList title="输出" items={role.outputs} />
        <MiniList title="管理 / 协作" items={role.manages.length ? role.manages : ['不直接管理角色，按交付物参与协作']} />
        <MiniList title="验收方" items={role.reviewedBy} />
      </div>

      <div className="mt-4 rounded-[12px] border border-[#c96d54]/30 bg-[#c96d54]/10 p-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#e6a18d]">Failure Mode</p>
        <p className="mt-2 text-sm leading-7 text-[#f0c9bd]">{role.risk}</p>
      </div>

      {assignment && (
        <div className="mt-4 rounded-[12px] border border-[#6f8e7b]/45 bg-[#6f8e7b]/12 p-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#9fbea9]">Model Assignment</p>
          <p className="mt-2 text-sm leading-7 text-[#e1ecdf]">{assignment.action}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#9fbea9]">交付物</p>
          <p className="mt-1 text-sm leading-7 text-[#e1ecdf]">{assignment.deliverable}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#9fbea9]">验收</p>
          <p className="mt-1 text-sm leading-7 text-[#e1ecdf]">{assignment.acceptance}</p>
        </div>
      )}
    </div>
  )
}

function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[12px] border border-white/10 bg-white/[0.035] p-4">
      <p className="text-[11px] uppercase tracking-[0.22em] text-[#c79e5b]">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-white/10 bg-black/15 px-3 py-1 text-xs leading-5 text-[#d8cbbb]">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function PlanResult({ plan, model }: { plan: AgentSquadPlan; model: string | null }) {
  return (
    <div className="mt-5 space-y-4">
      <div className="rounded-[12px] border border-[#6f8e7b]/45 bg-[#6f8e7b]/12 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#9fbea9]">
            <CheckCircle2 className="h-4 w-4" />
            Model Plan Ready
          </p>
          {model && <span className="text-xs text-[#9fbea9]">{model}</span>}
        </div>
        <p className="mt-3 text-sm leading-7 text-[#e1ecdf]">{plan.summary}</p>
      </div>

      <ResultBlock title="协作流程" items={plan.workflow} ordered />
      <ResultBlock title="交接风险" items={plan.handoffRisks} />
      <ResultBlock title="验收清单" items={plan.acceptanceTests} />
    </div>
  )
}

function ResultBlock({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  const ListTag = ordered ? 'ol' : 'ul'

  return (
    <div className="rounded-[12px] border border-white/10 bg-white/[0.035] p-4">
      <p className="text-[11px] uppercase tracking-[0.22em] text-[#c79e5b]">{title}</p>
      <ListTag className={`mt-3 space-y-2 text-sm leading-7 text-[#d8cbbb] ${ordered ? 'list-decimal pl-5' : 'list-disc pl-5'}`}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    </div>
  )
}
