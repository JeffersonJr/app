'use client'

import { useState } from 'react'
import {
  ArrowLeft, Bath, BedDouble, Building2, Car, MapPin, Search, Share2,
  Check, Phone, MessageCircle, Bot, PenLine, X, Mic, PhoneOff, CheckCircle2, ChevronRight
} from 'lucide-react'
import type { Empreendimento } from '@/lib/empreendimentos-data'
import { IAUpsellPage } from '@/components/app/ia-upsell-page'

export function EmpreendimentoDetail({ emp, onBack }: { emp: Empreendimento; onBack: () => void }) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [mostrarUpsell, setMostrarUpsell] = useState(false)
  const [upsellSucesso, setUpsellSucesso] = useState(false)
  const [mostrarWhatsappModal, setMostrarWhatsappModal] = useState(false)
  const [msgWhatsapp, setMsgWhatsapp] = useState(`Olá ${emp.contatos?.[0]?.nome}, tudo bem?\nGostaria de saber mais sobre o ${emp.nome}.`)
  const [mostrarLigacao, setMostrarLigacao] = useState(false)

  function handleShare(leadName: string) {
    setShowShareMenu(false)
    setToastMessage(`Empreendimento enviado para ${leadName}!`)
    setTimeout(() => setToastMessage(''), 3000)
  }

  const statusColor =
    emp.status === 'Lançamento' ? 'bg-primary/90 text-white' :
    emp.status === 'Em Obras' ? 'bg-amber/90 text-ink' :
    'bg-teal-mid/90 text-white'

  return (
    <div className="absolute inset-0 z-40 bg-background flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
      {toastMessage && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[60] animate-in fade-in slide-in-from-top-4">
          <div className="rounded-full bg-black/80 px-4 py-2 text-sm font-semibold text-white shadow-lg flex items-center gap-2">
            <Check className="size-4 text-green-400" />
            {toastMessage}
          </div>
        </div>
      )}

      {/* Header and Image */}
      <div className="relative h-72 shrink-0">
        <button
          onClick={onBack}
          type="button"
          className="absolute left-5 top-5 z-20 flex size-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-transform active:scale-90"
        >
          <ArrowLeft className="size-5" />
        </button>
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={emp.foto} alt={emp.nome} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <span className={`absolute right-5 top-5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${statusColor}`}>
          {emp.status}
        </span>

        <div className="absolute bottom-5 left-5 right-5">
          <h1 className="font-serif text-2xl font-bold text-white mb-1 leading-tight">{emp.nome}</h1>
          <p className="flex items-center gap-1.5 text-sm text-white/80">
            <Building2 className="size-4" /> {emp.construtora}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-32">
        {/* Basic Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4 text-primary" /> {emp.bairro}, {emp.cidade}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-xs">
              <Search className="size-3.5" /> Código: {emp.codigo}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">A partir de</p>
            <p className="font-mono text-xl font-bold text-primary">{emp.precoMin}</p>
          </div>
        </div>

        {/* Units / Composition Info */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-muted/50 py-3">
            <BedDouble className="size-5 text-primary" strokeWidth={1.5} />
            <span className="text-[11px] font-semibold text-foreground">
              {emp.minDorms === emp.maxDorms ? emp.minDorms : `${emp.minDorms}-${emp.maxDorms}`} dorms
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-muted/50 py-3">
            <Bath className="size-5 text-primary" strokeWidth={1.5} />
            <span className="text-[11px] font-semibold text-foreground">
              {emp.minSuites === emp.maxSuites ? emp.minSuites : `${emp.minSuites}-${emp.maxSuites}`} suítes
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-muted/50 py-3">
            <Car className="size-5 text-primary" strokeWidth={1.5} />
            <span className="text-[11px] font-semibold text-foreground">
              {emp.minVagas === emp.maxVagas ? emp.minVagas : `${emp.minVagas}-${emp.maxVagas}`} vagas
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-muted/50 py-3">
            <Building2 className="size-5 text-primary" strokeWidth={1.5} />
            <span className="text-[11px] font-semibold text-foreground">{emp.unidades} unid.</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-2">Sobre o Empreendimento</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{emp.descricao}</p>
        </div>

        {/* Torres e Plantas */}
        {emp.torres && emp.torres.length > 0 && (
          <div className="mb-6">
            <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Plantas e Valores</h3>
            <div className="flex flex-col gap-3">
              {emp.torres.map((torre, tIdx) => (
                <div key={tIdx} className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between mb-3 border-b border-border pb-3">
                    <p className="font-semibold text-foreground">{torre.nome}</p>
                    <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground uppercase tracking-widest">{torre.status}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {torre.plantas.map((planta, pIdx) => (
                      <div key={pIdx} className="flex flex-col rounded-xl bg-muted/30 p-3">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-semibold text-foreground">{planta.nome} ({planta.areaUtil}m²)</p>
                          <p className="font-mono text-sm font-bold text-primary">{planta.valor}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground">
                          <span className="rounded bg-background px-1.5 py-0.5 border border-border">Tipo: {planta.tipo}</span>
                          <span className="rounded bg-background px-1.5 py-0.5 border border-border">{planta.quartos} dorms</span>
                          <span className="rounded bg-background px-1.5 py-0.5 border border-border">{planta.banheiros} banheiros</span>
                          <span className="rounded bg-background px-1.5 py-0.5 border border-border">{planta.vagasGaragem} vagas</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Infraestrutura */}
        <div className="mb-8">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Lazer e Infraestrutura</h3>
          <div className="flex flex-wrap gap-2">
            {emp.caracteristicas.map((c) => (
              <span key={c} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Cronograma de Obras */}
        {emp.cronograma && emp.cronograma.length > 0 && (
          <div className="mb-8">
            <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Cronograma de Obras</h3>
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
              {emp.cronograma.slice(0, 4).map((etapa, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-foreground">{etapa.etapa}</span>
                    <span className={etapa.porcentagem === 100 ? 'text-teal-500 font-bold' : 'text-primary'}>{etapa.porcentagem}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-primary transition-all" style={{ width: `${etapa.porcentagem}%` }} />
                  </div>
                </div>
              ))}
              {emp.cronograma.length > 4 && (
                <button type="button" className="mt-2 text-xs font-semibold text-primary text-center">Ver cronograma completo</button>
              )}
            </div>
          </div>
        )}

        {/* Informações da Construtora/Contatos */}
        <div className="mb-8 p-4 rounded-2xl bg-muted/40 border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">Contatos Comerciais - {emp.construtora}</h3>
          
          <div className="flex flex-col gap-3">
            {emp.contatos?.map((contato, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-shadow text-white font-semibold">
                  {contato.nome.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-sm truncate">{contato.nome}</h4>
                  <p className="text-xs text-muted-foreground truncate">{contato.cargo}</p>
                </div>
                <button 
                  onClick={() => { setMsgWhatsapp(`Olá ${contato.nome}, tudo bem?\nSou da imobiliária e gostaria de falar sobre o ${emp.nome}.`); setMostrarWhatsappModal(true) }}
                  className="flex size-8 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]"
                >
                  <MessageCircle className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 bg-background border-t border-border pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <button type="button" onClick={() => setShowShareMenu(true)} className="w-full flex items-center justify-center gap-2.5 h-14 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-xl shadow-primary/30 transition-transform active:scale-[0.98]">
          <Share2 className="size-5" strokeWidth={2.5} /> 
          Compartilhar com Lead
        </button>
      </div>

      {/* Share Bottom Sheet */}
      {showShareMenu && (
        <>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in duration-200" onClick={() => setShowShareMenu(false)} />
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

      {/* WhatsApp Modal */}
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
    </div>
  )
}
