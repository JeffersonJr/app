'use client'

import { useState } from 'react'
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
import { atividadesHoje, funil, tempConfig, tipoAtividadeConfig } from '@/lib/app-data'
import { AtividadeDetalheSheet } from '@/components/app/atividade-detalhe-sheet'

export function ScreenHoje({
  onVerFunil,
  onVerCliente,
  onVerPerfil,
  onVerAtendimento,
}: {
  onVerFunil: () => void
  onVerCliente: (id: string) => void
  onVerPerfil?: () => void
  onVerAtendimento?: (id: string) => void
}) {
  const [atividadeSelecionada, setAtividadeSelecionada] = useState<any>(null)
  const leadsQuentes = funil
    .flatMap((estagio) => estagio.leads.map((lead) => ({ ...lead, estagio: estagio.nome })))
    .filter((lead) => lead.temperatura === 'quente')
    .slice(0, 3)

  const pendentes = atividadesHoje.filter((a) => !a.concluida)

  return (
    <div className="flex flex-col gap-6 px-5 pt-4 pb-28">
      <header className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Terça · 07 Jul
          </p>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-foreground tracking-tight">
            Bom dia, Jefferson.
          </h1>
        </div>
        <button
          onClick={onVerPerfil}
          type="button"
          aria-label="Meu Perfil"
          className="flex items-center gap-3 rounded-[20px] bg-card p-1.5 pr-4 shadow-sm border border-border transition-transform active:scale-95 hover:border-primary/20 hover:shadow-md"
        >
          <div className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-[#2B5250] text-sm font-semibold text-white shadow-inner">
            JC
          </div>
          <span className="text-sm font-medium text-foreground whitespace-nowrap">Meu Perfil</span>
        </button>
      </header>

      {/* Indicadores do dia */}
      <section aria-label="Indicadores do dia" className="grid grid-cols-2 gap-3 mt-2">
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

        {/* Visitas hoje */}
        <button
          onClick={() => document.getElementById('secao-agenda')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="flex flex-col text-left rounded-3xl border border-border/60 bg-card p-5 shadow-soft transition-transform active:scale-95 hover:border-primary/30"
        >
          <span className="mb-2 block text-[13px] font-medium text-muted-foreground">Visitas hoje</span>
          <p className="font-sans text-[2.5rem] leading-none font-bold tracking-tight text-foreground mb-1.5">3</p>
          <p className="font-mono text-[11px] font-medium tracking-wide text-[#2B5250]">
            2 restantes
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

      {/* Agenda do dia */}
      <section id="secao-agenda" aria-label="Agenda de hoje" className="scroll-mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
            <Calendar className="size-4.5 text-primary" strokeWidth={1.5} />
            Sua agenda
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {pendentes.length} pendentes
          </span>
        </div>
        <ul className="flex flex-col gap-2">
          {atividadesHoje
            .slice()
            .sort((a, b) => a.hora.localeCompare(b.hora))
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
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-2xl ${atv.concluida ? 'bg-muted text-muted-foreground' : ((tipoAtividadeConfig as Record<string, any>)[atv.tipo]?.cor || 'bg-slate/15 text-slate')}`}>
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
                    <span className={`font-mono text-xs font-bold ${atv.concluida ? 'text-muted-foreground' : 'text-primary'}`}>
                      {atv.hora}
                    </span>
                    {!atv.concluida && (
                      <span className="text-[9px] font-semibold text-teal-mid bg-teal-mid/10 px-1.5 py-0.5 rounded-md">HOJE</span>
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
        onConcluir={(id, feedback, agendar) => {
          // Update the global mock array directly to affect other screens without redux
          const atvGlob = atividadesHoje.find((a) => a.id === id)
          if (atvGlob) atvGlob.concluida = true
          
          // Note: ScreenHoje reads atividadesHoje on mount/render. 
          // By updating atvGlob and closing the sheet, it will trigger a re-render
          // (if we had a local state we would update it, but here we can just close the modal)
          setAtividadeSelecionada(null)
        }}
        onVerNegocio={(cliente) => {
          setAtividadeSelecionada(null)
          // Na vida real, buscaria o ID do atendimento correspondente. 
          // Aqui enviamos o ID do lead principal para demonstração.
          onVerAtendimento?.('l1') 
        }}
      />
    </div>
  )
}
