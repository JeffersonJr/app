'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  Car,
  Heart,
  MapPin,
  Ruler,
  Search,
  Share2,
  Check,
  Navigation,
  Phone,
  MessageCircle,
  Bot,
  Map,
  CheckCircle2,
  ListFilter,
  Plus,
  ArrowUpDown,
  PenLine,
  X,
  Mic,
  PhoneOff
} from 'lucide-react'
import { imoveis, type Imovel, atendimentos } from '@/lib/app-data'
import { empreendimentosMock, type Empreendimento } from '@/lib/empreendimentos-data'
import { FiltrosAvancadosImoveisSheet } from '@/components/app/filtros-avancados-imoveis-sheet'
import { FormCaptarImovel } from '@/components/app/form-captar-imovel'
import { IAUpsellPage } from '@/components/app/ia-upsell-page'
import { FormCaptarEmpreendimento } from '@/components/app/form-captar-empreendimento'
import { EmpreendimentoDetail } from '@/components/app/empreendimento-detail'
import { FormNovaAtividade } from '@/components/app/form-nova-atividade'
import { Calendar } from 'lucide-react'

const filtros = ['Todos', 'Venda', 'Locação', 'Livre', 'Reservado', 'Favoritos'] as const

const statusStyle: Record<Imovel['status'], string> = {
  Livre: 'bg-teal-mid/90 text-white',
  Reservado: 'bg-amber/90 text-ink',
  Proposta: 'bg-teal-shadow/90 text-white',
}


