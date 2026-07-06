'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  Bot,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  Flame,
  Mail,
  MessageCircle,
  Paperclip,
  Phone,
  Plus,
  StickyNote,
  Trophy,
  User,
  Users,
  X,
  XCircle,
  Star,
  Target,
  Heart,
} from 'lucide-react'
import {
  type Atendimento,
  type EventoTimeline,
  type TipoAtividade,
  etapaConfig,
  imoveis,
  origemConfig,
  tempConfig,
  tipoAtividadeConfig,
} from '@/lib/app-data'
import { featureFlags } from '@/lib/feature-flags'
import { IAUpsellPage } from '@/components/app/ia-upsell-page'
import { RegistrarInteracaoSheet } from '@/components/app/registrar-interacao-sheet'
import { AtividadeDetalheSheet } from '@/components/app/atividade-detalhe-sheet'
import { atividadesHoje } from '@/lib/app-data'

const ETAPAS = ['qualificando', 'conhecendo', 'agendado', 'negociando'] as const
type Etapa = (typeof ETAPAS)[number]

const FILTROS_TIMELINE = ['Todos', 'Atividades', 'E-mails', 'Imóveis', 'Notas', 'Outros'] as const

// ─── Helpers ─────────────────────────────────────────────────────────────────
function iconeTimeline(tipo: EventoTimeline['tipo']) {
  const map: Record<EventoTimeline['tipo'], string> = {
    nota: '📝',
    atividade: '📅',
    email: '✉️',
    imovel_enviado: '🏠',
    documento: '📎',
    origem: '🎯',
    etapa: '➡️',
    status: '⭐',
  }
  return map[tipo] ?? '•'
}

