'use client'

import { useState, useEffect } from 'react'
import {
  Bell,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Circle,
  Flame,
  Phone,
  Target,
  CalendarDays,
  Users2,
  MessageCircle,
} from 'lucide-react'
import { atividadesHoje, funil, tempConfig, tipoAtividadeConfig, isAtividadeAtrasada } from '@/lib/app-data'
import { AtividadeDetalheSheet } from '@/components/app/atividade-detalhe-sheet'

export function ScreenHoje({
  onVerFunil,
  onVerCliente,
  onVerPerfil,
  onVerAtendimento,
  onAbrirNovaAtividade,
  onVerAtividades,
}: {
  onVerFunil: () => void
  onVerCliente: (id: string) => void
  onVerPerfil?: () => void
  onVerAtendimento?: (id: string) => void
  onAbrirNovaAtividade?: () => void
  onVerAtividades?: () => void
}) {
  const [atividadeSelecionada, setAtividadeSelecionada] = useState<any>(null)
  const [toastMsg, setToastMsg] = useState('')
  const getHojeStr = () => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  const isHoje = (dataStr?: string) => {
    if (!dataStr || dataStr === 'Hoje') return true
    if (dataStr === getHojeStr()) return true
    const d = new Date()
    const ptBrHoje = d.toLocaleDateString('pt-BR')
    if (dataStr === ptBrHoje) return true
    return false
  }

  const [localAtividades, setLocalAtividades] = useState(() => atividadesHoje.filter(a => isHoje(a.data)))
  const leadsQuentes = funil
    .flatMap((estagio) => estagio.leads.map((lead) => ({ ...lead, estagio: estagio.nome })))
    .filter((lead) => lead.temperatura === 'quente')
    .slice(0, 3)

  const pendentes = localAtividades.filter((a) => !a.concluida)

  useEffect(() => {
    const handleUpdate = () => {
      setLocalAtividades(atividadesHoje.filter(a => isHoje(a.data)))
    }
    setLocalAtividades(atividadesHoje.filter(a => isHoje(a.data)))
    window.addEventListener('app-data-updated', handleUpdate)
    return () => window.removeEventListener('app-data-updated', handleUpdate)
  }, [])


  const horaAtual = new Date().getHours()
  const saudacao = horaAtual < 12 ? 'Bom dia' : horaAtual < 18 ? 'Boa tarde' : 'Boa noite'

  return (
    <div className="flex flex-col gap-6 px-5 pt-4 pb-28">
      <header className="flex flex-col gap-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Terça · 07 Jul
        </p>
        <h1 className="font-serif text-3xl font-semibold text-foreground tracking-tight truncate">
          {saudacao}, Jefferson.
        </h1>
      </header>

      {/* Indicadores do dia */}
      <section id="tour-target-goals" aria-label="Indicadores do dia" className="grid grid-cols-2 gap-3 mt-2">
        {/* Leads Quentes */}
        <button
          onClick={() => document.getElementById('secao-leads')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="flex flex-col text-left rounded-3xl border border-border/60 bg-card p-5 shadow-soft transition-transform active:scale-95 hover:border-primary/30"
        >
          <div className="flex items-center justify-between mb-2 w-full">
            <span className="text-[13px] font-medium text-muted-foreground">Leads quentes</span>
            <Flame className="size-4 text-amber" strokeWidth={2} />
          </div>
          <p className="font-sans text-[2.5rem] leading-none font-bold tracking-tight text-foreground mb-1.5">14</p>
          <p className="text-[11px] font-medium text-[#2B5250]">
            +12%
          </p>
        </button>

        {/* Atividades hoje */}
        <button
          onClick={() => document.getElementById('secao-agenda')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="flex flex-col text-left rounded-3xl border border-border/60 bg-card p-5 shadow-soft transition-transform active:scale-95 hover:border-primary/30"
        >
          <span className="mb-2 block text-[13px] font-medium text-muted-foreground">Atividades hoje</span>
          <p className="font-sans text-[2.5rem] leading-none font-bold tracking-tight text-foreground mb-1.5">{localAtividades.length}</p>
          <p className="font-mono text-[11px] font-medium tracking-wide text-[#2B5250]">
            {pendentes.length} restantes
          </p>
        </button>

        {/* Propostas */}
        <div className="col-span-2 flex flex-col rounded-3xl border border-border/60 bg-card p-5 shadow-soft transition-brand">
          <span className="mb-2 block text-[13px] font-medium text-muted-foreground">Propostas</span>
          <p className="font-sans text-[2.5rem] leading-none font-bold tracking-tight text-foreground mb-1.5">R$ 4,2M</p>
          <p className="font-mono text-[11px] font-medium tracking-wide text-[#2B5250]">
            em andamento
          </p>
        </div>
      </section>

      {/* Agenda */}
      <section id="secao-agenda" aria-label="Sua agenda" className="scroll-mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
            <CalendarDays className="size-4.5 text-primary" strokeWidth={1.5} />
            Sua agenda
          </h2>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              {pendentes.length} Pendentes
            </span>
            <button
              type="button"
              onClick={onVerAtividades}
              className="flex items-center gap-0.5 text-xs font-semibold text-primary"
            >
              Ver completa
              <ChevronRight className="size-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>
        <ul className="flex flex-col gap-2">
          {localAtividades
            .slice()
            .sort((a, b) => {
              // Pending first, then by time
              if (a.concluida !== b.concluida) return a.concluida ? 1 : -1
              return a.hora.localeCompare(b.hora)
            })
            .map((atv) => (
              <li key={atv.id}>
                <button
                  type="button"
                  onClick={() => setAtividadeSelecionada(atv)}
                  className={`w-full text-left flex items-center gap-3 rounded-[1.25rem] p-3.5 transition-brand relative overflow-hidden ${atv.concluida
                    ? 'border border-border bg-card/40 opacity-70'
                    : 'border-transparent bg-card shadow-soft hover:bg-muted/50'
                    }`}
                >
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-2xl ${atv.concluida ? 'bg-muted text-muted-foreground' : ((tipoAtividadeConfig as Record<string, any>)[atv.tipo]?.cor || 'bg-muted text-muted-foreground')}`}>
                    {atv.concluida ? (
                      <CheckCircle2 className="size-5" strokeWidth={1.5} />
                    ) : (
                      <span className="text-lg">{(tipoAtividadeConfig as Record<string, any>)[atv.tipo]?.emoji || '📋'}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-semibold ${atv.concluida ? 'text-muted-foreground line-through' : 'text-foreground'
                        }`}
                    >
                      {atv.titulo}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <span className={`size-1.5 rounded-full ${atv.concluida ? 'bg-muted-foreground' : 'bg-primary'}`} />
                      {atv.cliente}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`font-mono text-xs font-bold ${atv.concluida ? 'text-muted-foreground' : (isAtividadeAtrasada(atv.data || 'Hoje', atv.hora) ? 'text-red-500' : 'text-primary')}`}>
                      {atv.hora}
                    </span>
                    {!atv.concluida && (
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${isAtividadeAtrasada(atv.data || 'Hoje', atv.hora) ? 'text-red-500 bg-red-500/10 border border-red-500/20' : 'text-teal-mid bg-teal-mid/10'}`}>
                        {isAtividadeAtrasada(atv.data || 'Hoje', atv.hora) ? 'ATRASADA' : 'HOJE'}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            ))}
        </ul>
      </section>

      {/* Leads quentes */}
      <section id="secao-leads" aria-label="Leads quentes" className="scroll-mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
            <Flame className="size-4.5 text-amber" strokeWidth={1.5} />
            Leads quentes
          </h2>
          <button
            type="button"
            onClick={onVerFunil}
            className="flex items-center gap-0.5 text-xs font-semibold text-primary"
          >
            Ver funil
            <ChevronRight className="size-3.5" strokeWidth={2} />
          </button>
        </div>
        <ul className="flex flex-col gap-2">
          {leadsQuentes.map((lead) => (
            <li key={lead.id}>
              <div className="group relative flex w-full flex-col gap-3 rounded-[1.25rem] bg-card p-4 shadow-soft transition-brand">
                <button
                  type="button"
                  onClick={() => onVerCliente(lead.id)}
                  className="flex items-start gap-3 text-left w-full"
                >
                  <div className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-serif text-sm font-semibold text-primary">
                    {lead.iniciais}
                    <span className={`absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-card ${tempConfig[lead.temperatura].dot}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-foreground">
                        {lead.nome}
                      </span>
                      <span className="shrink-0 text-xs font-mono font-semibold text-primary">
                        {lead.valor}
                      </span>
                    </div>
                    <span className="block truncate text-xs text-muted-foreground mt-0.5">
                      {lead.interesse}
                    </span>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${tempConfig[lead.temperatura].chip}`}>
                        {tempConfig[lead.temperatura].label}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Etapa: <span className="font-semibold text-foreground">{lead.estagio}</span>
                      </span>
                    </div>
                  </div>
                </button>
                <div className="flex items-center gap-2 border-t border-border pt-3 mt-1">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onVerCliente(lead.id); }}
                    className="flex-1 rounded-full bg-muted/50 px-3 py-2 text-xs font-semibold text-muted-foreground transition-brand active:scale-95"
                  >
                    Ver detalhes
                  </button>
                  <button
                    type="button"
                    className="flex size-9 items-center justify-center rounded-full bg-green-100 text-green-700 transition-brand active:scale-95"
                    aria-label={`WhatsApp ${lead.nome}`}
                  >
                    <MessageCircle className="size-4" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-brand active:scale-95"
                    aria-label={`Ligar ${lead.nome}`}
                  >
                    <Phone className="size-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Atalhos de contato */}
      <section aria-label="Resumo da carteira" className="rounded-2xl bg-cream p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Users2 className="size-5" strokeWidth={1.5} />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">6 clientes ativos na carteira</p>
            <p className="text-xs text-muted-foreground">2 aguardam retorno hoje</p>
          </div>
          <Phone className="size-5 text-primary" strokeWidth={1.5} />
        </div>
      </section>

      <AtividadeDetalheSheet
        atividade={atividadeSelecionada}
        onClose={() => setAtividadeSelecionada(null)}
        onConcluir={(id, statusConcluida, feedback, agendar) => {
          // Update local state to trigger re-render with strikethrough or remove strikethrough
          setLocalAtividades((prev) =>
            prev.map((a) => (a.id === id ? { ...a, concluida: statusConcluida } : a))
          )
          // Also update the global mock so other screens see it
          const atvGlob = atividadesHoje.find((a) => a.id === id)
          if (atvGlob) atvGlob.concluida = statusConcluida
          setAtividadeSelecionada(null)

          if (agendar && onAbrirNovaAtividade) {
            onAbrirNovaAtividade()
          }
        }}
        onVerNegocio={(cliente) => {
          setAtividadeSelecionada(null)
          // Na vida real, buscaria o ID do atendimento correspondente. 
          // Aqui enviamos o ID do lead principal para demonstração.
          onVerAtendimento?.('l1')
        }}
        onGerarTermo={(atividadeId) => {
          const atv = localAtividades.find(a => a.id === atividadeId)
          const clienteNome = atv ? atv.cliente : 'Cliente'
          setToastMsg(`Termo para ${clienteNome} gerado com sucesso!`)
          if (navigator.clipboard) {
            navigator.clipboard.writeText(`https://evolves.com.br/assinatura-termo/doc_39482`)
          }
          setTimeout(() => setToastMsg(''), 3000)
        }}
      />

      {toastMsg && (
        <div className="fixed top-[calc(1.5rem+env(safe-area-inset-top))] left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-full bg-teal-mid text-white text-xs font-semibold shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-top-5 flex items-center gap-1.5">
          <CheckCircle2 className="size-4" />
          {toastMsg}
        </div>
      )}
    </div>
  )
}
