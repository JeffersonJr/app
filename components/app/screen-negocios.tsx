'use client'

import { useEffect, useState } from 'react'
import { Bot, ChevronDown, MessageCircle, Phone, Plus, ListFilter, Settings2, X, CheckCircle2 } from 'lucide-react'
import {
  atendimentos as dadosAtendimentos,
  etapaConfig,
  funis,
  getFunil,
  origemConfig,
  tempConfig,
  type Atendimento,
  type EtapaFunil,
  type Funil,
} from '@/lib/app-data'
import { AtendimentoDetail } from '@/components/app/atendimento-detail'
import { FiltrosAvancadosSheet } from '@/components/app/filtros-avancados-sheet'
import { GerenciarFunilSheet } from '@/components/app/gerenciar-funil-sheet'
import { type Temperatura, type OrigemLead } from '@/lib/app-data'

type FiltroModo = 'todos' | 'venda' | 'locacao'



export function ScreenNegocios({
  onVerCliente,
  abrirAtendimentoId,
  onAtendimentoAberto
}: {
  onVerCliente: (id: string) => void
  abrirAtendimentoId?: string | null
  onAtendimentoAberto?: () => void
}) {
  const [funilAtivo, setFunilAtivo] = useState<Funil>(funis[0])
  const [filtroModo, setFiltroModo] = useState<FiltroModo>('todos')
  const [estagioAtivo, setEstagioAtivo] = useState(0)
  const [atendimentoAberto, setAtendimentoAberto] = useState<Atendimento | null>(null)
  const [dados, setDados] = useState(dadosAtendimentos)
  const [mostrarSeletorFunil, setMostrarSeletorFunil] = useState(false)
  const [mostrarNovoFunil, setMostrarNovoFunil] = useState(false)
  const [novoFunilNome, setNovoFunilNome] = useState('')
  const [funisList, setFunisList] = useState(funis)
  const [mostrarGerenciarFunil, setMostrarGerenciarFunil] = useState(false)
  
  const [mostrarFiltrosAvancados, setMostrarFiltrosAvancados] = useState(false)
  const [filtroTemp, setFiltroTemp] = useState<Temperatura | 'todas'>('todas')
  const [filtroOrigem, setFiltroOrigem] = useState<OrigemLead | 'todas'>('todas')

  // Swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      setEstagioAtivo(prev => Math.min(prev + 1, pipeline.length - 1))
    }
    if (isRightSwipe) {
      setEstagioAtivo(prev => Math.max(prev - 1, 0))
    }
  }

  useEffect(() => {
    if (abrirAtendimentoId) {
      const atd = dados.find((a) => a.id === abrirAtendimentoId)
      if (atd) {
        // Change to the correct funnel and stage if needed
        const funilDesteAtd = funisList.find(f => f.id === atd.funilId)
        if (funilDesteAtd) setFunilAtivo(funilDesteAtd)
        setAtendimentoAberto(atd)
        onAtendimentoAberto?.()
      }
    }
  }, [abrirAtendimentoId, dados, funisList, onAtendimentoAberto])

  const pipeline = getFunil(funilAtivo.id, filtroModo === 'todos' ? undefined : filtroModo).map((e) => ({
    ...e,
    atendimentos: dados.filter(
      (a) =>
        a.funilId === funilAtivo.id &&
        a.status === 'aberto' &&
        a.etapa === e.id &&
        (filtroModo === 'todos' || a.modo === filtroModo) &&
        (filtroTemp === 'todas' || a.temperatura === filtroTemp) &&
        (filtroOrigem === 'todas' || a.origem === filtroOrigem),
    ),
  }))

  const total = pipeline.reduce((acc, e) => acc + e.atendimentos.length, 0)

  function handleStatusChange(id: string, status: 'ganho' | 'perdido') {
    setDados((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
    setAtendimentoAberto(null)
  }

  function handleEtapaChange(id: string, etapa: EtapaFunil) {
    setDados((prev) => prev.map((a) => (a.id === id ? { ...a, etapa } : a)))
    setAtendimentoAberto((prev) => (prev?.id === id ? { ...prev, etapa } : prev))
  }

  function criarFunil() {
    if (!novoFunilNome.trim()) return
    const novo: Funil = {
      id: `funil-${Date.now()}`,
      nome: novoFunilNome.trim(),
      descricao: 'Funil personalizado',
      cor: 'bg-teal-mid text-white',
    }
    setFunisList((prev) => [...prev, novo])
    setFunilAtivo(novo)
    setNovoFunilNome('')
    setMostrarNovoFunil(false)
    setMostrarSeletorFunil(false)
  }

  if (atendimentoAberto) {
    const atual = dados.find((a) => a.id === atendimentoAberto.id) ?? atendimentoAberto
    return (
      <AtendimentoDetail
        atendimento={atual}
        onBack={() => setAtendimentoAberto(null)}
        onStatusChange={handleStatusChange}
        onEtapaChange={handleEtapaChange}
      />
    )
  }

  return (
    <div className="flex h-full flex-col pb-24 w-full">
      <header className="px-5 pt-4 md:px-12 md:pt-10">
        {/* Linha 1 — Título + filtros */}
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-2xl font-semibold text-foreground">Atendimentos</h1>
          <button
            type="button"
            onClick={() => setMostrarFiltrosAvancados(true)}
            aria-label="Filtros avançados"
            className={`flex size-10 relative items-center justify-center rounded-full border border-border bg-card shadow-sm transition-brand active:scale-95 ${
              (filtroTemp !== 'todas' || filtroOrigem !== 'todas')
                ? 'text-primary bg-primary/5 border-primary/30'
                : 'text-foreground'
            }`}
          >
            <ListFilter className="size-5" strokeWidth={1.5} />
            {(filtroTemp !== 'todas' || filtroOrigem !== 'todas') && (
              <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-primary border-2 border-card" />
            )}
          </button>
        </div>
        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {total} em andamento no funil
        </p>

        {/* ── Seletor de Funil ── */}
        <div className="mt-4 relative flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMostrarSeletorFunil(!mostrarSeletorFunil)}
            className="flex flex-1 items-center gap-2 rounded-2xl bg-card px-4 py-2.5 shadow-soft transition-brand active:scale-95 border border-border"
          >
            <div className="flex flex-col text-left flex-1">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Funil Ativo</span>
              <span className="font-serif text-base font-semibold text-foreground flex items-center justify-between gap-1.5">
                {funilAtivo.nome}
                <ChevronDown className={`size-4 text-muted-foreground transition-transform ${mostrarSeletorFunil ? 'rotate-180' : ''}`} strokeWidth={2} />
              </span>
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => setMostrarGerenciarFunil(true)}
            className="flex size-[3.25rem] items-center justify-center rounded-2xl bg-card border border-border shadow-soft transition-brand active:scale-95 text-muted-foreground hover:text-foreground"
          >
            <Settings2 className="size-5" strokeWidth={1.5} />
          </button>

          {/* Dropdown de funis */}
          {mostrarSeletorFunil && (
            <div className="absolute left-0 right-0 top-full z-30 mt-2 rounded-2xl bg-card shadow-2xl border border-border overflow-hidden animate-in slide-in-from-top-2 duration-150">
              <ul className="flex flex-col px-2 py-2">
                {funisList.map((f) => (
                  <li key={f.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setFunilAtivo(f)
                        setMostrarSeletorFunil(false)
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-brand ${
                        funilAtivo.id === f.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50 text-foreground'
                      }`}
                    >
                      <div className="flex-1">
                        <span className="block font-serif text-sm font-semibold">{f.nome}</span>
                        <span className="block text-xs text-muted-foreground">{f.descricao}</span>
                      </div>
                      {funilAtivo.id === f.id && <CheckCircle2 className="size-4" strokeWidth={2} />}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Criar novo funil */}
              {!mostrarNovoFunil ? (
                <button
                  type="button"
                  onClick={() => setMostrarNovoFunil(true)}
                  className="flex w-full items-center gap-3 border-t border-border px-4 py-3.5 text-left text-sm font-semibold text-primary transition-brand hover:bg-primary/5"
                >
                  <Plus className="size-4" strokeWidth={2} />
                  Criar novo funil
                </button>
              ) : (
                <div className="border-t border-border p-3 flex gap-2">
                  <input
                    type="text"
                    value={novoFunilNome}
                    onChange={(e) => setNovoFunilNome(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && criarFunil()}
                    placeholder="Nome do funil..."
                    autoFocus
                    className="flex-1 h-9 rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="button"
                    onClick={criarFunil}
                    className="h-9 px-3 rounded-xl bg-primary text-xs font-semibold text-primary-foreground"
                  >
                    Criar
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMostrarNovoFunil(false); setNovoFunilNome('') }}
                    className="flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground"
                  >
                    <X className="size-4" strokeWidth={1.5} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Filtro Venda / Locação / Todos ── */}
        <div className="mt-3 flex gap-2">
          {([
            { id: 'todos', label: 'Todos' },
            { id: 'venda', label: '🏷️ Venda' },
            { id: 'locacao', label: '🔑 Locação' },
          ] as { id: FiltroModo; label: string }[]).map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiltroModo(f.id)}
              className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-brand ${
                filtroModo === f.id
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'border border-border bg-card text-muted-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Chips de etapa ── */}
        <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-none -mx-5 px-5">
          {(funilAtivo.etapas || []).map((etapa, i) => {
            const estagio = pipeline.find((f) => f.id === etapa.id)
            return (
              <button
                key={etapa.id}
                type="button"
                onClick={() => setEstagioAtivo(i)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-brand ${
                  estagioAtivo === i
                    ? 'bg-teal-deep text-white border border-teal-deep'
                    : 'border border-border bg-card text-muted-foreground'
                }`}
              >
                {etapa.label}
                <span
                  className={`flex size-5 items-center justify-center rounded-full font-mono text-[11px] ${
                    estagioAtivo === i ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {estagio?.atendimentos.length ?? 0}
                </span>
              </button>
            )
          })}
        </div>
      </header>

      {/* ── Colunas do funil com swipe horizontal ── */}
      <div className="mt-4 flex-1 overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div
          className="flex h-full transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{ transform: `translateX(-${estagioAtivo * 100}%)` }}
        >
          {pipeline.map((estagio) => (
            <div key={estagio.id} className="w-full shrink-0 overflow-y-auto px-5">
              {estagio.atendimentos.length === 0 ? (
                <div className="mt-10 flex flex-col items-center gap-2 text-center">
                  <span className="text-4xl">🎯</span>
                  <p className="text-sm text-muted-foreground">
                    Nenhum atendimento em {funilAtivo.etapas?.find(e => e.id === estagio.id)?.label || estagio.id}
                  </p>
                  <p className="text-xs text-muted-foreground/60">
                    {filtroModo !== 'todos' && `Filtro: ${filtroModo === 'venda' ? 'Venda' : 'Locação'} · `}
                    Funil: {funilAtivo.nome}
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col gap-3">
                  {estagio.atendimentos.map((atd) => (
                    <li key={atd.id}>
                      <AtendimentoCard
                        atendimento={atd}
                        onAbrir={() => setAtendimentoAberto(atd)}
                        onVerCliente={onVerCliente}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {mostrarFiltrosAvancados && (
        <FiltrosAvancadosSheet
          onClose={() => setMostrarFiltrosAvancados(false)}
          filtroTemp={filtroTemp}
          setFiltroTemp={setFiltroTemp}
          filtroOrigem={filtroOrigem}
          setFiltroOrigem={setFiltroOrigem}
        />
      )}
      {mostrarGerenciarFunil && (
        <GerenciarFunilSheet
          funil={funilAtivo}
          atendimentos={dados.filter(a => a.funilId === funilAtivo.id)}
          onClose={() => setMostrarGerenciarFunil(false)}
          onSave={(funilAtualizado, transferencias) => {
            // Update funnel
            setFunisList(prev => prev.map(f => f.id === funilAtualizado.id ? funilAtualizado : f))
            setFunilAtivo(funilAtualizado)
            
            // Apply transfers
            if (Object.keys(transferencias).length > 0) {
              setDados(prev => prev.map(a => {
                if (a.funilId === funilAtualizado.id && transferencias[a.etapa]) {
                  return { ...a, etapa: transferencias[a.etapa] }
                }
                return a
              }))
            }
            
            setMostrarGerenciarFunil(false)
          }}
        />
      )}
    </div>
  )
}

function AtendimentoCard({
  atendimento: atd,
  onAbrir,
  onVerCliente,
}: {
  atendimento: Atendimento
  onAbrir: () => void
  onVerCliente: (id: string) => void
}) {
  return (
    <article className="rounded-[1.25rem] border-transparent bg-card shadow-soft p-4">
      <button type="button" onClick={onAbrir} className="flex w-full items-start gap-3 text-left">
        <div className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-serif text-sm font-semibold text-primary">
          {atd.iniciais}
          <span
            className={`absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-card ${tempConfig[atd.temperatura].dot}`}
            aria-label={`Temperatura: ${tempConfig[atd.temperatura].label}`}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-semibold text-foreground">{atd.nome}</span>
            {atd.albert.ativo && (
              <span title="Albert ativo" className="shrink-0">
                <Bot className="size-3.5 text-teal-mid" strokeWidth={1.5} />
              </span>
            )}
            {/* Badge Venda/Locação */}
            <span className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
              atd.modo === 'venda' ? 'bg-primary/10 text-primary' : 'bg-teal-mid/15 text-teal-deep'
            }`}>
              {atd.modo === 'venda' ? 'Venda' : 'Locação'}
            </span>
          </div>
          <span className="block text-xs text-muted-foreground">{atd.telefone}</span>
          <span className="block text-xs text-muted-foreground">{atd.email}</span>
        </div>
      </button>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-muted-foreground truncate mr-2">{atd.interesse}</span>
        <span className="shrink-0 font-mono text-sm font-semibold text-primary">{atd.valor}</span>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${origemConfig[atd.origem].cor}`}>
          {atd.origem}
        </span>
        <span className="rounded-full bg-fog px-2 py-0.5 text-[10px] text-muted-foreground">
          Entrada: {atd.dataEntrada}
        </span>
        <span className="rounded-full bg-fog px-2 py-0.5 text-[10px] text-muted-foreground">
          Última: {atd.ultimaInteracao}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
        <button
          type="button"
          onClick={onAbrir}
          className="flex-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-brand active:scale-95"
        >
          Abrir atendimento
        </button>
        <button
          type="button"
          aria-label={`WhatsApp de ${atd.nome}`}
          className="flex size-8 items-center justify-center rounded-full bg-green-100 text-green-700 transition-brand active:scale-95"
        >
          <MessageCircle className="size-4" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label={`Ligar para ${atd.nome}`}
          className="flex size-8 items-center justify-center rounded-full bg-muted text-primary transition-brand active:scale-95"
        >
          <Phone className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </article>
  )
}