function filtroMatches(tipo: EventoTimeline['tipo'], filtro: string): boolean {
  if (filtro === 'Todos') return true
  if (filtro === 'Atividades') return tipo === 'atividade'
  if (filtro === 'E-mails') return tipo === 'email'
  if (filtro === 'Imóveis') return tipo === 'imovel_enviado'
  if (filtro === 'Notas') return tipo === 'nota'
  return ['documento', 'origem', 'etapa', 'status'].includes(tipo)
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function AtendimentoDetail({
  atendimento,
  onBack,
  onStatusChange,
  onEtapaChange,
}: {
  atendimento: Atendimento
  onBack: () => void
  onStatusChange?: (id: string, status: 'ganho' | 'perdido') => void
  onEtapaChange?: (id: string, etapa: Etapa) => void
}) {
  const [aba, setAba] = useState<'historico' | 'atividades' | 'imoveis' | 'documentos' | 'perfil' | 'albert'>('historico')
  const [filtroTimeline, setFiltroTimeline] = useState('Todos')
  const [mostrarNovaNota, setMostrarNovaNota] = useState(false)
  const [mostrarNovaAtividade, setMostrarNovaAtividade] = useState(false)
  const [mostrarNovoEmail, setMostrarNovoEmail] = useState(false)
  const [mostrarAlbert, setMostrarAlbert] = useState(false)
  const [mostrarUpsell, setMostrarUpsell] = useState(false)
  const [nota, setNota] = useState('')
  const [mostrarNovaInteracao, setMostrarNovaInteracao] = useState(false)
  const [localTimeline, setLocalTimeline] = useState<EventoTimeline[]>(atendimento.timeline)
  const [localAtividades, setLocalAtividades] = useState(atendimento.atividades)
  const [atividadeSelecionada, setAtividadeSelecionada] = useState<any>(null)

  const etapaIdx = ETAPAS.indexOf(atendimento.etapa as Etapa)
  const imoveisCompativeis = imoveis.filter((im) => {
    const p = atendimento.perfil
    if (p.finalidade === 'Venda' && im.finalidade !== 'Venda') return false
    if (p.finalidade === 'Locação' && im.finalidade !== 'Locação') return false
    if (p.quartos && im.dorms < p.quartos) return false
    return true
  })

  const timelineFiltrada = localTimeline.filter((e) => filtroMatches(e.tipo, filtroTimeline))

  function handleSalvarInteracao(evento: EventoTimeline) {
    setLocalTimeline((prev) => [evento, ...prev])
    setMostrarNovaInteracao(false)
  }

  function handleConcluirAtividade(id: string, feedback: string, agendarProxima: boolean) {
    setLocalAtividades((prev) => prev.map((a) => (a.id === id ? { ...a, concluida: true } : a)))
    
    // Atualiza o mock global para refletir na Home imediatamente
    const globalAtv = atividadesHoje.find(a => a.id === id)
    if (globalAtv) globalAtv.concluida = true
    
    setAtividadeSelecionada(null)
  }

  return (
    <div className="flex flex-col pb-28">
      {mostrarUpsell && <IAUpsellPage onClose={() => setMostrarUpsell(false)} origem="albert" />}
      
      {/* Header imersivo */}
      <div className="bg-primary px-5 pb-5 pt-[calc(1rem+env(safe-area-inset-top))] text-primary-foreground">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            aria-label="Voltar"
            className="flex size-10 items-center justify-center rounded-full bg-teal-shadow/40 transition-brand active:scale-95"
          >
            <ArrowLeft className="size-5" strokeWidth={1.5} />
          </button>
          <div className="flex gap-2">
            {atendimento.status === 'aberto' && (
              <>
                <button
                  type="button"
                  onClick={() => onStatusChange?.(atendimento.id, 'ganho')}
                  className="flex items-center gap-1.5 rounded-full bg-teal-shadow/40 px-3 py-1.5 text-xs font-semibold transition-brand active:scale-95"
                >
                  <Trophy className="size-3.5" strokeWidth={2} />
                  Ganho
                </button>
                <button
                  type="button"
                  onClick={() => onStatusChange?.(atendimento.id, 'perdido')}
                  className="flex items-center gap-1.5 rounded-full bg-teal-shadow/40 px-3 py-1.5 text-xs font-semibold transition-brand active:scale-95"
                >
                  <XCircle className="size-3.5" strokeWidth={2} />
                  Perdido
                </button>
              </>
            )}
            {atendimento.status !== 'aberto' && (
              <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${atendimento.status === 'ganho' ? 'bg-green-500/30' : 'bg-red-500/30'}`}>
                {atendimento.status === 'ganho' ? '🏆 Ganho' : '✗ Perdido'}
              </span>
            )}
          </div>
        </div>

        {/* Dados do cliente */}
        <div className="mt-4 flex items-center gap-3">
          <div className="relative flex size-16 shrink-0 items-center justify-center rounded-full bg-teal-mid/30 font-serif text-2xl font-semibold">
            {atendimento.iniciais}
            <span className={`absolute -bottom-0.5 -right-0.5 size-4 rounded-full border-2 border-primary ${tempConfig[atendimento.temperatura].bg}`} />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-serif text-xl font-semibold">{atendimento.nome}</h1>
            <p className="text-sm text-teal-light">{atendimento.telefone}</p>
            <p className="text-xs text-teal-light/80">{atendimento.email}</p>
          </div>
        </div>

        {/* Info rápida */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${origemConfig[atendimento.origem].cor}`}>
            {atendimento.origem}
          </span>
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${etapaConfig[atendimento.etapa as Etapa].cor}`}>
            {etapaConfig[atendimento.etapa as Etapa].label}
          </span>
          <span className="rounded-full bg-teal-shadow/30 px-2.5 py-1 text-[10px] font-semibold text-teal-light">
            Entrada: {atendimento.dataEntrada}
          </span>
          <span className="rounded-full bg-teal-shadow/30 px-2.5 py-1 text-[10px] font-semibold text-teal-light">
            Última: {atendimento.ultimaInteracao}
          </span>
        </div>

        {/* Ações rápidas */}
        <div className="mt-4 grid grid-cols-5 gap-1.5">
          {[
            { icon: Phone, label: 'Ligar' },
            { icon: MessageCircle, label: 'WA' },
            { icon: Mail, label: 'E-mail', onClick: () => setMostrarNovoEmail(true) },
            { icon: StickyNote, label: 'Nota', onClick: () => setMostrarNovaNota(true) },
            { icon: Bot, label: 'Albert', onClick: () => { 
                if (!featureFlags.temIA) {
                  setMostrarUpsell(true)
                } else {
                  setMostrarAlbert(true)
                  setAba('albert') 
                }
              } 
            },
          ].map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={a.onClick}
              className="flex flex-col items-center gap-1 rounded-2xl bg-teal-shadow/40 py-2.5 transition-brand active:scale-95"
            >
              <a.icon className="size-4" strokeWidth={1.5} />
              <span className="text-[10px] font-medium">{a.label}</span>
            </button>
          ))}
        </div>

        {/* Funil — avançar / retroceder etapa */}
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-teal-shadow/40 px-4 py-3">
          <button
            type="button"
            disabled={etapaIdx === 0}
            onClick={() => etapaIdx > 0 && onEtapaChange?.(atendimento.id, ETAPAS[etapaIdx - 1])}
            className="flex size-8 items-center justify-center rounded-full bg-teal-shadow/40 text-teal-light disabled:opacity-30"
          >
            <ChevronLeft className="size-4" strokeWidth={2} />
          </button>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] uppercase tracking-widest text-teal-light/70">Etapa no funil</span>
            <span className="font-serif text-sm font-semibold text-white">
              {etapaConfig[atendimento.etapa as Etapa].label}
            </span>
            <div className="flex gap-1">
              {ETAPAS.map((e, i) => (
                <span key={e} className={`h-1 w-6 rounded-full ${i <= etapaIdx ? 'bg-teal-light' : 'bg-teal-shadow/60'}`} />
              ))}
            </div>
          </div>
          <button
            type="button"
            disabled={etapaIdx === ETAPAS.length - 1}
            onClick={() => etapaIdx < ETAPAS.length - 1 && onEtapaChange?.(atendimento.id, ETAPAS[etapaIdx + 1])}
            className="flex size-8 items-center justify-center rounded-full bg-teal-shadow/40 text-teal-light disabled:opacity-30"
          >
            <ChevronRight className="size-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Abas */}
      <div className="flex overflow-x-auto scrollbar-none border-b border-border bg-card">
        {[
          { id: 'historico', label: 'Histórico', icon: Calendar },
          { id: 'atividades', label: 'Atividades', icon: CheckCircle2 },
          { id: 'imoveis', label: 'Imóveis', icon: Building2 },
          { id: 'documentos', label: 'Docs', icon: Paperclip },
          { id: 'perfil', label: 'Perfil', icon: User },
          { id: 'albert', label: 'Albert', icon: Bot },
        ].map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => {
              if (a.id === 'albert' && !featureFlags.temIA) {
                setMostrarUpsell(true)
              } else {
                setAba(a.id as typeof aba)
              }
            }}
            className={`flex shrink-0 flex-col items-center gap-1 px-4 py-3 text-[11px] font-semibold transition-brand border-b-2 ${
              aba === a.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            <a.icon className="size-4" strokeWidth={1.5} />
            {a.label}
          </button>
        ))}
      </div>

      {/* Conteúdo das abas */}
      <div className="px-5 pt-5">
        {/* ── Histórico ── */}
        {aba === 'historico' && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold">Histórico</h2>
              <button
                type="button"
                onClick={() => setMostrarNovaInteracao(true)}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-brand active:scale-95"
              >
                <Plus className="size-3.5" strokeWidth={2} /> Interação
              </button>
            </div>

            {/* Filtros timeline */}
            <div className="mb-4 flex gap-2 overflow-x-auto scrollbar-none -mx-5 px-5">
              {FILTROS_TIMELINE.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFiltroTimeline(f)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-brand ${
                    filtroTimeline === f
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-card text-muted-foreground'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <ol className="relative flex flex-col gap-4 border-l-2 border-border pl-5">
              {timelineFiltrada.map((item) => (
                <li key={item.id} className="relative">
                  <span className="absolute -left-[22px] top-1 flex size-5 items-center justify-center rounded-full bg-card border border-border text-[10px]">
                    {iconeTimeline(item.tipo)}
                  </span>
                  {item.importante && (
                    <span className="absolute -left-[30px] -top-1 text-[8px]">⭐</span>
                  )}
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {item.data} · {item.hora}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">{item.descricao}</p>
                </li>
              ))}
              {timelineFiltrada.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhum registro para este filtro.</p>
              )}
            </ol>

            {/* Nova Nota inline */}
            {mostrarNovaNota && (
              <div className="mt-4 rounded-2xl border border-border bg-card p-4">
                <p className="mb-2 text-sm font-semibold text-foreground">Nova nota</p>
                <textarea
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                  placeholder="Escreva sua anotação..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => { setMostrarNovaNota(false); setNota('') }}
                    className="flex-1 rounded-xl border border-border py-2 text-sm font-semibold text-muted-foreground"
                  >Cancelar</button>
                  <button
                    type="button"
                    onClick={() => { setMostrarNovaNota(false); setNota('') }}
                    className="flex-1 rounded-xl bg-primary py-2 text-sm font-semibold text-primary-foreground"
                  >Salvar nota</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Atividades ── */}
        {aba === 'atividades' && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold">Atividades</h2>
              <button
                type="button"
                onClick={() => setMostrarNovaAtividade(true)}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
              >
                <Plus className="size-3.5" strokeWidth={2} /> Agendar
              </button>
            </div>
            <ul className="flex flex-col gap-3">
              {localAtividades.map((atv) => (
                <li key={atv.id}>
                  <button
                    type="button"
                    onClick={() => setAtividadeSelecionada({ ...atv, cliente: atendimento.nome })}
                    className={`w-full text-left rounded-[1.25rem] bg-card shadow-soft p-4 transition-brand hover:bg-muted/50 ${atv.concluida ? 'opacity-70 grayscale' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`rounded-xl px-2.5 py-1 text-xs font-semibold ${tipoAtividadeConfig[atv.tipo].cor}`}>
                        {tipoAtividadeConfig[atv.tipo].emoji} {tipoAtividadeConfig[atv.tipo].label}
                      </span>
                      {atv.importante && <Star className="size-4 text-amber fill-amber" strokeWidth={0} />}
                    </div>
                    <p className={`mt-2 text-sm font-semibold ${atv.concluida ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                      {atv.titulo}
                    </p>
                    {atv.descricao && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{atv.descricao}</p>}
                    <p className={`mt-2 font-mono text-[11px] ${atv.concluida ? 'text-muted-foreground' : 'text-primary'}`}>
                      {atv.data === 'Hoje' ? 'Hoje' : new Date(atv.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} · {atv.hora}
                    </p>
                  </button>
                </li>
              ))}
              {localAtividades.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhuma atividade agendada.</p>
              )}
            </ul>

            {mostrarNovaAtividade && (
              <FormNovaAtividade onClose={() => setMostrarNovaAtividade(false)} />
            )}
          </div>
        )}

        {/* ── Imóveis ── */}
        {aba === 'imoveis' && (
          <div>
            <div className="mb-4">
              <h2 className="font-serif text-lg font-semibold">Imóveis compatíveis</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">Baseado no perfil de busca do cliente</p>
            </div>
            <ul className="flex flex-col gap-3">
              {imoveisCompativeis.map((im) => (
                <li key={im.id} className="rounded-[1.25rem] bg-card shadow-soft p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{im.codigo}</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{im.titulo}</p>
                      <p className="text-xs text-muted-foreground">{im.bairro}, {im.cidade}</p>
                      <p className="mt-1 font-mono text-sm font-semibold text-primary">{im.preco}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${im.status === 'Livre' ? 'bg-teal-mid/20 text-teal-deep' : 'bg-amber/20 text-[#8a5a1e]'}`}>
                      {im.status}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2 border-t border-border pt-3">
                    <button type="button" className="flex-1 rounded-xl bg-primary/10 py-2 text-xs font-semibold text-primary active:scale-95 transition-brand">
                      <Mail className="mb-0.5 inline size-3.5 mr-1" strokeWidth={1.5} />
                      Enviar por e-mail
                    </button>
                    <button type="button" className="flex-1 rounded-xl bg-green-100 py-2 text-xs font-semibold text-green-700 active:scale-95 transition-brand">
                      <MessageCircle className="mb-0.5 inline size-3.5 mr-1" strokeWidth={1.5} />
                      WhatsApp
                    </button>
                  </div>
                </li>
              ))}
              {imoveisCompativeis.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhum imóvel compatível com o perfil atual.</p>
              )}
            </ul>
          </div>
        )}

        {/* ── Documentos ── */}
        {aba === 'documentos' && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold">Documentos</h2>
              <button type="button" className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                <Plus className="size-3.5" strokeWidth={2} /> Anexar
              </button>
            </div>
            {atendimento.documentos.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-10 text-center">
                <FileText className="size-10 text-muted-foreground/40" strokeWidth={1} />
                <p className="text-sm text-muted-foreground">Nenhum documento anexado</p>
                <button type="button" className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  Anexar documento
                </button>
              </div>
            ) : (
              <ul className="flex flex-col gap-2">
                {atendimento.documentos.map((doc) => (
                  <li key={doc.id} className="flex items-center gap-3 rounded-2xl bg-card shadow-soft p-4">
                    <FileText className="size-8 text-primary" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{doc.nome}</p>
                      <p className="text-xs text-muted-foreground">{doc.tipo} · {doc.anexadoEm}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* ── Perfil ── */}
        {aba === 'perfil' && (
          <div>
            <h2 className="mb-4 font-serif text-lg font-semibold">O que está buscando</h2>
            <div className="flex flex-col gap-3">
              <InfoRow label="Finalidade" value={atendimento.perfil.finalidade || '—'} />
              <InfoRow label="Tipo de imóvel" value={atendimento.perfil.tipoImovel || '—'} />
              <InfoRow label="Cidades" value={atendimento.perfil.cidades.join(', ') || '—'} />
              <InfoRow label="Bairros preferidos" value={atendimento.perfil.bairros.join(', ') || '—'} />
              <div className="grid grid-cols-3 gap-2">
                <InfoCard label="Quartos" value={atendimento.perfil.quartos?.toString() ?? '—'} />
                <InfoCard label="Suítes" value={atendimento.perfil.suites?.toString() ?? '—'} />
                <InfoCard label="Vagas" value={atendimento.perfil.vagas?.toString() ?? '—'} />
              </div>
              {(atendimento.perfil.areaMin || atendimento.perfil.areaMax) && (
                <InfoRow label="Área" value={`${atendimento.perfil.areaMin ?? '?'} – ${atendimento.perfil.areaMax ?? '?'} m²`} />
              )}
              <InfoRow label="Faixa de valor" value={`${atendimento.perfil.valorMin || '?'} até ${atendimento.perfil.valorMax || '?'}`} />
              <InfoRow label="Prazo para comprar" value={atendimento.perfil.prazoParaComprar || '—'} />
              <div className="flex flex-wrap gap-2">
                {atendimento.perfil.lazer && <TagChip label="Lazer/Piscina" />}
                {atendimento.perfil.varanda && <TagChip label="Varanda" />}
                {atendimento.perfil.mobiliado && <TagChip label="Mobiliado" />}
                {atendimento.perfil.aceitaFinanciamento && <TagChip label="Aceita financiamento" />}
              </div>
              {atendimento.perfil.observacoes && (
                <div className="rounded-2xl bg-cream p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Observações</p>
                  <p className="mt-1 text-sm text-foreground">{atendimento.perfil.observacoes}</p>
                </div>
              )}

              {/* Método 4Q */}
              <div className="mt-4 rounded-3xl bg-teal-mid/5 shadow-soft p-5 border border-teal-mid/20">
                <h3 className="mb-4 font-serif text-lg font-semibold text-teal-deep flex items-center gap-2">
                  <Target className="size-5" />
                  Qualificação 4Q
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-deep/70">Quem decide?</span>
                    <span className="text-sm font-medium text-foreground">{atendimento.perfil.metodo4Q?.quem || '—'}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-deep/70">O quê busca?</span>
                    <span className="text-sm font-medium text-foreground">{atendimento.perfil.metodo4Q?.oQue || '—'}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-deep/70">Quando precisa?</span>
                    <span className="text-sm font-medium text-foreground">{atendimento.perfil.metodo4Q?.quando || '—'}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-deep/70">Quanto (Orçamento)?</span>
                    <span className="text-sm font-medium text-foreground">{atendimento.perfil.metodo4Q?.quanto || '—'}</span>
                  </div>
                </div>
              </div>

              {/* Método FORD */}
              <div className="mt-3 rounded-3xl bg-amber/5 shadow-soft p-5 border border-amber/20">
                <h3 className="mb-4 font-serif text-lg font-semibold text-[#8a5a1e] flex items-center gap-2">
                  <Heart className="size-5" />
                  Rapport FORD
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8a5a1e]/70">F (Família)</span>
                    <span className="text-sm font-medium text-foreground">{atendimento.perfil.metodoFORD?.familia || '—'}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8a5a1e]/70">O (Ocupação)</span>
                    <span className="text-sm font-medium text-foreground">{atendimento.perfil.metodoFORD?.ocupacao || '—'}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8a5a1e]/70">R (Recreação)</span>
                    <span className="text-sm font-medium text-foreground">{atendimento.perfil.metodoFORD?.recreacao || '—'}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8a5a1e]/70">D (Sonhos)</span>
                    <span className="text-sm font-medium text-foreground">{atendimento.perfil.metodoFORD?.sonhos || '—'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Albert ── */}
        {aba === 'albert' && (
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Bot className="size-6" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-serif text-lg font-semibold">Albert IA</h2>
                <p className="text-xs text-muted-foreground">Assistente de follow-up automático</p>
              </div>
            </div>

            <div className="rounded-2xl bg-primary/5 p-4 mb-4">
              <p className="text-sm text-foreground">
                O Albert vai fazer um <strong>follow-up automático</strong> com {atendimento.nome} no dia e hora que você definir, enviando uma mensagem personalizada.
              </p>
            </div>

            <div className={`rounded-2xl p-4 mb-4 ${atendimento.albert.ativo ? 'bg-teal-mid/10 border border-teal-mid/30' : 'bg-muted border border-border'}`}>
              {atendimento.albert.ativo ? (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="size-2 rounded-full bg-teal-mid animate-pulse" />
                    <p className="text-sm font-semibold text-teal-deep">Follow-up ativo</p>
                  </div>
                  <p className="text-sm text-foreground">📅 {atendimento.albert.dia} · {atendimento.albert.hora}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{atendimento.albert.instrucoes}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum follow-up agendado para este atendimento.</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">Dia do follow-up</label>
                <input type="date" className="h-12 w-full rounded-2xl border border-border bg-card px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">Horário</label>
                <input type="time" className="h-12 w-full rounded-2xl border border-border bg-card px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">Instrução para o Albert</label>
                <textarea
                  rows={3}
                  placeholder="Ex: Ligar e perguntar se ainda tem interesse no imóvel..."
                  className="w-full resize-none rounded-2xl border border-border bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button type="button" className="h-12 w-full rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-brand active:scale-[0.98]">
                Ativar follow-up do Albert
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Nova Atividade */}
      {mostrarNovaAtividade && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <button type="button" onClick={() => setMostrarNovaAtividade(false)} className="absolute inset-0 bg-teal-shadow/50 backdrop-blur-[2px]" />
          <div className="relative rounded-t-3xl bg-card p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-fog" />
            <FormNovaAtividade onClose={() => setMostrarNovaAtividade(false)} />
          </div>
        </div>
      )}

      {/* Modal Novo E-mail */}
      {mostrarNovoEmail && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <button type="button" onClick={() => setMostrarNovoEmail(false)} className="absolute inset-0 bg-teal-shadow/50 backdrop-blur-[2px]" />
          <div className="relative rounded-t-3xl bg-card p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-fog" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-semibold">Enviar e-mail</h3>
              <button type="button" onClick={() => setMostrarNovoEmail(false)} className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <X className="size-4" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Assunto" className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              <textarea rows={4} placeholder="Corpo do e-mail..." className="w-full resize-none rounded-2xl border border-border bg-background p-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              <button type="button" onClick={() => setMostrarNovoEmail(false)} className="h-12 w-full rounded-2xl bg-primary text-sm font-semibold text-primary-foreground transition-brand active:scale-[0.98]">
                Enviar para {atendimento.email}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Registrar Interação Sheet */}
      {mostrarNovaInteracao && (
        <RegistrarInteracaoSheet
          onClose={() => setMostrarNovaInteracao(false)}
          onSalvar={handleSalvarInteracao}
        />
      )}

      {/* Atividade Detalhe Sheet */}
      <AtividadeDetalheSheet
        atividade={atividadeSelecionada}
        onClose={() => setAtividadeSelecionada(null)}
        onConcluir={handleConcluirAtividade}
        onVerNegocio={() => {
          // Já estamos no negócio, então apenas fecha a sheet
          setAtividadeSelecionada(null)
        }}
      />
    </div>
  )
}

// ─── Subcomponents ─────────────────────────────────────────────────────────────
function FormNovaAtividade({ onClose }: { onClose: () => void }) {
  const [tipo, setTipo] = useState<TipoAtividade>('visita')
  const [importante, setImportante] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-semibold">Nova atividade</h3>
        <button type="button" onClick={onClose} className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <X className="size-4" strokeWidth={1.5} />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {/* Tipo */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tipo</label>
          <div className="flex flex-wrap gap-2">
            {(['visita', 'reuniao', 'ligacao', 'prazo', 'pos-venda'] as TipoAtividade[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTipo(t)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-brand ${tipo === t ? 'bg-primary text-primary-foreground' : 'border border-border bg-card text-muted-foreground'}`}
              >
                {tipoAtividadeConfig[t].emoji} {tipoAtividadeConfig[t].label}
              </button>
            ))}
          </div>
        </div>
        <input type="text" placeholder="Título da atividade" className="h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        <textarea rows={2} placeholder="Descrição (opcional)" className="w-full resize-none rounded-2xl border border-border bg-card p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Data</label>
            <input type="date" className="h-11 w-full rounded-2xl border border-border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Hora</label>
            <input type="time" className="h-11 w-full rounded-2xl border border-border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setImportante(!importante)}
          className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-brand ${importante ? 'border-amber bg-amber/10 text-[#8a5a1e]' : 'border-border bg-card text-muted-foreground'}`}
        >
          <Star className={`size-4 ${importante ? 'fill-amber text-amber' : ''}`} strokeWidth={1.5} />
          Marcar como importante
        </button>
        <button type="button" onClick={onClose} className="h-12 w-full rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-brand active:scale-[0.98]">
          Salvar atividade
        </button>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl bg-card shadow-soft px-4 py-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground text-right">{value}</span>
    </div>
  )
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl bg-card shadow-soft p-3">
      <span className="font-mono text-xl font-semibold text-primary">{value}</span>
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
    </div>
  )
}

function TagChip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
      {label}
    </span>
  )
}