export function ScreenImoveis({ onCaptar }: { onCaptar?: () => void }) {
  const [abaAtiva, setAbaAtiva] = useState<'imoveis' | 'empreendimentos'>('imoveis')
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>('Todos')
  const [busca, setBusca] = useState('')
  const [selecionado, setSelecionado] = useState<Imovel | null>(null)
  const [empreendimentoSelecionado, setEmpreendimentoSelecionado] = useState<Empreendimento | null>(null)

  const [mostrarFiltrosAvancados, setMostrarFiltrosAvancados] = useState(false)
  const [filtroFinalidade, setFiltroFinalidade] = useState('Todas')
  const [filtroStatus, setFiltroStatus] = useState('Todos')

  const [ordenacao, setOrdenacao] = useState<'padrao' | 'menor-preco' | 'maior-preco' | 'maior-area'>('padrao')
  const [mostrarMenuOrdenacao, setMostrarMenuOrdenacao] = useState(false)
  const [mostrarCadastroEmpreendimento, setMostrarCadastroEmpreendimento] = useState(false)
  const [favoritosIds, setFavoritosIds] = useState<Set<string>>(new Set())

  const filtrosAplicados = useMemo(() => {
    const res: Record<string, string> = {}
    if (filtroFinalidade !== 'Todas') res.finalidade = filtroFinalidade
    if (filtroStatus !== 'Todos') res.status = filtroStatus
    return res
  }, [filtroFinalidade, filtroStatus])

  const lista = useMemo(() => {
    const filtrados = imoveis.filter((im) => {
      const matchFiltro =
        filtro === 'Todos' ||
        (filtro === 'Favoritos' ? favoritosIds.has(im.id) : im.finalidade === filtro || im.status === filtro)
      const q = busca.trim().toLowerCase()
      const matchBusca =
        !q ||
        im.titulo.toLowerCase().includes(q) ||
        im.bairro.toLowerCase().includes(q) ||
        im.codigo.toLowerCase().includes(q)

      const matchAdvFinalidade = filtroFinalidade === 'Todas' || im.finalidade === filtroFinalidade
      const matchAdvStatus = filtroStatus === 'Todos' || im.status === filtroStatus

      return matchFiltro && matchBusca && matchAdvFinalidade && matchAdvStatus
    })

    if (ordenacao === 'menor-preco') {
      return [...filtrados].sort((a, b) => {
        const pA = parseInt(a.preco.replace(/\D/g, ''), 10) || 0
        const pB = parseInt(b.preco.replace(/\D/g, ''), 10) || 0
        return pA - pB
      })
    }
    if (ordenacao === 'maior-preco') {
      return [...filtrados].sort((a, b) => {
        const pA = parseInt(a.preco.replace(/\D/g, ''), 10) || 0
        const pB = parseInt(b.preco.replace(/\D/g, ''), 10) || 0
        return pB - pA
      })
    }
    if (ordenacao === 'maior-area') {
      return [...filtrados].sort((a, b) => (b.area || 0) - (a.area || 0))
    }
    return filtrados
  }, [filtro, busca, filtroFinalidade, filtroStatus, ordenacao])

  if (selecionado) {
    return (
      <ImovelDetail
        imovel={selecionado}
        onBack={() => setSelecionado(null)}
        onUpdate={(novo) => {
          setSelecionado(novo)
          const idx = imoveis.findIndex(i => i.id === novo.id)
          if (idx !== -1) {
            imoveis[idx] = novo
          }
        }}
        isFavorito={favoritosIds.has(selecionado.id)}
        toggleFavorito={() => {
          setFavoritosIds(prev => {
            const newSet = new Set(prev)
            if (newSet.has(selecionado.id)) newSet.delete(selecionado.id)
            else newSet.add(selecionado.id)
            return newSet
          })
        }}
      />
    )
  }

  if (empreendimentoSelecionado) {
    return (
      <EmpreendimentoDetail
        emp={empreendimentoSelecionado}
        onBack={() => setEmpreendimentoSelecionado(null)}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4 px-5 pt-4 pb-28">
      <header className="glass-header -mx-5 px-5 pb-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex rounded-full bg-muted/50 p-1">
            <button
              onClick={() => setAbaAtiva('imoveis')}
              className={`relative flex-1 rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${abaAtiva === 'imoveis'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Imóveis
            </button>
            <button
              onClick={() => setAbaAtiva('empreendimentos')}
              className={`relative flex-1 rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${abaAtiva === 'empreendimentos'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Empreendimentos
            </button>
          </div>
          {onCaptar && (
            <button
              type="button"
              onClick={abaAtiva === 'empreendimentos' ? () => setMostrarCadastroEmpreendimento(true) : onCaptar}
              aria-label={abaAtiva === 'empreendimentos' ? 'Cadastrar empreendimento' : 'Captar novo imóvel'}
              className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-brand active:scale-95"
            >
              <Plus className="size-5" />
            </button>
          )}
        </div>

        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {abaAtiva === 'imoveis' ? lista.length : 0} na carteira
        </p>

        {/* Busca e Filtros */}
        <div className="mt-4 flex gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.5}
            />
            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Bairro, código ou título..."
              aria-label="Buscar imóveis"
              className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
            />
          </div>
          <button
            type="button"
            onClick={() => setMostrarFiltrosAvancados(true)}
            className={`flex size-10 relative items-center justify-center rounded-full border border-border bg-card shadow-sm transition-brand active:scale-95 ${Object.keys(filtrosAplicados).length > 0
              ? 'text-primary bg-primary/5 border-primary/30'
              : 'text-foreground'
              }`}
          >
            <ListFilter className="size-5" strokeWidth={1.5} />
            {Object.keys(filtrosAplicados).length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-primary border-2 border-card" />
            )}
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setMostrarMenuOrdenacao(!mostrarMenuOrdenacao)}
              className={`flex size-12 items-center justify-center rounded-2xl border border-border bg-card shadow-sm transition-brand active:scale-95 ${ordenacao !== 'padrao' ? 'text-primary border-primary/30 bg-primary/5' : 'text-foreground'
                }`}
              aria-label="Mudar ordenação"
            >
              <ArrowUpDown className="size-5" strokeWidth={1.5} />
            </button>

            {mostrarMenuOrdenacao && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setMostrarMenuOrdenacao(false)} />
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-border bg-card p-2 shadow-xl z-40 animate-in fade-in slide-in-from-top-2 duration-150">
                  {[
                    { id: 'padrao', label: 'Padrão (Relevância)' },
                    { id: 'menor-preco', label: 'Menor Preço' },
                    { id: 'maior-preco', label: 'Maior Preço' },
                    { id: 'maior-area', label: 'Maior Área' },
                  ].map((op) => (
                    <button
                      key={op.id}
                      type="button"
                      onClick={() => {
                        setOrdenacao(op.id as any)
                        setMostrarMenuOrdenacao(false)
                      }}
                      className={`w-full text-left rounded-xl px-3 py-2 text-xs font-medium transition-colors ${ordenacao === op.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-foreground'
                        }`}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Chips de filtro */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-5 px-5 mt-2">
        {filtros.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFiltro(f)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-brand ${filtro === f
              ? 'bg-primary text-primary-foreground'
              : 'border border-border bg-card text-muted-foreground'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards fotográficos — apenas na aba Imóveis */}
      {abaAtiva === 'imoveis' && (
        lista.length === 0 ? (
          filtro === 'Favoritos' ? (
            <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
              <div className="flex size-20 items-center justify-center rounded-3xl bg-primary/10">
                <Heart className="size-10 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">Nenhum imóvel favorito</p>
                <p className="mt-1 text-sm text-muted-foreground px-4">Para favoritar um imóvel, acesse os detalhes dele e toque no ícone de coração no canto superior da tela.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
              <div className="flex size-20 items-center justify-center rounded-3xl bg-primary/10">
                <Search className="size-10 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">Nenhum imóvel encontrado</p>
                <p className="mt-1 text-sm text-muted-foreground px-4">Tente ajustar seus filtros ou termos de busca para encontrar o que procura.</p>
              </div>
            </div>
          )
        ) : (
          <ul className="flex flex-col gap-4">
            {lista.map((im) => (
              <li key={im.id}>
                <button
                  type="button"
                  onClick={() => setSelecionado(im)}
                  className="w-full overflow-hidden rounded-[1.25rem] border-transparent bg-card shadow-soft text-left transition-brand active:scale-[0.98]"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={im.foto || '/placeholder.svg'}
                      alt={`Foto do imóvel: ${im.titulo}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 480px) 100vw, 420px"
                    />
                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold backdrop-blur-sm ${statusStyle[im.status]}`}
                    >
                      {im.status}
                    </span>
                    <div className="absolute right-3 top-3 flex items-center gap-1.5">
                      {favoritosIds.has(im.id) && (
                        <span className="flex size-6 items-center justify-center rounded-full bg-rose-500/90 text-white backdrop-blur-sm shadow-sm">
                          <Heart className="size-3.5 fill-current" strokeWidth={1.5} />
                        </span>
                      )}
                      <span className="rounded-full bg-teal-shadow/70 px-3 py-1 font-mono text-[11px] font-medium text-white backdrop-blur-sm">
                        {im.codigo}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">{im.titulo}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="size-3.5" strokeWidth={1.5} />
                          {im.bairro} · {im.cidade}
                        </p>
                      </div>
                      <p className="shrink-0 font-mono text-base font-semibold text-primary">
                        {im.preco}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <BedDouble className="size-4" strokeWidth={1.5} />
                        {im.dorms}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Bath className="size-4" strokeWidth={1.5} />
                        {im.suites}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Car className="size-4" strokeWidth={1.5} />
                        {im.vagas}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Ruler className="size-4" strokeWidth={1.5} />
                        {im.area} m²
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )
      )}

      {/* Aba Empreendimentos */}
      {abaAtiva === 'empreendimentos' && (
        empreendimentosMock.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
            <div className="flex size-20 items-center justify-center rounded-3xl bg-primary/10">
              <Building2 className="size-10 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-serif text-lg font-semibold text-foreground">Nenhum empreendimento</p>
              <p className="mt-1 text-sm text-muted-foreground">Cadastre seu primeiro empreendimento para gerenciar torres, plantas e cronogramas.</p>
            </div>
            <button
              type="button"
              onClick={() => setMostrarCadastroEmpreendimento(true)}
              className="flex h-12 items-center gap-2 rounded-2xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-brand active:scale-[0.98]"
            >
              <Plus className="size-4" strokeWidth={2} />
              Cadastrar Empreendimento
            </button>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {empreendimentosMock.map(emp => {
              const statusColor =
                emp.status === 'Lançamento' ? 'bg-primary/90 text-white' :
                  emp.status === 'Em Obras' ? 'bg-amber/90 text-ink' :
                    'bg-teal-mid/90 text-white'
              const composicaoDorms = emp.minDorms === emp.maxDorms
                ? `${emp.minDorms} dorm${emp.minDorms > 1 ? 's' : ''}`
                : `${emp.minDorms}–${emp.maxDorms} dorms`
              const composicaoSuites = emp.minSuites === emp.maxSuites
                ? `${emp.minSuites} suíte${emp.minSuites !== 1 ? 's' : ''}`
                : `${emp.minSuites}–${emp.maxSuites} suítes`
              const composicaoVagas = emp.minVagas === emp.maxVagas
                ? `${emp.minVagas} vaga${emp.minVagas > 1 ? 's' : ''}`
                : `${emp.minVagas}–${emp.maxVagas} vagas`

              return (
                <li key={emp.id}>
                  <button
                    type="button"
                    onClick={() => setEmpreendimentoSelecionado(emp)}
                    className="w-full overflow-hidden rounded-[1.25rem] border-transparent bg-card shadow-soft text-left transition-brand active:scale-[0.98]"
                  >
                    <div className="relative aspect-[16/9]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={emp.foto} alt={emp.nome} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {/* Status badge */}
                      <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold backdrop-blur-sm ${statusColor}`}>
                        {emp.status}
                      </span>
                      {/* Finalidade badge */}
                      <span className="absolute right-3 top-3 rounded-full bg-teal-shadow/70 px-3 py-1 font-mono text-[11px] font-medium text-white backdrop-blur-sm">
                        {emp.finalidade}
                      </span>
                      {/* Nome + local over image */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="font-serif text-base font-bold text-white leading-tight">{emp.nome}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-white/80">
                          <Building2 className="size-3.5" strokeWidth={1.5} />
                          {emp.construtora}
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      {/* Location */}
                      <p className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                        <MapPin className="size-3.5" strokeWidth={1.5} />
                        {emp.bairro} · {emp.cidade}
                      </p>

                      {/* Composição min-max */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1.5">
                          <BedDouble className="size-4" strokeWidth={1.5} />
                          {composicaoDorms}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Bath className="size-4" strokeWidth={1.5} />
                          {composicaoSuites}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Car className="size-4" strokeWidth={1.5} />
                          {composicaoVagas}
                        </span>
                      </div>

                      {/* Preço + unidades */}
                      <div className="flex items-end justify-between border-t border-border pt-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">A partir de</p>
                          <p className="font-mono text-base font-bold text-primary">{emp.precoMin}</p>
                        </div>
                        <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                          {emp.unidades} unidades
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        )
      )}

      {mostrarFiltrosAvancados && (
        <FiltrosAvancadosImoveisSheet
          onClose={() => setMostrarFiltrosAvancados(false)}
          filtroFinalidade={filtroFinalidade}
          setFiltroFinalidade={setFiltroFinalidade}
          filtroStatus={filtroStatus}
          setFiltroStatus={setFiltroStatus}
        />
      )}

      {/* Overlay: Cadastro de Empreendimento */}
      {mostrarCadastroEmpreendimento && (
        <div className="absolute inset-0 z-50 bg-background overflow-y-auto">
          <div className="px-5 pt-6 pb-10">
            <FormCaptarEmpreendimento onClose={() => setMostrarCadastroEmpreendimento(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

function ImovelDetail({
  imovel,
  onBack,
  onUpdate,
  isFavorito,
  toggleFavorito
}: {
  imovel: Imovel;
  onBack: () => void;
  onUpdate: (novo: Imovel) => void;
  isFavorito: boolean;
  toggleFavorito: () => void;
}) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [mostrarUpsell, setMostrarUpsell] = useState(false)
  const [upsellSucesso, setUpsellSucesso] = useState(false)
  const [buscaLeadShare, setBuscaLeadShare] = useState('')
  const [mostrarMapa, setMostrarMapa] = useState(false)
  const [mostrarWhatsappModal, setMostrarWhatsappModal] = useState(false)
  const [mostrarAgendaVisita, setMostrarAgendaVisita] = useState(false)
  const [imovelParaVisita, setImovelParaVisita] = useState<Imovel | null>(null)
  const [msgWhatsapp, setMsgWhatsapp] = useState(`Olá ${imovel.proprietario?.nome}, tudo bem?\nSou da imobiliária e gostaria de falar sobre o seu imóvel (${imovel.codigo}).`)
  const [mostrarLigacao, setMostrarLigacao] = useState(false)
  const [mostrarAgendamento, setMostrarAgendamento] = useState(false)

  const clientesCompativeis = atendimentos.filter(a => {
    if (!a.perfil) return false
    if (a.perfil.tipoImovel && imovel.tipoImovel && a.perfil.tipoImovel !== imovel.tipoImovel) return false
    if (a.perfil.finalidade && imovel.finalidade && a.perfil.finalidade !== imovel.finalidade) return false
    if (a.perfil.cidades && a.perfil.cidades.length > 0 && imovel.cidade && !a.perfil.cidades.includes(imovel.cidade)) return false
    return true
  }).slice(0, 3)

  function handleShare(leadName: string) {
    setShowShareMenu(false)
    setToastMessage(`Imóvel enviado para ${leadName}!`)
    setTimeout(() => setToastMessage(''), 3000)
  }

  if (editMode) {
    return (
      <div className="absolute inset-0 z-50 bg-background overflow-y-auto">
        <FormCaptarImovel
          onClose={() => setEditMode(false)}
          imovelParaEditar={imovel}
          onSaveEdit={(novo) => {
            onUpdate(novo)
            setEditMode(false)
          }}
        />
      </div>
    )
  }

  return (
    <>
      {toastMessage && (
        <div className="absolute top-[calc(1rem+env(safe-area-inset-top))] left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-full bg-teal-mid text-white text-sm font-semibold shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-top-5">
          <CheckCircle2 className="size-4 inline-block mr-1.5 align-text-bottom" />
          {toastMessage}
        </div>
      )}
      <div className="absolute inset-0 z-40 bg-background flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex-1 overflow-y-auto pb-8">
          <div className="relative aspect-[4/3] shrink-0">
            <Image
              src={imovel.foto || '/placeholder.svg'}
              alt={`Foto do imóvel: ${imovel.titulo}`}
              fill
              className="object-cover"
              sizes="(max-width: 480px) 100vw, 420px"
              priority
            />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 pt-[calc(1rem+env(safe-area-inset-top))]">
              <button
                type="button"
                onClick={onBack}
                aria-label="Voltar para a lista"
                className="flex size-10 items-center justify-center rounded-full bg-teal-shadow/60 text-white backdrop-blur-sm transition-brand active:scale-95"
              >
                <ArrowLeft className="size-5" strokeWidth={1.5} />
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  aria-label="Editar"
                  className="flex size-10 items-center justify-center rounded-full bg-teal-shadow/60 text-white backdrop-blur-sm transition-brand active:scale-95"
                >
                  <PenLine className="size-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={toggleFavorito}
                  aria-label={isFavorito ? "Remover dos favoritos" : "Favoritar"}
                  className={`flex size-10 items-center justify-center rounded-full backdrop-blur-sm transition-brand active:scale-95 ${isFavorito
                    ? 'bg-rose-500/90 text-white'
                    : 'bg-teal-shadow/60 text-white'
                    }`}
                >
                  <Heart className={`size-5 ${isFavorito ? 'fill-current' : ''}`} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  aria-label="Compartilhar"
                  className="flex size-10 items-center justify-center rounded-full bg-teal-shadow/60 text-white backdrop-blur-sm transition-brand active:scale-95"
                >
                  <Share2 className="size-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          <div className="relative -mt-6 rounded-t-3xl bg-background px-5 pt-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {imovel.codigo} · {imovel.finalidade}
                </p>
                <h1 className="mt-1 font-serif text-xl font-semibold text-foreground text-balance">
                  {imovel.titulo}
                </h1>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-4" strokeWidth={1.5} />
                  {imovel.bairro}, {imovel.cidade}
                </p>
              </div>
            </div>

            <p className="mt-4 font-mono text-2xl font-semibold text-primary">{imovel.preco}</p>

            <div className="mt-5 grid grid-cols-4 gap-2">
              {[
                { icon: BedDouble, label: 'Dorms', valor: imovel.dorms },
                { icon: Bath, label: 'Suítes', valor: imovel.suites },
                { icon: Car, label: 'Vagas', valor: imovel.vagas },
                { icon: Ruler, label: 'Área', valor: `${imovel.area}m²` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card p-3"
                >
                  <item.icon className="size-5 text-primary" strokeWidth={1.5} />
                  <span className="font-mono text-sm font-medium text-foreground">{item.valor}</span>
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {imovel.descricao && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-foreground mb-2">Sobre o imóvel</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {imovel.descricao}
                </p>
              </div>
            )}

            <div className="mt-6 border-t border-border/50 pt-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Detalhes Técnicos</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                {[
                  { label: 'Operação', value: imovel.operacoes?.join(', ') },
                  { label: 'Tipo', value: imovel.tipoImovel },
                  { label: 'Finalidade', value: imovel.finalidade },
                  { label: 'Situação', value: imovel.situacaoImovel },
                  { label: 'Status', value: imovel.status },
                  { label: 'CIB', value: imovel.cib },
                  { label: 'CEP', value: imovel.cep },
                  { label: 'Ano Construção', value: imovel.anoConstrucao },
                  { label: 'Andar', value: imovel.andar },
                  { label: 'Salas', value: imovel.salas },
                  { label: 'Banheiros', value: imovel.banheiros },
                  { label: 'Área Total', value: imovel.areaTotal ? `${imovel.areaTotal}m²` : null },
                  { label: 'Exclusividade', value: imovel.tipoExclusividade && imovel.tipoExclusividade !== 'Nenhuma' ? `${imovel.tipoExclusividade} (Até ${imovel.validadeExclusividade})` : 'Nenhuma' },
                ].filter(i => i.value).map((item) => (
                  <div key={item.label}>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {(imovel.condominio || imovel.iptu) && (
              <div className="mt-6 flex gap-4">
                {imovel.condominio && (
                  <div className="flex-1 rounded-2xl border border-border bg-card p-3">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Condomínio</p>
                    <p className="font-mono text-sm font-semibold text-foreground">{imovel.condominio}</p>
                  </div>
                )}
                {imovel.iptu && (
                  <div className="flex-1 rounded-2xl border border-border bg-card p-3">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">IPTU</p>
                    <p className="font-mono text-sm font-semibold text-foreground">{imovel.iptu}</p>
                  </div>
                )}
              </div>
            )}

            {imovel.tags && imovel.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {imovel.tags.map(tag => (
                  <span key={tag} className="rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {imovel.caracteristicas && imovel.caracteristicas.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Características</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {imovel.caracteristicas.map(carac => (
                    <li key={carac} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="size-4 text-primary" strokeWidth={2} />
                      {carac}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {imovel.proximidades && imovel.proximidades.length > 0 && (
              <div className="mt-6 border-t border-border/50 pt-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">O que tem por perto</h3>
                <ul className="flex flex-col gap-3">
                  {imovel.proximidades.map(prox => (
                    <li key={prox} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="size-4 text-teal-light" strokeWidth={1.5} />
                      {prox}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {imovel.enderecoCompleto && (
              <div className="mt-6 border-t border-border/50 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">Localização</h3>
                  <button type="button" className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary transition-brand active:opacity-70">
                    <Navigation className="size-3.5" strokeWidth={2} />
                    Como chegar
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{imovel.enderecoCompleto}</p>
                {!mostrarMapa ? (
                  <button
                    type="button"
                    onClick={() => setMostrarMapa(true)}
                    className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted border border-border flex flex-col items-center justify-center text-muted-foreground shadow-soft transition-brand hover:opacity-90"
                  >
                    <Map className="size-8 opacity-40 mb-2 text-primary" strokeWidth={1.5} />
                    <span className="text-xs font-semibold text-primary">Tocar para ver o mapa</span>
                  </button>
                ) : (
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border shadow-soft">
                    {/* Imagem estática simulando um mapa do google maps */}
                    <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(imovel.enderecoCompleto)}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${encodeURIComponent(imovel.enderecoCompleto)}&key=YOUR_API_KEY`} alt="Mapa" className="w-full h-full object-cover bg-muted" onError={(e) => { e.currentTarget.src = 'https://developers.google.com/static/maps/images/landing/hero_geocoding_api.png' }} />
                  </div>
                )}
              </div>
            )}

            {imovel.proprietario && (
              <div className="mt-8 mb-6 border border-border rounded-3xl bg-card shadow-soft p-5 overflow-hidden">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  Proprietário
                </p>
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-shadow text-lg font-semibold text-white">
                    {imovel.proprietario.nome.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-base">{imovel.proprietario.nome}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{imovel.proprietario.validade}</p>
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setMostrarWhatsappModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl bg-[#25D366] text-white text-xs font-semibold shadow-sm transition-brand active:scale-[0.98]"
                  >
                    <MessageCircle className="size-4" strokeWidth={2} /> WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setMostrarLigacao(true)}
                    className="flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl border border-border bg-card text-foreground text-xs font-semibold shadow-sm transition-brand active:bg-muted"
                  >
                    <Phone className="size-4" strokeWidth={2} /> Ligar
                  </button>
                </div>

                {upsellSucesso ? (
                  <div className="w-full flex items-center gap-3 rounded-2xl bg-green-50 p-3 border border-green-200">
                    <div className="flex size-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-green-800">Proprietário acionado</p>
                      <p className="text-[10px] text-green-700 truncate">O Albert já iniciou contato via WhatsApp.</p>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMostrarUpsell(true)}
                    className="w-full flex items-center justify-center gap-2 h-11 rounded-2xl bg-amber/15 text-amber-900 border border-amber/30 text-xs font-semibold shadow-sm transition-brand active:scale-[0.98]"
                  >
                    <Bot className="size-4" strokeWidth={2} /> Atualizar com Albert (IA)
                  </button>
                )}
              </div>
            )}

            {clientesCompativeis.length > 0 && (
              <div className="mt-6 border-t border-border/50 pt-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Clientes com perfil compatível</h3>
                <ul className="flex flex-col gap-3">
                  {clientesCompativeis.map(cliente => (
                    <li key={cliente.id} className="flex items-center justify-between rounded-2xl border border-border p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {cliente.iniciais}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{cliente.nome}</p>
                          <p className="text-xs text-muted-foreground">{cliente.etapa}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleShare(cliente.nome)}
                        className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-brand hover:text-primary active:scale-95"
                      >
                        <Share2 className="size-4" strokeWidth={1.5} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>

        <div className="shrink-0 bg-background border-t border-border p-5 pb-[calc(5.25rem+env(safe-area-inset-bottom))] flex flex-col gap-3">
          <button type="button" onClick={() => setMostrarAgendamento(true)} className="w-full flex items-center justify-center gap-2.5 h-14 rounded-full bg-teal-mid text-white text-sm font-semibold shadow-xl shadow-teal-mid/30 transition-transform active:scale-[0.98]">
            <Calendar className="size-5" strokeWidth={2.5} />
            Visitar com cliente
          </button>
          <button type="button" onClick={() => setShowShareMenu(true)} className="w-full flex items-center justify-center gap-2.5 h-14 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold shadow-sm transition-transform active:scale-[0.98]">
            <Share2 className="size-5" strokeWidth={2.5} />
            Compartilhar com Lead
          </button>
        </div>


        {/* Modal Agendamento */}
        {mostrarAgendamento && (
          <div className="absolute inset-0 z-50 flex flex-col justify-end">
            <button type="button" onClick={() => setMostrarAgendamento(false)} className="absolute inset-0 bg-teal-shadow/50 backdrop-blur-[2px]" />
            <div className="relative rounded-t-3xl bg-card p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[90dvh] overflow-y-auto">
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-fog" />
              <FormNovaAtividade
                defaultImoveis={[imovel]}
                onClose={() => setMostrarAgendamento(false)}
                onSalvar={() => {
                  setMostrarAgendamento(false)
                  setToastMessage('Visita agendada com sucesso!')
                  setTimeout(() => setToastMessage(''), 3000)
                }}
              />
            </div>
          </div>
        )}

        {/* Share Bottom Sheet */}
        {showShareMenu && (
          <>
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] animate-in fade-in duration-200" onClick={() => setShowShareMenu(false)} />
            <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl z-[100] animate-in slide-in-from-bottom-full duration-300 pb-[env(safe-area-inset-bottom)]">
              <div className="flex justify-center pt-3 pb-2">
                <div className="h-1.5 w-12 rounded-full bg-border" />
              </div>
              <div className="px-6 py-4">
                <h3 className="text-lg font-serif font-semibold text-foreground mb-4">Compartilhar com qual Lead?</h3>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar lead..."
                    value={buscaLeadShare}
                    onChange={(e) => setBuscaLeadShare(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <ul className="flex flex-col gap-3 max-h-48 overflow-y-auto">
                  {atendimentos
                    .filter(a => a.nome.toLowerCase().includes(buscaLeadShare.toLowerCase()) || (a.telefone && a.telefone.includes(buscaLeadShare)))
                    .slice(0, 5)
                    .map((lead) => (
                    <li key={lead.id}>
                      <button type="button" onClick={() => handleShare(lead.nome)} className="w-full flex items-center justify-between p-4 rounded-2xl bg-muted/40 border border-transparent hover:border-primary/20 active:bg-muted transition-colors text-left">
                        <div>
                          <p className="font-semibold text-foreground text-sm">{lead.nome}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{lead.telefone}</p>
                        </div>
                        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Share2 className="size-4" strokeWidth={2} />
                        </div>
                      </button>
                    </li>
                  ))}
                  {atendimentos.filter(a => a.nome.toLowerCase().includes(buscaLeadShare.toLowerCase()) || (a.telefone && a.telefone.includes(buscaLeadShare))).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-4 gap-3">
                      <p className="text-center text-sm text-muted-foreground">Nenhum lead encontrado.</p>
                      {buscaLeadShare.trim().length > 2 && (
                        <button
                          type="button"
                          onClick={() => {
                            const novoId = `c${Date.now()}`
                            const nomeLead = buscaLeadShare.trim()
                            atendimentos.push({
                              id: novoId,
                              nome: nomeLead,
                              iniciais: nomeLead.substring(0, 2).toUpperCase(),
                              telefone: '',
                              email: '',
                              etapa: 'novo',
                              temperatura: 'frio',
                              status: 'aberto',
                              origem: 'Whatsapp',
                              dataEntrada: 'Hoje',
                              ultimaInteracao: 'Agora',
                              interesse: 'Indefinido',
                              valor: '',
                              modo: 'venda',
                              funilId: 'f1',
                              perfil: { finalidade: '', tipoImovel: '', cidades: [], bairros: [], quartos: null, suites: null, vagas: null, areaMin: null, areaMax: null, valorMin: '', valorMax: '', andar: '', lazer: false, varanda: false, mobiliado: false, aceitaFinanciamento: false },
                              notas: [],
                              atividades: [],
                              emails: [],
                              documentos: [],
                              imoveisEnviados: [],
                              timeline: [{ data: 'Hoje, Agora', evento: 'Lead cadastrado via Compartilhamento', tipo: 'origem' }],
                              albert: { status: 'idle' }
                            })
                            window.dispatchEvent(new CustomEvent('app-data-updated'))
                            handleShare(nomeLead)
                          }}
                          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-brand active:scale-95"
                        >
                          <Plus className="size-4" strokeWidth={2.5} />
                          Cadastrar "{buscaLeadShare}"
                        </button>
                      )}
                    </div>
                  )}
                </ul>
                <button type="button" onClick={() => handleShare('WhatsApp (Outro)')} className="mt-4 w-full flex items-center justify-center gap-2 h-12 rounded-2xl border border-border bg-background text-sm font-semibold text-foreground active:bg-muted">
                  <MessageCircle className="size-4" /> Enviar para WhatsApp não salvo
                </button>
              </div>
            </div>
          </>
        )}

        {/* IA Upsell */}
        {mostrarUpsell && (
          <div className="absolute inset-0 z-50 overflow-y-auto bg-background">
            <IAUpsellPage
              origem="imovel"
              onClose={() => setMostrarUpsell(false)}
              onSuccess={() => {
                setMostrarUpsell(false)
                setUpsellSucesso(true)
              }}
            />
          </div>
        )}

        {/* WhatsApp Editor Modal */}
        {mostrarWhatsappModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMostrarWhatsappModal(false)} />
            <div className="relative w-full max-w-sm rounded-3xl bg-card p-5 shadow-2xl border border-border animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                    <MessageCircle className="size-4" />
                  </div>
                  <h3 className="font-semibold text-foreground">Mensagem WhatsApp</h3>
                </div>
                <button type="button" onClick={() => setMostrarWhatsappModal(false)} className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground">
                  <X className="size-4" />
                </button>
              </div>

              <textarea
                value={msgWhatsapp}
                onChange={(e) => setMsgWhatsapp(e.target.value)}
                className="w-full h-32 resize-none rounded-2xl border border-border bg-background p-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 mb-4"
                placeholder="Digite sua mensagem..."
              />

              <button
                type="button"
                onClick={() => {
                  setMostrarWhatsappModal(false)
                  setToastMessage('Redirecionando para o WhatsApp...')
                  setTimeout(() => setToastMessage(''), 3000)
                }}
                className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl bg-[#25D366] text-white font-semibold text-sm transition-transform active:scale-[0.98]"
              >
                Abrir WhatsApp
              </button>
            </div>
          </div>
        )}

        {/* Calling Screen */}
        {mostrarLigacao && (
          <div className="absolute inset-0 z-[100] bg-zinc-900 flex flex-col justify-between animate-in fade-in slide-in-from-bottom">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-zinc-800 text-4xl text-zinc-300">
                {imovel.proprietario?.nome.substring(0, 2).toUpperCase()}
              </div>
              <h2 className="text-2xl font-medium text-white mb-2">{imovel.proprietario?.nome}</h2>
              <p className="text-zinc-400">Chamando...</p>
            </div>
            <div className="p-10 flex items-center justify-center gap-8 pb-16">
              <button type="button" className="flex size-14 items-center justify-center rounded-full bg-zinc-800 text-white transition-transform active:scale-90">
                <Mic className="size-6" />
              </button>
              <button
                type="button"
                onClick={() => setMostrarLigacao(false)}
                className="flex size-16 items-center justify-center rounded-full bg-red-500 text-white transition-transform active:scale-90 shadow-lg shadow-red-500/20"
              >
                <PhoneOff className="size-7" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
