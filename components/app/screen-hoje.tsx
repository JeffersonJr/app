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
  ChevronDown,
  Sparkles,
  Mic,
  Bot,
  X,
  Trophy,
  Zap,
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
  tenantAtivo,
  setTenantAtivo,
  tenants,
}: {
  onVerFunil: () => void
  onVerCliente: (id: string) => void
  onVerPerfil?: () => void
  onVerAtendimento?: (id: string) => void
  onAbrirNovaAtividade?: () => void
  onVerAtividades?: () => void
  tenantAtivo: any
  setTenantAtivo: (t: any) => void
  tenants: any[]
}) {
  const [atividadeSelecionada, setAtividadeSelecionada] = useState<any>(null)
  const [toastMsg, setToastMsg] = useState('')
  
  // Tenant Switching states
  const [mostrarTenantSelector, setMostrarTenantSelector] = useState(false)
  const [alternandoTenant, setAlternandoTenant] = useState(false)

  // Modo Roleta states
  const [modoRoleta, setModoRoleta] = useState(false)
  const [indiceRoleta, setIndiceRoleta] = useState(0)
  const [mensagemGamificada, setMensagemGamificada] = useState('')
  const [roletaFinalizada, setRoletaFinalizada] = useState(false)
  const [roletaAtividades, setRoletaAtividades] = useState<any[]>([])
  const [feedbackAudioRoleta, setFeedbackAudioRoleta] = useState('')
  const [gravandoAudioRoleta, setGravandoAudioRoleta] = useState(false)
  const [timerAudioRoleta, setTimerAudioRoleta] = useState(0)
  const [roletaEfeitoFrup, setRoletaEfeitoFrup] = useState(false)

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

  // Start Roleta Mode
  function iniciarModoRoleta() {
    const list = localAtividades.filter(a => !a.concluida)
    if (list.length === 0) return
    setRoletaAtividades(list)
    setIndiceRoleta(0)
    setRoletaFinalizada(false)
    setFeedbackAudioRoleta('')
    
    // Set funny message based on task count
    if (list.length > 20) {
      setMensagemGamificada('Você é o herói da imobiliária hoje!')
    } else if (list.length > 10) {
      setMensagemGamificada('Prepare-se, guerreiro!')
    } else {
      setMensagemGamificada('Hora de limpar a mesa!')
    }
    
    setModoRoleta(true)
  }

  // Toggle voice recorder inside Roleta card
  function toggleAudioRoleta() {
    if (gravandoAudioRoleta) {
      setGravandoAudioRoleta(false)
      if ((window as any).roletaAudioInterval) clearInterval((window as any).roletaAudioInterval)
      setFeedbackAudioRoleta("Tarefa executada com sucesso. Cliente confirmou interesse.")
    } else {
      setGravandoAudioRoleta(true)
      setTimerAudioRoleta(0)
      const timer = setInterval(() => {
        setTimerAudioRoleta(t => t + 1)
      }, 1000)
      ;(window as any).roletaAudioInterval = timer
    }
  }

  // Finish current task in Roleta stack (effects "Frup" transition)
  function concluirTarefaRoleta() {
    if (roletaAtividades.length === 0) return
    const currentTask = roletaAtividades[indiceRoleta]
    
    // Mark as completed in the global activities list
    const globalIdx = atividadesHoje.findIndex(a => a.id === currentTask.id)
    if (globalIdx !== -1) {
      atividadesHoje[globalIdx].concluida = true
      atividadesHoje[globalIdx].descricao = (atividadesHoje[globalIdx].descricao || '') + 
        (feedbackAudioRoleta ? `\n[Feedback de voz: ${feedbackAudioRoleta}]` : '')
    }

    // Trigger update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('app-data-updated'))
    }

    // Apply "Frup" slide transition
    setRoletaEfeitoFrup(true)
    setTimeout(() => {
      setRoletaEfeitoFrup(false)
      setFeedbackAudioRoleta('')
      
      const nextIndex = indiceRoleta + 1
      if (nextIndex >= roletaAtividades.length) {
        // Completed all tasks!
        setRoletaFinalizada(true)
      } else {
        setIndiceRoleta(nextIndex)
      }
    }, 450)
  }


  const horaAtual = new Date().getHours()
  const saudacao = horaAtual < 12 ? 'Bom dia' : horaAtual < 18 ? 'Boa tarde' : 'Boa noite'

  return (
    <div className="flex flex-col gap-6 px-5 pt-4 pb-28">
      {/* Nubank-style Tenant Switcher Trigger */}
      <div className="flex items-center justify-between bg-card border border-border/80 shadow-soft p-3 rounded-2xl animate-in fade-in duration-300">
        <button
          type="button"
          onClick={() => setMostrarTenantSelector(true)}
          className="flex items-center gap-2 hover:opacity-85 transition-all text-left"
        >
          <span className="text-2xl">{tenantAtivo.logo}</span>
          <div>
            <span className="text-[9px] font-bold text-primary uppercase tracking-wider block">Conectado a</span>
            <h1 className="text-xs font-bold text-foreground flex items-center gap-1">
              {tenantAtivo.nome}
              <ChevronDown className="size-3.5 text-primary shrink-0" />
            </h1>
          </div>
        </button>
        <button
          type="button"
          onClick={() => setMostrarTenantSelector(true)}
          className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1.5 rounded-xl hover:bg-primary/20 transition-all"
        >
          Alterar
        </button>
      </div>

      <header className="flex flex-col gap-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Terça · 07 Jul
        </p>
        <h1 className="font-serif text-3xl font-semibold text-foreground tracking-tight truncate">
          {saudacao}, Jefferson.
        </h1>
      </header>

      {/* Gamification: Modo Roleta Activation trigger banner */}
      {pendentes.length > 3 && (
        <div className="bg-gradient-to-br from-teal-deep to-[#0c2e2c] text-white rounded-3xl p-5 shadow-[0_15px_30px_rgba(15,61,59,0.25)] border border-teal-light/20 relative overflow-hidden animate-in zoom-in-95 duration-300">
          {/* Radial light glow behind logo */}
          <div className="absolute top-0 right-0 size-32 bg-amber/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute inset-0 bg-white/[0.02] opacity-40 bg-[radial-gradient(circle_at_25%_10%,rgba(255,255,255,0.15),transparent)]" />
          
          <div className="flex items-start justify-between relative z-10">
            <div className="flex flex-col gap-1.5 max-w-[80%]">
              <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-amber/15 text-amber border border-amber/20">
                <Zap className="size-3.5 fill-amber animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-wider">Modo Hércules Ativo</span>
              </div>
              <h3 className="font-serif text-lg font-black text-white leading-snug mt-1">
                Você tem {pendentes.length} pendências acumuladas!
              </h3>
              <p className="text-xs text-teal-light/80 leading-relaxed font-light mt-0.5">
                Não deixe acumular. Entre no fluxo contínuo e liquide sua fila de atividades de forma ultra rápida com Albert IA.
              </p>
            </div>
            
            {/* Visual game-like indicator badge */}
            <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-3 shrink-0">
              <span className="text-2xl animate-bounce">🔥</span>
              <span className="font-mono text-xs font-bold text-amber mt-1">+{pendentes.length}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={iniciarModoRoleta}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl bg-gradient-to-r from-amber to-amber-deep text-ink text-xs font-black shadow-lg shadow-amber/20 hover:shadow-xl transition-all active:scale-[0.98] mt-4 relative z-10"
          >
            <Flame className="size-4 animate-pulse fill-ink" />
            Entrar no Modo Roleta
          </button>
        </div>
      )}

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
                    {atv.descricao && (
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                        {atv.descricao}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
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

      {/* Tenant Switcher Modal */}
      {mostrarTenantSelector && (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end">
          <button
            type="button"
            onClick={() => setMostrarTenantSelector(false)}
            className="absolute inset-0 bg-teal-shadow/55 backdrop-blur-[2px]"
          />
          <div className="relative rounded-t-3xl bg-card p-6 shadow-2xl animate-in slide-in-from-bottom duration-250 max-h-[80vh] overflow-y-auto z-10">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Alternar Imobiliária Parceira</h3>
            <ul className="flex flex-col gap-2">
              {tenants.map(t => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarTenantSelector(false)
                      setAlternandoTenant(true)
                      setTimeout(() => {
                        setTenantAtivo(t)
                        setAlternandoTenant(false)
                        setToastMsg(`Conectado à imobiliária ${t.nome}`)
                        setTimeout(() => setToastMsg(''), 3000)
                      }, 1200)
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all active:scale-[0.98] ${
                      tenantAtivo.id === t.id ? 'border-primary bg-primary/5' : 'border-border bg-card'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{t.logo}</span>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-foreground">{t.nome}</p>
                        <p className="text-xs text-muted-foreground font-mono">{t.creci}</p>
                      </div>
                    </div>
                    {tenantAtivo.id === t.id && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">Ativa</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tenant Switching Loader Overlay */}
      {alternandoTenant && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="flex flex-col items-center gap-3">
            <span className="text-4xl animate-bounce">{tenantAtivo.logo}</span>
            <span className="text-sm font-semibold text-foreground">Alternando para {tenantAtivo.nome}...</span>
          </div>
        </div>
      )}

      {/* Gamification Fullscreen: MODO ROLETA */}
      {modoRoleta && (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col animate-in fade-in duration-300">
          {/* Header do Modo Roleta */}
          <div className="bg-primary text-primary-foreground p-5 pt-[calc(1.5rem+env(safe-area-inset-top))] flex items-center justify-between border-b border-white/10 shadow-lg">
            <div className="flex items-center gap-2">
              <Flame className="size-5 text-amber fill-amber animate-pulse" />
              <div>
                <h2 className="text-sm font-black uppercase tracking-wider">Modo Roleta</h2>
                <p className="text-[10px] text-primary-foreground/75 font-medium">{mensagemGamificada}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-white/10 px-2.5 py-1 rounded-full">
                {indiceRoleta + 1} / {roletaAtividades.length}
              </span>
              <button
                type="button"
                onClick={() => setModoRoleta(false)}
                className="flex size-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-all text-white"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Área Principal de Cartões */}
          <div className="flex-1 p-6 flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
            {roletaFinalizada ? (
              <div className="flex flex-col items-center text-center p-6 max-w-sm animate-in zoom-in-95 duration-500">
                <div className="relative mb-6">
                  <div className="absolute inset-0 size-24 bg-amber/20 rounded-full blur-xl animate-pulse" />
                  <div className="relative flex size-24 items-center justify-center rounded-full bg-amber/10 text-amber border-2 border-amber">
                    <Trophy className="size-12 animate-bounce" />
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-black text-foreground mb-3">Mesa Limpa, Guerreiro!</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Parabéns! Você concluiu todas as tarefas da pilha e limpou sua mesa. Nenhuma atividade pendente!
                </p>
                <button
                  type="button"
                  onClick={() => setModoRoleta(false)}
                  className="w-full h-13 rounded-2xl bg-primary text-primary-foreground text-sm font-bold shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Voltar para a Home
                </button>
              </div>
            ) : (
              roletaAtividades[indiceRoleta] && (
                <div
                  className={`w-full max-w-sm bg-card border-2 border-border/80 rounded-3xl shadow-2xl p-6 flex flex-col gap-5 transition-all duration-300 relative overflow-hidden ${
                    roletaEfeitoFrup ? 'transform translate-x-[150%] rotate-12 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
                  }`}
                >
                  {/* Visual card badge */}
                  <div className="flex items-center justify-between border-b border-border/50 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2B5250] bg-[#2B5250]/10 px-2 py-0.5 rounded-md">
                      {roletaAtividades[indiceRoleta].tipo}
                    </span>
                    <span className="text-[10px] font-semibold text-muted-foreground">
                      {roletaAtividades[indiceRoleta].hora}
                    </span>
                  </div>

                  {/* Task context content */}
                  <div>
                    <h4 className="font-serif text-xl font-bold text-foreground mb-2">
                      {roletaAtividades[indiceRoleta].cliente}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-muted/40 p-3 rounded-2xl border border-border/40">
                      Você ficou de: <span className="font-semibold text-foreground">{roletaAtividades[indiceRoleta].titulo}</span>
                    </p>
                  </div>

                  {/* Call and Chat CTAs */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl bg-primary text-primary-foreground text-xs font-bold shadow-md transition-all active:scale-95"
                    >
                      <Phone className="size-4" /> Ligar agora
                    </button>
                    <button
                      type="button"
                      className="flex size-12 items-center justify-center rounded-2xl bg-green-500 text-white shadow-md transition-all active:scale-95"
                    >
                      <MessageCircle className="size-5" />
                    </button>
                  </div>

                  {/* Voice Feedback Section */}
                  <div className="border-t border-border/50 pt-4 mt-1 flex flex-col gap-3">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Feedback por Voz da Visita/Atividade
                    </label>

                    {gravandoAudioRoleta ? (
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 animate-pulse">
                        <span className="flex items-center gap-2 text-xs font-semibold">
                          <span className="size-2 rounded-full bg-red-600 animate-ping" />
                          Gravando áudio... {timerAudioRoleta}s
                        </span>
                        <button
                          type="button"
                          onClick={toggleAudioRoleta}
                          className="px-3 py-1 rounded-xl bg-red-600 text-white text-[10px] font-bold"
                        >
                          Parar e Transcrever
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={toggleAudioRoleta}
                        className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-dashed border-primary/40 bg-primary/5 text-primary text-xs font-semibold hover:bg-primary/10 transition-all"
                      >
                        <Mic className="size-4 text-primary animate-bounce" />
                        Gravar feedback por áudio
                      </button>
                    )}

                    {feedbackAudioRoleta && (
                      <div className="flex flex-col gap-2 mt-1">
                        <span className="text-[10px] font-bold text-teal-deep flex items-center gap-1">
                          <Bot className="size-3.5" />
                          Transcrição IA (Clique para editar):
                        </span>
                        <textarea
                          value={feedbackAudioRoleta}
                          onChange={(e) => setFeedbackAudioRoleta(e.target.value)}
                          className="w-full h-16 resize-none rounded-xl border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    )}
                  </div>

                  {/* Conclude Action */}
                  <button
                    type="button"
                    onClick={concluirTarefaRoleta}
                    className="w-full h-12 rounded-2xl bg-[#2B5250] text-white text-xs font-bold transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
                  >
                    Concluir e Próxima
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}
