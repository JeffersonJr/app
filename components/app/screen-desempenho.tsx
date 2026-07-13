'use client'

// screen-desempenho.tsx
import { useState } from 'react'
import { ChevronLeft, Filter, TrendingUp, Users, Target, Clock, ArrowRight, CheckCircle2, Wallet, X, Calendar } from 'lucide-react'
import { funis } from '@/lib/app-data'

export function ScreenDesempenho({
  onBack
}: {
  onBack: () => void
}) {
  const [showFiltros, setShowFiltros] = useState(false)
  const [periodo, setPeriodo] = useState('Este mês')
  const [funilId, setFunilId] = useState(funis[0].id)

  const funilSelecionado = funis.find(f => f.id === funilId) || funis[0]
  
  // Fake metrics factor to make the charts look different per funnel
  const funilFactor = funilId === 'principal' ? 1 : funilId === 'alto-padrao' ? 0.35 : 1.8
  
  const metricsColorMap = [
    { bg: 'bg-blue-500', text: 'text-blue-500', bgLight: 'bg-blue-500/10' },
    { bg: 'bg-indigo-500', text: 'text-indigo-500', bgLight: 'bg-indigo-500/10' },
    { bg: 'bg-amber-500', text: 'text-amber-500', bgLight: 'bg-amber-500/10' },
    { bg: 'bg-emerald-500', text: 'text-emerald-500', bgLight: 'bg-emerald-500/10' },
    { bg: 'bg-purple-500', text: 'text-purple-500', bgLight: 'bg-purple-500/10' },
    { bg: 'bg-rose-500', text: 'text-rose-500', bgLight: 'bg-rose-500/10' },
  ]

  return (
    <div className="flex flex-col gap-6 px-5 pt-4 pb-28">
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors hover:bg-muted/80 active:scale-95"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex-1">
          <h1 className="font-serif text-2xl font-semibold text-foreground tracking-tight">
            Meu Desempenho
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">Visão geral e métricas de vendas</p>
        </div>
        <button
          type="button"
          onClick={() => setShowFiltros(true)}
          className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20 active:scale-95"
        >
          <Filter className="size-4.5" />
        </button>
      </header>

      {/* Resumo */}
      <section className="grid grid-cols-2 gap-3">
        <div className="col-span-2 flex flex-col rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 to-transparent p-5 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Target className="size-5" />
            </div>
            <div>
              <span className="text-[13px] font-medium text-muted-foreground">Progresso da Meta</span>
              <p className="text-xs font-semibold text-primary">Vendas ({periodo})</p>
            </div>
          </div>

          <div className="flex items-end justify-between mb-2">
            <p className="font-sans text-[2rem] leading-none font-bold tracking-tight text-foreground">92%</p>
            <p className="text-sm font-semibold text-foreground">R$ 9.2M <span className="text-muted-foreground font-medium text-xs">/ 10M</span></p>
          </div>
          <div className="h-3 w-full rounded-full bg-primary/20 overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: '92%' }} />
          </div>
        </div>

        <div className="flex flex-col rounded-3xl border border-border/60 bg-card p-5 shadow-soft">
          <TrendingUp className="size-5 text-amber mb-3" />
          <p className="font-sans text-2xl font-bold tracking-tight text-foreground mb-1">{Math.round(14 * funilFactor)}</p>
          <p className="text-[11px] font-medium text-muted-foreground">Vendas fechadas</p>
        </div>

        <div className="flex flex-col rounded-3xl border border-border/60 bg-card p-5 shadow-soft">
          <Wallet className="size-5 text-[#2B5250] mb-3" />
          <p className="font-sans text-2xl font-bold tracking-tight text-foreground mb-1">R$ {Math.round(142 * funilFactor)}k</p>
          <p className="text-[11px] font-medium text-muted-foreground">Comissões ganhas</p>
        </div>
      </section>

      {/* Funil de Vendas */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Users className="size-4" />
            Funil de Vendas
          </h2>
          <select 
            value={funilId}
            onChange={(e) => setFunilId(e.target.value)}
            className="bg-card text-foreground text-xs font-semibold rounded-lg px-2 py-1 outline-none border border-border shadow-sm focus:ring-1 focus:ring-primary"
          >
            {funis.map(f => (
              <option key={f.id} value={f.id}>{f.nome}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 relative">
          {/* Fundo decorativo do funil */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent rounded-3xl -z-10" />

          {funilSelecionado.etapas?.map((etapa, idx) => {
            const isLast = idx === (funilSelecionado.etapas?.length || 0) - 1
            const isFirst = idx === 0
            
            // Mock diminishing funnel numbers
            const baseCounts = [120, 85, 42, 14, 5, 2]
            const count = Math.round((baseCounts[idx] || 10) * funilFactor)
            const prevCount = idx > 0 ? Math.round((baseCounts[idx - 1] || 10) * funilFactor) : count
            const conversao = isFirst ? 100 : Math.round((count / Math.max(1, prevCount)) * 100)
            
            const color = metricsColorMap[idx % metricsColorMap.length]
            const marginX = idx * 2

            return (
              <div key={etapa.id} className="flex items-center gap-4 rounded-[1.25rem] border border-border/60 bg-card p-4 shadow-soft relative overflow-hidden z-10" style={{ margin: `0 ${marginX}px` }}>
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${color.bg}`}></div>
                <div className="flex flex-col min-w-[70px]">
                  <span className="font-sans text-2xl font-bold text-foreground">{count}</span>
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{isLast ? 'Fechou' : 'Leads'}</span>
                </div>
                {isLast ? (
                  <CheckCircle2 className={`size-4 ${color.text} shrink-0`} />
                ) : (
                  <ArrowRight className="size-4 text-muted-foreground/30 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{etapa.label}</p>
                  {isFirst ? (
                    <p className="text-[11px] text-muted-foreground mt-0.5">100% do total</p>
                  ) : (
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] text-muted-foreground">{isLast ? 'Conv. final' : 'Conversão'}</span>
                      <span className={`text-[11px] font-semibold ${color.text} ${color.bgLight} px-1.5 py-0.5 rounded`}>{conversao}%</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Outras Métricas */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Clock className="size-4" />
          Métricas de Tempo
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
            <span className="text-[11px] font-medium text-muted-foreground mb-1">Primeiro contato</span>
            <p className="font-sans text-xl font-bold text-foreground">12 min</p>
            <p className="text-[10px] font-semibold text-emerald-500 mt-1">↓ 2 min (ótimo)</p>
          </div>

          <div className="flex flex-col rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
            <span className="text-[11px] font-medium text-muted-foreground mb-1">Tempo de fechamento</span>
            <p className="font-sans text-xl font-bold text-foreground">28 dias</p>
            <p className="text-[10px] font-semibold text-red-500 mt-1">↑ 5 dias</p>
          </div>
        </div>
      </section>

      {/* Modal de Filtros */}
      {showFiltros && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-md animate-in slide-in-from-bottom-5 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
            <div className="rounded-t-3xl sm:rounded-3xl bg-card border border-border shadow-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-bold flex items-center gap-2">
                  <Filter className="size-5 text-primary" />
                  Filtros
                </h2>
                <button
                  type="button"
                  onClick={() => setShowFiltros(false)}
                  className="rounded-full bg-muted p-2 text-muted-foreground transition-brand hover:text-foreground active:scale-95"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-foreground">Período</label>
                  <div className="flex flex-wrap gap-2">
                    {['Este mês', 'Mês passado', 'Este ano', 'Personalizado'].map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPeriodo(p)}
                        className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${periodo === p ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                          }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  {periodo === 'Personalizado' && (
                    <div className="mt-3 grid grid-cols-2 gap-3 animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex items-center gap-2 rounded-xl border border-border px-3 py-2">
                        <Calendar className="size-4 text-muted-foreground" />
                        <input type="date" className="bg-transparent text-sm text-foreground focus:outline-none w-full" />
                      </div>
                      <div className="flex items-center gap-2 rounded-xl border border-border px-3 py-2">
                        <Calendar className="size-4 text-muted-foreground" />
                        <input type="date" className="bg-transparent text-sm text-foreground focus:outline-none w-full" />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-foreground">Origem do Lead</label>
                  <select className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none">
                    <option>Todas as origens</option>
                    <option>WhatsApp</option>
                    <option>Instagram</option>
                    <option>Portal Imobiliário</option>
                    <option>Indicação</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowFiltros(false)}
                className="mt-8 w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-brand active:scale-[0.98]"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
