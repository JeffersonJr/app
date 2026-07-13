'use client'

import { useState, useEffect } from 'react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  Play,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  Zap,
  Globe
} from 'lucide-react'

type Rede = {
  id: string
  nome: string
  icon: React.ReactNode
  cor: string
  bgCor: string
  formatos: string[]
  descricao: string
}

const redes: Rede[] = [
  {
    id: 'instagram',
    nome: 'Instagram',
    icon: (
      <svg className="size-6 fill-white" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
    cor: 'text-white',
    bgCor: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
    formatos: ['Carrossel', 'Story', 'Reels'],
    descricao: 'Carrossel de fotos + geração automática de Reels pela Albert IA'
  },
  {
    id: 'tiktok',
    nome: 'TikTok',
    icon: (
      <svg className="size-6 fill-white" viewBox="0 0 32 32">
        <path d="M28 13.4a14.4 14.4 0 0 1-8.4-2.7v12.3A10.3 10.3 0 1 1 9.3 12.7v5.7a4.8 4.8 0 1 0 3.4 4.6V4h5.5a8.9 8.9 0 0 0 5.8 8.2V13.4z"/>
      </svg>
    ),
    cor: 'text-white',
    bgCor: 'bg-[#010101]',
    formatos: ['Vídeo', 'Foto'],
    descricao: 'Vídeo tour do imóvel gerado automaticamente com trilha sonora trending'
  },
  {
    id: 'youtube',
    nome: 'YouTube Shorts',
    icon: <Play className="size-6 fill-white" />,
    cor: 'text-white',
    bgCor: 'bg-[#FF0000]',
    formatos: ['Shorts', 'Vídeo'],
    descricao: 'Tour em vídeo curto (60s) otimizado para o algoritmo do YouTube'
  },
  {
    id: 'whatsapp',
    nome: 'WhatsApp',
    icon: <MessageCircle className="size-6" />,
    cor: 'text-white',
    bgCor: 'bg-[#25D366]',
    formatos: ['Mensagem', 'Status'],
    descricao: 'Envio para lista de broadcasts e atualização de Status automática'
  },
  {
    id: 'olx',
    nome: 'OLX',
    icon: <Globe className="size-6" />,
    cor: 'text-white',
    bgCor: 'bg-[#7B01BD]',
    formatos: ['Anúncio'],
    descricao: 'Publicação de anúncio completo com fotos e descrição automática'
  },
  {
    id: 'zap',
    nome: 'ZAP Imóveis',
    icon: <Globe className="size-6" />,
    cor: 'text-white',
    bgCor: 'bg-[#E21E26]',
    formatos: ['Portal'],
    descricao: 'Sincronização com portal ZAP Imóveis com ficha completa do imóvel'
  },
]

type Passo = 'selecionar-redes' | 'configurar-post' | 'publicando' | 'concluido'

type ItemPublicacao = {
  id: string
  titulo: string
  foto: string
  tipo: 'imovel' | 'empreendimento'
  preco?: string
  bairro?: string
  cidade?: string
}

export function PublicacaoFlowSheet({
  itens,
  onClose,
}: {
  itens: ItemPublicacao[]
  onClose: () => void
}) {
  const [passo, setPasso] = useState<Passo>('selecionar-redes')
  const [redesSelecionadas, setRedesSelecionadas] = useState<Set<string>>(new Set(['instagram', 'tiktok']))
  const [legendas, setLegendas] = useState<Record<string, string>>({})
  const [formatosSelecionados, setFormatosSelecionados] = useState<Record<string, string>>({
    instagram: 'Carrossel',
    tiktok: 'Vídeo',
    youtube: 'Shorts',
    whatsapp: 'Mensagem',
    olx: 'Anúncio',
    zap: 'Portal',
  })
  const [gerandoLegenda, setGerandoLegenda] = useState<string | null>(null)
  const [progressoPublicacao, setProgressoPublicacao] = useState<Record<string, 'aguardando' | 'publicando' | 'concluido' | 'erro'>>({})
  const [redeSelecionadaPreview, setRedeSelecionadaPreview] = useState<string>('instagram')

  const redesAtivas = redes.filter(r => redesSelecionadas.has(r.id))

  function toggleRede(id: string) {
    const newSet = new Set(redesSelecionadas)
    if (newSet.has(id)) {
      if (newSet.size === 1) return
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setRedesSelecionadas(newSet)
  }

  function gerarLegendaIA(redeId: string) {
    setGerandoLegenda(redeId)
    const item = itens[0]
    const legendasExemplo: Record<string, string> = {
      instagram: `✨ Novo imóvel disponível!\n\n${item?.titulo || 'Imóvel exclusivo'} em ${item?.bairro || 'localização privilegiada'}, ${item?.cidade || ''}\n\n💰 ${item?.preco || 'Consulte o valor'}\n\nMorar bem é uma escolha. Agende sua visita! 🏡\n\n#imoveis #imoveisdossonhos #imobiliariaevolves`,
      tiktok: `🏠 Você precisa ver esse imóvel! ${item?.titulo || ''} em ${item?.bairro || ''}. Comenta aí se quer mais informações! #imovel #imoveistiktok #casanova`,
      youtube: `Tour completo pelo ${item?.titulo || 'imóvel'} em ${item?.bairro || ''}, ${item?.cidade || ''}. Imóvel à venda por ${item?.preco || ''}. Entre em contato para mais informações e agendamento de visitas.`,
      whatsapp: `🏠 *${item?.titulo || 'Novo Imóvel'}*\n📍 ${item?.bairro || ''}, ${item?.cidade || ''}\n💰 ${item?.preco || ''}\n\nAcabou de entrar no nosso portfólio! Entre em contato para agendar sua visita.`,
      olx: `${item?.titulo || 'Imóvel'}\n\nLocalização: ${item?.bairro || ''}, ${item?.cidade || ''}\nPreço: ${item?.preco || ''}\n\nImóvel em excelente estado, bem localizado. Entre em contato para mais informações.`,
      zap: `${item?.titulo || 'Imóvel'} disponível para venda. ${item?.bairro || ''}, ${item?.cidade || ''}. Valor: ${item?.preco || ''}. Excelente localização.`,
    }
    setTimeout(() => {
      setLegendas(prev => ({ ...prev, [redeId]: legendasExemplo[redeId] || '' }))
      setGerandoLegenda(null)
    }, 1500)
  }

  function iniciarPublicacao() {
    setPasso('publicando')
    const redeIds = Array.from(redesSelecionadas)
    const progressoInicial: Record<string, 'aguardando' | 'publicando' | 'concluido' | 'erro'> = {}
    redeIds.forEach(id => { progressoInicial[id] = 'aguardando' })
    setProgressoPublicacao(progressoInicial)

    redeIds.forEach((id, index) => {
      setTimeout(() => {
        setProgressoPublicacao(prev => ({ ...prev, [id]: 'publicando' }))
        setTimeout(() => {
          setProgressoPublicacao(prev => ({ ...prev, [id]: 'concluido' }))
          if (index === redeIds.length - 1) {
            setTimeout(() => setPasso('concluido'), 600)
          }
        }, 1800 + Math.random() * 800)
      }, index * 1200)
    })
  }

  useEffect(() => {
    if (passo === 'configurar-post') {
      const firstRede = Array.from(redesSelecionadas)[0]
      setRedeSelecionadaPreview(firstRede)
      redesSelecionadas.forEach(redeId => {
        if (!legendas[redeId]) gerarLegendaIA(redeId)
      })
    }
  }, [passo])

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-background animate-in fade-in duration-200">

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border/50 bg-background shrink-0">
        {passo === 'configurar-post' && (
          <button
            onClick={() => setPasso('selecionar-redes')}
            className="flex size-9 items-center justify-center rounded-full bg-muted/60 text-muted-foreground hover:bg-muted transition-all active:scale-95"
          >
            <ChevronLeft className="size-5" />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="font-serif text-lg font-bold text-foreground">
            {passo === 'selecionar-redes' && 'Publicar Imóveis'}
            {passo === 'configurar-post' && 'Configurar Posts'}
            {passo === 'publicando' && 'Publicando...'}
            {passo === 'concluido' && 'Publicado! 🎉'}
          </h2>
          <p className="text-xs text-muted-foreground truncate">
            {passo === 'selecionar-redes' && `${itens.length} item(ns) selecionado(s)`}
            {passo === 'configurar-post' && `${redesSelecionadas.size} rede(s) selecionada(s)`}
            {passo === 'publicando' && 'Albert IA está gerando e publicando...'}
            {passo === 'concluido' && 'Tudo publicado com sucesso!'}
          </p>
        </div>
        {passo !== 'publicando' && (
          <button
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full bg-muted/60 text-muted-foreground hover:bg-muted transition-all active:scale-95"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      {/* PASSO 1: SELECIONAR REDES */}
      {passo === 'selecionar-redes' && (
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-4 border-b border-border/30">
            <p className="text-xs text-muted-foreground font-medium mb-2">Itens selecionados:</p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {itens.map(item => (
                <div key={item.id} className="shrink-0 relative w-16 h-16 rounded-xl overflow-hidden border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.foto} alt={item.titulo} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Onde deseja publicar?</p>
            <div className="flex flex-col gap-3">
              {redes.map(rede => {
                const selecionada = redesSelecionadas.has(rede.id)
                return (
                  <button
                    key={rede.id}
                    type="button"
                    onClick={() => toggleRede(rede.id)}
                    className={`flex items-center gap-4 rounded-2xl p-4 border-2 text-left transition-all active:scale-[0.98] ${
                      selecionada
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border bg-card hover:border-primary/30'
                    }`}
                  >
                    <div className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${rede.bgCor} ${rede.cor} shadow-md`}>
                      {rede.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{rede.nome}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-2">{rede.descricao}</p>
                      <div className="flex gap-1 mt-1.5 flex-wrap">
                        {rede.formatos.map(f => (
                          <span key={f} className="text-[10px] font-semibold bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{f}</span>
                        ))}
                      </div>
                    </div>
                    <div className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      selecionada ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                    }`}>
                      {selecionada && <Check className="size-3.5 text-white" strokeWidth={3} />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* PASSO 2: CONFIGURAR POST */}
      {passo === 'configurar-post' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex gap-2 overflow-x-auto px-5 pt-4 pb-3 border-b border-border/30 scrollbar-none shrink-0">
            {redesAtivas.map(rede => (
              <button
                key={rede.id}
                onClick={() => setRedeSelecionadaPreview(rede.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-bold transition-all active:scale-95 ${
                  redeSelecionadaPreview === rede.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {rede.nome}
                {legendas[rede.id]
                  ? <span className="size-1.5 rounded-full bg-green-400" />
                  : <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
                }
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {redesAtivas.filter(r => r.id === redeSelecionadaPreview).map(rede => (
              <div key={rede.id} className="flex flex-col gap-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <div className={`flex size-10 items-center justify-center rounded-2xl ${rede.bgCor} ${rede.cor} shadow-md`}>
                    {rede.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{rede.nome}</p>
                    <select
                      value={formatosSelecionados[rede.id]}
                      onChange={e => setFormatosSelecionados(prev => ({ ...prev, [rede.id]: e.target.value }))}
                      className="mt-0.5 text-xs bg-muted border border-border rounded-lg px-2 py-1 text-foreground focus:outline-none"
                    >
                      {rede.formatos.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                </div>

                {/* Preview do post */}
                <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
                  <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-border/50">
                    <div className={`size-8 rounded-full ${rede.bgCor} ${rede.cor} flex items-center justify-center shrink-0`}>
                      <span className="text-[10px] font-black">EV</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-foreground">evolves.prime</p>
                      <p className="text-[10px] text-muted-foreground">{rede.nome}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rede.bgCor} ${rede.cor}`}>
                      {formatosSelecionados[rede.id]}
                    </span>
                  </div>

                  <div className={`relative bg-muted overflow-hidden ${
                    rede.id === 'tiktok' || (rede.id === 'youtube' && formatosSelecionados[rede.id] === 'Shorts') ? 'aspect-[9/16]' : 'aspect-[4/3]'
                  }`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={itens[0]?.foto} alt="preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {(rede.id === 'tiktok' || rede.id === 'youtube') && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="size-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                          <Play className="size-7 text-white fill-white ml-1" />
                        </div>
                      </div>
                    )}

                    {rede.id === 'instagram' && formatosSelecionados[rede.id] === 'Carrossel' && (
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                        {[0, 1, 2].map(i => (
                          <div key={i} className={`h-1.5 rounded-full ${i === 0 ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`} />
                        ))}
                      </div>
                    )}

                    <div className="absolute top-3 left-3">
                      <span className="flex items-center gap-1 text-[10px] font-bold bg-black/60 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                        <Sparkles className="size-3 text-amber-400" />
                        Albert IA
                      </span>
                    </div>

                    {itens.length > 1 && (
                      <div className="absolute bottom-3 right-3 flex gap-1">
                        {itens.slice(0, 3).map((item, i) => (
                          <div key={i} className="size-8 rounded-lg overflow-hidden border-2 border-white/80">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.foto} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {itens.length > 3 && (
                          <div className="size-8 rounded-lg bg-black/70 border-2 border-white/80 flex items-center justify-center text-white text-[10px] font-bold">
                            +{itens.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    {gerandoLegenda === rede.id ? (
                      <div className="flex items-center gap-2 py-2">
                        <svg className="size-4 animate-spin text-primary shrink-0" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span className="text-xs text-muted-foreground italic">Albert gerando legenda personalizada...</span>
                      </div>
                    ) : (
                      <textarea
                        value={legendas[rede.id] || ''}
                        onChange={e => setLegendas(prev => ({ ...prev, [rede.id]: e.target.value }))}
                        placeholder="Legenda do post..."
                        className="w-full text-xs text-foreground resize-none focus:outline-none bg-transparent placeholder:text-muted-foreground min-h-[80px]"
                        rows={5}
                      />
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => gerarLegendaIA(rede.id)}
                    disabled={gerandoLegenda === rede.id}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 py-3 text-xs font-bold text-primary transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Sparkles className="size-4" />
                    {gerandoLegenda === rede.id ? 'Gerando...' : 'Regerar com Albert'}
                  </button>
                  <button
                    onClick={() => setLegendas(prev => ({ ...prev, [rede.id]: '' }))}
                    className="flex size-12 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground active:scale-95"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                  <Clock className="size-5 text-muted-foreground shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Agendar publicação</p>
                    <p className="text-xs text-muted-foreground">Deixe o Albert escolher o melhor horário</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PASSO 3: PUBLICANDO */}
      {passo === 'publicando' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-8">
          <div className="relative flex size-24 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="size-12 text-primary animate-pulse" />
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
          </div>
          <div className="text-center">
            <h3 className="font-serif text-xl font-bold text-foreground">Albert está trabalhando</h3>
            <p className="text-sm text-muted-foreground mt-1">Gerando conteúdo e publicando nas redes...</p>
          </div>

          <div className="w-full flex flex-col gap-3">
            {redesAtivas.map(rede => {
              const status = progressoPublicacao[rede.id] || 'aguardando'
              return (
                <div
                  key={rede.id}
                  className={`flex items-center gap-4 rounded-2xl p-4 border-2 transition-all duration-500 ${
                    status === 'concluido' ? 'border-green-500/40 bg-green-500/5' :
                    status === 'publicando' ? 'border-primary/40 bg-primary/5' :
                    'border-border bg-card'
                  }`}
                >
                  <div className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${rede.bgCor} ${rede.cor} shadow-md`}>
                    {rede.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">{rede.nome}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {status === 'aguardando' && 'Aguardando...'}
                      {status === 'publicando' && 'Gerando e publicando...'}
                      {status === 'concluido' && 'Publicado com sucesso!'}
                      {status === 'erro' && 'Erro ao publicar'}
                    </p>
                  </div>
                  <div className="shrink-0">
                    {status === 'aguardando' && <div className="size-6 rounded-full border-2 border-border" />}
                    {status === 'publicando' && (
                      <svg className="size-6 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {status === 'concluido' && <CheckCircle2 className="size-6 text-green-500" />}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* PASSO 4: CONCLUÍDO */}
      {passo === 'concluido' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 size-24 bg-green-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative flex size-24 items-center justify-center rounded-full bg-green-500/10 border-2 border-green-500/30">
              <CheckCircle2 className="size-12 text-green-500" />
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-foreground">Tudo publicado!</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {itens.length} imóvel(is) publicado(s) em {redesAtivas.length} rede(s) social(is) com sucesso.
            </p>
          </div>

          <div className="w-full flex flex-wrap gap-2 justify-center">
            {redesAtivas.map(rede => (
              <div key={rede.id} className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
                <div className={`flex size-5 items-center justify-center rounded-full ${rede.bgCor} ${rede.cor}`}>
                  <span className="scale-[0.6]">{rede.icon}</span>
                </div>
                <span className="text-xs font-semibold text-foreground">{rede.nome}</span>
                <CheckCircle2 className="size-3.5 text-green-500" />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-primary/5 border border-primary/20 p-4 text-left w-full">
            <Zap className="size-5 text-primary shrink-0" />
            <div>
              <p className="text-xs font-bold text-foreground">Engajamento previsto pelo Albert</p>
              <p className="text-xs text-muted-foreground mt-0.5">+340 visualizações · +28 interações · 3-5 leads potenciais</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full h-14 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 transition-all active:scale-95"
          >
            Concluir
          </button>
        </div>
      )}

      {/* FOOTER */}
      {(passo === 'selecionar-redes' || passo === 'configurar-post') && (
        <div className="shrink-0 border-t border-border bg-background px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          {passo === 'selecionar-redes' && (
            <button
              onClick={() => setPasso('configurar-post')}
              disabled={redesSelecionadas.size === 0}
              className="w-full flex items-center justify-center gap-2.5 h-14 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <ChevronRight className="size-5" />
              Próximo: Configurar Posts ({redesSelecionadas.size} rede{redesSelecionadas.size > 1 ? 's' : ''})
            </button>
          )}
          {passo === 'configurar-post' && (
            <button
              onClick={iniciarPublicacao}
              className="w-full flex items-center justify-center gap-2.5 h-14 rounded-full bg-gradient-to-r from-primary to-teal-deep text-white font-bold text-sm shadow-lg shadow-primary/30 transition-all active:scale-[0.98]"
            >
              <Send className="size-5" />
              Publicar Agora em {redesSelecionadas.size} rede{redesSelecionadas.size > 1 ? 's' : ''}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
