'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import {
  ArrowLeft,
  Bath,
  BedDouble,
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
  SlidersHorizontal,
  Plus,
  ArrowUpDown
} from 'lucide-react'
import { imoveis, type Imovel } from '@/lib/app-data'
import { FiltrosAvancadosImoveisSheet } from '@/components/app/filtros-avancados-imoveis-sheet'

const filtros = ['Todos', 'Venda', 'Locação', 'Livre', 'Reservado'] as const

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
  
  const [mostrarFiltrosAvancados, setMostrarFiltrosAvancados] = useState(false)
  const [filtroFinalidade, setFiltroFinalidade] = useState('Todas')
  const [filtroStatus, setFiltroStatus] = useState('Todos')

  const lista = useMemo(() => {
    return imoveis.filter((im) => {
      const matchFiltro =
        filtro === 'Todos' ||
        im.finalidade === filtro ||
        im.status === filtro
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
  }, [filtro, busca, filtroFinalidade, filtroStatus])

  if (selecionado) {
    return <ImovelDetail imovel={selecionado} onBack={() => setSelecionado(null)} />
  }

  return (
    <div className="flex flex-col gap-4 px-5 pt-4 pb-28">
      <header className="glass-header -mx-5 px-5 pb-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button
              onClick={() => setAbaAtiva('imoveis')}
              className={`font-serif text-2xl font-semibold transition-colors ${abaAtiva === 'imoveis' ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              Imóveis
            </button>
            <button
              onClick={() => setAbaAtiva('empreendimentos')}
              className={`font-serif text-2xl font-semibold transition-colors ${abaAtiva === 'empreendimentos' ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              Empreendimentos
            </button>
          </div>
          {onCaptar && (
            <button
              type="button"
              onClick={onCaptar}
              aria-label="Captar novo imóvel"
              className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-brand active:scale-95"
            >
              <Plus className="size-5" />
            </button>
          )}
        </div>
        
        {abaAtiva === 'imoveis' && (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {lista.length} na carteira
          </p>
        )}

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
            className={`flex size-12 items-center justify-center rounded-2xl border transition-brand active:scale-95 shadow-sm ${
              filtroFinalidade !== 'Todas' || filtroStatus !== 'Todos'
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            <SlidersHorizontal className="size-5" strokeWidth={1.5} />
            {(filtroFinalidade !== 'Todas' || filtroStatus !== 'Todos') && (
              <span className="absolute -right-1 -top-1 flex size-3 items-center justify-center rounded-full bg-red-500 text-[8px] text-white ring-2 ring-background" />
            )}
          </button>
          <button
            type="button"
            className="flex size-12 items-center justify-center rounded-2xl border border-border bg-card shadow-sm text-foreground transition-brand active:scale-95"
            aria-label="Mudar ordenação"
          >
            <ArrowUpDown className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Chips de filtro */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-5 px-5 mt-2">
        {filtros.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFiltro(f)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-brand ${
              filtro === f
                ? 'bg-primary text-primary-foreground'
                : 'border border-border bg-card text-muted-foreground'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards fotográficos */}
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
                <span className="absolute right-3 top-3 rounded-full bg-teal-shadow/70 px-3 py-1 font-mono text-[11px] font-medium text-white backdrop-blur-sm">
                  {im.codigo}
                </span>
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
      
      {mostrarFiltrosAvancados && (
        <FiltrosAvancadosImoveisSheet
          onClose={() => setMostrarFiltrosAvancados(false)}
          filtroFinalidade={filtroFinalidade}
          setFiltroFinalidade={setFiltroFinalidade}
          filtroStatus={filtroStatus}
          setFiltroStatus={setFiltroStatus}
        />
      )}
    </div>
  )
}

function ImovelDetail({ imovel, onBack }: { imovel: Imovel; onBack: () => void }) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  function handleShare(leadName: string) {
    setShowShareMenu(false)
    setToastMessage(`Imóvel enviado para ${leadName}!`)
    setTimeout(() => setToastMessage(''), 3000)
  }

  return (
    <>
      {toastMessage && (
        <div className="absolute top-[calc(1rem+env(safe-area-inset-top))] left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-full bg-teal-mid text-white text-sm font-semibold shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-top-5">
          <CheckCircle2 className="size-4 inline-block mr-1.5 align-text-bottom" />
          {toastMessage}
        </div>
      )}
      <div className="flex flex-col pb-32">
      <div className="relative aspect-[4/3]">
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
              aria-label="Favoritar"
              className="flex size-10 items-center justify-center rounded-full bg-teal-shadow/60 text-white backdrop-blur-sm transition-brand active:scale-95"
            >
              <Heart className="size-5" strokeWidth={1.5} />
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
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted/30 border border-border flex flex-col items-center justify-center text-muted-foreground shadow-soft">
              <Map className="size-8 opacity-20 mb-2" strokeWidth={1.5} />
              <span className="text-xs font-medium opacity-50">Mapa não carregado</span>
            </div>
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
              <button className="flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl bg-primary text-primary-foreground text-xs font-semibold shadow-sm transition-brand active:scale-[0.98]">
                <MessageCircle className="size-4" strokeWidth={2} /> WhatsApp
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl border border-border bg-card text-foreground text-xs font-semibold shadow-sm transition-brand active:bg-muted">
                <Phone className="size-4" strokeWidth={2} /> Ligar
              </button>
            </div>

            <button className="w-full flex items-center justify-center gap-2 h-11 rounded-2xl bg-amber/15 text-amber-900 border border-amber/30 text-xs font-semibold shadow-sm transition-brand active:scale-[0.98]">
              <Bot className="size-4" strokeWidth={2} /> Atualizar com Albert (IA)
            </button>
          </div>
        )}
      </div>

      {/* Sticky Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] bg-background/90 backdrop-blur-md border-t border-border/50 z-20 flex gap-3 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.05)]">
        <button type="button" onClick={() => setShowShareMenu(true)} className="flex-1 flex items-center justify-center gap-2.5 h-14 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-xl shadow-primary/30 transition-transform active:scale-[0.98]">
          <Share2 className="size-5" strokeWidth={2.5} /> 
          Compartilhar com Lead
        </button>
      </div>

      {/* Share Bottom Sheet */}
      {showShareMenu && (
        <>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-40 animate-in fade-in duration-200" onClick={() => setShowShareMenu(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl z-50 animate-in slide-in-from-bottom-full duration-300 pb-[env(safe-area-inset-bottom)]">
            <div className="flex justify-center pt-3 pb-2">
              <div className="h-1.5 w-12 rounded-full bg-border" />
            </div>
            <div className="px-6 py-4">
              <h3 className="text-lg font-serif font-semibold text-foreground mb-4">Compartilhar com qual Lead?</h3>
              <ul className="flex flex-col gap-3">
                {[
                  { nome: 'Mariana Costa', fone: '(11) 98765-4321' },
                  { nome: 'Roberto Alves', fone: '(11) 99123-4567' },
                  { nome: 'Luciana Mendes', fone: '(11) 91111-2222' }
                ].map((lead) => (
                  <li key={lead.nome}>
                    <button type="button" onClick={() => handleShare(lead.nome)} className="w-full flex items-center justify-between p-4 rounded-2xl bg-muted/40 border border-transparent hover:border-primary/20 active:bg-muted transition-colors text-left">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{lead.nome}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{lead.fone}</p>
                      </div>
                      <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Share2 className="size-4" strokeWidth={2} />
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => handleShare('WhatsApp (Outro)')} className="mt-4 w-full flex items-center justify-center gap-2 h-12 rounded-2xl border border-border bg-background text-sm font-semibold text-foreground active:bg-muted">
                <MessageCircle className="size-4" /> Enviar para WhatsApp não salvo
              </button>
            </div>
          </div>
        </>
      )}
    </div>
    </>
  )
}
